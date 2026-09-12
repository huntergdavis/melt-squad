export type Difficulty = "easy" | "normal" | "impossible";
export const difficultyLabels: Record<Difficulty, string> = {
  easy: "Easy",
  normal: "Normal",
  impossible: "Impossible Challenge",
};
export function normalizeDifficulty(value: unknown): Difficulty {
  return value === "normal" || value === "impossible" ? value : "easy";
}
