import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Renderer owns the prop transform. Wobbles and utensil flourishes illustrate
// completed scenes; they do not add food, fluid, or moving puzzle mechanics.
export function drawPudding(
  r: Renderer,
  kind: PropKind,
  time: number,
  happy: boolean,
): boolean {
  const c = r.ctx;
  const ink = "#584b46",
    toast = "#ac7651",
    biscuit = "#ddb074",
    custard = "#f2d17e",
    cream = "#fff1d9",
    berry = "#c86771",
    pink = "#eaa6a2",
    sage = "#91ad83",
    teal = "#648e88";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  if (kind === "pudding") {
    c.beginPath();
    c.ellipse(0, 14, 77, 13, 0, 0, Math.PI * 2);
    c.fillStyle = "#c7d5c4";
    c.fill();
    c.beginPath();
    c.ellipse(0, 10, 74, 11, 0, 0, Math.PI * 2);
    c.fillStyle = cream;
    c.fill();
    r.line([-53, 13, -34, 17, 35, 17, 53, 13], "#d8c6a1", 2);
    c.save();
    c.rotate(happy ? Math.sin(motion * 1.6) * 0.025 : 0);
    const wave = happy ? -53 + Math.sin(motion * 1.5) * 2 : -22;
    r.line([-52, -24, -68, -14, -78, wave], custard, 10);
    r.circle(-78, wave, 6, cream);
    r.line([52, -24, 67, -13, 75, -25], custard, 10);
    r.circle(75, -25, 6, cream);
    c.beginPath();
    c.moveTo(-62, 2);
    c.bezierCurveTo(-55, -23, -47, -65, -31, -72);
    c.bezierCurveTo(-16, -81, 19, -81, 34, -71);
    c.bezierCurveTo(50, -59, 57, -19, 62, 2);
    c.bezierCurveTo(31, 14, -33, 14, -62, 2);
    c.closePath();
    c.fillStyle = custard;
    c.fill();
    c.strokeStyle = toast;
    c.lineWidth = 3;
    c.stroke();
    r.line([-41, -47, -49, -13], "#ffe6a5", 5);
    r.line([44, -42, 50, -12], "#dcb366", 4);
    c.beginPath();
    c.moveTo(-39, -65);
    c.bezierCurveTo(-20, -82, 23, -79, 41, -63);
    c.bezierCurveTo(35, -57, 29, -62, 27, -54);
    c.bezierCurveTo(24, -45, 15, -48, 15, -58);
    c.bezierCurveTo(0, -63, -21, -52, -39, -65);
    c.closePath();
    c.fillStyle = "#bb7c53";
    c.fill();
    c.beginPath();
    c.moveTo(-47, -51);
    c.lineTo(-36, -60);
    c.lineTo(-4, 9);
    c.lineTo(-19, 8);
    c.closePath();
    c.fillStyle = berry;
    c.fill();
    r.line([-42, -51, -12, 6], cream, 2);
    r.circle(-22, -13, 7, berry);
    r.circle(-22, -13, 4, custard);
    r.face(7, -35, 1.13, true);
    r.circle(0, -86, 11, berry);
    r.circle(-3, -90, 3, "#efb1a7");
    r.line([2, -96, 6, -106, 13, -108], sage, 3);
    c.restore();
  } else if (kind === "biscuitcaptain") {
    r.line([-17, 1, -20, 22, -31, 22], toast, 8);
    r.line([17, 1, 20, 22, 31, 22], toast, 8);
    const salute = happy ? -66 + Math.sin(motion * 1.3) * 1.5 : -18;
    r.line([-35, -33, -52, -23, -58, -35], biscuit, 9);
    r.circle(-58, -35, 5, cream);
    r.line([35, -33, 52, -24, 51, salute], biscuit, 9);
    r.circle(51, salute, 5, cream);
    for (let i = 0; i < 14; i++) {
      const angle = (i * Math.PI * 2) / 14;
      r.circle(Math.cos(angle) * 41, -35 + Math.sin(angle) * 41, 6, toast);
    }
    r.circle(0, -35, 43, biscuit);
    r.circle(0, -35, 36, "#edc88d");
    for (const [x, y] of [
      [-27, -44],
      [26, -44],
      [-24, -19],
      [25, -16],
      [-8, -6],
      [12, -9],
    ])
      r.circle(x, y, 2, toast);
    r.face(0, -45, 1.05, true);
    // The moustache is six distinct toasted crumbs, not icing or a mouth.
    for (const side of [-1, 1]) {
      r.circle(side * 6, -30, 4.5, toast);
      r.circle(side * 13, -28, 4, toast);
      r.circle(side * 19, -31, 3, toast);
    }
    r.line([-5, -20, 0, happy ? -16 : -18, 5, -20], ink, 2);
    r.round(-31, -82, 62, 10, 5, teal, ink);
    c.beginPath();
    c.moveTo(-26, -80);
    c.lineTo(-29, -98);
    c.quadraticCurveTo(0, -115, 29, -98);
    c.lineTo(26, -80);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    c.strokeStyle = toast;
    c.lineWidth = 3;
    c.stroke();
    r.circle(0, -92, 7, berry);
    r.line([-4, -93, 0, -89, 5, -96], cream, 2);
    r.round(-13, -2, 26, 8, 3, teal);
    r.circle(0, 2, 3, custard);
  } else if (kind === "jellybean") {
    r.line([-12, 3, -21, 22, -30, 22], berry, 6);
    r.line([16, 3, 23, 22, 33, 22], berry, 6);
    c.beginPath();
    c.moveTo(-29, -71);
    c.bezierCurveTo(-25, -106, 19, -110, 32, -80);
    c.bezierCurveTo(43, -59, 20, -50, 33, -28);
    c.bezierCurveTo(47, -2, 24, 16, -2, 13);
    c.bezierCurveTo(-36, 11, -44, -18, -35, -38);
    c.bezierCurveTo(-27, -52, -33, -60, -29, -71);
    c.closePath();
    c.fillStyle = pink;
    c.fill();
    c.strokeStyle = berry;
    c.lineWidth = 3;
    c.stroke();
    r.line([-18, -80, -19, -66], "#ffd0bb", 5);
    r.face(1, -63, 0.95, true);
    r.line([-32, -22, 0, -11, 32, -18], teal, 8);
    r.line([8, -14, 17, 6, 23, 0], teal, 7);
    r.line([6, -15, 0, 5, -5, -1], custard, 6);
    r.circle(7, -15, 5, cream);
    r.line([-32, -38, -48, -30, -47, -13], berry, 7);
    r.round(-62, -17, 31, 36, 4, cream, toast);
    r.round(-55, -21, 16, 8, 3, teal);
    for (let i = 0; i < 3; i++) {
      r.circle(-54, -7 + i * 8, 1.5, berry);
      r.line([-48, -7 + i * 8, -38, -7 + i * 8], toast, 1.5);
    }
    r.circle(-46, -15, 5, pink);
    const wave = happy ? -67 + Math.sin(motion * 1.4) * 2 : -30;
    r.line([30, -37, 47, -24, 54, wave], berry, 7);
    r.circle(54, wave, 5, pink);
    r.line([8, -96, 1, -106, 14, -102, 24, -110, 24, -97], teal, 4);
    r.circle(16, -100, 4, custard);
  } else if (kind === "whisk") {
    c.save();
    c.rotate(happy ? Math.sin(motion * 1.4) * 0.055 : -0.025);
    for (const width of [30, 19, 8]) {
      c.beginPath();
      c.moveTo(-5, -35);
      c.bezierCurveTo(-width, -51, -width - 5, -99, -width / 2, -111);
      c.bezierCurveTo(0, -126, width + 6, -105, width, -76);
      c.bezierCurveTo(width - 2, -56, 9, -40, 5, -35);
      c.strokeStyle = teal;
      c.lineWidth = 3;
      c.lineCap = "round";
      c.stroke();
    }
    r.round(-8, -43, 16, 14, 4, "#b8c8b5", ink);
    r.round(-9, -31, 18, 57, 7, berry, toast);
    r.line([-3, -23, -3, 9], pink, 2);
    r.circle(0, 17, 3, cream);
    c.restore();
  } else if (kind === "layercake") {
    r.round(-70, 12, 140, 10, 5, cream);
    r.round(-59, -73, 118, 86, 10, biscuit, toast);
    r.round(-58, -24, 116, 12, 3, cream);
    r.round(-58, -49, 116, 10, 3, berry);
    r.round(-60, -77, 120, 23, 10, cream);
    for (const x of [-44, -20, 7, 38])
      r.round(x - 5, -64, 10, x === 7 ? 24 : 15, 5, cream);
    for (const x of [-34, 0, 34]) {
      r.circle(x, -84, 10, berry);
      r.circle(x - 3, -87, 2.5, pink);
      r.line([x + 1, -93, x + 5, -100], sage, 2.5);
    }
    r.face(0, -5, 0.72, true);
    if (happy) {
      r.line([-43, -33, -38, -36, -33, -33], custard, 2);
      r.line([32, -33, 37, -36, 42, -33], custard, 2);
    }
  } else if (kind === "eclair") {
    r.round(-111, -51, 222, 65, 31, toast);
    r.round(-107, -47, 214, 56, 27, biscuit);
    r.round(-105, -17, 210, 13, 6, cream);
    r.round(-104, -53, 208, 31, 15, "#795440");
    r.line([-86, -43, -72, -46, -54, -45], "#b88560", 3);
    r.line([54, -45, 72, -46, 86, -43], "#b88560", 3);
    r.round(-31, -49, 62, 32, 13, cream);
    r.face(0, -35, 1.03, true);
    r.round(-116, 12, 232, 8, 4, cream);
    if (happy) {
      r.line([-102, -5, -116, -13, -120, -23], biscuit, 6);
      r.line([102, -5, 116, -13, 120, -23], biscuit, 6);
    }
  } else if (kind === "dumpling") {
    r.round(-65, 14, 130, 10, 5, "#b9c9b0");
    c.beginPath();
    c.moveTo(-57, -4);
    c.bezierCurveTo(-61, -35, -32, -51, -13, -69);
    c.quadraticCurveTo(0, -82, 15, -68);
    c.bezierCurveTo(35, -48, 61, -32, 57, -3);
    c.bezierCurveTo(52, 25, -49, 25, -57, -4);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    c.strokeStyle = biscuit;
    c.lineWidth = 3;
    c.stroke();
    for (let i = -2; i <= 2; i++) {
      c.beginPath();
      c.moveTo(i * 5, -65);
      c.quadraticCurveTo(i * 16, -54, i * 15, -40);
      c.strokeStyle = "#d4b88d";
      c.lineWidth = 2;
      c.stroke();
    }
    r.round(-13, -72, 26, 11, 5, custard);
    r.face(0, -23, 1.1, true);
    if (happy) {
      r.round(-10, -80, 23, 6, 3, berry);
      r.line([-44, -9, -52, -18], biscuit, 4);
      r.line([44, -9, 52, -18], biscuit, 4);
    }
  } else if (kind === "strawberry") {
    r.line([-11, 5, -16, 23, -26, 23], sage, 5);
    r.line([11, 5, 16, 23, 26, 23], sage, 5);
    c.beginPath();
    c.moveTo(0, -68);
    c.bezierCurveTo(36, -91, 58, -55, 37, -20);
    c.quadraticCurveTo(24, 3, 0, 15);
    c.quadraticCurveTo(-26, 3, -39, -24);
    c.bezierCurveTo(-60, -63, -30, -88, 0, -68);
    c.closePath();
    c.fillStyle = berry;
    c.fill();
    c.strokeStyle = "#9f5260";
    c.lineWidth = 3;
    c.stroke();
    for (const [x, y] of [
      [-27, -57],
      [27, -57],
      [-35, -38],
      [35, -38],
      [-23, -14],
      [22, -14],
      [0, 3],
    ])
      r.line([x, y, x - 1, y + 4], custard, 2);
    for (const [x, y] of [
      [-34, -74],
      [-20, -88],
      [2, -88],
      [22, -88],
      [36, -72],
    ]) {
      c.beginPath();
      c.moveTo(0, -68);
      c.quadraticCurveTo(x / 2, y - 7, x, y);
      c.quadraticCurveTo(x / 2, y + 16, 0, -68);
      c.fillStyle = sage;
      c.fill();
    }
    r.line([2, -77, 7, -98], teal, 4);
    if (happy) {
      // Every delegate wears this same oversized hat. Leaves peek beneath the
      // brim, while its lowest edge stays well above the strawberry's eyes.
      c.beginPath();
      c.moveTo(-34, -91);
      c.bezierCurveTo(-34, -129, 29, -129, 34, -91);
      c.closePath();
      c.fillStyle = "#e6bd7d";
      c.fill();
      c.strokeStyle = toast;
      c.lineWidth = 2;
      c.stroke();
      r.line([-23, -109, -10, -115, 9, -115, 23, -108], cream, 2);
      r.line([-29, -102, -12, -109, 12, -109, 29, -102], custard, 2);
      r.round(-33, -100, 66, 12, 4, teal);
      c.beginPath();
      c.moveTo(-72, -89);
      c.bezierCurveTo(-58, -101, -38, -93, -24, -93);
      c.bezierCurveTo(6, -97, 47, -102, 72, -88);
      c.bezierCurveTo(60, -70, 43, -81, 26, -80);
      c.bezierCurveTo(-2, -74, -30, -81, -47, -77);
      c.bezierCurveTo(-60, -74, -72, -79, -72, -89);
      c.closePath();
      c.fillStyle = "#efd09a";
      c.fill();
      c.strokeStyle = toast;
      c.lineWidth = 2;
      c.stroke();
      c.beginPath();
      c.moveTo(-60, -87);
      c.bezierCurveTo(-34, -87, -5, -80, 21, -86);
      c.bezierCurveTo(38, -90, 51, -84, 61, -87);
      c.strokeStyle = "#d5ac72";
      c.lineWidth = 2;
      c.stroke();
      r.circle(26, -94, 5, berry);
      r.circle(26, -94, 2, cream);
    }
    r.face(0, -43, 1.03, true);
    if (happy) r.line([-36, -18, -49, -31, -50, -42], sage, 5);
  } else if (kind === "pancake") {
    c.beginPath();
    c.ellipse(0, 16, 76, 11, 0, 0, Math.PI * 2);
    c.fillStyle = cream;
    c.fill();
    for (let i = 0; i < 3; i++) {
      const y = -5 - i * 16;
      r.round(-62, y, 124, 20, 10, toast);
      r.round(-61, y - 2, 122, 15, 7, "#e6bd7d");
      r.line([-48, y + 4, -32, y + 1, 32, y + 1, 48, y + 4], "#f5d79c", 2);
    }
    c.beginPath();
    c.moveTo(-41, -37);
    c.bezierCurveTo(-15, -51, 30, -45, 44, -33);
    c.bezierCurveTo(46, -24, 38, -28, 37, -17);
    c.bezierCurveTo(36, -8, 28, -9, 29, -23);
    c.bezierCurveTo(7, -30, -3, -26, -13, -31);
    c.bezierCurveTo(-22, -23, -30, -28, -41, -37);
    c.closePath();
    c.fillStyle = "#b8804e";
    c.fill();
    r.round(-14, -49, 28, 16, 4, custard, toast);
    r.line([-9, -44, 8, -44], cream, 2);
    r.face(0, -8, 0.85, true);
    if (happy) r.circle(-48, -31, 3, cream);
  } else if (kind === "recipe") {
    r.round(-57, -115, 114, 138, 7, biscuit, toast);
    r.round(-51, -108, 102, 124, 4, cream);
    r.round(-39, -98, 78, 21, 4, berry);
    c.fillStyle = cream;
    c.font = "bold 11px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(happy ? "TOGETHER" : "RECIPE", 0, -87);
    for (let i = 0; i < 3; i++) {
      const y = -60 + i * 24;
      r.circle(-30, y, 7, i === 0 ? custard : i === 1 ? berry : sage);
      r.line([-14, y - 4, 31 - i * 4, y - 4], toast, 2);
      r.line([-14, y + 3, 22 + i * 3, y + 3], "#c5a782", 2);
      if (happy) r.line([-33, y, -30, y + 3, -26, y - 3], cream, 1.8);
    }
    r.line([-34, 7, 34, 7], "#decca9", 2);
  } else if (kind === "wafer") {
    r.round(-36, -102, 72, 125, 5, toast);
    r.round(-33, -102, 66, 120, 4, biscuit);
    r.round(-27, -96, 54, 108, 2, "#eaca94");
    for (let row = 0; row < 6; row++)
      for (let col = 0; col < 3; col++) {
        const x = -23 + col * 16,
          y = -91 + row * 17;
        r.round(x, y, 12, 12, 1, biscuit);
        r.line([x + 1, y + 11, x + 1, y + 1, x + 11, y + 1], toast, 1.3);
        r.line([x + 3, y + 10, x + 10, y + 10, x + 10, y + 3], cream, 1);
      }
    r.line([-31, 18, 31, 18], cream, 3);
    if (happy) r.round(-13, -105, 26, 8, 3, berry);
  } else if (kind === "spoon") {
    c.save();
    c.rotate(happy ? Math.sin(motion * 1.2) * 0.045 : 0);
    r.round(-7, -56, 14, 81, 7, "#becabd", teal);
    r.line([-2, -44, -2, 13], cream, 2);
    c.beginPath();
    c.ellipse(0, -82, 27, 37, 0, 0, Math.PI * 2);
    c.fillStyle = "#becabd";
    c.fill();
    c.strokeStyle = teal;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.ellipse(0, -83, 19, 27, 0, 0, Math.PI * 2);
    c.fillStyle = "#e0e5d0";
    c.fill();
    r.line([-11, -92, -8, -102, -2, -106], cream, 3);
    r.circle(0, 15, 3, berry);
    c.restore();
  } else return false;
  return true;
}
