import { describe, expect, it } from "vitest";
import { World, targetProgress, type Drop, type LiveTarget } from "../engine";
import type { Level } from "../types";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const recipe = (): Level => ({
  id: "phase-fixture",
  name: "An ice mold learns to let go",
  chapter: "Test",
  theme: "kitchen",
  pitch: "Build, fill, release.",
  hint: "One footprint, two thermal states.",
  ending: "Plop!",
  par: 100,
  start: [340, 160],
  temp: -40,
  pressure: 90,
  props: [],
  targets: [
    {
      id: "mold",
      name: "Build mold",
      verb: "freeze",
      x: 280,
      y: 220,
      w: 120,
      h: 70,
      phase: {
        steps: [
          { verb: "freeze", name: "Build mold", signal: "formed" },
          {
            verb: "melt",
            name: "Open mold",
            requires: ["basin"],
            signal: "opened",
          },
        ],
      },
    },
    {
      id: "basin",
      name: "Fill basin",
      verb: "fill",
      x: 480,
      y: 300,
      w: 100,
      h: 60,
      needsSignals: ["formed"],
    },
    {
      id: "release",
      name: "Release pudding",
      verb: "warm",
      x: 660,
      y: 400,
      w: 100,
      h: 60,
      requires: ["mold", "basin"],
      temp: [25, 35],
      pressure: [15, 25],
    },
  ],
});
const drop = (temp: number): Drop => ({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  life: 1,
  temp,
  pressure: 20,
});
function spray(w: World, t: LiveTarget, temp: number) {
  const stage = t.phaseStep;
  w.nozzle.temp = temp;
  w.nozzle.pressure = t.verb === "warm" ? 20 : 90;
  for (let i = 0; i < 6000 && !t.done && t.phaseStep === stage; i++) {
    w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(i / 29));
    w.nozzle.y = t.y - 52;
    w.update(1 / 60, idle);
  }
}
describe("Explicit construction phases", () => {
  it("requires real build, fill, remelt, and gentle release in order", () => {
    const w = new World(recipe()),
      [mold, basin, release] = w.targets;
    expect(w.available(basin)).toBe(false);
    spray(w, mold, -40);
    expect(mold.phaseStep).toBe(1);
    expect(mold.done).toBe(false);
    expect(mold.verb).toBe("melt");
    expect(mold.cells.every((cell) => cell === 1)).toBe(true);
    expect(w.available(basin)).toBe(true);
    expect(w.available(mold)).toBe(false);
    expect(w.available(release)).toBe(false);
    expect(w.waitingFor(mold)).toContain("fill basin");
    expect(targetProgress(mold)).toBe(0.5);
    const cells = [...mold.cells];
    for (let i = 0; i < 500; i++)
      w.impact(mold, drop(100), mold.x + 20, mold.y + 20);
    expect(mold.cells).toEqual(cells);
    spray(w, basin, 30);
    expect(basin.done).toBe(true);
    expect(w.available(mold)).toBe(true);
    spray(w, mold, 100);
    expect(mold.done).toBe(true);
    expect(w.signals.has("opened")).toBe(true);
    expect(w.available(release)).toBe(true);
    spray(w, release, 30);
    expect(w.completed).toBe(true);
    expect(w.progress).toBe(1);
  });
  it("keeps earned phase signals but resets the entire recipe on restart", () => {
    const level = recipe(),
      w = new World(level);
    spray(w, w.targets[0], -40);
    w.nozzle.on = false;
    for (let i = 0; i < 120; i++) w.update(1 / 60, idle);
    expect(w.signals.has("formed")).toBe(true);
    const fresh = new World(level);
    expect(fresh.targets[0].phaseStep).toBe(0);
    expect(fresh.targets[0].verb).toBe("freeze");
    expect(fresh.signals.size).toBe(0);
    expect(fresh.available(fresh.targets[1])).toBe(false);
    expect(level.targets[0].name).toBe("Build mold");
  });
  it("supports a second cast in the same footprint without inventing another target", () => {
    const level = recipe();
    level.targets = [level.targets[0]];
    level.targets[0].phase!.steps[1].requires = [];
    level.targets[0].phase!.steps.push({
      verb: "freeze",
      name: "Second cast",
      signal: "recast",
    });
    const w = new World(level),
      t = w.targets[0];
    spray(w, t, -40);
    spray(w, t, 100);
    expect(t.phaseStep).toBe(2);
    expect(t.cells.every((cell) => cell === 0)).toBe(true);
    expect(w.completed).toBe(false);
    expect(targetProgress(t)).toBeCloseTo(2 / 3);
    spray(w, t, -40);
    expect(w.signals.has("recast")).toBe(true);
    expect(w.completed).toBe(true);
  });
});
