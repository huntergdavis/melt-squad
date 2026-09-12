import { describe, it, expect } from "vitest";
import { levels } from "./levels";
import { World, requirements, type Drop } from "./engine";
import { deadzone, padControls } from "./input";
import { loadSave, recordWin, writeSave } from "./save";
import release from "../public/release.json" with { type: "json" };
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
    expect(levels).toHaveLength(release.scenes);
    expect(release.scenes).toBe(release.worlds * 20);
    expect(new Set(levels.map((l) => l.id)).size).toBe(levels.length);
    for (const l of levels) {
      const ids = l.targets.map((t) => t.id);
      const signals = [
        l.balance?.id,
        l.buoyancy?.id,
        ...(l.optics?.detectors.map((d) => d.id) ?? []),
        ...l.targets.flatMap(
          (t) => t.phase?.steps.map((step) => step.signal) ?? [],
        ),
      ].filter(Boolean);
      if (l.balance) {
        for (const load of [l.balance.left, l.balance.right]) {
          if (load.target) expect(ids).toContain(load.target);
          expect(load.mass).toBeGreaterThan(0);
          expect(load.arm ?? 1).toBeGreaterThan(0);
          expect(load.arm ?? 1).toBeGreaterThanOrEqual(0.1);
          expect(load.arm ?? 1).toBeLessThanOrEqual(10);
        }
      }
      for (const signal of l.needsSignals ?? [])
        expect(signals).toContain(signal);
      if (l.buoyancy) {
        const plan = l.buoyancy;
        const ice = l.targets.find((t) => t.id === plan.iceTarget)!;
        const fill = l.targets.find((t) => t.id === plan.fillTarget)!;
        expect(ice.verb).toBe("freeze");
        expect(fill.verb).toBe("fill");
        expect(fill.requires).toContain(ice.id);
        expect([fill.x, fill.y, fill.w, fill.h]).toEqual([
          plan.basin.x,
          plan.basin.y,
          plan.basin.w,
          plan.basin.h,
        ]);
        expect([ice.x, ice.y, ice.w, ice.h]).toEqual([
          plan.pontoon.x,
          plan.basin.y + plan.basin.h - plan.pontoon.h,
          plan.pontoon.w,
          plan.pontoon.h,
        ]);
        expect(l.needsSignals).toContain(plan.id);
        expect(new World(l).buoyancy!.valid).toBe(true);
      }
      for (const id of l.mobile?.targets ?? [])
        expect(l.targets.find((t) => t.id === id)?.motion).toBeDefined();
      for (const mirror of l.optics?.mirrors ?? []) {
        expect(l.targets.find((t) => t.id === mirror.target)?.verb).toBe(
          "freeze",
        );
        expect(Number.isFinite(mirror.angle)).toBe(true);
        expect(mirror.length).toBeGreaterThan(0);
      }
      expect(new Set(ids).size).toBe(ids.length);
      for (const prism of l.optics?.prisms ?? []) {
        const target = l.targets.find((t) => t.id === prism.target);
        expect(target?.verb).toBe("freeze");
        expect(prism.vertices.length).toBeGreaterThanOrEqual(3);
        expect(prism.refractiveIndex).toBeGreaterThan(1);
        for (const [x, y] of prism.vertices) {
          expect(x).toBeGreaterThanOrEqual(target!.x);
          expect(x).toBeLessThanOrEqual(target!.x + target!.w);
          expect(y).toBeGreaterThanOrEqual(target!.y);
          expect(y).toBeLessThanOrEqual(target!.y + target!.h);
        }
      }
      for (const splitter of l.optics?.splitters ?? []) {
        const target = l.targets.find((t) => t.id === splitter.target)!;
        expect(target.verb).toBe("freeze");
        expect(Number.isFinite(splitter.angle)).toBe(true);
        expect(splitter.length).toBeGreaterThan(0);
        const dx = (Math.cos(splitter.angle) * splitter.length) / 2;
        const dy = (Math.sin(splitter.angle) * splitter.length) / 2;
        for (const side of [-1, 1]) {
          expect(splitter.x + side * dx).toBeGreaterThanOrEqual(target.x);
          expect(splitter.x + side * dx).toBeLessThanOrEqual(
            target.x + target.w,
          );
          expect(splitter.y + side * dy).toBeGreaterThanOrEqual(target.y);
          expect(splitter.y + side * dy).toBeLessThanOrEqual(
            target.y + target.h,
          );
        }
      }
      for (const branch of l.channels?.branches ?? []) {
        expect(Boolean(branch.target) !== Boolean(branch.outlet)).toBe(true);
        if (branch.target) {
          const destination = l.targets.find((t) => t.id === branch.target);
          expect(destination?.verb).toBe("fill");
          expect(destination?.flowOnly).toBe(true);
        }
        if (branch.outlet) {
          expect(branch.outlet.every(Number.isFinite)).toBe(true);
          expect(branch.outlet[0]).toBeGreaterThan(0);
          expect(branch.outlet[0]).toBeLessThan(960);
          expect(branch.outlet[1]).toBeGreaterThan(0);
          expect(branch.outlet[1]).toBeLessThan(580);
        }
        if (branch.closedBy) {
          expect(l.targets.find((t) => t.id === branch.closedBy)?.verb).toBe(
            "freeze",
          );
        }
        if (branch.gate) expect(ids).toContain(branch.gate);
        if (branch.overflowFrom) {
          expect(
            l.targets.find((t) => t.id === branch.overflowFrom)?.verb,
          ).toBe("fill");
          expect(branch.overflowFrom).not.toBe(branch.target);
        }
      }
      for (const t of l.targets) {
        for (const id of t.motion?.after ?? []) {
          expect(ids).toContain(id);
          expect(id).not.toBe(t.id);
        }
        if (t.phase) {
          expect(t.phase.steps.length).toBeGreaterThanOrEqual(2);
          expect(t.phase.steps[0].verb).toBe(t.verb);
          for (const step of t.phase.steps) {
            for (const id of step.requires ?? []) {
              expect(ids).toContain(id);
              expect(id).not.toBe(t.id);
            }
            for (const signal of step.needsSignals ?? [])
              expect(signals).toContain(signal);
          }
        }
        for (const signal of t.needsSignals ?? [])
          expect(signals).toContain(signal);
        expect(t.x).toBeGreaterThan(55);
        expect(t.x + t.w).toBeLessThan(905);
        expect(t.y).toBeGreaterThan(120);
        expect(t.y + t.h).toBeLessThan(540);
        if (t.pulse) {
          expect(t.pulse.period).toBeGreaterThanOrEqual(1);
          expect(t.pulse.open).toBeGreaterThanOrEqual(0.3);
          expect(t.pulse.open).toBeLessThanOrEqual(t.pulse.period);
          expect(Number.isFinite(t.pulse.phase ?? 0)).toBe(true);
          if (t.pulse.untimedOrder !== undefined) {
            expect(Number.isInteger(t.pulse.untimedOrder)).toBe(true);
            expect(t.pulse.untimedOrder).toBeGreaterThan(0);
            expect(
              l.targets.filter(
                (other) => other.pulse?.untimedOrder === t.pulse!.untimedOrder,
              ),
            ).toHaveLength(1);
          }
        }
        for (const id of t.requires ?? [])
          expect(ids.indexOf(id)).toBeLessThan(ids.indexOf(t.id));
      }
    }
  });
  for (const l of levels)
    it('solves "' + l.name + '" through actual water particles', () => {
      const world = new World(l);
      const operations = world.targets.reduce(
        (n, t) => n + (t.phase?.steps.length ?? 1),
        0,
      );
      for (
        let operation = 0;
        operation < operations && !world.completed;
        operation++
      ) {
        let t = world.targets.find(
          (target) => !target.done && world.available(target),
        );
        // Physical readings may need a moment after the final drop (e.g. a beam settling).
        // Wait by advancing the real simulation, never by changing signal/progress state.
        if (!t) {
          world.nozzle.on = false;
          for (let step = 0; step < 1200 && !t; step++) {
            world.update(1 / 60, idle);
            t = world.targets.find(
              (target) => !target.done && world.available(target),
            );
          }
          world.nozzle.on = true;
        }
        expect(t, "No available work after physical settling").toBeDefined();
        if (!t) throw new Error("No available work");
        expect(world.available(t)).toBe(true);
        const phaseStep = t.phaseStep;
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
        for (
          let step = 0;
          step < 12000 && !t.done && t.phaseStep === phaseStep;
          step++
        ) {
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
        expect(
          t.done || t.phaseStep > phaseStep,
          t.id + " stopped at " + t.progress,
        ).toBe(true);
      }
      if (l.needsSignals?.length && !world.completed) {
        world.nozzle.on = false;
        for (let frame = 0; frame < 1200 && !world.completed; frame++)
          world.update(1 / 60, idle);
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
