import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import {
  difficultyLabels,
  normalizeDifficulty,
  type Difficulty,
} from "./difficulty";
import { loadSave, SAVE_KEY, writeSave } from "./save";
import type { Level, Target, Verb } from "./types";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const modes: Difficulty[] = ["easy", "normal", "impossible"];
const task = (id: string, verb: Verb, extra: Partial<Target> = {}): Target => ({
  id,
  name: id,
  verb,
  x: 300,
  y: 340,
  w: 100,
  h: 80,
  ...extra,
});
const fixture = (targets: Target[], extra: Partial<Level> = {}): Level => ({
  id: "difficulty-fixture",
  name: "Find the helpful water",
  chapter: "Test",
  theme: "kitchen",
  pitch: "Look closely.",
  hint: "Use real water.",
  ending: "Found it.",
  par: 200,
  start: [350, 140],
  temp: 20,
  pressure: 85,
  props: [],
  targets,
  ...extra,
});
function advance(w: World, frames: number) {
  for (let frame = 0; frame < frames; frame++) w.update(1 / 60, idle);
}
function aim(w: World, t: LiveTarget, temp: number, pressure = 85) {
  Object.assign(w.nozzle, {
    on: true,
    x: t.x + t.w / 2,
    y: t.y - 52,
    angle: 0,
    temp,
    pressure,
  });
}
// Reuse the shipped actual-water test pattern. Discovery, progress, cells,
// signals, elapsed time, and completion are never assigned by these tests.
function spray(
  w: World,
  t: LiveTarget,
  temp: number,
  ready = () => t.done,
  pressure = 85,
) {
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp, pressure);
    if (t.verb === "melt")
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
  }
  w.nozzle.on = false;
  expect(ready(), t.id).toBe(true);
}
const mixtures: {
  verb: Verb;
  good: [number, number];
  bad: [number, number];
}[] = [
  { verb: "melt", good: [40, 85], bad: [0, 85] },
  { verb: "freeze", good: [-20, 85], bad: [20, 85] },
  { verb: "fill", good: [20, 85], bad: [0, 85] },
  { verb: "spin", good: [20, 85], bad: [20, 69] },
  { verb: "warm", good: [35, 25], bad: [60, 25] },
];

it("classifies only wrong-setting recipes, not successful qualitative feedback", () => {
  const world = new World(
    fixture([task("warm", "warm", { temp: [30, 40], pressure: [20, 30] })]),
  );
  const t = world.targets[0];
  world.difficulty = "normal";
  aim(world, t, 90, 25);
  advance(world, 30);
  expect(t.feedbackIsRecipe).toBe(true);
  expect(t.feedback).toContain("30–40°");
  aim(world, t, 35, 25);
  advance(world, 30);
  expect(t.feedbackIsRecipe).toBe(false);
  expect(world.discovered.has(t.id)).toBe(true);
});

it("normalizes only the three modes, upgrades legacy saves to Easy, and round-trips every explicit choice", () => {
  expect(difficultyLabels).toEqual({
    easy: "Easy",
    normal: "Normal",
    impossible: "Impossible Challenge",
  });
  for (const value of [
    undefined,
    null,
    1,
    true,
    {},
    [],
    "",
    "hard",
    "NORMAL",
    " easy ",
  ])
    expect(normalizeDifficulty(value)).toBe("easy");
  for (const raw of [
    null,
    "{broken",
    JSON.stringify({ version: 1 }),
    JSON.stringify({ version: 1, difficulty: "hard" }),
  ])
    expect(loadSave({ getItem: () => raw }).difficulty).toBe("easy");
  for (const difficulty of modes) {
    expect(normalizeDifficulty(difficulty)).toBe(difficulty);
    const save = loadSave({
      getItem: () =>
        JSON.stringify({
          version: 1,
          stars: { cup: 2 },
          best: { cup: 42 },
          difficulty,
          untimed: false,
        }),
    });
    let serialized = "",
      key = "";
    expect(
      writeSave(save, {
        setItem: (name, value) => {
          key = name;
          serialized = value;
        },
      }),
    ).toBe(true);
    expect(key).toBe(SAVE_KEY);
    const restored = loadSave({ getItem: () => serialized });
    expect(restored.difficulty).toBe(difficulty);
    expect(restored.stars).toEqual({ cup: 2 });
    expect(restored.best).toEqual({ cup: 42 });
    expect(restored.untimed).toBe(false);
  }
});

describe("Valid arriving water discovers objectives", () => {
  it("ignores neutral reversible ice, discovers valid cold/hot adjustments, and reveals untouched controls only after a real physical win", () => {
    const level = fixture(
      [
        task("leftIce", "freeze", {
          x: 245,
          y: 380,
          w: 110,
          h: 75,
          reversibleIce: true,
          effort: 4,
        }),
        task("rightIce", "freeze", {
          x: 605,
          y: 380,
          w: 110,
          h: 75,
          reversibleIce: true,
          effort: 4,
        }),
      ],
      {
        balance: {
          id: "level",
          x: 480,
          y: 340,
          arm: 180,
          left: { target: "leftIce", mass: 1, fixedMass: 1 },
          right: { target: "rightIce", mass: 1, fixedMass: 0.25 },
        },
        needsSignals: ["level"],
      },
    );
    const hot = new World(level),
      left = hot.targets[0];
    hot.difficulty = "impossible";
    aim(hot, left, 0);
    advance(hot, 120);
    expect(hot.discovered.size).toBe(0);
    expect(left.progress).toBe(0);
    spray(hot, left, 40, () => hot.discovered.has(left.id));
    expect(left.progress).toBe(0); // Valid hot water still discovers an empty cup.
    expect(hot.targetVisible(left)).toBe(true);

    const cold = new World(level),
      [untouched, right] = cold.targets;
    cold.difficulty = "impossible";
    spray(cold, right, -40, () => right.progress >= 0.74);
    expect([...cold.discovered]).toEqual([right.id]);
    expect(cold.targetVisible(untouched)).toBe(false);
    for (let frame = 0; frame < 1200 && !cold.completed; frame++)
      advance(cold, 1);
    expect(cold.completed).toBe(true);
    expect(untouched.progress).toBe(0);
    expect(cold.discovered.has(untouched.id)).toBe(false);
    expect(cold.targetVisible(untouched)).toBe(true);
    const reset = new World(level);
    reset.difficulty = "impossible";
    expect(reset.targets.every((t) => !reset.targetVisible(t))).toBe(true);
    expect(reset.discovered.size).toBe(0);
  });

  it("records discoveries in every mode without changing physics or granting unseen IDs on mode switches", () => {
    const level = fixture([
      task("known", "fill", { effort: 4 }),
      task("unseen", "fill", { x: 650, effort: 4 }),
    ]);
    const worlds = modes.map((mode) => {
      const w = new World(level);
      expect(w.difficulty).toBe("easy");
      expect(w.discovered.size).toBe(0);
      w.difficulty = mode;
      expect(w.targetVisible(w.targets[1])).toBe(mode !== "impossible");
      aim(w, w.targets[0], 20);
      advance(w, 90);
      w.nozzle.on = false;
      advance(w, 120);
      expect([...w.discovered]).toEqual(["known"]);
      expect(w.targets[0].progress).toBeGreaterThan(0);
      expect(w.targets[0].progress).toBeLessThan(1);
      expect(w.targets[1].progress).toBe(0);
      expect(w.completed).toBe(false);
      return w;
    });
    const physics = (w: World) => ({
      targets: w.targets,
      drops: w.drops,
      sparks: w.sparks,
      elapsed: w.elapsed,
      water: w.water,
      hits: w.hits,
      mistakes: w.mistakes,
    });
    expect(physics(worlds[1])).toEqual(physics(worlds[0]));
    expect(physics(worlds[2])).toEqual(physics(worlds[0]));
    for (const w of worlds) {
      const progress = w.targets.map((t) => t.progress);
      for (const mode of modes) {
        w.difficulty = mode;
        expect(w.targetVisible(w.targets[0])).toBe(true);
        expect(w.targetVisible(w.targets[1])).toBe(mode !== "impossible");
        expect([...w.discovered]).toEqual(["known"]);
        expect(w.targets.map((t) => t.progress)).toEqual(progress);
      }
    }
    const reset = new World(level);
    expect(reset.difficulty).toBe("easy");
    reset.difficulty = "impossible";
    expect(reset.targets.every((t) => !reset.targetVisible(t))).toBe(true);
    expect(reset.discovered.size).toBe(0);
  });

  it("does not discover from off-beat arrivals, but discovers when a REST-emitted drop arrives during GO", () => {
    const w = new World(
      fixture([task("bell", "spin", { pulse: { period: 4, open: 1 } })]),
    );
    w.difficulty = "impossible";
    const bell = w.targets[0];
    w.nozzle.on = false;
    advance(w, 48);
    aim(w, bell, 20);
    w.nozzle.y = bell.y - 200;
    expect(w.pulseOpen(bell)).toBe(true);
    advance(w, 6);
    w.nozzle.on = false;
    advance(w, 90);
    expect(bell.feedback).toContain("REST");
    expect(w.discovered.size).toBe(0);
    expect(bell.progress).toBe(0);
    expect(w.mistakes).toBe(0);
    while (w.elapsed < 3.8 - 1e-9) advance(w, 1);
    expect(w.pulseOpen(bell)).toBe(false);
    w.nozzle.on = true;
    advance(w, 6);
    w.nozzle.on = false;
    expect(w.discovered.size).toBe(0);
    advance(w, 40);
    expect(w.pulseOpen(bell)).toBe(true);
    expect(w.discovered.has(bell.id)).toBe(true);
    expect(bell.progress).toBeGreaterThan(0);
  });

  it("rejects direct hits on flow-only tubs and discovers only after a real parcel travels from the inlet", () => {
    const w = new World(
      fixture([task("tub", "fill", { x: 600, flowOnly: true })], {
        channels: {
          inlet: { x: 280, y: 180, w: 40, h: 30 },
          junction: [300, 240],
          branches: [{ target: "tub", via: [[650, 240]] }],
        },
      }),
    );
    w.difficulty = "impossible";
    const tub = w.targets[0];
    aim(w, tub, 20);
    advance(w, 120);
    w.nozzle.on = false;
    advance(w, 240);
    expect(w.drops).toHaveLength(0);
    expect(w.runoff).toHaveLength(0);
    expect(w.discovered.size).toBe(0);
    expect(tub.progress).toBe(0);
    Object.assign(w.nozzle, {
      x: 300,
      y: 128,
      temp: 20,
      pressure: 85,
      angle: 0,
      on: true,
    });
    for (let frame = 0; frame < 120 && !w.runoff.length; frame++) advance(w, 1);
    expect(w.runoff.length).toBeGreaterThan(0);
    expect(w.discovered.size).toBe(0);
    expect(w.runoffPosition(w.runoff[0]).arrived).toBe(false);
    for (let frame = 0; frame < 1200 && !w.discovered.has(tub.id); frame++)
      advance(w, 1);
    w.nozzle.on = false;
    expect([...w.discovered]).toEqual([tub.id]);
    expect(w.targetVisible(tub)).toBe(true);
    expect(tub.progress).toBeGreaterThan(0);
  });

  it("retains a discovered ID across freeze, remelt, and recast, while replay clears the entire attempt", () => {
    const level = fixture([
      task("proof", "freeze", {
        phase: {
          steps: [
            { verb: "freeze", name: "First proof" },
            { verb: "melt", name: "Open the proof" },
            { verb: "freeze", name: "Second proof" },
          ],
        },
      }),
    ]);
    const w = new World(level),
      proof = w.targets[0];
    w.difficulty = "impossible";
    const footprint = [proof.x, proof.y, proof.w, proof.h];
    spray(w, proof, -40, () => proof.phaseStep === 1);
    expect(proof.done).toBe(false);
    expect(proof.verb).toBe("melt");
    expect(proof.progress).toBe(0);
    expect([...w.discovered]).toEqual([proof.id]);
    expect(w.targetVisible(proof)).toBe(true);
    spray(w, proof, 100, () => proof.phaseStep === 2);
    expect(proof.verb).toBe("freeze");
    expect(proof.progress).toBe(0);
    expect([...w.discovered]).toEqual([proof.id]);
    expect([proof.x, proof.y, proof.w, proof.h]).toEqual(footprint);
    spray(w, proof, -40);
    expect(w.completed).toBe(true);
    const reset = new World(level);
    reset.difficulty = "impossible";
    expect(reset.discovered.size).toBe(0);
    expect(reset.targetVisible(reset.targets[0])).toBe(false);
    expect(reset.targets[0].phaseStep).toBe(0);
  });

  it("discovers all five verbs on valid arrival, never from hovering or the nozzle's later mixture", () => {
    for (const { verb, good, bad } of mixtures) {
      const w = new World(
        fixture([task(verb, verb, { temp: [30, 40], pressure: [20, 35] })]),
      );
      w.difficulty = "impossible";
      const t = w.targets[0];
      aim(w, t, ...good);
      w.nozzle.on = false;
      advance(w, 90);
      expect(w.discovered.size).toBe(0);
      expect(w.targetVisible(t)).toBe(false);
      w.nozzle.y = t.y - 200;
      w.nozzle.on = true;
      advance(w, 6);
      expect(w.drops.length).toBeGreaterThan(0);
      expect(w.discovered.size).toBe(0);
      Object.assign(w.nozzle, { on: false, temp: bad[0], pressure: bad[1] });
      advance(w, 90);
      expect([...w.discovered]).toEqual([t.id]);
      expect(w.targetVisible(t)).toBe(true);
      expect(t.progress).toBeGreaterThan(0);
      expect(w.completed).toBe(false);
    }
  });

  it("rejects wrong arriving mixtures even when the nozzle is now correct, and cannot discover a locked target", () => {
    for (const { verb, good, bad } of mixtures) {
      const w = new World(
        fixture([task(verb, verb, { temp: [30, 40], pressure: [20, 35] })]),
      );
      w.difficulty = "impossible";
      const t = w.targets[0];
      aim(w, t, ...bad);
      w.nozzle.y = t.y - 200;
      advance(w, 6);
      Object.assign(w.nozzle, { on: false, temp: good[0], pressure: good[1] });
      advance(w, 90);
      expect(w.discovered.size).toBe(0);
      expect(w.targetVisible(t)).toBe(false);
      expect(t.progress).toBe(0);
      expect(w.mistakes).toBeGreaterThan(0);
    }
    const w = new World(
      fixture([
        task("locked", "melt", { requires: ["key"] }),
        task("key", "fill", { x: 650 }),
      ]),
    );
    w.difficulty = "impossible";
    const [locked, key] = w.targets;
    aim(w, locked, 100);
    advance(w, 120);
    expect(w.discovered.size).toBe(0);
    expect(locked.progress).toBe(0);
    spray(w, key, 20);
    expect(w.targetVisible(locked)).toBe(false);
    spray(w, locked, 100, () => w.discovered.has(locked.id));
    expect(w.targetVisible(locked)).toBe(true);
  });
});
