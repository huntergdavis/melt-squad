import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { libraryLevels } from "./packs/09";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const call = (id: string) => {
  const level = libraryLevels.find((item) => item.id === id);
  expect(level, `authored scene ${id}`).toBeDefined();
  return new World(level!);
};
const task = (world: World, id: string) => {
  const target = world.targets.find((item) => item.id === id);
  expect(target, `authored target ${id}`).toBeDefined();
  return target!;
};
const footprint = (target: LiveTarget) => ({
  x: target.x,
  y: target.y,
  w: target.w,
  h: target.h,
});
function advance(world: World, frames: number) {
  for (let frame = 0; frame < frames; frame++) world.update(1 / 60, idle);
}
function aim(world: World, target: LiveTarget, temp: number, pressure: number) {
  Object.assign(world.nozzle, {
    x: target.x + target.w / 2,
    y: target.y - 52,
    temp,
    pressure,
    angle: 0,
    on: true,
  });
}
function spray(
  world: World,
  target: LiveTarget,
  temp: number,
  pressure: number,
  ready = () => target.done,
  sweep = false,
) {
  // Reuse the existing phase/motion tests' actual-water approach. The only
  // control changes are nozzle position and settings; no impact/progress cheats.
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(world, target, temp, pressure);
    if (sweep)
      world.nozzle.x =
        target.x + 8 + (target.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    world.update(1 / 60, idle);
  }
  world.nozzle.on = false;
  expect(
    ready(),
    `${world.level.id}: ${target.id} reached its next stage`,
  ).toBe(true);
}

describe("Authored library physical scenes", () => {
  it("09.15 needs a first cast, real drip-through opening, and a second cast in exactly the same mold", () => {
    const world = call("09.15");
    const page = task(world, "page"),
      ink = task(world, "ink");
    const originalFootprint = footprint(page);
    expect(page.phase?.steps.map((step) => step.verb)).toEqual([
      "freeze",
      "melt",
      "freeze",
    ]);
    expect(world.available(ink)).toBe(true);
    expect(ink.y).toBeGreaterThan(page.y + page.h);

    spray(world, page, -40, 90, () => page.phaseStep === 1);
    expect(page.verb).toBe("melt");
    expect(page.done).toBe(false);
    expect(world.completed).toBe(false);
    expect(world.signals.has("page:formed")).toBe(true);
    expect(page.cells.every((cell) => cell === 1)).toBe(true);
    expect(ink.progress).toBe(0);
    expect(footprint(page)).toEqual(originalFootprint);

    // Keep the nozzle ABOVE the page, on one narrow column. Ink can only
    // receive these droplets after a real hole opens in the unfinished page.
    spray(world, page, 40, 90, () => ink.progress > 0);
    expect(page.phaseStep).toBe(1);
    expect(page.progress).toBeGreaterThan(0);
    expect(page.progress).toBeLessThan(0.88);
    expect(page.cells.some((cell) => cell <= 0.02)).toBe(true);
    expect(world.nozzle.y).toBeLessThan(page.y);
    expect(world.signals.has("page:opened")).toBe(false);
    spray(world, page, 40, 90, () => ink.done);
    expect(page.phaseStep).toBe(1);
    expect(world.completed).toBe(false);

    spray(world, page, 100, 90, () => page.phaseStep === 2, true);
    expect(page.verb).toBe("freeze");
    expect(page.done).toBe(false);
    expect(page.cells.every((cell) => cell === 0)).toBe(true);
    expect(page.requires).toContain("ink");
    expect(footprint(page)).toEqual(originalFootprint);
    expect(world.signals.has("page:opened")).toBe(true);
    expect(world.signals.has("page:redrafted")).toBe(false);
    expect(world.completed).toBe(false);

    spray(world, page, -40, 90);
    expect(world.completed).toBe(true);
    expect(world.signals.has("page:redrafted")).toBe(true);
    expect(footprint(page)).toEqual(originalFootprint);
    expect(world.targets).toHaveLength(2);

    const restart = call("09.15"),
      freshPage = task(restart, "page");
    expect(freshPage.verb).toBe("freeze");
    expect(freshPage.phaseStep).toBe(0);
    expect(footprint(freshPage)).toEqual(originalFootprint);
    expect(restart.signals.size).toBe(0);
    expect(
      restart.targets.every((target) => !target.done && target.progress === 0),
    ).toBe(true);
    expect(restart.completed).toBe(false);
  });

  it("09.18 holds both carts before the turbine, starts real horizontal travel, and keeps the first delivery complete", () => {
    const world = call("09.18");
    const turbine = task(world, "turbine");
    const left = task(world, "leftCart"),
      right = task(world, "rightCart");
    const poses = [footprint(left), footprint(right)];
    world.nozzle.on = false;
    advance(world, 180);
    aim(world, left, 35, 30);
    advance(world, 150);
    world.nozzle.on = false;
    for (const [index, cart] of [left, right].entries()) {
      expect(footprint(cart)).toEqual(poses[index]);
      expect(cart.progress).toBe(0);
      expect(cart.motionStartedAt).toBe(-1);
      expect(world.available(cart)).toBe(false);
    }

    spray(world, turbine, 20, 85);
    advance(world, 1);
    for (const [index, cart] of [left, right].entries()) {
      expect(footprint(cart)).toEqual(poses[index]);
      expect(cart.motionStartedAt).toBeGreaterThan(0);
      expect(world.available(cart)).toBe(true);
    }
    advance(world, 180);
    for (const [index, cart] of [left, right].entries()) {
      expect(Math.abs(cart.x - poses[index].x)).toBeGreaterThan(20);
      expect(cart.y).toBe(poses[index].y);
      expect(cart.motion?.ry).toBe(0);
    }

    spray(world, left, 35, 30);
    const completedAt = left.completedAt;
    expect(world.completed).toBe(false);
    advance(world, Math.ceil((left.motion!.period + 2) * 60));
    expect(left.done).toBe(true);
    expect(left.progress).toBe(1);
    expect(left.completedAt).toBe(completedAt);
    expect(right.progress).toBe(0);
    spray(world, right, 50, 38);
    expect(world.completed).toBe(true);
  });

  it("09.18 stationary assist preserves thermal requirements and permits reverse-order deliveries", () => {
    const world = call("09.18");
    world.stationary = true;
    const left = task(world, "leftCart"),
      right = task(world, "rightCart");
    const poses = [footprint(left), footprint(right)];
    spray(world, task(world, "turbine"), 20, 85);
    advance(world, 900);
    expect([footprint(left), footprint(right)]).toEqual(poses);

    aim(world, right, 35, 30); // Correct for the left cart, wrong for the right.
    advance(world, 150);
    world.nozzle.on = false;
    expect(right.progress).toBe(0);
    expect(world.mistakes).toBeGreaterThan(0);
    spray(world, right, 50, 38);
    advance(world, 900);
    expect(right.done).toBe(true);
    expect(left.progress).toBe(0);
    expect([footprint(left), footprint(right)]).toEqual(poses);
    expect(world.completed).toBe(false);
    spray(world, left, 35, 30);
    expect(world.completed).toBe(true);
  });
});
