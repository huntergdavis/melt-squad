import type { Renderer } from "../render";
import type { World } from "../engine";

/** The water surface and model feet use the same physical coordinates as the
 * displaced-volume simulation. No decorative bobbing or delayed reveal. */
export function drawBuoyancy(r: Renderer, world: World, time: number) {
  const plan = world.level.buoyancy,
    state = world.buoyancy;
  if (!plan || !state || !state.valid) return;
  const c = r.ctx;
  const { basin, pontoon } = plan;
  const center = pontoon.x + pontoon.w / 2;
  c.save();
  c.textAlign = "right";
  c.font = "bold 12px system-ui";
  c.fillStyle = "#426b6b";
  c.fillText("FULL", basin.x - 19, basin.y + 5);
  r.line([basin.x - 11, basin.y, basin.x - 3, basin.y], "#426b6b", 3);
  const dockX = basin.x + basin.w + 15;
  r.round(dockX, plan.dockY, 104, 12, 4, "#b18867", "#766852");
  r.line(
    [dockX + 12, plan.dockY + 12, dockX + 12, basin.y + basin.h],
    "#b18867",
    8,
  );
  r.line(
    [dockX + 91, plan.dockY + 12, dockX + 91, basin.y + basin.h],
    "#b18867",
    8,
  );
  r.round(
    dockX - 1,
    plan.dockY - 33,
    112,
    24,
    7,
    state.docked ? "#d3edc7" : "#fff0cf",
    "#7c8c7a",
  );
  c.textAlign = "center";
  c.fillStyle = "#365b5b";
  c.fillText(
    state.docked ? "LEVEL ✓" : "DOCK MARK",
    dockX + 55,
    plan.dockY - 17,
  );
  c.setLineDash([5, 6]);
  r.line(
    [pontoon.x - 15, plan.dockY, dockX - 2, plan.dockY],
    state.docked ? "#5c936d" : "#739e9e",
    2,
  );
  c.setLineDash([]);
  const fill = world.targets.find((t) => t.id === plan.fillTarget);
  if ((fill?.progress ?? 0) > 0)
    r.line(
      [basin.x + 3, state.waterY, basin.x + basin.w - 3, state.waterY],
      "#77c5d9",
      3,
    );
  if (state.active) {
    r.round(
      pontoon.x,
      state.deckY,
      pontoon.w,
      pontoon.h,
      5,
      "#9ad4e4bb",
      "#5c98b0",
    );
    for (let x = pontoon.x + 20; x < pontoon.x + pontoon.w; x += 30)
      r.line(
        [x, state.deckY + 8, x + 4, state.deckY + pontoon.h - 7],
        "#e2f7f6",
        2,
      );
    r.line(
      [pontoon.x, state.deckY, pontoon.x + pontoon.w, state.deckY],
      "#edfafa",
      4,
    );
    r.prop("modelathletes", center, state.deckY, 0.85, state.docked, time);
    r.round(center - 55, state.deckY - 86, 110, 22, 6, "#fff2d8", "#a59677");
    c.fillStyle = "#496462";
    c.fillText(
      `${Math.round(plan.loadMass * 1000)} g TEAM`,
      center,
      state.deckY - 71,
    );
  }
  const caption = !state.active
    ? "BUILD THE PONTOON"
    : state.docked
      ? "EVERYONE RISES TOGETHER"
      : (fill?.progress ?? 0) < 1
        ? "ADD WATER · WATCH THE DECK RISE"
        : "LET THE DECK SETTLE";
  c.fillStyle = "#426365";
  c.font = "bold 13px system-ui";
  c.fillText(caption, basin.x + basin.w / 2, basin.y + basin.h + 45);
  c.restore();
}
