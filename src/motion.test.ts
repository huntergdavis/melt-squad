import { describe, expect, it } from "vitest";
import { World } from "./engine";
import type { Level } from "./types";
const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const level = (): Level => ({
  id: "gated-mobile",
  name: "A mobile takes a nap",
  chapter: "Test",
  theme: "kitchen",
  pitch: "First, the plaque.",
  hint: "Then, a slow orbit.",
  ending: "Snore.",
  par: 120,
  start: [480, 400],
  temp: 95,
  pressure: 90,
  props: [],
  targets: [
    {
      id: "plaque",
      name: "Start plaque",
      verb: "melt",
      x: 430,
      y: 460,
      w: 100,
      h: 50,
    },
    {
      id: "blanket",
      name: "Blanket hammock",
      verb: "warm",
      x: 430,
      y: 275,
      w: 100,
      h: 50,
      requires: ["plaque"],
      motion: { rx: 180, ry: 85, period: 24, after: ["plaque"] },
    },
  ],
});
function thaw(w: World) {
  const plaque = w.targets[0];
  w.nozzle.on = true;
  for (let i = 0; i < 1200 && !plaque.done; i++) {
    w.nozzle.x =
      plaque.x + 8 + (plaque.w - 16) * (0.5 + 0.5 * Math.sin(i / 29));
    w.nozzle.y = plaque.y - 52;
    w.update(1 / 60, idle);
  }
  expect(plaque.done).toBe(true);
  w.nozzle.on = false;
}
describe("Mobile start gates", () => {
  it("holds its authored pose until actual water clears the start plaque", () => {
    const w = new World(level()),
      t = w.targets[1],
      start = { x: t.x, y: t.y };
    w.nozzle.on = false;
    for (let i = 0; i < 300; i++) w.update(1 / 60, idle);
    expect({ x: t.x, y: t.y }).toEqual(start);
    expect(w.available(t)).toBe(false);
    thaw(w);
    w.update(1 / 60, idle);
    expect(t.x).toBeCloseTo(start.x, 1);
    for (let i = 0; i < 120; i++) w.update(1 / 60, idle);
    expect(t.x).toBeLessThan(start.x - 10);
    expect(t.y).toBeGreaterThan(start.y);
  });
  it("keeps stationary assist and restart consistent with the start pose", () => {
    const w = new World(level());
    w.stationary = true;
    thaw(w);
    const t = w.targets[1],
      start = { x: t.x, y: t.y };
    for (let i = 0; i < 240; i++) w.update(1 / 60, idle);
    expect({ x: t.x, y: t.y }).toEqual(start);
    const reset = new World(level());
    expect(reset.targets[1].motionStartedAt).toBe(-1);
    expect(reset.available(reset.targets[1])).toBe(false);
  });
});
