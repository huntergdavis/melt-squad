import { expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { festivalLevels } from "./packs/20";
import type { Verb } from "./types";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => {
  const level = festivalLevels.find((item) => item.id === id);
  expect(level, id).toBeDefined();
  return new World(level!);
};
const byVerb = (w: World, verb: Verb) =>
  w.targets.filter((t) => t.verb === verb);
const ids = (targets: LiveTarget[]) => targets.map((t) => t.id).sort();
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
function shoot(
  w: World,
  t: LiveTarget,
  temp: number,
  pressure: number,
  frames = 90,
) {
  aim(w, t, temp, pressure);
  advance(w, frames);
  w.nozzle.on = false;
}
function spray(
  w: World,
  t: LiveTarget,
  temp: number,
  pressure = 85,
  ready = () => t.done,
) {
  // Reuse the shipped hotel/library actual-water controls. No direct writes to
  // target progress, cells, phase, elapsed time, completion, or signals.
  for (let frame = 0; frame < 6000 && !ready(); frame++) {
    aim(w, t, temp, pressure);
    if (t.verb === "melt")
      w.nozzle.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
    advance(w, 1);
  }
  w.nozzle.on = false;
  expect(ready(), `${w.level.id}: ${t.id}`).toBe(true);
}
function flush(w: World) {
  w.nozzle.on = false;
  advance(w, 180);
  expect(w.drops).toHaveLength(0);
}

it("20.20 earns the finale through either preparation order, the real shared basin, a retained gentle heart, and finally the turbine", () => {
  for (const reversed of [false, true]) {
    const w = scene("20.20"),
      caps = byVerb(w, "melt"),
      bases = byVerb(w, "freeze"),
      basins = byVerb(w, "fill"),
      hearts = byVerb(w, "warm"),
      wheels = byVerb(w, "spin");
    expect(w.targets).toHaveLength(7);
    expect(caps).toHaveLength(2);
    expect(bases).toHaveLength(2);
    expect(basins).toHaveLength(1);
    expect(hearts).toHaveLength(1);
    expect(wheels).toHaveLength(1);
    const basin = basins[0],
      heart = hearts[0],
      wheel = wheels[0];
    const preparations = [bases[1], caps[0], bases[0], caps[1]];
    expect(basin.requires?.slice().sort()).toEqual(ids(preparations));
    expect(heart.requires).toEqual([basin.id]);
    expect(wheel.requires).toEqual([heart.id]);
    expect(heart.temp).toEqual([30, 50]);
    expect(heart.pressure).toEqual([10, 35]);
    // The last scene is standalone: no global medals or outside signals.
    expect(w.level.needsSignals ?? []).toEqual([]);
    expect(w.targets.every((t) => !t.needsSignals?.length)).toBe(true);
    for (const t of preparations) {
      expect(t.requires ?? []).toEqual([]);
      expect(w.available(t)).toBe(true);
    }
    shoot(w, basin, 20, 85);
    shoot(w, heart, 40, 25);
    shoot(w, wheel, 20, 85);
    expect([basin.progress, heart.progress, wheel.progress]).toEqual([0, 0, 0]);
    if (reversed) preparations.reverse();
    for (const [index, t] of preparations.entries()) {
      expect(w.available(t)).toBe(true);
      spray(w, t, t.verb === "melt" ? 100 : -40);
      expect(w.available(basin)).toBe(index === preparations.length - 1);
      expect(w.completed).toBe(false);
    }
    shoot(w, basin, 0, 85);
    expect(basin.progress).toBe(0);
    spray(w, basin, 20);
    expect(w.available(heart)).toBe(true);
    expect(w.available(wheel)).toBe(false);
    shoot(w, heart, 40, 85);
    shoot(w, heart, 5, 25);
    expect(heart.progress).toBe(0);
    spray(w, heart, 40, 25, () => heart.progress >= 0.2);
    flush(w);
    expect(heart.progress).toBeGreaterThanOrEqual(0.2);
    expect(heart.done).toBe(false);
    const retained = heart.progress;
    advance(w, 120);
    expect(heart.progress).toBe(retained);
    expect(w.completed).toBe(false);
    expect(w.available(wheel)).toBe(false);
    spray(w, heart, 40, 25);
    expect(w.available(wheel)).toBe(true);
    shoot(w, wheel, 20, 69);
    expect(wheel.progress).toBe(0);
    expect(w.completed).toBe(false);
    spray(w, wheel, 20, 85);
    expect(w.completed).toBe(true);
    expect(w.progress).toBe(1);

    const replay = scene("20.20");
    expect(replay.completed).toBe(false);
    expect(replay.targets.every((t) => !t.done && t.progress === 0)).toBe(true);
    expect(
      replay.targets
        .filter((t) => replay.available(t))
        .map((t) => t.id)
        .sort(),
    ).toEqual(ids(preparations));
  }
});

it("20.11 permits cups-first or band-first service, but only the completed band and both drinks unlock the gentle welcome heart", () => {
  for (const first of ["cups", "band"]) {
    const w = scene("20.11"),
      floors = byVerb(w, "freeze"),
      caps = byVerb(w, "melt"),
      cups = byVerb(w, "fill"),
      bands = byVerb(w, "spin"),
      hearts = byVerb(w, "warm");
    expect(w.targets).toHaveLength(7);
    expect(floors).toHaveLength(2);
    expect(caps).toHaveLength(1);
    expect(cups).toHaveLength(2);
    expect(bands).toHaveLength(1);
    expect(hearts).toHaveLength(1);
    const cap = caps[0],
      band = bands[0],
      heart = hearts[0];
    expect(band.requires?.slice().sort()).toEqual(ids([...floors, cap]));
    expect(heart.requires?.slice().sort()).toEqual(ids([...cups, band]));
    expect(heart.temp).toEqual([25, 45]);
    expect(heart.pressure).toEqual([10, 35]);
    for (const t of [...floors, cap, ...cups]) {
      expect(t.requires ?? []).toEqual([]);
      expect(w.available(t)).toBe(true);
    }
    expect(cups.every((cup) => !cup.flowOnly)).toBe(true);
    shoot(w, band, 20, 85);
    shoot(w, heart, 35, 25);
    expect(band.progress).toBe(0);
    expect(heart.progress).toBe(0);
    const serviceBand = () => {
      spray(w, floors[1], -40);
      spray(w, cap, 100);
      expect(w.available(band)).toBe(false);
      spray(w, floors[0], -40);
      expect(w.available(band)).toBe(true);
      shoot(w, band, 20, 69);
      expect(band.progress).toBe(0);
      spray(w, band, 20);
    };
    const serviceCups = () => {
      spray(w, cups[1], 20);
      expect(w.available(heart)).toBe(false);
      spray(w, cups[0], 20);
    };
    if (first === "cups") {
      serviceCups();
      expect([...floors, cap, band].every((t) => !t.done)).toBe(true);
      expect(w.available(heart)).toBe(false);
      serviceBand();
    } else {
      serviceBand();
      expect(cups.every((t) => t.progress === 0 && !t.done)).toBe(true);
      expect(w.available(heart)).toBe(false);
      serviceCups();
    }
    expect(w.available(heart)).toBe(true);
    expect(w.completed).toBe(false);
    shoot(w, heart, 35, 85);
    expect(heart.progress).toBe(0);
    spray(w, heart, 35, 25);
    expect(w.completed).toBe(true);
  }
});

it("20.09 keeps each outer nest behind only its own book stand while the shared middle footing stays independently active", () => {
  const w = scene("20.09"),
    caps = byVerb(w, "melt").sort((a, b) => a.x - b.x),
    nests = byVerb(w, "freeze"),
    lamps = byVerb(w, "warm");
  expect(w.targets).toHaveLength(6);
  expect(caps).toHaveLength(2);
  expect(nests).toHaveLength(3);
  expect(lamps).toHaveLength(1);
  const lamp = lamps[0],
    middle = nests.find((t) => !t.requires?.length);
  expect(middle).toBeDefined();
  const outer = caps.map((cap) => {
    const nest = nests.find((t) => t.requires?.includes(cap.id));
    expect(nest).toBeDefined();
    expect(nest!.requires).toEqual([cap.id]);
    return nest!;
  });
  expect(lamp.requires?.slice().sort()).toEqual(ids(nests));
  expect(lamp.temp).toEqual([25, 40]);
  expect(lamp.pressure).toEqual([10, 30]);
  expect(caps.every((t) => w.available(t))).toBe(true);
  expect(w.available(middle!)).toBe(true);
  expect(outer.every((t) => !w.available(t))).toBe(true);
  shoot(w, outer[0], -40, 85);
  shoot(w, lamp, 32.5, 20);
  expect(outer[0].progress).toBe(0);
  expect(lamp.progress).toBe(0);
  // Finish the right local branch while the left cap remains intact.
  spray(w, caps[1], 100);
  expect(w.available(outer[1])).toBe(true);
  expect(w.available(outer[0])).toBe(false);
  expect(caps[0].done).toBe(false);
  spray(w, outer[1], -40);
  expect(caps[0].done).toBe(false);
  expect(w.available(middle!)).toBe(true);
  spray(w, middle!, -40);
  expect(w.available(lamp)).toBe(false);
  const completedRight = outer[1].completedAt;
  spray(w, caps[0], 100);
  shoot(w, outer[0], 20, 85);
  expect(outer[0].progress).toBe(0);
  spray(w, outer[0], -40);
  expect(outer[1].completedAt).toBe(completedRight);
  expect(w.available(lamp)).toBe(true);
  expect(w.completed).toBe(false);
  shoot(w, lamp, 80, 85);
  expect(lamp.progress).toBe(0);
  spray(w, lamp, 32.5, 20);
  expect(w.completed).toBe(true);
});
