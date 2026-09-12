import { levels } from "./levels";
import type { Level, PropKind } from "./types";
import type { Save } from "./save";
export const mapLandmarks: Record<string, [PropKind, PropKind, PropKind]> = {
  "01": ["wizard", "duck", "heart"],
  "02": ["washer", "sock", "moth"],
  "03": ["mailbox", "eel", "octopus"],
  "04": ["circuswheel", "giraffe", "beetle"],
  "05": ["townsign", "hedgehog", "pencil"],
  "06": ["whisk", "biscuitcaptain", "jellybean"],
  "07": ["cubby", "ankylosaur", "diplodocus"],
  "08": ["servicewindow", "flintclerk", "catdragon"],
  "09": ["openbook", "endy", "paperwolf"],
  "10": ["gus", "irisharpy", "pastalaurel"],
  "11": ["rill", "moss", "weddingbell"],
  "12": ["dozycourier", "bramble", "dreambook"],
  "13": ["breebarometer", "sleetseedling", "snowpeas"],
  "14": ["sprigporter", "ednalibrarian", "myceliumcarriage"],
  "15": ["marginassistant", "zeroexhibit", "almostkettle"],
  "16": ["mallowhost", "ziphauler", "comettruck"],
  "17": ["captainbutton", "glimstar", "junduck"],
};

const themes: [string, string, PropKind, string][] = [
  [
    "First Shift",
    "Twenty small miracles. One very helpful hose.",
    "cup",
    "#c6dfd2",
  ],
  [
    "The Midnight Sock Exchange",
    "Odd socks. Good company. Open until boo o'clock.",
    "ghost",
    "#cfc1e3",
  ],
  [
    "Brine & Parcel",
    "Deliver a little friendship, above and below sea level.",
    "crab",
    "#b7dfe0",
  ],
  [
    "The Mostly Clockwork Circus",
    "A perfect show for wonderfully imperfect performers.",
    "ringmaster",
    "#efd1a4",
  ],
  [
    "Borough of Very Small Affairs",
    "Tiny citizens. Enormous paperwork.",
    "mousemayor",
    "#d6dcc0",
  ],
  [
    "The Great Pudding Republic",
    "Dessert would like a word with the menu.",
    "pudding",
    "#ecc6be",
  ],
  [
    "Fossilbean Preschool",
    "Tiny dinosaurs. Enormous feelings.",
    "principal",
    "#c4dbad",
  ],
  [
    "Emberborough Town Hall",
    "A dragon-sized welcome for everyone.",
    "cindermayor",
    "#e2c6a4",
  ],
  [
    "The Runaway Ending Library",
    "Happily ever after is looking for a new job.",
    "pagelibrarian",
    "#c6c5e3",
  ],
  [
    "Mount Oops Sports Club",
    "Mythical athletes. Admirably questionable technique.",
    "coachnika",
    "#bfdae1",
  ],
  [
    "Ever After, Everywhere",
    "Wedding plans for incompatible planets.",
    "adaplanner",
    "#f0c8d1",
  ],
  [
    "The Somnolent Seamworks",
    "A nightmare tries a softer line of work.",
    "stitchtailor",
    "#d1c5e5",
  ],
  [
    "The Forecast Conservatory",
    "Grow a little weather for a friend.",
    "nimbusgardener",
    "#d4dfac",
  ],
  [
    "The Mycelium Local",
    "All aboard. Even if you brought your entire garden.",
    "gillsconductor",
    "#c7d2b5",
  ],
  [
    "The Institute of Almost Possible",
    "The science is questionable. The enthusiasm isn't.",
    "drprobably",
    "#ced6ea",
  ],
  [
    "Last Exit Before Breakfast",
    "Pancakes at the edge of the universe.",
    "misocook",
    "#bfc8df",
  ],
  [
    "Toybox After Bedtime",
    "Little toys learn that small can still save the day.",
    "glimstar",
    "#ead7b5",
  ],
  [
    "Apocalypse, Rescheduled",
    "The end is nigh. Apparently there will be snacks.",
    "worm",
    "#e6c4b8",
  ],
  [
    "The Hotel Between Tuesdays",
    "Hospitality outside normal business time.",
    "moon",
    "#cccbe2",
  ],
  [
    "The Great Thaw Festival",
    "Everybody brings something. Everybody belongs.",
    "sock",
    "#eaddaf",
  ],
];
export const campaign = themes.map(([name, pitch, mascot, color], index) => ({
  id: String(index + 1).padStart(2, "0"),
  name,
  pitch,
  mascot,
  color,
  planned: 20,
}));
export const packOf = (level: Level) => level.pack ?? "01";
export const inPack = (id: string, catalog: Level[] = levels) =>
  catalog.filter((level) => packOf(level) === id);
export function nextRescue(
  save: Pick<Save, "stars" | "lastScene" | "lastWorld">,
  preferred = save.lastWorld,
  catalog: Level[] = levels,
): Level | undefined {
  const last = catalog.find(
    (level) =>
      level.id === save.lastScene &&
      !save.stars[level.id] &&
      (!preferred || packOf(level) === preferred),
  );
  return (
    last ??
    catalog.find(
      (level) => packOf(level) === preferred && !save.stars[level.id],
    ) ??
    catalog.find((level) => !save.stars[level.id])
  );
}
export function packProgress(
  id: string,
  save: Pick<Save, "stars">,
  catalog: Level[] = levels,
) {
  const content = inPack(id, catalog);
  const done = content.filter((level) => save.stars[level.id]).length;
  return {
    done,
    available: content.length,
    complete: content.length === 20 && done === 20,
  };
}
// Four stops per row. Scene order stays logical; geometry supplies arrow neighbors.
export function mapPoint(index: number): [number, number] {
  const row = Math.floor(index / 4),
    column = row % 2 ? 3 - (index % 4) : index % 4;
  return [15 + column * 23, 12 + row * 19];
}
export function mapNeighbor(index: number, direction: string): number {
  const [x, y] = mapPoint(index);
  const points = Array.from({ length: 20 }, (_, i) => ({
    index: i,
    point: mapPoint(i),
  }));
  return (
    points.find(({ point: [px, py] }) =>
      direction === "left"
        ? px === x - 23 && py === y
        : direction === "right"
          ? px === x + 23 && py === y
          : direction === "up"
            ? px === x && py === y - 19
            : px === x && py === y + 19,
    )?.index ?? index
  );
}
