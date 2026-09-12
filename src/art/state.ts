import type { Prop } from "../types";

/** Presentation observes gameplay; it never creates completion or signals. */
export function propIsReady(
  prop: Prop,
  world: {
    completed: boolean;
    signals: ReadonlySet<string>;
    targets: readonly { id: string; done: boolean }[];
  },
): boolean {
  if (prop.signal !== undefined) return world.signals.has(prop.signal);
  return (
    world.targets.find((target) => target.id === prop.target)?.done ??
    world.completed
  );
}
