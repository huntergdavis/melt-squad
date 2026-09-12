import {
  campaign,
  inPack,
  mapPoint,
  nextRescue,
  packProgress,
  mapLandmarks,
} from "./campaign";
import { levels } from "./levels";
import { World } from "./engine";
import { Renderer } from "./render";
import type { Save } from "./save";
export const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

export function drawAtlas(
  root: HTMLElement,
  save: Save,
  worldId?: string,
  sceneId?: string,
) {
  const world = campaign.find((item) => item.id === worldId);
  if (!world) {
    const openWorlds = campaign.filter(
      (w) => inPack(w.id).length === 20,
    ).length;
    root.innerHTML = `<div class="board-heading"><div><div class="eyebrow">THE RESCUE ATLAS</div><h2>Small worlds. Big good deeds.</h2></div><span class="board-note">${openWorlds} worlds open · ${openWorlds === campaign.length ? `${levels.length} rescue calls` : "more on the way"}</span></div>
      <div class="world-atlas" aria-label="Choose a world">${campaign
        .map((item) => {
          const progress = packProgress(item.id, save);
          return `<button class="world-island ${progress.available ? "released" : "coming"}" data-world="${item.id}" style="--island:${item.color}" aria-label="World ${item.id}: ${escapeHtml(item.name)}${progress.available ? `, ${progress.done} of ${progress.available} completed` : ", coming later"}"><span class="island-number">WORLD ${item.id}</span><canvas aria-hidden="true" data-mascot="${item.mascot}"></canvas><strong>${escapeHtml(item.name)}</strong><small>${progress.complete ? "✓ EVERYBODY HELPED" : progress.available ? `${progress.done}/${progress.available} rescued · ${progress.available}/20 available` : "COMING LATER"}</small><span class="island-trail" aria-hidden="true">${progress.complete ? "★ ★ ★" : "· · · ↗"}</span></button>`;
        })
        .join("")}</div>`;
    for (const canvas of root.querySelectorAll<HTMLCanvasElement>("canvas")) {
      const render = new Renderer(canvas);
      render.resize();
      render.ctx.setTransform(
        canvas.width / 230,
        0,
        0,
        canvas.height / 140,
        0,
        0,
      );
      render.circle(115, 88, 52, "#fff8e488");
      const mascot = campaign.find(
        (item) => item.mascot === canvas.dataset.mascot,
      )!.mascot;
      render.prop(mascot, 115, 102, 0.85, true);
    }
    return;
  }
  const scenes = inPack(world.id),
    progress = packProgress(world.id, save);
  const selected =
    scenes.find((scene) => scene.id === sceneId) ??
    scenes.find((scene) => scene.id === save.lastScene) ??
    nextRescue(save, world.id, scenes) ??
    scenes[0];
  const next = nextRescue(save, world.id, scenes);
  root.innerHTML = `<div class="world-heading"><div><button class="text-button" data-action="atlas">← All worlds</button><div class="eyebrow">WORLD ${world.id} · ${progress.available}/20 SCENES AVAILABLE</div><h1>${escapeHtml(world.name)}</h1><p>${escapeHtml(world.pitch)}</p></div><div class="world-tools"><button class="quiet" data-action="map-list" aria-pressed="${!!save.mapList}">${save.mapList ? "Show world map" : "Show scene list"}</button><button class="primary" data-action="world-continue" ${!next ? "disabled" : ""}>${next ? "Continue this world ↗" : progress.complete ? "Everybody helped ✓" : progress.available ? "Available rescues complete" : "Coming later"}</button></div></div>
    <div class="world-layout"><div class="scene-map ${save.mapList ? "scene-list" : ""}" style="--island:${world.color}" aria-label="${escapeHtml(world.name)} rescue path">
      <canvas class="map-art" aria-hidden="true"></canvas><svg class="hose-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${Array.from({ length: 20 }, (_, i) => mapPoint(i).join(",")).join(" ")}" fill="none" stroke="#617c7160" stroke-width="1.5" stroke-linejoin="round"/><polyline points="${Array.from({ length: 20 }, (_, i) => mapPoint(i).join(",")).join(" ")}" fill="none" stroke="#faf8ea" stroke-width="0.5" stroke-dasharray="1 1"/></svg>
      ${Array.from({ length: 20 }, (_, i) => {
        const scene =
            world.id === "01"
              ? scenes[i]
              : scenes.find(
                  (item) =>
                    item.id === `${world.id}.${String(i + 1).padStart(2, "0")}`,
                ),
          stars = scene ? (save.stars[scene.id] ?? 0) : 0,
          [x, y] = mapPoint(i);
        return `<button class="scene-node ${stars ? "rescued" : ""} ${scene?.id === selected?.id ? "selected" : ""} ${!scene ? "unbuilt" : ""}" data-node="${i}" ${scene ? `data-scene="${scene.id}"` : 'aria-disabled="true"'} style="--x:${x}%;--y:${y}%" aria-label="Scene ${String(i + 1).padStart(2, "0")}: ${scene ? escapeHtml(scene.name) : "Coming later"}${stars ? `, completed, ${stars} stars` : scene ? ", available" : ""}" ${scene?.id === selected?.id ? 'aria-current="true"' : ""}><span class="node-circle">${stars ? "✓" : String(i + 1).padStart(2, "0")}</span><span class="node-caption">${scene ? escapeHtml(scene.name) : "Coming later"}</span><span class="node-medals" aria-hidden="true">${stars ? "★".repeat(stars) : scene?.id === next?.id ? "NEXT ↑" : ""}</span></button>`;
      }).join("")}
    </div><aside class="rescue-preview" aria-label="Selected rescue">${selected ? `<canvas id="scene-preview" aria-hidden="true"></canvas><div class="eyebrow">SCENE ${String(scenes.indexOf(selected) + 1).padStart(2, "0")} · ${selected.targets.length} LITTLE TASKS</div><h2>${escapeHtml(selected.name)}</h2><p>${escapeHtml(selected.pitch.split(". ")[0])}${selected.pitch.includes(". ") ? "." : ""}</p><small>${save.stars[selected.id] ? `${"★".repeat(save.stars[selected.id])} · Best ${Math.round(save.best[selected.id] ?? 0)}s` : "No lives. No rush. Just help."}</small><button class="primary" data-launch="${selected.id}">${save.stars[selected.id] ? "Replay rescue" : "Start this rescue"} ↗</button>` : `<div class="preview-closed">✉</div><h2>More good deeds are coming.</h2><p>This world's twenty rescues are designed, but not playable yet. No medals needed to enter when it opens.</p><button class="quiet" data-action="atlas">Explore open worlds</button>`}</aside></div>
    <p class="map-legend">✓ Rescued · Numbers: available${scenes.length < 20 ? " · Dashed: coming later" : ""}. Follow the story trail, or pick any available rescue.</p>`;
  if (selected) {
    const preview = new World(selected);
    preview.difficulty = save.difficulty ?? "easy";
    new Renderer(root.querySelector<HTMLCanvasElement>("#scene-preview")!).draw(
      preview,
      0,
      true,
    );
  }
  if (!save.mapList) {
    const canvas = root.querySelector<HTMLCanvasElement>(".map-art")!;
    const art = new Renderer(canvas);
    art.resize();
    const width = canvas.clientWidth,
      height = canvas.clientHeight;
    art.ctx.setTransform(
      canvas.width / width,
      0,
      0,
      canvas.height / height,
      0,
      0,
    );
    const scale = width < 400 ? 0.28 : 0.43;
    art.prop(
      world.mascot,
      width * 0.48,
      height * 0.25,
      scale,
      progress.done >= 4,
    );
    art.prop(
      (mapLandmarks[world.id] ?? mapLandmarks["01"])[0],
      width * 0.62,
      height * 0.44,
      scale,
      progress.done >= 8,
    );
    art.prop(
      (mapLandmarks[world.id] ?? mapLandmarks["01"])[1],
      width * 0.39,
      height * 0.63,
      scale,
      progress.done >= 12,
    );
    art.prop(
      (mapLandmarks[world.id] ?? mapLandmarks["01"])[2],
      width * 0.52,
      height * 0.8,
      scale,
      progress.complete,
    );
  }
}

export function sceneIndex(id: string) {
  return levels.findIndex((level) => level.id === id);
}
