import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { seamworksLevels } from "./packs/12";
import { traceOptics } from "./mechanics/optics";
import { propIsReady } from "./art/state";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => seamworksLevels.find((level) => level.id === id)!;
function spray(
  w: World,
  t: LiveTarget,
  temp: number,
  ready = () => t.done,
  sweep = false,
) {
  Object.assign(w.nozzle, {
    y: t.y - 52,
    temp,
    pressure: 85,
    on: true,
    angle: 0,
  });
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    w.nozzle.x = sweep
      ? t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29))
      : t.x + t.w / 2;
    w.update(1 / 60, idle);
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id}: ${t.id} reaches next stage`).toBe(true);
}

describe("Somnolent experimental benches", () => {
  it("reflects actual light through both sockets and respects frost on the second eyelid", () => {
    const w = new World(scene("12.14"));
    const target = (id: string) => w.targets.find((t) => t.id === id)!;
    spray(w, target("upperPrism"), -20);
    w.update(1 / 60, idle);
    expect(w.signals.size).toBe(0);
    spray(w, target("lowerPrism"), -20);
    w.update(1 / 60, idle);
    expect(w.signals.has("leftEye")).toBe(true);
    expect(w.signals.has("rightEye")).toBe(false);
    expect(w.completed).toBe(false);
    spray(w, target("eyeFrost"), 40, undefined, true);
    w.update(1 / 60, idle);
    expect(w.signals).toEqual(new Set(["leftEye", "rightEye"]));
    expect(w.completed).toBe(true);
    const optics = w.level.optics!;
    for (const id of ["upperPrism", "lowerPrism"]) {
      expect(
        traceOptics(
          optics,
          w.targets.filter((t) => t.id !== id),
        ).lit.size,
      ).toBe(0);
    }
    const bare = {
      ...optics,
      mirrors: optics.mirrors.map(({ housing, ...mirror }) => mirror),
    };
    expect(traceOptics(bare, w.targets)).toEqual(
      traceOptics(optics, w.targets),
    );
    expect(new World(scene("12.14")).signals.size).toBe(0);
  });

  it("acknowledges both panels during the same seam's build-open-rebuild sequence", () => {
    const w = new World(scene("12.18"));
    const seam = w.targets.find((t) => t.phase)!;
    const footprint = [seam.x, seam.y, seam.w, seam.h];
    const first = w.level.props.find((prop) => prop.signal === "panel:first")!;
    const second = w.level.props.find(
      (prop) => prop.signal === "panel:second",
    )!;
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    expect(propIsReady(first, w)).toBe(false);
    expect(propIsReady(second, w)).toBe(false);
    spray(w, seam, -20, () => seam.phaseStep === 1);
    expect(propIsReady(first, w)).toBe(true);
    expect(propIsReady(second, w)).toBe(false);
    expect(seam.verb).toBe("melt");
    expect(w.completed).toBe(false);
    spray(w, seam, 40, () => seam.phaseStep === 2, true);
    expect(propIsReady(first, w)).toBe(true);
    expect(propIsReady(second, w)).toBe(true);
    expect(seam.verb).toBe("freeze");
    expect(w.completed).toBe(false);
    expect([seam.x, seam.y, seam.w, seam.h]).toEqual(footprint);
    spray(w, seam, -20);
    expect(w.signals).toEqual(
      new Set(["panel:first", "panel:second", "seam:repaired"]),
    );
    expect(w.completed).toBe(true);
    const replay = new World(scene("12.18"));
    expect(propIsReady(first, replay)).toBe(false);
    expect(propIsReady(second, replay)).toBe(false);
    expect(replay.signals.size).toBe(0);
    expect(replay.targets[0].phaseStep).toBe(0);
  });
});
