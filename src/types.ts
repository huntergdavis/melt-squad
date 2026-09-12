import type { BalancePlan } from "./mechanics/balance";
import type { OpticsPlan } from "./mechanics/optics";

export type Verb = "melt" | "freeze" | "warm" | "fill" | "spin";
export type Theme =
  | "kitchen"
  | "cave"
  | "garden"
  | "cosmos"
  | "town"
  | "laundry"
  | "reef"
  | "circus"
  | "borough"
  | "pudding";
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
  | "sun"
  | "ghost"
  | "sock"
  | "moth"
  | "washer"
  | "basket"
  | "coat"
  | "scarf"
  | "apron"
  | "worm"
  | "cape"
  | "trousers"
  | "receipt"
  | "crab"
  | "eel"
  | "octopus"
  | "snail"
  | "mailbox"
  | "shell"
  | "divingbell"
  | "parcel"
  | "anemone"
  | "bubble"
  | "ringmaster"
  | "giraffe"
  | "beetle"
  | "drum"
  | "circuswheel"
  | "circustable"
  | "clockhat"
  | "microphone"
  | "ticket"
  | "biscuit"
  | "spotlight"
  | "mousemayor"
  | "hedgehog"
  | "inspector"
  | "leafbug"
  | "stamp"
  | "pencil"
  | "paperclip"
  | "ruler"
  | "eraser"
  | "archive"
  | "townsign"
  | "puddle"
  | "pudding"
  | "biscuitcaptain"
  | "jellybean"
  | "whisk"
  | "layercake"
  | "eclair"
  | "dumpling"
  | "strawberry"
  | "pancake"
  | "recipe"
  | "wafer"
  | "spoon";
export interface PhaseStep {
  verb: "freeze" | "melt";
  name: string;
  signal?: string;
  requires?: string[];
  needsSignals?: string[];
}
export interface Target {
  id: string;
  name: string;
  verb: Verb;
  x: number;
  y: number;
  w: number;
  h: number;
  requires?: string[];
  needsSignals?: string[];
  /** Only explicitly authored targets may reverse a completed construction. */
  phase?: { steps: PhaseStep[] };
  temp?: [number, number];
  pressure?: [number, number];
  effort?: number;
  flowOnly?: boolean;
  motion?: { rx: number; ry: number; period: number; phase?: number };
  /** Seconds per beat, seconds accepting water, and a seconds offset. */
  pulse?: { period: number; open: number; phase?: number };
}
export interface Prop {
  kind: PropKind;
  x: number;
  y: number;
  scale?: number;
  target?: string;
  tint?: string;
  follow?: string;
  reveal?: { x: number; y: number; kind?: PropKind; scale?: number };
  revealOnly?: boolean;
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
  pack?: string;
  stamp?: string;
  balance?: BalancePlan;
  optics?: OpticsPlan;
  channels?: {
    inlet: { x: number; y: number; w: number; h: number };
    junction: [number, number];
    branches: {
      target: string;
      gate?: string;
      overflowFrom?: string;
      via?: [number, number][];
    }[];
  };
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
