export interface BalancePlan {
  id: string;
  x: number;
  y: number;
  /** Drawing scale in pixels; each load's arm is a separate physical ratio. */
  arm: number;
  left: { target?: string; mass: number; arm?: number; fixedMass?: number };
  right: { target?: string; mass: number; arm?: number; fixedMass?: number };
}
export interface BalanceArms {
  leftArm?: number;
  rightArm?: number;
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

const MAX_ANGLE = 0.35;
const REST_HOLD = 0.45;
const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(value, high));

function armLength(value: number | undefined): number | undefined {
  if (value === undefined) return 1;
  if (!Number.isFinite(value) || value <= 0) return;
  return clamp(value, 0.1, 10);
}

/** Massless arms with a 2-unit point ballast hanging 0.6 units below the pivot.
 * The ballast restores level without adding unequal-arm self-weight torque.
 * Positive angle lowers the right pan. Stops bound travel, not the load reading.
 * Physical arm ratios clamp to 0.1–10; invalid arms never certify a balance.
 * Loads cap at 1e6 units to keep external finite numbers numerically safe. */
export function stepBalance(
  state: BalanceState,
  left: number,
  right: number,
  dt: number,
  arms: BalanceArms = {},
) {
  left = Number.isFinite(left) ? clamp(left, 0, 1e6) : 0;
  right = Number.isFinite(right) ? clamp(right, 0, 1e6) : 0;
  dt = Number.isFinite(dt) ? Math.max(0, Math.min(dt, 1 / 30)) : 0;
  state.angle = Number.isFinite(state.angle)
    ? clamp(state.angle, -MAX_ANGLE, MAX_ANGLE)
    : 0;
  state.velocity = Number.isFinite(state.velocity)
    ? clamp(state.velocity, -20, 20)
    : 0;
  state.settled = Number.isFinite(state.settled)
    ? clamp(state.settled, 0, REST_HOLD)
    : 0;
  state.leftMass = left;
  state.rightMass = right;
  const leftArm = armLength(arms.leftArm);
  const rightArm = armLength(arms.rightArm);
  const validArms = leftArm !== undefined && rightArm !== undefined;
  const L = leftArm ?? 1;
  const R = rightArm ?? 1;
  const gravity = 9.81,
    ballastMass = 2,
    centerOffset = 0.6;
  const restoring = ballastMass * gravity * centerOffset;
  const inertia =
    ballastMass * centerOffset ** 2 + left * L ** 2 + right * R ** 2;
  const loadTorque = right * R - left * L;
  const torque =
    loadTorque * gravity * Math.cos(state.angle) -
    restoring * Math.sin(state.angle);
  const damping = 2 * Math.sqrt(inertia * restoring);
  state.velocity += ((torque - damping * state.velocity) / inertia) * dt;
  state.angle += state.velocity * dt;
  if (Math.abs(state.angle) > MAX_ANGLE) {
    state.angle = Math.sign(state.angle) * MAX_ANGLE;
    state.velocity = 0;
  }
  const matched =
    validArms && left + right > 0.05 && Math.abs(loadTorque) < 0.02;
  const resting =
    Math.abs(state.angle) < 0.018 && Math.abs(state.velocity) < 0.025;
  state.settled =
    matched && resting ? Math.min(REST_HOLD, state.settled + dt) : 0;
  state.level = state.settled >= REST_HOLD;
}
