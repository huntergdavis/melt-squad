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
  p("pagelibrarian", 135, 310, undefined, { scale: 0.65 }),
  p("endy", 835, 275, undefined, { scale: 0.8 }),
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
      t("returns", "Thaw the returns label", "melt", 265, 405, 120, 65),
      warm(
        "lamp",
        "Light Page's reading lamp",
        630,
        235,
        [30, 40],
        [20, 35],
        ["returns"],
      ),
    ],
    cast: [
      p("pagelibrarian", 135, 310, undefined, { scale: 0.65 }),
      p("endy", 440, 470, "lamp", {
        scale: 0.7,
        reveal: { x: 535, y: 444, scale: 0.7 },
      }),
    ],
    props: [
      p("openbook", 480, 380, undefined, { scale: 1.2 }),
      p("bookplate", 325, 460, "returns", { scale: 0.75 }),
      p("booklamp", 682, 290, "lamp", { scale: 0.75 }),
      p("librarychair", 535, 470, undefined, { scale: 0.42, revealOnly: true }),
    ],
    stamp: "A FULL STOP IS ALLOWED A BREAK.",
    extra: { start: [325, 345], par: 95 },
  },
  {
    targets: [
      t("leftInk", "Fill the first ink basin", "fill", 245, 405, 135, 65, {
        fillColor: "#78659dcc",
      }),
      t("rightInk", "Fill the other ink basin", "fill", 645, 405, 135, 65, {
        fillColor: "#78659dcc",
      }),
      t("spine", "Build a fresh book spine", "freeze", 475, 250, 55, 145, {
        requires: ["leftInk", "rightInk"],
      }),
    ],
    props: [
      p("bookspine", 502, 235, "spine", {
        scale: 0.8,
        reveal: { x: 502, y: 238, scale: 0.95 },
      }),
      p("receipt", 312, 500, "leftInk", { scale: 0.6 }),
      p("receipt", 712, 500, "rightInk", { scale: 0.6 }),
      p("openbook", 500, 485, undefined, { scale: 0.8, revealOnly: true }),
    ],
    stamp: "FIRST WORD: PERHAPS. VERY PROMISING.",
    extra: { start: [312, 345], temp: 20, par: 125 },
  },
  {
    targets: [
      t(
        "wideStand",
        "Build the wide bookmark stand",
        "freeze",
        225,
        435,
        165,
        45,
      ),
      t(
        "tallStand",
        "Build the tall bookmark stand",
        "freeze",
        675,
        345,
        70,
        135,
      ),
      t(
        "shortStand",
        "Build the short bookmark stand",
        "freeze",
        460,
        450,
        105,
        30,
      ),
      t("inkCup", "Fill the bookmark ink cup", "fill", 245, 245, 115, 65, {
        requires: ["wideStand"],
        fillColor: "#78659dcc",
      }),
      warm(
        "bookplate",
        "Warm the kind bookplate",
        645,
        190,
        [30, 40],
        [20, 35],
        ["tallStand"],
      ),
      t("label", "Thaw permission to pause", "melt", 465, 305, 95, 65, {
        requires: ["shortStand"],
      }),
    ],
    props: [
      p("bookmark", 307, 430, "wideStand", { scale: 0.65, revealOnly: true }),
      p("bookmark", 710, 340, "tallStand", { scale: 0.7, revealOnly: true }),
      p("bookmark", 512, 444, "shortStand", { scale: 0.45, revealOnly: true }),
      p("bookplate", 697, 245, "bookplate", { scale: 0.7 }),
      p("bookplate", 512, 359, "label", { scale: 0.7 }),
      p("comma", 815, 475, undefined, { scale: 0.6 }),
    ],
    stamp: "YOU MAY STOP HERE. ENDY ENDORSES THIS.",
    extra: { start: [307, 375], temp: -20, par: 220 },
  },
  {
    targets: [
      t(
        "instructions",
        "Thaw the turning instructions",
        "melt",
        455,
        400,
        130,
        70,
      ),
      t("turner", "Turn one page politely", "spin", 465, 205, 90, 80, {
        requires: ["instructions"],
      }),
    ],
    props: [
      p("openbook", 300, 360, "turner", {
        scale: 1.3,
        reveal: { x: 385, y: 380, scale: 1.55 },
      }),
      p("receipt", 520, 465, "instructions", { scale: 0.85 }),
      p("bookmark", 685, 440, undefined, { scale: 1.05 }),
      p("exclamation", 790, 465, "turner", { scale: 0.65 }),
    ],
    stamp: "EXCUSE ME, PAGE. AND YOU, SMALLER PAGE.",
    extra: { start: [520, 340], par: 100 },
  },
  {
    targets: [
      t("chapter", "Carve a chapter window", "melt", 365, 230, 230, 95),
      t(
        "possibilities",
        "Fill the new possibilities",
        "fill",
        410,
        430,
        145,
        65,
      ),
    ],
    props: [
      p("openbook", 480, 340, "chapter", { scale: 1.2 }),
      p("bookplate", 685, 340, undefined, { scale: 0.8 }),
      p("paperboat", 482, 428, "possibilities", {
        scale: 0.85,
        revealOnly: true,
      }),
      p("comma", 690, 465, undefined, { scale: 0.75 }),
    ],
    stamp: "FINAL SENTENCE: OUT OF OFFICE.",
    extra: { start: [480, 170], par: 110 },
  },
  {
    targets: [
      t(
        "certificate",
        "Thaw the gardening certificate",
        "melt",
        245,
        240,
        130,
        75,
      ),
      t("bench", "Build the potting bench", "freeze", 640, 385, 135, 80),
      t("seedling", "Fill the seedling basin", "fill", 430, 425, 140, 65, {
        requires: ["certificate", "bench"],
      }),
    ],
    props: [
      p("bookplate", 310, 306, "certificate", { scale: 0.8 }),
      p("paperwolf", 510, 365, undefined, { scale: 0.85 }),
      p("flower", 500, 420, "seedling", { scale: 0.9 }),
      p("receipt", 330, 447, undefined, { scale: 0.8, revealOnly: true }),
    ],
    stamp: "REFERENCE: EXCELLENT WITH BEGONIAS.",
    extra: { start: [310, 180], par: 130 },
  },
  {
    targets: [
      warm("shy", "Send gentle best wishes", 245, 335, [25, 35], [15, 30]),
      warm("cheerful", "Warm a see-you-soon", 455, 250, [35, 45], [25, 40]),
      warm("grand", "Warm a forever-yours", 675, 365, [50, 60], [40, 55]),
    ],
    props: [
      p("letter", 297, 390, "shy", { scale: 0.75 }),
      p("letter", 507, 305, "cheerful", { scale: 0.9 }),
      p("letter", 727, 420, "grand", { scale: 1.05 }),
      p("comma", 275, 475, "shy", { scale: 0.55 }),
      p("exclamation", 550, 455, "cheerful", { scale: 0.55 }),
      p("librarychair", 460, 490, "grand", { scale: 0.8 }),
      p("heart", 635, 480, undefined, { scale: 0.45, revealOnly: true }),
    ],
    stamp: "FOREVER YOURS, RELIABLE ARMCHAIR.",
    extra: { start: [297, 275], temp: 30, pressure: 22, par: 130 },
  },
  {
    targets: [
      t("returnSlip", "Thaw the heroic return slip", "melt", 425, 205, 130, 65),
      t(
        "leftShelf",
        "Build the first display shelf",
        "freeze",
        245,
        355,
        155,
        45,
        { requires: ["returnSlip"] },
      ),
      t(
        "rightShelf",
        "Build the other display shelf",
        "freeze",
        625,
        330,
        155,
        45,
        { requires: ["returnSlip"] },
      ),
      warm(
        "thanks",
        "Stamp a respectable ending",
        650,
        435,
        [30, 40],
        [20, 35],
        ["leftShelf", "rightShelf"],
      ),
    ],
    props: [
      p("receipt", 490, 261, "returnSlip", { scale: 0.8 }),
      p("bookspine", 322, 349, "leftShelf", { scale: 0.6, revealOnly: true }),
      p("bookspine", 702, 324, "rightShelf", { scale: 0.6, revealOnly: true }),
      p("stamp", 702, 489, "thanks", { scale: 0.7 }),
      p("paperknight", 470, 475, "thanks", { scale: 0.9 }),
    ],
    stamp: "HEROIC DEED: RETURNED THE LADDER.",
    extra: { start: [490, 145], par: 160 },
  },
  {
    targets: [
      t("mintRecipe", "Open the mint recipe", "melt", 235, 215, 155, 85),
      t("puddingRecipe", "Open the pudding recipe", "melt", 470, 265, 155, 85),
      t("mintBasin", "Fill beneath the mint page", "fill", 250, 420, 125, 65),
      t(
        "puddingBasin",
        "Fill beneath the sweet page",
        "fill",
        485,
        440,
        125,
        65,
      ),
      warm(
        "oven",
        "Warm the shared pudding",
        720,
        370,
        [50, 60],
        [25, 40],
        ["mintRecipe", "puddingRecipe", "mintBasin", "puddingBasin"],
      ),
    ],
    props: [
      p("recipe", 312, 292, "mintRecipe", { scale: 0.9 }),
      p("recipe", 547, 342, "puddingRecipe", { scale: 0.9 }),
      p("paperwolf", 655, 335, undefined, { scale: 0.6 }),
      p("basket", 675, 360, undefined, { scale: 0.45 }),
      p("pudding", 772, 424, "oven", { scale: 0.8 }),
      p("flower", 670, 468, undefined, { scale: 0.45, revealOnly: true }),
    ],
    stamp: "REVIEW: DELICIOUS, NOT REMOTELY ALARMING.",
    extra: { start: [312, 155], par: 185 },
  },
  {
    targets: [
      t("echo", "Thaw the echo's epilogue", "melt", 250, 220, 140, 75),
      t("seat", "Build a listening seat", "freeze", 635, 420, 135, 65),
      warm(
        "lantern",
        "Warm the listening lantern",
        455,
        340,
        [35, 45],
        [20, 35],
        ["echo", "seat"],
      ),
    ],
    props: [
      p("bookplate", 320, 286, "echo", { scale: 0.85 }),
      p("booklamp", 507, 394, "lantern", { scale: 0.85 }),
      p("librarychair", 702, 414, "seat", { scale: 0.65, revealOnly: true }),
      p("comma", 700, 355, undefined, { scale: 0.4, revealOnly: true }),
      p("cup", 600, 480, undefined, { scale: 0.65, revealOnly: true }),
      p("cup", 410, 480, undefined, { scale: 0.65, revealOnly: true }),
      p("questionmark", 290, 460, "lantern", { scale: 0.65 }),
    ],
    stamp: "AND THEY STAYED FOR TEA. TEA. TEA.",
    extra: { start: [320, 160], par: 135 },
  },
  {
    targets: [
      t("atlas", "Thaw the moon's star atlas", "melt", 245, 285, 140, 90),
      t("pillow", "Build the moon's pillow", "freeze", 650, 440, 140, 50),
      t("projector", "Show the familiar stars", "spin", 665, 215, 85, 80, {
        requires: ["atlas", "pillow"],
      }),
    ],
    props: [
      p("openbook", 315, 365, "atlas", { scale: 0.95 }),
      p("papermoon", 475, 425, undefined, {
        scale: 1.0,
        reveal: { x: 580, y: 400, scale: 0.9 },
      }),
      p("spotlight", 707, 290, "projector", { scale: 0.8 }),
      p("bookmark", 825, 460, undefined, { scale: 0.65, revealOnly: true }),
    ],
    stamp: "NOT VANISHED. NAPPING AT HOME.",
    extra: { start: [315, 225], par: 135 },
  },
  {
    targets: [
      t("leftPlanter", "Fill the first hopeful pot", "fill", 235, 425, 120, 65),
      t(
        "rightPlanter",
        "Fill the other hopeful pot",
        "fill",
        680,
        425,
        120,
        65,
      ),
      t("catalog", "Carve the seed-catalog window", "melt", 405, 230, 170, 90),
      t(
        "middlePlanter",
        "Fill under the hopeful page",
        "fill",
        425,
        420,
        130,
        65,
      ),
    ],
    props: [
      p("openbook", 490, 327, "catalog", { scale: 1.05 }),
      p("flower", 295, 419, "leftPlanter", { scale: 0.7 }),
      p("flower", 740, 419, "rightPlanter", { scale: 0.7 }),
      p("flower", 490, 414, "middlePlanter", { scale: 0.85 }),
      p("paperwolf", 620, 375, undefined, { scale: 0.65 }),
      p("bookplate", 595, 492, undefined, { scale: 0.65, revealOnly: true }),
    ],
    stamp: "INDEX: AGAIN, AGAIN, AND AGAIN.",
    extra: { start: [295, 365], temp: 20, par: 160 },
  },
  {
    targets: [
      t("diploma", "Thaw the wolf's diploma", "melt", 245, 220, 135, 75),
      t(
        "bookstand",
        "Build the knight's bookstand",
        "freeze",
        640,
        410,
        145,
        70,
      ),
      warm(
        "wolfJob",
        "Welcome a gentle gardener",
        250,
        390,
        [30, 40],
        [20, 35],
        ["diploma"],
      ),
      warm(
        "knightJob",
        "Welcome a brave storyteller",
        660,
        225,
        [45, 55],
        [35, 50],
        ["bookstand"],
      ),
    ],
    props: [
      p("bookplate", 312, 284, "diploma", { scale: 0.8 }),
      p("paperwolf", 450, 385, "wolfJob", { scale: 0.7 }),
      p("paperknight", 555, 385, "knightJob", { scale: 0.7 }),
      p("letter", 415, 476, undefined, { scale: 0.6, revealOnly: true }),
      p("letter", 585, 476, undefined, { scale: 0.6, revealOnly: true }),
      p("booklamp", 712, 280, "knightJob", { scale: 0.7 }),
      p("flower", 302, 442, "wolfJob", { scale: 0.6 }),
    ],
    stamp: "REFERENCES AVAILABLE. GARDENING GLOVES RECOMMENDED.",
    extra: { start: [312, 160], par: 160 },
  },
  {
    targets: [
      t("choirFan", "Prepare the quiet choir", "spin", 445, 205, 105, 85),
      warm(
        "exclamation",
        "Warm the indoor exclamation",
        250,
        410,
        [35, 45],
        [15, 30],
        ["choirFan"],
      ),
      warm(
        "question",
        "Warm the gentle question",
        650,
        390,
        [25, 35],
        [20, 35],
        ["choirFan"],
      ),
    ],
    props: [
      p("exclamation", 302, 400, "exclamation", { scale: 0.95 }),
      p("questionmark", 702, 380, "question", { scale: 0.95 }),
      p("comma", 435, 452, "choirFan", { scale: 0.5 }),
      p("comma", 510, 465, "choirFan", { scale: 0.42 }),
      p("comma", 575, 452, "choirFan", { scale: 0.5 }),
      p("bookplate", 500, 340, undefined, { scale: 0.6, revealOnly: true }),
    ],
    stamp: "AN EXCELLENT, VERY SMALL EXCLAMATION.",
    extra: { start: [497, 145], temp: 20, pressure: 80, par: 135 },
  },
  {
    targets: [
      t("page", "Build the first draft", "freeze", 385, 240, 190, 95, {
        phase: {
          steps: [
            {
              verb: "freeze",
              name: "Build the first draft",
              signal: "page:formed",
            },
            {
              verb: "melt",
              name: "Open the first draft",
              signal: "page:opened",
            },
            {
              verb: "freeze",
              name: "Build the second draft",
              requires: ["ink"],
              signal: "page:redrafted",
            },
          ],
        },
      }),
      t("ink", "Fill the second-draft ink", "fill", 400, 425, 160, 65, {
        fillColor: "#78659dcc",
      }),
    ],
    props: [
      p("bookplate", 680, 295, undefined, { scale: 0.85 }),
      p("eraser", 635, 468, undefined, { scale: 0.8, revealOnly: true }),
      p("communalbook", 710, 390, undefined, { scale: 0.45, revealOnly: true }),
      p("pencil", 295, 420, undefined, { scale: 0.95 }),
    ],
    stamp: "SECOND DRAFT: NOW WITH PICNIC INVITATION.",
    extra: { start: [480, 180], temp: -20, par: 170 },
  },
  {
    targets: [
      t("wideSeat", "Build a roomy reading seat", "freeze", 230, 435, 165, 45),
      t("tinySeat", "Build a little reading seat", "freeze", 465, 445, 65, 35),
      t("longSeat", "Build another roomy seat", "freeze", 630, 435, 165, 45),
      warm(
        "shortStories",
        "Light the short-story corner",
        265,
        235,
        [30, 40],
        [20, 35],
        ["wideSeat", "tinySeat", "longSeat"],
      ),
      warm(
        "longStories",
        "Light the long-story corner",
        645,
        235,
        [40, 50],
        [30, 45],
        ["wideSeat", "tinySeat", "longSeat"],
      ),
    ],
    props: [
      p("booklamp", 317, 290, "shortStories", { scale: 0.8 }),
      p("booklamp", 697, 290, "longStories", { scale: 0.8 }),
      p("paperdragon", 490, 398, undefined, { scale: 0.95 }),
      p("paperknight", 240, 425, undefined, { scale: 0.65 }),
      p("comma", 495, 436, undefined, { scale: 0.4, revealOnly: true }),
      p("openbook", 280, 420, undefined, { scale: 0.4, revealOnly: true }),
    ],
    stamp: "ONE VERY LONG SENTENCE. PLENTY OF CHAIRS.",
    extra: { start: [312, 375], temp: -20, par: 185 },
  },
  {
    targets: [
      t("chapter", "Carve the communal chapter", "melt", 425, 225, 180, 90),
      t("ink", "Fill the shared-story ink", "fill", 445, 430, 140, 65, {
        fillColor: "#78659dcc",
      }),
      t("frame", "Build the binding frame", "freeze", 250, 385, 110, 95),
      warm(
        "cover",
        "Warm the welcoming cover",
        710,
        345,
        [45, 55],
        [25, 40],
        ["ink", "frame"],
      ),
    ],
    props: [
      p("openbook", 515, 322, "chapter", { scale: 1.05 }),
      p("bookplate", 762, 399, "cover", { scale: 0.85 }),
      p("bookspine", 305, 379, "frame", { scale: 0.65, revealOnly: true }),
      p("letter", 650, 465, undefined, { scale: 0.8, revealOnly: true }),
      p("flower", 415, 405, undefined, { scale: 0.5, revealOnly: true }),
      p("papermoon", 765, 475, undefined, { scale: 0.4, revealOnly: true }),
    ],
    stamp: "COVER ART: ROOM FOR ONE MORE FRIEND.",
    extra: { start: [515, 165], par: 165 },
  },
  {
    targets: [
      t("turbine", "Start the scenic book route", "spin", 435, 190, 85, 80),
      warm(
        "leftCart",
        "Follow the large book cart",
        270,
        325,
        [30, 40],
        [20, 35],
        ["turbine"],
        {
          motion: { rx: 90, ry: 0, period: 12, phase: 0, after: ["turbine"] },
        },
      ),
      warm(
        "rightCart",
        "Follow the little book cart",
        650,
        435,
        [45, 55],
        [30, 45],
        ["turbine"],
        {
          motion: {
            rx: 85,
            ry: 0,
            period: 14,
            phase: Math.PI,
            after: ["turbine"],
          },
        },
      ),
    ],
    props: [
      p("bookcart", 0, 0, "leftCart", {
        follow: "leftCart",
        scale: 1.05,
        reveal: { x: 330, y: 465, scale: 1.1 },
      }),
      p("bookcart", 0, 0, "rightCart", {
        follow: "rightCart",
        scale: 0.75,
        reveal: { x: 665, y: 465, scale: 0.75 },
      }),
      p("bookplate", 330, 405, undefined, { scale: 0.25, revealOnly: true }),
      p("bookmark", 665, 409, undefined, { scale: 0.4, revealOnly: true }),
    ],
    stamp: "TINY PAMPHLET. CEREMONIALLY LARGE DELIVERY.",
    cast: [
      p("pagelibrarian", 135, 225, undefined, { scale: 0.65 }),
      p("endy", 835, 275, undefined, { scale: 0.8 }),
    ],
    extra: { start: [477, 130], temp: 20, pressure: 80, par: 150 },
  },
  {
    targets: [
      t("firstCard", "Thaw the first contribution", "melt", 245, 235, 120, 75),
      t("otherCard", "Thaw the other contribution", "melt", 685, 230, 120, 75),
      t(
        "stand",
        "Build the broad guest-book stand",
        "freeze",
        395,
        315,
        235,
        80,
        { requires: ["firstCard", "otherCard"] },
      ),
      warm(
        "dedication",
        "Warm an open invitation",
        455,
        445,
        [25, 35],
        [15, 30],
        ["stand"],
      ),
    ],
    props: [
      p("letter", 305, 302, "firstCard", { scale: 0.8 }),
      p("letter", 745, 297, "otherCard", { scale: 0.8 }),
      p("guestbook", 512, 309, "stand", { scale: 1.1, revealOnly: true }),
      p("bookplate", 507, 499, "dedication", { scale: 0.75 }),
      p("librarychair", 720, 465, undefined, { scale: 0.65, revealOnly: true }),
    ],
    stamp: "THIS BLANK IS SAVED FOR WHOEVER ARRIVES NEXT.",
    extra: { start: [305, 175], par: 165 },
  },
  {
    targets: [
      warm(
        "pageDedication",
        "Warm Page's dedication",
        245,
        225,
        [30, 40],
        [20, 35],
      ),
      warm(
        "endyDedication",
        "Warm Endy's little dedication",
        670,
        235,
        [20, 30],
        [15, 25],
      ),
      t("pageFoot", "Build Page's display foot", "freeze", 270, 440, 100, 55, {
        requires: ["pageDedication"],
      }),
      t("endyFoot", "Build Endy's display foot", "freeze", 665, 440, 100, 55, {
        requires: ["endyDedication"],
      }),
      t("title", "Thaw the shared book's title", "melt", 445, 190, 120, 65, {
        requires: ["pageFoot", "endyFoot"],
      }),
    ],
    cast: [
      p("pagelibrarian", 135, 310, undefined, {
        scale: 0.65,
        reveal: { x: 185, y: 415, scale: 0.7 },
      }),
      p("endy", 835, 275, undefined, {
        scale: 0.8,
        reveal: { x: 825, y: 420, scale: 0.7 },
      }),
    ],
    props: [
      p("communalbook", 495, 435, "title", { scale: 0.95 }),
      p("bookplate", 505, 245, "title", { scale: 0.8 }),
      p("booklamp", 297, 280, "pageDedication", { scale: 0.65 }),
      p("booklamp", 722, 290, "endyDedication", { scale: 0.5 }),
      p("paperwolf", 315, 430, undefined, { scale: 0.5 }),
      p("paperknight", 700, 430, undefined, { scale: 0.5 }),
      p("comma", 418, 488, undefined, { scale: 0.4, revealOnly: true }),
      p("questionmark", 605, 485, undefined, { scale: 0.45, revealOnly: true }),
    ],
    stamp: "THE END. WELCOME BACK.",
    extra: { start: [297, 165], temp: 35, pressure: 27, par: 190 },
  },
];

const dispatches = [
  "Endy the full stop has called in sick. Page would like to offer him a lamp and a chair, not another sentence.",
  "This notebook needs two basins of ink and a fresh spine. Nobody has decided how the story should begin. Excellent.",
  "Three bookmarks need their own stands. One has a firm policy about letting you stop whenever you like.",
  "The page-turning machine has forgotten its manners. The enormous book would appreciate an extremely polite breeze.",
  "Chapter Twelve needs a window. The final sentence has packed for a holiday on the other side.",
  "The retired paper wolf has applied for gardening. Please prepare his bench; the begonias are expecting him.",
  "Best wishes, see you soon, forever yours: three endings need three temperatures. One is addressed to an armchair.",
  "The knight has returned the ladder. Page thinks tidying the shelves is a perfectly respectable heroic ending.",
  "Two frozen recipes stand between the library and pudding. The wolf has brought mint, with absolutely no ominous music.",
  "The cave echo wants an epilogue. Apparently nobody has ever invited it to stay for tea.",
  "The atlas moon misses home. Its favorite constellation is a rocking chair with excellent nap potential.",
  "This seed catalog ends with three empty pots. The wolf would like to replace the ending with the word again.",
  "The wolf and knight are swapping career advice. Both have asked whether the gardening gloves come in beginner sizes.",
  "The punctuation choir has booked the quiet room. Even the exclamation marks have promised to use indoor voices.",
  "This page wants another try. Build it, open it for ink, then build it again: the second draft includes a picnic.",
  "A very long paper dragon wants a short story. Page is arranging enough chairs for the whole sentence.",
  "Everyone has contributed a picture for the shared book. Endy's favorite picture is the space for one more friend.",
  "The book carts prefer the scenic route. Follow their slow tracks; Endy's tiny pamphlet has booked the largest cart.",
  "The guest book needs a dedication. Please leave the blank blank; someone wonderful may arrive later.",
  "Warm two dedications and build their display feet. Everyone's library card belongs in this ending, even the full stop's.",
];

const source = designs.packs.find((pack) => pack.id === "09")!;
export const libraryLevels: Level[] = recipes.map((recipe, index) => {
  const card = source.scenes[index];
  return {
    id: card.id,
    pack: "09",
    name: card.title,
    chapter: source.title,
    theme: "library",
    pitch: dispatches[index],
    hint: card.puzzle,
    ending: card.payoff,
    start: [475, 145],
    temp: 40,
    pressure: 40,
    par: 60 + recipe.targets.length * 25,
    targets: recipe.targets,
    // Keep the librarians in front of desks and their completed payoff furniture.
    props: [...recipe.props, ...(recipe.cast ?? cast())],
    stamp: recipe.stamp,
    ...recipe.extra,
  };
});
