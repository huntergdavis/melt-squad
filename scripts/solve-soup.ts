import type { LiveTarget, World } from "../src/engine";

/** Development/test helper for the authored thermal-diversion recipe.
 * Reuses the shipped real-nozzle solver pattern; never writes puzzle state.
 */
export function solveSoupTributaries(world: World) {
  if (world.level.id !== "18.11" || !world.level.channels)
    throw new Error("Expected the Soup Tributaries of Destiny recipe");
  const target = (id: string) => {
    const found = world.targets.find((t) => t.id === id);
    if (!found) throw new Error("Missing soup target: " + id);
    return found;
  };
  const source = target("reservoir"),
    middle = target("middleBowl");
  const sides = [target("leftBowl"), target("rightBowl")];
  const plugs = [target("leftPlug"), target("rightPlug")];
  const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
  const spray = (t: LiveTarget, temp: number, ready: () => boolean) => {
    Object.assign(world.nozzle, { on: true, temp, pressure: 85, angle: 0 });
    for (
      let frame = 0;
      frame < 12000 && !ready() && !world.completed;
      frame++
    ) {
      world.nozzle.x =
        t.verb === "melt"
          ? t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29))
          : t.x + t.w / 2;
      world.nozzle.y = t.y - 52;
      world.update(1 / 60, idle);
    }
    world.nozzle.on = false;
    if (!ready()) throw new Error("Soup recipe stalled at " + t.id);
  };
  // Keep both low outlets closed until the raised middle overflow is used.
  for (const plug of plugs) spray(plug, -40, () => plug.phaseStep >= 1);
  // A full source becomes the real inlet. Continue feeding it, not the bowl.
  spray(source, 20, () => middle.done);
  for (const plug of plugs) spray(plug, 100, () => plug.done);
  spray(source, 20, () => sides.every((bowl) => bowl.done));
  for (let frame = 0; frame < 1200 && !world.completed; frame++)
    world.update(1 / 60, idle);
  if (!world.completed) throw new Error("Soup deliveries did not complete");
}
