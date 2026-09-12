import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { instituteLevels } from "./packs/15";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const level = (id: string) => {
  const authored = instituteLevels.find((item) => item.id === id);
  expect(authored, `authored scene ${id}`).toBeDefined();
  return authored!;
};
const target = (w: World, id: string) => {
  const task = w.targets.find((item) => item.id === id);
  expect(task, `authored target ${id}`).toBeDefined();
  return task!;
};
const pose = (t: LiveTarget) => [t.x, t.y, t.w, t.h];
function advance(w: World, frames: number, dt = 1 / 60) {
  for (let frame = 0; frame < frames; frame++) w.update(dt, idle);
}
function aim(w: World, t: LiveTarget, temp: number, pressure = 85) {
  Object.assign(w.nozzle, {
    x: t.x + t.w / 2,
    y: t.y - 52,
    temp,
    pressure,
    angle: 0,
    on: true,
  });
}
function spray(
  w: World,
  t: LiveTarget,
  temp: number,
  options: {
    pressure?: number;
    sweep?: boolean;
    ready?: () => boolean;
  } = {},
) {
  const ready = options.ready ?? (() => t.done);
  // Reuse the shipped sports/seamworks actual-water integration approach.
  // Only real nozzle controls and simulation updates may change target state.
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp, options.pressure);
    if (options.sweep)
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id}: ${t.id} reaches its next state`).toBe(true);
}
function slit(w: World, pane: LiveTarget, ready: () => boolean) {
  const beamY = w.level.optics!.source.y;
  // The nozzle's real mouth is 26px below its handle. Position it just above
  // the beam's interior cell row, then sweep a thin hole through actual ice.
  for (let frame = 0; frame < 1200 && !ready(); frame++) {
    Object.assign(w.nozzle, {
      x: pane.x + 5 + (pane.w - 10) * (0.5 + 0.5 * Math.sin(frame / 23)),
      y: beamY - 29,
      temp: 100,
      pressure: 85,
      angle: 0,
      on: true,
    });
    advance(w, 1);
  }
  w.nozzle.on = false;
  advance(w, 1);
  expect(ready(), `${pane.id} has a real beam-width aperture`).toBe(true);
}

it("15.06 collects actual drips through a locally opened but unfinished specimen window", () => {
  const w = new World(level("15.06"));
  const left = target(w, "leftPane"),
    right = target(w, "rightPane"),
    basin = target(w, "basin");
  expect(w.targets).toHaveLength(3);
  expect(w.available(basin)).toBe(true);
  expect(basin.requires ?? []).toEqual([]);
  expect(basin.y).toBeGreaterThan(left.y + left.h);
  expect(left.x + left.w / 2).toBeGreaterThan(basin.x);
  expect(left.x + left.w / 2).toBeLessThan(basin.x + basin.w);
  aim(w, left, 0);
  advance(w, 150);
  expect(left.cells.every((cell) => cell === 1)).toBe(true);
  expect(basin.progress).toBe(0);
  spray(w, left, 40, { ready: () => basin.progress > 0 });
  expect(w.nozzle.y).toBeLessThan(left.y);
  expect(left.done).toBe(false);
  expect(left.progress).toBeGreaterThan(0);
  expect(left.progress).toBeLessThan(0.88);
  expect(left.cells.some((cell) => cell <= 0.02)).toBe(true);
  expect(right.progress).toBe(0);
  spray(w, left, 40, { ready: () => basin.done });
  expect(left.done).toBe(false);
  expect(w.completed).toBe(false);
  spray(w, left, 100, { sweep: true });
  expect(w.completed).toBe(false);
  spray(w, right, 100, { sweep: true });
  expect(w.completed).toBe(true);
});

describe("Institute fixed-beam demonstration", () => {
  it("15.14 lights the detector through actual unfinished apertures but still requires both marked panes to finish", () => {
    const w = new World(level("15.14"));
    const left = target(w, "leftPane"),
      right = target(w, "rightPane");
    const optics = w.level.optics!;
    expect(w.targets).toHaveLength(2);
    expect(
      w.targets.every((task) => task.verb === "melt" && w.available(task)),
    ).toBe(true);
    expect(optics.source).toEqual({ x: 165, y: 285, dx: 1, dy: 0 });
    expect(optics.mirrors).toEqual([]);
    expect(optics.prisms ?? []).toEqual([]);
    expect(optics.splitters ?? []).toEqual([]);
    expect(optics.detectors).toHaveLength(1);
    expect(w.level.needsSignals).toEqual(["explanation:lit"]);
    w.nozzle.on = false;
    advance(w, 1);
    expect(w.light.segments).toEqual([{ from: [165, 285], to: [330, 285] }]);
    expect(w.signals.has("explanation:lit")).toBe(false);

    slit(w, left, () => w.light.segments[0].to[0] >= right.x);
    expect(left.done).toBe(false);
    expect(left.progress).toBeGreaterThan(0);
    expect(left.progress).toBeLessThan(0.88);
    expect(w.light.segments[0].to).toEqual([535, 285]);
    expect(right.progress).toBe(0);
    expect(w.signals.has("explanation:lit")).toBe(false);
    slit(w, right, () => w.signals.has("explanation:lit"));
    expect(w.targets.every((task) => !task.done)).toBe(true);
    expect(w.light.lit).toEqual(new Set(["explanation:lit"]));
    expect(w.completed).toBe(false);
    expect(w.completionPending).toBe(false);
    spray(w, left, 100, { sweep: true });
    expect(right.done).toBe(false);
    expect(w.completed).toBe(false);
    spray(w, right, 100, { sweep: true });
    advance(w, 1);
    expect(w.completed).toBe(true);
    expect(w.signals.has("explanation:lit")).toBe(true);

    const reset = new World(w.level);
    reset.nozzle.on = false;
    advance(reset, 1);
    expect(
      reset.targets.every(
        (task) =>
          task.progress === 0 &&
          !task.done &&
          task.cells.every((cell) => cell === 1),
      ),
    ).toBe(true);
    expect(reset.light.segments).toEqual([
      { from: [165, 285], to: [330, 285] },
    ]);
    expect(reset.signals.size).toBe(0);
    expect(reset.completed).toBe(false);
  });

  it("15.14 cannot replace a missed real detector with two completed pane checkmarks", () => {
    const source = level("15.14"),
      optics = source.optics!;
    const w = new World({
      ...source,
      optics: {
        ...optics,
        detectors: optics.detectors.map((detector) => ({
          ...detector,
          y: detector.y + 60,
        })),
      },
    });
    for (const pane of w.targets) spray(w, pane, 100, { sweep: true });
    w.nozzle.on = false;
    advance(w, 300);
    expect(w.targets.every((task) => task.done)).toBe(true);
    expect(w.light.segments).toEqual([{ from: [165, 285], to: [960, 285] }]);
    expect(w.light.lit.size).toBe(0);
    expect(w.signals.has("explanation:lit")).toBe(false);
    expect(w.completionPending).toBe(true);
    expect(w.completed).toBe(false);
  });
});

describe("Institute prebuilt floating footnote", () => {
  it("15.18 exists on the dry floor, floats steadily inside the band before full, and needs actual capped water plus equilibrium to finish", () => {
    const w = new World(level("15.18")),
      tank = target(w, "tank");
    const plan = w.level.buoyancy!;
    expect(w.targets).toHaveLength(1);
    expect(tank.verb).toBe("fill");
    expect(tank.motion).toBeUndefined();
    expect(w.available(tank)).toBe(true);
    expect(plan.prebuilt).toBe(true);
    expect(plan.iceTarget).toBeUndefined();
    expect(plan.fillTarget).toBe(tank.id);
    expect(plan.dockTolerance).toBe(8);
    expect(w.level.needsSignals).toEqual(["footnote:afloat"]);
    const fixedZone = pose(tank);
    expect(w.buoyancy!.valid).toBe(true);
    expect(w.buoyancy!.active).toBe(true);
    expect(w.buoyancy!.grounded).toBe(true);
    expect(w.buoyancy!.deckY).toBe(440);
    expect(w.buoyancy!.waterY).toBe(485);
    expect(w.buoyancy!.mass).toBeCloseTo(3.86385);
    expect(w.buoyancy!.buoyantForce).toBe(0);
    expect(w.signals.has(plan.id)).toBe(false);
    aim(w, tank, 0);
    advance(w, 120);
    w.nozzle.on = false;
    advance(w, 300);
    expect(tank.progress).toBe(0);
    expect(w.buoyancy!.grounded).toBe(true);

    spray(w, tank, 20, { ready: () => tank.progress >= 0.94 });
    advance(w, 900);
    expect(w.drops).toHaveLength(0);
    expect(tank.progress).toBeGreaterThan(0.95);
    expect(tank.progress).toBeLessThan(1);
    expect(tank.done).toBe(false);
    expect(w.buoyancy!.floating).toBe(true);
    expect(w.buoyancy!.grounded).toBe(false);
    expect(w.buoyancy!.sunk).toBe(false);
    expect(w.buoyancy!.deckY).toBeLessThan(440);
    expect(w.buoyancy!.waterY).toBeCloseTo(485 - 160 * tank.progress);
    expect(Math.abs(w.buoyancy!.deckY - plan.dockY)).toBeLessThan(
      plan.dockTolerance!,
    );
    expect(w.buoyancy!.buoyantForce / w.buoyancy!.weight).toBeCloseTo(1, 4);
    expect(Math.abs(w.buoyancy!.velocity)).toBeLessThan(0.001);
    expect(w.buoyancy!.docked).toBe(false);
    expect(w.signals.has(plan.id)).toBe(false);
    expect(w.completed).toBe(false);
    expect(pose(tank)).toEqual(fixedZone);
    const paused = { ...w.buoyancy! },
      elapsed = w.elapsed,
      water = w.water;
    advance(w, 300, 0);
    expect(w.buoyancy).toEqual(paused);
    expect(w.elapsed).toBe(elapsed);
    expect(w.water).toBe(water);

    spray(w, tank, 20);
    expect(w.completed).toBe(false);
    expect(w.completionPending).toBe(true);
    aim(w, tank, 20);
    for (let frame = 0; frame < 1200 && !w.completed; frame++) advance(w, 1);
    w.nozzle.on = false;
    expect(tank.progress).toBe(1);
    expect(w.completed).toBe(true);
    expect(w.buoyancy!.docked).toBe(true);
    expect(w.buoyancy!.floating).toBe(true);
    expect(w.buoyancy!.settled).toBeGreaterThanOrEqual(0.45);
    expect(w.buoyancy!.buoyantForce / w.buoyancy!.weight).toBeCloseTo(1, 3);
    expect(Math.abs(w.buoyancy!.velocity)).toBeLessThanOrEqual(0.001);
    expect(Math.abs(w.buoyancy!.deckY - plan.dockY)).toBeLessThan(
      plan.dockTolerance!,
    );
    expect(w.signals.has(plan.id)).toBe(true);
    expect(pose(tank)).toEqual(fixedZone);
    const parked = { ...w.buoyancy! };
    advance(w, 600);
    expect(w.buoyancy).toEqual(parked);

    const reset = new World(w.level);
    expect(reset.targets[0].progress).toBe(0);
    expect(reset.targets[0].done).toBe(false);
    expect(reset.buoyancy!.active).toBe(true);
    expect(reset.buoyancy!.grounded).toBe(true);
    expect(reset.buoyancy!.floating).toBe(false);
    expect(reset.buoyancy!.deckY).toBe(440);
    expect(reset.buoyancy!.waterY).toBe(485);
    expect(reset.buoyancy!.velocity).toBe(0);
    expect(reset.buoyancy!.settled).toBe(0);
    expect(reset.buoyancy!.docked).toBe(false);
    expect(reset.signals.size).toBe(0);
    expect(reset.completed).toBe(false);
  });

  it.each(["overloaded", "misaligned"] as const)(
    "15.18 a full tank cannot certify an %s physical exhibit",
    (failure) => {
      const source = level("15.18"),
        plan = source.buoyancy!;
      const w = new World({
        ...source,
        buoyancy: {
          ...plan,
          ...(failure === "overloaded"
            ? { loadMass: 2 }
            : { dockY: plan.dockY - 24 }),
        },
      });
      const tank = target(w, "tank");
      spray(w, tank, 20);
      advance(w, 1200);
      expect(tank.done).toBe(true);
      expect(tank.progress).toBe(1);
      expect(w.buoyancy!.valid).toBe(true);
      expect(w.buoyancy!.docked).toBe(false);
      expect(w.signals.has(plan.id)).toBe(false);
      expect(w.completionPending).toBe(true);
      expect(w.completed).toBe(false);
      if (failure === "overloaded") {
        expect(w.buoyancy!.sunk).toBe(true);
        expect(w.buoyancy!.grounded).toBe(true);
      } else {
        expect(w.buoyancy!.floating).toBe(true);
        expect(w.buoyancy!.deckY).toBeCloseTo(plan.dockY, 3);
        expect(
          Math.abs(w.buoyancy!.deckY - w.level.buoyancy!.dockY),
        ).toBeGreaterThan(plan.dockTolerance!);
      }
    },
  );
});
