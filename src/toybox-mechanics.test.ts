import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { toyboxLevels } from "./packs/17";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => {
  const level = toyboxLevels.find((item) => item.id === id);
  expect(level, `authored scene ${id}`).toBeDefined();
  return new World(level!);
};
const target = (w: World, id: string) => {
  const task = w.targets.find((item) => item.id === id);
  expect(task, `authored target ${id}`).toBeDefined();
  return task!;
};
const pose = (t: Pick<LiveTarget, "x" | "y" | "w" | "h">) => [
  t.x,
  t.y,
  t.w,
  t.h,
];
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
  // Reuse the shipped mycelium/institute actual-water test controls. Never
  // write completion, progress, cells, elapsed time, masses, or physics state.
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp, options.pressure);
    if (options.sweep)
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
  }
  w.nozzle.on = false;
  expect(
    ready(),
    `${w.level.id}: ${t.id} reaches its next actual-water state`,
  ).toBe(true);
}
function flush(w: World) {
  w.nozzle.on = false;
  advance(w, 180);
  expect(w.drops).toHaveLength(0);
}

describe("Toybox biscuit planetarium", () => {
  it("17.18 keeps all three real elliptical bodies separated, retains local melting, and parks followed moons at their actual completion poses", () => {
    const w = scene("17.18"),
      authored = w.level.targets;
    expect(authored.map((task) => task.id)).toEqual([
      "innerMoon",
      "middleMoon",
      "outerMoon",
    ]);
    expect(w.level.mobile).toEqual({
      x: 480,
      y: 325,
      targets: authored.map((task) => task.id),
    });
    for (const task of authored) {
      expect(task.verb).toBe("melt");
      expect(task.motion!.period).toBe(22);
      expect(task.motion!.after ?? []).toEqual([]);
      expect(w.available(task)).toBe(true);
      expect(pose(task)).toEqual([445, 290, 70, 70]);
      expect(task.y - task.motion!.ry).toBeGreaterThanOrEqual(120);
    }
    // Equal angular speed makes each pair's relative trajectory an ellipse.
    // Its minimum singular value is the exact minimum center distance for ALL
    // phases, not a sampling claim. More than the summed half-diagonal proves
    // the two axis-aligned ice rectangles cannot overlap anywhere in the orbit.
    for (let i = 0; i < authored.length; i++)
      for (let j = i + 1; j < authored.length; j++) {
        const p = authored[i],
          q = authored[j],
          a = p.motion!,
          b = q.motion!;
        const phase = (b.phase ?? 0) - (a.phase ?? 0);
        const A = a.rx - b.rx * Math.cos(phase),
          B = b.rx * Math.sin(phase);
        const C = -b.ry * Math.sin(phase),
          D = a.ry - b.ry * Math.cos(phase);
        const sum = A * A + B * B + C * C + D * D,
          determinant = (A * D - B * C) ** 2;
        const separation = Math.sqrt(
          (sum - Math.sqrt(sum * sum - 4 * determinant)) / 2,
        );
        expect(separation).toBeGreaterThan(
          Math.hypot((p.w + q.w) / 2, (p.h + q.h) / 2),
        );
      }
    const first = w.targets[0],
      start = pose(first);
    spray(w, first, 100, { ready: () => first.progress > 0.15 });
    flush(w);
    const retained = first.progress;
    expect(retained).toBeGreaterThan(0);
    expect(retained).toBeLessThan(1);
    expect(pose(first)).not.toEqual(start);
    const mistakes = w.mistakes;
    advance(w, 22 * 60);
    expect(first.progress).toBe(retained);
    expect(w.mistakes).toBe(mistakes);
    expect(w.completed).toBe(false);
    spray(w, first, 100, { sweep: true });
    const completedAt = first.completedAt;
    expect(w.completed).toBe(false);
    advance(w, 22 * 60);
    expect(first.progress).toBe(1);
    expect(first.completedAt).toBe(completedAt);
    for (const moon of w.targets.slice(1)) spray(w, moon, 100, { sweep: true });
    expect(w.completed).toBe(true);
    expect(w.stationary).toBe(false);
    const parked = w.targets.map(pose);
    for (const moon of w.targets) {
      const props = w.level.props.filter((prop) => prop.follow === moon.id);
      expect(props.length).toBeGreaterThan(0);
      for (const prop of props) {
        expect(prop.target).toBe(moon.id);
        expect(prop.scale).toBe(1);
        expect(prop.reveal).toBeUndefined();
      }
    }
    advance(w, 22 * 60);
    expect(w.targets.map(pose)).toEqual(parked);
  });

  it("17.18 stationary assist holds three distinct reachable moons but still needs hot water; replay restores their moving ice", () => {
    const w = scene("17.18"),
      starts = w.targets.map(pose);
    w.stationary = true;
    aim(w, w.targets[0], 0);
    advance(w, 180);
    expect(w.targets.map(pose)).toEqual(starts);
    expect(w.targets.every((moon) => moon.progress === 0)).toBe(true);
    expect(w.mistakes).toBeGreaterThan(0);
    for (const moon of w.targets.slice().reverse())
      spray(w, moon, 100, { sweep: true });
    expect(w.completed).toBe(true);
    expect(w.targets.map(pose)).toEqual(starts);
    const reset = scene("17.18");
    expect(reset.stationary).toBe(false);
    expect(reset.targets.map(pose)).toEqual(starts);
    expect(
      reset.targets.every(
        (moon) =>
          !moon.done &&
          moon.progress === 0 &&
          moon.cells.every((cell) => cell === 1),
      ),
    ).toBe(true);
    reset.nozzle.on = false;
    advance(reset, 90);
    expect(reset.targets.map(pose)).not.toEqual(starts);
    expect(reset.completed).toBe(false);
  });
});

it("17.04 ordinary completed construction remains stable under hot water and never becomes reversible ballast", () => {
  const w = scene("17.04");
  const footing = w.targets.find((task) => task.verb === "freeze")!;
  spray(w, footing, -40);
  expect(w.completed).toBe(false);
  const cells = footing.cells.slice(),
    completedAt = footing.completedAt;
  aim(w, footing, 100);
  advance(w, 300);
  expect(footing.progress).toBe(1);
  expect(footing.done).toBe(true);
  expect(footing.cells).toEqual(cells);
  expect(footing.completedAt).toBe(completedAt);
});

describe("Toybox reversible feather-captain ballast", () => {
  it("17.14 repeatedly grows and trims already-full cups while conserving fixed-plus-ice mass and respecting neutral water and capacity", () => {
    const w = scene("17.14"),
      left = target(w, "leftIce"),
      right = target(w, "rightIce");
    const plan = w.level.balance!;
    expect(w.targets).toHaveLength(2);
    expect(plan.left).toMatchObject({ target: left.id, mass: 1, fixedMass: 1 });
    expect(plan.right).toMatchObject({
      target: right.id,
      mass: 1,
      fixedMass: 0.25,
    });
    expect(w.level.needsSignals).toContain(plan.id);
    for (const cup of [left, right]) {
      expect(cup.verb).toBe("freeze");
      expect(cup.reversibleIce).toBe(true);
      expect(cup.effort).toBe(4);
      expect(w.available(cup)).toBe(true);
    }
    expect(w.balance!.leftMass).toBe(1);
    expect(w.balance!.rightMass).toBe(0.25);
    w.nozzle.on = false;
    advance(w, 180);
    expect(w.balance!.angle).toBeLessThan(-0.1);
    for (const [side, cup] of [
      [-1, left],
      [1, right],
    ] as const) {
      expect(cup.x).toBeCloseTo(
        plan.x + Math.cos(w.balance!.angle) * side * plan.arm - cup.w / 2,
      );
      expect(cup.y).toBeCloseTo(
        plan.y + Math.sin(w.balance!.angle) * side * plan.arm + 40,
      );
      expect(cup.y).toBeGreaterThanOrEqual(120);
      expect(cup.y + cup.h).toBeLessThanOrEqual(540);
    }
    spray(w, left, -40, { ready: () => left.progress === 1 });
    flush(w);
    expect(left.done).toBe(false);
    expect(w.completed).toBe(false);
    expect(w.balance!.leftMass).toBe(2);
    expect(w.balance!.rightMass).toBe(0.25);
    aim(w, left, -40);
    advance(w, 120);
    flush(w);
    expect(left.progress).toBe(1);
    const mistakes = w.mistakes;
    for (const neutral of [-5, 0, 5]) {
      aim(w, left, neutral);
      advance(w, 90);
      flush(w);
      expect(left.progress).toBe(1);
      expect(w.balance!.leftMass).toBe(2);
    }
    expect(w.mistakes).toBe(mistakes);
    spray(w, left, 40, { ready: () => left.progress <= 0.55 });
    flush(w);
    expect(left.progress).toBeGreaterThan(0);
    expect(left.progress).toBeLessThan(0.55);
    expect(w.balance!.leftMass).toBeCloseTo(1 + left.progress);
    expect(w.balance!.rightMass).toBe(0.25);
    expect(left.done).toBe(false);
    spray(w, left, -40, { ready: () => left.progress === 1 });
    flush(w);
    expect(left.progress).toBe(1);
    expect(w.balance!.leftMass).toBe(2);
    spray(w, left, 40, { ready: () => left.progress === 0 });
    aim(w, left, 40);
    advance(w, 120);
    flush(w);
    expect(left.progress).toBe(0);
    expect(right.progress).toBe(0);
    expect(w.balance!.leftMass).toBe(1);
    expect(w.balance!.rightMass).toBe(0.25);
    expect(w.targets.every((cup) => !cup.done)).toBe(true);
    expect(w.signals.has(plan.id)).toBe(false);
    expect(w.completed).toBe(false);
  });

  it("17.14 rejects two full checkmarks, then settles a real trimmed volume without advancing during zero-time updates or inflating mass after victory", () => {
    const w = scene("17.14"),
      left = target(w, "leftIce"),
      right = target(w, "rightIce");
    const plan = w.level.balance!;
    for (const cup of [left, right])
      spray(w, cup, -40, { ready: () => cup.progress === 1 });
    flush(w);
    expect([left.progress, right.progress]).toEqual([1, 1]);
    expect([left.done, right.done]).toEqual([false, false]);
    expect(w.progress).toBe(0);
    expect(w.balance!.leftMass).toBe(2);
    expect(w.balance!.rightMass).toBe(1.25);
    expect(w.balance!.angle).toBeLessThan(-0.1);
    expect(w.signals.has(plan.id)).toBe(false);
    expect(w.completed).toBe(false);

    // Stop at .26: four measured in-flight drops trim another .0064. This is
    // a real hose cutoff, not a progress correction or a snap to equilibrium.
    spray(w, left, 40, { ready: () => left.progress <= 0.26 });
    expect(left.progress).toBeGreaterThan(0.24);
    expect(w.drops.length).toBeGreaterThan(0);
    expect(w.completed).toBe(false);
    const beforePause = [left.progress, right.progress];
    advance(w, 1, 0); // Synchronize the cached mass after the last arriving drop.
    const paused = { ...w.balance! },
      poses = w.targets.map(pose);
    const elapsed = w.elapsed,
      water = w.water,
      drops = w.drops.map((drop) => ({ ...drop }));
    expect(Math.abs(paused.velocity)).toBeGreaterThan(0);
    advance(w, 120, 0);
    expect([left.progress, right.progress]).toEqual(beforePause);
    expect(w.balance).toEqual(paused);
    expect(w.targets.map(pose)).toEqual(poses);
    expect(w.elapsed).toBe(elapsed);
    expect(w.water).toBe(water);
    expect(w.drops).toEqual(drops);
    for (let frame = 0; frame < 1200 && !w.completed; frame++) advance(w, 1);
    expect(w.completed).toBe(true);
    expect(w.balance!.level).toBe(true);
    expect(w.signals.has(plan.id)).toBe(true);
    expect(left.progress).toBeGreaterThan(0.23);
    expect(left.progress).toBeLessThan(0.27);
    expect(right.progress).toBe(1);
    expect(w.balance!.leftMass).toBeCloseTo(1 + left.progress);
    expect(w.balance!.rightMass).toBe(1.25);
    expect(Math.abs(w.balance!.leftMass - w.balance!.rightMass)).toBeLessThan(
      0.02,
    );
    expect(Math.abs(w.balance!.angle)).toBeLessThan(0.018);
    expect(Math.abs(w.balance!.velocity)).toBeLessThan(0.025);
    expect(w.balance!.settled).toBeGreaterThanOrEqual(0.45);
    expect([left.done, right.done]).toEqual([true, true]);
    expect(w.progress).toBe(1);
    const actualVolumes = [left.progress, right.progress],
      parked = { ...w.balance! };
    advance(w, 600);
    expect([left.progress, right.progress]).toEqual(actualVolumes);
    expect(w.balance).toEqual(parked);
    const reset = scene("17.14");
    expect(reset.targets.every((cup) => !cup.done && cup.progress === 0)).toBe(
      true,
    );
    expect(reset.balance!.leftMass).toBe(1);
    expect(reset.balance!.rightMass).toBe(0.25);
    expect(reset.balance!.angle).toBe(0);
    expect(reset.balance!.settled).toBe(0);
    expect(reset.targets.map(pose)).toEqual([
      [245, 380, 110, 75],
      [605, 380, 110, 75],
    ]);
    expect(reset.signals.size).toBe(0);
    expect(reset.completed).toBe(false);
  });

  it("17.14 also balances an untouched left cup against a partly grown right cup, without any hidden fill-both checklist", () => {
    const w = scene("17.14"),
      left = target(w, "leftIce"),
      right = target(w, "rightIce");
    spray(w, right, -40, { ready: () => right.progress >= 0.74 });
    expect(left.progress).toBe(0);
    expect(right.progress).toBeLessThan(1);
    for (let frame = 0; frame < 1200 && !w.completed; frame++) advance(w, 1);
    expect(w.completed).toBe(true);
    expect(left.progress).toBe(0);
    expect(right.progress).toBeGreaterThan(0.73);
    expect(right.progress).toBeLessThan(0.77);
    expect(w.balance!.leftMass).toBe(1);
    expect(w.balance!.rightMass).toBeCloseTo(0.25 + right.progress);
    expect(Math.abs(w.balance!.leftMass - w.balance!.rightMass)).toBeLessThan(
      0.02,
    );
    expect(w.signals.has(w.level.balance!.id)).toBe(true);
    expect([left.done, right.done]).toEqual([true, true]);
  });
});
