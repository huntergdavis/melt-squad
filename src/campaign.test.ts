import { describe, expect, it } from "vitest";
import { World, type Drop } from "./engine";
import { sockLevels } from "./packs/02";
import {
  campaign,
  inPack,
  mapNeighbor,
  mapPoint,
  nextRescue,
  packProgress,
} from "./campaign";
import { loadSave } from "./save";
import { levels } from "./levels";
import release from "../public/release.json" with { type: "json" };
const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const drop: Drop = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  temp: 70,
  pressure: 50,
  life: 1,
};

describe("The rescue atlas", () => {
  it("lists 20 worlds but only counts released rescues", () => {
    expect(campaign).toHaveLength(20);
    const save = loadSave({ getItem: () => null });
    expect(packProgress("02", save)).toEqual({
      done: 0,
      available: 20,
      complete: false,
    });
    expect(
      packProgress(String(release.worlds + 1).padStart(2, "0"), save),
    ).toEqual({
      done: 0,
      available: 0,
      complete: false,
    });
    expect(inPack("01")[0].id).toBe("cup");
    for (let i = 1; i <= release.worlds; i++)
      expect(inPack(String(i).padStart(2, "0"))).toHaveLength(20);
    expect(sockLevels.map((l) => l.id)).toEqual(
      Array.from(
        { length: 20 },
        (_, i) => `02.${String(i + 1).padStart(2, "0")}`,
      ),
    );
  });
  it("skips unbuilt middle scenes without pretending a partial pack is complete", () => {
    const save = loadSave({ getItem: () => null });
    const partial = [sockLevels[0], sockLevels[2]];
    save.stars[partial[0].id] = 3;
    save.lastWorld = "02";
    expect(nextRescue(save, "02", partial)?.id).toBe("02.03");
    save.stars[partial[1].id] = 1;
    expect(nextRescue(save, "02", partial)).toBeUndefined();
    expect(packProgress("02", save, partial)).toEqual({
      done: 2,
      available: 2,
      complete: false,
    });
  });
  it("keeps legacy medals and preferences while rejecting invalid navigation values", () => {
    const save = loadSave({
      getItem: () =>
        JSON.stringify({
          version: 1,
          stars: { cup: 3 },
          best: { cup: 17 },
          lastWorld: "02",
          lastScene: "02.14",
          stationary: true,
        }),
    });
    expect(save.stars.cup).toBe(3);
    expect(save.best.cup).toBe(17);
    expect(nextRescue(save)?.id).toBe("02.14");
    expect(save.stationary).toBe(true);
    const invalid = loadSave({
      getItem: () => '{"version":1,"lastWorld":"99","lastScene":"<script>"}',
    });
    expect(invalid.lastWorld).toBeUndefined();
    expect(invalid.lastScene).toBeUndefined();
    expect(
      nextRescue({ stars: Object.fromEntries(levels.map((l) => [l.id, 1])) }),
    ).toBeUndefined();
  });
  it("uses stable switchback positions and geometric arrow neighbors", () => {
    expect(
      new Set(Array.from({ length: 20 }, (_, i) => mapPoint(i).join())).size,
    ).toBe(20);
    expect(mapNeighbor(0, "right")).toBe(1);
    expect(mapNeighbor(0, "down")).toBe(7);
    expect(mapNeighbor(4, "left")).toBe(5);
    expect(mapNeighbor(0, "up")).toBe(0);
  });
});
describe("Experimental rinse river", () => {
  it("refuses direct tub hits and only delivers along an open connected route", () => {
    const world = new World(sockLevels[13]);
    const [plug, tub] = world.targets;
    plug.done = true;
    for (let i = 0; i < 100; i++) world.impact(tub, drop, tub.x, tub.y);
    expect(tub.progress).toBe(0);
    world.nozzle.x = 485;
    world.nozzle.y = 150;
    for (let i = 0; i < 600; i++) world.update(1 / 60, idle);
    expect(tub.progress).toBeGreaterThan(0);
    expect(world.targets[3].progress).toBe(0);
    expect(world.runoff.length).toBeLessThanOrEqual(350);
  });
  it("a closed inlet branch cannot fill either tub", () => {
    const world = new World(sockLevels[13]);
    world.nozzle.x = 485;
    world.nozzle.y = 150;
    for (let i = 0; i < 300; i++) world.update(1 / 60, idle);
    expect(world.targets[1].progress).toBe(0);
    expect(world.targets[3].progress).toBe(0);
    expect(world.runoff).toHaveLength(0);
  });
});
describe("Cuff carousel", () => {
  it("moves actual goal zones deterministically and honors stationary assist", () => {
    const world = new World(sockLevels[15]);
    world.nozzle.on = false;
    world.update(1 / 60, idle);
    const before = { x: world.targets[0].x, y: world.targets[0].y };
    for (let i = 0; i < 240; i++) world.update(1 / 60, idle);
    expect(world.targets[0].x).not.toBeCloseTo(before.x);
    world.stationary = true;
    world.update(1 / 60, idle);
    const fixed = { x: world.targets[0].x, y: world.targets[0].y };
    for (let i = 0; i < 240; i++) world.update(1 / 60, idle);
    expect({ x: world.targets[0].x, y: world.targets[0].y }).toEqual(fixed);
  });
});
