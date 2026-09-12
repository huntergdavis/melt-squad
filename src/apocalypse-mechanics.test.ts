import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { apocalypseLevels } from "./packs/18";
import { availableRoutes, iceSolidFraction } from "./mechanics/flow";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => {
  const level = apocalypseLevels.find((item) => item.id === id);
  expect(level, `authored ${id}`).toBeDefined();
  return new World(level!);
};
const target = (w: World, id: string) => {
  const found = w.targets.find((item) => item.id === id);
  expect(found, id).toBeDefined();
  return found!;
};
function advance(w: World, frames: number) {
  for (let frame = 0; frame < frames; frame++) w.update(1 / 60, idle);
}
function aim(w: World, t: LiveTarget, temp: number, pressure = 85) {
  Object.assign(w.nozzle, {
    x: t.x + t.w / 2,
    y: t.y - 52,
    angle: 0,
    temp,
    pressure,
    on: true,
  });
}
// Reuse the shipped diner/mycelium tests' ordinary nozzle controls. No direct
// writes to progress, phase, parcels, cells, signals, or completion state.
function spray(
  w: World,
  t: LiveTarget,
  temp: number,
  ready = () => t.done,
  inspect?: () => void,
) {
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp);
    if (t.verb === "melt")
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
    inspect?.();
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id} ${t.id} actual water`).toBe(true);
}
function flush(w: World) {
  w.nozzle.on = false;
  advance(w, 240);
  expect(w.drops).toHaveLength(0);
  expect(w.runoff).toHaveLength(0);
}
function waitUntil(w: World, ready: () => boolean) {
  for (let frame = 0; frame < 6000 && !ready(); frame++) advance(w, 1);
  expect(ready()).toBe(true);
}

describe("Apocalypse sequential tea chime", () => {
  it("18.14 judges actual arriving water, preserves missed-window progress, and advances only after the previous bell", () => {
    const w = scene("18.14"),
      [first, second, third] = w.targets;
    expect(w.targets.map((task) => task.id)).toEqual([
      "firstBell",
      "secondBell",
      "thirdBell",
    ]);
    expect(
      w.targets.every((task) => task.verb === "spin" && !task.motion),
    ).toBe(true);
    expect(w.targets.map((task) => task.pulse)).toEqual(
      [1, 2, 3].map((untimedOrder) => ({
        period: 8,
        open: 4,
        phase: 0,
        untimedOrder,
      })),
    );
    expect(second.requires).toEqual([first.id]);
    expect(third.requires).toEqual([second.id]);
    expect(w.available(first)).toBe(true);
    expect(w.available(second)).toBe(false);
    expect(w.available(third)).toBe(false);
    const poses = w.targets.map((task) => [task.x, task.y]);
    w.nozzle.on = false;
    advance(w, 228); // GO emission at 3.8s arrives after the 4s closing edge.
    aim(w, first, 20);
    w.nozzle.y = first.y - 200;
    expect(w.pulseOpen(first)).toBe(true);
    advance(w, 6);
    w.nozzle.on = false;
    expect(first.progress).toBe(0);
    advance(w, 90);
    expect(w.pulseOpen(first)).toBe(false);
    expect(first.feedback).toContain("REST");
    expect(first.progress).toBe(0);
    expect(w.mistakes).toBe(0);
    waitUntil(w, () => w.elapsed >= 7.8 - 1e-9);
    expect(w.pulseOpen(first)).toBe(false);
    w.nozzle.on = true; // REST emission arrives inside the next GO interval.
    advance(w, 6);
    w.nozzle.on = false;
    expect(first.progress).toBe(0);
    advance(w, 40);
    expect(w.pulseOpen(first)).toBe(true);
    expect(first.progress).toBeGreaterThan(0);
    const retained = first.progress;
    advance(w, 16 * 60);
    expect(first.progress).toBe(retained);
    expect(w.mistakes).toBe(0);
    waitUntil(
      w,
      () =>
        w.pulsePosition(first) >= 4.2 / 8 && w.pulsePosition(first) <= 4.3 / 8,
    );
    aim(w, first, 0, 20);
    advance(w, 90);
    expect(first.progress).toBe(retained);
    expect(w.mistakes).toBe(0);
    w.nozzle.on = false;
    advance(w, 90);
    aim(w, third, 20);
    advance(w, 90);
    expect(second.progress).toBe(0);
    expect(third.progress).toBe(0);
    for (const bell of w.targets) spray(w, bell, 20);
    expect(w.targets.map((task) => [task.x, task.y])).toEqual(poses);
    expect(w.untimed).toBe(false);
    expect(w.completed).toBe(true);
  });

  it("18.14 untimed assist holds only the next bell open but still needs liquid high pressure and resets the sequence", () => {
    const w = scene("18.14"),
      [first, second, third] = w.targets;
    w.untimed = true;
    expect(w.targets.map((bell) => w.pulseOpen(bell))).toEqual([
      true,
      false,
      false,
    ]);
    aim(w, third, 20);
    advance(w, 120);
    expect(third.progress).toBe(0);
    expect(w.mistakes).toBe(0);
    aim(w, first, 0);
    advance(w, 120);
    aim(w, first, 20, 69);
    advance(w, 120);
    expect(first.progress).toBe(0);
    expect(w.mistakes).toBeGreaterThan(0);
    spray(w, first, 20);
    expect(w.available(second)).toBe(true);
    expect(w.available(third)).toBe(false);
    expect(w.pulseOpen(second)).toBe(true);
    expect(w.pulseOpen(third)).toBe(false);
    const earnedAt = first.completedAt,
      mistakes = w.mistakes;
    aim(w, third, 20);
    advance(w, 8 * 60);
    expect(third.progress).toBe(0);
    expect(first.completedAt).toBe(earnedAt);
    expect(first.progress).toBe(1);
    expect(w.mistakes).toBe(mistakes);
    spray(w, second, 20);
    expect(w.available(third)).toBe(true);
    expect(w.pulseOpen(third)).toBe(true);
    spray(w, third, 20);
    expect(w.completed).toBe(true);
    const reset = scene("18.14");
    reset.untimed = true;
    expect(reset.targets.map((bell) => reset.pulseOpen(bell))).toEqual([
      true,
      false,
      false,
    ]);
    expect(reset.targets.map((bell) => reset.available(bell))).toEqual([
      true,
      false,
      false,
    ]);
    expect(
      reset.targets.every((bell) => !bell.done && bell.progress === 0),
    ).toBe(true);
    expect(reset.elapsed).toBe(0);
    expect(reset.mistakes).toBe(0);
    expect(reset.completed).toBe(false);
  });
});

describe("Apocalypse real soup tributaries", () => {
  for (const firstId of ["leftPlug", "rightPlug"])
    it(`18.11 uses real reservoir overflow and both thermal phases with ${firstId} first`, () => {
      const w = scene("18.11"),
        channels = w.level.channels!;
      const source = target(w, "reservoir"),
        middle = target(w, "middleBowl");
      const plugs = [
        target(w, firstId),
        target(w, firstId === "leftPlug" ? "rightPlug" : "leftPlug"),
      ];
      const bowls = [target(w, "leftBowl"), middle, target(w, "rightBowl")];
      expect(w.targets).toHaveLength(6);
      expect(bowls.every((bowl) => bowl.verb === "fill" && bowl.flowOnly)).toBe(
        true,
      );
      expect(channels.inlet.x).toBeGreaterThanOrEqual(source.x);
      expect(channels.inlet.y).toBeGreaterThanOrEqual(source.y);
      expect(channels.inlet.x + channels.inlet.w).toBeLessThanOrEqual(
        source.x + source.w,
      );
      expect(channels.inlet.y + channels.inlet.h).toBeLessThanOrEqual(
        source.y + source.h,
      );
      expect(
        channels.branches.every((branch) => branch.overflowFrom === source.id),
      ).toBe(true);
      for (const plug of plugs) {
        const route = channels.branches.findIndex((branch) =>
          branch.iceGates?.some(
            (gate) => gate.target === plug.id && gate.state === "open",
          ),
        );
        expect(route).toBeGreaterThanOrEqual(0);
        expect(
          w
            .channelPath(route)
            .some(
              ([x, y]) =>
                x >= plug.x &&
                x <= plug.x + plug.w &&
                y >= plug.y &&
                y <= plug.y + plug.h,
            ),
        ).toBe(true);
      }
      expect(availableRoutes(channels.branches, w.targets)).toEqual([]);
      for (const bowl of bowls) {
        aim(w, bowl, 20);
        advance(w, 90);
      }
      flush(w);
      expect(bowls.map((bowl) => bowl.progress)).toEqual([0, 0, 0]);
      expect(source.progress).toBe(0);
      expect(w.mistakes).toBe(0);
      for (const plug of plugs) {
        const footprint = [plug.x, plug.y, plug.w, plug.h];
        expect(plug.phase!.steps.map((step) => step.verb)).toEqual([
          "freeze",
          "melt",
        ]);
        expect(plug.phase!.steps[1].requires).toContain(middle.id);
        spray(w, plug, -40, () => plug.phaseStep === 1);
        expect(plug.verb).toBe("melt");
        expect(plug.done).toBe(false);
        expect(iceSolidFraction(plug)).toBe(1);
        expect([plug.x, plug.y, plug.w, plug.h]).toEqual(footprint);
        expect(w.available(plug)).toBe(false);
        aim(w, plug, 100); // The diversion must be used before final remelting.
        advance(w, 60);
        expect(iceSolidFraction(plug)).toBe(1);
      }
      flush(w);
      const middleRoute = channels.branches.findIndex(
        (branch) => branch.target === middle.id,
      );
      let emittedAt: number | undefined, deliveredAt: number | undefined;
      const violations = new Set<string>();
      const inspect = () => {
        if (w.runoff.length && emittedAt === undefined) emittedAt = w.elapsed;
        if (middle.progress > 0 && deliveredAt === undefined)
          deliveredAt = w.elapsed;
        if (!source.done && bowls.some((bowl) => bowl.progress > 0))
          violations.add("delivery before full source");
        if (bowls[0].progress || bowls[2].progress)
          violations.add("closed side received water");
        if (w.runoff.some((drop) => drop.branch !== middleRoute))
          violations.add("parcel entered closed branch");
      };
      spray(w, source, 20, () => source.done, inspect);
      expect(availableRoutes(channels.branches, w.targets)).toEqual([
        middleRoute,
      ]);
      expect(w.completed).toBe(false);
      spray(w, source, 20, () => middle.done, inspect);
      expect([...violations]).toEqual([]);
      const points = w.channelPath(middleRoute);
      const length = points
        .slice(1)
        .reduce(
          (total, point, index) =>
            total +
            Math.hypot(
              point[0] - points[index][0],
              point[1] - points[index][1],
            ),
          0,
        );
      expect(emittedAt).toBeDefined();
      expect(deliveredAt! - emittedAt!).toBeGreaterThanOrEqual(
        length / 220 - 1 / 60 - 1e-8,
      );
      expect(plugs.every((plug) => !plug.done && w.available(plug))).toBe(true);
      flush(w);
      const deliveredMiddle = middle.completedAt;
      for (const [index, plug] of plugs.entries()) {
        const bowl = target(
          w,
          plug.id === "leftPlug" ? "leftBowl" : "rightBowl",
        );
        spray(w, plug, 100);
        expect(iceSolidFraction(plug)).toBe(0);
        expect(middle.progress).toBe(1);
        expect(middle.completedAt).toBe(deliveredMiddle);
        const expected = channels.branches.flatMap((branch, route) =>
          branch.target === bowl.id ||
          (index === 1 && branch.target !== middle.id)
            ? [route]
            : [],
        );
        expect(availableRoutes(channels.branches, w.targets)).toEqual(expected);
        spray(w, source, 20, () => bowl.done);
        if (index === 0) {
          expect(w.completed).toBe(false);
          expect(
            target(w, bowl.id === "leftBowl" ? "rightBowl" : "leftBowl")
              .progress,
          ).toBe(0);
          flush(w);
        }
      }
      expect(w.completed).toBe(true);
      expect(w.targets.every((task) => task.done)).toBe(true);
      const reset = scene("18.11");
      expect(
        reset.targets.every((task) => !task.done && task.progress === 0),
      ).toBe(true);
      expect(
        reset.targets
          .filter((task) => task.phase)
          .every(
            (plug) =>
              plug.phaseStep === 0 &&
              plug.verb === "freeze" &&
              iceSolidFraction(plug) === 0,
          ),
      ).toBe(true);
      expect(
        availableRoutes(reset.level.channels!.branches, reset.targets),
      ).toEqual([]);
      expect(reset.signals.size).toBe(0);
      expect(reset.runoff).toHaveLength(0);
      expect(reset.completed).toBe(false);
    });

  it("18.11 cancels already-travelling side deliveries when real ice closes that route, without draining earned soup", () => {
    const w = scene("18.11"),
      source = target(w, "reservoir"),
      plug = target(w, "leftPlug");
    const left = target(w, "leftBowl"),
      right = target(w, "rightBowl"),
      middle = target(w, "middleBowl");
    spray(w, source, 20);
    flush(w);
    const retained = left.progress,
      rightBefore = right.progress;
    aim(w, source, 20);
    advance(w, 18);
    w.nozzle.on = false;
    const route = w.level.channels!.branches.findIndex(
      (branch) => branch.target === left.id,
    );
    expect(w.runoff.some((drop) => drop.branch === route)).toBe(true);
    const first = w.runoff.find((drop) => drop.branch === route)!;
    expect(w.runoffPosition(first).arrived).toBe(false);
    expect(left.progress).toBe(retained);
    spray(w, plug, -40, () => plug.phaseStep === 1);
    expect(iceSolidFraction(plug)).toBe(1);
    expect(plug.done).toBe(false);
    flush(w);
    expect(left.progress).toBe(retained);
    expect(right.progress).toBeGreaterThan(rightBefore);
    expect(middle.progress).toBe(0);
    expect(source.progress).toBe(1);
    for (const bowl of [left, middle, right]) {
      const before = bowl.progress;
      aim(w, bowl, 20);
      advance(w, 120);
      flush(w);
      expect(bowl.progress).toBe(before);
    }
    expect(w.completed).toBe(false);
  });
});
