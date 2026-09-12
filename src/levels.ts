import type { Level, Target, Verb, Prop, Theme } from "./types";
import { sockLevels } from "./packs/02";
import { postalLevels } from "./packs/03";
import { circusLevels } from "./packs/04";
import { boroughLevels } from "./packs/05";

const target = (
  id: string,
  name: string,
  verb: Verb,
  x: number,
  y: number,
  w = 100,
  h = 70,
  extra: Partial<Target> = {},
): Target => ({ id, name, verb, x, y, w, h, ...extra });
const prop = (
  kind: Prop["kind"],
  x: number,
  y: number,
  scale = 1,
  targetId?: string,
): Prop => ({ kind, x, y, scale, target: targetId });
const level = (
  id: string,
  name: string,
  theme: Theme,
  pitch: string,
  hint: string,
  ending: string,
  targets: Target[],
  props: Prop[],
  extra: Partial<Level> = {},
): Level => ({
  id,
  name,
  theme,
  pitch,
  hint,
  ending,
  targets,
  props,
  chapter: "Small miracles",
  par: 65,
  start: [450, 160],
  temp: 65,
  pressure: 45,
  ...extra,
});

export const levels: Level[] = [
  level(
    "cup",
    "A storm in a teacup",
    "kitchen",
    "The tea is iced. It was not meant to be iced.",
    "Move the nozzle over the cup with WASD. Sweep warm water across the blue ice. Up makes it hotter.",
    "Tea restored. The biscuit committee sends its regards.",
    [target("tea", "Thaw the tea", "melt", 400, 330, 160, 100)],
    [prop("cup", 480, 437, 1.5)],
    { par: 35 },
  ),
  level(
    "wizard",
    "An inconvenient wizard",
    "cave",
    "Frozen boots. Upside-down wizard. Absolutely no dignity.",
    "Down makes freezing water. Build the blue landing pad first, then heat the boots. Move beside the boots to reach their top.",
    "A perfect landing. He insists this was all part of the spell.",
    [
      target("pad", "Build a soft snow landing", "freeze", 350, 444, 230, 46),
      target("boots", "Release the frozen boots", "melt", 407, 176, 126, 58, {
        requires: ["pad"],
      }),
    ],
    [prop("wizard", 470, 282, 1.05, "boots")],
    { start: [325, 315], par: 65 },
  ),
  level(
    "heart",
    "Cupid, on call",
    "garden",
    "One frozen heart. No grand gestures. Just a little warmth.",
    "Melt the shell, then use 20–55° water and at most 55% pressure on the heart. The task list shows the sweet spot.",
    "They texted first. The squad pretends not to be emotional.",
    [
      target("shell", "Melt the emotional armor", "melt", 409, 279, 142, 110),
      target("heart", "Warm, do not boil", "warm", 434, 312, 92, 72, {
        requires: ["shell"],
        temp: [20, 55],
        pressure: [10, 55],
      }),
    ],
    [prop("heart", 480, 360, 1.65, "heart")],
    { par: 65 },
  ),
  level(
    "jukebox",
    "Ice ice, maybe",
    "town",
    "The jukebox has been playing the same frozen note since Tuesday.",
    "Clear the ice, then aim a jet of at least 70% pressure at the exposed turbine. Right increases pressure.",
    "Finally: a song with more than one note.",
    [
      target("case", "Defrost the jukebox", "melt", 405, 264, 150, 156),
      target("wheel", "Spin up the music", "spin", 450, 331, 62, 60, {
        requires: ["case"],
      }),
    ],
    [prop("jukebox", 480, 415, 1.25)],
    { chapter: "Odd jobs", par: 70 },
  ),
  level(
    "penguin",
    "Mind the gap",
    "cave",
    "A penguin has forgotten it cannot fly. Please do not tell it.",
    "Freeze the two dotted bridge sections. Then thaw the departure gate on the left.",
    "The penguin rates the bridge five fish out of five.",
    [
      target("bridge1", "Bridge the first gap", "freeze", 370, 429, 100, 40),
      target("bridge2", "Bridge the second gap", "freeze", 490, 429, 100, 40),
      target("gate", "Open the departure gate", "melt", 215, 310, 75, 116, {
        requires: ["bridge1", "bridge2"],
      }),
    ],
    [prop("penguin", 250, 414, 1.0, "gate"), prop("penguin", 721, 436, 0.65)],
    { par: 85 },
  ),
  level(
    "greenhouse",
    "The dramatic daisy",
    "garden",
    "Three flowers. Three wildly different opinions about the weather.",
    "The snowdrop wants cold water; the daisy wants gentle warmth; the sun bloom likes 55–90°. Each target shows its requirements.",
    "All three agree the weather is finally about them.",
    [
      target("snow", "A cool drink: snowdrop", "freeze", 225, 335, 90, 65),
      target("daisy", "A warm drink: daisy", "warm", 435, 335, 90, 65, {
        temp: [20, 50],
        pressure: [10, 60],
      }),
      target("sun", "A hot drink: sun bloom", "warm", 645, 335, 90, 65, {
        temp: [55, 90],
        pressure: [10, 75],
      }),
    ],
    [
      prop("flower", 270, 427, 1),
      prop("flower", 480, 427, 1),
      prop("flower", 690, 427, 1),
    ],
    { chapter: "Odd jobs", par: 90 },
  ),
  level(
    "duck",
    "A very small ocean",
    "kitchen",
    "Captain Quack needs a sea. A cup will do.",
    "Freeze the marked leak first, then fill the basin with water above 0°. Frozen water will not fill it.",
    "A brave voyage of approximately fourteen centimetres.",
    [
      target("plug", "Freeze the leak shut", "freeze", 600, 396, 65, 60),
      target("water", "Fill Captain Quack’s sea", "fill", 360, 320, 210, 106, {
        requires: ["plug"],
      }),
    ],
    [prop("cup", 465, 455, 1.9), prop("duck", 470, 338, 0.9, "water")],
    { chapter: "Odd jobs", par: 65 },
  ),
  level(
    "ufo",
    "Unidentified frozen object",
    "cosmos",
    "They travelled six galaxies and forgot the de-icer.",
    "Thaw both thrusters, then pressure-spin the starter turbine. Reach each engine from above.",
    "They leave a five-star review for Earth. Unprecedented.",
    [
      target("left", "Thaw port thruster", "melt", 280, 339, 90, 88),
      target("right", "Thaw starboard thruster", "melt", 592, 339, 90, 88),
      target("starter", "Jump-start the saucer", "spin", 448, 270, 64, 58, {
        requires: ["left", "right"],
      }),
    ],
    [prop("ufo", 480, 350, 1.9, "starter")],
    { chapter: "Odd jobs", par: 95 },
  ),
  level(
    "cake",
    "Baked Alaska emergency",
    "kitchen",
    "The candles are frozen. The frosting is emotionally delicate.",
    "Melt the candle caps, then warm the frosting at 20–45° and 10–40% pressure. Too much heat sets the frosting back.",
    "Happy birthday to whoever filled out the incident report.",
    [
      target("candles", "Free the birthday candles", "melt", 400, 249, 160, 55),
      target("icing", "Gently soften the frosting", "warm", 411, 336, 138, 62, {
        requires: ["candles"],
        temp: [20, 45],
        pressure: [10, 40],
      }),
    ],
    [prop("cake", 480, 435, 1.6)],
    { chapter: "Odd jobs", par: 65 },
  ),
  level(
    "moon",
    "Moon bath",
    "cosmos",
    "Even celestial bodies deserve a warm bath.",
    "Build an ice bath rim, fill it, then warm the moon with 25–55° water. Work from the bottom upward.",
    "The tides will be fifteen minutes late. Self-care.",
    [
      target("rim", "Sculpt the ice bath", "freeze", 346, 430, 265, 42),
      target("bath", "Run the bath", "fill", 405, 347, 150, 64, {
        requires: ["rim"],
      }),
      target("moon", "Warm the moon", "warm", 437, 240, 86, 78, {
        requires: ["bath"],
        temp: [25, 55],
        pressure: [10, 60],
      }),
    ],
    [prop("moon", 480, 283, 1.45, "moon")],
    { chapter: "Far-out calls", par: 90 },
  ),
  level(
    "robot",
    "A robot’s first cocoa",
    "town",
    "Please install the feeling called “cozy.”",
    "Thaw the mug, fill it, then bring the cocoa to 30–60° with a gentle stream.",
    "New emotion detected: marshmallow.",
    [
      target("mug", "Thaw the mug", "melt", 391, 342, 125, 88),
      target("cocoa", "Pour the cocoa", "fill", 396, 350, 115, 70, {
        requires: ["mug"],
      }),
      target("cozy", "Make it cozy", "warm", 408, 359, 91, 57, {
        requires: ["cocoa"],
        temp: [30, 60],
        pressure: [10, 50],
      }),
    ],
    [prop("robot", 660, 425, 1.35, "cozy"), prop("cup", 451, 444, 1.25)],
    { chapter: "Far-out calls", par: 90 },
  ),
  level(
    "cat",
    "The floor is slightly lava",
    "cave",
    "The cat picked the warmest rock. Naturally, it is a volcano.",
    "Freeze three stepping stones, then thaw the cat’s exit. No actual cats are harmed by questionable geology.",
    "The cat ignores the rescue and sits in your equipment box.",
    [
      target("step1", "Freeze the near stone", "freeze", 317, 428, 80, 38),
      target("step2", "Freeze the middle stone", "freeze", 439, 395, 80, 38),
      target("step3", "Freeze the far stone", "freeze", 561, 428, 80, 38),
      target("exit", "Thaw the exit", "melt", 699, 320, 75, 109, {
        requires: ["step1", "step2", "step3"],
      }),
    ],
    [prop("cat", 243, 405, 1.05, "exit")],
    { chapter: "Far-out calls", par: 105 },
  ),
  level(
    "snowcone",
    "Reverse snow cone",
    "town",
    "The snow-cone machine has made a single enormous cone.",
    "Melt the jam, freeze a fresh scoop, then spin the machine at 70% pressure or more.",
    "One sensible snow cone. Still an unreasonable flavour.",
    [
      target("jam", "Clear the glacier jam", "melt", 380, 242, 200, 119),
      target("scoop", "Freeze a fresh scoop", "freeze", 295, 410, 92, 68, {
        requires: ["jam"],
      }),
      target("motor", "Restart the machine", "spin", 573, 369, 74, 74, {
        requires: ["scoop"],
      }),
    ],
    [prop("snowcone", 480, 411, 1.35)],
    { chapter: "Far-out calls", par: 90 },
  ),
  level(
    "letters",
    "Love, defrosted",
    "garden",
    "Two pen pals. One frozen postal system.",
    "Free both letters, then warm each little heart at 20–50° with low pressure.",
    "“I was going to write sooner, but the postbox was a glacier.”",
    [
      target("letter1", "Thaw the first letter", "melt", 258, 282, 105, 100),
      target("letter2", "Thaw the reply", "melt", 598, 282, 105, 100),
      target("heart1", "Warm the first heart", "warm", 276, 320, 69, 60, {
        requires: ["letter1"],
        temp: [20, 50],
        pressure: [10, 50],
      }),
      target("heart2", "Warm the second heart", "warm", 616, 320, 69, 60, {
        requires: ["letter2"],
        temp: [20, 50],
        pressure: [10, 50],
      }),
    ],
    [prop("letter", 310, 355, 1.25), prop("letter", 650, 355, 1.25)],
    { chapter: "Far-out calls", par: 100 },
  ),
  level(
    "disco",
    "Disco at absolute zero",
    "cosmos",
    "The aliens cannot feel their dancing appendages.",
    "Melt the disco ball, freeze a shiny dance floor, then pressure-spin the music.",
    "One small step for a squid. One giant leap for disco.",
    [
      target("ball", "Defrost the disco moon", "melt", 423, 185, 115, 106),
      target(
        "floor",
        "Freeze a glossy dance floor",
        "freeze",
        345,
        441,
        270,
        36,
      ),
      target("beat", "Drop the beat", "spin", 694, 342, 64, 70, {
        requires: ["ball", "floor"],
      }),
    ],
    [
      prop("moon", 480, 240, 1.6),
      prop("jukebox", 726, 429, 1),
      prop("ufo", 275, 365, 1),
    ],
    { chapter: "Far-out calls", par: 95 },
  ),
  level(
    "spa",
    "Dragon spa day",
    "cave",
    "A dragon booked a cold plunge. The volcano disagreed.",
    "Build the ice tub, pour in water, then chill the cooling stones. A hot stream will undo unfinished ice-building.",
    "The dragon asks if you validate parking. It flew here.",
    [
      target("tub", "Build the plunge pool", "freeze", 350, 419, 235, 46),
      target("pool", "Fill the plunge pool", "fill", 394, 333, 148, 74, {
        requires: ["tub"],
      }),
      target("stone1", "Chill the left stone", "freeze", 224, 365, 79, 64, {
        requires: ["pool"],
      }),
      target("stone2", "Chill the right stone", "freeze", 658, 365, 79, 64, {
        requires: ["pool"],
      }),
    ],
    [prop("dragon", 475, 330, 1.3)],
    { chapter: "Squad legends", par: 100 },
  ),
  level(
    "breakfast",
    "Continental thaw",
    "kitchen",
    "Breakfast has frozen across three separate time zones.",
    "Thaw the cake, fill the cup, and gently warm the egg-shaped moon at 25–50°. Three stations, three water settings.",
    "Breakfast is served. Time zones remain a philosophical problem.",
    [
      target("toast", "Defrost the breakfast cake", "melt", 204, 328, 113, 86),
      target("coffee", "Fill the coffee cup", "fill", 423, 342, 113, 80),
      target("egg", "Warm the moon egg", "warm", 655, 340, 74, 68, {
        temp: [25, 50],
        pressure: [10, 45],
      }),
    ],
    [
      prop("cake", 260, 445, 1),
      prop("cup", 480, 450, 1.2),
      prop("moon", 692, 375, 1.05),
    ],
    { chapter: "Squad legends", par: 80 },
  ),
  level(
    "ferry",
    "The extremely local ferry",
    "garden",
    "A duck promises to ferry a penguin across a puddle.",
    "Freeze the quay, fill the harbour, free the boat, then spin the paddle wheel. In that order.",
    "The passenger complains about legroom. The duck has no comment.",
    [
      target("quay", "Build the quay", "freeze", 252, 434, 120, 42),
      target("harbour", "Fill the harbour", "fill", 432, 400, 210, 58, {
        requires: ["quay"],
      }),
      target("boat", "Thaw the duck boat", "melt", 477, 288, 130, 85, {
        requires: ["harbour"],
      }),
      target("paddle", "Spin the paddle wheel", "spin", 665, 367, 64, 62, {
        requires: ["boat"],
      }),
    ],
    [prop("duck", 543, 353, 1.4, "paddle"), prop("penguin", 305, 408, 0.9)],
    { chapter: "Squad legends", par: 110 },
  ),
  level(
    "wedding",
    "Something borrowed, something blue",
    "garden",
    "The wedding is perfect. Apart from the glacier.",
    "Thaw the cake and freeze the aisle. Then warm the wedding heart at 20–50° using a gentle stream.",
    "The vows include “in sickness and in unexpected permafrost.”",
    [
      target("cake", "Rescue the wedding cake", "melt", 653, 306, 124, 114),
      target("aisle", "Build the sparkling aisle", "freeze", 250, 438, 345, 35),
      target("vows", "Warm the vows", "warm", 403, 295, 100, 80, {
        requires: ["cake", "aisle"],
        temp: [20, 50],
        pressure: [10, 45],
      }),
    ],
    [prop("cake", 715, 439, 1.1), prop("heart", 453, 345, 1.55)],
    { chapter: "Squad legends", par: 100 },
  ),
  level(
    "finale",
    "The last cold day",
    "cosmos",
    "The sun called in sick. All available units, please respond.",
    "Build a launchpad, melt the solar shell, fill the fuel cup, spin the starter, then gently warm the sun to 40–65°.",
    "Sunrise restored. Take the rest of the day off, Melt Squad.",
    [
      target("pad", "Build the launchpad", "freeze", 330, 456, 300, 38),
      target("shell", "Break the solar ice", "melt", 390, 180, 180, 145, {
        requires: ["pad"],
      }),
      target("fuel", "Fill the solar fuel cup", "fill", 206, 347, 115, 82, {
        requires: ["shell"],
      }),
      target("starter", "Start a small sunrise", "spin", 684, 347, 70, 73, {
        requires: ["fuel"],
      }),
      target("sun", "Bring back the morning", "warm", 438, 224, 84, 82, {
        requires: ["starter"],
        temp: [40, 65],
        pressure: [10, 60],
      }),
    ],
    [
      prop("sun", 480, 267, 2.1, "sun"),
      prop("cup", 263, 453, 1.15),
      prop("robot", 721, 432, 1),
    ],
    { chapter: "Squad legends", par: 140 },
  ),
  ...sockLevels,
  ...postalLevels,
  ...circusLevels,
  ...boroughLevels,
];
