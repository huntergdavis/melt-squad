import { describe, expect, it } from "vitest";
import { World } from "../engine";
import type { Level } from "../types";
import {
  availableRoutes,
  branchOpen,
  type FlowBranch,
  type FlowTarget,
} from "./flow";

const spillway: FlowBranch = {
  target: "near",
  gate: "plug",
  overflowFrom: "far",
};
const branches: readonly FlowBranch[] = [{ target: "far" }, spillway];
const state = (far: boolean, plug: boolean): FlowTarget[] => [
  { id: "far", done: far },
  { id: "plug", done: plug },
  { id: "near", done: false },
];

it("continuous inflow reaches a long route without evicting travelling water", () => {
  const level: Level = {
    id: "long-runoff",
    name: "The scenic route",
    chapter: "Test",
    theme: "kitchen",
    pitch: "Take your time.",
    hint: "Follow the channel.",
    ending: "Arrived!",
    par: 120,
    start: [230, 130],
    temp: 35,
    pressure: 90,
    props: [],
    targets: [
      {
        id: "basin",
        name: "Distant basin",
        verb: "fill",
        x: 310,
        y: 440,
        w: 140,
        h: 60,
        flowOnly: true,
      },
    ],
    channels: {
      inlet: { x: 190, y: 182, w: 80, h: 40 },
      junction: [260, 230],
      branches: [
        {
          target: "basin",
          via: [
            [780, 230],
            [780, 360],
            [200, 360],
            [200, 470],
          ],
        },
      ],
    },
  };
  const w = new World(level);
  let maximum = 0;
  for (let i = 0; i < 6000 && !w.completed; i++) {
    w.update(1 / 60, { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 });
    maximum = Math.max(maximum, w.runoff.length);
  }
  expect(maximum).toBe(350);
  expect(w.completed).toBe(true);
});

describe("Overflow routing prerequisites", () => {
  it("preserves normal routes, including full destinations without an open spillway", () => {
    const ordinary = [
      { target: "far" },
      { target: "near", gate: "plug" },
      { target: "garden", gate: "open" },
      { target: "closed", gate: "missing" },
    ];
    const targets = [...state(true, false), { id: "open", done: true }];
    expect(availableRoutes(ordinary, targets)).toEqual([0, 2]);
    expect(branchOpen({ target: "far" }, [])).toBe(true);
    expect(branchOpen({ target: "near", gate: "missing" }, targets)).toBe(
      false,
    );
  });

  it("keeps a spillway closed while its gate is closed even if the source is full", () => {
    expect(branchOpen(spillway, state(true, false))).toBe(false);
    expect(availableRoutes(branches, state(true, false))).toEqual([0]);
  });

  it("requires a completed source even when its gate is already open", () => {
    expect(branchOpen(spillway, state(false, true))).toBe(false);
    expect(availableRoutes(branches, state(false, true))).toEqual([0]);
    expect(branchOpen(spillway, [{ id: "plug", done: true }])).toBe(false);
    expect(
      branchOpen({ target: "near", overflowFrom: "far" }, state(false, true)),
    ).toBe(false);
  });

  it("routes only to the ready overflow instead of wasting its share on the full source", () => {
    const targets = state(true, true);
    expect(branchOpen(spillway, targets)).toBe(true);
    expect(availableRoutes(branches, targets)).toEqual([1]);
    expect(branchOpen({ target: "near", overflowFrom: "far" }, targets)).toBe(
      true,
    );
  });

  it("retains unrelated branches and their original indices alongside an overflow", () => {
    const routes = [
      ...branches,
      { target: "garden" },
      { target: "cafe", gate: "cafeGate" },
      { target: "closed", gate: "missing" },
    ];
    const targets = [...state(true, true), { id: "cafeGate", done: true }];
    expect(availableRoutes(routes, targets)).toEqual([1, 2, 3]);
  });

  it("keeps multiple ready spillways without reinstating their shared full source", () => {
    const routes = [
      ...branches,
      { target: "backup", overflowFrom: "far", gate: "backupGate" },
    ];
    expect(availableRoutes(routes, state(true, true))).toEqual([1]);
    expect(
      availableRoutes(routes, [
        ...state(true, true),
        { id: "backupGate", done: true },
      ]),
    ).toEqual([1, 2]);
  });

  it("continues through consecutive completed sources to the next open basin", () => {
    const routes = [
      { target: "first" },
      { target: "second", overflowFrom: "first" },
      { target: "third", overflowFrom: "second" },
      { target: "unrelated" },
    ];
    expect(
      availableRoutes(routes, [
        { id: "first", done: true },
        { id: "second", done: false },
      ]),
    ).toEqual([1, 3]);
    expect(
      availableRoutes(routes, [
        { id: "first", done: true },
        { id: "second", done: true },
      ]),
    ).toEqual([2, 3]);
  });

  it("invalidates a previously open route when its source or gate resets", () => {
    const targets = state(true, true);
    expect(branchOpen(spillway, targets)).toBe(true);
    targets[0].done = false;
    expect(branchOpen(spillway, targets)).toBe(false);
    expect(availableRoutes(branches, targets)).toEqual([0]);
    targets[0].done = true;
    targets[1].done = false;
    expect(branchOpen(spillway, targets)).toBe(false);
    expect(availableRoutes(branches, targets)).toEqual([0]);
  });

  it("does not mutate branches or source completion while choosing an overflow", () => {
    const routes = Object.freeze(
      branches.map((branch) => Object.freeze({ ...branch })),
    );
    const targets = Object.freeze(
      state(true, true).map((target) => Object.freeze(target)),
    );
    expect(availableRoutes(routes, targets)).toEqual([1]);
    expect(targets[0].done).toBe(true);
    expect(routes[0].target).toBe("far");
  });
});
