import { normalizeDifficulty, type Difficulty } from "./difficulty";
export interface Save {
  version: 1;
  stars: Record<string, number>;
  best: Record<string, number>;
  muted: boolean;
  lastWorld?: string;
  lastScene?: string;
  stationary?: boolean;
  untimed?: boolean;
  mapList?: boolean;
  difficulty?: Difficulty;
}
const fresh = (): Save => ({
  version: 1,
  stars: {},
  best: {},
  muted: false,
  difficulty: "easy",
});
export const SAVE_KEY = "melt-squad-v1";
export function loadSave(storage?: Pick<Storage, "getItem">): Save {
  try {
    storage ??= localStorage;
    const raw = JSON.parse(storage.getItem(SAVE_KEY) ?? "null");
    if (!raw || raw.version !== 1) return fresh();
    const save = fresh();
    save.muted = raw.muted === true;
    save.difficulty = normalizeDifficulty(raw.difficulty);
    if (typeof raw.stationary === "boolean") save.stationary = raw.stationary;
    if (typeof raw.untimed === "boolean") save.untimed = raw.untimed;
    save.mapList = raw.mapList === true;
    if (
      typeof raw.lastWorld === "string" &&
      /^(0[1-9]|1[0-9]|20)$/.test(raw.lastWorld)
    )
      save.lastWorld = raw.lastWorld;
    if (
      typeof raw.lastScene === "string" &&
      /^[a-z0-9.-]{1,60}$/.test(raw.lastScene)
    )
      save.lastScene = raw.lastScene;
    for (const [id, value] of Object.entries(raw.stars ?? {}))
      if (
        typeof value === "number" &&
        Number.isInteger(value) &&
        value >= 1 &&
        value <= 3
      )
        save.stars[id] = value;
    for (const [id, value] of Object.entries(raw.best ?? {}))
      if (typeof value === "number" && Number.isFinite(value) && value > 0)
        save.best[id] = value;
    return save;
  } catch {
    return fresh();
  }
}
export function writeSave(
  save: Save,
  storage?: Pick<Storage, "setItem">,
): boolean {
  try {
    (storage ?? localStorage).setItem(SAVE_KEY, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}
export function recordWin(
  save: Save,
  id: string,
  stars: number,
  seconds: number,
) {
  save.stars[id] = Math.max(save.stars[id] ?? 0, stars);
  save.best[id] = Math.min(save.best[id] ?? Infinity, seconds);
}
