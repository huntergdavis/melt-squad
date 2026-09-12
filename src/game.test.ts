import { describe, it, expect } from "vitest";
import { levels } from "./levels";
import { World, requirements, type Drop } from "./engine";
import { deadzone, padControls } from "./input";
import { loadSave, recordWin, writeSave } from "./save";
const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const drop = (temp: number, pressure = 45): Drop => ({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  life: 1,
  temp,
  pressure,
});

describe("Authored calls", () => {
  it("contains complete packs of unique, valid, independently playable levels", () => {
    expect(levels).toHaveLength(40);
    expect(new Set(levels.map((l) => l.id)).size).toBe(levels.length);
    for (const l of levels) {
      const ids = l.targets.map((t) => t.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const t of l.targets) {
        expect(t.x).toBeGreaterThan(55);
        expect(t.x + t.w).toBeLessThan(905);
        expect(t.y).toBeGreaterThan(120);
        expect(t.y + t.h).toBeLessThan(540);
        for (const id of t.requires ?? [])
          expect(ids.indexOf(id)).toBeLessThan(ids.indexOf(t.id));
      }
    }
  });
  for (const l of levels)
    it('solves "' + l.name + '" through actual water particles', () => {
      const world = new World(l);
      for (const t of world.targets) {
        expect(world.available(t)).toBe(true);
        const n = world.nozzle;
        n.temp =
          t.verb === "freeze"
            ? -40
            : t.verb === "warm"
              ? ((t.temp?.[0] ?? 20) + (t.temp?.[1] ?? 55)) / 2
              : 95;
        n.pressure =
          t.verb === "warm"
            ? ((t.pressure?.[0] ?? 10) + (t.pressure?.[1] ?? 55)) / 2
            : 90;
        n.angle = 0;
        for (let step = 0; step < 12000 && !t.done; step++) {
          // Sweep across the whole shape. No direct progress writes or test-only win path.
          n.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(step / 29));
          n.y = t.y - 52;
          if (t.flowOnly) {
            const inlet = l.channels!.inlet;
            n.x = inlet.x + inlet.w / 2;
            n.y = inlet.y - 52;
          }
          world.update(1 / 60, idle);
        }
        expect(t.done, t.id + " stopped at " + t.progress).toBe(true);
      }
      expect(world.completed).toBe(true);
      expect(world.progress).toBe(1);
      expect(world.elapsed).toBeLessThan(l.par * 1.8);
    });
});
describe("Thermal rules", () => {
  it("does not let a locked rescue bypass its ice landing pad", () => {
    const w = new World(levels[1]),
      boots = w.targets[1];
    for (let n = 0; n < 1000; n++)
      w.impact(boots, drop(100), boots.x + 30, boots.y + 10);
    expect(boots.progress).toBe(0);
  });
  it("cold builds ice; heat reverses unfinished structures; completed ones are stable", () => {
    const w = new World(levels[1]),
      pad = w.targets[0];
    w.impact(pad, drop(-40), pad.x, pad.y);
    const progress = pad.progress;
    expect(progress).toBeGreaterThan(0);
    w.impact(pad, drop(100), pad.x, pad.y);
    expect(pad.progress).toBeLessThan(progress);
    for (let n = 0; n < 500; n++) w.impact(pad, drop(-40), pad.x, pad.y);
    expect(pad.done).toBe(true);
    w.impact(pad, drop(100), pad.x, pad.y);
    expect(pad.progress).toBe(1);
  });
  it("warm hearts reject excessive heat and pressure", () => {
    const w = new World(levels[2]),
      heart = w.targets[1];
    w.targets[0].done = true;
    for (let n = 0; n < 100; n++) w.impact(heart, drop(100), heart.x, heart.y);
    expect(heart.progress).toBe(0);
    w.impact(heart, drop(35, 90), heart.x, heart.y);
    expect(heart.progress).toBe(0);
    w.impact(heart, drop(35, 30), heart.x, heart.y);
    expect(heart.progress).toBeGreaterThan(0);
    expect(requirements(heart)).toContain("20–55");
  });
  it("pressure, nozzle motion, and temperature are clamped", () => {
    const w = new World(levels[0]);
    for (let i = 0; i < 500; i++)
      w.update(1 / 60, { x: -1, y: -1, heat: 1, pressure: 1, tilt: 1 });
    expect(w.nozzle.x).toBe(55);
    expect(w.nozzle.y).toBe(72);
    expect(w.nozzle.temp).toBe(100);
    expect(w.nozzle.pressure).toBe(100);
    expect(w.drops.length).toBeLessThanOrEqual(350);
  });
  it("switching water off stops all new emission", () => {
    const w = new World(levels[0]);
    w.nozzle.on = false;
    for (let i = 0; i < 600; i++) w.update(1 / 60, idle);
    expect(w.water).toBe(0);
    expect(w.drops).toHaveLength(0);
  });
});
describe("Controller and saves", () => {
  it("has a deadzone and maps both sticks independently", () => {
    expect(deadzone(0.1)).toBe(0);
    expect(deadzone(-1)).toBe(-1);
    expect(padControls({ axes: [1, -1, 1, -1] })).toEqual({
      x: 1,
      y: -1,
      heat: 1,
      pressure: 1,
      tilt: 0,
    });
  });
  it("keeps best results and ignores malformed saves", () => {
    const s = loadSave({ getItem: () => "{broken" });
    recordWin(s, "cup", 3, 30);
    recordWin(s, "cup", 1, 90);
    expect(s.stars.cup).toBe(3);
    expect(s.best.cup).toBe(30);
    const loaded = loadSave({
      getItem: () =>
        JSON.stringify({
          version: 1,
          stars: { cup: 99, wizard: 2 },
          best: { cup: -1 },
        }),
    });
    expect(loaded.stars.cup).toBeUndefined();
    expect(loaded.stars.wizard).toBe(2);
    expect(loaded.best.cup).toBeUndefined();
    expect(
      writeSave(s, {
        setItem: () => {
          throw Error("Storage blocked");
        },
      }),
    ).toBe(false);
  });
});
