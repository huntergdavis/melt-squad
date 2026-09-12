import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Local coordinates: Renderer has already translated/scaled the prop.
export function drawPostal(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  if (kind === "crab") {
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++)
        r.line(
          [
            side * 30,
            -13 + i * 10,
            side * (55 + i * 4),
            -4 + i * 10,
            side * 62,
            22 + i * 5,
          ],
          "#d88377",
          7,
        );
      const lift = happy ? -40 : -14;
      r.line([side * 32, -30, side * 64, lift], "#e79986", 12);
      r.circle(side * 67, lift - 12, 18, "#f2b094");
      r.line([side * 66, lift - 32, side * 67, lift - 15], "#244e58", 5);
    }
    r.round(-44, -53, 88, 64, 26, tint ?? "#eb9b87");
    r.line([-18, -45, -22, -72], "#eb9b87", 9);
    r.line([18, -45, 22, -72], "#eb9b87", 9);
    r.circle(-22, -72, 10, "#fff0d8");
    r.circle(22, -72, 10, "#fff0d8");
    r.circle(-22, -71, 4, "#264e55");
    r.circle(22, -71, 4, "#264e55");
    r.face(0, -23, 0.75, happy);
    r.round(-26, -100, 52, 14, 5, "#3d6a70");
    r.round(-19, -113, 38, 19, 8, "#598286");
    r.circle(0, -97, 5, "#f6d68f");
    if (happy) {
      r.round(54, -28, 30, 12, 3, "#b77473");
      r.round(65, -42, 10, 17, 4, "#8d6669");
    }
  } else if (kind === "eel") {
    c.beginPath();
    c.moveTo(-66, 13);
    c.bezierCurveTo(-12, 36, -44, -53, 6, -42);
    c.bezierCurveTo(37, -35, 20, -9, 58, -22);
    c.strokeStyle = tint ?? "#a9c9b0";
    c.lineWidth = 30;
    c.lineCap = "round";
    c.stroke();
    r.circle(60, -30, 23, tint ?? "#b6d1b6");
    r.face(64, -34, 0.6, happy);
    r.line([-27, -25, 5, 1], "#4e7075", 7);
    r.round(-20, -9, 40, 33, 6, "#dfbd90");
    r.line([-18, -2, 0, 9, 18, -2], "#a88c73", 3);
    r.circle(0, 9, 4, "#46757a");
    if (!happy) {
      r.line([48, -52, 54, -47], "#416971", 2);
      r.circle(84, -53, 3, "#bfeff0");
    }
  } else if (kind === "octopus") {
    for (let i = 0; i < 8; i++) {
      const x = -49 + i * 14,
        wave = Math.sin(time * 1.5 + i) * (happy ? 6 : 2);
      c.beginPath();
      c.moveTo(x * 0.6, -10);
      c.bezierCurveTo(x * 1.3, 10, x * 1.4, 44 + wave, x * 1.6, 24 + wave);
      c.strokeStyle = tint ?? "#d896a4";
      c.lineWidth = 12;
      c.lineCap = "round";
      c.stroke();
      r.circle(x * 1.4, 22 + wave, 3, "#f8c6b8");
    }
    r.round(-47, -87, 94, 90, 43, tint ?? "#e4a5b0");
    r.face(0, -39, 1.05, happy);
    for (let i = 0; i < 5; i++)
      r.circle(-23 + i * 12, -65 + (i % 2) * 5, 2.5, "#bc7d99");
    if (happy) r.prop("letter", 57, 0, 0.45, true);
  } else if (kind === "snail") {
    r.round(-52, -3, 117, 24, 12, "#acc9b7");
    r.circle(-9, -26, 36, tint ?? "#eac18f");
    c.beginPath();
    for (let i = 0; i <= 60; i++) {
      const a = (i / 60) * Math.PI * 4,
        radius = (i / 60) * 29;
      const x = -9 + Math.cos(a) * radius,
        y = -26 + Math.sin(a) * radius;
      if (i) c.lineTo(x, y);
      else c.moveTo(x, y);
    }
    c.strokeStyle = "#bb8f7b";
    c.lineWidth = 4;
    c.stroke();
    r.round(33, -24, 27, 33, 12, "#b4d1bd");
    r.line([37, -16, 32, -42], "#b4d1bd", 6);
    r.line([53, -16, 59, -42], "#b4d1bd", 6);
    r.circle(32, -42, 5, "#315663");
    r.circle(59, -42, 5, "#315663");
    if (happy) r.line([-33, -43, 13, -4], "#f6ecd0", 9);
  } else if (kind === "mailbox") {
    r.round(-7, -25, 14, 70, 3, "#627f84");
    r.round(-47, -81, 94, 66, 19, tint ?? "#e2a298");
    r.round(-36, -60, 72, 11, 4, "#426c73");
    r.line(
      [46, -53, 46, happy ? -94 : -29, happy ? 72 : 67, happy ? -94 : -29],
      "#ecc896",
      7,
    );
    if (happy) r.prop("letter", 0, -28, 0.45, true);
  } else if (kind === "parcel") {
    r.round(-44, -47, 88, 66, 8, tint ?? "#e7c29a", "#ad927c");
    r.line([0, -46, 0, 19], "#c48d8f", 8);
    r.line([-43, -15, 43, -15], "#c48d8f", 7);
    r.round(8, -39, 28, 18, 3, "#fff0ce");
    if (happy) r.prop("heart", -24, -28, 0.3, true);
  } else if (kind === "divingbell") {
    r.circle(0, -63, 9, "#b18d57");
    r.circle(0, -63, 4, "#335f6b");
    r.round(-39, -56, 78, 66, 31, tint ?? "#d6ad62", "#a77d50");
    r.round(-48, -4, 96, 16, 6, "#efcc82", "#a77d50");
    r.circle(0, -29, 18, "#eed192");
    r.circle(0, -29, 12, "#4f8490");
    r.line([-7, -35, 1, -39], "#caeeea", 3);
    for (const x of [-32, 32]) r.circle(x, -11, 3, "#fff0ba");
    if (happy) r.prop("heart", 24, -52, 0.23, true);
  } else if (kind === "shell") {
    for (let i = 0; i < 7; i++) {
      const angle = Math.PI + (i * Math.PI) / 6;
      r.line(
        [0, 18, Math.cos(angle) * 46, Math.sin(angle) * 46 - 10],
        tint ?? "#f1c5ab",
        19,
      );
      r.line(
        [0, 15, Math.cos(angle) * 40, Math.sin(angle) * 40 - 9],
        "#d5a695",
        2,
      );
    }
    r.round(-15, 5, 30, 17, 6, "#e6b9a0");
    if (happy) r.circle(0, -7, 13, "#ffefce");
  } else if (kind === "anemone") {
    for (let i = 0; i < 9; i++) {
      const angle = (i * Math.PI) / 4.5;
      r.line(
        [0, -30, Math.cos(angle) * 41, -30 + Math.sin(angle) * 41],
        tint ?? "#d8a4b2",
        12,
      );
    }
    r.circle(0, -30, 24, "#f2d099");
    r.face(0, -33, 0.65, happy);
    r.round(-28, 10, 56, 23, 9, "#6a9a96");
    if (happy) {
      c.fillStyle = "#3c6570";
      c.font = "bold 12px system-ui";
      c.textAlign = "center";
      c.fillText("NO. 8", 0, 27);
    }
  } else if (kind === "bubble") {
    r.circle(0, -20, 43, "#dafafa30");
    c.beginPath();
    c.arc(0, -20, 43, 0, Math.PI * 2);
    c.strokeStyle = "#c5e7e8bb";
    c.lineWidth = 3;
    c.stroke();
    r.line([-24, -45, -15, -53], "#f1fbf3", 5);
    if (happy) r.prop("letter", 0, -10, 0.45, true);
  } else return false;
  return true;
}
