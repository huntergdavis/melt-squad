import type { World, LiveTarget } from "../src/engine";

// Development/test helper only. Operates the ordinary nozzle; never writes
// progress, droplets, physical readings, signals, or completion state.
export function solveBallast(world: World) {
  const plan = world.level.balance;
  if (!plan) throw new Error("No physical balance");
  const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
  const cups = world.targets.filter((t) => t.reversibleIce);
  const aim = (t: LiveTarget) => {
    Object.assign(world.nozzle, { x: t.x + t.w / 2, y: t.y - 52, angle: 0 });
  };
  for (const cup of cups) {
    Object.assign(world.nozzle, { on: true, temp: -20, pressure: 85 });
    for (let frame = 0; frame < 12000 && cup.progress < 1; frame++) {
      aim(cup);
      world.update(1 / 60, idle);
    }
    if (cup.progress !== 1) throw new Error("Could not grow " + cup.id);
    world.nozzle.on = false;
    for (let frame = 0; frame < 90; frame++) world.update(1 / 60, idle);
  }
  const torque = (load: typeof plan.left) => {
    const cup = world.targets.find((t) => t.id === load.target);
    return (
      ((load.fixedMass ?? 0) + load.mass * (cup?.progress ?? 1)) *
      (load.arm ?? 1)
    );
  };
  for (let attempt = 0; attempt < 8 && !world.completed; attempt++) {
    const leftHeavy = torque(plan.left) > torque(plan.right);
    const heavy = leftHeavy ? plan.left : plan.right;
    const light = leftHeavy ? plan.right : plan.left;
    const cup = cups.find((t) => t.id === heavy.target);
    if (!cup) throw new Error("Heavy load has no adjustable cup");
    Object.assign(world.nozzle, { on: true, temp: 40, pressure: 85 });
    for (
      let frame = 0;
      frame < 12000 && torque(heavy) - torque(light) > 0.01;
      frame++
    ) {
      aim(cup);
      world.update(1 / 60, idle);
    }
    world.nozzle.on = false;
    for (let frame = 0; frame < 1200 && !world.completed; frame++)
      world.update(1 / 60, idle);
  }
  if (!world.completed) throw new Error("Adjustable ballast did not settle");
}
