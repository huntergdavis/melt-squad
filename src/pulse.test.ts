import { describe, expect, it } from "vitest";
import { World, requirements, type Drop } from "./engine";
import { levels } from "./levels";
import { loadSave } from "./save";
import type { Level } from "./types";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const jet: Drop = { x: 0, y: 0, vx: 0, vy: 0, life: 1, temp: 30, pressure: 85 };
const rehearsal: Level = {
  ...levels[0],
  targets: [
    {
      id: "beat",
      name: "First beat",
      verb: "spin",
      x: 300,
      y: 300,
      w: 85,
      h: 65,
      pulse: { period: 4, open: 1.5 },
    },
    {
      id: "other",
      name: "Second beat",
      verb: "spin",
      x: 600,
      y: 300,
      w: 85,
      h: 65,
      pulse: { period: 4, open: 1.5, phase: 2 },
    },
  ],
};
describe("Gentle rhythm gates", () => {
  it("opens deterministic beat windows and honors each target's offset", () => {
    const world = new World(rehearsal);
    const [a, b] = world.targets;
    expect(world.pulseOpen(a)).toBe(true);
    expect(world.pulseOpen(b)).toBe(false);
    world.elapsed = 1.5;
    expect(world.pulseOpen(a)).toBe(false);
    world.elapsed = 2;
    expect(world.pulseOpen(b)).toBe(true);
    world.elapsed = 4;
    expect(world.pulseOpen(a)).toBe(true);
  });
  it("off-beat drops neither progress nor punish, and partial progress persists", () => {
    const world = new World(rehearsal),
      t = world.targets[0];
    world.impact(t, jet, t.x, t.y);
    const progress = t.progress;
    world.elapsed = 2;
    for (let i = 0; i < 100; i++) world.impact(t, jet, t.x, t.y);
    expect(t.progress).toBe(progress);
    expect(world.mistakes).toBe(0);
    expect(t.feedback).toContain("REST");
    world.elapsed = 4;
    world.impact(t, jet, t.x, t.y);
    expect(t.progress).toBeGreaterThan(progress);
  });
  it("untimed assist opens every gate but still requires valid thermal settings", () => {
    const world = new World(rehearsal),
      t = world.targets[0];
    world.elapsed = 2;
    world.untimed = true;
    expect(world.pulseOpen(t)).toBe(true);
    world.impact(t, { ...jet, pressure: 30 }, t.x, t.y);
    expect(t.progress).toBe(0);
    world.impact(t, jet, t.x, t.y);
    expect(t.progress).toBeGreaterThan(0);
    expect(requirements(t)).toContain("ON BEAT");
    expect(requirements(t, true)).not.toContain("ON BEAT");
  });
  it("real emitted water only advances an open beat and completion remains stable", () => {
    const world = new World(rehearsal),
      t = world.targets[0];
    Object.assign(world.nozzle, {
      x: t.x + t.w / 2,
      y: t.y - 52,
      temp: 30,
      pressure: 85,
    });
    world.elapsed = 2;
    for (let i = 0; i < 30; i++) world.update(1 / 60, idle);
    expect(t.progress).toBe(0);
    world.elapsed = 4;
    for (let i = 0; i < 30; i++) world.update(1 / 60, idle);
    expect(t.progress).toBeGreaterThan(0);
    world.untimed = true;
    for (let i = 0; i < 600 && !t.done; i++) world.update(1 / 60, idle);
    expect(t.done).toBe(true);
    world.untimed = false;
    world.elapsed = 6;
    world.impact(t, { ...jet, temp: -40 }, t.x, t.y);
    expect(t.progress).toBe(1);
  });
  it("keeps true and false preferences and rejects malformed saved assists", () => {
    for (const untimed of [true, false])
      expect(
        loadSave({ getItem: () => JSON.stringify({ version: 1, untimed }) })
          .untimed,
      ).toBe(untimed);
    expect(
      loadSave({ getItem: () => '{"version":1,"untimed":"yes"}' }).untimed,
    ).toBeUndefined();
  });
  it("ordered untimed lanes hold one lamp open and advance only after actual water finishes it", () => {
    const ordered: Level = {
      ...rehearsal,
      targets: rehearsal.targets.map((t, i) => ({
        ...t,
        pulse: { ...t.pulse!, untimedOrder: i + 1 },
      })),
    };
    const world = new World(ordered);
    world.untimed = true;
    const [a, b] = world.targets;
    const spray = (t: typeof a, frames: number, pressure = 85) => {
      Object.assign(world.nozzle, {
        x: t.x + t.w / 2,
        y: t.y - 52,
        temp: 30,
        pressure,
      });
      for (let i = 0; i < frames; i++) world.update(1 / 60, idle);
    };
    spray(b, 180);
    expect(b.progress).toBe(0);
    expect(b.feedback).toContain("NEXT");
    expect(world.mistakes).toBe(0);
    expect(world.pulseOpen(a)).toBe(true);
    spray(a, 60, 30);
    expect(a.progress).toBe(0);
    spray(a, 360);
    expect(a.done).toBe(true);
    expect(world.pulseOpen(b)).toBe(true);
    spray(b, 360);
    expect(world.completed).toBe(true);
    const replay = new World(ordered);
    replay.untimed = true;
    expect(replay.pulseOpen(replay.targets[1])).toBe(false);
  });
  it("switching rhythm assist preserves partial work and timed lanes retain their own windows", () => {
    const world = new World({
      ...rehearsal,
      targets: rehearsal.targets.map((t, i) => ({
        ...t,
        pulse: { ...t.pulse!, untimedOrder: i + 1 },
      })),
    });
    const [a, b] = world.targets;
    world.elapsed = 2;
    expect(world.pulseOpen(b)).toBe(true);
    world.impact(b, jet, b.x, b.y);
    const progress = b.progress;
    expect(progress).toBeGreaterThan(0);
    world.untimed = true;
    expect(world.pulseOpen(a)).toBe(true);
    expect(world.pulseOpen(b)).toBe(false);
    world.impact(b, jet, b.x, b.y);
    expect(b.progress).toBe(progress);
    world.untimed = false;
    expect(world.pulseOpen(b)).toBe(true);
    expect(b.progress).toBe(progress);
  });
});
