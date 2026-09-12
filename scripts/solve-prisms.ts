import type { World, LiveTarget } from "../src/engine";

// Development/test helper: real nozzle controls only, never puzzle state writes.
export function solvePrismHeights(world: World) {
  const prisms = world.level.optics?.prisms?.filter((p) => p.height);
  if (!prisms?.length) throw new Error("No adjustable prisms");
  const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
  const aim = (t: LiveTarget) =>
    Object.assign(world.nozzle, {
      x: t.x + t.w / 2,
      y: t.y - 52,
      angle: 0,
    });
  for (const prism of prisms) {
    const t = world.targets.find((t) => t.id === prism.target)!;
    Object.assign(world.nozzle, { on: true, temp: -40, pressure: 85 });
    aim(t);
    for (let f = 0; f < 12000 && t.progress < 1 && !world.completed; f++)
      world.update(1 / 60, idle);
    world.nozzle.on = false;
    for (let f = 0; f < 90; f++) world.update(1 / 60, idle);
  }
  for (const prism of prisms) {
    if (world.completed || prism.height!.mark === 1) continue;
    const t = world.targets.find((t) => t.id === prism.target)!;
    Object.assign(world.nozzle, { on: true, temp: 40, pressure: 85 });
    aim(t);
    // Stop a little above the notch to account for water already in flight.
    for (
      let f = 0;
      f < 12000 && t.progress > prism.height!.mark + 0.007 && !world.completed;
      f++
    )
      world.update(1 / 60, idle);
    world.nozzle.on = false;
    for (let f = 0; f < 90; f++) world.update(1 / 60, idle);
  }
  if (!world.completed)
    throw new Error(
      "Prism beam did not reach all detectors: " +
        world.targets.map((t) => t.progress).join(","),
    );
}
