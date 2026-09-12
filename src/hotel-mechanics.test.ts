import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { hotelLevels } from "./packs/19";
import { availableRoutes } from "./mechanics/flow";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => {
  const level = hotelLevels.find((item) => item.id === id);
  expect(level, id).toBeDefined();
  return new World(level!);
};
const target = (w: World, id: string) => {
  const found = w.targets.find((item) => item.id === id);
  expect(found, id).toBeDefined();
  return found!;
};
const pose = (t: LiveTarget) => [t.x, t.y, t.w, t.h];
function advance(w: World, frames: number) {
  for (let frame = 0; frame < frames; frame++) w.update(1 / 60, idle);
}
function aim(w: World, t: LiveTarget, temp: number, pressure = 85) {
  Object.assign(w.nozzle, {
    on: true,
    x: t.x + t.w / 2,
    y: t.y - 52,
    angle: 0,
    temp,
    pressure,
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
    inspect?: () => void;
  } = {},
) {
  const ready = options.ready ?? (() => t.done);
  // Reuse the library/diner actual-water controls; no target, parcel, phase,
  // discovery, progress, signal, elapsed, or completion state is assigned.
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp, options.pressure);
    if (options.sweep)
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
    options.inspect?.();
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id}: ${t.id}`).toBe(true);
}
function shoot(
  w: World,
  t: LiveTarget,
  temp: number,
  pressure: number,
  frames: number,
) {
  for (let frame = 0; frame < frames; frame++) {
    aim(w, t, temp, pressure);
    advance(w, 1);
  }
  w.nozzle.on = false;
}
function flush(w: World) {
  w.nozzle.on = false;
  advance(w, 240);
  expect(w.drops).toHaveLength(0);
  expect(w.runoff).toHaveLength(0);
}

it("19.17 sends hose drops through a real partial ice hole into the active welcome bowl before the tag is cleared", () => {
  const w = scene("19.17"),
    tag = target(w, "nameTag"),
    bowl = target(w, "welcomeBowl"),
    seal = target(w, "welcomeSeal");
  expect(w.targets).toHaveLength(3);
  expect(w.level.channels).toBeUndefined();
  expect(w.available(tag)).toBe(true);
  expect(w.available(bowl)).toBe(true);
  expect(bowl.flowOnly).not.toBe(true);
  expect(bowl.y).toBeGreaterThan(tag.y + tag.h);
  const column = tag.x + tag.w / 2;
  expect(column).toBeGreaterThan(bowl.x);
  expect(column).toBeLessThan(bowl.x + bowl.w);
  expect(seal.requires?.slice().sort()).toEqual([tag.id, bowl.id].sort());
  shoot(w, seal, 35, 25, 90);
  expect(seal.progress).toBe(0);
  shoot(w, tag, 0, 85, 120);
  expect(tag.progress).toBe(0);
  expect(bowl.progress).toBe(0);
  spray(w, tag, 40, { ready: () => bowl.progress > 0 });
  expect(w.nozzle.x).toBe(column);
  expect(w.nozzle.y).toBeLessThan(tag.y);
  expect(tag.cells.some((cell) => cell <= 0.02)).toBe(true);
  expect(tag.cells.some((cell) => cell > 0.02)).toBe(true);
  expect(tag.progress).toBeGreaterThan(0);
  expect(tag.progress).toBeLessThan(0.88);
  expect(tag.done).toBe(false);
  spray(w, tag, 40, { ready: () => bowl.done });
  expect(tag.done).toBe(false);
  expect(tag.cells.some((cell) => cell > 0.02)).toBe(true);
  expect(w.available(seal)).toBe(false);
  expect(w.completed).toBe(false);
  shoot(w, seal, 35, 25, 90);
  expect(seal.progress).toBe(0);
  spray(w, tag, 100, { sweep: true });
  expect(w.available(seal)).toBe(true);
  shoot(w, seal, 95, 85, 90);
  expect(seal.progress).toBe(0);
  spray(w, seal, 35, { pressure: 25 });
  expect(w.completed).toBe(true);
  const reset = scene("19.17");
  expect(reset.targets.every((t) => !t.done && t.progress === 0)).toBe(true);
  expect(target(reset, "nameTag").cells.every((cell) => cell === 1)).toBe(true);
  expect(reset.available(target(reset, "welcomeBowl"))).toBe(true);
  expect(reset.completed).toBe(false);
});

it("19.16 requires all real gates and a full source, rejects direct cup sprays, and delivers three travelling flows without reset leakage", () => {
  const w = scene("19.16"),
    source = target(w, "reservoir"),
    channels = w.level.channels!;
  const gates = ["rightGate", "leftGate", "middleGate"].map((id) =>
    target(w, id),
  );
  const cups = ["leftCup", "middleCup", "rightCup"].map((id) => target(w, id));
  expect(w.targets).toHaveLength(7);
  expect(source.requires?.slice().sort()).toEqual(
    gates.map((t) => t.id).sort(),
  );
  expect(channels.inlet.x).toBeGreaterThanOrEqual(source.x);
  expect(channels.inlet.y).toBeGreaterThanOrEqual(source.y);
  expect(channels.inlet.x + channels.inlet.w).toBeLessThanOrEqual(
    source.x + source.w,
  );
  expect(channels.inlet.y + channels.inlet.h).toBeLessThanOrEqual(
    source.y + source.h,
  );
  expect(channels.branches).toHaveLength(3);
  expect(
    channels.branches.every((branch) => branch.overflowFrom === source.id),
  ).toBe(true);
  shoot(w, source, 20, 85, 120);
  expect(source.progress).toBe(0);
  expect(w.runoff).toHaveLength(0);
  for (const [index, gate] of gates.entries()) {
    shoot(w, gate, 0, 85, 60);
    expect(gate.progress).toBe(0);
    spray(w, gate, 100, { sweep: true });
    expect(gates.slice(index + 1).every((other) => other.progress === 0)).toBe(
      true,
    );
    expect(w.available(source)).toBe(index === 2);
    expect(availableRoutes(channels.branches, w.targets)).toEqual([]);
  }
  flush(w);
  for (const [index, branch] of channels.branches.entries()) {
    const gate = target(w, branch.gate!);
    expect(gate.verb).toBe("melt");
    expect(
      w
        .channelPath(index)
        .some(
          ([x, y]) =>
            x >= gate.x &&
            x <= gate.x + gate.w &&
            y >= gate.y &&
            y <= gate.y + gate.h,
        ),
    ).toBe(true);
  }
  for (const cup of cups) {
    expect(cup.flowOnly).toBe(true);
    expect(w.available(cup)).toBe(true);
    shoot(w, cup, 20, 85, 90);
  }
  flush(w);
  expect(cups.map((cup) => cup.progress)).toEqual([0, 0, 0]);
  expect(source.progress).toBe(0);
  const emitted = new Map<number, number>(),
    delivered = new Map<number, number>();
  const violations = new Set<string>();
  let fullAt: number | undefined;
  spray(w, source, 20, {
    ready: () => cups.every((cup) => cup.done),
    inspect: () => {
      if (source.done && fullAt === undefined) fullAt = w.elapsed;
      if (
        !source.done &&
        (w.runoff.length || cups.some((cup) => cup.progress > 0))
      )
        violations.add("delivery before full reservoir");
      for (const parcel of w.runoff)
        if (!emitted.has(parcel.branch)) emitted.set(parcel.branch, w.elapsed);
      channels.branches.forEach((branch, index) => {
        const cup = w.targets.find((t) => t.id === branch.target)!;
        if (cup.progress > 0 && !delivered.has(index))
          delivered.set(index, w.elapsed);
      });
    },
  });
  expect([...violations]).toEqual([]);
  expect(emitted.size).toBe(3);
  expect(delivered.size).toBe(3);
  for (const index of [0, 1, 2]) {
    const points = w.channelPath(index);
    const length = points
      .slice(1)
      .reduce(
        (sum, point, i) =>
          sum + Math.hypot(point[0] - points[i][0], point[1] - points[i][1]),
        0,
      );
    expect(emitted.get(index)!).toBeGreaterThanOrEqual(fullAt!);
    expect(delivered.get(index)! - emitted.get(index)!).toBeGreaterThanOrEqual(
      length / 220 - 1 / 60 - 1e-8,
    );
  }
  expect(w.completed).toBe(true);
  const reset = scene("19.16");
  expect(reset.targets.every((t) => !t.done && t.progress === 0)).toBe(true);
  expect(
    availableRoutes(reset.level.channels!.branches, reset.targets),
  ).toEqual([]);
  expect(reset.runoff).toHaveLength(0);
  expect(reset.available(target(reset, "reservoir"))).toBe(false);
});

describe("Hotel aquarium cabin", () => {
  it("19.13 moves all four targets as one cabin, keeps completed windows attached, and requires gentle water after all three thaws", () => {
    const w = scene("19.13"),
      windows = w.targets.filter((t) => t.verb === "melt"),
      badge = target(w, "cabinBadge");
    expect(windows.map((t) => t.id)).toEqual([
      "leftWindow",
      "middleWindow",
      "rightWindow",
    ]);
    expect(w.targets).toHaveLength(4);
    expect(badge.requires?.slice().sort()).toEqual(
      windows.map((t) => t.id).sort(),
    );
    expect(badge.temp).toEqual([25, 45]);
    expect(badge.pressure).toEqual([10, 35]);
    expect(w.targets.map((t) => t.motion)).toEqual(
      w.targets.map(() => ({ rx: 0, ry: 85, period: 18, phase: Math.PI / 2 })),
    );
    const start = w.targets.map(pose),
      middle = target(w, "middleWindow");
    const offsets = w.targets.map((t) => [t.x - middle.x, t.y - middle.y]);
    const violations = new Set<string>();
    const inspect = () => {
      for (const [i, t] of w.targets.entries())
        if (
          Math.abs(t.x - middle.x - offsets[i][0]) > 1e-8 ||
          Math.abs(t.y - middle.y - offsets[i][1]) > 1e-8
        )
          violations.add(t.id + " left the cabin");
    };
    w.nozzle.on = false;
    advance(w, 180);
    expect(w.targets.map(pose)).not.toEqual(start);
    inspect();
    expect(w.available(badge)).toBe(false);
    shoot(w, badge, 35, 25, 120);
    expect(badge.progress).toBe(0);
    spray(w, windows[0], 100, { sweep: true, inspect });
    const earned = windows[0].completedAt,
      finishedPose = pose(windows[0]);
    expect(w.available(badge)).toBe(false);
    advance(w, 180);
    expect(pose(windows[0])).not.toEqual(finishedPose);
    expect(windows[0].completedAt).toBe(earned);
    expect(windows[0].progress).toBe(1);
    inspect();
    for (const pane of windows.slice(1))
      spray(w, pane, 100, { sweep: true, inspect });
    flush(w);
    expect(w.available(badge)).toBe(true);
    shoot(w, badge, 60, 25, 90);
    expect(badge.progress).toBe(0);
    spray(w, badge, 35, {
      pressure: 25,
      ready: () => badge.progress > 0.2,
      inspect,
    });
    flush(w);
    const retained = badge.progress;
    advance(w, 180);
    expect(badge.progress).toBe(retained);
    spray(w, badge, 35, { pressure: 25, inspect });
    expect([...violations]).toEqual([]);
    expect(w.completed).toBe(true);
    const parked = w.targets.map(pose);
    advance(w, 18 * 60);
    expect(w.targets.map(pose)).toEqual(parked);
    const cabin = w.level.props.find((p) => p.follow === "middleWindow");
    expect(cabin).toBeDefined();
    expect(cabin!.reveal).toBeUndefined();
    const reset = scene("19.13");
    expect(reset.targets.map(pose)).toEqual(start);
    expect(reset.targets.every((t) => !t.done && t.progress === 0)).toBe(true);
    expect(reset.available(target(reset, "cabinBadge"))).toBe(false);
  });

  it("19.13 stationary assist retains real thermal work and still enforces the badge's pressure after reverse-order thaws", () => {
    const w = scene("19.13"),
      starts = w.targets.map(pose),
      windows = w.targets.filter((t) => t.verb === "melt"),
      badge = target(w, "cabinBadge");
    w.stationary = true;
    shoot(w, windows[0], 0, 85, 90);
    expect(windows[0].progress).toBe(0);
    expect(w.mistakes).toBeGreaterThan(0);
    expect(w.targets.map(pose)).toEqual(starts);
    spray(w, windows[0], 40, { ready: () => windows[0].progress > 0.1 });
    flush(w);
    const retained = windows[0].progress;
    expect(retained).toBeLessThan(0.88);
    w.stationary = false;
    advance(w, 180);
    expect(w.targets.map(pose)).not.toEqual(starts);
    expect(windows[0].progress).toBe(retained);
    w.stationary = true;
    advance(w, 1);
    expect(w.targets.map(pose)).toEqual(starts);
    expect(windows[0].progress).toBe(retained);
    for (const pane of windows.slice().reverse())
      spray(w, pane, 100, { sweep: true });
    flush(w);
    shoot(w, badge, 35, 85, 90);
    expect(badge.progress).toBe(0);
    spray(w, badge, 35, { pressure: 25 });
    expect(w.completed).toBe(true);
    expect(w.targets.map(pose)).toEqual(starts);
    expect(scene("19.13").stationary).toBe(false);
  });
});
