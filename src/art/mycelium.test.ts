import { expect, it } from "vitest";
import type { Renderer } from "../render";
import { drawMycelium } from "./mycelium";

it("the boiler needle follows actual progress, not time or celebration", () => {
  const pointer = (progress: number, happy = false, time = 0) => {
    const lines: number[][] = [];
    const renderer = {
      ctx: { fillText() {} },
      reducedMotion: false,
      round() {},
      circle() {},
      line(points: number[]) {
        lines.push(points);
      },
    } as unknown as Renderer;
    expect(
      drawMycelium(renderer, "boilergauge", happy, time, undefined, progress),
    ).toBe(true);
    return lines.at(-1)!;
  };
  const half = pointer(0.5);
  expect(half).toEqual(pointer(0.5, true, 100));
  expect(half).not.toEqual(pointer(0));
  expect(half).not.toEqual(pointer(1));
  expect(half[0]).toBe(0);
  expect(half[1]).toBe(-57);
  expect(half[2]).toBeCloseTo(Math.cos(Math.PI * 1.5) * 30);
  expect(half[3]).toBeCloseTo(-57 + Math.sin(Math.PI * 1.5) * 30);
  expect(pointer(-1)).toEqual(pointer(0));
  expect(pointer(2)).toEqual(pointer(1));
  expect(pointer(Number.NaN)).toEqual(pointer(0));
});
