import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { myceliumLevels } from "./packs/14";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => {
  const level = myceliumLevels.find((item) => item.id === id);
  expect(level, `authored scene ${id}`).toBeDefined();
  return new World(level!);
};
const target = (w: World, id: string) => {
  const task = w.targets.find((item) => item.id === id);
  expect(task, `authored target ${id}`).toBeDefined();
  return task!;
};
const pose = (t: LiveTarget) => [t.x, t.y, t.w, t.h];
function advance(w: World, frames: number) {
  for (let frame = 0; frame < frames; frame++) w.update(1 / 60, idle);
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
  pressure = 85,
  sweep = false,
) {
  // Reuse library/conservatory real-water helpers: only nozzle controls and
  // ordinary updates change progress. No direct impact, completion, or mass edits.
  for (let frame = 0; frame < 6000 && !t.done; frame++) {
    aim(w, t, temp, pressure);
    if (sweep)
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
  }
  w.nozzle.on = false;
  expect(t.done, `${w.level.id}: ${t.id} completes from arriving water`).toBe(
    true,
  );
}
function drain(w: World) {
  w.nozzle.on = false;
  advance(w, 300);
  expect(w.drops).toHaveLength(0);
}

describe("Mycelium ascending freight cup", () => {
  it("14.14 starts once after the turbine, retains actual fill between vertical passes, and parks the real completion pose", () => {
    const w = scene("14.14");
    const lift = target(w, "lift"),
      cup = target(w, "cup");
    expect(w.targets).toHaveLength(2);
    expect(cup.requires).toEqual(["lift"]);
    expect(cup.motion).toEqual({
      rx: 0,
      ry: 105,
      period: 16,
      phase: Math.PI / 2,
      after: ["lift"],
    });
    expect(pose(cup)).toEqual([600, 405, 140, 70]);
    aim(w, cup, 20);
    advance(w, 150);
    drain(w);
    expect(cup.progress).toBe(0);
    expect(cup.motionStartedAt).toBe(-1);
    expect(pose(cup)).toEqual([600, 405, 140, 70]);
    expect(w.available(cup)).toBe(false);

    spray(w, lift, 20);
    advance(w, 1);
    const startedAt = cup.motionStartedAt;
    expect(startedAt).toBeGreaterThan(0);
    expect(cup.y).toBe(405);
    expect(w.available(cup)).toBe(true);
    advance(w, 180);
    expect(cup.x).toBe(600);
    expect(cup.y).toBeCloseTo(
      300 + Math.sin(Math.PI / 2 + (3 * Math.PI) / 8) * 105,
    );
    expect(cup.y).toBeLessThan(405);
    for (let frame = 0; frame < 20; frame++) {
      aim(w, cup, 20);
      advance(w, 1);
    }
    drain(w);
    const retained = cup.progress,
      mistakes = w.mistakes;
    expect(retained).toBeGreaterThan(0);
    expect(retained).toBeLessThan(1);
    advance(w, 16 * 60);
    expect(cup.progress).toBe(retained);
    expect(w.mistakes).toBe(mistakes);
    expect(cup.motionStartedAt).toBe(startedAt);
    expect(lift.done).toBe(true);
    expect(w.completed).toBe(false);
    spray(w, cup, 20);
    expect(w.stationary).toBe(false);
    expect(w.completed).toBe(true);
    expect(cup.y).not.toBeCloseTo(405, 3);
    const parked = pose(cup);
    const follow = [cup.x + cup.w / 2, cup.y + cup.h * 0.75];
    const props = w.level.props.filter((prop) => prop.kind === "freightcup");
    expect(props.length).toBeGreaterThan(0);
    for (const prop of props) {
      expect(prop.follow).toBe(cup.id);
      expect(prop.target).toBe(cup.id);
      expect(prop.scale).toBe(1);
      expect(prop.reveal).toBeUndefined();
    }
    advance(w, 16 * 60);
    expect(pose(cup)).toEqual(parked);
    expect([cup.x + cup.w / 2, cup.y + cup.h * 0.75]).toEqual(follow);
  });

  it("14.14 stationary assist preserves the lift and liquid-water requirements; replay clears and restarts the carrier", () => {
    const w = scene("14.14");
    const lift = target(w, "lift"),
      cup = target(w, "cup");
    w.stationary = true;
    aim(w, cup, 20);
    advance(w, 150);
    expect(cup.progress).toBe(0);
    aim(w, lift, 20, 60);
    advance(w, 150);
    expect(lift.progress).toBe(0);
    spray(w, lift, 20);
    drain(w);
    aim(w, cup, 0);
    advance(w, 150);
    expect(cup.progress).toBe(0);
    expect(pose(cup)).toEqual([600, 405, 140, 70]);
    expect(w.mistakes).toBeGreaterThan(0);
    spray(w, cup, 20);
    expect(w.completed).toBe(true);
    expect(pose(cup)).toEqual([600, 405, 140, 70]);

    const reset = scene("14.14"),
      freshCup = target(reset, "cup");
    expect(reset.stationary).toBe(false);
    expect(
      reset.targets.every((task) => !task.done && task.progress === 0),
    ).toBe(true);
    expect(freshCup.motionStartedAt).toBe(-1);
    expect(reset.signals.size).toBe(0);
    expect(reset.completed).toBe(false);
    reset.nozzle.on = false;
    advance(reset, 180);
    expect(pose(freshCup)).toEqual([600, 405, 140, 70]);
    spray(reset, target(reset, "lift"), 20);
    advance(reset, 181);
    expect(freshCup.y).toBeLessThan(380);
    expect(freshCup.progress).toBe(0);
  });
});

it("14.18 caps an actual-water counterweight at the fixed book mass and waits for stable torque balance, with a clean replay", () => {
  const w = scene("14.18"),
    tank = target(w, "counterweight");
  expect(w.targets).toHaveLength(1);
  expect(tank.verb).toBe("fill");
  expect(tank.motion).toBeUndefined();
  expect(w.available(tank)).toBe(true);
  expect(w.level.needsSignals).toEqual(["freight:level"]);
  expect(w.level.balance).toEqual({
    id: "freight:level",
    x: 480,
    y: 315,
    arm: 180,
    left: { mass: 5 },
    right: { target: tank.id, mass: 5 },
  });
  const fixedInlet = pose(tank);
  w.nozzle.on = false;
  advance(w, 180);
  expect(w.balance!.angle).toBeLessThan(-0.1);
  expect(w.balance!.leftMass).toBe(5);
  expect(w.balance!.rightMass).toBe(0);
  expect(w.signals.has("freight:level")).toBe(false);
  aim(w, tank, 0);
  advance(w, 120);
  drain(w);
  expect(tank.progress).toBe(0);

  aim(w, tank, 20);
  advance(w, 30);
  drain(w);
  expect(tank.progress).toBeGreaterThan(0);
  expect(tank.progress).toBeLessThan(0.5);
  expect(w.balance!.rightMass).toBeCloseTo(tank.progress * 5);
  expect(w.balance!.angle).toBeLessThan(-0.1);
  expect(w.balance!.level).toBe(false);
  expect(w.signals.has("freight:level")).toBe(false);
  expect(w.completed).toBe(false);
  expect(pose(tank)).toEqual(fixedInlet);

  spray(w, tank, 20);
  expect(w.completed).toBe(false);
  expect(w.completionPending).toBe(true);
  expect(w.signals.has("freight:level")).toBe(false);
  // Keep emitting into the already full inlet while the real scale settles.
  // Capacity must stay capped; elapsed time alone must not unlock completion.
  aim(w, tank, 20);
  advance(w, 120);
  expect(tank.progress).toBe(1);
  expect(w.balance!.rightMass).toBe(5);
  expect(w.balance!.level).toBe(false);
  expect(w.completed).toBe(false);
  w.nozzle.on = false;
  for (let frame = 0; frame < 1200 && !w.completed; frame++) advance(w, 1);
  expect(w.completed).toBe(true);
  expect(w.completionPending).toBe(false);
  expect(w.signals.has("freight:level")).toBe(true);
  expect(w.balance!.leftMass).toBe(5);
  expect(w.balance!.rightMass).toBe(5);
  expect(Math.abs(w.balance!.angle)).toBeLessThan(0.018);
  expect(Math.abs(w.balance!.velocity)).toBeLessThan(0.025);
  expect(w.balance!.settled).toBeGreaterThanOrEqual(0.45);
  expect(pose(tank)).toEqual(fixedInlet);
  const parked = { ...w.balance! };
  advance(w, 300);
  expect(w.balance).toEqual(parked);

  const reset = scene("14.18");
  expect(reset.targets[0].progress).toBe(0);
  expect(reset.targets[0].done).toBe(false);
  expect(pose(reset.targets[0])).toEqual(fixedInlet);
  expect(reset.signals.size).toBe(0);
  expect(reset.completed).toBe(false);
  expect(reset.balance!.settled).toBe(0);
  reset.nozzle.on = false;
  advance(reset, 180);
  expect(reset.balance!.rightMass).toBe(0);
  expect(reset.balance!.angle).toBeLessThan(-0.1);
  expect(reset.balance!.level).toBe(false);
});

it.each([
  { id: "14.07", first: "left", cover: "Skylight", basin: "Drips" },
  { id: "14.12", first: "right", cover: "Label", basin: "Seeds" },
])(
  "$id keeps each reading-room branch independent before its shared ending",
  ({ id, first, cover, basin }) => {
    const w = scene(id),
      other = first === "left" ? "right" : "left";
    const opened = target(w, first + cover),
      filled = target(w, first + basin);
    const closed = target(w, other + cover),
      waiting = target(w, other + basin);
    expect(filled.requires).toEqual([opened.id]);
    expect(waiting.requires).toEqual([closed.id]);
    aim(w, waiting, 20);
    advance(w, 150);
    drain(w);
    expect(waiting.progress).toBe(0);
    spray(w, opened, 40, 85, true);
    expect(w.available(filled)).toBe(true);
    expect(w.available(waiting)).toBe(false);
    // Aim above the opened skylight/label, not directly inside the basin. The
    // actual droplet route reaches this basin without opening the other branch.
    Object.assign(w.nozzle, {
      x: filled.x + filled.w / 2,
      y: opened.y - 52,
      temp: 20,
      pressure: 85,
      angle: 0,
      on: true,
    });
    expect(w.nozzle.x).toBeGreaterThan(opened.x);
    expect(w.nozzle.x).toBeLessThan(opened.x + opened.w);
    for (let frame = 0; frame < 1200 && !filled.done; frame++) advance(w, 1);
    w.nozzle.on = false;
    expect(filled.done).toBe(true);
    expect(waiting.progress).toBe(0);
    expect(closed.done).toBe(false);
    expect(w.completed).toBe(false);
    const panel = id === "14.12" ? target(w, "nightPanel") : undefined;
    if (panel) {
      expect(panel.requires).toEqual(["leftSeeds", "rightSeeds"]);
      expect(w.available(panel)).toBe(false);
      aim(w, panel, -40);
      advance(w, 150);
      drain(w);
      expect(panel.progress).toBe(0);
    }
    spray(w, closed, 40, 85, true);
    spray(w, waiting, 20);
    expect(filled.progress).toBe(1);
    if (panel) {
      expect(w.available(panel)).toBe(true);
      expect(w.completed).toBe(false);
      spray(w, panel, -40);
    }
    expect(w.completed).toBe(true);
  },
);

it("14.13 needs contrasting passenger settings without revoking a completed welcome", () => {
  const w = scene("14.13");
  const blueNear = target(w, "blueNear"),
    blueFar = target(w, "blueFar");
  const amberNear = target(w, "amberNear"),
    amberFar = target(w, "amberFar");
  expect(w.targets).toHaveLength(4);
  expect(w.targets.every((task) => w.available(task))).toBe(true);
  for (const task of [blueNear, blueFar]) {
    expect(task.temp).toEqual([15, 30]);
    expect(task.pressure).toEqual([10, 30]);
  }
  for (const task of [amberNear, amberFar]) {
    expect(task.temp).toEqual([45, 60]);
    expect(task.pressure).toEqual([25, 45]);
  }
  aim(w, amberNear, 20, 20);
  advance(w, 150);
  drain(w);
  expect(amberNear.progress).toBe(0);
  expect(w.mistakes).toBeGreaterThan(0);
  spray(w, blueNear, 20, 20);
  const earnedAt = blueNear.completedAt;
  spray(w, amberNear, 50, 35);
  drain(w);
  expect(blueNear.done).toBe(true);
  expect(blueNear.progress).toBe(1);
  expect(blueNear.completedAt).toBe(earnedAt);
  expect(blueFar.progress).toBe(0);
  expect(amberFar.progress).toBe(0);
  expect(w.completed).toBe(false);
  spray(w, amberFar, 50, 35);
  spray(w, blueFar, 20, 20);
  expect(w.completed).toBe(true);
});

it("14.20 requires both welcome panels, then the correctly warmed boiler, then the departure jet", () => {
  const w = scene("14.20");
  const panels = w.targets.filter((task) => task.verb === "freeze");
  const boiler = w.targets.find((task) => task.verb === "warm")!;
  const departure = w.targets.find((task) => task.verb === "spin")!;
  expect(w.targets).toHaveLength(4);
  expect(panels).toHaveLength(2);
  expect(boiler.requires?.slice().sort()).toEqual(
    panels.map((task) => task.id).sort(),
  );
  expect(boiler.temp).toEqual([45, 65]);
  expect(boiler.pressure).toEqual([25, 45]);
  expect(departure.requires).toEqual([boiler.id]);
  expect(w.available(boiler)).toBe(false);
  expect(w.available(departure)).toBe(false);
  aim(w, departure, 20);
  advance(w, 150);
  drain(w);
  expect(departure.progress).toBe(0);
  spray(w, panels[1], -40);
  expect(w.available(boiler)).toBe(false);
  spray(w, panels[0], -40);
  expect(w.available(boiler)).toBe(true);
  expect(w.available(departure)).toBe(false);
  aim(w, boiler, 20);
  advance(w, 150);
  drain(w);
  expect(boiler.progress).toBe(0);
  spray(w, boiler, 55, 35);
  expect(w.available(departure)).toBe(true);
  expect(w.completed).toBe(false);
  spray(w, departure, 20);
  expect(w.completed).toBe(true);
});
