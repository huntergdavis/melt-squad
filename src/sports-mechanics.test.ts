import { describe, expect, it } from "vitest";
import { World, type LiveTarget } from "./engine";
import { sportsLevels } from "./packs/10";

const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
const scene = (id: string) => sportsLevels.find((l) => l.id === id)!;
function spray(
  world: World,
  target: LiveTarget,
  temp: number,
  pressure: number,
  frames = 1200,
) {
  Object.assign(world.nozzle, {
    x: target.x + target.w / 2,
    y: target.y - 52,
    temp,
    pressure,
    on: true,
  });
  for (let i = 0; i < frames && !target.done; i++) world.update(1 / 60, idle);
}

describe("Mount Oops physical exhibits", () => {
  it("requires built ice, real water, and a stable loaded deck before the floating podium wins", () => {
    const w = new World(scene("10.18"));
    const ice = w.targets.find((t) => t.id === "pontoon")!;
    const basin = w.targets.find((t) => t.id === "basin")!;
    expect(w.available(basin)).toBe(false);
    spray(w, basin, 20, 85, 90);
    expect(basin.progress).toBe(0);
    expect(w.buoyancy!.active).toBe(false);
    spray(w, ice, -20, 85);
    expect(ice.done).toBe(true);
    w.nozzle.on = false;
    for (let i = 0; i < 180; i++) w.update(1 / 60, idle);
    expect(w.buoyancy!.grounded).toBe(true);
    expect(w.signals.has("podium:afloat")).toBe(false);
    spray(w, basin, 20, 85);
    expect(basin.done).toBe(true);
    expect(w.completed).toBe(false);
    expect(w.completionPending).toBe(true);
    w.nozzle.on = false;
    for (let i = 0; i < 1200 && !w.completed; i++) w.update(1 / 60, idle);
    expect(w.completed).toBe(true);
    expect(w.buoyancy!.floating).toBe(true);
    expect(w.buoyancy!.docked).toBe(true);
    expect(w.buoyancy!.deckY).toBeCloseTo(w.level.buoyancy!.dockY, 0);
    expect(w.signals.has("podium:afloat")).toBe(true);
    const replay = new World(scene("10.18"));
    expect(replay.buoyancy!.active).toBe(false);
    expect(replay.buoyancy!.docked).toBe(false);
    expect(replay.signals.size).toBe(0);
  });
  it("actual filled targets cannot bypass a physically overloaded pontoon", () => {
    const source = scene("10.18");
    const w = new World({
      ...source,
      buoyancy: { ...source.buoyancy!, loadMass: 2 },
    });
    spray(w, w.targets.find((t) => t.id === "pontoon")!, -20, 85);
    spray(w, w.targets.find((t) => t.id === "basin")!, 20, 85);
    w.nozzle.on = false;
    for (let i = 0; i < 1200; i++) w.update(1 / 60, idle);
    expect(w.targets.every((t) => t.done)).toBe(true);
    expect(w.completed).toBe(false);
    expect(w.buoyancy!.sunk).toBe(true);
    expect(w.signals.has("podium:afloat")).toBe(false);
  });
  it("patient relay lamps advance only after correct-temperature water completes each lane", () => {
    const w = new World(scene("10.15"));
    w.untimed = true;
    const [a, b, c] = w.targets;
    spray(w, c, 35, 27, 180);
    expect(c.progress).toBe(0);
    expect(w.mistakes).toBe(0);
    spray(w, a, 60, 27, 90);
    expect(a.progress).toBe(0);
    spray(w, a, 35, 27);
    expect(a.done).toBe(true);
    expect(w.pulseOpen(b)).toBe(true);
    expect(w.pulseOpen(c)).toBe(false);
    spray(w, b, 35, 27);
    spray(w, c, 35, 27);
    expect(w.completed).toBe(true);
  });
});
