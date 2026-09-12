import type { Renderer } from "../render";
import type { PropKind } from "../types";

// All coordinates are local to Renderer.prop. Illustrated thread, rain, sleep,
// and dream windows never provide extra physics, signals, or active targets.
export function drawSeamworks(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#3e4b63";
  const night = "#626a89";
  const teal = "#76a4a2";
  const lilac = "#b4a6cd";
  const paper = "#fff0d9";
  const gold = "#dfbd7c";
  const rose = "#dfa4ae";
  const leafGreen = "#a9bf91";
  const wood = "#a48577";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  const label = (
    text: string,
    x: number,
    y: number,
    size = 13,
    color = ink,
  ) => {
    c.fillStyle = color;
    c.font = `bold ${size}px system-ui`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, x, y);
  };
  const leaf = (x: number, y: number, s = 1, color = leafGreen) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.beginPath();
    c.moveTo(0, 8);
    c.quadraticCurveTo(-15, -3, -5, -20);
    c.quadraticCurveTo(15, -15, 0, 8);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    r.line([0, 7, -3, -14], paper, 1.3);
    c.restore();
  };
  const moon = (x: number, y: number, radius: number, ground: string) => {
    r.circle(x, y, radius, gold);
    r.circle(x + radius * 0.42, y - radius * 0.28, radius * 0.82, ground);
  };
  const tree = (x: number, y: number, s = 1) => {
    r.line([x, y, x, y - 35 * s], wood, 5 * s);
    r.circle(x, y - 36 * s, 19 * s, teal);
    r.circle(x - 10 * s, y - 24 * s, 15 * s, leafGreen);
    r.circle(x + 10 * s, y - 24 * s, 15 * s, teal);
  };
  const quilt = (
    x: number,
    y: number,
    width: number,
    height: number,
    folded = false,
  ) => {
    r.round(x, y, width, height, 8, tint ?? night, ink);
    const pad = 7;
    const w = (width - pad * 3) / 2;
    const h = height - pad * 2;
    r.round(x + pad, y + pad, w, h, 3, teal);
    r.round(x + pad * 2 + w, y + pad, w, h, 3, lilac);
    for (let i = 0; i < 6; i++) {
      const py = y + 13 + (i * (height - 26)) / 5;
      r.line([x + width / 2 - 4, py, x + width / 2 + 4, py + 3], paper, 1.5);
    }
    moon(x + width * 0.28, y + height * 0.44, Math.min(w, h) * 0.25, teal);
    for (const [dx, dy] of [
      [0.66, 0.34],
      [0.83, 0.55],
      [0.64, 0.74],
    ]) {
      r.circle(x + width * dx, y + height * dy, 4, paper);
    }
    if (folded) {
      c.beginPath();
      c.moveTo(x + width * 0.65, y + height);
      c.lineTo(x + width, y + height * 0.57);
      c.lineTo(x + width, y + height);
      c.closePath();
      c.fillStyle = paper;
      c.fill();
      c.strokeStyle = gold;
      c.lineWidth = 2;
      c.stroke();
    }
  };
  const postcard = (x: number, y: number, s = 1) => {
    r.round(x - 33 * s, y - 24 * s, 66 * s, 48 * s, 4 * s, paper, wood);
    r.round(
      x - 27 * s,
      y - 18 * s,
      54 * s,
      35 * s,
      2 * s,
      happy ? rose : night,
    );
    if (happy) {
      r.circle(x, y + 4 * s, 13 * s, gold);
      r.round(x - 27 * s, y + 4 * s, 54 * s, 13 * s, 1, lilac);
      r.line([x - 23 * s, y + 9 * s, x + 23 * s, y + 9 * s], paper, 2 * s);
    }
    for (let i = 0; i < 5; i++)
      r.line(
        [
          x - 25 * s + i * 12 * s,
          y + 21 * s,
          x - 21 * s + i * 12 * s,
          y + 21 * s,
        ],
        teal,
        1.3 * s,
      );
  };
  const dozy = (wrapped: boolean) => {
    r.line([-19, 11, -25, 28, -36, 28], night, 5);
    r.line([19, 11, 25, 28, 36, 28], night, 5);
    r.line([-39, -34, -55, -21, -61, happy ? -33 : -12], paper, 11);
    r.line([39, -34, 55, -21, 61, happy ? -33 : -12], paper, 11);
    c.beginPath();
    c.moveTo(-46, -97);
    c.quadraticCurveTo(0, -119, 46, -97);
    c.quadraticCurveTo(37, -50, 47, 5);
    c.quadraticCurveTo(0, 25, -47, 5);
    c.quadraticCurveTo(-35, -49, -46, -97);
    c.closePath();
    c.fillStyle = tint ?? paper;
    c.fill();
    c.strokeStyle = lilac;
    c.lineWidth = 4;
    c.stroke();
    for (const side of [-1, 1])
      for (let i = 0; i < 5; i++)
        r.line([side * 36, -83 + i * 17, side * 40, -79 + i * 17], teal, 1.5);
    r.face(0, -68, 1.1, true);
    if (happy) {
      c.beginPath();
      c.ellipse(0, -52, 7, 10, 0, 0, Math.PI * 2);
      c.fillStyle = night;
      c.fill();
      r.line([-16, -77, -5, -74], ink, 2);
      r.line([5, -74, 16, -77], ink, 2);
    }
    if (wrapped) quilt(-54, -37, 108, 58, true);
    // Envelope pocket and route stamp remain on the outside of the quilt.
    r.round(-27, -24, 54, 31, 4, paper, teal);
    r.line([-25, -22, 0, -4, 25, -22], teal, 2);
    r.round(16, -4, 37, 18, 2, gold, wood);
    label("POST", 34, 5, 9);
  };
  const bramble = (resting = false) => {
    for (const side of [-1, 1]) {
      r.line(
        [side * 19, -112, side * 35, -143, side * 64, -155, side * 70, -168],
        wood,
        8,
      );
      r.line([side * 35, -143, side * 30, -164], wood, 6);
      r.line([side * 43, -147, side * 53, -130, side * 67, -132], wood, 5);
      if (happy) {
        leaf(side * 69, -156, 0.67);
        leaf(side * 30, -152, 0.65, teal);
        leaf(side * 61, -131, 0.62);
      }
    }
    r.round(-30, 7, 23, 22, 7, wood, ink);
    r.round(7, 7, 23, 22, 7, wood, ink);
    r.round(-40, -92, 80, 108, 28, tint ?? night, ink);
    r.line([-32, -61, -54, -37, -60, -11], night, 15);
    r.line([32, -61, 54, -37, 60, -11], night, 15);
    r.circle(0, -95, 38, tint ?? night);
    r.round(-31, -111, 62, 43, 17, lilac);
    if (resting) {
      r.line([-19, -94, -11, -90, -4, -94], ink, 2.4);
      r.line([4, -94, 11, -90, 19, -94], ink, 2.4);
      r.line([-6, -80, 0, -76, 6, -80], ink, 2);
    } else r.face(0, -94, 1.08, true);
    for (const x of [-15, 0, 15]) {
      if (happy) leaf(x, -68, 0.48);
      else r.round(x - 3, -70, 6, 9, 3, paper);
    }
    if (happy) {
      r.round(-25, -38, 50, 44, 12, teal);
      tree(0, 0, 0.62);
    } else moon(0, -21, 15, night);
  };

  if (kind === "stitchtailor" || kind === "stitchstars") {
    for (const side of [-1, 1]) {
      c.save();
      c.translate(side * 14, -56);
      c.rotate(side * (happy ? 0.12 + Math.sin(motion * 1.2) * 0.025 : 0.02));
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(side * 24, -81, side * 89, -78, side * 73, -12);
      c.quadraticCurveTo(side * 92, 56, side * 27, 62);
      c.closePath();
      c.fillStyle = tint ?? lilac;
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 2;
      c.stroke();
      r.round(side < 0 ? -63 : 27, -37, 29, 33, 5, teal);
      r.circle(side * 53, 26, 17, night);
      moon(side * 52, 26, 10, night);
      for (let i = 0; i < 5; i++)
        r.line(
          [side * (24 + i * 7), -39, side * (27 + i * 7), -35],
          paper,
          1.5,
        );
      r.line([side * 34, 1, side * 57, -4], gold, 2);
      c.restore();
    }
    r.round(-21, -66, 42, 84, 18, teal, ink);
    r.round(-9, -52, 18, 59, 5, paper);
    r.line([-14, -54, 0, -40, 14, -54], gold, 3);
    for (const y of [-26, -13, 0]) r.circle(0, y, 2, gold);
    r.round(-22, 14, 19, 15, 5, night);
    r.round(3, 14, 19, 15, 5, night);
    r.line([-11, -110, -23, -136, -33, -137], wood, 3);
    r.line([11, -110, 23, -136, 33, -137], wood, 3);
    r.circle(-33, -137, 5, rose);
    r.circle(33, -137, 5, rose);
    r.circle(0, -94, 29, paper);
    r.round(-21, -102, 42, 31, 13, gold);
    r.face(0, -94, 0.92, true);
    r.line([-17, -40, -38, -29, -46, -39], paper, 8);
    r.line([17, -40, 39, -28, 47, -18], paper, 8);
    r.line([-47, -23, -56, -64], gold, 3);
    c.beginPath();
    c.ellipse(-56, -64, 2, 4, -0.2, 0, Math.PI * 2);
    c.strokeStyle = paper;
    c.lineWidth = 1;
    c.stroke();
    if (kind === "stitchstars")
      for (const x of [-11, 11]) {
        c.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + (i * Math.PI) / 5;
          const radius = i % 2 ? 6 : 12;
          const px = x + Math.cos(a) * radius;
          const py = -94 + Math.sin(a) * radius;
          if (i === 0) c.moveTo(px, py);
          else c.lineTo(px, py);
        }
        c.closePath();
        c.strokeStyle = teal;
        c.lineWidth = 2.5;
        c.stroke();
      }
  } else if (kind === "dozycourier" || kind === "dozyquilt") {
    dozy(kind === "dozyquilt");
  } else if (kind === "bramble") {
    bramble();
  } else if (kind === "bramblemoss") {
    r.round(-127, -11, 239, 42, 20, teal, ink);
    for (let i = 0; i < 9; i++) r.circle(-111 + i * 26, -9, 15, leafGreen);
    c.save();
    c.translate(3, -27);
    c.rotate(-Math.PI / 2);
    c.scale(0.7, 0.7);
    bramble(true);
    c.restore();
  } else if (kind === "yawnsign") {
    r.line([-76, -106, 0, -126, 76, -106], wood, 3);
    r.round(-112, -103, 224, 115, 14, paper, wood);
    r.round(-103, -94, 206, 97, 11, tint ?? teal);
    if (happy) {
      r.line([-50, -62, -37, -56, -24, -62], paper, 4);
      r.line([24, -62, 37, -56, 50, -62], paper, 4);
      c.beginPath();
      c.ellipse(0, -32, 18, 30, 0, 0, Math.PI * 2);
      c.fillStyle = night;
      c.fill();
      r.line([-8, -11, 8, -11], rose, 4);
      r.round(33, -5, 89, 29, 4, paper, rose);
      label("RECEIVED", 77, 10, 12, teal);
    } else {
      label("WELCOME", 0, -57, 23, paper);
      moon(0, -19, 14, teal);
    }
  } else if (kind === "sparepillow") {
    c.beginPath();
    c.moveTo(-61, -62);
    c.quadraticCurveTo(0, -76, 61, -62);
    c.quadraticCurveTo(48, -23, 60, 17);
    c.quadraticCurveTo(0, 29, -60, 17);
    c.quadraticCurveTo(-48, -23, -61, -62);
    c.closePath();
    c.fillStyle = tint ?? lilac;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 3;
    c.stroke();
    r.round(-38, -48, 76, 50, 16, paper);
    r.face(0, -30, 1, true);
    r.line([-49, -54, -43, -48], gold, 2);
    r.line([49, 9, 43, 3], gold, 2);
    if (happy) {
      r.round(-47, 5, 94, 23, 3, paper, teal);
      label("QUIETER ROUTE?", 0, 17, 10);
    }
  } else if (kind === "goodnightbrooch") {
    r.round(-79, -66, 158, 60, 24, tint ?? lilac, ink);
    c.beginPath();
    c.moveTo(28, -12);
    c.lineTo(25, 13);
    c.lineTo(53, -13);
    c.closePath();
    c.fillStyle = tint ?? lilac;
    c.fill();
    r.round(-72, -59, 144, 44, 19, paper);
    label("GOODNIGHT", 0, -36, happy ? 18 : 15, happy ? teal : wood);
    if (happy) {
      r.circle(-65, -56, 4, gold);
      r.circle(65, -56, 4, gold);
    }
  } else if (kind === "listeningfunnel") {
    c.save();
    c.rotate(happy ? 0.28 : -0.14);
    c.beginPath();
    c.moveTo(-38, -87);
    c.lineTo(47, -33);
    c.lineTo(47, -13);
    c.lineTo(-38, 13);
    c.closePath();
    c.fillStyle = tint ?? gold;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.ellipse(-38, -37, 17, 50, 0, 0, Math.PI * 2);
    c.fillStyle = wood;
    c.fill();
    c.beginPath();
    c.ellipse(-38, -37, 11, 41, 0, 0, Math.PI * 2);
    c.fillStyle = night;
    c.fill();
    r.round(38, -33, 54, 20, 7, gold, wood);
    r.line([12, -51, 41, -28], paper, 3);
    c.restore();
  } else if (kind === "dreampostcards") {
    r.line([-123, -104, 123, -104], wood, 3);
    for (const x of [-86, 0, 86]) {
      r.line([x, -104, x, -77], gold, 2);
      postcard(x, -42, 1.05);
      r.round(x - 4, -80, 8, 11, 2, teal);
    }
  } else if (kind === "dreamquilt") {
    r.round(-128, -143, 256, 23, 5, wood, ink);
    r.line([-117, -135, -117, 24], wood, 8);
    r.line([117, -135, 117, 24], wood, 8);
    if (happy) {
      quilt(-112, -126, 224, 145, false);
      r.line([-98, 1, -92, 7, -80, -7], paper, 3);
    } else {
      r.round(-112, -126, 224, 145, 8, "#c4c8ce", ink);
      r.round(-105, -119, 101.5, 131, 3, "#d6dde0");
      r.round(3.5, -119, 101.5, 131, 3, "#dbd6e1");
      r.line([0, -117, 0, 12], wood, 1.5);
    }
  } else if (kind === "reconsiderquilt") {
    // A small completed keepsake sits below the physical phase recipe.
    // The two full support panels remain separate dreamquilt props.
    quilt(-115, -46, 230, 67, happy);
    if (happy) {
      r.round(-109, -39, 182, 48, 5, paper, gold);
      label("CHANGED MY MIND", -18, -26, 15);
      label("STILL ME", -18, -7, 15, teal);
    }
  } else if (kind === "snoretrumpet") {
    c.beginPath();
    c.moveTo(-65, -34);
    c.bezierCurveTo(-41, -37, -46, 8, -5, 8);
    c.bezierCurveTo(32, 8, 21, -51, 52, -53);
    c.strokeStyle = wood;
    c.lineWidth = 22;
    c.stroke();
    c.strokeStyle = tint ?? gold;
    c.lineWidth = 16;
    c.stroke();
    c.beginPath();
    c.moveTo(43, -69);
    c.lineTo(86, -101);
    c.lineTo(86, -16);
    c.lineTo(44, -37);
    c.closePath();
    c.fillStyle = gold;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.ellipse(87, -59, 14, 43, 0, 0, Math.PI * 2);
    c.fillStyle = night;
    c.fill();
    r.round(-85, -45, 26, 20, 5, gold, wood);
    if (happy) {
      r.round(-25, -26, 42, 48, 4, paper, lilac);
      r.line([-19, -17, 11, -17], teal, 2);
      r.line([-19, 12, 11, 12], teal, 2);
      label("DUET", -4, -4, 10);
      for (const [x, y, radius] of [
        [110, -71, 6],
        [124, -83, 9],
        [140, -78, 6],
      ])
        r.circle(x, y, radius, paper);
    }
  } else if (kind === "raincup") {
    r.circle(68, -37, 38, paper);
    r.circle(68, -37, 25, night);
    r.round(-62, -80, 130, 102, 23, tint ?? paper, ink);
    c.beginPath();
    c.ellipse(3, -78, 62, 14, 0, 0, Math.PI * 2);
    c.fillStyle = lilac;
    c.fill();
    r.round(-40, -53, 88, 47, 9, night);
    if (happy) {
      for (const [x, y] of [
        [-19, -38],
        [4, -26],
        [26, -40],
      ])
        r.line([x, y, x - 3, y + 9], paper, 2);
      r.circle(-13, -42, 9, lilac);
      r.circle(0, -46, 11, lilac);
      r.circle(14, -40, 9, lilac);
      r.line([87, -35, 87, -111], wood, 3);
      c.beginPath();
      c.moveTo(53, -110);
      c.quadraticCurveTo(87, -156, 122, -110);
      c.quadraticCurveTo(106, -122, 87, -110);
      c.quadraticCurveTo(69, -121, 53, -110);
      c.closePath();
      c.fillStyle = rose;
      c.fill();
      c.strokeStyle = paper;
      c.lineWidth = 2;
      c.stroke();
      r.round(73, -117, 28, 15, 2, paper);
      label("POST", 87, -109, 8);
    } else moon(3, -28, 12, night);
    r.round(-72, 18, 155, 11, 5, gold);
  } else if (kind === "auditioncard") {
    r.round(-124, -126, 248, 149, 8, tint ?? paper, wood);
    r.line([-111, -113, 111, -113], gold, 3);
    label("COMFORTING", 0, -95, 22, teal);
    label("WITH POTENTIAL", 0, -72, 16);
    r.round(-89, -57, 178, 66, 5, night, gold);
    if (happy) {
      tree(-55, 6, 0.92);
      tree(57, 6, 0.95);
      c.save();
      c.translate(0, 0);
      c.scale(0.3, 0.3);
      bramble();
      c.restore();
    } else moon(0, -25, 18, night);
    leaf(-106, -21, 0.6);
    leaf(108, -22, 0.6);
  } else if (kind === "pocketteapot") {
    r.circle(61, -43, 35, wood);
    r.circle(61, -43, 23, paper);
    c.beginPath();
    c.moveTo(-45, -65);
    c.lineTo(-87, -91);
    c.lineTo(-90, -72);
    c.quadraticCurveTo(-66, -54, -57, -14);
    c.closePath();
    c.fillStyle = tint ?? teal;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 3;
    c.stroke();
    r.round(-56, -77, 115, 98, 34, tint ?? teal, ink);
    r.round(-42, -87, 84, 18, 8, gold, wood);
    r.circle(0, -91, 10, gold);
    r.round(-34, -57, 70, 47, 13, happy ? rose : night);
    if (happy) {
      r.circle(0, -29, 17, gold);
      c.beginPath();
      c.moveTo(-34, -13);
      c.quadraticCurveTo(0, -40, 36, -13);
      c.lineTo(36, -7);
      c.lineTo(-34, -7);
      c.closePath();
      c.fillStyle = leafGreen;
      c.fill();
      r.round(-80, 14, 135, 18, 4, paper);
      c.beginPath();
      c.moveTo(-76, 28);
      c.quadraticCurveTo(-32, -8, 30, 28);
      c.closePath();
      c.fillStyle = leafGreen;
      c.fill();
    } else moon(0, -34, 13, night);
  } else if (kind === "sunsetcup") {
    r.circle(47, -9, 18, paper);
    r.circle(47, -9, 10, teal);
    r.round(-49, -49, 98, 73, 19, tint ?? paper, ink);
    c.beginPath();
    c.ellipse(0, -48, 46, 13, 0, 0, Math.PI * 2);
    c.fillStyle = happy ? rose : lilac;
    c.fill();
    if (happy) {
      r.circle(0, -49, 10, gold);
      c.beginPath();
      c.ellipse(0, -44, 43, 7, 0, 0, Math.PI * 2);
      c.fillStyle = lilac;
      c.fill();
      r.line([-18, -42, 18, -42], paper, 2);
      r.line([-10, -38, 10, -38], gold, 1.5);
    }
    r.line([-37, -27, -34, 7], gold, 3);
    leaf(7, 7, 0.66);
    r.round(-58, 23, 116, 8, 4, gold);
  } else if (kind === "endingfragments") {
    for (const [i, text] of [
      "AND EVERYONE",
      "FOUND A BLANKET",
      "INCLUDING THE CAVE",
    ].entries()) {
      const y = -107 + i * 47;
      r.round(-139, y, 278, 39, 5, i % 2 ? lilac : paper, wood);
      r.round(-139, y, 13, 39, 3, teal);
      label(happy ? text : "…", 3, y + 20, 17);
    }
  } else if (kind === "tomatoplanets") {
    r.line([-72, 28, -72, -132], wood, 7);
    r.line([72, 28, 72, -132], wood, 7);
    for (const y of [-111, -62, -13]) r.line([-91, y, 91, y], wood, 5);
    for (const [x, y] of [
      [-48, -87],
      [45, -97],
      [0, -24],
    ]) {
      r.line([x, y - 18, x + 7, y - 35], teal, 3);
      r.circle(x, y, 24, tint ?? rose);
      r.face(x, y - 1, 0.58, happy);
      for (const side of [-1, 1]) leaf(x + side * 9, y - 19, 0.42, teal);
      if (!happy) {
        c.save();
        c.setLineDash([3, 5]);
        c.beginPath();
        c.ellipse(x, y, 36, 28, -0.2, 0, Math.PI * 2);
        c.strokeStyle = lilac;
        c.lineWidth = 2;
        c.stroke();
        c.restore();
      }
    }
    if (happy) {
      c.beginPath();
      c.ellipse(45, -97, 41, 24, -0.25, 0, Math.PI * 2);
      c.strokeStyle = lilac;
      c.lineWidth = 1.5;
      c.stroke();
      r.circle(85, -106, 7, gold);
      r.circle(82, -107, 1.5, wood);
    }
  } else if (kind === "slipperlamp") {
    r.round(-33, 17, 66, 13, 5, wood, ink);
    c.beginPath();
    c.moveTo(0, 20);
    c.lineTo(0, -93);
    if (happy) c.bezierCurveTo(0, -153, 85, -139, 79, -97);
    else c.bezierCurveTo(0, -147, 54, -156, 54, -129);
    c.strokeStyle = teal;
    c.lineWidth = 10;
    c.stroke();
    const x = happy ? 79 : 54;
    const y = happy ? -99 : -130;
    c.beginPath();
    c.moveTo(x - 25, y + 15);
    c.lineTo(x - 13, y - 11);
    c.lineTo(x + 13, y - 11);
    c.lineTo(x + 25, y + 15);
    c.closePath();
    c.fillStyle = lilac;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
    r.round(x - 22, y + 9, 44, 10, 4, gold);
    if (happy) {
      c.beginPath();
      c.moveTo(x - 14, y + 20);
      c.lineTo(23, 18);
      c.lineTo(112, 18);
      c.lineTo(x + 14, y + 20);
      c.closePath();
      c.fillStyle = "#dfbd7c32";
      c.fill();
      r.round(27, 13, 34, 17, 7, paper, lilac);
      r.round(73, 13, 34, 17, 7, paper, lilac);
      r.round(34, 9, 19, 12, 5, teal);
      r.round(80, 9, 19, 12, 5, teal);
    }
  } else if (kind === "dreammask") {
    r.line([0, 28, 0, -96], wood, 9);
    r.round(-45, 22, 90, 12, 5, wood, ink);
    for (const side of [-1, 1]) {
      r.line([side * 15, -84, side * 33, -127, side * 62, -148], wood, 7);
      r.line([side * 33, -127, side * 26, -152], wood, 5);
      r.line([side * 46, -137, side * 64, -120], wood, 5);
    }
    r.round(-41, -111, 82, 64, 22, happy ? paper : night, ink);
    if (happy) {
      r.face(0, -86, 1.05, true);
      r.line([-62, -120, -66, -91], gold, 2);
      r.round(-83, -88, 35, 49, 5, teal, ink);
      r.line([62, -120, 67, -101], gold, 2);
      r.round(50, -100, 34, 57, 5, lilac, ink);
      r.line([-75, -83, -63, -66, -54, -83], paper, 3);
      r.line([58, -91, 73, -91], paper, 3);
    } else {
      r.circle(-15, -88, 5, paper);
      r.circle(15, -88, 5, paper);
      for (const x of [-14, 0, 14]) r.round(x - 3, -68, 6, 10, 3, paper);
    }
  } else if (kind === "sleepmask") {
    // Exact optical centers: local(-45,0)/(45,0). Real detector rings are
    // drawn by Renderer above this housing; no signal is fabricated here.
    r.line([-89, -12, -100, -23, -104, 13, -87, 16], lilac, 5);
    r.line([89, -12, 100, -23, 104, 13, 87, 16], lilac, 5);
    c.beginPath();
    c.moveTo(-89, -30);
    c.quadraticCurveTo(-47, -51, 0, -22);
    c.quadraticCurveTo(48, -51, 89, -30);
    c.lineTo(91, 15);
    c.quadraticCurveTo(43, 43, 0, 17);
    c.quadraticCurveTo(-43, 43, -91, 15);
    c.closePath();
    c.fillStyle = tint ?? night;
    c.fill();
    c.strokeStyle = gold;
    c.lineWidth = 3;
    c.stroke();
    for (const x of [-45, 45]) {
      r.line([x - 19, 5, x, 10, x + 19, 5], paper, 2.5);
      for (const dx of [-12, 0, 12])
        r.line([x + dx, 8, x + dx - 3, 15], lilac, 1.5);
      if (happy) moon(x, 0, 8, night);
    }
  } else if (kind === "worrynote") {
    r.round(-133, -93, 266, 114, 7, tint ?? paper, wood);
    r.line([-126, -84, -2, -17, 126, -84], lilac, 3);
    if (happy) {
      r.round(-116, -71, 232, 72, 4, paper, teal);
      label("DOES MOSS COUNT", 0, -47, 18);
      label("AS A PILLOW?", 0, -21, 18, teal);
      leaf(101, -79, 0.65);
    } else label("A SMALL WORRY", 0, -68, 18, night);
  } else if (kind === "helpfulstamps") {
    for (let i = 0; i < 5; i++) {
      const x = -104 + i * 52;
      r.round(x - 24, -88, 48, 43, 5, paper, wood);
      r.round(x - 19, -83, 38, 33, 3, happy ? teal : lilac);
      if (happy) r.line([x - 10, -67, x - 2, -58, x + 11, -74], paper, 3);
    }
    if (happy) {
      r.round(-139, -33, 278, 61, 5, paper, gold);
      label("HELPFUL", 0, -15, 21, teal);
      label("NOT THE SAME AS", 0, 4, 12);
      label("HARMLESS-LOOKING", 0, 20, 13);
    }
  } else if (kind === "dreambook") {
    r.round(-101, -160, 202, 189, 8, tint ?? teal, ink);
    r.round(-86, -151, 177, 169, 6, night, gold);
    r.line([-87, -149, -87, 19], paper, 3);
    label("A FOREST", 2, -131, 18, paper);
    label("TO COME HOME TO", 2, -109, 13, paper);
    if (happy) {
      c.save();
      c.translate(0, -2);
      c.scale(0.49, 0.49);
      bramble();
      c.restore();
      r.line([30, -14, 47, -6, 48, 5], gold, 2);
      r.round(40, -1, 20, 27, 3, gold, wood);
      r.round(44, 4, 12, 16, 2, paper);
    } else moon(0, -47, 29, night);
    r.line([-94, -146, -94, -121], gold, 2);
    r.line([-94, -11, -94, 13], gold, 2);
  } else if (kind === "dreamsatchel") {
    r.line([-69, -56, -64, -124, 64, -124, 69, -56], wood, 11);
    r.round(-88, -66, 176, 94, 19, tint ?? teal, ink);
    if (happy) {
      for (const [x, y, color] of [
        [-65, -92, lilac],
        [-13, -99, rose],
        [39, -87, gold],
      ] as const) {
        r.round(x, y, 42, 57, 4, color, ink);
        r.line([x + 6, y + 5, x + 6, y + 52], paper, 2);
      }
    }
    r.round(-91, -70, 182, 37, 14, lilac, ink);
    r.round(-14, -49, 28, 27, 4, gold, wood);
    r.round(-50, -16, 100, 42, 8, paper, gold);
    if (happy) {
      r.round(-44, -12, 88, 32, 5, night);
      tree(-20, 21, 0.55);
      tree(11, 21, 0.65);
      tree(30, 21, 0.45);
      label("BREAKS", 0, -49, 9);
    } else label("DREAM POST", 0, 6, 13);
  } else if (kind === "seamworkspanorama") {
    // This tableau owns Stitch, Dozy, Bramble, and exactly one empty chair.
    // Keep other cast props out of this ending to avoid duplicate friends.
    r.circle(0, -157, 78, gold);
    r.circle(31, -176, 64, "#e4dfeb");
    for (const [x, y] of [
      [-43, -185],
      [-46, -150],
      [-23, -121],
    ]) {
      r.round(x - 8, y - 9, 16, 18, 4, happy ? paper : night, wood);
      r.line([x, y - 7, x, y + 7], teal, 1.5);
    }
    // An inviting forest door remains open in the happy portrait, rather
    // than animating another physical portal or moving a live character.
    r.round(142, -169, 144, 197, 24, wood, ink);
    r.round(151, -160, 126, 180, 20, happy ? night : lilac);
    if (happy) {
      tree(180, 18, 1.65);
      tree(240, 18, 1.7);
      tree(212, 20, 1.05);
      r.line([209, 20, 223, -10, 210, -37], gold, 7);
      r.round(250, -143, 23, 149, 8, teal, wood);
      r.circle(257, -61, 3, gold);
    }
    r.round(-333, 26, 666, 13, 6, paper, gold);
    // The squad's fourth chair is visibly empty; only its work towel sits on it.
    r.line([278, -10, 276, 30], wood, 6);
    r.line([329, -10, 331, 30], wood, 6);
    r.round(276, -85, 56, 68, 12, lilac, wood);
    r.round(269, -21, 68, 14, 6, paper, wood);
    r.round(280, -28, 45, 32, 5, teal, gold);
    r.line([286, -21, 318, -21], paper, 2);
    r.line([286, -10, 318, -10], paper, 2);
    c.save();
    c.translate(-241, 5);
    c.scale(0.78, 0.78);
    drawSeamworks(r, "stitchtailor", happy, time);
    c.restore();
    c.save();
    c.translate(-86, 5);
    c.scale(0.79, 0.79);
    dozy(false);
    c.restore();
    c.save();
    c.translate(62, 5);
    c.scale(0.79, 0.79);
    bramble();
    c.restore();
    if (happy) {
      r.round(-209, -185, 319, 43, 19, paper, lilac);
      label("GOODNIGHT, MELT SQUAD", -49, -163, 17, teal);
      c.beginPath();
      c.moveTo(65, -145);
      c.lineTo(58, -127);
      c.lineTo(86, -147);
      c.closePath();
      c.fillStyle = paper;
      c.fill();
      postcard(-193, -11, 0.42);
    }
  } else return false;
  return true;
}
