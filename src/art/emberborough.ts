import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Local coordinates: Renderer owns translation and scale. Civic fittings,
// fountain spray, applause, and door opening are presentation, not new rules.
export function drawEmberborough(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#405458",
    brass = "#d9b36e",
    bronze = "#a37d54",
    cream = "#fff0d5",
    coral = "#ca8b7a",
    teal = "#648a82",
    sage = "#abc1a1",
    frost = "#b5d3d5",
    plum = "#a995b5";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  if (kind === "cindermayor") {
    c.beginPath();
    c.moveTo(26, 2);
    c.bezierCurveTo(76, 30, 97, -4, 74, -17);
    c.strokeStyle = tint ?? coral;
    c.lineWidth = 13;
    c.lineCap = "round";
    c.stroke();
    r.circle(74, -17, 8, brass);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 25, -58);
      c.lineTo(side * 73, -91);
      c.quadraticCurveTo(side * 60, -62, side * 75, -35);
      c.quadraticCurveTo(side * 49, -40, side * 30, -11);
      c.closePath();
      c.fillStyle = teal;
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 2.5;
      c.stroke();
      r.line([side * 28, -55, side * 65, -78, side * 58, -44], sage, 2);
    }
    r.round(-33, -68, 66, 88, 29, tint ?? coral, ink);
    r.round(-20, -49, 40, 60, 18, cream);
    r.round(-30, 17, 24, 11, 5, tint ?? coral);
    r.round(9, 17, 24, 11, 5, tint ?? coral);
    const lift = happy ? Math.sin(motion * 1.3) * 2 : 0;
    r.line([-28, -47, -43, -31, -59, -31 - lift], tint ?? coral, 12);
    r.circle(-59, -31 - lift, 7, cream);
    // This right hand also holds the actual ribbon endpoint in the finale.
    r.line([29, -47, 43, -26, 61, -29], tint ?? coral, 12);
    r.circle(61, -29, 7, cream);
    c.beginPath();
    c.moveTo(-28, -57);
    c.lineTo(-17, -65);
    c.lineTo(25, 9);
    c.lineTo(11, 15);
    c.closePath();
    c.fillStyle = teal;
    c.fill();
    r.line([-22, -57, 18, 10], brass, 2);
    r.circle(-1, -15, 9, brass);
    r.circle(-1, -15, 5, cream);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 10, -110);
      c.quadraticCurveTo(side * 18, -137, side * 28, -141);
      c.lineTo(side * 25, -108);
      c.closePath();
      c.fillStyle = cream;
      c.fill();
      r.circle(side * 30, -104, 9, tint ?? coral);
    }
    r.round(-31, -120, 62, 55, 25, tint ?? coral, ink);
    r.round(-24, -87, 58, 27, 13, "#e3b498");
    r.face(0, -97, 1.02, true);
    r.circle(-12, -76, 2.5, bronze);
    r.circle(19, -76, 2.5, bronze);
    r.line([-8, -119, 0, -126, 8, -119], brass, 4);
  } else if (kind === "flintclerk") {
    r.round(-17, 15, 14, 9, 4, teal);
    r.round(5, 15, 14, 9, 4, teal);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 14, -38);
      c.lineTo(side * 38, -30);
      c.lineTo(side * 46, -52);
      c.quadraticCurveTo(side * 44, -14, side * 20, -4);
      c.closePath();
      c.fillStyle = plum;
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 2;
      c.stroke();
      r.line([side * 14, -36, side * 38, -30], tint ?? teal, 8);
      // Real sleeve garters sit around the wing-arms, not floating nearby.
      r.line([side * 24, -38, side * 22, -29], brass, 4);
      r.circle(side * 38, -30, 4.5, cream);
    }
    r.round(-19, -45, 38, 64, 17, tint ?? teal, ink);
    r.round(-10, -34, 20, 40, 7, cream);
    r.circle(0, -18, 2, bronze);
    r.circle(0, -9, 2, bronze);
    r.line([-10, -40, 0, -31, 10, -40], brass, 4);
    for (const side of [-1, 1])
      r.line([side * 12, -75, side * 19, -89], cream, 5);
    r.round(-22, -80, 44, 39, 18, tint ?? teal, ink);
    r.round(1, -59, 30, 20, 9, sage);
    r.face(-1, -60, 0.76, true);
    r.circle(24, -50, 1.8, ink);
    if (happy) r.round(-13, 6, 26, 6, 2, brass);
  } else if (kind === "catdragon") {
    c.beginPath();
    c.moveTo(41, 4);
    c.bezierCurveTo(86, 20, 99, -18, 74, -25);
    c.bezierCurveTo(60, -30, 59, -15, 69, -13);
    c.strokeStyle = tint ?? sage;
    c.lineWidth = 10;
    c.lineCap = "round";
    c.stroke();
    r.round(-45, -43, 96, 61, 29, tint ?? sage, ink);
    r.round(-41, 14, 32, 11, 5, tint ?? sage);
    r.round(11, 14, 32, 11, 5, tint ?? sage);
    c.beginPath();
    c.moveTo(17, -31);
    c.lineTo(47, -56);
    c.lineTo(43, -27);
    c.lineTo(28, -30);
    c.lineTo(24, -12);
    c.closePath();
    c.fillStyle = teal;
    c.fill();
    r.line([20, -28, 41, -46, 30, -23], frost, 2);
    for (const [x, side] of [
      [-50, -1],
      [-14, 1],
    ]) {
      c.beginPath();
      c.moveTo(x - 12, -50);
      c.lineTo(x - side * 3, -76);
      c.lineTo(x + 13, -49);
      c.closePath();
      c.fillStyle = tint ?? sage;
      c.fill();
      r.line([x - 3, -55, x - side * 3, -66], coral, 3);
    }
    r.line([-44, -59, -43, -82], cream, 4);
    r.line([-20, -59, -17, -80], cream, 4);
    r.round(-62, -60, 62, 45, 22, tint ?? sage, ink);
    if (happy) r.face(-31, -40, 0.85, true);
    else {
      r.line([-46, -41, -41, -38, -36, -41], ink, 2.3);
      r.line([-27, -41, -22, -38, -17, -41], ink, 2.3);
      r.line([-36, -27, -31, -24, -26, -27], ink, 2);
      r.circle(-49, -32, 4, coral);
      r.circle(-13, -32, 4, coral);
    }
    r.circle(-31, -32, 3.5, coral);
    r.line([-47, -30, -68, -34], ink, 1.5);
    r.line([-46, -25, -67, -24], ink, 1.5);
    r.line([-15, -30, 3, -34], ink, 1.5);
    r.line([-16, -25, 4, -24], ink, 1.5);
  } else if (kind === "duckdragon") {
    r.round(-27, 16, 27, 10, 5, brass);
    r.round(9, 16, 27, 10, 5, brass);
    r.round(-39, -51, 78, 69, 31, tint ?? cream, bronze);
    c.beginPath();
    c.moveTo(24, -34);
    c.lineTo(48, -55);
    c.lineTo(42, -23);
    c.lineTo(31, -26);
    c.lineTo(20, -11);
    c.closePath();
    c.fillStyle = teal;
    c.fill();
    r.line([-21, -91, -30, -109], cream, 5);
    r.line([1, -92, 4, -112], cream, 5);
    r.circle(-11, -75, 24, tint ?? cream);
    r.face(-13, -80, 0.7, true);
    r.round(-37, -60, 48, 16, 8, brass, bronze);
    r.line([-30, -52, 3, -52], bronze, 1.5);
    r.line([24, -29, 43, -21, 56, -31], cream, 9);
    r.line([56, -31, 56, -91], bronze, 3);
    r.circle(56, -31, 5, cream);
    if (happy) {
      c.beginPath();
      c.moveTo(20, -91);
      c.quadraticCurveTo(56, -151, 92, -91);
      c.quadraticCurveTo(81, -100, 70, -91);
      c.quadraticCurveTo(56, -101, 43, -91);
      c.quadraticCurveTo(31, -100, 20, -91);
      c.closePath();
      c.fillStyle = tint ?? teal;
      c.fill();
      c.strokeStyle = bronze;
      c.lineWidth = 2;
      c.stroke();
      r.line([56, -119, 43, -93], frost, 2);
      r.line([56, -119, 70, -93], frost, 2);
      r.line([56, -119, 56, -125], bronze, 3);
      c.beginPath();
      c.ellipse(-4, 29, 54, 6, 0, 0, Math.PI * 2);
      c.fillStyle = "#9fcbd066";
      c.fill();
    } else {
      r.line([56, -112, 49, -75, 62, -75, 56, -112], teal, 4);
      r.round(50, -85, 12, 5, 2, brass);
    }
  } else if (kind === "frostarchivist") {
    r.round(-26, 15, 20, 11, 5, teal);
    r.round(7, 15, 20, 11, 5, teal);
    c.beginPath();
    c.moveTo(-21, -61);
    c.lineTo(21, -61);
    c.lineTo(36, 17);
    c.quadraticCurveTo(0, 27, -36, 17);
    c.closePath();
    c.fillStyle = tint ?? plum;
    c.fill();
    r.line([-11, -56, -10, 15], frost, 7);
    r.line([11, -56, 17, -17], frost, 7);
    r.round(-24, -103, 48, 51, 21, tint ?? frost, ink);
    for (const side of [-1, 1]) {
      r.line([side * 14, -101, side * 24, -125], cream, 6);
      r.line([side * 20, -113, side * 31, -112], cream, 4);
    }
    r.round(-21, -70, 44, 23, 11, cream);
    r.face(0, -84, 0.76, true);
    r.round(-21, -90, 18, 17, 5, "#ffffff22", ink);
    r.round(3, -90, 18, 17, 5, "#ffffff22", ink);
    r.line([-3, -83, 3, -83], ink, 2);
    r.line([24, -43, 37, -29, 36, -16], plum, 10);
    r.round(23, -40, 33, 54, 3, cream, bronze);
    r.round(19, -44, 41, 9, 4, cream, bronze);
    r.round(19, 9, 41, 9, 4, cream, bronze);
    for (let i = 0; i < 4; i++)
      r.line([29, -27 + i * 9, 49 - (i % 2) * 6, -27 + i * 9], teal, 1.7);
    r.circle(36, -17, 5, frost);
    if (happy) r.line([-25, -36, -43, -22, -47, -38], frost, 8);
  } else if (kind === "beedragon") {
    for (const side of [-1, 1]) {
      c.beginPath();
      c.ellipse(side * 30, -52, 18, 32, side * 0.6, 0, Math.PI * 2);
      c.fillStyle = "#d4e8e3cc";
      c.fill();
      c.strokeStyle = teal;
      c.lineWidth = 2;
      c.stroke();
    }
    r.round(-32, -57, 64, 70, 29, tint ?? brass, bronze);
    r.round(-31, -27, 62, 13, 4, bronze);
    r.round(-24, -2, 48, 9, 4, bronze);
    r.line([-14, 8, -22, 23, -31, 23], bronze, 4);
    r.line([14, 8, 22, 23, 31, 23], bronze, 4);
    r.line([-11, -76, -20, -97], teal, 3);
    r.line([11, -76, 20, -97], teal, 3);
    r.circle(-20, -97, 4, cream);
    r.circle(20, -97, 4, cream);
    r.round(-24, -84, 48, 37, 18, tint ?? brass, bronze);
    r.round(-18, -61, 38, 20, 9, cream);
    r.face(0, -67, 0.83, true);
    r.line([29, -30, 42, -18, 44, happy ? -40 : -19], bronze, 5);
    r.circle(44, happy ? -40 : -19, 4, cream);
    if (happy) {
      r.circle(-33, -18, 8, coral);
      r.circle(-33, -18, 4, cream);
      r.line([-31, -12, -27, -3], teal, 2);
    }
  } else if (kind === "cometdragon") {
    c.beginPath();
    c.moveTo(20, -27);
    c.bezierCurveTo(61, -27, 70, -71, 113, -94);
    c.bezierCurveTo(99, -32, 64, 9, 22, 7);
    c.closePath();
    c.fillStyle = tint ?? plum;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
    r.line([41, -11, 68, -29, 94, -64], frost, 4);
    for (const [x, y] of [
      [52, -28],
      [76, -40],
      [97, -76],
    ])
      r.circle(x, y, 3, cream);
    r.round(-33, -60, 66, 70, 28, tint ?? plum, ink);
    r.round(-18, -40, 36, 40, 15, frost);
    r.round(-31, 11, 23, 12, 5, plum);
    r.round(7, 11, 23, 12, 5, plum);
    r.line([-21, -81, -35, -103], cream, 5);
    r.line([9, -80, 18, -108], cream, 5);
    r.round(-38, -89, 64, 43, 20, tint ?? plum, ink);
    r.round(-44, -60, 51, 24, 11, frost);
    r.face(-8, -70, 0.83, true);
    r.line([-25, -30, -46, -20, -49, -30], plum, 8);
    if (happy) {
      r.line([-16, -40, 0, -19, 18, -38], brass, 2);
      r.circle(0, -18, 9, cream);
      r.circle(4, -20, 6, plum);
    }
  } else if (kind === "helpbell") {
    r.round(-54, 13, 108, 13, 5, bronze);
    r.round(-47, 5, 94, 13, 5, brass, bronze);
    c.beginPath();
    c.moveTo(-41, 4);
    c.bezierCurveTo(-40, -44, 40, -44, 41, 4);
    c.closePath();
    c.fillStyle = tint ?? brass;
    c.fill();
    c.strokeStyle = bronze;
    c.lineWidth = 3;
    c.stroke();
    r.line([-27, -4, -22, -17, -12, -20], cream, 3);
    r.round(-5, -40, 10, 12, 3, bronze);
    r.round(-17, -47, 34, 8, 4, cream, bronze);
    r.round(-21, 13, 42, 10, 2, cream);
    c.font = "bold 8px system-ui";
    c.fillStyle = ink;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("ASK AWAY", 0, 18);
    if (happy) {
      r.line([-47, -25, -56, -30], brass, 3);
      r.line([47, -25, 56, -30], brass, 3);
      r.line([-33, -40, -38, -48], brass, 3);
      r.line([33, -40, 38, -48], brass, 3);
    }
  } else if (kind === "servicewindow") {
    r.round(-116, -151, 232, 175, 10, bronze);
    r.round(-105, -141, 210, 145, 8, cream);
    r.round(-94, -101, 188, 102, 4, "#678c89");
    r.round(-98, -133, 196, 27, 4, tint ?? teal);
    c.fillStyle = cream;
    c.font = "bold 12px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("ALL QUESTIONS WELCOME", 0, -119);
    const shutterHeight = happy ? 15 : 80;
    r.round(-93, -101, 186, shutterHeight, 3, brass);
    for (let y = -93; y < -101 + shutterHeight; y += 12)
      r.line([-88, y, 88, y], bronze, 2);
    r.round(-123, 0, 246, 15, 5, brass, bronze);
    r.round(-118, 15, 236, 10, 4, bronze);
    r.round(-20, happy ? -94 : -30, 40, 7, 3, cream);
  } else if (kind === "queueroll") {
    r.round(-85, -136, 170, 42, 18, brass, bronze);
    r.circle(-74, -115, 14, cream);
    r.circle(74, -115, 14, cream);
    r.circle(-74, -115, 6, bronze);
    r.circle(74, -115, 6, bronze);
    r.round(-61, -121, 122, happy ? 143 : 76, 4, tint ?? cream, bronze);
    for (let i = 0; i < 10; i++)
      r.circle(-51 + i * 11, happy ? 14 : -53, 1.3, bronze);
    c.fillStyle = teal;
    c.font = "bold 11px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("YOUR NUMBER", 0, -105);
    if (happy) {
      c.font = "bold  90px system-ui";
      c.fillStyle = ink;
      c.fillText("1", 0, -48);
      c.font = "bold 9px system-ui";
      c.fillStyle = teal;
      c.fillText("PLENTY OF ROOM", 0, 0);
    } else r.line([-38, -82, 38, -82, 38, -70, -38, -70], cream, 3);
  } else if (kind === "brasshorn") {
    r.round(-48, 15, 88, 11, 4, bronze);
    r.line([-12, 16, -8, -27], bronze, 9);
    c.beginPath();
    c.moveTo(-40, -3);
    c.bezierCurveTo(-68, -38, -13, -42, 35, -73);
    c.strokeStyle = bronze;
    c.lineWidth = 23;
    c.lineCap = "round";
    c.stroke();
    c.strokeStyle = tint ?? brass;
    c.lineWidth = 17;
    c.stroke();
    c.beginPath();
    c.ellipse(40, -74, 29, 40, 0.45, 0, Math.PI * 2);
    c.fillStyle = tint ?? brass;
    c.fill();
    c.strokeStyle = bronze;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.ellipse(40, -74, 20, 31, 0.45, 0, Math.PI * 2);
    c.fillStyle = "#79634c";
    c.fill();
    r.line([22, -91, 29, -101, 36, -102], cream, 3);
    r.round(-49, -10, 17, 9, 3, cream, bronze);
    if (happy) {
      r.line([70, -99, 78, -104], brass, 3);
      r.line([75, -77, 86, -77], brass, 3);
    }
  } else if (kind === "moustachefountain") {
    r.round(-81, 17, 162, 12, 5, bronze);
    r.round(-17, -70, 34, 86, 8, brass, bronze);
    r.circle(0, -70, 28, bronze);
    r.circle(0, -72, 23, cream);
    r.face(0, -84, 0.63, true);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(0, -70);
      c.bezierCurveTo(side * 14, -93, side * 30, -58, side * 43, -77);
      c.strokeStyle = bronze;
      c.lineWidth = 8;
      c.lineCap = "round";
      c.stroke();
    }
    r.round(-91, -10, 182, 31, 13, tint ?? brass, bronze);
    c.beginPath();
    c.ellipse(0, -9, 86, 13, 0, 0, Math.PI * 2);
    c.fillStyle = happy ? frost : "#b19e7e";
    c.fill();
    if (happy)
      for (const side of [-1, 1]) {
        // A large curled moustache-shaped spray, only in the completed reveal.
        c.beginPath();
        c.moveTo(side * 3, -70);
        c.bezierCurveTo(side * 28, -132, side * 90, -120, side * 94, -78);
        c.bezierCurveTo(side * 96, -50, side * 62, -56, side * 76, -80);
        c.strokeStyle = "#86bdc8";
        c.lineWidth = 8;
        c.lineCap = "round";
        c.stroke();
        for (let i = 0; i < 3; i++)
          r.circle(side * (76 + i * 3), -40 + i * 12, 3.5 - i * 0.4, frost);
        r.line([side * 24, -8, side * 38, -4, side * 54, -8], cream, 2);
      }
  } else if (kind === "dragonchair") {
    r.round(-33, -118, 66, 93, 19, bronze);
    r.round(-25, -109, 50, 71, 14, tint ?? teal);
    r.line([-36, -14, -40, 26], bronze, 8);
    r.line([36, -14, 40, 26], bronze, 8);
    r.round(-48, -30, 96, 19, 6, brass, bronze);
    r.round(-40, -35, 80, 15, 6, happy ? sage : cream);
    r.line([-42, -27, -49, -54, -57, -54], bronze, 6);
    r.line([42, -27, 49, -54, 57, -54], bronze, 6);
    r.circle(0, -82, 13, brass);
    r.line([-7, -84, 0, -77, 7, -84], cream, 3);
  } else if (kind === "featherduster") {
    c.save();
    c.rotate(happy ? Math.sin(motion * 1.3) * 0.035 : -0.04);
    r.round(-6, -87, 12, 113, 5, bronze);
    r.line([-1, -60, -1, 15], brass, 2);
    for (let i = -2; i <= 2; i++) {
      c.beginPath();
      c.moveTo(i * 3, -70);
      c.bezierCurveTo(
        i * 14 - 20,
        -90,
        i * 15 - 20,
        -128,
        i * 13,
        -142 + Math.abs(i) * 7,
      );
      c.bezierCurveTo(i * 15 + 21, -130, i * 14 + 20, -96, i * 3, -70);
      c.closePath();
      c.fillStyle = i % 2 ? (tint ?? plum) : cream;
      c.fill();
      r.line([i * 3, -76, i * 13, -130 + Math.abs(i) * 5], brass, 1.5);
    }
    r.round(-13, -82, 26, 15, 4, teal, bronze);
    c.restore();
  } else if (kind === "dragonrug") {
    r.round(-126, -45, 252, 70, 5, tint ?? teal, bronze);
    r.round(-115, -36, 230, 52, 3, brass);
    r.round(-107, -29, 214, 38, 3, cream);
    for (const side of [-1, 1])
      for (let i = 0; i < 8; i++)
        r.line([side * 126, -30 + i * 6, side * 137, -30 + i * 6], brass, 2);
    for (const x of [-70, 0, 70]) {
      r.line([x - 15, -10, x - 26, -23, x - 24, -2], teal, 4);
      r.line([x + 15, -10, x + 26, -23, x + 24, -2], teal, 4);
      r.circle(x, -10, 14, coral);
      r.line([x - 8, -19, x - 10, -28], brass, 3);
      r.line([x + 8, -19, x + 10, -28], brass, 3);
      r.face(x, -13, 0.42, true);
    }
  } else if (kind === "wingdoor") {
    // Background architecture only: cast and held ribbon are a separate prop.
    c.beginPath();
    c.moveTo(-360, 25);
    c.lineTo(-360, -150);
    c.quadraticCurveTo(-360, -246, 0, -246);
    c.quadraticCurveTo(360, -246, 360, -150);
    c.lineTo(360, 25);
    c.strokeStyle = bronze;
    c.lineWidth = 17;
    c.stroke();
    const panelWidth = happy ? 80 : 334;
    for (const side of [-1, 1]) {
      const x = side < 0 ? -348 : 348 - panelWidth;
      r.round(x, -165, panelWidth, 190, 8, tint ?? brass, bronze);
      r.round(x + 9, -155, panelWidth - 18, 166, 5, cream);
      const middle = x + panelWidth / 2;
      r.line([middle, -139, middle, -8], teal, 4);
      r.line([middle, -94, x + 16, -135], teal, 3);
      r.line([middle, -94, x + panelWidth - 16, -135], teal, 3);
      r.circle(side < 0 ? x + panelWidth - 20 : x + 20, -60, 7, bronze);
    }
    r.round(-133, -224, 266, 37, 8, tint ?? teal, bronze);
    c.fillStyle = cream;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = "bold 23px system-ui";
    c.fillText(happy ? "OPEN WINGS" : "TOWN HALL", 0, -205);
  } else if (kind === "councilclap") {
    for (const side of [-1, 1]) {
      c.save();
      c.translate(side * (happy ? 20 : 30), -15);
      c.rotate(side * (happy ? 0.24 + Math.sin(motion * 2) * 0.06 : 0.4));
      r.round(-15, 8, 30, 17, 4, tint ?? teal, bronze);
      r.round(-13, -20, 26, 35, 8, cream, bronze);
      for (let i = 0; i < 4; i++)
        r.round(-13 + i * 7, -43 + Math.abs(i - 1.5) * 4, 6, 29, 3, cream);
      r.line([side * 10, -4, side * 19, -18], cream, 8);
      c.restore();
    }
    if (happy) {
      r.line([-10, -69, -15, -80], brass, 3);
      r.line([10, -69, 15, -80], brass, 3);
      r.line([-42, -50, -56, -55], brass, 3);
      r.line([42, -50, 56, -55], brass, 3);
    }
  } else if (kind === "ribbonpanorama") {
    c.save();
    c.translate(-300, 0);
    drawEmberborough(r, "cindermayor", happy, 0, tint);
    c.restore();
    c.save();
    c.translate(285, 0);
    drawEmberborough(r, "catdragon", happy, 0);
    c.restore();
    c.save();
    c.translate(happy ? 282 : 215, happy ? -57 : 7);
    c.scale(0.72, 0.72);
    drawEmberborough(r, "flintclerk", happy, 0);
    c.restore();
    if (happy) {
      const left = [-300 + 61, -29],
        right = [282 - 38 * 0.72, -57 - 30 * 0.72];
      // Endpoints are the actual two hands above. Flint's feet touch the
      // cat's y=-43 back; no levitation or unattached festive streamer.
      c.beginPath();
      c.moveTo(left[0], left[1]);
      c.bezierCurveTo(-90, 6, 116, 4, right[0], right[1]);
      c.strokeStyle = tint ?? coral;
      c.lineWidth = 12;
      c.lineCap = "round";
      c.stroke();
      c.strokeStyle = cream;
      c.lineWidth = 2;
      c.stroke();
      r.circle(left[0], left[1], 6, cream);
      r.circle(right[0], right[1], 3.6, cream);
      r.line([-5, -10, -13, 15, 0, 7, 12, 17, 7, -9], brass, 6);
    }
  } else return false;
  return true;
}
