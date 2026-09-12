export interface BalancePlan {
  id: string;
  x: number;
  y: number;
  arm: number;
  left: { target: string; mass: number };
  right: { target: string; mass: number };
}
export interface BalanceState {
  angle: number;
  velocity: number;
  settled: number;
  level: boolean;
  leftMass: number;
  rightMass: number;
}
export const createBalance = (): BalanceState => ({
  angle: 0,
  velocity: 0,
  settled: 0,
  level: false,
  leftMass: 0,
  rightMass: 0,
});

/** Equal unit-length arms; a low center of mass restores an unloaded/equal beam.
 * Positive angle lowers the right pan. Stops bound travel, not the mass reading. */
export function stepBalance(
  state: BalanceState,
  left: number,
  right: number,
  dt: number,
) {
  left = Number.isFinite(left) ? Math.max(0, left) : 0;
  right = Number.isFinite(right) ? Math.max(0, right) : 0;
  dt = Number.isFinite(dt) ? Math.max(0, Math.min(dt, 1 / 30)) : 0;
  state.leftMass = left;
  state.rightMass = right;
  const gravity = 9.81,
    beamMass = 2,
    centerOffset = 0.6;
  const inertia = beamMass / 3 + left + right;
  const torque =
    (right - left) * gravity * Math.cos(state.angle) -
    beamMass * gravity * centerOffset * Math.sin(state.angle);
  const damping = 2 * Math.sqrt(inertia * beamMass * gravity * centerOffset);
  state.velocity += ((torque - damping * state.velocity) / inertia) * dt;
  state.angle += state.velocity * dt;
  if (Math.abs(state.angle) > 0.35) {
    state.angle = Math.sign(state.angle) * 0.35;
    state.velocity = 0;
  }
  const matched = left + right > 0.05 && Math.abs(left - right) < 0.02;
  const resting =
    Math.abs(state.angle) < 0.018 && Math.abs(state.velocity) < 0.025;
  state.settled = matched && resting ? state.settled + dt : 0;
  state.level = state.settled >= 0.45;
}
