import { expect, it } from "vitest";
import { World } from "./engine";
import type { Level } from "./types";
const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };

it("a completed ice seat cannot finish the seesaw until unequal-arm torque settles", () => {
  const level: Level = {
    id: "seesaw-test",
    name: "Three little units, one grand seat",
    chapter: "Test",
    theme: "preschool",
    pitch: "Fairness takes a wobble.",
    hint: "Three times the distance.",
    ending: "Fairly shared.",
    par: 120,
    start: [670, 390],
    temp: -40,
    pressure: 90,
    props: [],
    targets: [
      {
        id: "seat",
        name: "Ice seat",
        verb: "freeze",
        x: 600,
        y: 445,
        w: 140,
        h: 55,
      },
    ],
    balance: {
      id: "level",
      x: 430,
      y: 300,
      arm: 75,
      left: { mass: 3, arm: 1 },
      right: { target: "seat", mass: 1, arm: 3 },
    },
    needsSignals: ["level"],
  };
  const w = new World(level),
    seat = w.targets[0];
  w.nozzle.on = false;
  for (let i = 0; i < 180; i++) w.update(1 / 60, idle);
  expect(w.balance!.angle).toBeLessThan(-0.1);
  w.nozzle.on = true;
  for (let i = 0; i < 1200 && !seat.done; i++) w.update(1 / 60, idle);
  expect(seat.done).toBe(true);
  expect(w.completed).toBe(false);
  expect(w.completionPending).toBe(true);
  w.nozzle.on = false;
  for (let i = 0; i < 1200 && !w.completed; i++) w.update(1 / 60, idle);
  expect(w.completed).toBe(true);
  expect(w.signals.has("level")).toBe(true);
  expect(w.balance!.leftMass).toBe(3);
  expect(w.balance!.rightMass).toBe(1);
  expect(Math.abs(w.balance!.angle)).toBeLessThan(0.018);
  const replay = new World(level);
  expect(replay.completed).toBe(false);
  expect(replay.targets[0].progress).toBe(0);
  expect(replay.signals.size).toBe(0);
});
