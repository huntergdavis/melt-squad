/** Board coordinates are pixels. Depth is metres, mass kilograms, density kg/m³.
 * A centered fixed load keeps this symmetric rectangular pontoon horizontal;
 * only vertical motion is simulated, not rocking, waves, or thermal melting. */
export interface BuoyancyPlan {
  id: string;
  iceTarget: string;
  fillTarget: string;
  basin: { x: number; y: number; w: number; h: number };
  pontoon: { x: number; w: number; h: number; depth: number };
  pixelsPerMeter: number;
  loadMass: number;
  iceDensity?: number;
  waterDensity?: number;
  dockY: number;
}

export interface BuoyancyState {
  /** Top of the actual ice body / deck, and the calibrated water surface. */
  deckY: number;
  waterY: number;
  /** Metres per second, downward positive. */
  velocity: number;
  mass: number;
  weight: number;
  buoyantForce: number;
  submergedDepth: number;
  displacedVolume: number;
  active: boolean;
  grounded: boolean;
  sunk: boolean;
  floating: boolean;
  settled: number;
  docked: boolean;
  valid: boolean;
}

const G = 9.81;
const REST_HOLD = 0.45;
const EPSILON = 1e-7;
const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(value, high));
const inRange = (value: number, low: number, high: number) =>
  Number.isFinite(value) && value >= low && value <= high;

type Geometry = {
  floor: number;
  restingY: number;
  minY: number;
  ppm: number;
  height: number;
  area: number;
  mass: number;
  waterDensity: number;
};

function geometry(plan: BuoyancyPlan): Geometry | undefined {
  if (!plan || !plan.basin || !plan.pontoon) return;
  const b = plan.basin,
    p = plan.pontoon;
  const ppm = plan.pixelsPerMeter;
  const iceDensity = plan.iceDensity ?? 917;
  const waterDensity = plan.waterDensity ?? 1000;
  // Bounded board-scale models keep the integrator numerically well conditioned.
  // Bad authoring is rejected, never silently changed into a winning setup.
  if (
    !plan.id ||
    !plan.iceTarget ||
    !plan.fillTarget ||
    plan.iceTarget === plan.fillTarget ||
    !inRange(b.x, 0, 960) ||
    !inRange(b.y, 0, 580) ||
    !inRange(b.w, 20, 960 - b.x) ||
    !inRange(b.h, 20, 580 - b.y) ||
    !inRange(p.w, 10, b.w - 1) ||
    !inRange(p.h, 10, b.h - 1) ||
    !inRange(p.x, b.x, b.x + b.w - p.w) ||
    !inRange(p.depth, 0.01, 10) ||
    !inRange(ppm, 50, 2000) ||
    !inRange(iceDensity, 100, 2000) ||
    !inRange(waterDensity, 500, 2000) ||
    !inRange(plan.loadMass, 0, 1e6) ||
    !inRange(plan.dockY, 0, 580)
  )
    return;
  const area = (p.w / ppm) * p.depth;
  const height = p.h / ppm;
  const floor = b.y + b.h;
  return {
    floor,
    restingY: floor - p.h,
    minY: Math.max(0, b.y - p.h),
    ppm,
    height,
    area,
    mass: iceDensity * area * height + plan.loadMass,
    waterDensity,
  };
}

function initial(g?: Geometry): BuoyancyState {
  return {
    deckY: g?.restingY ?? 0,
    waterY: g?.floor ?? 0,
    velocity: 0,
    mass: 0,
    weight: 0,
    buoyantForce: 0,
    submergedDepth: 0,
    displacedVolume: 0,
    active: false,
    grounded: false,
    sunk: false,
    floating: false,
    settled: 0,
    docked: false,
    valid: !!g,
  };
}

export function createBuoyancy(plan: BuoyancyPlan): BuoyancyState {
  return initial(geometry(plan));
}

/** Archimedes: upward force = water density × submerged volume × gravity.
 * Reference: OpenStax University Physics 1, section 14.4; density table in
 * OpenStax College Physics 2e, section 11.2 (ice 917, fresh water 1000 kg/m³).
 * Basin progress supplies the calibrated water height, not a solved flow field.
 * Integration never targets dockY: that mark is only a measured success check.
 * Reuses the balance module's bounded dt / rest-hold convention, not its forces. */
export function stepBuoyancy(
  state: BuoyancyState,
  plan: BuoyancyPlan,
  iceBuilt: boolean,
  fillProgress: number,
  dt: number,
): void {
  const g = geometry(plan);
  if (!g || !Number.isFinite(fillProgress)) {
    Object.assign(state, initial(g), { valid: false });
    return;
  }
  const fill = clamp(fillProgress, 0, 1);
  const waterY = g.floor - plan.basin.h * fill;
  if (iceBuilt !== true) {
    Object.assign(state, initial(g), { waterY });
    return;
  }
  dt = Number.isFinite(dt) ? clamp(dt, 0, 1 / 30) : 0;
  state.deckY = Number.isFinite(state.deckY)
    ? clamp(state.deckY, g.minY, g.restingY)
    : g.restingY;
  state.velocity = Number.isFinite(state.velocity)
    ? clamp(state.velocity, -20, 20)
    : 0;
  state.settled = Number.isFinite(state.settled)
    ? clamp(state.settled, 0, REST_HOLD)
    : 0;
  state.valid = true;
  state.active = true;
  state.waterY = waterY;
  state.mass = g.mass;
  state.weight = g.mass * G;

  const displacement = () =>
    clamp((state.deckY + plan.pontoon.h - waterY) / g.ppm, 0, g.height);
  const stiffness = g.waterDensity * G * g.area;
  const damping = 2 * 0.85 * Math.sqrt(g.mass * stiffness);
  const steps = Math.ceil(dt / (1 / 240));
  const step = steps ? dt / steps : 0;
  for (let i = 0; i < steps; i++) {
    const submerged = displacement();
    const force = state.weight - stiffness * submerged;
    // Linear wet drag, integrated implicitly; no artificial spring to the dock.
    const drag = damping * (submerged / g.height);
    state.velocity =
      (state.velocity + (force / g.mass) * step) / (1 + (drag / g.mass) * step);
    state.velocity = clamp(state.velocity, -20, 20);
    state.deckY += state.velocity * step * g.ppm;
    // Basin floor contact supports a dry, insufficiently buoyant, or sunk body.
    if (state.deckY >= g.restingY) {
      state.deckY = g.restingY;
      state.velocity = Math.min(0, state.velocity);
    } else if (state.deckY <= g.minY) {
      // A defensive board bound, not a possible success state.
      state.deckY = g.minY;
      state.velocity = Math.max(0, state.velocity);
    }
  }
  state.submergedDepth = displacement();
  state.displacedVolume = g.area * state.submergedDepth;
  state.buoyantForce = g.waterDensity * state.displacedVolume * G;
  state.grounded = state.deckY >= g.restingY - EPSILON;
  state.sunk = state.submergedDepth >= g.height - EPSILON;
  state.floating =
    !state.grounded &&
    !state.sunk &&
    state.submergedDepth > EPSILON &&
    state.deckY > g.minY + EPSILON;
  const inEquilibrium =
    Math.abs(state.buoyantForce - state.weight) <= state.weight * 0.005;
  const resting = Math.abs(state.velocity) <= 0.001;
  const aligned = Math.abs(state.deckY - plan.dockY) <= 0.5;
  const qualifies =
    fill === 1 && state.floating && inEquilibrium && resting && aligned;
  state.settled = qualifies ? Math.min(REST_HOLD, state.settled + dt) : 0;
  state.docked = state.settled >= REST_HOLD;
}
