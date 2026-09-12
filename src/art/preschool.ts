import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Renderer owns the outer transform. Classroom objects are illustrations, not
// extra platforms, moving targets, water sources, or measuring instruments.
export function drawPreschool(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#47605c",
    green = "#afc6a0",
    leaf = "#779b83",
    lavender = "#b5a4c8",
    lilac = "#d5c8df",
    cream = "#fff0d5",
    fossil = "#dac8a9",
    wood = "#ad8b6e",
    coral = "#dc9d8f";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  if (kind === "principal" || kind === "principalsocks") {
    r.round(-30, 18, 23, 10, 5, leaf);
    r.round(8, 18, 23, 10, 5, leaf);
    r.round(-35, -49, 70, 70, 21, tint ?? lavender, ink);
    r.round(-10, -41, 20, 58, 5, cream);
    r.line([-27, -43, -13, -27, -7, -41], lilac, 5);
    r.line([27, -43, 13, -27, 7, -41], lilac, 5);
    for (const y of [-17, -4, 9]) r.circle(1, y, 2.5, wood);
    r.round(17, -9, 12, 13, 3, lilac);
    r.line([-30, -32, -51, -24, -51, -8], tint ?? lavender, 11);
    r.round(-72, -27, 37, 46, 4, fossil, wood);
    r.round(-61, -31, 16, 9, 3, leaf);
    r.round(-66, -17, 25, 29, 3, cream);
    for (let i = 0; i < 3; i++)
      r.line([-60, -10 + i * 8, -45, -10 + i * 8], wood, 1.5);
    r.circle(-51, -24, 6, green);
    const handY = happy ? -54 + Math.sin(motion * 1.4) * 2 : -14;
    r.line([31, -30, 48, -17, 56, handY], tint ?? lavender, 10);
    r.circle(56, handY, 7, green);
    // A scalloped frill and three separate horns identify Fern as triceratops.
    for (let i = 0; i < 9; i++) {
      const angle = Math.PI + (i * Math.PI) / 8;
      r.circle(Math.cos(angle) * 39, -85 + Math.sin(angle) * 38, 10, leaf);
    }
    r.circle(0, -87, 43, leaf);
    r.circle(0, -88, 35, green);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 15, -103);
      c.quadraticCurveTo(side * 21, -125, side * 35, -139);
      c.quadraticCurveTo(side * 32, -112, side * 28, -97);
      c.closePath();
      c.fillStyle = cream;
      c.fill();
      c.strokeStyle = wood;
      c.lineWidth = 2;
      c.stroke();
    }
    r.round(-34, -105, 68, 63, 29, green, leaf);
    r.round(-29, -75, 58, 30, 15, "#cbd6ad");
    r.face(0, -85, 0.95, true);
    for (const x of [-12, 12]) {
      c.beginPath();
      c.arc(x, -85, 10, 0, Math.PI * 2);
      c.strokeStyle = ink;
      c.lineWidth = 2.5;
      c.stroke();
    }
    r.line([-2, -85, 2, -85], ink, 2.5);
    r.line([-23, -87, -33, -91], ink, 2);
    r.line([23, -87, 33, -91], ink, 2);
    c.beginPath();
    c.moveTo(-5, -68);
    c.quadraticCurveTo(0, -82, 6, -81);
    c.lineTo(6, -67);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    r.circle(-16, -62, 2, leaf);
    r.circle(17, -62, 2, leaf);
    if (kind === "principalsocks") {
      for (const side of [-1, 1]) {
        c.save();
        c.translate(side * 26, -113);
        c.rotate(side * 0.28);
        r.round(-9, -27, 18, 34, 6, side < 0 ? coral : lilac, wood);
        r.round(-9, -29, 28, 15, 7, side < 0 ? coral : lilac);
        r.round(-10, 0, 20, 8, 3, cream);
        r.line([-6, -8, 6, -8], cream, 2);
        r.circle(10, -22, 3, cream);
        c.restore();
      }
    }
    if (happy) {
      r.circle(-23, -8, 10, coral);
      r.circle(-23, -8, 7, cream);
      r.line([-27, -8, -23, -4, -18, -12], leaf, 2);
    }
  } else if (kind === "ankylosaur") {
    c.beginPath();
    c.moveTo(41, -17);
    c.quadraticCurveTo(62, 5, 80, -7);
    c.strokeStyle = leaf;
    c.lineWidth = 12;
    c.lineCap = "round";
    c.stroke();
    r.circle(82, -9, 13, lavender);
    r.circle(91, -5, 8, lavender);
    r.line([81, -18, 88, -13], lilac, 3);
    for (const x of [-29, -6, 21, 42]) {
      r.round(x - 8, -7, 16, 30, 7, leaf);
      r.round(x - 9, 17, 18, 8, 4, green);
    }
    r.round(-46, -60, 100, 65, 30, tint ?? green, leaf);
    for (let i = 0; i < 5; i++) {
      const x = -29 + i * 18,
        y = -53 - Math.sin((i * Math.PI) / 4) * 14;
      r.round(x - 8, y - 8, 16, 24, 8, lavender, leaf);
      r.line([x - 3, y - 1, x + 3, y - 1], lilac, 2);
    }
    for (const [x, y] of [
      [-13, -27],
      [8, -32],
      [29, -24],
    ])
      r.round(x - 7, y - 5, 14, 12, 5, "#91b095");
    r.round(-65, -49, 49, 46, 22, tint ?? green, leaf);
    r.circle(-54, -47, 7, lavender);
    r.circle(-29, -50, 7, lavender);
    r.round(-63, -27, 44, 25, 12, "#cbd6ad");
    r.face(-41, -30, 0.88, true);
    if (happy) {
      r.line([-30, -6, -40, -3, -43, -13], leaf, 6);
      r.circle(-43, -13, 5, green);
    }
  } else if (kind === "diplodocus") {
    c.beginPath();
    c.moveTo(-35, -25);
    c.quadraticCurveTo(-69, -19, -91, -2);
    c.quadraticCurveTo(-64, 2, -36, -8);
    c.closePath();
    c.fillStyle = tint ?? green;
    c.fill();
    for (const x of [-35, -14, 17, 38]) {
      r.round(x - 7, -9, 14, 34, 6, leaf);
      r.round(x - 8, 17, 17, 9, 4, tint ?? green);
    }
    r.round(-48, -46, 100, 57, 27, tint ?? green, leaf);
    c.beginPath();
    c.moveTo(24, -22);
    c.bezierCurveTo(29, -75, -27, -130, 4, -169);
    c.strokeStyle = leaf;
    c.lineWidth = 29;
    c.lineCap = "round";
    c.stroke();
    c.strokeStyle = tint ?? green;
    c.lineWidth = 24;
    c.stroke();
    for (const [x, y] of [
      [-31, -28],
      [-10, -18],
      [14, -36],
      [14, -74],
      [-1, -102],
      [-6, -135],
    ])
      r.circle(x, y, 5, lavender);
    r.round(-4, -187, 56, 37, 17, tint ?? green, leaf);
    r.round(31, -174, 30, 24, 11, "#cbd6ad");
    r.face(25, -173, 0.78, true);
    r.circle(53, -164, 2, leaf);
    r.line([-14, -119, -2, -116, 9, -119], lavender, 8);
    r.line([2, -117, 14, -98, 19, -101], lavender, 6);
    r.round(-7, -108, 17, 21, 3, cream, wood);
    r.circle(1, -101, 3.5, coral);
    r.line([-3, -94, 5, -94], leaf, 1.5);
    if (happy) r.line([0, -189, 9, -197, 18, -189], lavender, 4);
  } else if (kind === "diplodocusframe") {
    // One continuous neck, real body, and tapering tail form a living border.
    // The center stays unpainted for the actual family portrait composition.
    c.beginPath();
    c.moveTo(240, -21);
    c.bezierCurveTo(117, -6, -155, -28, -305, 6);
    c.bezierCurveTo(-126, -2, 124, 22, 247, 4);
    c.closePath();
    c.fillStyle = tint ?? green;
    c.fill();
    c.strokeStyle = leaf;
    c.lineWidth = 2;
    c.stroke();
    const curves = [
      [244, -22, 271, -116, 292, -212, 245, -243],
      [245, -243, 202, -271, -222, -271, -256, -241],
      [-256, -241, -293, -190, -280, -104, -269, -60],
    ];
    c.beginPath();
    c.moveTo(244, -22);
    for (const segment of curves)
      c.bezierCurveTo(
        segment[2],
        segment[3],
        segment[4],
        segment[5],
        segment[6],
        segment[7],
      );
    c.strokeStyle = leaf;
    c.lineWidth = 36;
    c.lineCap = "round";
    c.stroke();
    c.strokeStyle = tint ?? green;
    c.lineWidth = 31;
    c.stroke();
    for (const segment of curves)
      for (const t of [0.2, 0.5, 0.8]) {
        const u = 1 - t;
        const x =
          u ** 3 * segment[0] +
          3 * u ** 2 * t * segment[2] +
          3 * u * t ** 2 * segment[4] +
          t ** 3 * segment[6];
        const y =
          u ** 3 * segment[1] +
          3 * u ** 2 * t * segment[3] +
          3 * u * t ** 2 * segment[5] +
          t ** 3 * segment[7];
        r.circle(x, y, 5.5, lavender);
      }
    r.round(219, -50, 84, 57, 26, tint ?? green, leaf);
    r.round(232, -4, 18, 23, 7, leaf);
    r.round(275, -3, 18, 22, 7, leaf);
    r.circle(246, -28, 7, lavender);
    r.circle(274, -18, 6, lavender);
    r.round(-297, -76, 59, 38, 17, tint ?? green, leaf);
    r.round(-265, -62, 30, 25, 11, "#cbd6ad");
    r.face(-268, -61, 0.77, true);
    r.circle(-242, -52, 2, leaf);
    r.line([-285, -88, -277, -79, -260, -83], lavender, 7);
  } else if (kind === "pterosaur") {
    const lift = happy ? Math.sin(motion * 1.3) * 3 : 0;
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 12, -52);
      c.quadraticCurveTo(side * 43, -81, side * 86, -87 - lift);
      c.quadraticCurveTo(side * 68, -48, side * 71, -18);
      c.quadraticCurveTo(side * 39, -32, side * 18, 1);
      c.closePath();
      c.fillStyle = tint ?? lilac;
      c.fill();
      c.strokeStyle = lavender;
      c.lineWidth = 3;
      c.stroke();
      r.line(
        [side * 15, -49, side * 86, -87 - lift, side * 51, -36],
        lavender,
        2,
      );
      r.line([side * 13, -45, side * 51, -36, side * 23, -9], lavender, 2);
    }
    r.round(-19, -58, 38, 72, 18, tint ?? lavender, ink);
    r.round(-11, -31, 22, 37, 10, cream);
    r.line([-9, 9, -16, 23, -24, 23], ink, 4);
    r.line([9, 9, 16, 23, 24, 23], ink, 4);
    c.beginPath();
    c.moveTo(-15, -70);
    c.lineTo(-5, -109);
    c.lineTo(14, -74);
    c.closePath();
    c.fillStyle = lavender;
    c.fill();
    r.round(-23, -82, 46, 32, 15, lilac, ink);
    r.face(0, -68, 0.77, true);
    c.beginPath();
    c.moveTo(-6, -58);
    c.lineTo(16, -59);
    c.lineTo(31, -48);
    c.lineTo(-2, -49);
    c.closePath();
    c.fillStyle = fossil;
    c.fill();
    r.line([4, -53, 23, -51], wood, 1.5);
  } else if (kind === "nest") {
    r.round(-65, -23, 130, 43, 20, wood);
    c.beginPath();
    c.ellipse(0, -21, 66, 23, 0, 0, Math.PI * 2);
    c.fillStyle = fossil;
    c.fill();
    c.beginPath();
    c.ellipse(0, -21, 52, 15, 0, 0, Math.PI * 2);
    c.fillStyle = cream;
    c.fill();
    for (let i = 0; i < 6; i++) {
      const x = -51 + i * 19;
      r.line([x - 6, 1, x + 16, 12, x + 25, 7], fossil, 4);
      r.line([x - 10, -15, x + 9, -6], wood, 2);
    }
    r.round(-39, -33, 29, 20, 8, lilac);
    if (happy) {
      c.beginPath();
      c.moveTo(-17, -27);
      c.quadraticCurveTo(18, -42, 51, -22);
      c.lineTo(44, -6);
      c.quadraticCurveTo(11, -16, -15, -8);
      c.closePath();
      c.fillStyle = tint ?? lavender;
      c.fill();
      r.line([-2, -17, 5, -21, 12, -17, 19, -21, 26, -17], cream, 2);
    }
  } else if (kind === "leafbowl") {
    c.beginPath();
    c.moveTo(-66, -31);
    c.quadraticCurveTo(-42, -56, 0, -33);
    c.quadraticCurveTo(43, -56, 66, -31);
    c.quadraticCurveTo(49, 22, 0, 20);
    c.quadraticCurveTo(-49, 22, -66, -31);
    c.closePath();
    c.fillStyle = tint ?? green;
    c.fill();
    c.strokeStyle = leaf;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.ellipse(0, -29, 56, 15, 0, 0, Math.PI * 2);
    c.fillStyle = leaf;
    c.fill();
    r.line([-46, -9, -26, 3, 0, 12, 29, 2, 46, -9], "#d1dcb5", 2);
    r.line([0, -12, 0, 14], "#d1dcb5", 2);
    if (happy)
      for (const [x, y] of [
        [-24, -26],
        [0, -32],
        [25, -25],
      ]) {
        c.beginPath();
        c.moveTo(x, y + 5);
        c.quadraticCurveTo(x - 18, y - 13, x + 5, y - 26);
        c.quadraticCurveTo(x + 20, y - 2, x, y + 5);
        c.fillStyle = cream;
        c.fill();
        r.line([x, y + 3, x + 4, y - 17], green, 2);
      }
  } else if (kind === "fossilblock") {
    r.round(-59, -72, 118, 96, 12, tint ?? fossil, wood);
    r.round(-51, -65, 102, 80, 9, "#e8d9bd");
    r.line([-45, 8, -38, 12, 42, 12, 49, 5], cream, 3);
    c.beginPath();
    for (let i = 0; i <= 48; i++) {
      const angle = (i * Math.PI * 4) / 48;
      const radius = 2 + (i * 25) / 48;
      const x = Math.cos(angle) * radius,
        y = -28 + Math.sin(angle) * radius;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.strokeStyle = wood;
    c.lineWidth = 4;
    c.lineCap = "round";
    c.stroke();
    for (const [x, y] of [
      [-36, -45],
      [37, -11],
      [-31, -7],
    ])
      r.circle(x, y, 2, wood);
    if (happy) r.line([34, -50, 39, -45, 46, -55], leaf, 3);
  } else if (kind === "badge") {
    c.beginPath();
    c.moveTo(-24, -26);
    c.lineTo(-32, 28);
    c.lineTo(-14, 17);
    c.lineTo(-1, 29);
    c.lineTo(0, -21);
    c.closePath();
    c.fillStyle = tint ?? lavender;
    c.fill();
    c.beginPath();
    c.moveTo(7, -26);
    c.lineTo(32, 28);
    c.lineTo(33, 9);
    c.lineTo(49, 15);
    c.lineTo(23, -32);
    c.closePath();
    c.fillStyle = coral;
    c.fill();
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      r.circle(Math.cos(a) * 33, -40 + Math.sin(a) * 33, 9, tint ?? lavender);
    }
    r.circle(0, -40, 34, cream);
    r.circle(0, -40, 29, fossil);
    r.circle(0, -40, 25, cream);
    c.fillStyle = ink;
    c.font = "bold 10px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(happy ? "EXCELLENT" : "HELPER", 0, -47);
    c.fillText(happy ? "GROWN-UP" : "IN TRAINING", 0, -34);
    r.circle(0, -22, 3, coral);
  } else if (kind === "crayon") {
    r.round(-15, -86, 30, 100, 4, tint ?? coral, wood);
    r.round(-17, -66, 34, 57, 3, cream);
    r.line([-14, -57, 14, -57], ink, 3);
    r.line([-14, -18, 14, -18], ink, 3);
    r.round(-11, -47, 22, 20, 5, tint ?? coral);
    c.beginPath();
    c.moveTo(-14, -86);
    c.lineTo(-7, -110);
    c.quadraticCurveTo(0, -122, 7, -110);
    c.lineTo(14, -86);
    c.closePath();
    c.fillStyle = tint ?? coral;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.line([-5, -104, -8, -94], cream, 2);
    if (happy) r.line([-6, -37, -1, -32, 7, -42], cream, 2);
  } else if (kind === "cubby") {
    r.round(-78, -122, 156, 147, 8, wood);
    r.round(-72, -116, 144, 133, 5, tint ?? fossil);
    for (const x of [-65, 7])
      for (const y of [-109, -43]) {
        r.round(x, y, 58, 55, 4, "#9b8e7c");
        r.round(x + 4, y + 3, 50, 47, 3, "#cfc6b1");
        r.line([x + 26, y + 10, x + 26, y + 20, x + 32, y + 20], wood, 3);
      }
    r.round(-75, -53, 150, 10, 2, fossil);
    r.round(-6, -119, 12, 137, 2, fossil);
    for (const x of [-37, 35]) {
      r.round(x - 18, -57, 36, 15, 3, cream);
      r.circle(x, -50, 4, x < 0 ? leaf : lavender);
    }
    if (happy)
      for (const [x, color] of [
        [-60, lilac],
        [12, green],
      ] as const) {
        r.round(x, -8, 47, 18, 4, color);
        r.line([x + 7, -2, x + 39, -2], cream, 2);
      }
  } else if (kind === "mobile") {
    r.line([0, -153, 0, -123], wood, 3);
    r.circle(0, -157, 6, lavender);
    r.line([-68, -110, 0, -123, 68, -110], wood, 5);
    for (let i = 0; i < 3; i++) {
      const x = -62 + i * 62,
        y = i === 1 ? -44 : -65;
      r.line([x, i === 1 ? -123 : -111, x, y - 19], wood, 2);
      r.round(x - 23, y - 12, 46, 29, 13, i === 1 ? green : lilac, ink);
      r.circle(x - 13, y - 13, 10, i === 1 ? green : lilac);
      r.face(x - 12, y - 15, 0.35, true);
      r.line([x + 18, y + 1, x + 31, y - 7], i === 1 ? green : lilac, 5);
      if (happy) {
        c.beginPath();
        c.moveTo(x - 28, y + 3);
        c.quadraticCurveTo(x, y + 30, x + 29, y + 3);
        c.lineTo(x + 22, y + 20);
        c.quadraticCurveTo(x, y + 35, x - 23, y + 19);
        c.closePath();
        c.fillStyle = i === 1 ? coral : lavender;
        c.fill();
        r.line([x - 17, y + 13, x + 15, y + 14], cream, 2);
      }
    }
  } else if (kind === "storybook") {
    c.beginPath();
    c.moveTo(-86, -77);
    c.quadraticCurveTo(-41, -88, 0, -69);
    c.quadraticCurveTo(42, -88, 86, -77);
    c.lineTo(86, 15);
    c.quadraticCurveTo(45, 7, 0, 24);
    c.quadraticCurveTo(-43, 7, -86, 15);
    c.closePath();
    c.fillStyle = tint ?? lavender;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 3;
    c.stroke();
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 5, -64);
      c.quadraticCurveTo(side * 39, -82, side * 78, -70);
      c.lineTo(side * 78, 5);
      c.quadraticCurveTo(side * 41, 1, side * 5, 15);
      c.closePath();
      c.fillStyle = cream;
      c.fill();
    }
    r.line([0, -66, 0, 21], wood, 2);
    r.circle(-43, -43, 17, fossil);
    r.circle(-49, -46, 3, cream);
    r.circle(-37, -35, 4, cream);
    r.line([-66, -11, -19, -11], wood, 2);
    r.line([-65, -4, -26, -4], wood, 2);
    for (let i = 0; i < 4; i++)
      r.line([18, -50 + i * 10, 66 - i * 3, -50 + i * 10], wood, 2);
    if (happy) {
      r.circle(45, -3, 8, coral);
      r.line([40, -3, 44, 1, 51, -7], cream, 2);
    }
  } else if (kind === "classfern") {
    r.line([0, 3, 0, -66], leaf, 4);
    for (let i = 0; i < 3; i++)
      for (const side of [-1, 1]) {
        const y = -15 - i * 15;
        c.beginPath();
        c.moveTo(0, y + 4);
        c.quadraticCurveTo(side * 29, y + 3, side * 30, y - 13);
        c.quadraticCurveTo(side * 12, y - 17, 0, y + 4);
        c.fillStyle = tint ?? green;
        c.fill();
        r.line([side * 3, y, side * 23, y - 8], leaf, 1.5);
      }
    if (happy) {
      // The new top leaf really has Fern's two-lens silhouette.
      for (const x of [-17, 17]) {
        c.beginPath();
        c.ellipse(x, -75, 14, 12, x < 0 ? -0.12 : 0.12, 0, Math.PI * 2);
        c.strokeStyle = leaf;
        c.lineWidth = 6;
        c.stroke();
      }
      r.line([-3, -76, 3, -76], leaf, 4);
      r.line([-31, -78, -39, -83], leaf, 4);
      r.line([31, -78, 39, -83], leaf, 4);
    } else {
      c.beginPath();
      c.moveTo(0, -63);
      c.quadraticCurveTo(-18, -78, 0, -88);
      c.quadraticCurveTo(19, -76, 0, -63);
      c.fillStyle = tint ?? green;
      c.fill();
      r.line([0, -68, 0, -81], leaf, 2);
    }
    r.round(-23, -4, 46, 29, 7, coral, wood);
    r.round(-27, -8, 54, 10, 4, fossil, wood);
    r.circle(0, 12, 7, cream);
    r.line([-3, 14, 1, 7, 4, 14], leaf, 2);
  } else if (kind === "toothflower") {
    r.line([0, 17, 0, -41], leaf, 4);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(0, 1);
      c.quadraticCurveTo(side * 27, 5, side * 31, -20);
      c.quadraticCurveTo(side * 7, -22, 0, 1);
      c.fillStyle = tint ?? green;
      c.fill();
      r.line([side * 5, -4, side * 24, -15], leaf, 2);
    }
    c.beginPath();
    c.moveTo(0, -75);
    c.bezierCurveTo(-25, -95, -35, -69, -21, -50);
    c.bezierCurveTo(-17, -29, -6, -24, -3, -47);
    c.quadraticCurveTo(0, -55, 4, -47);
    c.bezierCurveTo(8, -24, 19, -31, 22, -51);
    c.bezierCurveTo(36, -72, 22, -94, 0, -75);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    c.strokeStyle = fossil;
    c.lineWidth = 3;
    c.stroke();
    r.face(0, -66, 0.62, true);
    r.round(-30, 14, 60, 10, 5, fossil);
    if (happy) r.circle(20, -78, 3, "#ffffff");
  } else if (kind === "bat") {
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 12, -32);
      c.quadraticCurveTo(side * 32, -59, side * 62, -50);
      c.lineTo(side * 52, -17);
      c.quadraticCurveTo(side * 38, -28, side * 32, -8);
      c.quadraticCurveTo(side * 23, -21, side * 13, -4);
      c.closePath();
      c.fillStyle = tint ?? lavender;
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 2;
      c.stroke();
      r.line([side * 16, -29, side * 51, -43, side * 33, -19], lilac, 2);
    }
    r.round(-17, -32, 34, 49, 15, tint ?? lavender, ink);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 5, -44);
      c.lineTo(side * 15, -66);
      c.quadraticCurveTo(side * 26, -50, side * 17, -36);
      c.closePath();
      c.fillStyle = tint ?? lavender;
      c.fill();
      r.line([side * 13, -46, side * 16, -55], coral, 3);
    }
    r.circle(0, -34, 20, lilac);
    r.face(0, -38, 0.65, true);
    r.circle(0, -30, 3, coral);
    r.line([-13, 9, -17, 21], ink, 3);
    r.line([13, 9, 17, 21], ink, 3);
    if (happy) {
      c.beginPath();
      c.moveTo(-24, -12);
      c.lineTo(0, -7);
      c.lineTo(24, -12);
      c.lineTo(24, 9);
      c.lineTo(0, 14);
      c.lineTo(-24, 9);
      c.closePath();
      c.fillStyle = cream;
      c.fill();
      c.strokeStyle = wood;
      c.lineWidth = 2;
      c.stroke();
      r.line([0, -6, 0, 12], wood, 1.5);
      r.circle(-23, 0, 4, lavender);
      r.circle(23, 0, 4, lavender);
    }
  } else if (kind === "papercrown") {
    c.beginPath();
    c.moveTo(-51, -2);
    c.lineTo(-58, -60);
    c.lineTo(-26, -36);
    c.lineTo(0, -70);
    c.lineTo(26, -36);
    c.lineTo(58, -60);
    c.lineTo(51, -2);
    c.closePath();
    c.fillStyle = tint ?? "#edd18b";
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.line([-27, -34, -22, -7], cream, 2);
    r.line([27, -34, 22, -7], cream, 2);
    r.round(-52, -12, 104, 14, 3, fossil, wood);
    for (const x of [-31, 0, 31])
      r.circle(x, -5, 4, x === 0 ? coral : lavender);
    if (happy) r.line([-5, -34, 0, -29, 7, -39], coral, 3);
  } else return false;
  return true;
}
