import type { Level, Target, Prop, PropKind, Verb } from "../types";
import designs from "../../docs/campaign/02-06.json" with { type: "json" };

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
): Prop => ({ kind, x, y, target, scale: 0.8, ...extra });
const cast = (i: number): Prop[] => [
  p("crab", 135, 310, undefined, { scale: 0.9, reveal: { x: 220, y: 455 } }),
  p("eel", 815, 275, undefined, { reveal: { x: 785, y: 375 } }),
  p("octopus", 850, 465, undefined, {
    scale: 0.7,
    reveal: { x: 670 + (i % 3) * 30, y: 463 },
  }),
];
const recipes: {
  targets: Target[];
  props: Prop[];
  stamp: string;
  extra?: Partial<Level>;
}[] = [
  {
    targets: [
      t("postage", "Fill the postage basin", "fill", 260, 370, 200, 75),
      t(
        "display",
        "Build the bubble's stamp stand",
        "freeze",
        585,
        255,
        125,
        45,
        {
          requires: ["postage"],
        },
      ),
    ],
    props: [
      p("cup", 360, 455, "postage", { scale: 1.25 }),
      p("bubble", 400, 270, undefined, {
        scale: 1.15,
        reveal: { x: 645, y: 220 },
      }),
      p("letter", 645, 245, "display", { scale: 0.45, revealOnly: true }),
    ],
    stamp: "THANK YOU FOR YESTERDAY'S BUBBLE",
    extra: { start: [350, 305], temp: 25, pressure: 35, par: 65 },
  },
  {
    targets: [
      t(
        "plinth",
        "Build the ground-floor mailbox plinth",
        "freeze",
        380,
        455,
        225,
        40,
      ),
      t("address", "Reveal the mailbox address", "melt", 330, 210, 135, 80, {
        requires: ["plinth"],
      }),
    ],
    props: [
      p("mailbox", 530, 365, undefined, {
        scale: 1.15,
        reveal: { x: 500, y: 440 },
      }),
      p("receipt", 397, 272, "address", { scale: 0.7 }),
    ],
    stamp: "GROUND FLOOR. ALL OCEAN ABOVE.",
    extra: { start: [485, 390], temp: -25, pressure: 35 },
  },
  {
    targets: [
      t(
        "instructions",
        "Unfreeze the stamp instructions",
        "melt",
        420,
        305,
        100,
        55,
      ),
      t("wide", "Moisten the public stamp tray", "fill", 200, 425, 200, 60, {
        requires: ["instructions"],
      }),
      t(
        "small",
        "Moisten Dot's meticulous little tray",
        "fill",
        645,
        230,
        70,
        60,
        {
          requires: ["instructions"],
        },
      ),
    ],
    props: [
      p("receipt", 470, 350, "instructions", { scale: 0.7 }),
      p("shell", 300, 480, "wide", { scale: 1.3 }),
      p("shell", 680, 280, "small", { scale: 0.65, tint: "#e9bfd0" }),
      ...[485, 545, 605].map((x) =>
        p("letter", x, 455, undefined, {
          scale: 0.55,
          revealOnly: true,
        }),
      ),
    ],
    stamp: "ENTHUSIASTICALLY PREPARED TO SEND NOTHING",
  },
  {
    targets: [
      t("sorter", "Start the air-mail sorter", "spin", 220, 360, 75, 65),
      warm(
        "envelope",
        "A gentle rest for the envelope",
        415,
        290,
        [25, 40],
        [15, 25],
        ["sorter"],
      ),
      t("stand", "Build the air-mail display", "freeze", 620, 425, 135, 45, {
        requires: ["envelope"],
      }),
    ],
    props: [
      p("parcel", 260, 438, "sorter"),
      p("letter", 467, 335, "envelope", { reveal: { x: 685, y: 365 } }),
      p("bubble", 685, 370, undefined, { scale: 1.15, revealOnly: true }),
      p("shell", 685, 290, undefined, { scale: 1.4, revealOnly: true }),
    ],
    stamp: "AIR MAIL. UMBRELLA INCLUDED.",
  },
  {
    targets: [
      t("upper", "Read the first sandbar address", "melt", 220, 210, 130, 55),
      t(
        "middle",
        "Open a channel through the middle address",
        "melt",
        390,
        285,
        150,
        60,
      ),
      t(
        "lower",
        "Find the address under the opening",
        "melt",
        450,
        375,
        145,
        65,
      ),
      t("tray", "Fill the sandbar sorting tray", "fill", 360, 470, 180, 50, {
        requires: ["upper", "middle", "lower"],
      }),
    ],
    props: [
      p("receipt", 285, 255, "upper", { scale: 0.6 }),
      p("receipt", 465, 335, "middle", { scale: 0.7 }),
      p("letter", 520, 425, "lower", {
        scale: 0.8,
        reveal: { x: 635, y: 300 },
      }),
      p("shell", 450, 510, "tray", { scale: 1.1 }),
    ],
    stamp: "EVERY SANDBAR HAS FIVE STARS",
  },
  {
    targets: [
      warm(
        "shell",
        "Porcelain shell: handle with compliments",
        265,
        260,
        [15, 25],
        [10, 20],
      ),
      warm(
        "bell",
        "Brass bell: a warmer compliment",
        600,
        310,
        [40, 55],
        [35, 50],
      ),
      t(
        "packing",
        "Build their shared packing block",
        "freeze",
        365,
        445,
        240,
        45,
        {
          requires: ["shell", "bell"],
        },
      ),
    ],
    props: [
      p("shell", 317, 305, "shell", {
        tint: "#f2d9e6",
        reveal: { x: 425, y: 438 },
      }),
      p("divingbell", 652, 355, "bell", {
        tint: "#d6ad62",
        scale: 1.05,
        reveal: { x: 555, y: 435 },
      }),
      p("parcel", 490, 430, undefined, { scale: 1.4, revealOnly: true }),
    ],
    stamp: "COMPLIMENTS ARRIVED UNSARCASMIZED",
    extra: { temp: 20, pressure: 15 },
  },
  {
    targets: [
      t("leftLabel", "Open the left sorting slot", "melt", 235, 205, 100, 45),
      t("rightLabel", "Open the right sorting slot", "melt", 620, 205, 100, 45),
      t(
        "middleLabel",
        "Open the lower sorting slot",
        "melt",
        425,
        340,
        100,
        45,
      ),
      t("leftTray", "Fill the left sorting tray", "fill", 220, 310, 130, 55, {
        requires: ["leftLabel"],
      }),
      t("rightTray", "Fill the right sorting tray", "fill", 605, 310, 130, 55, {
        requires: ["rightLabel"],
      }),
      t("middleTray", "Fill the low central tray", "fill", 410, 450, 130, 55, {
        requires: ["middleLabel"],
      }),
    ],
    props: [
      ...[210, 300, 390, 480, 570, 660, 750].map((x) =>
        p("mailbox", x, 180, undefined, { scale: 0.43 }),
      ),
      p("letter", 285, 350, "leftTray", { revealOnly: true }),
      p("letter", 670, 350, "rightTray", { revealOnly: true, tint: "#e3c389" }),
      p("parcel", 475, 490, "middleTray", { revealOnly: true }),
    ],
    stamp: "THREE MAIL SLOTS. FOUR SANDWICH SLOTS.",
  },
  {
    targets: [
      t(
        "leftSupport",
        "Build one side of Dot's envelope stand",
        "freeze",
        290,
        445,
        95,
        40,
      ),
      t(
        "rightSupport",
        "Build the other side of the envelope stand",
        "freeze",
        600,
        445,
        95,
        40,
      ),
      t(
        "postage",
        "Thaw the enormous postage panel",
        "melt",
        400,
        275,
        155,
        85,
        {
          requires: ["leftSupport", "rightSupport"],
        },
      ),
      t("stamp", "Stamp the oversize invitation", "spin", 670, 210, 65, 65, {
        requires: ["postage"],
      }),
    ],
    props: [
      p("letter", 480, 390, undefined, {
        scale: 2.1,
        reveal: { x: 480, y: 405, scale: 0.45 },
      }),
      p("parcel", 705, 285, "stamp", { scale: 0.75 }),
      p("heart", 520, 375, undefined, { scale: 0.45, revealOnly: true }),
    ],
    stamp: "EXTRA ROOM FOR A YES",
    extra: { start: [335, 385], temp: -30, pressure: 35 },
  },
  {
    targets: [
      t("recipe", "Read the registered soup recipe", "melt", 305, 205, 90, 135),
      t("soup", "Prepare the soup-service basin", "fill", 230, 415, 235, 60, {
        requires: ["recipe"],
      }),
      warm(
        "taste",
        "Soup thermometer: ready to send",
        620,
        330,
        [35, 45],
        [15, 30],
        ["soup"],
      ),
    ],
    props: [
      p("receipt", 350, 295, "recipe", { scale: 0.9 }),
      p("cup", 348, 480, "soup", { scale: 1.45 }),
      p("parcel", 670, 382, "taste", { reveal: { x: 650, y: 310 } }),
      p("letter", 720, 420, undefined, { scale: 0.5, revealOnly: true }),
    ],
    stamp: "CROUTONS SHIPPED UNDER SEPARATE COVER",
  },
  {
    targets: [
      t(
        "leftLabel",
        "Read the seed-preparation label",
        "melt",
        235,
        260,
        110,
        55,
      ),
      t(
        "rightLabel",
        "Read the planter's forwarding address",
        "melt",
        575,
        245,
        110,
        55,
      ),
      t("cup", "Fill the seed-preparation cup", "fill", 250, 400, 110, 70, {
        requires: ["leftLabel"],
      }),
      t(
        "stand",
        "Build the anemone's planter stand",
        "freeze",
        480,
        450,
        230,
        40,
        {
          requires: ["rightLabel"],
        },
      ),
      warm(
        "seeds",
        "Give the seeds a permanent welcome",
        430,
        340,
        [20, 30],
        [15, 25],
        ["cup", "stand"],
      ),
    ],
    props: [
      p("letter", 290, 305, "leftLabel", { scale: 0.65 }),
      p("receipt", 630, 292, "rightLabel", { scale: 0.6 }),
      p("cup", 305, 470, "cup"),
      p("anemone", 610, 408, undefined, {
        scale: 1.15,
        reveal: { x: 585, y: 442 },
      }),
      p("flower", 465, 390, "seeds", { scale: 0.6, revealOnly: true }),
    ],
    stamp: "FORWARD TO: EVERY PETAL",
  },
  {
    targets: [
      t(
        "upper",
        "Carve a listening hole in the upper pane",
        "melt",
        435,
        220,
        185,
        55,
      ),
      t("lower", "Clear the echo's lower pane", "melt", 460, 325, 135, 85),
      warm(
        "echo",
        "Warm the echo's care pad",
        255,
        410,
        [25, 35],
        [10, 25],
        ["upper", "lower"],
      ),
    ],
    props: [
      p("bubble", 527, 385, undefined, {
        scale: 1.2,
        reveal: { x: 480, y: 305 },
      }),
      p("shell", 527, 380, undefined, {
        scale: 0.6,
        reveal: { x: 480, y: 355 },
      }),
      p("letter", 305, 453, "echo", { scale: 0.65 }),
      p("bubble", 620, 255, undefined, { scale: 0.4, revealOnly: true }),
      p("bubble", 685, 210, undefined, { scale: 0.3, revealOnly: true }),
    ],
    stamp: "THANK YOU. THANK YOU. ONE BILL.",
  },
  {
    targets: [
      t("nearCode", "Reveal the nearby postal code", "melt", 245, 200, 90, 60),
      t(
        "farCode",
        "Reveal the far-flung postal code",
        "melt",
        615,
        315,
        100,
        60,
      ),
      t(
        "mapStand",
        "Build the constellation map stand",
        "freeze",
        390,
        455,
        220,
        40,
        {
          requires: ["nearCode", "farCode"],
        },
      ),
      t("route", "Stamp the interstellar route", "spin", 400, 270, 70, 65, {
        requires: ["mapStand"],
      }),
    ],
    props: [
      p("moon", 610, 205, undefined, { scale: 0.6 }),
      p("receipt", 290, 245, "nearCode", { scale: 0.65 }),
      p("receipt", 665, 360, "farCode", { scale: 0.65 }),
      p("letter", 500, 425, "mapStand", {
        scale: 1.35,
        reveal: { x: 490, y: 380 },
      }),
      p("bubble", 435, 305, "route", { scale: 0.7, revealOnly: true }),
    ],
    stamp: "UNIVERSE: RETURN ADDRESS MISSING",
  },
  {
    targets: [
      t("address", "Read Dot's repeated addressee", "melt", 280, 215, 110, 55),
      warm(
        "label",
        "Care for the corrected address",
        270,
        345,
        [20, 30],
        [15, 25],
        ["address"],
      ),
      t(
        "display",
        "Build the let-us-help display",
        "freeze",
        530,
        450,
        190,
        45,
        {
          requires: ["label"],
        },
      ),
    ],
    props: [
      p("receipt", 335, 260, "address", { scale: 0.65 }),
      p("letter", 322, 388, "label", { reveal: { x: 555, y: 350 } }),
      p("parcel", 625, 435, undefined, {
        scale: 1.2,
        reveal: { x: 620, y: 430, kind: "mailbox" },
      }),
      p("heart", 645, 330, undefined, { scale: 0.45, revealOnly: true }),
    ],
    stamp: "UNKNOWN ADDRESS? LET US HELP.",
  },
  {
    targets: [
      t(
        "farBasin",
        "Deliver water along the far channel",
        "fill",
        660,
        420,
        130,
        65,
        {
          flowOnly: true,
        },
      ),
      t(
        "nearPlug",
        "Open the shorter delivery branch",
        "melt",
        305,
        280,
        85,
        60,
        {
          requires: ["farBasin"],
        },
      ),
      t(
        "nearBasin",
        "Deliver water along the near channel",
        "fill",
        265,
        380,
        125,
        65,
        {
          flowOnly: true,
          requires: ["nearPlug"],
        },
      ),
    ],
    props: [
      p("shell", 725, 480, "farBasin", { scale: 1.15 }),
      p("shell", 327, 440, "nearBasin", { scale: 1.1 }),
      p("letter", 720, 405, "farBasin", { scale: 0.5, revealOnly: true }),
      p("letter", 327, 365, "nearBasin", { scale: 0.5, revealOnly: true }),
      p("bubble", 580, 185, undefined, { scale: 0.5 }),
    ],
    stamp: "EXPRESS DELIVERY: TWELVE WHOLE INCHES",
    extra: {
      start: [445, 125],
      temp: 35,
      pressure: 45,
      par: 90,
      channels: {
        inlet: { x: 400, y: 180, w: 95, h: 40 },
        junction: [447.5, 255],
        branches: [
          {
            target: "farBasin",
            via: [
              [625, 280],
              [735, 335],
            ],
          },
          { target: "nearBasin", gate: "nearPlug", via: [[345, 310]] },
        ],
      },
    },
  },
  {
    targets: [
      warm("stamp", "Prepare Dot's stamp desk", 445, 205, [15, 30], [10, 25]),
      t("packing", "Fill the packing basin", "fill", 240, 405, 150, 60),
      t("collection", "Open the collection tile", "melt", 620, 400, 130, 60),
      t(
        "noticeboard",
        "Build the coworkers' noticeboard base",
        "freeze",
        425,
        465,
        150,
        40,
        {
          requires: ["stamp", "packing", "collection"],
        },
      ),
    ],
    props: [
      p("shell", 497, 247, "stamp", { scale: 0.75 }),
      p("parcel", 315, 460, "packing"),
      p("mailbox", 685, 455, "collection", { scale: 0.9 }),
      p("letter", 500, 445, "noticeboard", { scale: 0.65, revealOnly: true }),
      ...[715, 755, 795, 835, 875].map((x) =>
        p("cup", x, 490, undefined, {
          scale: 0.25,
          revealOnly: true,
        }),
      ),
    ],
    stamp: "THREE DESKS. FIVE CUPS. EIGHT ARMS.",
  },
  {
    targets: [
      warm("snail", "Follow the snail", 420, 325, [20, 35], [15, 30], [], {
        w: 125,
        h: 65,
        motion: { rx: 185, ry: 55, period: 30, phase: Math.PI },
      }),
      t(
        "dispatch",
        "Award the express dispatch sash",
        "spin",
        265,
        455,
        70,
        60,
        {
          requires: ["snail"],
        },
      ),
    ],
    props: [
      p("snail", 0, 0, "snail", { follow: "snail", scale: 1.1 }),
      p("parcel", 305, 490, "dispatch", { scale: 0.75 }),
      p("receipt", 335, 390, undefined, { scale: 0.6, revealOnly: true }),
    ],
    stamp: "EXPRESS, EMOTIONALLY",
    extra: { start: [295, 235], temp: 27, pressure: 22, par: 100 },
  },
  {
    targets: [
      t(
        "gardenName",
        "Read the garden club's invitation",
        "melt",
        240,
        205,
        115,
        55,
      ),
      t(
        "caveName",
        "Read the cave resident's invitation",
        "melt",
        425,
        275,
        115,
        55,
      ),
      t(
        "starName",
        "Read the star traveler's invitation",
        "melt",
        635,
        195,
        115,
        55,
      ),
      warm(
        "gardenStamp",
        "Garden postage: a little spring",
        250,
        335,
        [20, 30],
        [15, 25],
        ["gardenName"],
        { w: 90 },
      ),
      warm(
        "caveStamp",
        "Cave postage: a cozy echo",
        438,
        410,
        [30, 40],
        [20, 35],
        ["caveName"],
        { w: 90 },
      ),
      warm(
        "starStamp",
        "Star postage: a brighter welcome",
        648,
        325,
        [40, 50],
        [35, 50],
        ["starName"],
        { w: 90 },
      ),
    ],
    props: [
      p("letter", 297, 250, "gardenName", { scale: 0.7 }),
      p("letter", 482, 320, "caveName", { scale: 0.7 }),
      p("letter", 692, 240, "starName", { scale: 0.7 }),
      p("flower", 295, 380, "gardenStamp", { scale: 0.5, revealOnly: true }),
      p("shell", 483, 455, "caveStamp", { scale: 0.5, revealOnly: true }),
      p("moon", 693, 370, "starStamp", { scale: 0.45, revealOnly: true }),
      p("letter", 580, 465, undefined, { scale: 0.6, revealOnly: true }),
    ],
    stamp: "FOURTH INVITATION: THE SQUAD",
  },
  {
    targets: [
      t("menu", "Unfreeze the picnic menu", "melt", 250, 220, 165, 75),
      t("serving", "Fill the picnic serving basin", "fill", 230, 415, 215, 65, {
        requires: ["menu"],
      }),
      t(
        "lowTable",
        "Build the low picnic table block",
        "freeze",
        540,
        440,
        80,
        40,
      ),
      t(
        "highTable",
        "Build the raised picnic table block",
        "freeze",
        660,
        355,
        80,
        40,
      ),
      t("lantern", "Light the picnic lantern", "spin", 580, 225, 65, 55, {
        requires: ["serving", "lowTable", "highTable"],
      }),
    ],
    props: [
      p("receipt", 332, 275, "menu", { scale: 0.9 }),
      p("shell", 338, 475, "serving", { scale: 1.3 }),
      p("parcel", 580, 430, "lowTable", { scale: 0.7 }),
      p("parcel", 700, 345, "highTable", { scale: 0.7 }),
      p("bubble", 612, 260, "lantern", { scale: 0.6, revealOnly: true }),
      ...[490, 525, 560, 595, 630, 665, 700, 735].map((x) =>
        p("shell", x, 505, undefined, {
          scale: 0.24,
          revealOnly: true,
        }),
      ),
    ],
    stamp: "EIGHT ARMS. EIGHT PLACE SETTINGS.",
  },
  {
    targets: [
      t(
        "envelope",
        "Uncover the letter with no destination",
        "melt",
        410,
        230,
        165,
        95,
      ),
      warm(
        "handwriting",
        "Warm the hesitant handwriting",
        235,
        350,
        [15, 25],
        [10, 25],
        ["envelope"],
      ),
      warm(
        "seal",
        "Care for the letter's seal",
        650,
        350,
        [35, 45],
        [30, 45],
        ["envelope"],
      ),
      t(
        "display",
        "Give the thank-you letter a place",
        "freeze",
        435,
        465,
        115,
        40,
        {
          requires: ["handwriting", "seal"],
        },
      ),
    ],
    props: [
      p("letter", 492, 305, "envelope", {
        scale: 1.25,
        reveal: { x: 492, y: 437 },
      }),
      p("receipt", 287, 395, "handwriting", { scale: 0.6 }),
      p("shell", 702, 395, "seal", { scale: 0.65 }),
      p("heart", 490, 362, undefined, { scale: 0.5, revealOnly: true }),
    ],
    stamp: "DELIVERY STATUS: ALREADY HERE",
  },
  {
    targets: [
      t(
        "guestList",
        "Reveal the whole reef's guest list",
        "melt",
        260,
        210,
        140,
        60,
      ),
      t(
        "welcome",
        "Fill the neighborhood welcome basin",
        "fill",
        225,
        425,
        200,
        65,
        {
          requires: ["guestList"],
        },
      ),
      t(
        "postcards",
        "Build the reply-postcard stand",
        "freeze",
        450,
        470,
        135,
        40,
        {
          requires: ["guestList"],
        },
      ),
      warm(
        "address",
        "Warm the address of our picnic",
        650,
        325,
        [25, 40],
        [15, 30],
        ["welcome", "postcards"],
      ),
      t(
        "celebration",
        "Stamp the neighborhood celebration",
        "spin",
        495,
        245,
        70,
        55,
        {
          requires: ["address"],
        },
      ),
    ],
    props: [
      p("receipt", 330, 255, "guestList", { scale: 0.85 }),
      p("shell", 325, 480, "welcome", { scale: 1.35 }),
      p("mailbox", 517, 450, undefined, { scale: 1.25, revealOnly: true }),
      ...[465, 500, 535, 570].map((x, i) =>
        p("letter", x, 355 + (i % 2) * 25, undefined, {
          scale: 0.5,
          revealOnly: true,
        }),
      ),
      p("anemone", 610, 465, undefined, { scale: 0.7, revealOnly: true }),
      p("snail", 380, 480, undefined, { scale: 0.6, revealOnly: true }),
      p("bubble", 695, 235, undefined, { scale: 0.8, revealOnly: true }),
    ],
    stamp: "SIGNED FOR BY THE WHOLE REEF",
    extra: { par: 145 },
  },
];

// Customer-facing dispatches; the source cards retain the detailed design briefs.
const dispatches = [
  "A bubble would like a stamp. Clack has never posted something this round before.",
  "Nori's new mailbox is on the ground floor. Unfortunately, so is the entire ocean.",
  "Dot has prepared two stamp trays and eight very eager arms. Nobody has written anything yet.",
  "One damp envelope has requested air mail. A small umbrella should make this official.",
  "Every sandbar insists it is the correct sandbar. Help Clack sort out the addresses.",
  "A porcelain shell and a brass diving bell are traveling together. Handle with compliments.",
  "Seven mail slots. Three deliveries. Clack calls this an extremely streamlined system.",
  "This parcel is too large for the counter. Its personality is larger still.",
  "Registered soup! Nori would like the recipient to sign before it becomes registered gazpacho.",
  "These seeds have moved house. Their forwarding addresses are excellent; their roots are not.",
  "The cave keeps returning every greeting as an echo. Perhaps an envelope will help.",
  "Someone has ordered postal codes for a constellation. The stars forgot to include a map.",
  "All of Dot's invitations are addressed to Dot. She doesn't know anybody else's address yet.",
  "Clack has invented pneumatic mail, except wet. Please do not mention that everything here is wet.",
  "Dot has eight arms and three appointments. Somehow she still needs a noticeboard.",
  "The express snail is ready. Express is a state of mind. Gentle warmth; absolutely no rushing.",
  "A shell, a bell, and an anemone would all quite like an invitation. Every address matters.",
  "Dot is setting the picnic table for eight. For once, that doesn't mean just her arms.",
  "One letter has no destination. The handwriting seems to be asking a very small, brave question.",
  "The whole reef replied. Help Clack, Nori, and Dot get the picnic ready—everybody is coming.",
];
const source = designs.packs.find((pack) => pack.id === "03")!;
export const postalLevels: Level[] = recipes.map((recipe, i) => {
  const card = source.scenes[i];
  return {
    id: card.id,
    pack: "03",
    name: card.title,
    chapter: source.title,
    theme: "reef",
    pitch: dispatches[i],
    hint: card.puzzle.replace(/With (FLOW|MOTION)( enabled)?, /g, ""),
    ending: card.payoff,
    start: [475, 145],
    temp: 65,
    pressure: 45,
    par: 45 + recipe.targets.length * 22,
    targets: recipe.targets,
    props: [...cast(i), ...recipe.props],
    stamp: recipe.stamp,
    ...recipe.extra,
  };
});
