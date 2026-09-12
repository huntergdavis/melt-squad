import { describe, expect, it } from "vitest";
import { createBalance, stepBalance } from "./balance";
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
