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

const placeCards: OpticsPlan = {
  source: { x: 160, y: 200, dx: 1, dy: 0 },
  mirrors: [],
  splitters: [
    { target: "splitter", x: 350, y: 200, angle: Math.PI / 4, length: 100 },
  ],
  prisms: [
    {
      target: "rillLens",
      vertices: [
        [500, 130],
        [500, 290],
        [620, 290],
      ],
      refractiveIndex: 1.31,
    },
    {
      target: "mossLens",
      vertices: [
        [420, 320],
        [260, 320],
        [260, 440],
      ],
      refractiveIndex: 1.31,
    },
  ],
  detectors: [
    {
      id: "rill",
      name: "Rill",
      x: 820,
      y: 271.3930758363,
      radius: 10,
      label: [820, 315],
    },
    {
      id: "moss",
      name: "Moss",
      x: 315.9715246014,
      y: 500,
      radius: 10,
      label: [316, 540],
    },
  ],
};
const builtPlaceCards = () => [
  target("splitter"),
  target("rillLens"),
  target("mossLens"),
];

describe("Physical splitter and fixed lenses for the wedding place cards", () => {
  it("splits only at the finite interface and refracts both half-power rays onto actual cards", () => {
    const targets = builtPlaceCards();
    const before = JSON.stringify({ placeCards, targets });
    const result = traceOptics(placeCards, targets);
    expect(result.segments).toHaveLength(7);
    expect(result.segments[0]).toEqual({ from: [160, 200], to: [350, 200] });
    expect(
      result.segments.slice(1).every((segment) => segment.power === 0.5),
    ).toBe(true);
    expect(result.segments[1].from).toEqual(result.segments[0].to);
    expect(result.segments[2].from).toEqual(result.segments[0].to);
    expect(result.segments[1].power! + result.segments[2].power!).toBe(1);
    const boundaries = [
      [500, 200],
      [350, 320],
      [552.5, 200],
      [350, 372.5],
    ];
    boundaries.forEach(([x, y], i) => {
      expect(result.segments[i + 1].to[0]).toBeCloseTo(x, 7);
      expect(result.segments[i + 1].to[1]).toBeCloseTo(y, 7);
    });
    expect(result.lit).toEqual(new Set(["rill", "moss"]));
    expect(JSON.stringify({ placeCards, targets })).toBe(before);
  });

  it("misses the corresponding name card with either lens missing, unfinished, or replaced by air", () => {
    for (const [lens, survivingCard] of [
      ["rillLens", "moss"],
      ["mossLens", "rill"],
    ]) {
      const missing = builtPlaceCards().filter((t) => t.id !== lens);
      const unfinished = builtPlaceCards().map((t) =>
        t.id === lens ? { ...t, done: false } : t,
      );
      for (const targets of [missing, unfinished])
        expect(traceOptics(placeCards, targets).lit).toEqual(
          new Set([survivingCard]),
        );
      const airLens = {
        ...placeCards,
        prisms: placeCards.prisms!.map((p) =>
          p.target === lens ? { ...p, refractiveIndex: 1 } : p,
        ),
      };
      expect(traceOptics(airLens, builtPlaceCards()).lit).toEqual(
        new Set([survivingCard]),
      );
    }
  });

  it("keeps only the original unsplit ray when the splitter is absent, unfinished, or missed", () => {
    const noSplitter = builtPlaceCards().filter((t) => t.id !== "splitter");
    for (const targets of [
      noSplitter,
      [...noSplitter, target("splitter", { done: false })],
    ]) {
      const result = traceOptics(placeCards, targets);
      expect(result.lit).toEqual(new Set(["rill"]));
      expect(result.segments).toHaveLength(3);
      expect(result.segments.every((segment) => !("power" in segment))).toBe(
        true,
      );
    }
    for (const splitters of [
      [],
      [{ ...placeCards.splitters![0], y: 230, length: 20 }],
      [{ ...placeCards.splitters![0], angle: 0 }],
    ])
      expect(
        traceOptics({ ...placeCards, splitters }, builtPlaceCards()).lit,
      ).toEqual(new Set(["rill"]));
  });

  it("blocks both branches at the shutter until a real aperture exists, and independently occludes a child", () => {
    const shutter = target("shutter", {
      verb: "melt",
      done: false,
      x: 220,
      y: 175,
      w: 55,
      h: 60,
      cols: 6,
      rows: 6,
      cells: Array(36).fill(1),
    });
    const targets = [...builtPlaceCards(), shutter];
    expect(traceOptics(placeCards, targets).segments).toEqual([
      { from: [160, 200], to: [220, 200] },
    ]);
    expect(traceOptics(placeCards, targets).lit.size).toBe(0);
    shutter.cells = shutter.cells.map((cell, i) =>
      Math.floor(i / 6) === 2 ? 0 : cell,
    );
    expect(shutter.done).toBe(false);
    expect(traceOptics(placeCards, targets).lit).toEqual(
      new Set(["rill", "moss"]),
    );
    shutter.done = true;
    shutter.cells = Array(36).fill(1);
    const branchCover = target("branchCover", {
      verb: "melt",
      done: false,
      x: 345,
      y: 300,
    });
    expect(traceOptics(placeCards, [...targets, branchCover]).lit).toEqual(
      new Set(["rill"]),
    );
    branchCover.done = true;
    expect(traceOptics(placeCards, [...targets, branchCover]).lit).toEqual(
      new Set(["rill", "moss"]),
    );
    const interfaceCover = target("interfaceCover", {
      verb: "melt",
      done: false,
      x: 350,
      y: 195,
    });
    expect(
      traceOptics(placeCards, [...targets, interfaceCover]).segments,
    ).toEqual([{ from: [160, 200], to: [350, 200] }]);
  });

  it("reflects the actual incident direction on either face while transmission keeps its heading", () => {
    const plan: OpticsPlan = {
      source: { x: 350, y: 400, dx: 0, dy: -1 },
      mirrors: [],
      splitters: placeCards.splitters,
      detectors: [
        { id: "transmitted", x: 350, y: 130, radius: 5 },
        { id: "reflected", x: 150, y: 200, radius: 5 },
        { id: "wrong", x: 600, y: 200, radius: 5 },
      ],
    };
    const result = traceOptics(plan, [target("splitter")]);
    expect(result.lit).toEqual(new Set(["transmitted", "reflected"]));
    expect(result.segments).toHaveLength(3);
    expect(result.segments[1].to).toEqual([350, 0]);
    expect(result.segments[2].to[0]).toBeCloseTo(0, 7);
    expect(result.segments[2].to[1]).toBeCloseTo(200, 7);
  });

  it("rejects malformed or off-board finite splitter segments without creating scripted rays", () => {
    const good = placeCards.splitters![0];
    const invalid = [
      ...[0, -1, NaN, Infinity, 1e-10, Number.MAX_VALUE].map((length) => ({
        ...good,
        length,
      })),
      ...[NaN, Infinity].map((angle) => ({ ...good, angle })),
      ...[-1, 961, NaN, Infinity].map((x) => ({ ...good, x })),
      ...[-1, 581, NaN, Infinity].map((y) => ({ ...good, y })),
      { ...good, x: 10 },
      { ...good, y: 10 },
    ];
    for (const splitter of invalid) {
      const result = traceOptics(
        { ...placeCards, splitters: [splitter] },
        builtPlaceCards(),
      );
      expect(result.lit).toEqual(new Set(["rill"]));
      expect(result.segments).toHaveLength(3);
      expect(result.segments.every((segment) => !("power" in segment))).toBe(
        true,
      );
    }
  });

  it("bounds repeated splitting inside a mirror cavity without leaking light or nonfinite coordinates", () => {
    const plan: OpticsPlan = {
      source: { x: 350, y: 300, dx: 1, dy: 0 },
      splitters: [
        { target: "splitter", x: 400, y: 300, angle: Math.PI / 4, length: 100 },
      ],
      mirrors: [
        { target: "left", x: 200, y: 300, angle: Math.PI / 2, length: 400 },
        { target: "right", x: 600, y: 300, angle: Math.PI / 2, length: 400 },
        { target: "top", x: 400, y: 100, angle: 0, length: 400 },
        { target: "bottom", x: 400, y: 500, angle: 0, length: 400 },
      ],
      detectors: [{ id: "outside", x: 800, y: 300, radius: 10 }],
    };
    const targets = ["splitter", "left", "right", "top", "bottom"].map((id) =>
      target(id),
    );
    const result = traceOptics(plan, targets);
    expect(result.segments.length).toBeGreaterThan(20);
    expect(result.segments.length).toBeLessThanOrEqual(128);
    expect(result.lit.size).toBe(0);
    for (const segment of result.segments) {
      expect(segment.power ?? 1).toBeGreaterThanOrEqual(1 / 256);
      expect(segment.power ?? 1).toBeLessThanOrEqual(1);
      for (const [x, y] of [segment.from, segment.to]) {
        expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true);
        expect(x).toBeGreaterThanOrEqual(200 - 1e-6);
        expect(x).toBeLessThanOrEqual(600 + 1e-6);
        expect(y).toBeGreaterThanOrEqual(100 - 1e-6);
        expect(y).toBeLessThanOrEqual(500 + 1e-6);
      }
    }
    expect(traceOptics(plan, targets)).toEqual(result);
  });
});

const daylight: OpticsPlan = {
  source: { x: 160, y: 200, dx: 1, dy: 0 },
  mirrors: [],
  prisms: [
    {
      target: "upperPrism",
      vertices: [
        [300, 130],
        [300, 290],
        [420, 290],
      ],
      refractiveIndex: 1.31,
    },
    {
      target: "lowerPrism",
      vertices: [
        [560, 205],
        [560, 365],
        [680, 365],
      ],
      refractiveIndex: 1.31,
    },
  ],
  detectors: [{ id: "sunshine", x: 820, y: 450.3042, radius: 12 }],
};
const builtPrisms = () => [target("upperPrism"), target("lowerPrism")];

describe("Physical refraction for the daylight appointment", () => {
  it("traces both air–ice boundaries of both descending triangles to the real detector", () => {
    const result = traceOptics(daylight, builtPrisms());
    expect(result.segments).toHaveLength(5);
    const boundaries = [
      [300, 200],
      [352.5, 200],
      [560, 255.3796756487],
      [604.4829124241, 264.3105498988],
    ];
    boundaries.forEach(([x, y], i) => {
      expect(result.segments[i].to[0]).toBeCloseTo(x, 6);
      expect(result.segments[i].to[1]).toBeCloseTo(y, 6);
    });
    const final = result.segments.at(-1)!;
    const angle = Math.atan2(
      final.to[1] - final.from[1],
      final.to[0] - final.from[0],
    );
    expect((angle * 180) / Math.PI).toBeCloseTo(40.7945600167, 6);
    expect(result.lit).toEqual(new Set(["sunshine"]));
  });

  it("cannot reach sunshine with either missing or unfinished prism, or with no ice index", () => {
    for (const targets of [
      [],
      [target("upperPrism")],
      [target("lowerPrism")],
      [target("upperPrism", { done: false }), target("lowerPrism")],
      [target("upperPrism"), target("lowerPrism", { done: false })],
    ])
      expect(traceOptics(daylight, targets).lit.size).toBe(0);
    const air = {
      ...daylight,
      prisms: daylight.prisms!.map((p) => ({ ...p, refractiveIndex: 1 })),
    };
    expect(traceOptics(air, builtPrisms()).lit.size).toBe(0);
  });

  it("keeps the shutter opaque, while actual erased cells or completed melting admit the ray", () => {
    const shutter = target("shutter", {
      verb: "melt",
      done: false,
      x: 220,
      y: 175,
      w: 55,
      h: 60,
      cols: 6,
      rows: 6,
      cells: Array(36).fill(1),
    });
    const targets = [...builtPrisms(), shutter];
    expect(traceOptics(daylight, targets).segments).toEqual([
      { from: [160, 200], to: [220, 200] },
    ]);
    expect(traceOptics(daylight, targets).lit.size).toBe(0);
    shutter.cells = shutter.cells.map((value, i) =>
      Math.floor(i / 6) === 2 ? 0 : value,
    );
    expect(shutter.done).toBe(false);
    expect(traceOptics(daylight, targets).lit.has("sunshine")).toBe(true);
    shutter.cells = Array(36).fill(1);
    shutter.done = true;
    expect(traceOptics(daylight, targets).lit.has("sunshine")).toBe(true);
  });

  it("obeys Snell's law on oblique entry and restores the incident heading after parallel exit", () => {
    const plan = straight({
      source: { x: 100, y: 180, dx: 0.8, dy: 0.6 },
      prisms: [
        {
          target: "slab",
          vertices: [
            [300, 100],
            [400, 100],
            [400, 500],
            [300, 500],
          ],
          refractiveIndex: 1.31,
        },
      ],
    });
    const result = traceOptics(plan, [target("slab")]);
    expect(result.segments).toHaveLength(3);
    const inside = result.segments[1];
    const dx = inside.to[0] - inside.from[0],
      dy = inside.to[1] - inside.from[1];
    expect(dy / Math.hypot(dx, dy)).toBeCloseTo(0.6 / 1.31, 8);
    const outside = result.segments[2];
    expect(
      (outside.to[1] - outside.from[1]) / (outside.to[0] - outside.from[0]),
    ).toBeCloseTo(0.6 / 0.8, 8);
  });

  it("is independent of polygon winding and does not mutate authored geometry or targets", () => {
    const targets = builtPrisms();
    const before = JSON.stringify({ daylight, targets });
    const reversed = {
      ...daylight,
      prisms: daylight.prisms!.map((p) => ({
        ...p,
        vertices: [...p.vertices].reverse(),
      })),
    };
    const result = traceOptics(reversed, targets);
    const normal = traceOptics(daylight, targets);
    expect(result.lit).toEqual(normal.lit);
    expect(result.segments).toHaveLength(normal.segments.length);
    result.segments.forEach((segment, i) => {
      expect(segment.to[0]).toBeCloseTo(normal.segments[i].to[0], 7);
      expect(segment.to[1]).toBeCloseTo(normal.segments[i].to[1], 7);
    });
    expect(JSON.stringify({ daylight, targets })).toBe(before);
  });

  it("reflects a ray starting inside a dense prism at the critical boundary, with a finite loop cap", () => {
    const result = traceOptics(
      straight({
        source: { x: 430, y: 250, dx: 1, dy: 1 },
        prisms: [
          {
            target: "trap",
            vertices: [
              [300, 100],
              [600, 100],
              [600, 400],
              [300, 400],
            ],
            refractiveIndex: 1.5,
          },
        ],
        detectors: [{ id: "outside", x: 700, y: 300, radius: 10 }],
      }),
      [target("trap")],
    );
    expect(result.segments).toHaveLength(13);
    expect(result.segments[0].to[0]).toBeCloseTo(580);
    expect(result.segments[0].to[1]).toBeCloseTo(400);
    expect(result.segments[1].to[0]).toBeCloseTo(600);
    expect(result.segments[1].to[1]).toBeCloseTo(380);
    expect(result.lit.size).toBe(0);
    for (const segment of result.segments) {
      expect(
        Math.hypot(
          segment.to[0] - segment.from[0],
          segment.to[1] - segment.from[1],
        ),
      ).toBeGreaterThan(1);
      for (const [x, y] of [segment.from, segment.to]) {
        expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true);
        expect(x).toBeGreaterThanOrEqual(300 - 1e-6);
        expect(x).toBeLessThanOrEqual(600 + 1e-6);
        expect(y).toBeGreaterThanOrEqual(100 - 1e-6);
        expect(y).toBeLessThanOrEqual(400 + 1e-6);
      }
    }
  });

  it("chooses actual nearer mirrors and opaque cells before prism surfaces", () => {
    const reflected = traceOptics(
      {
        ...daylight,
        mirrors: [
          { target: "mirror", x: 250, y: 200, angle: Math.PI / 2, length: 100 },
        ],
      },
      [...builtPrisms(), target("mirror")],
    );
    expect(reflected.segments).toHaveLength(2);
    expect(reflected.lit.size).toBe(0);
    expect(reflected.segments[1].to[0]).toBeCloseTo(0);
    const cover = target("cover", {
      verb: "melt",
      done: false,
      x: 300,
      y: 195,
    });
    const blocked = traceOptics(daylight, [...builtPrisms(), cover]);
    expect(blocked.segments).toEqual([{ from: [160, 200], to: [300, 200] }]);
  });

  it("rejects malformed, concave, overlapping, and off-board prism fixtures safely", () => {
    const good = daylight.prisms![0];
    const invalid = [
      ...[NaN, Infinity, 0, -1, 5].map((refractiveIndex) => ({
        ...good,
        refractiveIndex,
      })),
      {
        ...good,
        vertices: [
          [300, 130],
          [300, 130],
          [420, 290],
        ] as [number, number][],
      },
      {
        ...good,
        vertices: [
          [300, 130],
          [360, 210],
          [420, 290],
        ] as [number, number][],
      },
      {
        ...good,
        vertices: [
          [300, 130],
          [300, 290],
          [350, 200],
          [420, 290],
        ] as [number, number][],
      },
      {
        ...good,
        vertices: [
          [-1, 130],
          [300, 290],
          [420, 290],
        ] as [number, number][],
      },
      {
        ...good,
        vertices: [
          [NaN, 130],
          [300, 290],
          [420, 290],
        ] as [number, number][],
      },
    ];
    for (const prism of invalid)
      expect(
        traceOptics({ ...daylight, prisms: [prism] }, builtPrisms()).segments,
      ).toEqual([{ from: [160, 200], to: [960, 200] }]);
    expect(
      traceOptics(
        { ...daylight, prisms: [good, { ...good, target: "lowerPrism" }] },
        builtPrisms(),
      ).segments,
    ).toEqual([{ from: [160, 200], to: [960, 200] }]);
  });
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
