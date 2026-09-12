export interface FlowBranch {
  target: string;
  gate?: string;
  overflowFrom?: string;
}

export interface FlowTarget {
  id: string;
  done: boolean;
}

/** Recheck both prerequisites when routing begins and when a particle arrives. */
export function branchOpen(
  branch: FlowBranch,
  targets: readonly FlowTarget[],
): boolean {
  const complete = (id: string | undefined) =>
    !id || targets.find((target) => target.id === id)?.done === true;
  return complete(branch.gate) && complete(branch.overflowFrom);
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
  return open.filter((index) => !superseded.has(branches[index].target));
}
