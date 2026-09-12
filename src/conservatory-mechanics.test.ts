import { describe, expect, it } from "vitest";
import { World, type LiveTarget, type Runoff } from "./engine";
import { conservatoryLevels } from "./packs/13";
import { availableRoutes } from "./mechanics/flow";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => {
  const level = conservatoryLevels.find((level) => level.id === id);
  expect(level, `authored scene ${id}`).toBeDefined();
  return new World(level!);
};
const target = (w: World, id: string) => {
  const task = w.targets.find((task) => task.id === id);
  expect(task, `authored target ${id}`).toBeDefined();
  return task!;
};
const pose = (t: LiveTarget) => [t.x, t.y, t.w, t.h];
function advance(w: World, frames: number) {
  for (let i = 0; i < frames; i++) w.update(1 / 60, idle);
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
    clearance?: number;
    ready?: () => boolean;
  } = {},
) {
  const ready = options.ready ?? (() => t.done);
  // Reuse drainage.test.ts/library-mechanics.test.ts: only nozzle controls and
  // ordinary updates deliver water. Never call impact or write target progress.
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp, options.pressure);
    if (options.clearance !== undefined) w.nozzle.y = t.y - options.clearance;
    if (options.sweep)
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id}: ${t.id} reaches its next state`).toBe(true);
}
function drain(w: World) {
  w.nozzle.on = false;
  // Longer than the far channel's 2.89s transit and the last droplet's flight.
  advance(w, 300);
  expect(w.drops).toHaveLength(0);
  expect(w.runoff).toHaveLength(0);
}
const pathLength = (points: [number, number][]) =>
  points
    .slice(1)
    .reduce(
      (sum, point, i) =>
        sum + Math.hypot(point[0] - points[i][0], point[1] - points[i][1]),
      0,
    );

describe("Conservatory connected weather", () => {
  it("13.14 holds a full source behind closed mouths and rejects direct cloud sprays after residual water is flushed", () => {
    const w = scene("13.14");
    const reservoir = target(w, "reservoir");
    const clouds = [target(w, "nearCloud"), target(w, "farCloud")];
    expect(w.available(reservoir)).toBe(true);
    const inlet = w.level.channels!.inlet;
    expect(inlet.x).toBeGreaterThanOrEqual(reservoir.x);
    expect(inlet.y).toBeGreaterThanOrEqual(reservoir.y);
    expect(inlet.x + inlet.w).toBeLessThanOrEqual(reservoir.x + reservoir.w);
    expect(inlet.y + inlet.h).toBeLessThanOrEqual(reservoir.y + reservoir.h);
    spray(w, reservoir, 20);
    aim(w, reservoir, 20);
    advance(w, 240);
    expect(reservoir.progress).toBe(1);
    expect(availableRoutes(w.level.channels!.branches, w.targets)).toEqual([]);
    expect(w.runoff).toHaveLength(0);
    expect(clouds.map((cloud) => cloud.progress)).toEqual([0, 0]);
    expect(w.completed).toBe(false);

    for (const id of ["nearBlock", "farBlock"])
      spray(w, target(w, id), 40, { sweep: true });
    drain(w);
    expect(availableRoutes(w.level.channels!.branches, w.targets)).toEqual([
      0, 1,
    ]);
    for (const cloud of clouds) {
      expect(w.available(cloud)).toBe(true);
      expect(cloud.flowOnly).toBe(true);
      const before = clouds.map((task) => task.progress);
      aim(w, cloud, 20);
      advance(w, 150);
      expect(cloud.feedback).toContain("Feed the inlet");
      drain(w);
      expect(clouds.map((task) => task.progress)).toEqual(before);
    }
    expect(clouds.map((cloud) => cloud.progress)).toEqual([0, 0]);
    expect(w.completed).toBe(false);
  });

  it.each(["near", "far"] as const)(
    "13.14 delivers %s first only after a full reservoir and actual connected parcel travel",
    (first) => {
      const w = scene("13.14");
      const other = first === "near" ? "far" : "near";
      const reservoir = target(w, "reservoir");
      const cloud = target(w, first + "Cloud");
      const closedCloud = target(w, other + "Cloud");
      const gate = target(w, first + "Block");
      const branch = first === "near" ? 0 : 1;
      const path = w.channelPath(branch);
      const distance = pathLength(path);
      expect(path).toContainEqual([gate.x + gate.w / 2, gate.y + gate.h / 2]);
      expect(pathLength(w.channelPath(1))).toBeGreaterThan(
        pathLength(w.channelPath(0)) * 1.5,
      );
      for (const route of w.level.channels!.branches)
        expect(route.overflowFrom).toBe(reservoir.id);
      // At the usual 52px clearance the nozzle overlaps the upper reservoir:
      // those real droplets legitimately fill it while the mouth is melting.
      // A closer reachable position isolates the empty-source prerequisite.
      spray(w, gate, 40, { sweep: true, clearance: 30 });
      expect(reservoir.progress).toBe(0);
      expect(availableRoutes(w.level.channels!.branches, w.targets)).toEqual(
        [],
      );
      aim(w, reservoir, 20);
      advance(w, 60);
      expect(reservoir.progress).toBeGreaterThan(0);
      expect(reservoir.done).toBe(false);
      expect(w.runoff).toHaveLength(0);
      expect(cloud.progress).toBe(0);
      spray(w, reservoir, 20);
      expect(reservoir.done).toBe(true);
      expect(cloud.progress).toBe(0);
      expect(availableRoutes(w.level.channels!.branches, w.targets)).toEqual([
        branch,
      ]);

      let parcel: Runoff | undefined;
      let emittedAt = 0;
      let firstArrival = false;
      aim(w, reservoir, 20);
      for (let frame = 0; frame < 1800 && !cloud.done; frame++) {
        advance(w, 1);
        if (!parcel) {
          parcel = w.runoff.find((drop) => drop.branch === branch);
          if (parcel) emittedAt = w.elapsed - parcel.distance / 220;
        }
        expect(w.runoff.every((drop) => drop.branch === branch)).toBe(true);
        expect(closedCloud.progress).toBe(0);
        if (!firstArrival && cloud.progress > 0) {
          expect(parcel).toBeDefined();
          expect(parcel!.distance).toBeGreaterThanOrEqual(distance);
          expect(w.elapsed - emittedAt).toBeGreaterThanOrEqual(
            distance / 220 - 1 / 60,
          );
          firstArrival = true;
        }
      }
      w.nozzle.on = false;
      expect(firstArrival).toBe(true);
      expect(cloud.done).toBe(true);
      expect(closedCloud.done).toBe(false);
      expect(w.completed).toBe(false);
      spray(w, target(w, other + "Block"), 40, { sweep: true });
      spray(w, reservoir, 20, { ready: () => w.completed });
      expect(cloud.progress).toBe(1);
      expect(closedCloud.progress).toBe(1);
      expect(reservoir.progress).toBe(1);
      const reset = scene("13.14");
      expect(reset.targets.every((t) => !t.done && t.progress === 0)).toBe(
        true,
      );
      expect(
        availableRoutes(reset.level.channels!.branches, reset.targets),
      ).toEqual([]);
      expect(reset.runoff).toHaveLength(0);
      expect(reset.completed).toBe(false);
    },
  );
});

describe("Conservatory scenic hanging basket", () => {
  it("13.18 retains real fill between passes and parks its followed artwork at the actual moving completion pose", () => {
    const w = scene("13.18");
    const basket = target(w, "planter");
    expect(w.targets).toHaveLength(1);
    expect(w.available(basket)).toBe(true);
    expect(basket.motion).toEqual({ rx: 175, ry: 0, period: 14, phase: 0 });
    expect(pose(basket)).toEqual([575, 340, 160, 70]);
    w.nozzle.on = false;
    advance(w, 90);
    expect(basket.x).toBeLessThan(550);
    expect(basket.y).toBe(340);
    for (let frame = 0; frame < 20; frame++) {
      aim(w, basket, 20);
      advance(w, 1);
    }
    drain(w);
    const retained = basket.progress;
    expect(retained).toBeGreaterThan(0);
    expect(retained).toBeLessThan(1);
    const mistakes = w.mistakes;
    advance(w, 14 * 60);
    expect(basket.progress).toBe(retained);
    expect(w.mistakes).toBe(mistakes);
    expect(w.completed).toBe(false);
    spray(w, basket, 20);
    expect(w.stationary).toBe(false);
    expect(w.completed).toBe(true);
    expect(basket.x).not.toBeCloseTo(575, 3);
    const parked = pose(basket);
    const follow = [basket.x + basket.w / 2, basket.y + basket.h * 0.75];
    const props = w.level.props.filter(
      (prop) => prop.kind === "hangingplanter",
    );
    expect(props.length).toBeGreaterThan(0);
    for (const prop of props) {
      expect(prop.follow).toBe(basket.id);
      expect(prop.target).toBe(basket.id);
      expect(prop.reveal).toBeUndefined();
    }
    advance(w, 14 * 60);
    expect(pose(basket)).toEqual(parked);
    expect([basket.x + basket.w / 2, basket.y + basket.h * 0.75]).toEqual(
      follow,
    );
    expect(basket.progress).toBe(1);
  });

  it("13.18 stationary assist holds a reachable basin but still needs liquid water, and reset restores the moving scene", () => {
    const w = scene("13.18");
    const basket = target(w, "planter");
    w.stationary = true;
    w.nozzle.on = false;
    advance(w, 300);
    expect(pose(basket)).toEqual([575, 340, 160, 70]);
    aim(w, basket, 0);
    advance(w, 120);
    expect(basket.progress).toBe(0);
    expect(w.mistakes).toBeGreaterThan(0);
    spray(w, basket, 20);
    expect(w.completed).toBe(true);
    expect(pose(basket)).toEqual([575, 340, 160, 70]);
    const reset = scene("13.18");
    expect(reset.stationary).toBe(false);
    expect(pose(target(reset, "planter"))).toEqual([575, 340, 160, 70]);
    expect(reset.targets[0].progress).toBe(0);
    expect(reset.targets[0].done).toBe(false);
    expect(reset.completed).toBe(false);
    reset.nozzle.on = false;
    advance(reset, 90);
    expect(reset.targets[0].x).toBeLessThan(550);
  });
});

it("13.06 keeps each pane's basin independent and 13.20 requires both farewell badges before dispatch", () => {
  const skylights = scene("13.06");
  const left = target(skylights, "leftRain");
  const right = target(skylights, "rightRain");
  expect(left.requires).toEqual(["leftPane"]);
  expect(right.requires).toEqual(["rightPane"]);
  spray(skylights, target(skylights, "leftPane"), 40, { sweep: true });
  expect(skylights.available(left)).toBe(true);
  expect(skylights.available(right)).toBe(false);
  spray(skylights, left, 20);
  expect(right.progress).toBe(0);
  expect(target(skylights, "rightPane").done).toBe(false);
  expect(skylights.completed).toBe(false);

  const farewell = scene("13.20");
  const first = target(farewell, "firstFarewell");
  const second = target(farewell, "secondFarewell");
  const dispatch = target(farewell, "dispatch");
  expect(farewell.available(first)).toBe(false);
  expect(farewell.available(second)).toBe(false);
  expect(farewell.available(dispatch)).toBe(false);
  spray(farewell, target(farewell, "nameplate"), 40, { sweep: true });
  expect(farewell.available(first)).toBe(true);
  expect(farewell.available(second)).toBe(true);
  expect(farewell.available(dispatch)).toBe(false);
  spray(farewell, first, 35, { pressure: 25 });
  expect(farewell.available(dispatch)).toBe(false);
  spray(farewell, second, 35, { pressure: 25 });
  expect(farewell.available(dispatch)).toBe(true);
  spray(farewell, dispatch, 20);
  expect(first.done && second.done && farewell.completed).toBe(true);
});
