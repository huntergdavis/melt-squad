import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Renderer owns the outer prop transform. These are small, original stage props;
// the clock, pendulum, and light are illustrations, not additional game rules.
export function drawCircus(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#31525a",
    brass = "#d7ae67",
    brassShade = "#a47d50",
    cream = "#fff0d3",
    coral = "#db8e7d",
    teal = "#527e7d";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  if (kind === "ringmaster") {
    // Small shoes and two coat tails keep Tick distinct from the round beetle.
    r.line([-12, 8, -13, 23, -24, 24], ink, 9);
    r.line([12, 8, 13, 23, 24, 24], ink, 9);
    r.round(-23, -35, 46, 45, 13, tint ?? coral, brassShade);
    r.line([-17, -2, -23, 15, -5, 7], tint ?? coral, 9);
    r.line([17, -2, 23, 15, 5, 7], tint ?? coral, 9);
    r.round(-9, -31, 18, 32, 5, cream);
    r.line([-17, -33, -9, -19, -3, -30], brass, 4);
    r.line([17, -33, 9, -19, 3, -30], brass, 4);
    r.circle(0, -15, 2.5, brassShade);
    r.circle(0, -5, 2.5, brassShade);
    const handY = happy ? -46 + Math.sin(motion * 1.4) * 2 : -19;
    r.line([-20, -26, -34, -16, -49, handY], tint ?? coral, 10);
    r.circle(-49, handY, 6, cream);
    r.line([21, -26, 32, -12, 42, -18], tint ?? coral, 10);
    // Start the cane's curved path explicitly: never connect it to old ink.
    c.beginPath();
    c.moveTo(43, 24);
    c.lineTo(43, -26);
    c.bezierCurveTo(43, -40, 57, -40, 57, -28);
    c.strokeStyle = brassShade;
    c.lineWidth = 4;
    c.lineCap = "round";
    c.stroke();
    r.circle(43, -18, 5.5, cream);
    r.round(-10, -48, 20, 13, 4, teal);
    r.circle(0, -70, 31, brassShade);
    r.circle(0, -71, 28, brass);
    r.circle(0, -71, 23, cream);
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const x = Math.sin(angle) * 24,
        y = -71 - Math.cos(angle) * 24;
      r.circle(x, y, happy ? 2.3 : 1.3, happy && i % 2 ? coral : teal);
    }
    r.line([0, -93, 0, -82, happy ? 9 : 7, happy ? -79 : -85], ink, 2.2);
    r.circle(0, -82, 2.5, brassShade);
    r.face(0, -66, 0.67, happy);
    r.round(-29, -99, 58, 7, 3, ink);
    r.round(-18, -114, 36, 21, 6, teal, ink);
    r.round(-18, -101, 36, 6, 2, coral);
    r.circle(12, -100, 3, brass);
  } else if (kind === "giraffe") {
    const coat = tint ?? brass;
    r.line([-34, -18, -50, -30, -51, -18], brassShade, 4);
    r.circle(-51, -16, 4, coral);
    for (const x of [-29, -13, 14, 28]) {
      r.line([x, -2, x, 20], coat, 9);
      r.round(x - 6, 17, 14, 8, 3, brassShade);
    }
    r.round(-43, -38, 81, 45, 20, coat, brassShade);
    c.beginPath();
    c.moveTo(-29, -13);
    c.bezierCurveTo(-22, -56, -33, -112, -9, -145);
    c.lineTo(11, -140);
    c.bezierCurveTo(-3, -108, 5, -61, 1, -13);
    c.closePath();
    c.fillStyle = coat;
    c.fill();
    c.strokeStyle = brassShade;
    c.lineWidth = 3;
    c.stroke();
    for (const [x, y, w, h] of [
      [-21, -125, 12, 10],
      [-17, -104, 13, 11],
      [-24, -78, 12, 12],
      [-19, -53, 13, 12],
      [-32, -26, 15, 12],
      [3, -24, 16, 12],
      [22, -11, 9, 9],
    ])
      r.round(x, y, w, h, 4, brassShade);
    r.circle(-15, -146, 8, coat);
    r.circle(-17, -148, 4, coral);
    r.line([-3, -148, -6, -163], brassShade, 4);
    r.line([13, -148, 14, -164], brassShade, 4);
    r.circle(-6, -164, 4, brass);
    r.circle(14, -165, 4, brass);
    r.round(-13, -153, 44, 31, 14, coat, brassShade);
    r.round(14, -140, 36, 23, 11, "#edcd8d", brassShade);
    r.face(13, -140, 0.52, happy);
    r.circle(42, -132, 2, brassShade);
    // Bea's scarf stays intentionally crooked in either expression.
    r.line([-24, -99, -12, -94, 3, -97], coral, 10);
    r.circle(-8, -95, 6, "#efb196");
    const flutter = happy ? Math.sin(motion * 1.3) * 2 : 0;
    r.line([-5, -94, 6, -79, 15 + flutter, -82], coral, 8);
    r.line([-11, -92, -5, -67, 0, -69], "#efb196", 7);
    r.line([8 + flutter, -80, 11 + flutter, -85], cream, 2);
    if (happy) r.circle(-24, -96, 3, cream);
  } else if (kind === "beetle") {
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        r.line(
          [
            side * 24,
            -24 + i * 14,
            side * 42,
            -28 + i * 15,
            side * 49,
            -19 + i * 15,
          ],
          brassShade,
          5,
        );
      }
    }
    r.round(-31, -36, 62, 50, 22, tint ?? teal, ink);
    r.line([-23, -29, -28, 3], brass, 3);
    r.line([23, -29, 28, 3], brass, 3);
    c.beginPath();
    c.moveTo(-18, 10);
    c.lineTo(-11, -31);
    c.lineTo(11, -31);
    c.lineTo(18, 10);
    c.closePath();
    c.fillStyle = brass;
    c.fill();
    r.round(-10, -25, 20, 31, 5, ink);
    r.line([-6, -21, 6, -21], "#99b6a9", 2);
    r.line([-7, -13, 7, -13], "#99b6a9", 2);
    const swing = happy ? Math.sin(motion * 1.8) * 8 : -3;
    r.line([0, 4, swing, -25], cream, 2.5);
    r.round(swing * 0.65 - 4, -17, 8, 8, 2, coral);
    r.circle(0, 4, 3.5, brassShade);
    r.line([-8, -51, -15, -62], brassShade, 2.5);
    r.line([8, -51, 15, -62], brassShade, 2.5);
    r.circle(-15, -62, 2.5, coral);
    r.circle(15, -62, 2.5, coral);
    r.circle(0, -43, 17, brassShade);
    r.circle(0, -43, 14.5, cream);
    r.face(0, -46, 0.48, happy);
    r.round(-32, 9, 64, 6, 3, brassShade);
  } else if (kind === "drum") {
    c.beginPath();
    c.ellipse(0, 7, 43, 10, 0, 0, Math.PI * 2);
    c.fillStyle = brassShade;
    c.fill();
    r.round(-43, -45, 86, 52, 7, tint ?? coral, brassShade);
    for (let i = 0; i < 5; i++) {
      const x = -35 + i * 14;
      r.line([x, -38, x + 7, 2, x + 14, -38], cream, 2.5);
      r.circle(x + 7, 2, 2.5, brassShade);
    }
    r.round(-45, 1, 90, 8, 3, brass);
    c.beginPath();
    c.ellipse(0, -44, 44, 12, 0, 0, Math.PI * 2);
    c.fillStyle = cream;
    c.fill();
    c.strokeStyle = brassShade;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.ellipse(0, -44, 35, 7, 0, 0, Math.PI * 2);
    c.strokeStyle = "#dec79e";
    c.lineWidth = 1.5;
    c.stroke();
    const lift = happy ? 3 + Math.sin(motion * 1.8) * 2 : 0;
    r.line([-28, -59 - lift, 6, -35], brassShade, 4);
    r.line([29, -58 - lift, -7, -34], brassShade, 4);
    r.circle(-29, -60 - lift, 4.5, brass);
    r.circle(30, -59 - lift, 4.5, brass);
    r.circle(0, -18, 8, cream);
    r.circle(0, -18, 4, teal);
  } else if (kind === "circuswheel") {
    r.line([-19, -4, -34, 22], brassShade, 7);
    r.line([19, -4, 34, 22], brassShade, 7);
    r.round(-41, 18, 82, 9, 4, teal);
    r.circle(0, -31, 49, brassShade);
    r.circle(0, -31, 44, cream);
    r.circle(0, -31, 38, "#d8ddd0");
    c.save();
    c.translate(0, -31);
    c.rotate(happy ? motion * 0.28 : Math.PI / 16);
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x = Math.cos(angle) * 34,
        y = Math.sin(angle) * 34;
      r.line([0, 0, x, y], brassShade, 3);
      c.save();
      c.translate(x, y);
      c.rotate(angle + Math.PI / 2);
      r.round(-8, -9, 16, 18, 4, i % 2 ? (tint ?? coral) : teal);
      if (happy) {
        r.line([-4, 1, -1, -3, 2, 1, 5, -3], cream, 2);
        r.circle(0, 5, 1.5, brass);
      } else r.line([-4, -2, 4, -2, 4, 2, -4, 2], cream, 1.5);
      c.restore();
    }
    c.restore();
    r.circle(0, -31, 13, brass);
    r.circle(0, -31, 7, teal);
    r.circle(-2, -34, 2.5, cream);
  } else if (kind === "ticket") {
    r.round(-40, -68, 80, 86, 7, tint ?? cream, brassShade);
    r.round(-33, -61, 66, 19, 3, happy ? coral : teal);
    c.fillStyle = cream;
    c.font = "bold 10px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(happy ? "BRAVO!" : "PROGRAM", 0, -51);
    for (let i = 0; i < 7; i++) r.circle(-28 + i * 9, 4, 1, brassShade);
    if (happy) {
      r.prop("heart", 0, -18, 0.3, true);
      r.line([-26, -26, -20, -23], brassShade, 2);
      r.line([20, -23, 26, -26], brassShade, 2);
    } else {
      for (let i = 0; i < 3; i++) {
        r.circle(-25, -32 + i * 10, 2, coral);
        r.line([-17, -32 + i * 10, 24 - i * 5, -32 + i * 10], "#81998c", 2);
      }
    }
    r.line([-17, 11, 17, 11], brassShade, 2);
  } else if (kind === "biscuit") {
    if (happy) r.round(-36, 6, 72, 11, 5, cream);
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      r.circle(Math.cos(angle) * 27, -16 + Math.sin(angle) * 27, 6, brassShade);
    }
    r.circle(0, -16, 30, tint ?? "#e3b66f");
    r.circle(0, -16, 24, "#f0cd8b");
    for (const [x, y] of [
      [-13, -29],
      [2, -33],
      [14, -24],
      [-16, -12],
      [-3, -18],
      [12, -8],
      [-2, 1],
    ]) {
      r.round(x - 2, y - 2, 4, 4, 1.5, brassShade);
      r.circle(x - 1, y - 1, 0.8, "#986845");
    }
    r.line([-15, -35, -5, -39], "#fff0bb", 2.5);
  } else if (kind === "spotlight") {
    if (happy) {
      c.beginPath();
      c.moveTo(-13, -61);
      c.lineTo(-41, -101);
      c.quadraticCurveTo(0, -110, 41, -101);
      c.lineTo(13, -61);
      c.closePath();
      c.fillStyle = "#ffdfa43d";
      c.fill();
    }
    r.line([0, -34, 0, 17], brassShade, 7);
    r.line([0, 13, -29, 25], ink, 6);
    r.line([0, 13, 29, 25], ink, 6);
    r.round(-15, 15, 30, 8, 3, teal);
    r.line([-26, -51, -26, -28, 26, -28, 26, -51], brassShade, 5);
    r.round(-23, -65, 46, 34, 12, tint ?? teal, ink);
    r.circle(0, -51, 17, brass);
    r.circle(0, -51, 12, happy ? "#fff5d3" : "#98b8af");
    r.line([-5, -57, 1, -60], happy ? "#ffffff" : "#c5d7c4", 3);
    r.circle(-26, -44, 4, coral);
    r.circle(26, -44, 4, coral);
  } else if (kind === "clockhat") {
    r.round(-42, -94, 84, 83, 13, tint ?? teal, ink);
    r.round(-58, -15, 116, 20, 8, teal, brassShade);
    r.round(-42, -26, 84, 13, 3, coral);
    r.circle(0, -57, 29, brass);
    r.circle(0, -57, 24, cream);
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      r.circle(Math.sin(a) * 20, -57 - Math.cos(a) * 20, 1.7, ink);
    }
    r.line([0, -75, 0, -57, 0, -44], ink, 3);
    r.circle(0, -57, 3, coral);
    if (happy) r.prop("biscuit", 36, -21, 0.2, false);
  } else if (kind === "microphone") {
    r.line([0, -20, 0, 23], brassShade, 6);
    r.round(-26, 18, 52, 10, 5, ink);
    r.round(-20, -72, 40, 53, 16, brass, ink);
    r.round(-14, -66, 28, 37, 11, cream);
    for (let y = -59; y <= -35; y += 8) r.line([-9, y, 9, y], brassShade, 3);
    r.line([-24, -52, -24, -22, 24, -22, 24, -52], teal, 5);
    if (happy) {
      r.line([31, -61, 42, -68], brass, 3);
      r.line([32, -48, 47, -48], brass, 3);
    }
  } else if (kind === "circustable") {
    // An ordinary table: the content author aligns its four legs over the
    // completed stage blocks. No hidden balance or support mechanic is drawn.
    for (const x of [-85, -66, 66, 85]) {
      r.line([x, -38, x + (x < 0 ? -4 : 4), 21], brassShade, 8);
    }
    r.round(-99, -37, 198, 13, 3, "#c4a37b");
    r.line([-86, -31, 86, -31], "#e0c59b", 2);
    r.round(-110, -50, 220, 14, 6, tint ?? "#f1dfbe", brassShade);
    r.round(-104, -48, 208, 6, 3, cream);
    r.line([-88, -39, -47, -39], "#d9bd91", 1.5);
    r.line([41, -39, 83, -39], "#d9bd91", 1.5);
    if (happy) r.round(-16, -49, 32, 6, 2, "#e5bc92");
  } else return false;
  return true;
}
