import { expect, it } from "vitest";
import { World, targetProgress } from "./engine";
import { apocalypseLevels } from "./packs/18";
import { activePrismVertices, traceOptics } from "./mechanics/optics";
import { solvePrismHeights } from "../scripts/solve-prisms";

const level = () => apocalypseLevels.find((l) => l.id === "18.18")!;
const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
it("the notch changes the actual convex body, not a detector flag", () => {
  const world = new World(level());
  const prism = world.level.optics!.prisms![0];
  const t = world.targets[0];
  expect(activePrismVertices(prism, t)).toBeUndefined();
  t.progress = 0.65;
  expect(activePrismVertices(prism, t)).toEqual([
    [240, 240],
    [320, 370],
    [240, 370],
  ]);
  expect(activePrismVertices({ ...prism, height: { mark: 0.2 } }, t)).toEqual(
    activePrismVertices(prism, t),
  );
  for (const invalid of [NaN, Infinity, -0.1, 1.1]) {
    t.progress = invalid;
    expect(activePrismVertices(prism, t)).toBeUndefined();
  }
  t.progress = 0.65;
  expect(
    activePrismVertices({ ...prism, height: { mark: 0 } }, t),
  ).toBeUndefined();
});
it("blank and fully grown wedges miss; the genuinely refracted notch/full/notch beam hits", () => {
  const world = new World(level());
  const plan = world.level.optics!;
  expect(traceOptics(plan, world.targets).lit.size).toBe(0);
  world.targets.forEach((t) => (t.progress = 1));
  expect(traceOptics(plan, world.targets).lit.size).toBe(0);
  world.targets.forEach((t, i) => (t.progress = i === 1 ? 1 : 0.65));
  const trace = traceOptics(plan, world.targets);
  expect([...trace.lit].sort()).toEqual(plan.detectors.map((d) => d.id).sort());
  expect(trace.segments).toHaveLength(7);
  expect(trace.segments[2].to[1]).toBeCloseTo(301.1255125843605, 8);
  const moved = {
    ...plan,
    detectors: plan.detectors.map((d) => ({ ...d, y: d.y + 40 })),
  };
  expect(traceOptics(moved, world.targets).lit.size).toBe(0);
  // The real star radius gives players a tolerance band, not an exact-height
  // password. Still, a full right wedge must not solve while trimming the left.
  world.targets[2].progress = 1;
  for (let step = 0; step <= 80; step++) {
    world.targets[0].progress = 0.61 + step * 0.001;
    expect(traceOptics(plan, world.targets).lit.size).toBeLessThan(3);
  }
});
it("ordinary completed prisms retain their original geometry", () => {
  const world = new World(level());
  const { height: _, ...prism } = world.level.optics!.prisms![0];
  const t = world.targets[0];
  t.progress = 0.65;
  expect(activePrismVertices(prism, t)).toBeUndefined();
  t.done = true;
  expect(activePrismVertices(prism, t)).toBe(prism.vertices);
});
it("actual cold growth and hot trimming align the sky and preserve the winning partial wedges", () => {
  const world = new World(level());
  solvePrismHeights(world);
  expect(world.completed).toBe(true);
  expect(world.targets.every((t) => t.done)).toBe(true);
  expect(world.light.lit.size).toBe(3);
  expect(world.targets[0].progress).toBeGreaterThan(0.62);
  expect(world.targets[0].progress).toBeLessThan(0.68);
  expect(world.targets[1].progress).toBe(1);
  expect(world.targets[2].progress).toBeGreaterThan(0.62);
  expect(world.targets[2].progress).toBeLessThan(0.8);
  expect(traceOptics(world.level.optics!, world.targets).lit.size).toBe(3);
  const volumes = world.targets.map((t) => t.progress);
  for (let f = 0; f < 180; f++) world.update(1 / 60, idle);
  expect(world.targets.map((t) => t.progress)).toEqual(volumes);
  expect(world.targets.map(targetProgress)).toEqual([1, 1, 1]);
  const reset = new World(level());
  expect(reset.targets.every((t) => t.progress === 0 && !t.done)).toBe(true);
  expect(reset.light.lit.size).toBe(0);
});
