export type Verb = "melt" | "freeze" | "warm" | "fill" | "spin";
export type Theme = "kitchen" | "cave" | "garden" | "cosmos" | "town";
export type PropKind =
  | "cup"
  | "wizard"
  | "heart"
  | "penguin"
  | "flower"
  | "ufo"
  | "jukebox"
  | "duck"
  | "cake"
  | "moon"
  | "robot"
  | "cat"
  | "dragon"
  | "snowcone"
  | "letter"
  | "sun";
export interface Target {
  id: string;
  name: string;
  verb: Verb;
  x: number;
  y: number;
  w: number;
  h: number;
  requires?: string[];
  temp?: [number, number];
  pressure?: [number, number];
  effort?: number;
}
export interface Prop {
  kind: PropKind;
  x: number;
  y: number;
  scale?: number;
  target?: string;
}
export interface Level {
  id: string;
  name: string;
  chapter: string;
  theme: Theme;
  pitch: string;
  hint: string;
  ending: string;
  par: number;
  start: [number, number];
  temp: number;
  pressure: number;
  targets: Target[];
  props: Prop[];
}
export interface Controls {
  x: number;
  y: number;
  heat: number;
  pressure: number;
  tilt: number;
}
export const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));
export const W = 960,
  H = 580;
