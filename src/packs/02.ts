import type { Level, Target, Prop, PropKind, Verb } from "../types";
import designs from "../../docs/campaign/02-06.json";

const t = (
  id: string,
  name: string,
  verb: Verb,
  x: number,
  y: number,
  w = 100,
  h = 60,
  extra: Partial<Target> = {},
): Target => ({ id, name, verb, x, y, w, h, ...extra });
const warm = (
  id: string,
  name: string,
  x: number,
  y: number,
  temp: [number, number],
  pressure: [number, number],
  requires: string[] = [],
  extra: Partial<Target> = {},
) => t(id, name, "warm", x, y, 100, 60, { temp, pressure, requires, ...extra });
const p = (
  kind: PropKind,
  x: number,
  y: number,
  target?: string,
  extra: Partial<Prop> = {},
): Prop => ({ kind, x, y, target, scale: 0.8, ...extra });
const cast = (i: number): Prop[] => [
  p("ghost", 810, 290, undefined, { scale: 1, reveal: { x: 765, y: 370 } }),
  p("sock", 175, 458, undefined, { reveal: { x: 310 + (i % 3) * 40, y: 457 } }),
  p("moth", 775, 165, undefined, { scale: 0.6, reveal: { x: 645, y: 200 } }),
];
const recipes: {
  targets: Target[];
  props: Prop[];
  stamp: string;
  extra?: Partial<Level>;
}[] = [
  {
    targets: [
      t("counter", "Clear Pearl's counter", "melt", 345, 265, 170, 70),
      warm(
        "welcome",
        "A gentle welcome",
        555,
        375,
        [20, 35],
        [15, 30],
        ["counter"],
      ),
    ],
    props: [
      p("receipt", 430, 320, "counter", { reveal: { x: 405, y: 235 } }),
      p("basket", 175, 480),
    ],
    stamp: "EXISTS, PROBABLY",
    extra: { temp: 50, pressure: 50 },
  },
  {
    targets: [
      t("step", "Build Lefty's step", "freeze", 320, 420, 220, 45),
      t("name", "Read the client's nameplate", "melt", 480, 220, 110, 60, {
        requires: ["step"],
      }),
    ],
    props: [
      p("sock", 540, 330, "name", {
        tint: "#b1d1ab",
        reveal: { x: 430, y: 425 },
      }),
      p("receipt", 535, 270, "name"),
    ],
    stamp: "LEFT FEET. RIGHT FRIENDS.",
  },
  {
    targets: [
      t("tag", "Read the bath instructions", "melt", 420, 270, 110, 60),
      t("cup", "Fill Pip's tiny cup", "fill", 275, 220, 65, 65, {
        requires: ["tag"],
      }),
      t("tray", "Fill the mitten-family tray", "fill", 530, 395, 210, 70, {
        requires: ["tag"],
      }),
    ],
    props: [
      p("cup", 308, 300, "cup", { scale: 0.6 }),
      p("basket", 635, 465, "tray", { scale: 1.2 }),
      p("sock", 635, 430, "tray", { revealOnly: true, tint: "#eda59b" }),
    ],
    stamp: "BATH PARTY: EVERYBODY FITS",
  },
  {
    targets: [
      t("wheel", "Start the applause cycle", "spin", 315, 325, 70, 60),
      warm(
        "sheet",
        "Reassure the shy sheet",
        470,
        330,
        [25, 40],
        [15, 30],
        ["wheel"],
      ),
    ],
    props: [
      p("washer", 350, 410, "wheel", { scale: 1.5 }),
      p("ghost", 520, 365, "sheet", { scale: 0.7, reveal: { x: 550, y: 285 } }),
    ],
    stamp: "ENCORE! (GENTLE CYCLE)",
  },
  {
    targets: [
      t(
        "upper",
        "Carve an opening in the upper pane",
        "melt",
        370,
        230,
        185,
        55,
      ),
      t(
        "lower",
        "Clear Pip's lower inspection pane",
        "melt",
        385,
        365,
        155,
        65,
      ),
    ],
    props: [
      p("moth", 465, 413, undefined, {
        scale: 1.1,
        reveal: { x: 470, y: 305 },
      }),
      p("basket", 630, 450),
    ],
    stamp: "CASE FILE: AN ENTIRE COUSIN",
  },
  {
    targets: [
      t("low", "Sculpt the low stand", "freeze", 250, 430, 100, 40),
      t("mid", "Sculpt the middle stand", "freeze", 390, 355, 100, 40),
      t("high", "Sculpt the high stand", "freeze", 530, 280, 100, 40),
      t("tag", "Release the claim tag", "melt", 680, 400, 75, 65, {
        requires: ["low", "mid", "high"],
      }),
    ],
    props: [
      p("coat", 430, 260, undefined, {
        scale: 1.2,
        reveal: { x: 440, y: 350 },
      }),
      p("receipt", 716, 450, "tag", { scale: 0.65 }),
    ],
    stamp: "A HAT, BY EXECUTIVE DECISION",
  },
  {
    targets: [
      warm("silk", "Silk: whisper-soft warmth", 255, 280, [15, 25], [10, 25]),
      warm("mitt", "Oven mitt: a bolder press", 610, 280, [40, 55], [35, 50]),
      t("rinse", "One last rinse", "fill", 430, 425, 120, 60, {
        requires: ["silk", "mitt"],
      }),
    ],
    props: [
      p("scarf", 305, 310, "silk", { tint: "#e7d9f8" }),
      p("sock", 660, 317, "mitt", { tint: "#e7a15e", scale: 1.1 }),
      p("cup", 490, 485, "rinse", { scale: 1 }),
    ],
    stamp: "TOAST, BUT MAKE IT FASHION",
  },
  {
    targets: [
      t("left", "Read tenant one's lease", "melt", 260, 240),
      t("right", "Read tenant two's lease", "melt", 600, 240),
      t("shelf", "Build the new shelf", "freeze", 315, 430, 160, 40, {
        requires: ["left"],
      }),
      t("tea", "Tea for tenant two", "fill", 545, 395, 110, 65, {
        requires: ["right"],
      }),
    ],
    props: [
      p("scarf", 440, 330, undefined, {
        scale: 1.2,
        reveal: { x: 470, y: 400, scale: 1.7 },
      }),
      p("basket", 250, 460),
      p("cup", 600, 465, "tea"),
    ],
    stamp: "RENT PAID IN COMPLIMENTS",
  },
  {
    targets: [
      t("left", "Thaw the first apron swatch", "melt", 270, 235, 120, 65),
      t("right", "Thaw the second apron swatch", "melt", 445, 235, 120, 65),
      t("wash", "Wash away yesterday's soup", "fill", 300, 425, 180, 60, {
        requires: ["left", "right"],
      }),
      warm(
        "oracle",
        "Warm the soup-testing pad",
        620,
        330,
        [30, 45],
        [15, 30],
        ["wash"],
      ),
    ],
    props: [
      p("apron", 420, 350, undefined, { scale: 1.3 }),
      p("cup", 390, 485, "wash", { scale: 1.5 }),
    ],
    stamp: "TOMORROW'S FORECAST: SOUP",
  },
  {
    targets: [
      t("label", "Defrost the soil label", "melt", 270, 215, 130, 55),
      t("basin", "Wash the formalwear", "fill", 240, 365, 210, 65, {
        requires: ["label"],
      }),
      t("rack1", "Drying rack: jacket one", "freeze", 510, 425, 55, 50, {
        requires: ["basin"],
      }),
      t("rack2", "Drying rack: jacket two", "freeze", 610, 360, 55, 50, {
        requires: ["basin"],
      }),
      t("rack3", "Drying rack: jacket three", "freeze", 710, 280, 55, 50, {
        requires: ["basin"],
      }),
    ],
    props: [
      p("worm", 360, 470, undefined, { scale: 1.1 }),
      ...[535, 635, 735].map((x, i) =>
        p("coat", x, [423, 358, 278][i], `rack${i + 1}`, {
          scale: 0.45,
          revealOnly: true,
        }),
      ),
    ],
    stamp: "COMPOST DRESS CODE: FORMAL",
  },
  {
    targets: [
      t("tile1", "Thaw the high inspection tile", "melt", 270, 215, 115, 65),
      t("tile2", "Thaw the staggered tile", "melt", 555, 290, 115, 65),
      warm(
        "cape",
        "Cape care: a gentle day shift",
        415,
        365,
        [20, 30],
        [10, 20],
        ["tile1", "tile2"],
      ),
      t("dryer", "Dry the cape with a strong jet", "spin", 650, 425, 65, 65, {
        requires: ["cape"],
      }),
    ],
    props: [
      p("cape", 470, 405, "cape", { scale: 1.2, reveal: { x: 525, y: 345 } }),
      p("washer", 685, 465, "dryer"),
    ],
    stamp: "PIP'S CAPE APPLICATION: ACCEPTED",
  },
  {
    targets: [
      t("monday", "Unfreeze Monday", "melt", 250, 245, 110, 80),
      warm("tuesday", "Warm Tuesday", 435, 330, [25, 35], [20, 35], ["monday"]),
      t("wednesday", "Box up Wednesday", "freeze", 625, 415, 110, 55, {
        requires: ["tuesday"],
      }),
    ],
    props: [
      p("trousers", 465, 300, undefined, {
        scale: 1.3,
        reveal: { x: 465, y: 390 },
      }),
      p("ufo", 705, 200, undefined, { scale: 0.7 }),
    ],
    stamp: "KEEP A SPARE THURSDAY",
  },
  {
    targets: [
      t("list", "Defrost the guest list", "melt", 420, 210, 125, 60),
      t("badge", "Make an odd-enough badge", "freeze", 275, 415, 105, 55, {
        requires: ["list"],
      }),
      t("tea", "Pour the welcome tea", "fill", 600, 410, 120, 65, {
        requires: ["list"],
      }),
      warm(
        "stamp",
        "Warm Pearl's admission stamp",
        440,
        330,
        [20, 35],
        [15, 25],
        ["badge", "tea"],
      ),
    ],
    props: [
      p("receipt", 480, 255, "list"),
      p("sock", 315, 390, "badge", { tint: "#c1b4e6" }),
      p("cup", 660, 480, "tea"),
    ],
    stamp: "ODD ENOUGH. COME ON IN.",
  },
  {
    targets: [
      t("leftPlug", "Open the left river branch", "melt", 320, 315, 80, 50),
      t(
        "leftTub",
        "Fill the left tub through its channel",
        "fill",
        230,
        430,
        150,
        60,
        { flowOnly: true, requires: ["leftPlug"] },
      ),
      t("rightPlug", "Open the right river branch", "melt", 590, 315, 80, 50, {
        requires: ["leftTub"],
      }),
      t(
        "rightTub",
        "Fill the right tub through its channel",
        "fill",
        600,
        430,
        150,
        60,
        { flowOnly: true, requires: ["rightPlug"] },
      ),
    ],
    props: [
      p("cup", 305, 495, "leftTub", { scale: 1.2 }),
      p("cup", 675, 495, "rightTub", { scale: 1.2 }),
      p("duck", 670, 445, "rightTub", { scale: 0.5, revealOnly: true }),
    ],
    stamp: "GRAND CRUISE. TINY BATHTUB.",
    extra: {
      par: 110,
      channels: {
        inlet: { x: 445, y: 205, w: 80, h: 40 },
        junction: [485, 285],
        branches: [
          { target: "leftTub", gate: "leftPlug", via: [[360, 340]] },
          { target: "rightTub", gate: "rightPlug", via: [[630, 340]] },
        ],
      },
    },
  },
  {
    targets: [
      t("stage", "Build a stage for sleeves", "freeze", 235, 435, 185, 45),
      t("pane1", "Clear the first stage window", "melt", 470, 210, 50, 110),
      t("pane2", "Clear the second stage window", "melt", 570, 235, 50, 110),
      t("pane3", "Clear the third stage window", "melt", 670, 210, 50, 110),
      t("applause", "Start the applause", "spin", 560, 415, 75, 65, {
        requires: ["stage", "pane1", "pane2", "pane3"],
      }),
    ],
    props: [
      p("coat", 335, 410, "stage", { scale: 1.1, revealOnly: true }),
      p("washer", 598, 470, "applause", { scale: 1.1 }),
    ],
    stamp: "NO HANDS. STANDING OVATION.",
  },
  {
    targets: [
      warm("wool", "Follow the wool cuff", 370, 310, [20, 30], [10, 25], [], {
        motion: { rx: 150, ry: 85, period: 24, phase: Math.PI },
      }),
      warm(
        "cotton",
        "Follow the cotton cuff",
        370,
        310,
        [35, 45],
        [25, 40],
        ["wool"],
        { motion: { rx: 150, ry: 85, period: 24 } },
      ),
    ],
    props: [
      p("sock", 0, 0, "wool", { follow: "wool", tint: "#dcc6ed" }),
      p("sock", 0, 0, "cotton", { follow: "cotton", tint: "#a5d7c5" }),
    ],
    stamp: "HONORARY SOCKS, BOTH OF YOU",
    extra: { par: 110, temp: 25, pressure: 18 },
  },
  {
    targets: [
      t("bio1", "Read the bath mat's biography", "melt", 260, 205, 120, 60),
      t("bio2", "Read the bow tie's biography", "melt", 605, 205, 120, 60),
      warm(
        "mat",
        "Gently press the bath mat",
        270,
        350,
        [15, 25],
        [10, 25],
        ["bio1"],
      ),
      warm(
        "tie",
        "Warm the adventurous bow tie",
        615,
        350,
        [40, 50],
        [30, 45],
        ["bio2"],
      ),
      t("plinth", "Build their portrait plinth", "freeze", 430, 445, 120, 45, {
        requires: ["bio1", "bio2", "mat", "tie"],
      }),
    ],
    props: [
      p("scarf", 320, 382, "mat", {
        reveal: { x: 465, y: 438 },
        tint: "#b3c793",
      }),
      p("coat", 665, 388, "tie", { scale: 0.65, reveal: { x: 530, y: 432 } }),
    ],
    stamp: "SHARED INTEREST: PUDDLES",
  },
  {
    targets: [
      t("wash", "Wash the garden cloak", "fill", 235, 365, 120, 70),
      t(
        "display",
        "Build the cave scarf's display",
        "freeze",
        430,
        445,
        130,
        40,
      ),
      t(
        "luggage",
        "Thaw the cosmic towel's luggage",
        "melt",
        645,
        275,
        115,
        100,
      ),
      warm(
        "welcome",
        "Make the neighbors welcome",
        435,
        275,
        [25, 40],
        [15, 30],
        ["wash", "display", "luggage"],
      ),
    ],
    props: [
      p("cape", 290, 365, "wash", { tint: "#a6b783" }),
      p("scarf", 495, 430, "display", { tint: "#b3bedc" }),
      p("trousers", 700, 365, "luggage", { tint: "#9188c7" }),
    ],
    stamp: "FREE EMOTIONAL DRYING",
  },
  {
    targets: [
      t("drawer", "Open Lefty's last drawer", "melt", 225, 350, 190, 70),
      t("upper", "Open a hole in the upper pane", "melt", 535, 205, 125, 50),
      t("lower", "Clear the lower portrait pane", "melt", 550, 330, 95, 60),
      t("stand", "Build a portrait stand", "freeze", 440, 445, 100, 40, {
        requires: ["drawer", "upper", "lower"],
      }),
      t("light", "Light the partners' portrait", "spin", 695, 415, 65, 65, {
        requires: ["stand"],
      }),
    ],
    props: [
      p("basket", 320, 425, "drawer", { scale: 1.3 }),
      p("letter", 320, 395, "drawer", { reveal: { x: 380, y: 280 } }),
      p("receipt", 595, 375),
    ],
    stamp: "CASE CLOSED. SHOP OPEN.",
  },
  {
    targets: [
      t("welcome", "Pour a welcome for everyone", "fill", 240, 370, 110, 70),
      t(
        "plinth",
        "Build the matching-board plinth",
        "freeze",
        415,
        450,
        130,
        40,
      ),
      t("board", "Thaw the matching board", "melt", 380, 205, 175, 100, {
        requires: ["welcome", "plinth"],
      }),
      warm(
        "care",
        "A little care, for all sorts",
        600,
        305,
        [25, 35],
        [15, 30],
        ["board"],
      ),
      t("cheer", "Give the new partners an ovation", "spin", 680, 425, 65, 65, {
        requires: ["care"],
      }),
    ],
    props: [
      p("receipt", 465, 270, "board", { scale: 1.5 }),
      p("cup", 295, 450, "welcome"),
      p("sock", 510, 470, undefined, { revealOnly: true, tint: "#a1d7c8" }),
      p("cape", 590, 465, undefined, { revealOnly: true }),
      p("coat", 680, 470, undefined, { revealOnly: true }),
      p("moth", 640, 225, undefined, { revealOnly: true, scale: 0.7 }),
    ],
    stamp: "NOBODY LEAVES UNPAIRED",
    extra: { par: 140 },
  },
];

export const sockLevels: Level[] = recipes.map((recipe, i) => {
  const card = designs.packs[0].scenes[i];
  return {
    id: card.id,
    pack: "02",
    name: card.title,
    chapter: "The Midnight Sock Exchange",
    theme: "laundry",
    pitch: card.setup,
    hint: card.puzzle.replace(/With (FLOW|MOTION)( enabled)?, /g, ""),
    ending: card.payoff,
    start: [450, 140],
    temp: 65,
    pressure: 45,
    par: 45 + recipe.targets.length * 22,
    targets: recipe.targets,
    props: [...cast(i), ...recipe.props],
    stamp: recipe.stamp,
    ...recipe.extra,
  };
});
