import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Renderer supplies the outer local transform. Stationery marks and reflections
// are illustrations only; the scene owns all measuring, water, and light rules.
export function drawBorough(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#345453",
    wood = "#997455",
    cork = "#c4a17a",
    cream = "#fff0d7",
    sage = "#a8bc96",
    teal = "#598681",
    coral = "#de9685",
    brass = "#deb96d";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  if (kind === "mousemayor") {
    // Midge's large round ears and curled tail read even at civic scale.
    c.beginPath();
    c.moveTo(18, 8);
    c.bezierCurveTo(43, 26, 55, 3, 39, -5);
    c.bezierCurveTo(32, -9, 29, -2, 34, 1);
    c.strokeStyle = coral;
    c.lineWidth = 5;
    c.lineCap = "round";
    c.stroke();
    r.round(-24, 16, 21, 9, 5, wood);
    r.round(5, 16, 21, 9, 5, wood);
    r.round(-25, -44, 50, 66, 23, tint ?? cork, wood);
    r.round(-15, -35, 30, 47, 14, cream);
    const wave = happy ? -51 + Math.sin(motion * 1.5) * 2 : -17;
    r.line([-21, -30, -34, -22, -42, wave], tint ?? cork, 9);
    r.circle(-42, wave, 6, "#ebc3ae");
    r.line([21, -29, 33, -17, 22, -10], tint ?? cork, 9);
    r.circle(21, -10, 6, "#ebc3ae");
    c.beginPath();
    c.moveTo(-22, -38);
    c.lineTo(-13, -44);
    c.lineTo(23, 5);
    c.lineTo(13, 11);
    c.closePath();
    c.fillStyle = teal;
    c.fill();
    r.line([-17, -39, 19, 7], brass, 2);
    for (let i = 0; i < 7; i++) {
      const angle = (i * Math.PI * 2) / 7;
      r.circle(12 + Math.cos(angle) * 6, Math.sin(angle) * 6, 3, coral);
    }
    r.circle(12, 0, 4.5, brass);
    r.circle(-23, -78, 17, tint ?? cork);
    r.circle(23, -78, 17, tint ?? cork);
    r.circle(-23, -78, 11, "#e9b8a5");
    r.circle(23, -78, 11, "#e9b8a5");
    r.circle(0, -64, 26, tint ?? cork);
    r.round(-17, -59, 34, 22, 11, cream);
    r.face(0, -65, 0.66, true);
    r.circle(0, -56, 4.5, wood);
    r.line([-16, -54, -31, -58], wood, 1.5);
    r.line([-17, -50, -32, -49], wood, 1.5);
    r.line([16, -54, 31, -58], wood, 1.5);
    r.line([17, -50, 32, -49], wood, 1.5);
    if (happy) r.line([-7, -90, 0, -93, 7, -90], teal, 3);
  } else if (kind === "hedgehog") {
    // A scalloped fan of broad quills, not another round shell.
    c.beginPath();
    c.moveTo(-41, 7);
    for (let i = 0; i <= 20; i++) {
      const angle = Math.PI + (i * Math.PI) / 20;
      const radius = i % 2 ? 43 : 53;
      c.lineTo(Math.cos(angle) * radius, -37 + Math.sin(angle) * radius);
    }
    c.lineTo(40, 13);
    c.closePath();
    c.fillStyle = wood;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.lineJoin = "round";
    c.stroke();
    for (const [x, y] of [
      [-33, -52],
      [-23, -70],
      [0, -77],
      [23, -70],
    ])
      r.line([x, y, x * 0.78, y + 9], cork, 3);
    r.round(-34, -45, 69, 66, 27, tint ?? cork);
    r.round(-25, -51, 51, 61, 21, cream);
    r.round(-25, 17, 22, 9, 5, wood);
    r.round(7, 17, 22, 9, 5, wood);
    r.circle(-18, -58, 8, cork);
    r.circle(18, -58, 8, cork);
    r.circle(-18, -58, 4, coral);
    r.circle(18, -58, 4, coral);
    r.round(-24, -59, 49, 35, 17, cream);
    r.face(0, -47, 0.65, true);
    r.circle(0, -39, 5, wood);
    r.line([-17, -23, 0, -15, 18, -23], teal, 7);
    r.round(-19, -15, 38, 29, 5, teal);
    r.round(-8, -8, 16, 11, 3, cream);
    r.line([-5, -3, 5, -3], wood, 1.5);
    r.line([-27, -16, -35, -6, -24, 1], cork, 8);
    r.circle(-23, 1, 5, cream);
    const lift = happy ? -4 + Math.sin(motion * 1.4) * 1.5 : 0;
    // The pen stays in Quill's hand, including the small celebratory lift.
    r.line([28, -17, 35, -12, 41, -25 + lift], cork, 8);
    r.line([38, -69 + lift, 45, -3 + lift], ink, 7);
    r.line([38, -67 + lift, 41, -38 + lift], teal, 3);
    r.line([36, -61 + lift, 34, -45 + lift], brass, 2);
    c.beginPath();
    c.moveTo(42, -7 + lift);
    c.lineTo(48, -7 + lift);
    c.lineTo(46, 5 + lift);
    c.closePath();
    c.fillStyle = brass;
    c.fill();
    r.circle(42, -24 + lift, 5.5, cream);
    r.circle(38, -71 + lift, 4, brass);
  } else if (kind === "inspector") {
    // Pin has a tailored waistcoat and round inspection lens; no metronome.
    for (const side of [-1, 1]) {
      r.line([side * 23, -3, side * 39, 8, side * 46, 5], ink, 5);
      r.line([side * 17, 8, side * 25, 23, side * 36, 23], ink, 5);
    }
    r.round(-32, -52, 64, 66, 27, tint ?? sage, ink);
    r.round(-25, -43, 22, 47, 10, teal);
    r.round(3, -43, 22, 47, 10, teal);
    r.line([-19, -40, -9, -25, 0, -39, 9, -25, 19, -40], cream, 4);
    r.line([0, -28, 0, 9], wood, 2);
    r.circle(0, -4, 2.5, brass);
    r.circle(0, 5, 2.5, brass);
    // A tiny magnifying-glass badge hangs from a real lapel pin.
    r.circle(-14, -23, 6.5, brass);
    r.circle(-14, -23, 4.5, "#d4e9dc");
    r.line([-10, -18, -7, -14], brass, 3);
    r.line([-8, -83, -18, -96], ink, 3);
    r.line([8, -83, 18, -96], ink, 3);
    r.circle(-18, -96, 3, coral);
    r.circle(18, -96, 3, coral);
    r.circle(0, -67, 22, ink);
    r.round(-19, -80, 38, 32, 15, cream);
    r.face(0, -68, 0.6, true);
    if (!happy) r.line([6, -77, 14, -80], ink, 2);
    const tip = happy ? -5 + Math.sin(motion * 1.3) * 1.5 : 0;
    r.line([24, -36, 35, -29, 39, -42 + tip], ink, 5);
    r.line([36, -41 + tip, 44, -55 + tip], wood, 5);
    r.circle(39, -46 + tip, 4, cream);
    r.circle(44, -61 + tip, 10.5, brass);
    r.circle(44, -61 + tip, 7.5, "#d4e9dc");
    r.line([41, -65 + tip, 46, -67 + tip], cream, 2);
    r.line([-27, -35, -40, -30, -43, happy ? -41 : -20], ink, 5);
    r.circle(-43, happy ? -41 : -20, 4.5, cream);
  } else if (kind === "leafbug") {
    r.line([-8, 2, -20, 22, -31, 22], wood, 4);
    r.line([8, 2, 20, 22, 31, 22], wood, 4);
    c.beginPath();
    c.moveTo(0, -63);
    c.bezierCurveTo(46, -58, 45, -12, 0, 15);
    c.bezierCurveTo(-43, -8, -45, -56, 0, -63);
    c.closePath();
    c.fillStyle = tint ?? sage;
    c.fill();
    c.strokeStyle = teal;
    c.lineWidth = 3;
    c.stroke();
    r.line([0, -52, 0, 9], teal, 2.5);
    for (let i = 0; i < 3; i++) {
      const y = -39 + i * 15;
      r.line([-21 + i * 3, y - 9, 0, y, 21 - i * 3, y - 9], teal, 2);
    }
    r.line([-9, -82, -19, -97, -25, -96], teal, 2.5);
    r.line([9, -82, 19, -97, 25, -96], teal, 2.5);
    r.circle(-25, -96, 3, coral);
    r.circle(25, -96, 3, coral);
    r.round(-20, -85, 40, 31, 15, "#c3d0a7", teal);
    r.face(0, -72, 0.6, true);
    r.line([-15, -53, 0, -49, 15, -53], cream, 4);
    r.circle(0, -49, 3, coral);
    // Hands meet politely in front; an offered wave stays a small gesture.
    const handY = happy ? -52 + Math.sin(motion * 1.3) * 2 : -22;
    r.line([-27, -39, -40, -29, happy ? -43 : -6, handY], teal, 4);
    r.circle(happy ? -43 : -6, handY, 4, "#c3d0a7");
    r.line([27, -39, 38, -26, 7, -22], teal, 4);
    r.circle(7, -22, 4, "#c3d0a7");
  } else if (kind === "stamp") {
    r.round(-40, 8, 80, 14, 5, ink);
    r.round(-37, 6, 74, 8, 3, tint ?? coral);
    r.round(-31, -8, 62, 17, 5, wood, ink);
    r.round(-24, -13, 48, 9, 3, cork);
    r.round(-10, -48, 20, 38, 7, wood);
    r.round(-23, -70, 46, 32, 14, tint ?? coral, wood);
    r.line([-13, -61, 9, -61], "#f1b8a0", 3);
    r.round(-12, -2, 24, 8, 3, cream);
    if (happy) r.line([-7, 1, -2, 4, 7, -1], teal, 2);
    else r.circle(0, 2, 2.5, teal);
  } else if (kind === "pencil") {
    r.round(-16, -180, 32, 28, 8, tint ?? coral, wood);
    r.round(-17, -158, 34, 22, 3, "#b5bcb0", ink);
    r.line([-14, -151, 14, -151], cream, 2);
    r.line([-14, -143, 14, -143], teal, 2);
    r.round(-15, -136, 30, 127, 2, brass, wood);
    r.round(-6, -135, 12, 126, 1, "#edd596");
    r.line([10, -129, 10, -17], cork, 2);
    c.beginPath();
    c.moveTo(-15, -9);
    c.lineTo(15, -9);
    c.lineTo(0, 25);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    c.beginPath();
    c.moveTo(-5, 14);
    c.lineTo(5, 14);
    c.lineTo(0, 25);
    c.closePath();
    c.fillStyle = ink;
    c.fill();
    r.line([-3, -118, -3, -80], wood, 2);
    if (happy) r.line([-4, -51, 0, -47, 5, -55], teal, 2.5);
  } else if (kind === "paperclip") {
    c.beginPath();
    c.moveTo(10, -65);
    c.lineTo(10, -6);
    c.bezierCurveTo(10, 7, -10, 7, -10, -6);
    c.lineTo(-10, -65);
    c.bezierCurveTo(-10, -89, 27, -89, 27, -65);
    c.lineTo(27, 1);
    c.bezierCurveTo(27, 32, -27, 32, -27, 1);
    c.lineTo(-27, -54);
    c.strokeStyle = tint ?? teal;
    c.lineWidth = 8;
    c.lineCap = "round";
    c.stroke();
    r.line([25, -60, 25, -16], "#a6c8b9", 2);
    r.line([-25, -49, -25, -25], "#a6c8b9", 2);
    if (happy) r.round(-8, -55, 16, 10, 3, coral);
  } else if (kind === "ruler") {
    r.round(-112, -31, 224, 53, 6, tint ?? cork, wood);
    r.round(-105, -24, 210, 9, 3, "#ddc7a0");
    r.circle(-97, 7, 5, wood);
    r.circle(-97, 7, 2.5, cream);
    for (let i = 0; i <= 18; i++) {
      const x = -81 + i * 10;
      r.line([x, 20, x, i % 3 === 0 ? 0 : 10], ink, 1.5);
    }
    c.fillStyle = wood;
    c.font = "bold 10px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    for (let i = 0; i <= 6; i++) c.fillText(String(i), -81 + i * 30, -8);
  } else if (kind === "eraser") {
    r.round(-55, -39, 110, 58, 11, tint ?? coral, wood);
    r.round(19, -37, 34, 54, 8, cream);
    r.round(-21, -41, 44, 62, 4, teal, ink);
    r.round(-15, -34, 32, 45, 3, cream);
    r.line([-9, -25, 10, -25], wood, 2);
    r.line([-9, -18, 10, -18], wood, 2);
    r.line([-48, -29, -30, -29], "#f2b7a1", 3);
    if (happy) r.line([-8, -1, -2, 4, 10, -8], teal, 3);
    else r.circle(0, -2, 5, sage);
  } else if (kind === "archive") {
    r.round(-53, -58, 106, 79, 6, tint ?? cork, wood);
    r.round(-47, -50, 94, 18, 3, wood);
    // Completed files are neatly filed, never an implied moving mechanism.
    for (let i = 0; i < 3; i++) {
      const x = -40 + i * 27;
      r.round(x, happy ? -66 + i * 3 : -55, 34, 28, 3, i % 2 ? sage : cream);
      r.round(x + 4, happy ? -71 + i * 3 : -60, 15, 9, 2, coral);
    }
    r.round(-52, -34, 104, 55, 4, tint ?? cork, wood);
    r.round(-29, -19, 58, 28, 4, cream, wood);
    r.round(-12, -12, 24, 7, 3, wood);
    r.line([-19, 2, 19, 2], teal, 2);
    r.line([-45, 14, -36, 14], "#dfc8a6", 2);
    r.line([36, 14, 45, 14], "#dfc8a6", 2);
  } else if (kind === "townsign") {
    r.line([-37, -30, -43, 25], wood, 7);
    r.line([37, -30, 43, 25], wood, 7);
    r.round(-66, -75, 132, 64, 8, tint ?? teal, wood);
    r.round(-59, -68, 118, 50, 4, cream);
    r.circle(-52, -60, 2.5, brass);
    r.circle(52, -60, 2.5, brass);
    c.fillStyle = ink;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = happy ? "bold 16px system-ui" : "bold 20px system-ui";
    c.fillText(happy ? "WELCOME" : "OPEN", 0, -49);
    c.font = "bold 9px system-ui";
    c.fillStyle = teal;
    c.fillText(happy ? "PULL UP A CHAIR" : "TO REASON", 0, -30);
  } else if (kind === "puddle") {
    c.beginPath();
    c.moveTo(-61, -3);
    c.bezierCurveTo(-65, -22, -35, -33, -16, -26);
    c.bezierCurveTo(2, -43, 34, -30, 40, -20);
    c.bezierCurveTo(67, -20, 72, 2, 51, 9);
    c.bezierCurveTo(29, 25, 5, 14, -10, 19);
    c.bezierCurveTo(-31, 27, -67, 15, -61, -3);
    c.closePath();
    c.fillStyle = tint ?? "#91cbd0";
    c.fill();
    c.strokeStyle = "#5d9ea7";
    c.lineWidth = 3;
    c.stroke();
    r.line([-45, -8, -34, -15, -23, -15], "#d5efea", 3);
    r.line([25, 8, 41, 5, 46, 1], "#d5efea", 3);
    r.face(1, -8, 0.77, true);
    // A tiny reflected glint is decorative; no extra light or water source.
    const shimmer = happy ? Math.sin(motion * 1.2) * 1.5 : 0;
    r.line([36, -19 + shimmer, 36, -9 + shimmer], cream, 2);
    r.line([31, -14 + shimmer, 41, -14 + shimmer], cream, 2);
    if (happy) r.line([-25, 10, -17, 12, -8, 10], "#d5efea", 2);
  } else return false;
  return true;
}
