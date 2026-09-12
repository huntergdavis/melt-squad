import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { weddingLevels } from "./packs/11";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => weddingLevels.find((l) => l.id === id)!;
const shape = (t: LiveTarget) => [t.x, t.y, t.w, t.h];
function spray(
  w: World,
  t: LiveTarget,
  temp: number,
  pressure: number,
  ready = () => t.done,
  sweep = false,
) {
  Object.assign(w.nozzle, { y: t.y - 52, temp, pressure, on: true, angle: 0 });
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    w.nozzle.x = sweep
      ? t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29))
      : t.x + t.w / 2;
    w.update(1 / 60, idle);
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id}: ${t.id} reached its next stage`).toBe(true);
}

describe("Wedding rehearsal exhibits", () => {
  it("splits actual light into both wedding cards only after the constructed optics and melted shutter", () => {
    const w = new World(scene("11.15"));
    const target = (id: string) => w.targets.find((t) => t.id === id)!;
    expect(w.signals.has("rill")).toBe(false);
    expect(w.signals.has("moss")).toBe(false);
    for (const id of ["splitter", "rillLens", "mossLens"]) {
      spray(w, target(id), -20, 85);
      expect(w.signals.has("rill")).toBe(false);
      expect(w.signals.has("moss")).toBe(false);
      expect(w.completed).toBe(false);
    }
    spray(w, target("shutter"), 40, 85, undefined, true);
    // Mechanics run before this frame's droplets: trace the freshly opened
    // shutter on the next ordinary simulation step, just as the game does.
    w.update(1 / 60, idle);
    expect(w.signals.has("rill")).toBe(true);
    expect(w.signals.has("moss")).toBe(true);
    expect(
      w.light!.segments.filter((segment) => segment.power === 0.5).length,
    ).toBeGreaterThanOrEqual(4);
    expect(w.completed).toBe(true);
    const replay = new World(scene("11.15"));
    expect(replay.signals.size).toBe(0);
    expect(replay.completed).toBe(false);
  });

  it("keeps both proofs while requiring the same ring band to be rebuilt", () => {
    const w = new World(scene("11.18"));
    const band = w.targets.find((t) => t.id === "band")!;
    const engraver = w.targets.find((t) => t.id === "engraver")!;
    const footprint = shape(band);
    expect(w.available(engraver)).toBe(false);
    expect(band.phase!.steps.map((step) => step.verb)).toEqual([
      "freeze",
      "melt",
      "freeze",
    ]);
    // Reuse the library's actual-nozzle phase approach, not direct impact or completion writes.
    spray(w, band, -20, 85, () => band.phaseStep === 1);
    expect(w.signals.has("band:leaf")).toBe(true);
    expect(w.available(engraver)).toBe(true);
    expect(w.available(band)).toBe(false);
    expect(band.done).toBe(false);
    Object.assign(w.nozzle, {
      x: band.x + band.w / 2,
      y: band.y - 52,
      temp: 40,
      pressure: 85,
      on: true,
    });
    for (let i = 0; i < 120; i++) w.update(1 / 60, idle);
    expect(band.phaseStep).toBe(1);
    expect(band.progress).toBe(0);
    expect(band.cells.every((cell) => cell === 1)).toBe(true);
    expect(w.completed).toBe(false);
    spray(w, engraver, 35, 27);
    expect(w.available(band)).toBe(true);
    spray(w, band, 40, 85, () => band.phaseStep === 2, true);
    expect(shape(band)).toEqual(footprint);
    expect(w.signals.has("band:open")).toBe(true);
    expect(w.signals.has("band:leaf")).toBe(true);
    expect(w.signals.has("band:both")).toBe(false);
    expect(w.completed).toBe(false);
    spray(w, band, -20, 85);
    expect(shape(band)).toEqual(footprint);
    expect(w.signals.has("band:both")).toBe(true);
    expect(w.completed).toBe(true);
    const replay = new World(scene("11.18"));
    expect(replay.signals.size).toBe(0);
    expect(replay.targets[0].phaseStep).toBe(0);
    expect(replay.targets.every((t) => !t.done && t.progress === 0)).toBe(true);
    expect(replay.completed).toBe(false);
  });
});
