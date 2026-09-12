import { describe, expect, it } from "vitest";
import { createBalance, stepBalance, type BalancePlan } from "./balance";
import { World, type Drop } from "../engine";
import { levels } from "../levels";
import type { Level } from "../types";

describe("A physical municipal balance", () => {
  it("the heavier side falls, and swapping loads mirrors the motion", () => {
    const right = createBalance(),
      left = createBalance();
    for (let i = 0; i < 120; i++) {
      stepBalance(right, 0, 5, 1 / 60);
      stepBalance(left, 5, 0, 1 / 60);
    }
    expect(right.angle).toBeGreaterThan(0.2);
    expect(left.angle).toBeCloseTo(-right.angle);
    expect(right.level).toBe(false);
  });
  it("matching loads must physically settle; completion is not a mass checklist", () => {
    const state = createBalance();
    for (let i = 0; i < 180; i++) stepBalance(state, 0, 5, 1 / 60);
    const tilted = state.angle;
    stepBalance(state, 5, 5, 1 / 60);
    expect(state.angle).toBeGreaterThan(0.1);
    expect(state.angle).toBeLessThan(tilted);
    expect(state.level).toBe(false);
    for (let i = 0; i < 800; i++) stepBalance(state, 5, 5, 1 / 60);
    expect(state.level).toBe(true);
    expect(Math.abs(state.angle)).toBeLessThan(0.018);
    stepBalance(state, 4, 5, 1 / 60);
    expect(state.level).toBe(false);
  });
  it("empty pans never certify a biscuit, and paused time never settles a beam", () => {
    const empty = createBalance();
    for (let i = 0; i < 100; i++) stepBalance(empty, 0, 0, 1 / 60);
    expect(empty.level).toBe(false);
    const paused = createBalance();
    for (let i = 0; i < 100; i++) stepBalance(paused, 5, 5, 0);
    expect(paused.settled).toBe(0);
    expect(paused.level).toBe(false);
  });
  it("bounds travel and rejects invalid external numbers", () => {
    const state = createBalance();
    for (let i = 0; i < 500; i++) stepBalance(state, 0, 50, 1);
    expect(Math.abs(state.angle)).toBeLessThanOrEqual(0.35);
    stepBalance(state, NaN, -1, Infinity);
    expect(Number.isFinite(state.angle)).toBe(true);
    expect(state.leftMass).toBe(0);
    expect(state.rightMass).toBe(0);
  });
});

describe("Unequal-arm playground balance", () => {
  it("defaults omitted arms independently to the original unit-arm API", () => {
    const oldCall = createBalance();
    const explicit = createBalance();
    const partial = createBalance();
    for (let i = 0; i < 120; i++) {
      stepBalance(oldCall, 2, 4, 1 / 60);
      stepBalance(explicit, 2, 4, 1 / 60, { leftArm: 1, rightArm: 1 });
      stepBalance(partial, 2, 4, 1 / 60, { rightArm: 1 });
    }
    expect(explicit).toEqual(oldCall);
    expect(partial).toEqual(oldCall);
  });

  it("tips toward greater torque even when that side has less mass", () => {
    const right = createBalance();
    const left = createBalance();
    stepBalance(right, 2, 1, 1 / 60, { leftArm: 1, rightArm: 3 });
    stepBalance(left, 1, 2, 1 / 60, { leftArm: 3, rightArm: 1 });
    expect(right.angle).toBeGreaterThan(0);
    expect(right.velocity).toBeGreaterThan(0);
    expect(left.angle).toBeCloseTo(-right.angle);
    expect(left.velocity).toBeCloseTo(-right.velocity);
  });

  it("uses squared arm lengths in rotational inertia", () => {
    const state = createBalance();
    const dt = 1 / 60;
    stepBalance(state, 2, 1, dt, { leftArm: 1, rightArm: 3 });
    // At rest and level, only the load torque contributes to the first step.
    const inertia = 2 * 0.6 ** 2 + 2 * 1 ** 2 + 1 * 3 ** 2;
    const expectedVelocity = ((1 * 3 - 2 * 1) * 9.81 / inertia) * dt;
    expect(state.velocity).toBeCloseTo(expectedVelocity, 12);
    expect(state.angle).toBeCloseTo(expectedVelocity * dt, 12);
  });

  it("settles three units at arm one against one unit at arm three", () => {
    const plan: BalancePlan = {
      id: "seesaw", x: 480, y: 300, arm: 80,
      left: { mass: 3, arm: 1 },
      right: { target: "seat", mass: 1, arm: 3 },
    };
    expect(plan.left.target).toBeUndefined();
    const arms = { leftArm: plan.left.arm, rightArm: plan.right.arm };
    const state = createBalance();
    for (let i = 0; i < 180; i++) stepBalance(state, 3, 0, 1 / 60, arms);
    expect(state.angle).toBeLessThan(-0.2);
    stepBalance(state, 3, 1, 1 / 60, arms);
    expect(state.level).toBe(false);
    for (let i = 0; i < 800; i++) stepBalance(state, 3, 1, 1 / 60, arms);
    expect(state.level).toBe(true);
    expect(Math.abs(state.angle)).toBeLessThan(0.018);
    expect(state.leftMass).toBe(3);
    expect(state.rightMass).toBe(1);
    stepBalance(state, 3, 0.9, 1 / 60, arms);
    expect(state.level).toBe(false);
    expect(state.settled).toBe(0);
  });

  it("does not certify equal masses at unequal distances", () => {
    const state = createBalance();
    for (let i = 0; i < 800; i++)
      stepBalance(state, 1, 1, 1 / 60, { leftArm: 1, rightArm: 3 });
    expect(state.angle).toBeGreaterThan(0.2);
    expect(state.level).toBe(false);
    expect(state.settled).toBe(0);
  });

  it("still requires a real rest hold and nonempty loads with unequal arms", () => {
    const paused = createBalance();
    const empty = createBalance();
    const arms = { leftArm: 1, rightArm: 3 };
    for (let i = 0; i < 100; i++) {
      stepBalance(paused, 3, 1, 0, arms);
      stepBalance(empty, 0, 0, 1 / 60, arms);
    }
    expect(paused.settled).toBe(0);
    expect(paused.level).toBe(false);
    expect(empty.level).toBe(false);
    for (let i = 0; i < 20; i++) stepBalance(paused, 3, 1, 1 / 60, arms);
    expect(paused.level).toBe(false);
    for (let i = 0; i < 20; i++) stepBalance(paused, 3, 1, 1 / 60, arms);
    expect(paused.level).toBe(true);
  });

  it("clamps positive extreme ratios and rejects invalid arms without certification", () => {
    const extreme = createBalance();
    const bounded = createBalance();
    for (let i = 0; i < 120; i++) {
      stepBalance(extreme, 3, 1, 1 / 60, { leftArm: Number.MIN_VALUE, rightArm: Number.MAX_VALUE });
      stepBalance(bounded, 3, 1, 1 / 60, { leftArm: 0.1, rightArm: 10 });
    }
    expect(extreme).toEqual(bounded);
    for (const value of [NaN, Infinity, -Infinity, 0, -3]) {
      const state = createBalance();
      for (let i = 0; i < 100; i++)
        stepBalance(state, 1, 1, 1 / 60, { leftArm: value, rightArm: value });
      expect(Number.isFinite(state.angle) && Number.isFinite(state.velocity)).toBe(true);
      expect(Math.abs(state.angle)).toBeLessThanOrEqual(0.35);
      expect(state.level).toBe(false);
    }
  });

  it("keeps extreme finite loads and corrupted state bounded", () => {
    const state = createBalance();
    Object.assign(state, { angle: NaN, velocity: Infinity, settled: Infinity });
    for (let i = 0; i < 500; i++)
      stepBalance(state, 0, Number.MAX_VALUE, 1, { leftArm: 0.1, rightArm: 10 });
    expect(Number.isFinite(state.angle) && Number.isFinite(state.velocity)).toBe(true);
    expect(Math.abs(state.angle)).toBeLessThanOrEqual(0.35);
    expect(state.rightMass).toBe(1e6);
    expect(state.level).toBe(false);
    stepBalance(state, NaN, -1, Infinity, { leftArm: NaN, rightArm: -1 });
    expect(state.leftMass).toBe(0);
    expect(state.rightMass).toBe(0);
    expect(state.settled).toBe(0);
  });
});

const inspection: Level = {
  ...levels[0],
  targets: [
    {
      id: "ice",
      name: "Build counterweight",
      verb: "freeze",
      x: 600,
      y: 350,
      w: 100,
      h: 70,
    },
    {
      id: "water",
      name: "Collect water",
      verb: "fill",
      x: 260,
      y: 350,
      w: 100,
      h: 70,
      requires: ["ice"],
    },
    {
      id: "stamp",
      name: "Certify",
      verb: "warm",
      x: 440,
      y: 440,
      w: 100,
      h: 55,
      requires: ["ice", "water"],
      needsSignals: ["scale"],
    },
  ],
  balance: {
    id: "scale",
    x: 480,
    y: 260,
    arm: 110,
    left: { target: "water", mass: 5 },
    right: { target: "ice", mass: 5 },
  },
};
const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const drop: Drop = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  life: 1,
  temp: 30,
  pressure: 25,
};
it("engine derives mass from thermal progress and certification waits for the physical signal", () => {
  const world = new World(inspection),
    [ice, water, stamp] = world.targets;
  world.nozzle.on = false;
  world.impact(ice, { ...drop, temp: -30 }, ice.x, ice.y);
  world.update(1 / 60, idle);
  expect(world.balance!.rightMass).toBeCloseTo(ice.progress * 5);
  // Completed-load fixture isolates the settling gate; all authored calls also
  // run through actual emitted water in game.test.ts.
  ice.done = true;
  for (let i = 0; i < 180; i++) world.update(1 / 60, idle);
  water.done = true;
  expect(world.available(stamp)).toBe(false);
  world.impact(stamp, drop, stamp.x, stamp.y);
  expect(stamp.progress).toBe(0);
  expect(world.waitingFor(stamp)).toContain("settle level");
  for (let i = 0; i < 800; i++) world.update(1 / 60, idle);
  expect(world.signals.has("scale")).toBe(true);
  expect(world.available(stamp)).toBe(true);
  world.impact(stamp, drop, stamp.x, stamp.y);
  expect(stamp.progress).toBeGreaterThan(0);
});
