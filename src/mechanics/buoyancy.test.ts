import { describe, expect, it } from "vitest";
import {
  createBuoyancy,
  stepBuoyancy,
  type BuoyancyPlan,
  type BuoyancyState,
} from "./buoyancy";

const plan: BuoyancyPlan = {
  id: "podium:afloat",
  iceTarget: "pontoon",
  fillTarget: "basin",
  basin: { x: 350, y: 325, w: 280, h: 160 },
  pontoon: { x: 410, w: 150, h: 45, depth: 0.15 },
  pixelsPerMeter: 500,
  loadMass: 0.15,
  dockY: 322.9316666667,
};
function run(
  config = plan,
  fill = 1,
  frames = 1800,
  built = true,
  state = createBuoyancy(config),
) {
  for (let i = 0; i < frames; i++)
    stepBuoyancy(state, config, built, fill, 1 / 60);
  return state;
}
function equilibrium(config = plan, fill = 1) {
  const area =
    (config.pontoon.w / config.pixelsPerMeter) * config.pontoon.depth;
  const height = config.pontoon.h / config.pixelsPerMeter;
  const mass = (config.iceDensity ?? 917) * area * height + config.loadMass;
  const waterY = config.basin.y + config.basin.h * (1 - fill);
  return (
    waterY -
    config.pontoon.h +
    (mass / ((config.waterDensity ?? 1000) * area)) * config.pixelsPerMeter
  );
}
function finiteState(state: BuoyancyState) {
  for (const value of Object.values(state))
    if (typeof value === "number") expect(Number.isFinite(value)).toBe(true);
  expect(state.deckY).toBeGreaterThanOrEqual(0);
  expect(state.deckY).toBeLessThanOrEqual(580);
  expect(state.settled).toBeGreaterThanOrEqual(0);
  expect(state.settled).toBeLessThanOrEqual(0.45);
}

describe("Archimedes buoyancy for the floating podium", () => {
  it("shows an explicitly prebuilt exhibit on the dry floor and floats it without a construction target", () => {
    const exhibit: BuoyancyPlan = {
      ...plan,
      iceTarget: undefined,
      prebuilt: true,
      dockTolerance: 8,
    };
    const state = createBuoyancy(exhibit);
    expect(state.valid && state.active && state.grounded).toBe(true);
    expect(state.deckY).toBe(440);
    expect(state.waterY).toBe(485);
    expect(state.mass).toBeCloseTo(3.86385, 8);
    expect(state.docked).toBe(false);
    run(exhibit, 0.5, 1800, false, state);
    expect(state.floating).toBe(true);
    expect(state.deckY).toBeCloseTo(equilibrium(exhibit, 0.5), 4);
    expect(state.docked).toBe(false);
    run(exhibit, 1, 1800, false, state);
    expect(state.docked).toBe(true);
    expect(state.deckY).toBeCloseTo(equilibrium(exhibit), 4);
    expect(state.buoyantForce).toBeCloseTo(state.weight, 6);
    finiteState(state);
    const replay = createBuoyancy(exhibit);
    expect(replay.active && replay.grounded).toBe(true);
    expect(replay.deckY).toBe(440);
    expect(replay.settled).toBe(0);
    expect(replay.docked).toBe(false);
    expect(createBuoyancy(plan).active).toBe(false);
  });

  it("measures a generous exhibit band without attracting the body to its mark or bypassing physical settling", () => {
    const exhibit: BuoyancyPlan = {
      ...plan,
      iceTarget: undefined,
      prebuilt: true,
      dockTolerance: 8,
    };
    const inside = run({ ...exhibit, dockY: plan.dockY + 6 }, 1, 1800, false);
    const outside = run({ ...exhibit, dockY: plan.dockY + 10 }, 1, 1800, false);
    const precise = run(
      { ...exhibit, dockY: plan.dockY + 6, dockTolerance: undefined },
      1,
      1800,
      false,
    );
    expect(inside.docked).toBe(true);
    expect(outside.docked).toBe(false);
    expect(precise.docked).toBe(false);
    expect(inside.deckY).toBe(outside.deckY);
    expect(inside.deckY).toBe(precise.deckY);
    expect(inside.velocity).toBe(outside.velocity);
    expect(inside.buoyantForce).toBe(outside.buoyantForce);
    expect(inside.floating && !inside.grounded && !inside.sunk).toBe(true);
    expect(Math.abs(inside.velocity)).toBeLessThanOrEqual(0.001);
    expect(inside.settled).toBe(0.45);
  });

  it("rests on the dry floor with actual weight and no upward displacement force", () => {
    const state = run(plan, 0, 600);
    expect(state.deckY).toBe(440);
    expect(state.waterY).toBe(485);
    expect(state.mass).toBeCloseTo(3.86385, 8);
    expect(state.weight).toBeCloseTo(3.86385 * 9.81, 8);
    expect(state.buoyantForce).toBe(0);
    expect(state.displacedVolume).toBe(0);
    expect(state.grounded).toBe(true);
    expect(state.sunk).toBe(false);
    expect(state.floating).toBe(false);
    expect(state.docked).toBe(false);
    finiteState(state);
  });

  it("lifts only with sufficient water and cannot certify a partially filled basin even at a matching mark", () => {
    const shallow = run(plan, 0.1, 600);
    expect(shallow.waterY).toBe(469);
    expect(shallow.deckY).toBe(440);
    expect(shallow.grounded).toBe(true);
    expect(shallow.buoyantForce).toBeLessThan(shallow.weight);
    const partialPlan = { ...plan, dockY: equilibrium(plan, 0.5) };
    const partial = run(partialPlan, 0.5);
    expect(partial.waterY).toBe(405);
    expect(partial.deckY).toBeCloseTo(partialPlan.dockY, 5);
    expect(partial.floating).toBe(true);
    expect(partial.buoyantForce).toBeCloseTo(partial.weight, 6);
    expect(partial.docked).toBe(false);
  });

  it("rises dynamically and settles at the full-water dock within the solver's 1200-frame allowance", () => {
    const state = createBuoyancy(plan);
    stepBuoyancy(state, plan, true, 1, 1 / 60);
    expect(state.deckY).toBeLessThan(440);
    expect(state.deckY).toBeGreaterThan(439);
    expect(state.velocity).toBeLessThan(0);
    expect(state.docked).toBe(false);
    let frames = 0;
    while (!state.docked && frames < 1200) {
      stepBuoyancy(state, plan, true, 1, 1 / 60);
      frames++;
    }
    expect(frames).toBeLessThan(1200);
    expect(state.docked).toBe(true);
    expect(state.floating).toBe(true);
    expect(state.grounded || state.sunk).toBe(false);
    expect(state.settled).toBe(0.45);
    expect(Math.abs(state.velocity)).toBeLessThan(0.001);
    expect(state.deckY).toBeCloseTo(equilibrium(), 1);
    expect(state.buoyantForce).toBeCloseTo(state.weight, 2);
    expect(state.submergedDepth).toBeCloseTo(0.0858633333333, 4);
    expect(state.buoyantForce).toBeCloseTo(
      1000 * state.displacedVolume * 9.81,
      10,
    );
    finiteState(state);
  });

  it("uses physical mass for different equilibrium heights; changing the dock never attracts the body", () => {
    const light = { ...plan, loadMass: 0.05 };
    const heavy = { ...plan, loadMass: 0.25 };
    const a = run(light, 1, 2400),
      b = run(heavy, 1, 2400);
    expect(a.deckY).toBeCloseTo(equilibrium(light), 4);
    expect(b.deckY).toBeCloseTo(equilibrium(heavy), 4);
    expect(a.deckY).toBeLessThan(plan.dockY - 1);
    expect(b.deckY).toBeGreaterThan(plan.dockY + 1);
    expect(a.floating && b.floating).toBe(true);
    expect(a.docked || b.docked).toBe(false);
    const wrongMark = run({ ...plan, dockY: plan.dockY - 30 });
    expect(wrongMark.deckY).toBeCloseTo(equilibrium(), 5);
    expect(wrongMark.docked).toBe(false);
  });

  it("never certifies an overloaded or neutrally submerged body even with its dock at the floor", () => {
    for (const loadMass of [0.5, 4.05 - 3.71385]) {
      const state = run({ ...plan, loadMass, dockY: 440 }, 1, 600);
      expect(state.deckY).toBeCloseTo(440);
      expect(state.sunk).toBe(true);
      expect(state.grounded).toBe(true);
      expect(state.floating).toBe(false);
      expect(state.docked).toBe(false);
      expect(state.buoyantForce).toBeLessThanOrEqual(state.weight + 1e-8);
      finiteState(state);
    }
  });

  it("does not float absent ice and resets the full cycle when rebuilt or restarted", () => {
    const missing = run(plan, 1, 900, false);
    expect(missing.active).toBe(false);
    expect(missing.mass).toBe(0);
    expect(missing.deckY).toBe(440);
    expect(missing.waterY).toBe(325);
    expect(missing.docked).toBe(false);
    const completed = run();
    expect(completed.docked).toBe(true);
    stepBuoyancy(completed, plan, false, 1, 1 / 60);
    expect(completed).toEqual(missing);
    const restart = createBuoyancy(plan);
    expect(restart.deckY).toBe(440);
    expect(restart.waterY).toBe(485);
    expect(restart.active || restart.docked).toBe(false);
    expect(restart.settled).toBe(0);
  });

  it("caps elapsed steps and requires continuous simulated rest rather than repeated paused calls", () => {
    const capped = createBuoyancy(plan),
      ordinary = createBuoyancy(plan);
    stepBuoyancy(capped, plan, true, 1, 5000);
    stepBuoyancy(ordinary, plan, true, 1, 1 / 30);
    expect(capped).toEqual(ordinary);
    for (const dt of [0, -1, NaN, Infinity]) {
      const paused = createBuoyancy(plan);
      for (let i = 0; i < 100; i++) stepBuoyancy(paused, plan, true, 1, dt);
      expect(paused.deckY).toBe(440);
      expect(paused.settled).toBe(0);
      expect(paused.docked).toBe(false);
      finiteState(paused);
    }
    const disturbed = run();
    disturbed.velocity = 0.05;
    stepBuoyancy(disturbed, plan, true, 1, 0);
    expect(disturbed.docked).toBe(false);
    expect(disturbed.settled).toBe(0);
    run(plan, 1, 300, true, disturbed);
    expect(disturbed.docked).toBe(true);
  });

  it("rejects invalid configurations and invalid filling without ever emitting a docked state", () => {
    const invalid = [
      { ...plan, pixelsPerMeter: 0 },
      { ...plan, pixelsPerMeter: Infinity },
      { ...plan, loadMass: -1 },
      { ...plan, loadMass: NaN },
      { ...plan, iceDensity: NaN },
      { ...plan, waterDensity: 0 },
      { ...plan, dockY: Infinity },
      { ...plan, iceTarget: "basin" },
      { ...plan, iceTarget: undefined },
      { ...plan, prebuilt: true },
      { ...plan, dockTolerance: 0 },
      { ...plan, dockTolerance: 13 },
      { ...plan, dockTolerance: NaN },
      { ...plan, dockTolerance: Infinity },
      { ...plan, basin: { ...plan.basin, h: 0 } },
      { ...plan, pontoon: { ...plan.pontoon, depth: -1 } },
      { ...plan, pontoon: { ...plan.pontoon, x: 1000 } },
    ];
    for (const config of invalid) {
      const state = run(config, 1, 90);
      expect(state.valid).toBe(false);
      expect(state.docked || state.floating || state.active).toBe(false);
      finiteState(state);
    }
    for (const fill of [NaN, Infinity, -Infinity]) {
      const state = run(plan, fill, 90);
      expect(state.valid).toBe(false);
      expect(state.docked).toBe(false);
      finiteState(state);
    }
    expect(run(plan, -2, 1).waterY).toBe(485);
    expect(run(plan, 2, 1).waterY).toBe(325);
  });

  it("recovers corrupted dynamic numbers to finite bounds without an immediate success", () => {
    const state = createBuoyancy(plan);
    Object.assign(state, {
      deckY: NaN,
      velocity: Infinity,
      settled: NaN,
      docked: true,
    });
    stepBuoyancy(state, plan, true, 1, 1 / 60);
    finiteState(state);
    expect(state.docked).toBe(false);
    state.deckY = Number.MAX_VALUE;
    state.velocity = -Number.MAX_VALUE;
    stepBuoyancy(state, plan, true, 0, 1 / 30);
    finiteState(state);
    expect(state.docked).toBe(false);
  });
});
