import "./style.css";
import "./atlas.css";
import { levels } from "./levels";
import { World, requirements } from "./engine";
import { Renderer } from "./render";
import { Input } from "./input";
import { Sound } from "./audio";
import { loadSave, recordWin, writeSave } from "./save";
import { clamp, H, W } from "./types";
import { campaign, inPack, mapNeighbor, nextRescue, packOf } from "./campaign";
import { drawAtlas, escapeHtml, sceneIndex } from "./atlas";

const $ = <T extends HTMLElement = HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!;
const save = loadSave(),
  sound = new Sound(),
  input = new Input();
sound.muted = save.muted;
save.stationary ??= window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
save.untimed ??= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let world = new World(levels[0]),
  levelIndex = 0,
  mode: "hub" | "play" = "hub";
let currentWorld: string | undefined,
  selectedScene: string | undefined,
  started = false;
let focusPreview = false;
let recorded = false,
  lastGoals = 0,
  modalKind = "",
  oldFocus: HTMLElement | null = null;
let last = 0,
  accumulator = 0,
  hudTime = 0;
const icon =
  '<img src="' +
  import.meta.env.BASE_URL +
  'icon.svg" alt="" width="44" height="44">';
$("#app").innerHTML = `
  <aside class="sidebar">
    <a class="brand" href="#dispatch" data-action="hub">${icon}<span>MELT<br>SQUAD<span class="brand-small">THERMAL RESCUE DIVISION</span></span></a>
    <div class="station-label"><span class="status-dot"></span> STATION 07 · ON CALL</div>
    <nav aria-label="Main navigation">
      <button class="nav-item active" data-action="atlas"><span>▦</span> Rescue atlas <span class="nav-arrow">↗</span></button>
      <button class="nav-item" data-action="help"><span>⌘</span> Field manual</button>
      <button class="nav-item" data-action="mute"><span>♫</span> <span class="sound-label">Sound on</span></button>
      <button class="nav-item" data-action="credits"><span>♡</span> Credits & licenses</button>
    </nav>
    <div class="squad-note"><div class="mini-drop">♨</div><p>A little heat.<br>A lot of heart.</p><span>No bad guys.<br>Just very cold problems.</span></div>
    <div class="station-footer"><span id="pad-status">Keyboard ready</span><span>CLIENT-SIDE · NO SIGN-IN</span></div>
  </aside>
  <main>
    <header class="topbar"><span>THE WORLD IS A LITTLE COLD. <b>LET’S FIX THAT.</b></span><span class="progress-pill" id="total-progress"></span></header>
    <section id="hub" aria-label="Dispatch board">
      <div class="hero">
        <div class="hero-copy"><div class="eyebrow">YOUR NEXT SMALL GOOD DEED</div><h1>Very cold problems.<br><em>Very warm hearts.</em></h1><p>Thaw a wizard. Rescue a teacup. Give the moon a bath.<br>Grab your hose. The wonderfully weird world needs you.</p><button class="primary" data-action="continue">Start your shift <span>↗</span></button><div class="hero-controls">WASD + arrow keys <span>·</span> Gamepad ready <span>·</span> Touch friendly</div></div>
        <div class="hero-art"><canvas id="hero-canvas" aria-label="An illustrated teacup waiting for a rescue"></canvas><div class="hero-sticker">100%<br><small>GOOD INTENTIONS</small></div></div>
      </div>
      <div id="atlas"></div>
      <p class="board-footer">A small, hopeful game about making things a little better. <button data-action="credits">Made with care ↗</button></p>
    </section>
    <section id="play" hidden aria-label="Rescue mission">
      <div class="mission-heading"><div><div class="eyebrow" id="mission-number"></div><h1 id="mission-title"></h1><p id="mission-pitch"></p></div><div class="mission-actions"><button class="quiet" data-action="hub">← World map</button><button class="quiet" data-action="restart" aria-label="Restart mission">↻ <span>Restart</span></button><button class="quiet" data-action="pause">Ⅱ <span>Pause</span></button></div></div>
      <div class="game-frame"><canvas id="game" tabindex="0" aria-label="Move the nozzle with WASD or drag. Arrow up/down controls temperature; left/right controls pressure."></canvas><div class="stage-bottom"><span id="stage-state">● WATER ON</span><span id="elapsed">00:00</span><button data-action="help">Controls / help ?</button></div></div>
      <div class="instrument-bar">
        <div class="instrument"><div class="instrument-title"><label for="temperature">TEMPERATURE</label><output id="temp-value">65°</output></div><input id="temperature" class="temperature" type="range" min="-40" max="100" step="1" value="65" aria-label="Water temperature"><div class="scale"><span>−40° · FREEZE</span><span>100° · MELT</span></div></div>
        <div class="instrument"><div class="instrument-title"><label for="pressure">PRESSURE</label><output id="pressure-value">45%</output></div><input id="pressure" class="pressure" type="range" min="10" max="100" step="1" value="45" aria-label="Water pressure"><div class="scale"><span>GENTLE POUR</span><span>POWER JET</span></div></div>
        <div class="hose-controls"><button class="quiet" data-action="spray" id="spray-button">Ⅱ Water off</button><button class="quiet" data-action="straighten" title="Reset nozzle angle">↓ Aim down</button></div>
      </div>
      <div class="objectives-heading"><h2>The little things to do</h2><button data-action="hint" class="text-button">Need a hint?</button></div><div id="objectives" class="objectives"></div>
      <p id="hint" class="hint" hidden></p>
      <button id="motion-assist" class="quiet" data-action="motion-assist" hidden></button>
      <button id="pulse-assist" class="quiet" data-action="pulse-assist" hidden></button>
      <p class="control-strip"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move</span><span><kbd>↑</kbd><kbd>↓</kbd> temperature</span><span><kbd>←</kbd><kbd>→</kbd> pressure</span><span><kbd>Q</kbd><kbd>E</kbd> tilt</span><span><kbd>Space</kbd> water</span><span>or drag the nozzle + use the sliders</span></p>
    </section>
    <p id="save-warning" class="hint" hidden>Browser storage is unavailable. You can keep playing, but this session’s medals will not survive a reload.</p>
    <div id="announcement" class="sr-only" role="status" aria-live="polite"></div>
  </main>
  <dialog id="modal"><div id="modal-content"></div></dialog>
`;
const renderer = new Renderer($("#game")),
  heroRenderer = new Renderer($("#hero-canvas"));
const dialog = $<HTMLDialogElement>("#modal");
input.acceptsGameplay = () => mode === "play" && !dialog.open;
const heroWorld = new World(levels[0]);
heroWorld.nozzle.x = 315;
heroWorld.nozzle.y = 180;
function persist() {
  $("#save-warning").hidden = writeSave(save);
}
function updateGlobal() {
  const count = levels.filter((l) => save.stars[l.id]).length;
  $("#total-progress").textContent =
    count + " / " + levels.length + " calls answered";
  const next = nextRescue(save);
  $(".hero .primary").textContent = next
    ? save.lastScene
      ? "Continue adventure ↗"
      : "Start your shift ↗"
    : "All available rescues complete ✓";
  document
    .querySelectorAll(".sound-label")
    .forEach((el) => (el.textContent = save.muted ? "Sound off" : "Sound on"));
}
function drawBoard() {
  $("#hub .hero").hidden = !!currentWorld;
  drawAtlas($("#atlas"), save, currentWorld, selectedScene);
}
function navigate(hash: string) {
  if (location.hash === hash) route();
  else location.hash = hash;
}
function route() {
  const parts = location.hash.slice(1).split("/");
  if (parts[0] === "play") {
    const index = sceneIndex(parts[1]);
    if (index >= 0) {
      start(index);
      return;
    }
  }
  const valid = campaign.some((item) => item.id === parts[1]);
  currentWorld = parts[0] === "world" && valid ? parts[1] : undefined;
  selectedScene =
    parts[2] === "scene" &&
    levels.some(
      (level) => level.id === parts[3] && packOf(level) === currentWorld,
    )
      ? parts[3]
      : undefined;
  if (selectedScene) {
    save.lastWorld = currentWorld;
    save.lastScene = selectedScene;
  }
  if (dialog.open) closeModal();
  mode = "hub";
  input.clear();
  accumulator = 0;
  $("#hub").hidden = false;
  $("#play").hidden = true;
  updateGlobal();
  drawBoard();
  persist();
  const focus = focusPreview
    ? document.querySelector<HTMLElement>("[data-launch]")
    : selectedScene
      ? document.querySelector<HTMLElement>(`[data-scene="${selectedScene}"]`)
      : currentWorld
        ? $(".scene-node.selected, .scene-node")
        : $(".hero .primary");
  focusPreview = false;
  focus?.focus({ preventScroll: true });
  if (parts[0] && parts[0] !== "atlas" && !(parts[0] === "world" && valid))
    $("#announcement").textContent =
      "That destination isn't available. Here is the rescue atlas.";
}
window.addEventListener("hashchange", route);
function closeModal() {
  dialog.close();
  modalKind = "";
  input.clear();
  accumulator = 0;
  oldFocus?.focus({ preventScroll: true });
}
function openModal(kind: string, html: string) {
  if (!dialog.open) oldFocus = document.activeElement as HTMLElement;
  modalKind = kind;
  input.clear();
  $("#modal-content").innerHTML = html;
  if (!dialog.open) dialog.showModal();
  dialog.querySelector<HTMLButtonElement>("button")?.focus();
}
function showHelp() {
  openModal(
    "help",
    '<div class="eyebrow">THE FIELD MANUAL</div><h2>A hose. Two sticks.<br>Endless good intentions.</h2><p>Move above a target and let the water do its thing. The nozzle points down; tilt it when a tricky angle calls for it.</p><div class="manual-grid"><div><h3>Keyboard</h3><p>WASD — move nozzle<br>↑ / ↓ — hotter / colder<br>← / → — less / more pressure<br>Q / E — tilt nozzle<br>Space — toggle water<br>R — restart · Esc — pause</p></div><div><h3>Gamepad</h3><p>Left stick — move nozzle<br>Right stick ↕ — temperature<br>Right stick ↔ — pressure<br>LB / RB — tilt nozzle<br>A / Cross — water / confirm<br>X / Square — restart<br>B / Circle or Start — pause<br>D-pad — navigate menus</p></div></div><p><b>Mouse / touch:</b> drag anywhere in the scene to move the nozzle. Use the temperature and pressure sliders below it.</p><div class="manual-verbs"><span>❄ Below −10° builds ice</span><span>♨ Above 10° melts ice</span><span>↗ 70% pressure spins wheels</span></div><p>Warming tasks show their safe temperature and pressure range. Completed structures stay stable. There are no lives to lose; restart or replay any call. Earn a rescue star by finishing, a second within 1.8× the par time, and a third within par with fewer than 60 wrong-setting droplet hits.</p><button class="primary" data-action="close">Got it. Let’s help someone.</button>',
  );
}
function start(index: number, restart = false) {
  if (dialog.open) closeModal();
  const resume =
    started && index === levelIndex && !world.completed && !restart;
  levelIndex = clamp(index, 0, levels.length - 1);
  if (!resume) {
    world = new World(levels[levelIndex]);
    recorded = false;
    lastGoals = 0;
  }
  started = true;
  world.stationary = !!save.stationary;
  world.untimed = !!save.untimed;
  currentWorld = packOf(world.level);
  selectedScene = world.level.id;
  save.lastWorld = currentWorld;
  save.lastScene = selectedScene;
  persist();
  updateGlobal();
  mode = "play";
  input.clear();
  accumulator = 0;
  $("#hub").hidden = true;
  $("#play").hidden = false;
  $("#hint").hidden = true;
  $("#mission-number").textContent =
    "WORLD " +
    currentWorld +
    " · SCENE " +
    String(inPack(currentWorld).indexOf(world.level) + 1).padStart(2, "0") +
    " / 20";
  $("#mission-title").textContent = world.level.name;
  $("#mission-pitch").textContent = world.level.pitch;
  $("#motion-assist").hidden = !world.targets.some((t) => t.motion);
  $("#pulse-assist").hidden = !world.targets.some((t) => t.pulse);
  updateAssist();
  $("#objectives").innerHTML = world.targets
    .map(
      (t, i) =>
        '<div class="objective" id="objective-' +
        t.id +
        '"><span class="objective-number">' +
        (i + 1) +
        "</span><div><strong>" +
        t.name +
        '</strong><small></small><div class="objective-track"><i></i></div></div></div>',
    )
    .join("");
  $("#announcement").textContent =
    "Call " + (levelIndex + 1) + ". " + world.level.pitch;
  window.scrollTo({ top: 0 });
  $("#game").focus({ preventScroll: true });
  sound.unlock();
  updateHUD();
}
function hub() {
  navigate(
    currentWorld
      ? `#world/${currentWorld}${selectedScene ? "/scene/" + selectedScene : ""}`
      : "#atlas",
  );
}
function updateAssist() {
  for (const button of document.querySelectorAll<HTMLElement>(
    '[data-action="motion-assist"]',
  )) {
    button.textContent = save.stationary
      ? "Stationary assist: on · Let the targets move"
      : "Want a steadier target? Turn on stationary assist";
    button.setAttribute("aria-pressed", String(!!save.stationary));
  }
  for (const button of document.querySelectorAll<HTMLElement>(
    '[data-action="pulse-assist"]',
  )) {
    button.textContent = save.untimed
      ? "Untimed assist: on · Bring back the beat"
      : "Your pace, your show · Turn on untimed assist";
    button.setAttribute("aria-pressed", String(!!save.untimed));
  }
}
function pause() {
  if (dialog.open) {
    if (modalKind !== "win") closeModal();
    return;
  }
  if (mode !== "play") {
    if (currentWorld) navigate("#atlas");
    return;
  }
  if (world.completed) return;
  openModal(
    "pause",
    '<div class="eyebrow">TAKE A BREATHER</div><h2>Even heroes need<br>a tea break.</h2><p>Your rescue is paused. Nothing will melt while you’re away.</p><div class="dialog-actions"><button class="primary" data-action="close">Back to the rescue ↗</button><button class="quiet" data-action="restart">Restart call</button><button class="quiet" data-action="hub">World map</button>' +
      (world.targets.some((t) => t.motion)
        ? '<button class="quiet" data-action="motion-assist">Stationary assist</button>'
        : "") +
      (world.targets.some((t) => t.pulse)
        ? '<button class="quiet" data-action="pulse-assist">Untimed assist</button>'
        : "") +
      "</div>",
  );
  updateAssist();
}
function win() {
  const lastLevel = levelIndex === levels.length - 1;
  openModal(
    "win",
    '<div class="win-seal">✓</div><div class="eyebrow">CALL ANSWERED. DAY IMPROVED.</div><h2>' +
      (lastLevel
        ? "A warmer world.<br>Thanks to you."
        : "A little less cold.<br>A little more lovely.") +
      "</h2>" +
      (world.level.stamp
        ? '<canvas id="postcard" class="win-postcard" aria-label="Your rescue postcard"></canvas><div class="postcard-stamp">' +
          escapeHtml(world.level.stamp) +
          "</div>"
        : "") +
      '<div class="win-stars" aria-label="' +
      world.stars +
      ' stars">' +
      "★".repeat(world.stars) +
      "<span>" +
      "☆".repeat(3 - world.stars) +
      "</span></div><p>" +
      world.level.ending +
      '</p><div class="win-stats"><span>' +
      formatTime(world.elapsed) +
      "<small>YOUR TIME</small></span><span>" +
      Math.round(world.water) +
      " L<small>WATER USED</small></span><span>" +
      formatTime(world.level.par) +
      '<small>3-STAR PAR</small></span></div><div class="dialog-actions"><button class="primary" data-action="' +
      (lastLevel ? "hub" : "next") +
      '">' +
      (lastLevel ? "Back to the world map" : "Next little good deed ↗") +
      '</button><button class="quiet" data-action="restart">Replay this call</button>' +
      (lastLevel
        ? ""
        : '<button class="text-button" data-action="hub">World map</button>') +
      "</div>",
  );
  const postcard = document.querySelector<HTMLCanvasElement>("#postcard");
  if (postcard) new Renderer(postcard).draw(world, 0, true);
}
function formatTime(time: number) {
  return (
    String(Math.floor(time / 60)).padStart(2, "0") +
    ":" +
    String(Math.floor(time % 60)).padStart(2, "0")
  );
}
function updateHUD() {
  const n = world.nozzle;
  $("#temp-value").textContent = Math.round(n.temp) + "°";
  $("#pressure-value").textContent = Math.round(n.pressure) + "%";
  $<HTMLInputElement>("#temperature").value = String(Math.round(n.temp));
  $<HTMLInputElement>("#pressure").value = String(Math.round(n.pressure));
  $("#stage-state").textContent = n.on
    ? n.temp < 0
      ? "● FREEZE STREAM"
      : n.temp < 55
        ? "● WARM STREAM"
        : "● HOT STREAM"
    : "○ WATER OFF";
  $("#spray-button").textContent = n.on ? "Ⅱ Water off" : "▶ Water on";
  $("#elapsed").textContent = formatTime(world.elapsed);
  for (const t of world.targets) {
    const row = $("#objective-" + t.id),
      available = world.available(t);
    row.classList.toggle("complete", t.done);
    row.classList.toggle("locked", !available);
    row.querySelector(".objective-number")!.textContent = t.done
      ? "✓"
      : String(world.targets.indexOf(t) + 1);
    row.querySelector("small")!.textContent = t.done
      ? "A little good deed, done."
      : !available
        ? world.waitingFor(t)
        : (t.pulse && !world.untimed
            ? world.pulseOpen(t)
              ? "GO · "
              : "REST · "
            : "") + requirements(t, world.untimed);
    row.querySelector<HTMLElement>("i")!.style.width =
      Math.round(t.progress * 100) + "%";
  }
}
function action(name: string) {
  sound.unlock();
  if (name === "hub") hub();
  else if (name === "atlas") navigate("#atlas");
  else if (name === "continue" || name === "world-continue") {
    const next = nextRescue(
      save,
      name === "world-continue" ? currentWorld : save.lastWorld,
      name === "world-continue" ? inPack(currentWorld ?? "01") : levels,
    );
    if (next) navigate("#play/" + next.id);
    else navigate("#atlas");
  } else if (name === "next") {
    if (levels[levelIndex + 1]) navigate("#play/" + levels[levelIndex + 1].id);
    else hub();
  } else if (name === "map-list") {
    save.mapList = !save.mapList;
    persist();
    drawBoard();
    $("[data-action=map-list]").focus();
  } else if (name === "motion-assist") {
    save.stationary = !save.stationary;
    world.stationary = !!save.stationary;
    persist();
    updateAssist();
  } else if (name === "pulse-assist") {
    save.untimed = !save.untimed;
    world.untimed = !!save.untimed;
    persist();
    updateAssist();
    updateHUD();
  } else if (
    name === "restart" &&
    mode === "play" &&
    (!dialog.open || ["pause", "win"].includes(modalKind))
  )
    start(levelIndex, true);
  else if (name === "pause") pause();
  else if (name === "disconnect" && mode === "play" && !dialog.open) pause();
  else if (name === "help") showHelp();
  else if (name === "close") closeModal();
  else if (name === "hint") {
    $("#hint").textContent = world.level.hint;
    $("#hint").hidden = !$("#hint").hidden;
  } else if (name === "spray" && mode === "play" && !dialog.open) {
    world.nozzle.on = !world.nozzle.on;
    updateHUD();
  } else if (name === "straighten") world.nozzle.angle = 0;
  else if (name === "mute") {
    save.muted = !save.muted;
    sound.muted = save.muted;
    persist();
    updateGlobal();
  } else if (name === "credits")
    openModal(
      "credits",
      `<div class="eyebrow">MADE WITH CARE</div><h2>A small game.<br>A whole lot of warmth.</h2>
      <p>Melt Squad by Hunter Davis. Original characters, world maps, and scenes are drawn in Canvas and CSS. Sound is synthesized in your browser.</p>
      <ul class="credits-list">
        <li><strong>Kenney Particle Pack</strong> — sparkle sprite, CC0. <a href="${import.meta.env.BASE_URL}art/License.txt" target="_blank" rel="noopener">Read the license</a> · <a href="https://kenney.nl/assets/particle-pack" target="_blank" rel="noopener">Original artwork</a></li>
        <li><strong>DM Sans</strong> — The DM Sans Project Authors, SIL Open Font License 1.1. <a href="${import.meta.env.BASE_URL}fonts/dm-sans-license.txt" target="_blank" rel="noopener">Read the license</a></li>
        <li><strong>Outfit</strong> — The Outfit Project Authors, SIL Open Font License 1.1. <a href="${import.meta.env.BASE_URL}fonts/outfit-license.txt" target="_blank" rel="noopener">Read the license</a></li>
      </ul><p>Built with TypeScript and Vite; tested with Vitest and Playwright. Thank you to the open-source creators who help little games exist.</p>
      <p>No accounts, analytics, or server needed. Your progress stays in this browser.</p><button class="primary" data-action="close">Back to the good deeds</button>`,
    );
}
input.onAction = (name) => {
  if (name.startsWith("nav-")) {
    if (mode === "play" && !dialog.open) return;
    const root = dialog.open ? dialog : $("#hub");
    const focused = document.activeElement as HTMLElement;
    if (!dialog.open && focused?.dataset.node && !save.mapList) {
      const index = mapNeighbor(Number(focused.dataset.node), name.slice(4));
      if (index === Number(focused.dataset.node)) {
        const escape =
          name === "nav-down" || name === "nav-right"
            ? "[data-launch]"
            : "[data-action=map-list]";
        (
          document.querySelector<HTMLElement>(escape) ??
          document.querySelector<HTMLElement>("[data-action=atlas]")
        )?.focus();
        return;
      }
      document.querySelector<HTMLElement>(`[data-node="${index}"]`)?.focus();
      return;
    }
    const buttons = Array.from(
      root.querySelectorAll<HTMLButtonElement>("button, a"),
    ).filter((b) => b.offsetParent !== null && !b.hasAttribute("disabled"));
    const current = buttons.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const delta = name === "nav-up" || name === "nav-left" ? -1 : 1;
    buttons[(current + delta + buttons.length) % buttons.length]?.focus();
  } else if (name === "confirm") {
    if (dialog.open || mode === "hub")
      (document.activeElement as HTMLElement)?.click();
    else action("spray");
  } else action(name);
};
document.addEventListener("click", (e) => {
  const button = (e.target as HTMLElement).closest<HTMLElement>(
    "[data-action], [data-world], [data-scene], [data-launch]",
  );
  if (!button) return;
  if (button.dataset.action) {
    e.preventDefault();
    action(button.dataset.action);
  } else if (button.dataset.world) navigate("#world/" + button.dataset.world);
  else if (button.dataset.scene) {
    focusPreview = true;
    navigate(`#world/${currentWorld}/scene/${button.dataset.scene}`);
  } else if (button.dataset.launch) navigate("#play/" + button.dataset.launch);
});
document.addEventListener("keydown", (e) => {
  if (
    (mode !== "hub" && !dialog.open) ||
    !e.code.startsWith("Arrow") ||
    e.target instanceof HTMLInputElement
  )
    return;
  e.preventDefault();
  input.onAction("nav-" + e.code.slice(5).toLowerCase());
});
document.addEventListener("pointerdown", () => sound.unlock(), { once: true });
document.addEventListener("keydown", () => sound.unlock(), { once: true });
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  if (modalKind !== "win") closeModal();
});
for (const id of ["temperature", "pressure"] as const) {
  $("#" + id).addEventListener("input", () => {
    world.nozzle[id === "temperature" ? "temp" : "pressure"] = Number(
      $<HTMLInputElement>("#" + id).value,
    );
    updateHUD();
  });
}
let pointer: number | null = null;
const movePointer = (e: PointerEvent) => {
  if (mode !== "play" || dialog.open) return;
  const rect = renderer.canvas.getBoundingClientRect();
  world.nozzle.x = clamp(
    ((e.clientX - rect.left) / rect.width) * W,
    55,
    W - 55,
  );
  world.nozzle.y = clamp(
    ((e.clientY - rect.top) / rect.height) * H,
    72,
    H - 65,
  );
};
renderer.canvas.addEventListener("pointerdown", (e) => {
  pointer = e.pointerId;
  renderer.canvas.setPointerCapture(pointer);
  movePointer(e);
  renderer.canvas.focus({ preventScroll: true });
});
renderer.canvas.addEventListener("pointermove", (e) => {
  if (pointer === e.pointerId) movePointer(e);
});
renderer.canvas.addEventListener("pointerup", () => {
  pointer = null;
});
renderer.canvas.addEventListener("pointercancel", () => {
  pointer = null;
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    input.clear();
    if (mode === "play" && !dialog.open) pause();
  }
});
window.addEventListener("blur", () => {
  if (mode === "play" && !dialog.open) pause();
});
window.addEventListener("resize", () => {
  if (mode === "hub" && !dialog.open) {
    const active = document.activeElement as HTMLElement;
    const identity = ["scene", "world", "action", "node"].find(
      (key) => active.dataset?.[key],
    );
    const value = identity ? active.dataset[identity] : undefined;
    drawBoard();
    if (identity && value)
      document
        .querySelector<HTMLElement>(`[data-${identity}="${value}"]`)
        ?.focus({ preventScroll: true });
  }
});
function frame(now: number) {
  const dt = Math.min((now - (last || now)) / 1000, 0.05);
  last = now;
  const controls = input.poll();
  $("#pad-status").textContent = input.padName;
  if (mode === "play") {
    if (!dialog.open) {
      accumulator += dt;
      while (accumulator >= 1 / 60) {
        world.update(1 / 60, controls);
        accumulator -= 1 / 60;
      }
      const done = world.targets.filter((t) => t.done).length;
      if (done > lastGoals) {
        sound.play(world.completed ? "win" : "goal");
        lastGoals = done;
        $("#announcement").textContent =
          done + " of " + world.targets.length + " tasks complete.";
      }
      if (world.completed && !recorded) {
        recorded = true;
        recordWin(save, world.level.id, world.stars, world.elapsed);
        persist();
        updateGlobal();
      }
      if (world.completed && world.celebration > 2) win();
    }
    renderer.draw(world, now / 1000);
    hudTime += dt;
    if (hudTime > 0.1) {
      updateHUD();
      hudTime = 0;
    }
  } else heroRenderer.draw(heroWorld, now / 1000, true);
  requestAnimationFrame(frame);
}
route();
requestAnimationFrame(frame);
