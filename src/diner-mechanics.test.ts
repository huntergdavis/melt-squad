import { describe, expect, it } from "vitest";
import { World, type LiveTarget, type Runoff } from "./engine";
import { dinerLevels } from "./packs/16";
import { availableRoutes } from "./mechanics/flow";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => {
  const level = dinerLevels.find((item) => item.id === id);
  expect(level, `authored scene ${id}`).toBeDefined();
  return new World(level!);
};
const target = (w: World, id: string) => {
  const task = w.targets.find((item) => item.id === id);
  expect(task, `authored target ${id}`).toBeDefined();
  return task!;
};
function advance(w: World, frames: number) {
  for (let frame = 0; frame < frames; frame++) w.update(1 / 60, idle);
}
function waitUntil(w: World, ready: () => boolean) {
  for (let frame = 0; frame < 1200 && !ready(); frame++) advance(w, 1);
  expect(
    ready(),
    `${w.level.id}: reaches the next bounded simulation window`,
  ).toBe(true);
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
  // Reuse conservatory/sports actual-water tests: no direct impact, elapsed,
  // progress, completion, cells, or parcel-state writes are permitted here.
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp, options.pressure);
    if (options.sweep)
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id}: ${t.id} reaches its next state`).toBe(true);
}
function thawOutlet(w: World, t: LiveTarget) {
  for (let step = 0; step < 40 && !t.done; step++) {
    Object.assign(w.nozzle, {
      x: t.x + [5, 25, 45, 65][step % 4],
      y: t.y - 30,
      temp: 100,
      pressure: 85,
      angle: 0,
      on: true,
    });
    advance(w, 15);
  }
  w.nozzle.on = false;
  expect(t.done, `${t.id}: bounded four-position gate sweep`).toBe(true);
}
function flush(w: World) {
  w.nozzle.on = false;
  // More than the longest 1077px route's 4.90s transit plus droplet flight.
  advance(w, 480);
  expect(w.drops).toHaveLength(0);
  expect(w.runoff).toHaveLength(0);
}
const length = (points: [number, number][]) =>
  points
    .slice(1)
    .reduce(
      (total, point, i) =>
        total + Math.hypot(point[0] - points[i][0], point[1] - points[i][1]),
      0,
    );

describe("Diner connected pancake service", () => {
  it.each(["upperOutlet", "lowerOutlet"])(
    "16.14 opens %s first and physically fills the reservoir then each overflow basin in order",
    (first) => {
      const w = scene("16.14"),
        source = target(w, "reservoir");
      const gate = target(w, first);
      const other = target(
        w,
        first === "upperOutlet" ? "lowerOutlet" : "upperOutlet",
      );
      const pancakes = [1, 2, 3].map((i) => target(w, `pancake${i}`));
      const channels = w.level.channels!;
      expect(w.targets).toHaveLength(6);
      expect(source.requires?.slice().sort()).toEqual([
        "lowerOutlet",
        "upperOutlet",
      ]);
      expect(channels.inlet.x).toBeGreaterThanOrEqual(source.x);
      expect(channels.inlet.y).toBeGreaterThanOrEqual(source.y);
      expect(channels.inlet.x + channels.inlet.w).toBeLessThanOrEqual(
        source.x + source.w,
      );
      expect(channels.inlet.y + channels.inlet.h).toBeLessThanOrEqual(
        source.y + source.h,
      );
      expect(channels.branches.map((branch) => branch.overflowFrom)).toEqual([
        "reservoir",
        "pancake1",
        "pancake2",
      ]);
      expect(channels.branches.map((branch) => branch.gate)).toEqual([
        undefined,
        "upperOutlet",
        "lowerOutlet",
      ]);
      aim(w, source, 20);
      advance(w, 120);
      expect(source.progress).toBe(0);
      thawOutlet(w, gate);
      expect(other.progress).toBe(0);
      expect(w.available(source)).toBe(false);
      expect(pancakes.every((task) => task.progress === 0)).toBe(true);
      thawOutlet(w, other);
      expect(w.available(source)).toBe(true);
      expect(availableRoutes(channels.branches, w.targets)).toEqual([]);
      for (const [i, pancake] of pancakes.entries()) {
        expect(pancake.flowOnly).toBe(true);
        expect(pancake.requires).toEqual([
          i === 0 ? source.id : pancakes[i - 1].id,
        ]);
        const path = w.channelPath(i);
        for (let previous = 0; previous < i; previous++)
          expect(path).toContainEqual([
            pancakes[previous].x + pancakes[previous].w / 2,
            pancakes[previous].y + pancakes[previous].h / 2,
          ]);
        for (const id of i === 2
          ? ["upperOutlet", "lowerOutlet"]
          : i === 1
            ? ["upperOutlet"]
            : []) {
          const block = target(w, id);
          expect(path).toContainEqual([
            block.x + block.w / 2,
            block.y + block.h / 2,
          ]);
        }
      }
      aim(w, source, 20);
      advance(w, 60);
      expect(source.progress).toBeGreaterThan(0);
      expect(source.done).toBe(false);
      expect(w.runoff).toHaveLength(0);
      expect(pancakes.every((task) => task.progress === 0)).toBe(true);
      spray(w, source, 20);
      expect(pancakes.every((task) => task.progress === 0)).toBe(true);
      expect(availableRoutes(channels.branches, w.targets)).toEqual([0]);

      const firstParcels: (Runoff | undefined)[] = [];
      const emittedAt: number[] = [],
        arrived = new Set<number>();
      // Inspect every frame, but avoid thousands of matcher allocations while
      // the full campaign suite is also simulating water in parallel workers.
      const invariantViolations = new Set<string>();
      aim(w, source, 20);
      for (let frame = 0; frame < 1800 && !w.completed; frame++) {
        advance(w, 1);
        for (const [i, pancake] of pancakes.entries()) {
          if (!firstParcels[i]) {
            firstParcels[i] = w.runoff.find((drop) => drop.branch === i);
            if (firstParcels[i])
              emittedAt[i] = w.elapsed - firstParcels[i]!.distance / 220;
          }
          if (
            pancake.progress > 0 &&
            !(i === 0 ? source.done : pancakes[i - 1].done)
          )
            invariantViolations.add(
              `${pancake.id} filled before its upstream basin`,
            );
          if (pancake.progress > 0 && !arrived.has(i)) {
            expect(firstParcels[i]).toBeDefined();
            const distance = length(w.channelPath(i));
            expect(firstParcels[i]!.distance).toBeGreaterThanOrEqual(distance);
            expect(w.elapsed - emittedAt[i]).toBeGreaterThanOrEqual(
              distance / 220 - 1 / 60,
            );
            arrived.add(i);
          }
        }
        const next = pancakes.findIndex((task) => !task.done);
        if (next >= 0) {
          const routes = availableRoutes(channels.branches, w.targets);
          if (routes.length !== 1 || routes[0] !== next)
            invariantViolations.add(
              `Expected route ${next}; got ${routes.join(",")}`,
            );
        }
      }
      w.nozzle.on = false;
      expect([...invariantViolations]).toEqual([]);
      expect(arrived).toEqual(new Set([0, 1, 2]));
      expect(w.completed).toBe(true);
      expect([source, ...pancakes].every((task) => task.progress === 1)).toBe(
        true,
      );
      const reset = scene("16.14");
      expect(
        reset.targets.every((task) => !task.done && task.progress === 0),
      ).toBe(true);
      expect(
        availableRoutes(reset.level.channels!.branches, reset.targets),
      ).toEqual([]);
      expect(reset.runoff).toHaveLength(0);
      expect(reset.completed).toBe(false);
    },
  );

  it("16.14 retains routed fill and rejects direct sprays at every available pancake after all residual parcels are flushed", () => {
    const w = scene("16.14"),
      source = target(w, "reservoir");
    for (const id of ["upperOutlet", "lowerOutlet"])
      thawOutlet(w, target(w, id));
    spray(w, source, 20);
    aim(w, source, 20);
    advance(w, 15);
    flush(w);
    const first = target(w, "pancake1");
    expect(first.progress).toBeGreaterThan(0);
    expect(first.progress).toBeLessThan(1);
    for (const id of ["pancake1", "pancake2", "pancake3"]) {
      const pancake = target(w, id);
      expect(w.available(pancake)).toBe(true);
      const retained = w.targets.map((task) => task.progress);
      aim(w, pancake, 20);
      advance(w, 150);
      expect(pancake.feedback).toContain("Feed the inlet");
      flush(w);
      expect(w.targets.map((task) => task.progress)).toEqual(retained);
      expect(w.completed).toBe(false);
      spray(w, source, 20, { ready: () => pancake.done });
      if (!w.completed) flush(w);
    }
    expect(w.completed).toBe(true);
  });
});

describe("Diner breakfast beat", () => {
  it("16.18 gates actual arriving drops, retains off-beat progress without penalty, and finishes all three stationary timed turbines", () => {
    const w = scene("16.18"),
      toast = target(w, "toastBeat");
    expect(w.targets.map((task) => task.id)).toEqual([
      "toastBeat",
      "mugBeat",
      "pancakeBeat",
    ]);
    expect(
      w.targets.every((task) => task.verb === "spin" && !task.motion),
    ).toBe(true);
    expect(w.targets.map((task) => task.pulse)).toEqual([
      { period: 9, open: 3, phase: 0, untimedOrder: 1 },
      { period: 9, open: 3, phase: 6, untimedOrder: 2 },
      { period: 9, open: 3, phase: 3, untimedOrder: 3 },
    ]);
    const poses = w.targets.map((task) => [task.x, task.y]);
    w.nozzle.on = false;
    advance(w, 168); // 2.8s: GO, but this longer real flight arrives after 3s.
    aim(w, toast, 20);
    w.nozzle.y = toast.y - 200;
    expect(w.pulseOpen(toast)).toBe(true);
    advance(w, 6);
    w.nozzle.on = false;
    expect(toast.progress).toBe(0);
    advance(w, 90);
    expect(w.pulseOpen(toast)).toBe(false);
    expect(toast.feedback).toContain("REST");
    expect(toast.progress).toBe(0);
    expect(w.mistakes).toBe(0);
    waitUntil(w, () => w.elapsed >= 8.8 - 1e-9);
    expect(w.pulseOpen(toast)).toBe(false);
    w.nozzle.on = true; // REST emission arrives during the following GO.
    advance(w, 6);
    w.nozzle.on = false;
    expect(toast.progress).toBe(0);
    advance(w, 40);
    expect(w.pulseOpen(toast)).toBe(true);
    expect(toast.progress).toBeGreaterThan(0);
    expect(toast.progress).toBeLessThan(1);
    const retained = toast.progress;
    advance(w, 18 * 60);
    expect(toast.progress).toBe(retained);
    expect(w.mistakes).toBe(0);
    waitUntil(
      w,
      () =>
        w.pulsePosition(toast) >= 3.2 / 9 && w.pulsePosition(toast) <= 3.3 / 9,
    );
    aim(w, toast, 0, 20); // Even wrong settings cannot penalize a closed gate.
    advance(w, 90);
    expect(toast.progress).toBe(retained);
    expect(w.mistakes).toBe(0);
    w.nozzle.on = false;
    advance(w, 90);
    for (const task of w.targets) spray(w, task, 20);
    expect(w.untimed).toBe(false);
    expect(w.targets.every((task) => task.progress === 1)).toBe(true);
    expect(w.targets.map((task) => [task.x, task.y])).toEqual(poses);
    expect(w.completed).toBe(true);
  });

  it("16.18 untimed mode holds only the next unfinished light and still requires liquid high-pressure water, including after replay", () => {
    const w = scene("16.18");
    w.untimed = true;
    const [first, second, last] = w.targets;
    expect(w.targets.map((task) => w.pulseOpen(task))).toEqual([
      true,
      false,
      false,
    ]);
    aim(w, last, 20);
    advance(w, 150);
    expect(last.progress).toBe(0);
    expect(last.feedback).toContain("NEXT");
    expect(w.mistakes).toBe(0);
    aim(w, first, 0);
    advance(w, 120);
    expect(first.progress).toBe(0);
    aim(w, first, 20, 69);
    advance(w, 120);
    expect(first.progress).toBe(0);
    expect(w.mistakes).toBeGreaterThan(0);
    spray(w, first, 20);
    expect(w.pulseOpen(second)).toBe(true);
    expect(w.pulseOpen(last)).toBe(false);
    const earnedAt = first.completedAt,
      mistakes = w.mistakes;
    aim(w, last, 20);
    advance(w, 180);
    expect(last.progress).toBe(0);
    expect(w.mistakes).toBe(mistakes);
    expect(first.progress).toBe(1);
    expect(first.completedAt).toBe(earnedAt);
    spray(w, second, 20);
    expect(w.pulseOpen(last)).toBe(true);
    spray(w, last, 20);
    expect(w.completed).toBe(true);
    const reset = scene("16.18");
    reset.untimed = true;
    expect(reset.targets.map((task) => reset.pulseOpen(task))).toEqual([
      true,
      false,
      false,
    ]);
    expect(
      reset.targets.every((task) => task.progress === 0 && !task.done),
    ).toBe(true);
    expect(reset.elapsed).toBe(0);
    expect(reset.mistakes).toBe(0);
    expect(reset.completed).toBe(false);
  });
});

it("16.05 and16.15 preserve each completed dish while the other comfort bands need their own settings", () => {
  for (const [id, bands, pressures] of [
    [
      "16.05",
      [
        [15, 30],
        [65, 85],
      ],
      [
        [10, 25],
        [30, 50],
      ],
    ],
    [
      "16.15",
      [
        [15, 30],
        [40, 55],
        [65, 80],
      ],
      [
        [20, 35],
        [20, 35],
        [20, 35],
      ],
    ],
  ] as const) {
    const w = scene(id);
    expect(w.targets).toHaveLength(bands.length);
    const tasks = w.targets.slice().sort((a, b) => a.temp![0] - b.temp![0]);
    for (const [i, task] of tasks.entries()) {
      expect(task.verb).toBe("warm");
      expect(w.available(task)).toBe(true);
      expect(task.temp).toEqual(bands[i]);
      expect(task.pressure).toEqual(pressures[i]);
    }
    const hot = tasks.at(-1)!;
    aim(w, hot, 20, 20);
    advance(w, 150);
    expect(hot.progress).toBe(0);
    expect(w.mistakes).toBeGreaterThan(0);
    const earned = new Map<string, number>();
    for (const task of tasks) {
      spray(w, task, (task.temp![0] + task.temp![1]) / 2, {
        pressure: (task.pressure![0] + task.pressure![1]) / 2,
      });
      earned.set(task.id, task.completedAt);
      for (const [id, completedAt] of earned) {
        const finished = target(w, id);
        expect(finished.progress).toBe(1);
        expect(finished.completedAt).toBe(completedAt);
      }
    }
    expect(w.completed).toBe(true);
  }
});

it("16.20 independently prepares three breakfasts and the guestbook before a gentle final welcome, never a departure jet", () => {
  const w = scene("16.20");
  const bowls = w.targets.filter((task) => task.verb === "fill");
  const guestbook = w.targets.find((task) => task.verb === "melt")!;
  const welcome = w.targets.find((task) => task.verb === "warm")!;
  expect(w.targets).toHaveLength(5);
  expect(bowls).toHaveLength(3);
  expect(
    w.targets.some((task) => task.verb === "spin" || task.verb === "freeze"),
  ).toBe(false);
  expect([...bowls, guestbook].every((task) => w.available(task))).toBe(true);
  expect(welcome.requires?.slice().sort()).toEqual(
    [...bowls, guestbook].map((task) => task.id).sort(),
  );
  expect(welcome.temp).toEqual([30, 45]);
  expect(welcome.pressure).toEqual([15, 35]);
  aim(w, welcome, 35, 25);
  advance(w, 150);
  expect(welcome.progress).toBe(0);
  for (const bowl of [bowls[2], bowls[0], bowls[1]]) spray(w, bowl, 20);
  expect(w.available(welcome)).toBe(false);
  expect(guestbook.done).toBe(false);
  spray(w, guestbook, 100, { sweep: true });
  expect(w.available(welcome)).toBe(true);
  expect(w.completed).toBe(false);
  aim(w, welcome, 65, 25);
  advance(w, 150);
  expect(welcome.progress).toBe(0);
  spray(w, welcome, 35, { pressure: 25 });
  expect(w.completed).toBe(true);
  expect(welcome.done).toBe(true);
});
