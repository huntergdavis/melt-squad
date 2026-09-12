import { expect, it } from "vitest";
import { World } from "./engine";
import type { Level } from "./types";
import { availableRoutes, branchOpen } from "./mechanics/flow";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const plan: Level = {
  id: "drainage",
  name: "Dry paperwork",
  chapter: "Test",
  theme: "town",
  pitch: "Water belongs in the garden.",
  hint: "Plug, fill, overflow.",
  ending: "Successfully not a pond.",
  par: 120,
  start: [260, 248],
  temp: -20,
  pressure: 40,
  props: [],
  targets: [
    {
      id: "plug",
      name: "Protect the forms",
      verb: "freeze",
      x: 220,
      y: 300,
      w: 80,
      h: 50,
    },
    {
      id: "source",
      name: "Fill the source",
      verb: "fill",
      x: 420,
      y: 180,
      w: 140,
      h: 65,
      requires: ["plug"],
    },
    {
      id: "garden",
      name: "Water the garden",
      verb: "fill",
      x: 690,
      y: 420,
      w: 150,
      h: 65,
      flowOnly: true,
      requires: ["source"],
    },
  ],
  channels: {
    inlet: { x: 470, y: 200, w: 50, h: 35 },
    junction: [495, 285],
    branches: [
      {
        outlet: [260, 440],
        closedBy: "plug",
        overflowFrom: "source",
        via: [[260, 325]],
      },
      { target: "garden", overflowFrom: "source", via: [[765, 285]] },
    ],
  },
};

it("an ice plug removes the waste branch and reopens only on reset", () => {
  const branches = plan.channels!.branches;
  const states = [
    { id: "source", done: false },
    { id: "plug", done: false },
  ];
  expect(availableRoutes(branches, states)).toEqual([]);
  states[0].done = true;
  expect(availableRoutes(branches, states)).toEqual([0, 1]);
  states[1].done = true;
  expect(availableRoutes(branches, states)).toEqual([1]);
  expect(branchOpen(branches[0], states)).toBe(false);
  states[1].done = false;
  expect(availableRoutes(branches, states)).toEqual([0, 1]);
});

it("real water fills the source first and only connected surplus fills the garden", () => {
  const w = new World(plan);
  const advance = (frames: number) => {
    for (let frame = 0; frame < frames; frame++) w.update(1 / 60, idle);
  };
  const [plug, source, garden] = w.targets;
  advance(400);
  expect(plug.done).toBe(true);
  expect(source.progress).toBe(0);
  Object.assign(w.nozzle, { x: 495, y: 128, temp: 20, pressure: 40 });
  for (let frame = 0; frame < 1200 && !source.done; frame++) {
    expect(garden.progress).toBe(0);
    advance(1);
  }
  expect(source.done).toBe(true);
  expect(w.completed).toBe(false);
  // A direct stream cannot bypass connected drainage, even with the source full.
  w.nozzle.on = false;
  advance(300);
  const beforeDirect = garden.progress;
  Object.assign(w.nozzle, { x: 765, y: 368, on: true });
  advance(250);
  expect(garden.progress).toBe(beforeDirect);
  Object.assign(w.nozzle, { x: 495, y: 128 });
  let sawRoutedWater = false;
  for (let frame = 0; frame < 1800 && !w.completed; frame++) {
    advance(1);
    if (w.runoff.length) sawRoutedWater = true;
    expect(w.runoff.every((drop) => drop.branch === 1)).toBe(true);
  }
  expect(sawRoutedWater).toBe(true);
  expect(garden.done).toBe(true);
  expect(w.completed).toBe(true);
  expect(new World(plan).targets.every((target) => target.progress === 0)).toBe(
    true,
  );
});

it("waste outlets terminate water without creating an objective or crashing", () => {
  const open: Level = {
    ...plan,
    targets: plan.targets.map((t) => ({ ...t, requires: undefined })),
    channels: { ...plan.channels!, branches: [{ outlet: [260, 440] }] },
  };
  const w = new World(open);
  Object.assign(w.nozzle, { x: 495, y: 128, temp: 20 });
  for (let frame = 0; frame < 1200; frame++) w.update(1 / 60, idle);
  expect(w.channelPath(0).at(-1)).toEqual([260, 440]);
  expect(w.targets[1].done).toBe(true);
  expect(w.targets[2].progress).toBe(0);
  expect(w.runoff.length).toBeGreaterThan(0);
  w.nozzle.on = false;
  for (let frame = 0; frame < 400; frame++) w.update(1 / 60, idle);
  expect(w.runoff).toHaveLength(0);
});
