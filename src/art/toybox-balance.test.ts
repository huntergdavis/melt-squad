import { expect, it } from "vitest";
import { World } from "../engine";
import { toyboxLevels } from "../packs/17";
import type { Renderer } from "../render";
import { drawMeasurements } from "./measurements";

it("toybox occupants and cup outlines ride measured endpoints, not independent animation", () => {
  const world = new World(toyboxLevels.find((l) => l.id === "17.14")!);
  world.nozzle.on = false;
  const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
  for (let i = 0; i < 180; i++) world.update(1 / 60, idle);
  const actors: unknown[][] = [],
    lines: number[][] = [],
    labels: string[] = [];
  const renderer = {
    ctx: {
      save() {},
      restore() {},
      translate() {},
      fillText(text: string) {
        labels.push(text);
      },
    },
    round() {},
    circle() {},
    line(points: number[]) {
      lines.push(points);
    },
    prop(...args: unknown[]) {
      actors.push(args);
    },
  } as unknown as Renderer;
  drawMeasurements(renderer, world);
  expect(actors.map((args) => args[0])).toEqual([
    "buttonseated",
    "featheradmiral",
  ]);
  const plan = world.level.balance!;
  world.targets.forEach((cup, i) => {
    const x = cup.x + cup.w / 2 - plan.x;
    const endpointY = cup.y - 40 - plan.y;
    expect(actors[i][1]).toBeCloseTo(x);
    expect(actors[i][2]).toBeCloseTo(endpointY - 3);
    const outline = lines.find(
      (line) => line.length === 8 && Math.abs(line[0] - (x - 54)) < 1e-8,
    );
    expect(outline).toBeDefined();
    expect(outline![1] + plan.y).toBeCloseTo(cup.y);
    expect(outline![3] + plan.y).toBeCloseTo(cup.y + cup.h);
  });
  expect(labels).toContain("1.00 kg · toy + ice");
  expect(labels).toContain("0.25 kg · toy + ice");
  expect(labels).toContain("MATCH THE LOADS");
});
