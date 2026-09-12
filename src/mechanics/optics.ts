type Point = [number, number];

export interface OpticsPlan {
  source: { x: number; y: number; dx: number; dy: number };
  mirrors: {
    target: string;
    /** Triangular display around the reflecting diagonal; no added refraction. */
    housing?: "prism";
    x: number;
    y: number;
    /** Tangent angle in radians, in the board's downward-positive coordinates. */
    angle: number;
    length: number;
  }[];
  detectors: {
    id: string;
    name?: string;
    x: number;
    y: number;
    radius: number;
    label?: [number, number];
  }[];
  /** Completed, disjoint convex polygons (3–16 vertices, either winding).
   * Coordinates must lie on the board; index is 1–4 (ice: 1.31). */
  prisms?: {
    target: string;
    vertices: Point[];
    refractiveIndex: number;
    /** Grow vertically from a fixed base. The notch is a visual guide only. */
    height?: { mark: number };
  }[];
  /** Ideal lossless 50:50 coated interfaces, enabled by completed targets.
   * The finite segment is the cube's coated diagonal, not its outer square.
   * Cube outer faces are assumed normal to the incident/exit rays (no bending).
   * A geometric model: no polarization, interference, or spectral dispersion. */
  splitters?: {
    target: string;
    x: number;
    y: number;
    /** Tangent angle, using the same convention as mirrors. */
    angle: number;
    length: number;
  }[];
}

/** Structural subset of LiveTarget; importing this module needs no engine. */
export interface OpticsTarget {
  id: string;
  verb: string;
  x: number;
  y: number;
  w: number;
  h: number;
  done: boolean;
  progress?: number;
  reversibleIce?: boolean;
  cells: readonly number[];
  cols: number;
  rows: number;
}

export interface OpticsTrace {
  /** Unsplit segments retain their original shape; absent power means 1. */
  segments: { from: Point; to: Point; power?: number }[];
  lit: Set<string>;
}

const WIDTH = 960;
const HEIGHT = 580;
const EPSILON = 1e-7;
const MAX_INTERACTIONS = 12;
// Global work caps also bound paths that revisit splitters. Cutoff branches are
// discarded, never replaced with authored endpoints or detector signals.
const MAX_RAYS = 32;
const MAX_SEGMENTS = 128;
const MIN_POWER = 1 / 256;
// Match the engine's 10px MELT grid, including its clipped final row/column.
const CELL = 10;
const ERASED = 0.02;
type Rect = { x: number; y: number; w: number; h: number };
type Reflector = OpticsPlan["mirrors"][number] & { tangent: Point };
type Surface = Pick<Reflector, "x" | "y" | "length" | "tangent">;
type Boundary = Surface & { outward: Point; refractiveIndex: number };
type Prism = { vertices: Point[]; boundaries: Boundary[] };
const finite = (...values: number[]) => values.every(Number.isFinite);
export function activePrismVertices(
  prism: NonNullable<OpticsPlan["prisms"]>[number],
  target: OpticsTarget | undefined,
): Point[] | undefined {
  if (!prism.height) return target?.done ? prism.vertices : undefined;
  const amount = target?.progress;
  if (
    !target?.reversibleIce ||
    target.verb !== "freeze" ||
    amount === undefined ||
    !finite(amount, prism.height.mark) ||
    amount <= 0 ||
    amount > 1 ||
    prism.height.mark <= 0 ||
    prism.height.mark > 1 ||
    prism.vertices.length < 3 ||
    prism.vertices.some(([x, y]) => !finite(x, y))
  )
    return;
  const base = Math.max(...prism.vertices.map(([, y]) => y));
  return prism.vertices.map(([x, y]) => [x, base - (base - y) * amount]);
}
const cross = (a: Point, b: Point) => a[0] * b[1] - a[1] * b[0];

function normalized(x: number, y: number): Point | undefined {
  if (!finite(x, y)) return;
  const scale = Math.max(Math.abs(x), Math.abs(y));
  if (scale === 0) return;
  // Scaling first also supports very large or very small finite directions.
  const sx = x / scale;
  const sy = y / scale;
  const length = Math.hypot(sx, sy);
  return [sx / length, sy / length];
}

function borderDistance(from: Point, direction: Point): number {
  const x =
    direction[0] > EPSILON
      ? (WIDTH - from[0]) / direction[0]
      : direction[0] < -EPSILON
        ? -from[0] / direction[0]
        : Infinity;
  const y =
    direction[1] > EPSILON
      ? (HEIGHT - from[1]) / direction[1]
      : direction[1] < -EPSILON
        ? -from[1] / direction[1]
        : Infinity;
  return Math.min(x, y);
}

function mirrorDistance(
  from: Point,
  direction: Point,
  mirror: Surface,
): number {
  const denominator = cross(direction, mirror.tangent);
  if (Math.abs(denominator) < EPSILON) return Infinity;
  const offset: Point = [mirror.x - from[0], mirror.y - from[1]];
  const distance = cross(offset, mirror.tangent) / denominator;
  const alongMirror = cross(offset, direction) / denominator;
  // Ignore the surface we have just left, and the infinite line beyond its ends.
  return finite(distance, alongMirror) &&
    distance > EPSILON &&
    Math.abs(alongMirror) <= mirror.length / 2 + EPSILON
    ? distance
    : Infinity;
}

function splitterGeometry(
  splitter: NonNullable<OpticsPlan["splitters"]>[number],
): Reflector | undefined {
  const { x, y, angle, length } = splitter;
  if (!finite(x, y, angle, length) || length <= EPSILON) return;
  const tangent: Point = [Math.cos(angle), Math.sin(angle)];
  const halfX = Math.abs((tangent[0] * length) / 2);
  const halfY = Math.abs((tangent[1] * length) / 2);
  if (x - halfX < 0 || x + halfX > WIDTH || y - halfY < 0 || y + halfY > HEIGHT)
    return;
  return { ...splitter, tangent };
}

function reflected(direction: Point, surface: Surface): Point | undefined {
  const normal: Point = [-surface.tangent[1], surface.tangent[0]];
  const dot = direction[0] * normal[0] + direction[1] * normal[1];
  return normalized(
    direction[0] - 2 * dot * normal[0],
    direction[1] - 2 * dot * normal[1],
  );
}

function prismGeometry(
  prism: NonNullable<OpticsPlan["prisms"]>[number],
): Prism | undefined {
  const { vertices, refractiveIndex } = prism;
  if (
    !finite(refractiveIndex) ||
    refractiveIndex < 1 ||
    refractiveIndex > 4 ||
    vertices.length < 3 ||
    vertices.length > 16 ||
    vertices.some(
      ([x, y]) => !finite(x, y) || x < 0 || x > WIDTH || y < 0 || y > HEIGHT,
    )
  )
    return;
  const area = vertices.reduce(
    (sum, vertex, i) =>
      sum + cross(vertex, vertices[(i + 1) % vertices.length]),
    0,
  );
  if (Math.abs(area) < EPSILON) return;
  const boundaries: Boundary[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const a = vertices[i],
      b = vertices[(i + 1) % vertices.length];
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (length <= EPSILON) return;
    const tangent: Point = [(b[0] - a[0]) / length, (b[1] - a[1]) / length];
    const winding = Math.sign(area);
    const outward: Point = [winding * tangent[1], -winding * tangent[0]];
    // Every vertex must lie inside every edge: reject concave/self-crossing plans.
    if (
      vertices.some(
        (v) =>
          (v[0] - a[0]) * outward[0] + (v[1] - a[1]) * outward[1] > EPSILON,
      )
    )
      return;
    boundaries.push({
      x: (a[0] + b[0]) / 2,
      y: (a[1] + b[1]) / 2,
      length,
      tangent,
      outward,
      refractiveIndex,
    });
  }
  return { vertices, boundaries };
}

function separated(a: Prism, b: Prism): boolean {
  return a.boundaries.some((edge) =>
    b.vertices.every(
      (v) =>
        (v[0] - edge.x) * edge.outward[0] + (v[1] - edge.y) * edge.outward[1] >
        EPSILON,
    ),
  );
}

/** Vector Snell law, n1 sin(theta1) = n2 sin(theta2).
 * See pbr-book.org/4ed/Reflection_Models/Specular_Reflection_and_Transmission.
 * Only the transmitted ray is followed, except for total internal reflection;
 * this deliberately does not split Fresnel reflections or simulate dispersion. */
function refracted(direction: Point, boundary: Boundary): Point | undefined {
  const dot =
    direction[0] * boundary.outward[0] + direction[1] * boundary.outward[1];
  const entering = dot < 0;
  const normal: Point = entering
    ? boundary.outward
    : [-boundary.outward[0], -boundary.outward[1]];
  const ratio = entering
    ? 1 / boundary.refractiveIndex
    : boundary.refractiveIndex;
  const cosine = Math.min(1, Math.abs(dot));
  const discriminant = 1 - ratio * ratio * Math.max(0, 1 - cosine * cosine);
  if (discriminant < 0) {
    // Ice → air above the critical angle: stay inside, reflecting off this edge.
    return normalized(
      direction[0] + 2 * cosine * normal[0],
      direction[1] + 2 * cosine * normal[1],
    );
  }
  const normalScale = ratio * cosine - Math.sqrt(discriminant);
  return normalized(
    ratio * direction[0] + normalScale * normal[0],
    ratio * direction[1] + normalScale * normal[1],
  );
}

function rectangleDistance(
  from: Point,
  direction: Point,
  rect: Rect,
  limit: number,
): number {
  let entry = 0;
  let exit = limit;
  const min: Point = [rect.x, rect.y];
  const max: Point = [rect.x + rect.w, rect.y + rect.h];
  for (const axis of [0, 1] as const) {
    if (Math.abs(direction[axis]) < EPSILON) {
      // The far edge is exclusive, as it is for engine droplet/cell collisions.
      if (from[axis] < min[axis] || from[axis] >= max[axis]) return Infinity;
      continue;
    }
    const a = (min[axis] - from[axis]) / direction[axis];
    const b = (max[axis] - from[axis]) / direction[axis];
    entry = Math.max(entry, Math.min(a, b));
    exit = Math.min(exit, Math.max(a, b));
    if (entry > exit) return Infinity;
  }
  return entry;
}

function iceCells(targets: readonly OpticsTarget[]): Rect[] {
  const rectangles: Rect[] = [];
  for (const target of targets) {
    if (
      target.done ||
      target.verb !== "melt" ||
      !finite(target.x, target.y, target.w, target.h) ||
      target.w <= 0 ||
      target.h <= 0 ||
      !Number.isSafeInteger(target.cols) ||
      target.cols <= 0 ||
      !Number.isSafeInteger(target.rows) ||
      target.rows <= 0
    )
      continue;
    const count = Math.min(target.cells.length, target.cols * target.rows);
    for (let i = 0; i < count; i++) {
      if (!Number.isFinite(target.cells[i]) || target.cells[i] <= ERASED)
        continue;
      const col = i % target.cols;
      const row = Math.floor(i / target.cols);
      const x = target.x + col * CELL;
      const y = target.y + row * CELL;
      const w = Math.min(CELL, target.w - col * CELL);
      const h = Math.min(CELL, target.h - row * CELL);
      if (w > 0 && h > 0 && x < WIDTH && x + w > 0 && y < HEIGHT && y + h > 0)
        rectangles.push({ x, y, w, h });
    }
  }
  return rectangles;
}

function hitsDetector(
  from: Point,
  to: Point,
  detector: OpticsPlan["detectors"][number],
): boolean {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  if (length === 0)
    return (
      Math.hypot(detector.x - from[0], detector.y - from[1]) <= detector.radius
    );
  const projection =
    ((detector.x - from[0]) * (dx / length) +
      (detector.y - from[1]) * (dy / length)) /
    length;
  const along = Math.max(0, Math.min(1, projection));
  return (
    Math.hypot(
      detector.x - (from[0] + dx * along),
      detector.y - (from[1] + dy * along),
    ) <=
    detector.radius + EPSILON
  );
}

/** Trace physical ray segments; detectors observe them without consuming light. */
export function traceOptics(
  plan: OpticsPlan,
  targets: readonly OpticsTarget[],
): OpticsTrace {
  const result: OpticsTrace = { segments: [], lit: new Set() };
  const { x, y, dx, dy } = plan.source;
  const direction = normalized(dx, dy);
  if (!direction || !finite(x, y) || x < 0 || x > WIDTH || y < 0 || y > HEIGHT)
    return result;
  const completed = new Set(targets.filter((t) => t.done).map((t) => t.id));
  const mirrors: Reflector[] = plan.mirrors
    .filter(
      (m) =>
        completed.has(m.target) &&
        finite(m.x, m.y, m.angle, m.length) &&
        m.length > 0,
    )
    .map<Reflector>((m) => ({
      ...m,
      tangent: [Math.cos(m.angle), Math.sin(m.angle)],
    }));
  const detectors = plan.detectors.filter(
    (d) => finite(d.x, d.y, d.radius) && d.radius >= 0,
  );
  const splitters = (plan.splitters ?? [])
    .filter((splitter) => completed.has(splitter.target))
    .map(splitterGeometry)
    .filter((splitter): splitter is Reflector => !!splitter);
  const ice = iceCells(targets);
  const candidates = (plan.prisms ?? [])
    .flatMap((prism) => {
      const vertices = activePrismVertices(
        prism,
        targets.find((t) => t.id === prism.target),
      );
      return vertices ? [{ ...prism, vertices }] : [];
    })
    .map(prismGeometry)
    .filter((prism): prism is Prism => !!prism);
  // The supported medium boundary is air ↔ one prism. Reject touching/overlapping
  // polygons rather than pretending an ice → ice interface is another air gap.
  const boundaries = candidates
    .filter((prism, i) =>
      candidates.every(
        (other, j) =>
          i === j || separated(prism, other) || separated(other, prism),
      ),
    )
    .flatMap((prism) => prism.boundaries);

  type Ray = {
    from: Point;
    direction: Point;
    interactions: number;
    power: number;
  };
  const rays: Ray[] = [{ from: [x, y], direction, interactions: 0, power: 1 }];
  let createdRays = 1;
  // Breadth-first traversal keeps one looping branch from starving its sibling.
  // Each lineage permits twelve interactions plus its last outgoing segment.
  for (
    let next = 0;
    next < rays.length && result.segments.length < MAX_SEGMENTS;
    next++
  ) {
    const { from, direction, interactions, power } = rays[next];
    let distance = borderDistance(from, direction);
    let reflector: Reflector | undefined;
    let boundary: Boundary | undefined;
    let splitter: Reflector | undefined;
    for (const mirror of mirrors) {
      const hit = mirrorDistance(from, direction, mirror);
      if (hit < distance) {
        distance = hit;
        reflector = mirror;
      }
    }
    for (const edge of boundaries) {
      const hit = mirrorDistance(from, direction, edge);
      if (hit < distance) {
        distance = hit;
        boundary = edge;
        reflector = undefined;
      }
    }
    for (const surface of splitters) {
      const hit = mirrorDistance(from, direction, surface);
      if (hit < distance) {
        distance = hit;
        splitter = surface;
        reflector = undefined;
        boundary = undefined;
      }
    }
    for (const cell of ice) {
      const hit = rectangleDistance(from, direction, cell, distance);
      if (hit <= distance) {
        distance = hit;
        reflector = undefined; // Opaque ice wins a tie with a mirror surface.
        boundary = undefined;
        splitter = undefined;
      }
    }
    if (!Number.isFinite(distance) || distance <= EPSILON) continue;
    const to: Point = [
      Math.max(0, Math.min(WIDTH, from[0] + direction[0] * distance)),
      Math.max(0, Math.min(HEIGHT, from[1] + direction[1] * distance)),
    ];
    result.segments.push(power === 1 ? { from, to } : { from, to, power });
    for (const detector of detectors)
      if (hitsDetector(from, to, detector)) result.lit.add(detector.id);
    if (interactions === MAX_INTERACTIONS) continue;
    if (splitter) {
      // An ideal coated hypotenuse sends half the power along each geometrically
      // derived direction. Transmission does not bend between identical media.
      // Reference: edmundoptics.com/knowledge-center/application-notes/optics/what-are-beamsplitters/
      const reflectedDirection = reflected(direction, splitter);
      const childPower = power / 2;
      if (
        reflectedDirection &&
        childPower >= MIN_POWER &&
        createdRays + 2 <= MAX_RAYS
      ) {
        rays.push(
          {
            from: to,
            direction,
            interactions: interactions + 1,
            power: childPower,
          },
          {
            from: to,
            direction: reflectedDirection,
            interactions: interactions + 1,
            power: childPower,
          },
        );
        createdRays += 2;
      }
      continue;
    }
    const outgoing = boundary
      ? refracted(direction, boundary)
      : reflector
        ? reflected(direction, reflector)
        : undefined;
    if (outgoing)
      rays.push({
        from: to,
        direction: outgoing,
        interactions: interactions + 1,
        power,
      });
  }
  return result;
}
