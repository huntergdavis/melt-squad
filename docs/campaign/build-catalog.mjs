// Design-document tooling only. This does not modify the game or its catalog.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sources = readdirSync(here).filter((name) => /^\d.*\.json$/.test(name)).sort();
const packs = sources.flatMap((name) => {
  const document = JSON.parse(readFileSync(resolve(here, name), "utf8"));
  if (!Array.isArray(document.packs)) throw new Error(name + ": missing packs array");
  return document.packs;
}).sort((a, b) => Number(a.id) - Number(b.id));
const systems = {
  FLOW: "Persistent water flow and connected channels/basins",
  MOTION: "Moving target zones and deterministic mechanical motion",
  BALANCE: "Mass, buoyancy, weights, and physical supports",
  OPTICS: "Beam reflection/refraction and detectors",
  PHASE: "Reversible completed structures and coupled temperature states",
  PULSE: "Timed or rhythmic gates, with an untimed accessibility mode"
};
const themes = ["kitchen", "cave", "garden", "cosmos", "town"];
const errors = [];
const titles = new Set();
const required = (object, key, at) => {
  if (typeof object[key] !== "string" || !object[key].trim()) errors.push(at + ": missing " + key);
};
for (const [index, pack] of packs.entries()) {
  const expected = String(index + 2).padStart(2, "0");
  if (pack.id !== expected) errors.push("Expected pack " + expected + ", found " + pack.id);
  for (const key of ["title", "premise", "arc", "signature"]) required(pack, key, pack.id);
  if (!Array.isArray(pack.newArt) || pack.newArt.length < 3 || pack.newArt.some(x => typeof x !== "string" || !x.trim())) errors.push(pack.id + ": incomplete reusable art kit");
  if (!Array.isArray(pack.scenes) || pack.scenes.length !== 20) { errors.push(pack.id + ": needs exactly 20 scenes"); continue; }
  const influences = new Set();
  for (const [sceneIndex, scene] of pack.scenes.entries()) {
    const id = pack.id + "." + String(sceneIndex + 1).padStart(2, "0");
    if (scene.id !== id) errors.push(id + ": missing, duplicate, or out-of-order ID");
    for (const key of ["title", "setup", "puzzle", "payoff"]) required(scene, key, id);
    const normalized = String(scene.title).toLowerCase().replace(/[^a-z0-9]/g, "");
    if (titles.has(normalized)) errors.push(id + ": duplicate scene title " + scene.title);
    titles.add(normalized);
    if (!Array.isArray(scene.crossover) || !scene.crossover.length || scene.crossover.some(x => !themes.includes(x))) errors.push(id + ": invalid theme crossovers");
    else scene.crossover.forEach(x => influences.add(x));
    if (!Array.isArray(scene.requires) || scene.requires.some(x => !systems[x]) || new Set(scene.requires).size !== scene.requires.length) errors.push(id + ": invalid dependency tags");
    const words = [scene.setup, scene.puzzle, scene.payoff].join(" ").trim().split(/\s+/).length;
    if (words < 40) errors.push(id + ": too thin to implement (" + words + " words)");
  }
  if (pack.scenes.filter(s => Array.isArray(s.requires) && s.requires.length === 0).length < 16) errors.push(pack.id + ": fewer than 16 current-rules scenes");
  if (influences.size < 3) errors.push(pack.id + ": needs at least three existing-theme influences");
}
if (packs.length !== 19) errors.push("Expected 19 new campaign levels, found " + packs.length);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

const all = packs.flatMap(p => p.scenes);
const current = all.filter(s => !s.requires.length).length;
const optional = all.length - current;
const step = (i) => i <= 4 ? "Introduction" : i <= 8 ? "Remix" : i <= 12 ? "Crossover" : i <= 16 ? "Complication" : i <= 19 ? "Synthesis" : "Finale";
const slug = (p) => "level-" + p.id;
const lines = [
  "# Melt Squad — the next 380 scenes",
  "",
  "> Authored design baseline. See the [release ledger](../RELEASES.md) for implementation and deployment status.",
  "> Level 01 is the existing 20-scene collection. Levels 02–20 below add 380 scenes, for 400 total.",
  "",
  "Each campaign level is a themed 20-scene pack. Runtime code still calls individual scenes levels; this document does not rename shipped save IDs.",
  "",
  "**Design-time readiness:** " + current + " scenes fit the original target rules; " + optional + " were designed with additional-system dependencies. These classifications are not live release status. Every scene needs authored layouts, artwork, scripted payoffs, integration, and playtesting before release.",
  "",
  "Start with the [campaign plan](../CAMPAIGN_BACKLOG.md). Source cards are the numbered JSON files in this directory; regenerate/check with node docs/campaign/build-catalog.mjs or its --check flag.",
  "",
  "## Campaign index",
  "",
  "| Level | Theme | Scenes | Current rules | Future systems |",
  "| --- | --- | ---: | ---: | ---: |",
  ...packs.map(p => "| " + p.id + " | [" + p.title + "](#" + slug(p) + ") | 20 | " + p.scenes.filter(s => !s.requires.length).length + " | " + p.scenes.filter(s => s.requires.length).length + " |"),
  "",
  "## Future-system registry",
  "",
  ...Object.entries(systems).map(([id, description]) => "- **" + id + "** — " + description + "."),
  "",
  "These tags name engineering dependencies at design time; the release ledger records which have since been implemented. Unbuilt scenes must not block a playable pack. Completed constructions stay stable unless a scene explicitly uses PHASE; target prerequisites do not act as physical barriers.",
  ""
];
for (const p of packs) {
  lines.push('<a id="' + slug(p) + '"></a>', "", "## Level " + p.id + " — " + p.title, "",
    "**Premise.** " + p.premise, "", "**Story arc.** " + p.arc, "", "**Signature.** " + p.signature, "",
    "**Reusable art kit:** " + p.newArt.join("; ") + ".", "");
  for (const [i, s] of p.scenes.entries()) {
    const global = (Number(p.id) - 1) * 20 + i + 1;
    lines.push("### " + s.id + " — " + s.title, "",
      "Scene " + String(global).padStart(3, "0") + " of 400 · " + step(i + 1) + " · " + (s.requires.length ? "FUTURE: " + s.requires.join(" + ") : "CURRENT RULES") + " · Mix: " + s.crossover.join(" + "),
      "", "**Setup.** " + s.setup, "", "**Puzzle.** " + s.puzzle, "", "**Payoff.** " + s.payoff, "");
  }
}
const output = lines.join("\n");
const target = resolve(here, "SCENE_CATALOG.md");
if (process.argv.includes("--check")) {
  if (readFileSync(target, "utf8") !== output) throw new Error("SCENE_CATALOG.md is stale; regenerate it.");
} else writeFileSync(target, output);
console.log(JSON.stringify({
  packs: packs.length, newScenes: all.length, existingScenes: 20, totalScenes: all.length + 20,
  currentRules: current, futureScenes: optional,
  dependencyScenes: Object.fromEntries(Object.keys(systems).map(id => [id, all.filter(s => s.requires.includes(id)).length])),
  packCounts: packs.map(p => ({ id: p.id, title: p.title, current: p.scenes.filter(s => !s.requires.length).length, future: p.scenes.filter(s => s.requires.length).length }))
}, null, 2));
