import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Local illustration only. The scene owns event targets, motion, and the real
// floating podium; this kit never paints a second simulated platform.
export function drawSports(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#43595d",
    cream = "#fff0d8",
    gold = "#dfbc79",
    tan = "#c5a07b",
    brown = "#9a755c",
    teal = "#739e93",
    rose = "#d59b94",
    lilac = "#b8a6cb",
    green = "#a9c295";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  const nikaHead = (x: number, y: number, s = 1) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    for (let i = 0; i < 9; i++) {
      const a = (i * Math.PI * 2) / 9;
      r.circle(Math.cos(a) * 24, Math.sin(a) * 23, 10, gold);
    }
    r.circle(-28, -16, 8, tan);
    r.circle(28, -16, 8, tan);
    r.round(-22, -26, 44, 50, 19, "#e8bf9f");
    r.round(-25, -26, 50, 16, 8, brown);
    r.line([-24, -16, 24, -16], teal, 6);
    r.face(0, -3, 0.9, true);
    c.restore();
  };
  const gusHead = (x: number, y: number, s = 1) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 21, -19);
      c.bezierCurveTo(side * 40, -18, side * 60, -35, side * 50, -48);
      c.strokeStyle = cream;
      c.lineWidth = 11;
      c.lineCap = "round";
      c.stroke();
      r.line([side * 39, -25, side * 45, -17], lilac, 7);
      r.line([side * 43, -29, side * 49, -21], cream, 2);
      r.circle(side * 34, -8, 10, tan);
    }
    r.round(-33, -32, 66, 60, 25, tint ?? tan, brown);
    r.round(-29, 2, 58, 31, 14, "#e7c5a5");
    r.circle(-12, -11, 4, ink);
    r.circle(12, -11, 4, ink);
    r.circle(-23, 8, 5, rose);
    r.circle(23, 8, 5, rose);
    r.circle(-11, 11, 3, brown);
    r.circle(11, 11, 3, brown);
    r.line([-9, 22, 0, 26, 9, 22], ink, 2.5);
    r.line([-10, -30, -5, -40, 1, -33, 8, -39, 13, -30], brown, 5);
    c.restore();
  };
  const irisHead = (x: number, y: number, s = 1) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    r.circle(0, -3, 28, lilac);
    r.line([-13, -22, -25, -38, -7, -32], lilac, 9);
    r.line([0, -27, 5, -40, 14, -20], lilac, 9);
    r.round(-21, -20, 42, 45, 18, cream);
    r.line([-23, -16, 23, -16], rose, 6);
    r.face(0, -2, 0.87, true);
    c.restore();
  };

  if (kind === "coachnika") {
    c.beginPath();
    c.moveTo(40, -13);
    c.bezierCurveTo(80, 18, 103, -10, 80, -26);
    c.strokeStyle = tan;
    c.lineWidth = 9;
    c.lineCap = "round";
    c.stroke();
    r.circle(80, -26, 8, brown);
    for (const x of [-43, -18, 23, 49]) r.round(x - 9, -8, 18, 36, 8, tan);
    r.round(-50, -55, 112, 70, 31, tint ?? gold, brown);
    c.beginPath();
    c.moveTo(-2, -30);
    c.bezierCurveTo(-8, -60, 23, -95, 50, -94);
    c.quadraticCurveTo(39, -70, 50, -64);
    c.quadraticCurveTo(35, -61, 39, -45);
    c.quadraticCurveTo(15, -49, -2, -30);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    r.line([4, -40, 37, -80], cream, 3);
    r.line([12, -40, 35, -60], gold, 2);
    r.round(-49, -70, 50, 60, 18, teal);
    r.line([-44, -61, -24, -45, -3, -61], cream, 4);
    r.line([-35, -40, -20, -20, -7, -40], gold, 2);
    r.round(-24, -20, 17, 9, 4, cream, brown);
    r.circle(-23, -16, 2, ink);
    nikaHead(-28, -96);
    if (happy) r.line([-41, -20, -62, -27, -67, -45], tan, 11);
  } else if (kind === "gus") {
    for (const x of [-19, 19]) {
      r.round(x - 10, -7, 20, 30, 8, tan);
      r.round(x - 12, 18, 25, 10, 4, brown);
      r.round(x - 11, 0, 22, 9, 3, cream);
    }
    r.round(-36, -90, 72, 91, 26, tint ?? teal, ink);
    r.round(-37, -11, 74, 20, 7, lilac);
    r.round(-18, -60, 36, 39, 5, cream);
    c.fillStyle = ink;
    c.font = "bold 25px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("2", 0, -40);
    for (const side of [-1, 1]) {
      r.line(
        [
          side * 31,
          -70,
          side * 50,
          happy ? -92 : -45,
          side * 57,
          happy ? -110 : -25,
        ],
        tan,
        13,
      );
      r.circle(side * 57, happy ? -110 : -25, 8, cream);
      r.line(
        [side * 52, happy ? -104 : -35, side * 63, happy ? -104 : -31],
        lilac,
        6,
      );
    }
    gusHead(0, -108);
  } else if (kind === "irisharpy") {
    for (const side of [-1, 1]) {
      const flutter = happy ? Math.sin(motion * 1.3) * 2 : 0;
      c.beginPath();
      c.moveTo(side * 17, -65);
      c.quadraticCurveTo(side * 50, -94, side * 85, -85 - flutter);
      c.lineTo(side * 70, -36);
      c.lineTo(side * 58, -45);
      c.lineTo(side * 52, -20);
      c.lineTo(side * 40, -30);
      c.lineTo(side * 27, -8);
      c.closePath();
      c.fillStyle = tint ?? lilac;
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 2;
      c.stroke();
      r.line([side * 24, -58, side * 72, -70, side * 55, -40], cream, 2);
      r.line([side * 34, -51, side * 40, -40], rose, 8);
    }
    r.round(-24, -74, 48, 80, 20, tint ?? teal, ink);
    r.round(-15, -54, 30, 40, 10, cream);
    for (const x of [-12, 12]) {
      r.line([x, 0, x, 22], gold, 5);
      r.line([x, 22, x + (happy ? 17 : Math.sign(x) * 17), 26], gold, 4);
      r.line([x, 22, x + (happy ? 6 : Math.sign(x) * 7), 26.5], gold, 3);
    }
    irisHead(0, -103);
  } else if (kind === "centaurathlete") {
    c.beginPath();
    c.moveTo(-43, -40);
    c.quadraticCurveTo(-84, -60, -98, -4);
    c.strokeStyle = brown;
    c.lineWidth = 11;
    c.lineCap = "round";
    c.stroke();
    for (const x of [-47, -21, 20, 52]) {
      r.round(x - 7, -20, 14, 42, 6, tan);
      r.round(x - 9, 18, 18, 10, 3, brown);
    }
    r.round(-61, -68, 125, 50, 24, tint ?? tan, brown);
    r.round(2, -131, 50, 86, 18, tint ?? teal, ink);
    r.round(14, -115, 26, 34, 4, cream);
    c.fillStyle = ink;
    c.font = "bold 22px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("8", 27, -97);
    r.line([8, -113, -18, -98, -23, -80], "#e8bf9f", 10);
    r.line([47, -113, 70, -90, 87, -80], "#e8bf9f", 10);
    r.circle(27, -155, 26, brown);
    r.round(6, -174, 42, 40, 18, "#e8bf9f");
    r.line([4, -166, 50, -166], lilac, 7);
    r.face(27, -155, 0.8, true);
    r.line([46, -172, 64, -166, 60, -146], brown, 11);
    r.round(-31, -80, 129, 9, 3, gold, brown);
    // Eight cups before the cutaway; two remain after the others are shared.
    for (let i = 0; i < (happy ? 2 : 8); i++) {
      const x = happy ? -9 + i * 65 : -23 + i * 15;
      r.round(x, -97, 11, 17, 3, cream, brown);
      r.circle(x + 12, -90, 3.5, cream);
    }
  } else if (kind === "cyclopsathlete") {
    r.round(-25, -4, 18, 32, 5, tan);
    r.round(8, -4, 18, 32, 5, tan);
    r.round(-35, -70, 70, 70, 23, tint ?? lilac, ink);
    r.round(-18, -40, 36, 31, 5, cream);
    c.fillStyle = ink;
    c.font = "bold 24px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("4", 0, -24);
    for (const side of [-1, 1])
      r.line([side * 30, -50, side * 52, -30, side * 56, -8], tan, 12);
    r.circle(0, -92, 30, tint ?? tan);
    r.round(-29, -113, 58, 9, 4, teal);
    r.circle(0, -96, 15, cream);
    r.circle(0, -96, 7, teal);
    r.circle(0, -96, 3.5, ink);
    r.circle(-3, -100, 2, cream);
    r.line([-11, -74, 0, happy ? -68 : -70, 11, -74], ink, 2.5);
    r.circle(-20, -82, 5, rose);
    r.circle(20, -82, 5, rose);
  } else if (kind === "paddedcolumn") {
    r.round(-41, 16, 82, 12, 4, tan, brown);
    c.save();
    c.translate(0, -58);
    c.rotate(happy ? 0 : -0.11);
    c.translate(0, 58);
    r.round(-27, -132, 54, 80, 7, cream, brown);
    for (const x of [-16, 0, 16]) r.line([x, -123, x, -60], tan, 3);
    r.round(-40, -145, 80, 18, 6, tan, brown);
    r.circle(-32, -137, 8, cream);
    r.circle(32, -137, 8, cream);
    r.circle(-32, -137, 3, tan);
    r.circle(32, -137, 3, tan);
    c.restore();
    r.round(-30, -60, 60, 77, 9, tint ?? teal, ink);
    r.line([-26, -43, 26, -43], cream, 5);
    r.line([-26, -3, 26, -3], cream, 5);
    r.round(-11, -31, 22, 16, 3, rose);
    if (happy) r.line([-6, -24, -1, -20, 7, -28], cream, 2);
  } else if (kind === "sportsbench") {
    for (const x of [-80, 80]) r.line([x, -18, x, 28], brown, 9);
    r.round(-119, -60, 238, 20, 5, tint ?? tan, brown);
    r.round(-119, -35, 238, 14, 5, tint ?? tan, brown);
    r.round(-126, -18, 252, 15, 5, cream, brown);
    r.line([-103, -50, 103, -50], gold, 2);
    if (happy) {
      r.line([-20, -55, 0, -20, 20, -55], lilac, 7);
      r.circle(0, -20, 16, gold);
      r.circle(0, -20, 12, cream);
      r.line([-5, -20, 0, -16, 6, -24], teal, 3);
    }
  } else if (kind === "whistle") {
    c.beginPath();
    c.moveTo(-13, -27);
    c.bezierCurveTo(-48, -86, 49, -86, 22, -24);
    c.strokeStyle = lilac;
    c.lineWidth = 3;
    c.stroke();
    r.circle(0, -10, 20, tint ?? gold);
    r.round(9, -22, 43, 16, 5, tint ?? gold, brown);
    r.circle(-3, -12, 8, brown);
    r.circle(-5, -14, 4, ink);
    r.line([34, -19, 43, -19], cream, 2);
    if (happy) {
      c.beginPath();
      c.moveTo(0, -40);
      c.lineTo(-20, -54);
      c.lineTo(-22, -30);
      c.closePath();
      c.fillStyle = rose;
      c.fill();
      c.beginPath();
      c.moveTo(0, -40);
      c.lineTo(20, -54);
      c.lineTo(22, -30);
      c.closePath();
      c.fill();
      r.circle(0, -40, 5, cream);
      r.line([-1, -36, -8, -24], rose, 5);
      r.line([2, -36, 12, -25], rose, 5);
    }
  } else if (kind === "relaybaton") {
    r.round(-12, -97, 24, 122, 10, tint ?? teal, ink);
    r.round(-12, -97, 24, 16, 7, gold);
    r.round(-12, 9, 24, 16, 7, gold);
    for (let i = 0; i < 5; i++)
      r.line([-8, -60 + i * 11, 8, -64 + i * 11], cream, 2);
    if (happy) r.circle(0, -70, 4, rose);
  } else if (kind === "sportsribbon") {
    r.line([-100, -20, -100, 24], brown, 6);
    c.beginPath();
    c.moveTo(-100, -20);
    if (happy) {
      c.bezierCurveTo(-90, -110, 97, -128, 111, -70);
      c.bezierCurveTo(128, -8, -30, 4, -21, -50);
      c.bezierCurveTo(-15, -79, 50, -90, 72, -49);
    } else c.bezierCurveTo(-97, 14, -66, -11, -60, 20);
    c.strokeStyle = tint ?? rose;
    c.lineWidth = 10;
    c.lineCap = "round";
    c.stroke();
    c.strokeStyle = cream;
    c.lineWidth = 2;
    c.stroke();
  } else if (kind === "pastalaurel") {
    c.beginPath();
    c.arc(0, -35, 40, 0.25, Math.PI - 0.25, true);
    c.strokeStyle = gold;
    c.lineWidth = 4;
    c.stroke();
    for (let i = 0; i < 9; i++) {
      const a = Math.PI + (i * Math.PI) / 8;
      c.save();
      c.translate(Math.cos(a) * 40, -35 + Math.sin(a) * 40);
      c.rotate(a + Math.PI / 2);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(-12, -9);
      c.lineTo(-12, 9);
      c.closePath();
      c.fillStyle = gold;
      c.fill();
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(12, -9);
      c.lineTo(12, 9);
      c.closePath();
      c.fill();
      r.line([-8, -4, 0, 0, 8, -4], cream, 1.5);
      r.line([-8, 4, 0, 0, 8, 4], tan, 1.5);
      r.circle(0, 0, 3, cream);
      c.restore();
    }
    r.line([-36, -28, -19, -10, 0, -5, 20, -10, 36, -28], gold, 4);
    c.beginPath();
    c.moveTo(0, -5);
    c.lineTo(-21, -14);
    c.lineTo(-18, 8);
    c.closePath();
    c.fillStyle = rose;
    c.fill();
    c.beginPath();
    c.moveTo(0, -5);
    c.lineTo(21, -14);
    c.lineTo(18, 8);
    c.closePath();
    c.fill();
    r.line([-3, -1, -12, 19], rose, 6);
    r.line([3, -1, 12, 19], rose, 6);
  } else if (kind === "vegetablemedal") {
    r.line([-25, -113, 0, -65, 25, -113], tint ?? lilac, 11);
    r.line([-25, -113, 0, -65, 25, -113], cream, 2);
    r.circle(0, -35, 47, gold);
    r.circle(0, -35, 40, cream);
    c.fillStyle = ink;
    c.font = "bold 9px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("MADE IT NICER", 0, -58);
    c.fillText("FOR SOMEONE", 0, -44);
    c.beginPath();
    c.moveTo(-11, -25);
    c.quadraticCurveTo(0, -39, 11, -25);
    c.lineTo(-3, 2);
    c.closePath();
    c.fillStyle = rose;
    c.fill();
    r.line([0, -28, -8, -36], green, 4);
    r.line([0, -28, 2, -38], green, 4);
    r.line([0, -28, 10, -34], green, 4);
    r.line([-5, -17, 4, -14], cream, 2);
    r.line([-5, -7, 0, -5], cream, 2);
  } else if (kind === "scoreplacard") {
    r.line([-91, -20, -97, 29], brown, 7);
    r.line([91, -20, 97, 29], brown, 7);
    r.round(-131, -121, 262, 112, 8, tan, brown);
    r.round(-122, -112, 244, 94, 5, tint ?? teal);
    c.fillStyle = cream;
    c.font = "bold 20px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(happy ? "EVERYBODY" : "MOUNT OOPS", 0, -89);
    c.font = "bold 27px system-ui";
    c.fillText(happy ? "HELPED" : "SPORTS CLUB", 0, -59);
    if (happy) {
      r.line([-20, -30, 20, -30], gold, 5);
      r.line([-14, -30, -14, -22], gold, 3);
      r.line([14, -30, 14, -22], gold, 3);
      r.line([-18, -38, 18, -38], gold, 4);
    } else r.line([-72, -31, 72, -31], gold, 2);
  } else if (kind === "hurdle") {
    const height = happy ? -117 : -70;
    for (const x of [-86, 86]) {
      r.round(x - 12, -120, 24, 146, 7, tint ?? teal, ink);
      r.round(x - 20, 18, 40, 10, 4, brown);
      r.line([x - 8, -35, x + 8, -35], cream, 4);
      r.line([x - 8, -98, x + 8, -98], cream, 4);
    }
    r.round(-98, height, 196, 18, 5, gold, brown);
    for (const x of [-70, -35, 0, 35, 70])
      r.round(x - 9, height + 3, 18, 12, 3, cream);
    if (happy) {
      r.round(-38, -116, 76, 19, 3, cream);
      c.fillStyle = ink;
      c.font = "bold 10px system-ui";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("THIS WAY", 0, -106);
    }
  } else if (kind === "sportsplate" || kind === "sportsdiscus") {
    c.beginPath();
    c.ellipse(0, -10, 70, 35, 0, 0, Math.PI * 2);
    c.fillStyle = tint ?? cream;
    c.fill();
    c.strokeStyle = tan;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.ellipse(0, -10, 55, 24, 0, 0, Math.PI * 2);
    c.strokeStyle = gold;
    c.lineWidth = 2;
    c.stroke();
    if (happy && kind === "sportsplate")
      for (const x of [-26, 20]) {
        c.beginPath();
        c.moveTo(x - 23, -10);
        c.lineTo(x + 1, -51);
        c.lineTo(x + 26, -7);
        c.closePath();
        c.fillStyle = gold;
        c.fill();
        c.strokeStyle = brown;
        c.lineWidth = 2;
        c.stroke();
        r.line([x - 15, -9, x + 2, -38, x + 17, -9], teal, 5);
        r.line([x - 17, -8, x + 19, -8], rose, 3);
      }
    else {
      r.circle(0, -12, 18, tan);
      r.circle(0, -12, 11, gold);
      r.circle(0, -12, 5, cream);
      if (happy && kind === "sportsdiscus")
        r.line([-42, -20, -31, -25, -20, -27], cream, 3);
    }
  } else if (kind === "sportstowel") {
    r.round(-42, -98, 84, 121, 7, tint ?? lilac, brown);
    r.round(-42, -98, 84, 19, 7, cream);
    r.line([-35, -61, 35, -61], cream, 6);
    r.line([-35, -49, 35, -49], cream, 3);
    r.line([-35, -12, 35, -12], cream, 6);
    for (let i = 0; i < 8; i++)
      r.line([-34 + i * 10, 18, -34 + i * 10, 28], cream, 2);
    if (happy) r.line([-11, -32, -2, -24, 13, -40], gold, 4);
  } else if (kind === "sportscup") {
    r.circle(40, -20, 19, cream);
    r.circle(40, -20, 11, teal);
    r.round(-34, -50, 70, 68, 18, tint ?? cream, brown);
    r.round(-36, -49, 74, 16, 5, lilac);
    r.line([-32, -45, 34, -45], cream, 2);
    r.line([-32, -38, 34, -38], cream, 2);
    c.beginPath();
    c.ellipse(0, -48, 31, 7, 0, 0, Math.PI * 2);
    c.fillStyle = happy ? tan : cream;
    c.fill();
    r.round(-11, -20, 22, 27, 4, teal);
    c.fillStyle = cream;
    c.font = "bold 20px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("7", 0, -5);
    r.round(-43, 17, 86, 9, 4, gold);
  } else if (kind === "modelathletes") {
    // Native feet end at y=28. These transforms place all three feet at the
    // caller's real deck y=0; the renderer, not this art, draws the pontoon.
    for (const [actor, x, scale] of [
      ["coachnika", -48, 0.25],
      ["gus", 0, 0.23],
      ["irisharpy", 48, 0.23],
    ] as const) {
      c.save();
      c.translate(x, -28 * scale);
      c.scale(scale, scale);
      drawSports(r, actor, happy, 0);
      c.restore();
    }
  } else if (kind === "sportshug") {
    // Purpose-built three-person pose: no doubled arms or repeated scene cast.
    // The bench remains recognizable and receives its own medal in the reveal.
    r.line([-144, -10, -144, 30], brown, 9);
    r.line([144, -10, 144, 30], brown, 9);
    r.round(-169, -19, 338, 18, 5, tan, brown);
    c.beginPath();
    c.moveTo(-137, -32);
    c.bezierCurveTo(-205, -21, -210, 14, -180, 10);
    c.strokeStyle = gold;
    c.lineWidth = 9;
    c.stroke();
    c.beginPath();
    c.moveTo(-119, -48);
    c.lineTo(-179, -99);
    c.quadraticCurveTo(-175, -50, -128, -20);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    r.round(-148, -40, 104, 50, 23, gold, brown);
    r.round(-119, -70, 50, 61, 17, teal);
    r.round(-140, 2, 20, 26, 6, tan);
    r.round(-84, 2, 20, 26, 6, tan);
    r.round(-37, -92, 74, 94, 20, tint ?? teal, ink);
    r.round(-18, -64, 36, 40, 5, cream);
    c.fillStyle = ink;
    c.font = "bold 25px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("2", 0, -44);
    r.round(-30, -5, 20, 33, 5, tan);
    r.round(10, -5, 20, 33, 5, tan);
    r.round(76, -70, 48, 74, 18, teal);
    r.line([88, 1, 88, 24, 104, 28], gold, 5);
    r.line([110, 1, 110, 24, 124, 28], gold, 5);
    c.beginPath();
    c.moveTo(118, -60);
    c.lineTo(183, -90);
    c.lineTo(162, -28);
    c.lineTo(145, -41);
    c.lineTo(127, -11);
    c.closePath();
    c.fillStyle = lilac;
    c.fill();
    nikaHead(-99, -97);
    gusHead(0, -111);
    irisHead(100, -103);
    if (happy) {
      r.line([-31, -70, -60, -50, -84, -67], tan, 13);
      r.circle(-84, -67, 8, cream);
      r.line([31, -70, 62, -50, 91, -65], tan, 13);
      r.circle(91, -65, 8, cream);
      r.line([-105, -40, -60, -26, -30, -43], gold, 11);
      r.circle(-30, -43, 6, tan);
      c.beginPath();
      c.moveTo(95, -49);
      c.quadraticCurveTo(63, -20, 24, -45);
      c.lineTo(30, -30);
      c.quadraticCurveTo(63, -1, 105, -29);
      c.closePath();
      c.fillStyle = lilac;
      c.fill();
      r.line([91, -41, 53, -30, 32, -39], cream, 2);
      r.line([129, -19, 141, 2, 154, -19], lilac, 5);
      r.circle(141, 2, 10, gold);
      r.circle(141, 2, 6, cream);
      for (const [x, y] of [
        [-162, -136],
        [-119, -149],
        [-60, -142],
        [60, -149],
        [149, -139],
      ]) {
        r.line([x - 6, y - 4, x, y, x + 6, y - 4], gold, 4);
        r.line([x - 6, y + 4, x, y, x + 6, y + 4], gold, 4);
      }
    } else {
      r.line([-31, -70, -50, -43, -47, -19], tan, 12);
      r.line([31, -70, 50, -43, 47, -19], tan, 12);
      r.line([-105, -40, -124, -19], tan, 10);
    }
  } else return false;
  return true;
}
