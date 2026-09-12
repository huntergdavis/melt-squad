import { clamp, H, W, type Controls, type Level, type Target } from "./types";
import {
  createBalance,
  stepBalance,
  type BalanceState,
} from "./mechanics/balance";
import { traceOptics } from "./mechanics/optics";

export const CELL = 10;
export interface LiveTarget extends Target {
  progress: number;
  done: boolean;
  cells: number[];
  cols: number;
  rows: number;
  feedback: string;
  flash: number;
  completedAt: number;
}
export interface Drop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  temp: number;
  pressure: number;
  routed?: boolean;
}
export interface Runoff {
  branch: number;
  distance: number;
  temp: number;
  pressure: number;
}
export interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}
export const temperatureColor = (t: number) =>
  t < 0 ? "#71d8ff" : t < 55 ? "#ffc983" : "#ff785a";
export function requirements(t: Target, untimed = false): string {
  if (t.pulse && !untimed)
    return "ON BEAT · " + requirements({ ...t, pulse: undefined });
  if (t.verb === "melt") return "HOT · 10° or more";
  if (t.verb === "freeze") return "COLD · −10° or less";
  if (t.verb === "fill")
    return t.flowOnly
      ? "ROUTED WATER · feed the inlet above 0°"
      : "WATER · above 0°";
  if (t.verb === "spin") return "JET · 70% pressure + water above 0°";
  return (
    (t.temp?.join("–") ?? "20–55") +
    "° · " +
    (t.pressure?.join("–") ?? "10–55") +
    "% pressure"
  );
}
export class World {
  targets: LiveTarget[];
  drops: Drop[] = [];
  sparks: Spark[] = [];
  runoff: Runoff[] = [];
  stationary = false;
  untimed = false;
  signals = new Set<string>();
  balance?: BalanceState;
  light: ReturnType<typeof traceOptics> = {
    segments: [],
    lit: new Set<string>(),
  };
  private routeCursor = 0;
  nozzle: {
    x: number;
    y: number;
    angle: number;
    temp: number;
    pressure: number;
    on: boolean;
  };
  elapsed = 0;
  water = 0;
  mistakes = 0;
  completed = false;
  celebration = 0;
  hits = 0;
  private emission = 0;
  private seed = 17;
  constructor(public level: Level) {
    if (level.balance) this.balance = createBalance();
    this.nozzle = {
      x: level.start[0],
      y: level.start[1],
      angle: 0,
      temp: level.temp,
      pressure: level.pressure,
      on: true,
    };
    this.targets = level.targets.map((t) => {
      const cols = Math.ceil(t.w / CELL),
        rows = Math.ceil(t.h / CELL);
      return {
        ...t,
        x: t.x + (t.motion ? Math.cos(t.motion.phase ?? 0) * t.motion.rx : 0),
        y: t.y + (t.motion ? Math.sin(t.motion.phase ?? 0) * t.motion.ry : 0),
        cols,
        rows,
        cells: Array(cols * rows).fill(1),
        progress: 0,
        done: false,
        feedback: "",
        flash: 0,
        completedAt: -1,
      };
    });
  }
  random() {
    this.seed = (Math.imul(1664525, this.seed) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
  available(t: Target) {
    return (
      !t.needsSignals?.some((id) => !this.signals.has(id)) &&
      !t.requires?.some(
        (id) => !this.targets.find((other) => other.id === id)?.done,
      )
    );
  }
  waitingFor(t: Target): string {
    const tasks = (t.requires ?? [])
      .filter((id) => !this.targets.find((other) => other.id === id)?.done)
      .map(
        (id) =>
          this.targets.find((other) => other.id === id)?.name.toLowerCase() ??
          id,
      );
    for (const id of t.needsSignals ?? []) {
      if (!this.signals.has(id))
        tasks.push(
          id === this.level.balance?.id
            ? "let the scale settle level"
            : "light the detector",
        );
    }
    return "First: " + tasks.join(" + ");
  }
  private updateMechanics(dt: number) {
    this.signals.clear();
    const plan = this.level.balance;
    if (plan && this.balance) {
      const mass = (load: typeof plan.left) => {
        const target = this.targets.find((t) => t.id === load.target);
        return load.mass * (target?.done ? 1 : (target?.progress ?? 0));
      };
      stepBalance(this.balance, mass(plan.left), mass(plan.right), dt);
      if (this.balance.level) this.signals.add(plan.id);
    }
    if (this.level.optics) {
      this.light = traceOptics(this.level.optics, this.targets);
      for (const id of this.light.lit) this.signals.add(id);
    }
  }
  pulsePosition(t: Target): number {
    if (!t.pulse) return 0;
    const { period, phase = 0 } = t.pulse;
    return ((((this.elapsed + phase) % period) + period) % period) / period;
  }
  pulseOpen(t: Target): boolean {
    return (
      !t.pulse ||
      this.untimed ||
      this.pulsePosition(t) < t.pulse.open / t.pulse.period
    );
  }
  get progress() {
    return (
      this.targets.reduce((n, t) => n + (t.done ? 1 : t.progress), 0) /
      this.targets.length
    );
  }
  get stars() {
    return (
      1 +
      Number(this.elapsed <= this.level.par * 1.8) +
      Number(this.elapsed <= this.level.par && this.mistakes < 60)
    );
  }
  burst(x: number, y: number, color: string, count = 12) {
    for (let n = 0; n < count; n++) {
      const life = 0.4 + this.random() * 0.5;
      this.sparks.push({
        x,
        y,
        vx: (this.random() - 0.5) * 170,
        vy: -30 - this.random() * 120,
        life,
        maxLife: life,
        color,
      });
    }
  }
  impact(t: LiveTarget, drop: Drop, x: number, y: number) {
    if (t.done || !this.available(t)) return;
    if (!this.pulseOpen(t)) {
      t.flash = 0.3;
      t.feedback = "REST · wait for GO, or turn on untimed assist";
      return; // A missed beat never removes progress or counts as a mistake.
    }
    if (t.flowOnly && !drop.routed) {
      t.flash = 0.3;
      t.feedback = "Feed the inlet — this tub needs river water";
      return;
    }
    const heat = drop.temp,
      pressure = drop.pressure;
    const valid =
      t.verb === "melt"
        ? heat >= 10
        : t.verb === "freeze"
          ? heat <= -10
          : t.verb === "fill"
            ? heat > 0
            : t.verb === "spin"
              ? pressure >= 70 && heat > 0
              : heat >= (t.temp?.[0] ?? 20) &&
                heat <= (t.temp?.[1] ?? 55) &&
                pressure >= (t.pressure?.[0] ?? 10) &&
                pressure <= (t.pressure?.[1] ?? 55);
    this.hits++;
    t.flash = 0.3;
    if (!valid) {
      t.feedback = requirements(t, this.untimed);
      this.mistakes++;
      if (t.verb === "warm" || (t.verb === "freeze" && heat > 0))
        t.progress = Math.max(0, t.progress - 0.002);
      return;
    }
    t.feedback = "";
    if (t.verb === "melt") {
      const col = clamp(Math.floor((x - t.x) / CELL), 0, t.cols - 1);
      const row = clamp(Math.floor((y - t.y) / CELL), 0, t.rows - 1);
      // Local erosion makes holes real: subsequent droplets travel through them.
      const power = (0.15 + heat / 110) / (t.effort ?? 1);
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const c = col + dx,
            r = row + dy;
          if (c >= 0 && c < t.cols && r >= 0 && r < t.rows) {
            const i = r * t.cols + c;
            t.cells[i] = Math.max(
              0,
              t.cells[i] - power * (dx === 0 && dy === 0 ? 0.55 : 0.16),
            );
          }
        }
      t.progress = 1 - t.cells.reduce((a, b) => a + b, 0) / t.cells.length;
      if (t.progress >= 0.88) t.progress = 1; // Tiny shards dissolve; no pixel hunting.
    } else {
      const strength =
        t.verb === "freeze"
          ? clamp(-heat / 25, 0.4, 1.8)
          : t.verb === "spin"
            ? pressure / 85
            : 1;
      t.progress = Math.min(
        1,
        t.progress + (0.004 * strength) / (t.effort ?? 1),
      );
    }
    if (this.random() < 0.16)
      this.burst(x, y, t.verb === "freeze" ? "#84e7ef" : "#fff3c9", 2);
    if (t.progress >= 1) {
      t.done = true;
      t.completedAt = this.elapsed;
      this.burst(t.x + t.w / 2, t.y + t.h / 2, "#ffd580", 30);
      if (this.targets.every((item) => item.done)) {
        this.completed = true;
        this.burst(W / 2, H / 3, "#ff9870", 55);
      }
    }
  }
  update(dt: number, input: Controls) {
    dt = clamp(dt, 0, 1 / 30);
    for (const t of this.targets) t.flash = Math.max(0, t.flash - dt);
    for (const s of this.sparks) {
      s.life -= dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.vy += 130 * dt;
    }
    this.sparks = this.sparks.filter((s) => s.life > 0);
    if (this.completed) {
      this.celebration += dt;
      return;
    }
    this.elapsed += dt;
    for (const [i, t] of this.targets.entries()) {
      const base = this.level.targets[i];
      if (!base.motion) continue;
      const angle = this.stationary
        ? 0
        : (this.elapsed * Math.PI * 2) / base.motion.period;
      const phase = base.motion.phase ?? 0;
      t.x = base.x + Math.cos(angle + phase) * base.motion.rx;
      t.y = base.y + Math.sin(angle + phase) * base.motion.ry;
    }
    this.updateRunoff(dt);
    this.updateMechanics(dt);
    const n = this.nozzle;
    const magnitude = Math.max(1, Math.hypot(input.x, input.y));
    n.x = clamp(n.x + (input.x / magnitude) * 270 * dt, 55, W - 55);
    n.y = clamp(n.y + (input.y / magnitude) * 270 * dt, 72, H - 65);
    n.temp = clamp(n.temp + input.heat * 70 * dt, -40, 100);
    n.pressure = clamp(n.pressure + input.pressure * 65 * dt, 10, 100);
    n.angle = clamp(
      n.angle + input.tilt * 1.8 * dt,
      -Math.PI * 0.88,
      Math.PI * 0.88,
    );
    if (n.on) {
      this.emission += dt * (65 + n.pressure * 0.7);
      while (this.emission >= 1) {
        this.emission--;
        const angle =
          n.angle + (this.random() - 0.5) * (0.28 - n.pressure * 0.0015);
        const speed = 130 + n.pressure * 5.2;
        this.drops.push({
          x: n.x + Math.sin(n.angle) * 26,
          y: n.y + Math.cos(n.angle) * 26,
          vx: Math.sin(angle) * speed,
          vy: Math.cos(angle) * speed,
          life: 0.6 + n.pressure * 0.012,
          temp: n.temp,
          pressure: n.pressure,
        });
        this.water += 0.025;
      }
    }
    for (const d of this.drops) {
      const oldX = d.x,
        oldY = d.y;
      d.vy += 160 * dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.life -= dt;
      if (d.y > H - 40) {
        d.life = 0;
        continue;
      }
      const steps = Math.ceil(Math.hypot(d.x - oldX, d.y - oldY) / 4);
      let hit = false;
      for (let i = 1; i <= steps && !hit; i++) {
        const x = oldX + ((d.x - oldX) * i) / steps,
          y = oldY + ((d.y - oldY) * i) / steps;
        for (const t of this.targets) {
          if (
            t.done ||
            !this.available(t) ||
            x < t.x ||
            x >= t.x + t.w ||
            y < t.y ||
            y >= t.y + t.h
          )
            continue;
          if (
            t.verb === "melt" &&
            t.cells[
              Math.floor((y - t.y) / CELL) * t.cols +
                Math.floor((x - t.x) / CELL)
            ] <= 0.02
          )
            continue;
          this.impact(t, d, x, y);
          d.life = 0;
          hit = true;
          break;
        }
        const inlet = this.level.channels?.inlet;
        if (
          !hit &&
          inlet &&
          d.temp > 0 &&
          x >= inlet.x &&
          x <= inlet.x + inlet.w &&
          y >= inlet.y &&
          y <= inlet.y + inlet.h
        ) {
          const routes = this.level.channels!.branches.flatMap(
            (branch, index) =>
              !branch.gate ||
              this.targets.find((t) => t.id === branch.gate)?.done
                ? [index]
                : [],
          );
          if (routes.length)
            this.runoff.push({
              branch: routes[this.routeCursor++ % routes.length],
              distance: 0,
              temp: d.temp,
              pressure: d.pressure,
            });
          d.life = 0;
          hit = true;
        }
      }
    }
    this.drops = this.drops
      .filter((d) => d.life > 0 && d.x > 0 && d.x < W)
      .slice(-350);
    this.sparks = this.sparks.slice(-220);
    this.runoff = this.runoff.slice(-350);
  }
  channelPath(branch: number): [number, number][] {
    const channels = this.level.channels!;
    const route = channels.branches[branch];
    const target = this.targets.find((t) => t.id === route.target)!;
    return [
      [
        channels.inlet.x + channels.inlet.w / 2,
        channels.inlet.y + channels.inlet.h / 2,
      ],
      channels.junction,
      ...(route.via ?? []),
      [target.x + target.w / 2, target.y + target.h / 2],
    ];
  }
  runoffPosition(drop: Runoff): { x: number; y: number; arrived: boolean } {
    const points = this.channelPath(drop.branch);
    let distance = drop.distance;
    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i - 1],
        [endX, endY] = points[i];
      const length = Math.hypot(endX - x, endY - y);
      if (length > 0 && distance < length)
        return {
          x: x + ((endX - x) * distance) / length,
          y: y + ((endY - y) * distance) / length,
          arrived: false,
        };
      distance -= length;
    }
    const [x, y] = points.at(-1)!;
    return { x, y, arrived: true };
  }
  private updateRunoff(dt: number) {
    this.runoff = this.runoff.filter((drop) => {
      drop.distance += dt * 220;
      const point = this.runoffPosition(drop);
      if (!point.arrived) return true;
      const branch = this.level.channels!.branches[drop.branch];
      // A gate may change later; recheck connectivity on delivery as well.
      if (
        !branch.gate ||
        this.targets.find((t) => t.id === branch.gate)?.done
      ) {
        const target = this.targets.find((t) => t.id === branch.target)!;
        this.impact(
          target,
          {
            ...drop,
            x: point.x,
            y: point.y,
            vx: 0,
            vy: 0,
            life: 1,
            routed: true,
          },
          point.x,
          point.y,
        );
      }
      return false;
    });
  }
}
