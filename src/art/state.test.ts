import { expect, it } from "vitest";
import { propIsReady } from "./state";
import type { Prop } from "../types";

const prop: Prop = { kind: "dreamquilt", x: 300, y: 400 };
it("keeps existing target-linked and whole-scene art behavior", () => {
  const world = {
    completed: false,
    signals: new Set<string>(),
    targets: [{ id: "patch", done: false }],
  };
  expect(propIsReady(prop, world)).toBe(false);
  expect(propIsReady({ ...prop, target: "patch" }, world)).toBe(false);
  world.targets[0].done = true;
  expect(propIsReady({ ...prop, target: "patch" }, world)).toBe(true);
  expect(propIsReady(prop, world)).toBe(false);
  world.completed = true;
  expect(propIsReady(prop, world)).toBe(true);
});
it("observes the named live signal without completing gameplay or borrowing the scene win", () => {
  const world = { completed: false, signals: new Set<string>(), targets: [] };
  const panel = { ...prop, signal: "panel:first" };
  world.signals.add("unrelated");
  expect(propIsReady(panel, world)).toBe(false);
  world.signals.add("panel:first");
  expect(propIsReady(panel, world)).toBe(true);
  expect(world.completed).toBe(false);
  expect(world.signals.size).toBe(2);
  world.signals.delete("panel:first");
  world.completed = true;
  expect(propIsReady(panel, world)).toBe(false);
});
