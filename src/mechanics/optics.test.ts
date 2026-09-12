import { describe, expect, it } from "vitest";
import { traceOptics, type OpticsPlan, type OpticsTarget } from "./optics";

const target = (
  id: string,
  extra: Partial<OpticsTarget> = {},
): OpticsTarget => ({
  id,
  verb: "freeze",
  x: 0,
  y: 0,
  w: 10,
  h: 10,
  done: true,
  cells: [1],
  cols: 1,
  rows: 1,
  ...extra,
});
const aperture = (): OpticsTarget =>
  target("aperture", {
    verb: "melt",
    x: 450,
    y: 195,
    w: 95,
    h: 50,
    done: false,
    cells: Array(50).fill(1),
    cols: 10,
    rows: 5,
  });
const inspection: OpticsPlan = {
  source: { x: 250, y: 220, dx: 1, dy: 0 },
  mirrors: [
    { target: "upper", x: 710, y: 220, angle: Math.PI / 4, length: 100 },
    { target: "lower", x: 710, y: 390, angle: -Math.PI / 4, length: 100 },
  ],
  detectors: [{ id: "sunshine", x: 250, y: 390, radius: 10 }],
};
const builtMirrors = () => [target("upper"), target("lower")];
const straight = (extra: Partial<OpticsPlan> = {}): OpticsPlan => ({
  source: { x: 100, y: 100, dx: 1, dy: 0 },
  mirrors: [],
  detectors: [],
  ...extra,
});

describe("Physical optics for the daylight inspection", () => {
  it("reflects a rightward ray downward at a backslash tangent", () => {
    const result = traceOptics(
      { ...inspection, mirrors: inspection.mirrors.slice(0, 1) },
      builtMirrors(),
    );
    expect(result.segments).toHaveLength(2);
    expect(result.segments[0].to[0]).toBeCloseTo(710);
    expect(result.segments[0].to[1]).toBeCloseTo(220);
    expect(result.segments[1].to[0]).toBeCloseTo(710);
    expect(result.segments[1].to[1]).toBeCloseTo(580);
    expect(result.lit.size).toBe(0);
  });

  it("reflects downward light left at a slash and reaches the actual detector", () => {
    const result = traceOptics(inspection, builtMirrors());
    expect(result.segments).toHaveLength(3);
    expect(result.segments[1].to[0]).toBeCloseTo(710);
    expect(result.segments[1].to[1]).toBeCloseTo(390);
    expect(result.segments[2].to[0]).toBeCloseTo(0);
    expect(result.segments[2].to[1]).toBeCloseTo(390);
    expect(result.lit).toEqual(new Set(["sunshine"]));
  });

  it("does not reflect from unfinished or missing mirror targets", () => {
    for (const targets of [
      [target("upper", { done: false }), target("lower")],
      [target("lower")],
    ]) {
      const result = traceOptics(inspection, targets);
      expect(result.segments).toEqual([{ from: [250, 220], to: [960, 220] }]);
      expect(result.lit.size).toBe(0);
    }
    const lowerMissing = traceOptics(inspection, [target("upper")]);
    expect(lowerMissing.segments.at(-1)!.to[1]).toBeCloseTo(580);
    expect(lowerMissing.lit.size).toBe(0);
  });

  it("uses finite mirror segments and ignores parallel rays", () => {
    for (const mirror of [
      { target: "mirror", x: 200, y: 130, angle: Math.PI / 4, length: 20 },
      { target: "mirror", x: 200, y: 100, angle: 0, length: 100 },
    ]) {
      const result = traceOptics(straight({ mirrors: [mirror] }), [
        target("mirror"),
      ]);
      expect(result.segments).toEqual([{ from: [100, 100], to: [960, 100] }]);
    }
  });

  it("stops at opaque aperture cells and only lights detectors before the ice", () => {
    const result = traceOptics(
      {
        ...inspection,
        detectors: [
          { id: "before", x: 350, y: 220, radius: 5 },
          { id: "behind", x: 500, y: 220, radius: 5 },
          ...inspection.detectors,
        ],
      },
      [...builtMirrors(), aperture()],
    );
    expect(result.segments).toEqual([{ from: [250, 220], to: [450, 220] }]);
    expect(result.lit).toEqual(new Set(["before"]));
  });

  it("passes through a locally erased row without requiring the whole pane complete", () => {
    const pane = aperture();
    pane.cells = pane.cells.map((value, i) =>
      Math.floor(i / pane.cols) === 2 ? 0 : value,
    );
    const result = traceOptics(inspection, [...builtMirrors(), pane]);
    expect(pane.done).toBe(false);
    expect(result.lit.has("sunshine")).toBe(true);
    const wrongRow = aperture();
    wrongRow.cells = wrongRow.cells.map((value, i) => (i < 10 ? 0 : value));
    expect(
      traceOptics(inspection, [...builtMirrors(), wrongRow]).lit.size,
    ).toBe(0);
  });

  it("keeps a clipped final ice column at the engine's actual ten-pixel position", () => {
    const pane = aperture();
    pane.cells = pane.cells.map((value, i) => (i >= 20 && i < 29 ? 0 : value));
    const blocked = traceOptics(inspection, [...builtMirrors(), pane]);
    expect(blocked.segments[0].to).toEqual([540, 220]);
    pane.cells = pane.cells.map((value, i) => (i === 29 ? 0.02 : value));
    expect(
      traceOptics(inspection, [...builtMirrors(), pane]).lit.has("sunshine"),
    ).toBe(true);
  });

  it("ignores a completed pane even if its old grid still contains ice", () => {
    const pane = aperture();
    pane.done = true;
    expect(
      traceOptics(inspection, [...builtMirrors(), pane]).lit.has("sunshine"),
    ).toBe(true);
  });

  it("chooses the nearest ice and lets opaque ice occlude a coincident mirror", () => {
    const near = target("near", { verb: "melt", done: false, x: 300, y: 215 });
    const result = traceOptics(inspection, [
      ...builtMirrors(),
      aperture(),
      near,
    ]);
    expect(result.segments[0].to).toEqual([300, 220]);
    const onMirror = target("cover", {
      verb: "melt",
      done: false,
      x: 710,
      y: 215,
    });
    const covered = traceOptics(inspection, [...builtMirrors(), onMirror]);
    expect(covered.segments).toHaveLength(1);
    expect(covered.segments[0].to).toEqual([710, 220]);
    expect(covered.lit.size).toBe(0);
  });

  it("uses segment-circle intersections, including tangency, rather than detector names", () => {
    const result = traceOptics(
      straight({
        detectors: [
          { id: "overlap", x: 200, y: 109, radius: 10 },
          { id: "tangent", x: 300, y: 110, radius: 10 },
          { id: "miss", x: 400, y: 111, radius: 10 },
          { id: "behind-source", x: 50, y: 100, radius: 10 },
          { id: "beyond-board", x: 1000, y: 100, radius: 5 },
        ],
      }),
      [],
    );
    expect(result.lit).toEqual(new Set(["overlap", "tangent"]));
  });

  it("caps a closed mirror loop at twelve reflections without self-hits", () => {
    const result = traceOptics(
      {
        source: { x: 500, y: 300, dx: 1, dy: 0 },
        mirrors: [
          { target: "left", x: 200, y: 300, angle: Math.PI / 2, length: 100 },
          { target: "right", x: 800, y: 300, angle: Math.PI / 2, length: 100 },
        ],
        detectors: [{ id: "middle", x: 500, y: 300, radius: 5 }],
      },
      [target("left"), target("right")],
    );
    expect(result.segments).toHaveLength(13);
    expect(result.lit).toEqual(new Set(["middle"]));
    for (const segment of result.segments) {
      expect(Math.abs(segment.to[0] - segment.from[0])).toBeGreaterThan(250);
      for (const [x, y] of [segment.from, segment.to]) {
        expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(960);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(580);
      }
    }
  });

  it("rejects invalid sources and ignores malformed optical fixtures", () => {
    for (const source of [
      { x: NaN, y: 100, dx: 1, dy: 0 },
      { x: 100, y: 100, dx: Infinity, dy: 0 },
      { x: 100, y: 100, dx: 0, dy: 0 },
      { x: -1, y: 100, dx: 1, dy: 0 },
    ])
      expect(traceOptics(straight({ source }), []).segments).toEqual([]);
    const result = traceOptics(
      straight({
        mirrors: [
          { target: "broken", x: 300, y: 100, angle: NaN, length: 100 },
        ],
        detectors: [{ id: "broken", x: 200, y: 100, radius: NaN }],
      }),
      [target("broken")],
    );
    expect(result.segments).toEqual([{ from: [100, 100], to: [960, 100] }]);
    expect(result.lit.size).toBe(0);
  });

  it("normalizes extreme finite directions and leaves its inputs untouched", () => {
    const plan = straight({
      source: { x: 100, y: 100, dx: Number.MAX_VALUE, dy: Number.MAX_VALUE },
    });
    const before = JSON.stringify(plan);
    const result = traceOptics(plan, []);
    expect(result.segments[0].to[0]).toBeCloseTo(580);
    expect(result.segments[0].to[1]).toBeCloseTo(580);
    expect(JSON.stringify(plan)).toBe(before);
  });
});
