import type { Level, Target, Prop, PropKind, Verb } from "../types";
import designs from "../../docs/campaign/07-11.json" with { type: "json" };

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
) => t(id, name, "warm", x, y, 105, 60, { temp, pressure, requires, ...extra });
const p = (
  kind: PropKind,
  x: number,
  y: number,
  target?: string,
  extra: Partial<Prop> = {},
): Prop => ({ kind, x, y, target, scale: 0.75, ...extra });
const cast = (): Prop[] => [
  p("cindermayor", 135, 310, undefined, { scale: 0.65 }),
  p("flintclerk", 835, 275, undefined, { scale: 0.75 }),
];
const recipes: {
  targets: Target[];
  props: Prop[];
  stamp: string;
  cast?: Prop[];
  extra?: Partial<Level>;
}[] = [
  {
    targets: [
      t("bell", "Thaw the help bell", "melt", 275, 405, 115, 65),
      warm("desk", "Warm Flint's desk", 605, 240, [35, 45], [20, 40], ["bell"]),
    ],
    cast: [
      p("cindermayor", 135, 310, undefined, { scale: 0.65 }),
      p("flintclerk", 835, 275, "desk", {
        scale: 0.7,
        reveal: { x: 655, y: 360, scale: 0.8 },
      }),
    ],
    props: [
      p("circustable", 480, 495, undefined, { scale: 1.8 }),
      p("helpbell", 332, 458, "bell", { scale: 0.65 }),
      p("servicewindow", 660, 375, "desk", { scale: 1.15 }),
      p("receipt", 665, 450, "desk", { scale: 1.3 }),
      p("townsign", 465, 270, undefined, { scale: 0.7 }),
    ],
    stamp: "PLEASE RING. ROARING IS ALSO A QUESTION.",
    extra: { start: [332, 345], par: 95 },
  },
  {
    targets: [
      t("firstDrop", "Fill drop form A", "fill", 245, 385, 130, 65),
      t("secondDrop", "Fill drop form B", "fill", 640, 385, 130, 65),
      warm(
        "permit",
        "Stamp one legal puddle",
        450,
        245,
        [40, 50],
        [25, 45],
        ["firstDrop", "secondDrop"],
      ),
    ],
    props: [
      p("stamp", 502, 300, "permit", { scale: 0.8 }),
      p("receipt", 310, 483, "firstDrop", { scale: 0.7 }),
      p("receipt", 705, 483, "secondDrop", { scale: 0.7 }),
      p("puddle", 485, 470, "permit", { scale: 1.2 }),
      p("duckdragon", 495, 455, "permit", { scale: 0.7 }),
    ],
    stamp: "APPROVED DEPTH: ONE DUCK.",
    extra: { start: [310, 325], temp: 20, par: 120 },
  },
  {
    targets: [
      t("broad", "Build the broad landing", "freeze", 235, 430, 220, 45),
      t("tall", "Build the tall landing", "freeze", 625, 345, 80, 130),
      warm(
        "desk",
        "Warm the ramp desk",
        245,
        245,
        [35, 45],
        [20, 40],
        ["broad"],
      ),
      t("chairPlaque", "Thaw the chair plaque", "melt", 745, 350, 85, 65, {
        requires: ["tall"],
      }),
    ],
    props: [
      p("servicewindow", 298, 347, "desk", { scale: 0.8 }),
      p("badge", 787, 402, "chairPlaque", { scale: 0.55 }),
      p("dragon", 480, 385, undefined, {
        scale: 1.15,
        reveal: { x: 480, y: 420, scale: 1.15 },
      }),
      p("dragonchair", 540, 470, undefined, { scale: 0.36, revealOnly: true }),
    ],
    stamp: "LARGE CONCERN. VERY SMALL CHAIR.",
    extra: { start: [340, 370], temp: -20, par: 145 },
  },
  {
    targets: [
      t("number", "Thaw the queue number", "melt", 255, 400, 120, 65),
      t("queue", "Turn the ticket machine", "spin", 665, 230, 85, 80, {
        requires: ["number"],
      }),
    ],
    props: [
      p("badge", 315, 457, "number", { scale: 0.8 }),
      p("queueroll", 490, 375, "queue", {
        scale: 1.1,
        reveal: { x: 490, y: 365, scale: 1.45 },
      }),
      p("dragon", 625, 490, "queue", { scale: 0.65, tint: "#cd9fe4" }),
      p("dragon", 750, 490, "queue", { scale: 0.4, tint: "#b7de9e" }),
      p("dragon", 820, 485, "queue", { scale: 0.25, tint: "#efbc72" }),
    ],
    stamp: "NOW SERVING: THE ENTIRE NUMBER ONE.",
    extra: { start: [315, 340], par: 100 },
  },
  {
    targets: [
      t("leftBasin", "Fill the left fountain", "fill", 245, 420, 135, 65),
      t("hours", "Thaw the office hours", "melt", 750, 365, 90, 65),
      t("fountain", "Twirl the moustache", "spin", 450, 215, 85, 80, {
        requires: ["leftBasin"],
      }),
      t("rightBasin", "Fill the right fountain", "fill", 580, 420, 135, 65, {
        requires: ["hours"],
      }),
    ],
    props: [
      p("moustachefountain", 485, 423, undefined, { scale: 1.1 }),
      p("townsign", 795, 428, "hours", { scale: 0.65 }),
      p("receipt", 820, 480, undefined, { scale: 0.7, revealOnly: true }),
    ],
    stamp: "BACK, WITH MOUSTACHE.",
    extra: { start: [312, 360], temp: 20, par: 150 },
  },
  {
    targets: [
      t("nest", "Build the cool nest", "freeze", 235, 415, 145, 55),
      t("visitor", "Thaw the visitor badge", "melt", 635, 390, 110, 70),
      warm(
        "nestStamp",
        "Approve the cool nest",
        245,
        235,
        [25, 35],
        [20, 35],
        ["nest"],
      ),
      warm(
        "guestStamp",
        "Approve the sunny visit",
        630,
        230,
        [50, 60],
        [35, 50],
        ["visitor"],
      ),
    ],
    props: [
      p("nest", 307, 443, "nest", { scale: 0.85, revealOnly: true }),
      p("badge", 690, 448, "visitor", { scale: 0.65 }),
      p("stamp", 297, 285, "nestStamp", { scale: 0.7 }),
      p("stamp", 682, 280, "guestStamp", { scale: 0.7, tint: "#f8b56b" }),
      p("frostarchivist", 445, 450, "nestStamp", { scale: 0.65 }),
      p("dragon", 550, 455, "guestStamp", { scale: 0.6, tint: "#edb875" }),
    ],
    stamp: "TWO HOMES. ZERO WEATHER AGREEMENTS.",
    extra: { start: [307, 355], temp: -20, par: 150 },
  },
  {
    targets: [
      warm("flintTea", "Flint's thimble tea", 240, 210, [30, 40], [20, 35]),
      warm("cinderTea", "Cinder's bucket tea", 455, 315, [55, 65], [40, 55]),
      warm(
        "frostTea",
        "The archivist's iced tea",
        675,
        425,
        [15, 25],
        [15, 30],
      ),
    ],
    props: [
      p("cup", 292, 265, "flintTea", { scale: 0.45 }),
      p("cup", 507, 367, "cinderTea", { scale: 1.05 }),
      p("cup", 727, 477, "frostTea", { scale: 0.7, tint: "#bce9f6" }),
      p("frostarchivist", 600, 475, "frostTea", { scale: 0.7 }),
      p("leafbowl", 345, 450, undefined, { scale: 1.1, revealOnly: true }),
      p("biscuit", 345, 437, undefined, { scale: 0.22, revealOnly: true }),
    ],
    stamp: "OFFICIAL TEA. UNOFFICIALLY THREE TEAS.",
    extra: { start: [292, 150], temp: 35, pressure: 27, par: 125 },
  },
  {
    targets: [
      t("speech", "Thaw the short speech", "melt", 425, 200, 130, 65),
      t("widePodium", "Build the wide podium", "freeze", 245, 435, 195, 45, {
        requires: ["speech"],
      }),
      t("tallPodium", "Build the tall podium", "freeze", 610, 390, 75, 90, {
        requires: ["speech"],
      }),
      warm(
        "trumpet",
        "Warm the tiny trumpet",
        740,
        365,
        [35, 45],
        [20, 35],
        ["widePodium", "tallPodium"],
      ),
    ],
    cast: [
      p("cindermayor", 135, 310, undefined, { scale: 0.65 }),
      p("flintclerk", 835, 275, "trumpet", {
        scale: 0.7,
        reveal: { x: 647, y: 390, scale: 0.75 },
      }),
    ],
    props: [
      p("letter", 490, 254, "speech", { scale: 0.85 }),
      p("brasshorn", 792, 415, "trumpet", { scale: 0.42 }),
      p("receipt", 195, 365, undefined, { scale: 0.8, revealOnly: true }),
    ],
    stamp: "WELCOME. SPEECH COMPLETE.",
    extra: { start: [490, 140], par: 155 },
  },
  {
    targets: [
      t("oldAddress", "Thaw the oldest address", "melt", 265, 210, 120, 65),
      t("olderAddress", "Thaw the older address", "melt", 625, 325, 125, 70),
      warm(
        "reading",
        "Warm the reading lamp",
        445,
        430,
        [30, 40],
        [20, 35],
        ["oldAddress", "olderAddress"],
      ),
    ],
    props: [
      p("archive", 490, 360, undefined, { scale: 1.1 }),
      p("fossilblock", 325, 275, "oldAddress", { scale: 0.7 }),
      p("fossilblock", 687, 390, "olderAddress", { scale: 0.7 }),
      p("spotlight", 497, 480, "reading", { scale: 0.65 }),
      p("featherduster", 820, 490, undefined, { scale: 1.15 }),
      p("dragonrug", 440, 505, undefined, { scale: 1.35, revealOnly: true }),
    ],
    stamp: "ANCIENT HISTORY. RECENTLY CARPETED.",
    extra: { start: [325, 150], par: 125 },
  },
  {
    targets: [
      t("soup", "Fill the community soup", "fill", 400, 430, 160, 65),
      warm(
        "adult",
        "Warm the grown-up soup",
        250,
        245,
        [50, 60],
        [35, 50],
        ["soup"],
      ),
      warm(
        "hatchling",
        "Warm the tiny soup",
        620,
        300,
        [30, 40],
        [20, 35],
        ["soup"],
      ),
    ],
    props: [
      p("servicewindow", 302, 365, "adult", { scale: 0.85 }),
      p("servicewindow", 672, 415, "hatchling", { scale: 0.8 }),
      p("leafbowl", 480, 490, "soup", { scale: 1.1 }),
      p("dragon", 240, 470, "adult", { scale: 0.7, tint: "#d9b082" }),
      p("dragon", 730, 470, "hatchling", { scale: 0.3, tint: "#efc790" }),
      p("cup", 830, 300, undefined, { scale: 0.35, revealOnly: true }),
      p("paperclip", 858, 278, undefined, { scale: 0.35, revealOnly: true }),
    ],
    stamp: "SOUP SIZE: A PERSONAL MATTER.",
    extra: { start: [480, 370], temp: 20, par: 125 },
  },
  {
    targets: [
      t("planter", "Fill the rooftop planter", "fill", 250, 405, 145, 65),
      t("shelter", "Build the bee shelter", "freeze", 625, 390, 130, 80),
      warm(
        "nectar",
        "Warm the welcome nectar",
        445,
        240,
        [30, 40],
        [20, 35],
        ["planter", "shelter"],
      ),
    ],
    props: [
      p("beedragon", 490, 430, "nectar", { scale: 0.8 }),
      p("flower", 322, 399, "planter", { scale: 0.95 }),
      p("leafbowl", 497, 295, "nectar", { scale: 0.7 }),
      p("flower", 725, 340, undefined, { scale: 0.8, revealOnly: true }),
      p("badge", 583, 465, undefined, { scale: 0.4, revealOnly: true }),
      p("dragon", 675, 338, undefined, {
        scale: 0.12,
        tint: "#edca67",
        revealOnly: true,
      }),
    ],
    stamp: "ENTRANCE REQUIREMENT: FIT THROUGH A SUNFLOWER.",
    extra: { start: [322, 345], temp: 20, par: 130 },
  },
  {
    targets: [
      t("seat", "Build the visitor seat", "freeze", 245, 425, 175, 50),
      t("chart", "Thaw the parking chart", "melt", 625, 405, 125, 70),
      t("telescope", "Turn the welcome telescope", "spin", 640, 215, 85, 80, {
        requires: ["seat", "chart"],
      }),
    ],
    props: [
      p("cometdragon", 485, 375, undefined, { scale: 1.05 }),
      p("letter", 687, 464, "chart", { scale: 0.8 }),
      p("spotlight", 682, 288, "telescope", { scale: 0.8 }),
      p("badge", 570, 343, undefined, { scale: 0.3, revealOnly: true }),
      p("ruler", 485, 488, undefined, { scale: 1.7, revealOnly: true }),
    ],
    stamp: "PARKING VALIDATED. TAIL SPACE EXTENDED.",
    extra: { start: [332, 365], temp: -20, par: 130 },
  },
  {
    targets: [
      t("forms", "Thaw the mountain of forms", "melt", 430, 205, 130, 75),
      t(
        "leftShelf",
        "Build the first help shelf",
        "freeze",
        245,
        435,
        145,
        45,
        { requires: ["forms"] },
      ),
      t(
        "rightShelf",
        "Build the other help shelf",
        "freeze",
        630,
        435,
        145,
        45,
        { requires: ["forms"] },
      ),
      warm(
        "leftStamp",
        "Warm the first help stamp",
        250,
        285,
        [35, 45],
        [20, 40],
        ["leftShelf"],
      ),
      warm(
        "rightStamp",
        "Warm the other help stamp",
        635,
        285,
        [35, 45],
        [20, 40],
        ["rightShelf"],
      ),
      warm(
        "tea",
        "Give Flint a tea break",
        440,
        425,
        [30, 40],
        [20, 35],
        ["leftStamp", "rightStamp"],
      ),
    ],
    props: [
      p("receipt", 495, 275, "forms", { scale: 1.15 }),
      p("stamp", 302, 337, "leftStamp", { scale: 0.7 }),
      p("stamp", 687, 337, "rightStamp", { scale: 0.7 }),
      p("cup", 492, 478, "tea", { scale: 0.55 }),
      p("dragon", 317, 429, undefined, {
        scale: 0.45,
        tint: "#aecea6",
        revealOnly: true,
      }),
      p("dragon", 702, 429, undefined, {
        scale: 0.45,
        tint: "#c8afe6",
        revealOnly: true,
      }),
      p("dragonchair", 835, 304, undefined, { scale: 0.45, revealOnly: true }),
    ],
    stamp: "HELP REQUEST: NO ATTACHMENTS REQUIRED.",
    extra: { start: [495, 145], par: 205 },
  },
  {
    targets: [
      t("instructions", "Thaw the speaking guide", "melt", 465, 350, 110, 65),
      t("vent", "Make a very large breeze", "spin", 255, 225, 115, 105, {
        requires: ["instructions"],
      }),
      warm(
        "horn",
        "Warm a very small voice",
        680,
        400,
        [25, 35],
        [15, 30],
        ["vent"],
      ),
    ],
    props: [
      p("circuswheel", 312, 307, "vent", { scale: 1.35 }),
      p("receipt", 520, 405, "instructions", { scale: 0.8 }),
      p("brasshorn", 715, 425, "horn", { scale: 1.4 }),
      p("pencil", 855, 305, undefined, { scale: 0.4, revealOnly: true }),
      p("letter", 800, 338, undefined, { scale: 0.55, revealOnly: true }),
    ],
    stamp: "SUGGESTION ONE: LESS HORN.",
    extra: { start: [520, 290], par: 135 },
  },
  {
    targets: [
      t("plug", "Close the paperwork drain", "freeze", 310, 270, 100, 45),
      t("source", "Fill the rooftop source", "fill", 440, 175, 120, 65, {
        requires: ["plug"],
      }),
      t("reservoir", "Overflow to the garden", "fill", 685, 410, 145, 70, {
        requires: ["source"],
        flowOnly: true,
      }),
    ],
    props: [
      p("stamp", 345, 455, undefined, { scale: 0.65, revealOnly: true }),
      p("flower", 750, 404, "reservoir", { scale: 1.0 }),
      p("flower", 845, 405, undefined, { scale: 0.65, revealOnly: true }),
      p("beedragon", 570, 465, "reservoir", { scale: 0.6 }),
    ],
    stamp: "SUCCESSFULLY NOT A POND.",
    extra: {
      start: [360, 210],
      temp: -20,
      par: 155,
      channels: {
        inlet: { x: 470, y: 200, w: 60, h: 35 },
        junction: [500, 275],
        branches: [
          {
            outlet: [270, 420],
            closedBy: "plug",
            overflowFrom: "source",
            via: [
              [360, 285],
              [270, 340],
            ],
          },
          {
            target: "reservoir",
            overflowFrom: "source",
            via: [
              [700, 285],
              [755, 365],
            ],
          },
        ],
      },
    },
  },
  {
    targets: [
      t("frostSeat", "Build the frost seat", "freeze", 245, 435, 120, 45),
      t("flintSeat", "Build Flint's seat", "freeze", 445, 390, 120, 45),
      t("cinderSeat", "Build Cinder's equal seat", "freeze", 655, 435, 120, 45),
      warm(
        "frostVoice",
        "Welcome the frost voice",
        250,
        265,
        [20, 30],
        [15, 30],
        ["frostSeat"],
      ),
      warm(
        "flintVoice",
        "Welcome the tiny voice",
        450,
        215,
        [30, 40],
        [20, 35],
        ["flintSeat"],
      ),
      warm(
        "cinderVoice",
        "Welcome the mayor's voice",
        660,
        265,
        [50, 60],
        [35, 50],
        ["cinderSeat"],
      ),
    ],
    cast: [
      p("cindermayor", 135, 310, "cinderVoice", {
        scale: 0.65,
        reveal: { x: 715, y: 430, scale: 0.65 },
      }),
      p("flintclerk", 835, 275, "flintVoice", {
        scale: 0.75,
        reveal: { x: 505, y: 386, scale: 0.75 },
      }),
    ],
    props: [
      p("dragonchair", 305, 429, "frostSeat", { scale: 0.55 }),
      p("dragonchair", 505, 384, "flintSeat", { scale: 0.55 }),
      p("dragonchair", 715, 429, "cinderSeat", { scale: 0.55 }),
      p("brasshorn", 302, 318, "frostVoice", { scale: 0.38 }),
      p("brasshorn", 502, 268, "flintVoice", { scale: 0.38 }),
      p("brasshorn", 712, 318, "cinderVoice", { scale: 0.38 }),
      p("frostarchivist", 235, 400, "frostVoice", {
        scale: 0.55,
        reveal: { x: 305, y: 430, scale: 0.55 },
      }),
      p("councilclap", 820, 480, undefined, { scale: 0.65, revealOnly: true }),
    ],
    stamp: "EQUAL CHAIRS. UNEQUAL APPLAUSE FOR TINY SPEECHES.",
    extra: { start: [305, 375], temp: -20, par: 210 },
  },
  {
    targets: [
      warm(
        "transcription",
        "Warm the minute maker",
        250,
        205,
        [30, 40],
        [20, 35],
      ),
      t(
        "noticeBoard",
        "Build the friendly board",
        "freeze",
        435,
        320,
        120,
        100,
        { requires: ["transcription"] },
      ),
      t("notes", "Thaw the meeting notes", "melt", 675, 260, 110, 65, {
        requires: ["noticeBoard"],
      }),
      t("wash", "Fill the signature wash", "fill", 665, 435, 135, 65, {
        requires: ["notes"],
      }),
    ],
    props: [
      p("pencil", 302, 263, "transcription", { scale: 0.8 }),
      p("letter", 730, 316, "notes", { scale: 0.75 }),
      p("badge", 495, 295, undefined, { scale: 0.85, revealOnly: true }),
      p("dragon", 565, 475, "wash", { scale: 0.35, tint: "#eed08f" }),
      p("stamp", 395, 474, undefined, { scale: 0.65, revealOnly: true }),
      p("receipt", 485, 485, undefined, { scale: 0.85, revealOnly: true }),
    ],
    stamp: "SIGNED, SEALED, SLIGHTLY TOE-SHAPED.",
    extra: { start: [302, 145], temp: 35, pressure: 27, par: 160 },
  },
  {
    targets: [
      t("shutter", "Thaw the sunshine shutter", "melt", 220, 175, 55, 60),
      t("upperPrism", "Build the first prism", "freeze", 300, 130, 120, 160, {
        requires: ["shutter"],
      }),
      t("lowerPrism", "Build the second prism", "freeze", 560, 205, 120, 160, {
        requires: ["shutter"],
      }),
    ],
    cast: [
      p("cindermayor", 135, 350, undefined, {
        scale: 0.65,
        reveal: { x: 330, y: 490, scale: 0.65 },
      }),
      p("flintclerk", 835, 275, undefined, {
        scale: 0.75,
        reveal: { x: 645, y: 465, scale: 0.75 },
      }),
    ],
    props: [
      p("circustable", 535, 508, undefined, { scale: 1.65 }),
      p("catdragon", 740, 490, undefined, { scale: 0.75 }),
    ],
    stamp: "SUNSHINE BOOKED. CAT ALREADY PRESENT.",
    extra: {
      start: [247, 115],
      par: 145,
      optics: {
        source: { x: 160, y: 200, dx: 1, dy: 0 },
        mirrors: [],
        prisms: [
          {
            target: "upperPrism",
            vertices: [
              [300, 130],
              [300, 290],
              [420, 290],
            ],
            refractiveIndex: 1.31,
          },
          {
            target: "lowerPrism",
            vertices: [
              [560, 205],
              [560, 365],
              [680, 365],
            ],
            refractiveIndex: 1.31,
          },
        ],
        detectors: [
          {
            id: "sunshine",
            x: 820,
            y: 450.3042,
            radius: 12,
            label: [820, 527],
          },
        ],
      },
      needsSignals: ["sunshine"],
      completionHint: "Sunshine is finding its seat.",
    },
  },
  {
    targets: [
      t("thanks", "Thaw the citizen's letter", "melt", 420, 205, 135, 65),
      t("flowers", "Fill the thank-you flowers", "fill", 250, 425, 140, 65, {
        requires: ["thanks"],
      }),
      t("pedestal", "Build the thank-you stand", "freeze", 640, 420, 120, 70, {
        requires: ["thanks"],
      }),
      t("applause", "Start the gentle clapping", "spin", 760, 315, 85, 80, {
        requires: ["flowers", "pedestal"],
      }),
    ],
    props: [
      p("letter", 487, 262, "thanks", { scale: 0.85 }),
      p("flower", 320, 418, "flowers", { scale: 0.95 }),
      p("councilclap", 700, 415, "applause", { scale: 0.8 }),
      p("catdragon", 485, 475, "applause", { scale: 0.75 }),
      p("helpbell", 590, 475, "applause", { scale: 0.5 }),
    ],
    stamp: "THANK YOU, INCLUDING THE BELL.",
    extra: { start: [487, 145], par: 160 },
  },
  {
    targets: [
      t("welcome", "Thaw the welcome plaque", "melt", 420, 175, 135, 65),
      t("leftPost", "Build the first ribbon post", "freeze", 245, 440, 65, 65, {
        requires: ["welcome"],
      }),
      t(
        "rightPost",
        "Build the other ribbon post",
        "freeze",
        695,
        440,
        65,
        65,
        { requires: ["welcome"] },
      ),
      warm(
        "guestTea",
        "Warm tea for everybody",
        455,
        315,
        [30, 40],
        [20, 35],
        ["leftPost", "rightPost"],
      ),
      t("celebration", "Open the welcoming wings", "spin", 775, 180, 85, 80, {
        requires: ["guestTea"],
      }),
    ],
    cast: [],
    props: [
      p("wingdoor", 480, 470, "celebration", { scale: 1.1 }),
      p("ribbonpanorama", 480, 425, "celebration", { scale: 1.0 }),
      p("townsign", 487, 231, "welcome", { scale: 0.85 }),
      p("cup", 507, 370, "guestTea", { scale: 0.7 }),
      p("flower", 355, 495, undefined, { scale: 0.55, revealOnly: true }),
      p("flower", 630, 495, undefined, { scale: 0.55, revealOnly: true }),
    ],
    stamp: "ALL WINGS WELCOME. CAT COUNTS AS A PODIUM.",
    extra: { start: [487, 115], par: 185 },
  },
];

const dispatches = [
  "Flint's help bell is frozen. Please ring gently; his service window is eleven times his height.",
  "One duck has applied for one puddle. The paperwork needs two different sorts of wet.",
  "This visitor needs a roomy entrance. His actual question concerns a remarkably small chair.",
  "The queue machine insists this ticket needs the whole room. There is only one family waiting.",
  "The lobby fountain is on a break. Its moustache is, technically, a public employee.",
  "One nest needs a cool approval. One guest needs a warm welcome. Nobody has to share a thermostat.",
  "Three officials, three tea temperatures. Cinder has brought a bucket and called it a cup.",
  "Flint's welcome speech is extremely short. His podium has requested the opposite arrangement.",
  "These cave addresses predate carpets. Flint has brought a duster that barely fits through history.",
  "Soup service is open to every size of dragon. Flint is borrowing a ladle as a bowl.",
  "The bee dragon requests rooftop shade, nectar, and a visitor entrance exactly one sunflower wide.",
  "A comet has come to town hall. Please allow additional parking space for the rest of its tail.",
  "Flint's desk has disappeared beneath forms. The form for asking for help is thankfully on top.",
  "The suggestion horn needs a strong breeze and a soft voice. Its first suggestion concerns its size.",
  "The rooftop's left drain leads to paperwork. Please give the rain a more garden-shaped career.",
  "Every council chair is the same size. Flint suspects his opinion may still need a taller cushion.",
  "Meeting minutes should be easy to read. The hatchling has volunteered a very clear footprint.",
  "The municipal cat has booked one sunny bench. Two icy prisms can get the appointment back on time.",
  "A citizen has thanked the entire office. Even the bell has its own paragraph.",
  "One welcome plaque, two ribbon posts, and tea for everyone. The municipal cat has agreed to help Flint reach.",
];

const source = designs.packs.find((pack) => pack.id === "08")!;
export const townHallLevels: Level[] = recipes.map((recipe, index) => {
  const card = source.scenes[index];
  return {
    id: card.id,
    pack: "08",
    name: card.title,
    chapter: source.title,
    theme: "emberborough",
    pitch: dispatches[index],
    hint: card.puzzle,
    ending: card.payoff,
    start: [475, 145],
    temp: 40,
    pressure: 40,
    par: 60 + recipe.targets.length * 25,
    targets: recipe.targets,
    // Officials stand in front of the service window and council furniture.
    props: [...recipe.props, ...(recipe.cast ?? cast())],
    stamp: recipe.stamp,
    ...recipe.extra,
  };
});
