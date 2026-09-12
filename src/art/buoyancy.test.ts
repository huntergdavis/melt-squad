import { expect, it } from "vitest";
import type { World } from "../engine";
import type { Renderer } from "../render";
import {
  createBuoyancy,
  stepBuoyancy,
  type BuoyancyPlan,
} from "../mechanics/buoyancy";
import { drawBuoyancy } from "./buoyancy";

it("draws the museum symbol on the real prebuilt deck and paints its actual height band", () => {
  const plan: BuoyancyPlan = {
    id: "footnote:afloat",
    prebuilt: true,
    fillTarget: "tank",
    basin: { x: 350, y: 325, w: 280, h: 160 },
    pontoon: { x: 410, w: 150, h: 45, depth: 0.15 },
    pixelsPerMeter: 500,
    loadMass: 0.15,
    dockY: 322.9316666667,
    dockTolerance: 8,
  };
  const state = createBuoyancy(plan);
  // Isolated drawing fixture: heights below are produced by the actual solver,
  // not an animation curve or a forced scene-completion flag.
  const world = {
    level: { theme: "institute", buoyancy: plan },
    buoyancy: state,
    targets: [],
  } as unknown as World;
  const draw = () => {
    const props: unknown[][] = [],
      boxes: unknown[][] = [];
    const renderer = {
      ctx: { save() {}, restore() {}, setLineDash() {}, fillText() {} },
      line() {},
      round(...args: unknown[]) {
        boxes.push(args);
      },
      prop(...args: unknown[]) {
        props.push(args);
      },
    } as unknown as Renderer;
    drawBuoyancy(renderer, world, 0);
    expect(props).toEqual([
      ["footnotesymbol", 485, state.deckY, 1, state.docked, 0],
    ]);
    expect(boxes[0].slice(0, 4)).toEqual([342, plan.dockY - 8, 296, 16]);
    return state.deckY;
  };
  expect(draw()).toBe(440);
  for (let frame = 0; frame < 90; frame++)
    stepBuoyancy(state, plan, false, 1, 1 / 60);
  const rising = draw();
  expect(rising).toBeLessThan(440);
  expect(state.docked).toBe(false);
  for (let frame = 0; frame < 1800 && !state.docked; frame++)
    stepBuoyancy(state, plan, false, 1, 1 / 60);
  expect(state.docked).toBe(true);
  expect(draw()).toBeCloseTo(plan.dockY, 1);
});
