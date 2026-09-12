import "./style.css";
import { levels } from "./levels";
import { World, requirements } from "./engine";
import { Renderer } from "./render";
import { Input } from "./input";
import { Sound } from "./audio";
import { loadSave, recordWin, writeSave } from "./save";
import { clamp, H, W } from "./types";

const $ = <T extends HTMLElement = HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!;
const save = loadSave(),
  sound = new Sound(),
  input = new Input();
sound.muted = save.muted;
let world = new World(levels[0]),
  levelIndex = 0,
  mode: "hub" | "play" = "hub";
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
      <button class="nav-item active" data-action="hub"><span>▦</span> Dispatch board <span class="nav-arrow">↗</span></button>
      <button class="nav-item" data-action="help"><span>⌘</span> Field manual</button>
      <button class="nav-item" data-action="mute"><span>♫</span> <span class="sound-label">Sound on</span></button>
    </nav>
    <div class="squad-note"><div class="mini-drop">♨</div><p>A little heat.<br>A lot of heart.</p><span>No bad guys.<br>Just very cold problems.</span></div>
    <div class="station-footer"><span id="pad-status">Keyboard ready</span><span>CLIENT-SIDE · NO SIGN-IN</span></div>
  </aside>
  <main>
    <header class="topbar"><span>THE WORLD IS A LITTLE COLD. <b>LET’S FIX THAT.</b></span><span class="progress-pill" id="total-progress">0 / 20 calls answered</span></header>
    <section id="hub" aria-label="Dispatch board">
      <div class="hero">
        <div class="hero-copy"><div class="eyebrow">YOUR NEXT SMALL GOOD DEED</div><h1>Very cold problems.<br><em>Very warm hearts.</em></h1><p>Thaw a wizard. Rescue a teacup. Give the moon a bath.<br>Grab your hose. The wonderfully weird world needs you.</p><button class="primary" data-action="continue">Start your shift <span>↗</span></button><div class="hero-controls">WASD + arrow keys <span>·</span> Gamepad ready <span>·</span> Touch friendly</div></div>
        <div class="hero-art"><canvas id="hero-canvas" aria-label="An illustrated teacup waiting for a rescue"></canvas><div class="hero-sticker">100%<br><small>GOOD INTENTIONS</small></div></div>
      </div>
      <div class="board-heading"><div><div class="eyebrow">THE DISPATCH BOARD</div><h2>Twenty calls. Plenty of heart.</h2></div><span class="board-note">Pick any call. Make a little difference.</span></div>
      <div class="filters" aria-label="Filter calls"><button class="filter active" data-filter="all">All calls <span>20</span></button><button class="filter" data-filter="new">Unanswered</button><button class="filter" data-filter="done">Completed</button></div>
      <div id="level-grid" class="level-grid"></div>
      <p class="board-footer">A small, hopeful game about making things a little better. <button data-action="credits">Made with care ↗</button></p>
    </section>
    <section id="play" hidden aria-label="Rescue mission">
      <div class="mission-heading"><div><div class="eyebrow" id="mission-number"></div><h1 id="mission-title"></h1><p id="mission-pitch"></p></div><div class="mission-actions"><button class="quiet" data-action="restart" aria-label="Restart mission">↻ <span>Restart</span></button><button class="quiet" data-action="pause">Ⅱ <span>Pause</span></button></div></div>
      <div class="game-frame"><canvas id="game" tabindex="0" aria-label="Move the nozzle with WASD or drag. Arrow up/down controls temperature; left/right controls pressure."></canvas><div class="stage-bottom"><span id="stage-state">● WATER ON</span><span id="elapsed">00:00</span><button data-action="help">Controls / help ?</button></div></div>
      <div class="instrument-bar">
        <div class="instrument"><div class="instrument-title"><label for="temperature">TEMPERATURE</label><output id="temp-value">65°</output></div><input id="temperature" class="temperature" type="range" min="-40" max="100" step="1" value="65" aria-label="Water temperature"><div class="scale"><span>−40° · FREEZE</span><span>100° · MELT</span></div></div>
        <div class="instrument"><div class="instrument-title"><label for="pressure">PRESSURE</label><output id="pressure-value">45%</output></div><input id="pressure" class="pressure" type="range" min="10" max="100" step="1" value="45" aria-label="Water pressure"><div class="scale"><span>GENTLE POUR</span><span>POWER JET</span></div></div>
        <div class="hose-controls"><button class="quiet" data-action="spray" id="spray-button">Ⅱ Water off</button><button class="quiet" data-action="straighten" title="Reset nozzle angle">↓ Aim down</button></div>
      </div>
      <div class="objectives-heading"><h2>The little things to do</h2><button data-action="hint" class="text-button">Need a hint?</button></div><div id="objectives" class="objectives"></div>
      <p id="hint" class="hint" hidden></p>
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
let filter = "all";
function persist() {
  $("#save-warning").hidden = writeSave(save);
}
function updateGlobal() {
  const count = levels.filter((l) => save.stars[l.id]).length;
  $("#total-progress").textContent = count + " / 20 calls answered";
  document
    .querySelectorAll(".sound-label")
    .forEach((el) => (el.textContent = save.muted ? "Sound off" : "Sound on"));
}
function drawBoard() {
  $("#level-grid").innerHTML = "";
  const selected = levels.filter(
    (l) =>
      filter === "all" ||
      (filter === "done" ? !!save.stars[l.id] : !save.stars[l.id]),
  );
  if (!selected.length)
    $("#level-grid").innerHTML =
      '<p class="empty">No calls here yet. Your next little good deed is on the All calls board.</p>';
  for (const l of selected) {
    const i = levels.indexOf(l),
      stars = save.stars[l.id] ?? 0;
    const button = document.createElement("button");
    button.className = "level-card";
    button.dataset.level = String(i);
    button.setAttribute(
      "aria-label",
      "Call " +
        (i + 1) +
        ": " +
        l.name +
        (stars ? ", completed with " + stars + " stars" : ""),
    );
    button.innerHTML =
      '<div class="card-art theme-' +
      l.theme +
      '"><canvas aria-hidden="true"></canvas><span class="call-number">' +
      String(i + 1).padStart(2, "0") +
      '</span><span class="card-status">' +
      (stars ? "★".repeat(stars) : "↗") +
      '</span></div><div class="card-copy"><span class="card-chapter">' +
      l.chapter +
      "</span><h3>" +
      l.name +
      '</h3><span class="card-meta">' +
      l.targets.length +
      " little " +
      (l.targets.length === 1 ? "task" : "tasks") +
      " <span>·</span> " +
      (i < 3 ? "START HERE" : "PUZZLE CALL") +
      "</span></div>";
    $("#level-grid").append(button);
    const preview = new Renderer(button.querySelector("canvas")!);
    preview.draw(new World(l), 0, true);
  }
}
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
function start(index: number) {
  if (dialog.open) closeModal();
  levelIndex = clamp(index, 0, levels.length - 1);
  world = new World(levels[levelIndex]);
  mode = "play";
  recorded = false;
  lastGoals = 0;
  input.clear();
  accumulator = 0;
  $("#hub").hidden = true;
  $("#play").hidden = false;
  $("#hint").hidden = true;
  $("#mission-number").textContent =
    "CALL " +
    String(levelIndex + 1).padStart(2, "0") +
    " / 20 · " +
    world.level.chapter.toUpperCase();
  $("#mission-title").textContent = world.level.name;
  $("#mission-pitch").textContent = world.level.pitch;
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
  if (dialog.open) closeModal();
  mode = "hub";
  input.clear();
  $("#hub").hidden = false;
  $("#play").hidden = true;
  updateGlobal();
  drawBoard();
  window.scrollTo({ top: 0 });
  $(".hero .primary").focus({ preventScroll: true });
}
function pause() {
  if (dialog.open) {
    if (modalKind !== "win") closeModal();
    return;
  }
  if (mode !== "play" || world.completed) return;
  openModal(
    "pause",
    '<div class="eyebrow">TAKE A BREATHER</div><h2>Even heroes need<br>a tea break.</h2><p>Your rescue is paused. Nothing will melt while you’re away.</p><div class="dialog-actions"><button class="primary" data-action="close">Back to the rescue ↗</button><button class="quiet" data-action="restart">Restart call</button><button class="quiet" data-action="hub">Dispatch board</button></div>',
  );
}
function win() {
  const lastLevel = levelIndex === levels.length - 1;
  openModal(
    "win",
    '<div class="win-seal">✓</div><div class="eyebrow">CALL ANSWERED. DAY IMPROVED.</div><h2>' +
      (lastLevel
        ? "A warmer world.<br>Thanks to you."
        : "A little less cold.<br>A little more lovely.") +
      '</h2><div class="win-stars" aria-label="' +
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
      (lastLevel ? "Back to the station" : "Next little good deed ↗") +
      '</button><button class="quiet" data-action="restart">Replay this call</button>' +
      (lastLevel
        ? ""
        : '<button class="text-button" data-action="hub">Dispatch board</button>') +
      "</div>",
  );
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
        ? "First: " +
          t
            .requires!.map((id) =>
              world.targets
                .find((other) => other.id === id)!
                .name.toLowerCase(),
            )
            .join(" + ")
        : requirements(t);
    row.querySelector<HTMLElement>("i")!.style.width =
      Math.round(t.progress * 100) + "%";
  }
}
function action(name: string) {
  sound.unlock();
  if (name === "hub") hub();
  else if (name === "continue")
    start(
      Math.max(
        0,
        levels.findIndex((l) => !save.stars[l.id]),
      ),
    );
  else if (name === "next") start(levelIndex + 1);
  else if (
    name === "restart" &&
    mode === "play" &&
    (!dialog.open || ["pause", "win"].includes(modalKind))
  )
    start(levelIndex);
  else if (name === "pause") pause();
  else if (name === "disconnect" && !dialog.open) pause();
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
      '<div class="eyebrow">MADE WITH CARE</div><h2>A small game.<br>A whole lot of warmth.</h2><p>Original Melt Squad characters and scenes are drawn in Canvas. Sparkle effects use the <a href="https://kenney.nl/assets/particle-pack" target="_blank" rel="noopener">Kenney Particle Pack</a>, licensed CC0. Sound is synthesized in your browser.</p><p>No accounts, analytics, model downloads, or server needed. Progress lives in this browser.</p><button class="primary" data-action="close">Back to the good deeds</button>',
    );
}
input.onAction = (name) => {
  if (name.startsWith("nav-")) {
    if (mode === "play" && !dialog.open) return;
    const root = dialog.open ? dialog : $("#hub");
    const buttons = Array.from(
      root.querySelectorAll<HTMLButtonElement>("button"),
    ).filter((b) => b.offsetParent !== null);
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
    "[data-action], [data-level], [data-filter]",
  );
  if (!button) return;
  if (button.dataset.action) {
    e.preventDefault();
    action(button.dataset.action);
  } else if (button.dataset.level) start(Number(button.dataset.level));
  else if (button.dataset.filter) {
    filter = button.dataset.filter;
    document
      .querySelectorAll(".filter")
      .forEach((el) =>
        el.classList.toggle(
          "active",
          (el as HTMLElement).dataset.filter === filter,
        ),
      );
    drawBoard();
  }
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
    if (!dialog.open) pause();
  }
});
window.addEventListener("blur", () => {
  if (!dialog.open) pause();
});
window.addEventListener("resize", () => {
  if (mode === "hub") drawBoard();
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
updateGlobal();
drawBoard();
$(".hero .primary").focus({ preventScroll: true });
requestAnimationFrame(frame);
