export interface FlowBranch {
  target?: string;
  /** Decorative drainage endpoint; never a required objective. */
  outlet?: [number, number];
  /** A completed ice plug closes this branch. */
  closedBy?: string;
  gate?: string;
  overflowFrom?: string;
  /** Live thermal valves: staged completion alone does not imply solid ice. */
  iceGates?: readonly { target: string; state: "formed" | "open" }[];
}

export interface FlowTarget {
  id: string;
  done: boolean;
  verb?: string;
  progress?: number;
}

/**
 * The active PHASE verb carries its actual solid volume: construction grows
 * from 0 to 1; erosion removes it from 1 to 0. At freeze→melt, progress resets
 * to zero while the verb changes, so the full plug remains solid without
 * relying on final `done`. Invalid or non-ice states cannot operate a valve.
 */
export function iceSolidFraction(target: FlowTarget): number | undefined {
  const progress = target.progress;
  if (
    progress === undefined ||
    !Number.isFinite(progress) ||
    progress < 0 ||
    progress > 1
  )
    return undefined;
  if (target.verb === "freeze") return progress;
  if (target.verb === "melt") return 1 - progress;
  return undefined;
}

/** Recheck all prerequisites when routing begins and when a particle arrives. */
export function branchOpen(
  branch: FlowBranch,
  targets: readonly FlowTarget[],
): boolean {
  const complete = (id: string | undefined) =>
    !id || targets.find((target) => target.id === id)?.done === true;
  return (
    complete(branch.gate) &&
    complete(branch.overflowFrom) &&
    (!branch.closedBy || !complete(branch.closedBy)) &&
    (branch.iceGates ?? []).every((gate) => {
      const target = targets.find((item) => item.id === gate.target);
      const solid = target && iceSolidFraction(target);
      if (solid === undefined) return false;
      if (gate.state === "formed") return solid >= 1 - 1e-6;
      if (gate.state === "open") return solid <= 1e-6;
      return false;
    })
  );
}

/** Return original branch indices, preserving the authored splitting order. */
export function availableRoutes(
  branches: readonly FlowBranch[],
  targets: readonly FlowTarget[],
): number[] {
  const open = branches.flatMap((branch, index) =>
    branchOpen(branch, targets) ? [index] : [],
  );
  const superseded = new Set(
    open.flatMap((index) => {
      const source = branches[index].overflowFrom;
      return source ? [source] : [];
    }),
  );
  // A ready spillway receives the source's allocation; other routes stay open.
  return open.filter((index) => !superseded.has(branches[index].target ?? ""));
}
