import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Renderer supplies the local transform. Doorways, climate, and little model
// guests here are illustration only; the scene owns every physical target.
export function drawWedding(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#465665";
  const paper = "#fff1dc";
  const gold = "#dfba77";
  const coral = "#d8919a";
  const rose = "#efb5b0";
  const teal = "#6e9d99";
  const sage = "#a7bb93";
  const stone = "#a7b0a3";
  const lilac = "#b9acca";
  const cloud = "#e1eaf0";
  const wood = "#a6856b";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  const leaf = (x: number, y: number, s = 1, color = sage) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.beginPath();
    c.moveTo(0, 9);
    c.quadraticCurveTo(-19, -4, -5, -22);
    c.quadraticCurveTo(13, -14, 0, 9);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    r.line([0, 8, -4, -15], paper, 1.4);
    c.restore();
  };
  const fern = (x: number, y: number, s = 1) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    r.line([0, 0, 2, -36, 10, -61], teal, 3);
    for (let i = 0; i < 5; i++) {
      const y0 = -8 - i * 9;
      const width = 22 - i * 3;
      r.line([1, y0, -width, y0 - 11], sage, 6);
      r.line([2, y0 - 3, width + 4, y0 - 15], sage, 6);
    }
    c.restore();
  };
  const bloom = (x: number, y: number, s = 1, color = coral) => {
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5;
      r.circle(x + Math.cos(a) * 9 * s, y + Math.sin(a) * 9 * s, 6 * s, color);
    }
    r.circle(x, y, 5 * s, gold);
  };
  const puff = (x: number, y: number, s = 1, color = cloud) => {
    r.circle(x - 15 * s, y, 15 * s, color);
    r.circle(x, y - 9 * s, 20 * s, color);
    r.circle(x + 18 * s, y, 14 * s, color);
    r.round(x - 23 * s, y, 49 * s, 13 * s, 6 * s, color);
  };
  const bouquet = (x: number, y: number, s = 1) => {
    r.line([x, y, x - 6 * s, y - 20 * s], teal, 3 * s);
    r.line([x, y, x + 8 * s, y - 18 * s], sage, 3 * s);
    r.line([x, y, x, y - 26 * s], teal, 3 * s);
    bloom(x - 7 * s, y - 23 * s, 0.58 * s, coral);
    bloom(x + 8 * s, y - 21 * s, 0.58 * s, lilac);
    bloom(x, y - 30 * s, 0.58 * s, paper);
    r.line([x - 6 * s, y - 7 * s, x + 5 * s, y - 7 * s], gold, 4 * s);
  };
  const bow = (x: number, y: number, s = 1, color = coral) => {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - 16 * s, y - 10 * s);
    c.lineTo(x - 16 * s, y + 10 * s);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + 16 * s, y - 10 * s);
    c.lineTo(x + 16 * s, y + 10 * s);
    c.closePath();
    c.fill();
    r.circle(x, y, 4 * s, gold);
  };
  const ada = (bouquets: boolean) => {
    // Four arms on either side, each ending at its own held object/contact.
    for (const side of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        const x = side * (70 + i * 7);
        const y = -80 + i * 29;
        const sway = happy && i === 0 ? Math.sin(motion * 1.4) * 1.5 : 0;
        c.beginPath();
        c.moveTo(side * (16 + i * 4), -43 + i * 12);
        c.bezierCurveTo(
          side * 57,
          -54 + i * 22,
          x + side * 12,
          y + 16,
          x,
          y + sway,
        );
        c.strokeStyle = tint ?? coral;
        c.lineWidth = 15;
        c.lineCap = "round";
        c.stroke();
        r.circle(x, y + sway, 7, rose);
        r.circle(x + side * 3, y + 8 + sway, 2.5, paper);
        r.circle(x - side * 4, y + 13 + sway, 2.5, paper);
        if (bouquets) bouquet(x, y + sway, 0.9);
        else if (i === 0 || (happy && i === 1)) {
          r.line([x - 2, y + sway, x + side * 7, y - 25 + sway], teal, 4);
          r.circle(x + side * 7, y - 25 + sway, 2, gold);
        }
      }
    }
    r.round(-37, -118, 74, 130, 35, tint ?? coral, ink);
    r.round(-24, -47, 48, 51, 15, paper);
    bow(0, -43, 0.8, teal);
    r.face(0, -81, 1.15, true);
    r.line([-27, -94, -20, -98, -14, -95], ink, 2);
    r.line([14, -95, 20, -98, 27, -94], ink, 2);
    if (!bouquets) {
      r.round(-101, -62, 37, 48, 5, wood, ink);
      r.round(-97, -57, 29, 38, 2, paper);
      r.round(-91, -65, 17, 8, 3, gold);
      for (let i = 0; i < 3; i++)
        r.line([-91, -45 + i * 8, -75, -45 + i * 8], teal, 2);
      r.circle(-84, -23, 5, rose);
    }
  };

  if (kind === "adaplanner") {
    ada(false);
  } else if (kind === "weddingbell" || kind === "bellringcrown") {
    r.line([-15, 8, -21, 23, -29, 23], ink, 4);
    r.line([15, 8, 21, 23, 29, 23], ink, 4);
    r.line([-28, -14, -40, -4, -47, happy ? -20 : -8], gold, 5);
    r.line([28, -14, 40, -4, 47, happy ? -20 : -8], gold, 5);
    r.circle(0, -66, 7, gold);
    r.round(-4, -65, 8, 14, 3, wood);
    c.beginPath();
    c.moveTo(-35, 0);
    c.quadraticCurveTo(-32, -53, 0, -55);
    c.quadraticCurveTo(32, -53, 35, 0);
    c.closePath();
    c.fillStyle = tint ?? gold;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 3;
    c.stroke();
    r.line([-24, -26, -20, -38, -12, -43], paper, 4);
    r.round(-41, -2, 82, 13, 5, gold, wood);
    r.face(0, -27, 0.72, true);
    bow(0, 2, 0.64, happy ? lilac : coral);
    if (happy) {
      r.line([-47, -53, -53, -59], gold, 2);
      r.line([47, -53, 53, -59], gold, 2);
    }
    if (kind === "bellringcrown") {
      c.beginPath();
      c.ellipse(0, -67, 15, 5, 0, 0, Math.PI * 2);
      c.strokeStyle = gold;
      c.lineWidth = 5;
      c.stroke();
      c.strokeStyle = paper;
      c.lineWidth = 1;
      c.stroke();
    }
  } else if (kind === "rill") {
    const drift = happy ? Math.sin(motion * 1.1) * 1.5 : 0;
    r.line([-14, -1, -24, 17, -33, 19], teal, 4);
    r.line([14, -1, 20, 17, 31, 22], teal, 4);
    puff(0, -8, 1.25, tint ?? cloud);
    puff(0, -65 + drift, 1.35, tint ?? cloud);
    puff(-7, -105 + drift, 1.05, paper);
    r.round(-27, -77 + drift, 54, 65, 22, tint ?? cloud);
    r.line([-26, -52, -48, -35, -57, happy ? -48 : -27], cloud, 9);
    r.line([26, -52, 44, -39, 53, happy ? -27 : -34], cloud, 9);
    r.face(0, -74 + drift, 1, true);
    bow(0, -41 + drift, 0.88, lilac);
    for (const [x, y] of [
      [-24, -101],
      [-4, -119],
      [17, -103],
    ])
      bloom(x, y + drift, 0.43, coral);
  } else if (kind === "moss") {
    r.round(-41, -6, 29, 35, 9, stone, ink);
    r.round(14, -6, 31, 35, 9, stone, ink);
    r.round(-48, -83, 96, 93, 22, tint ?? stone, ink);
    r.line([-39, -59, -61, -40, -64, happy ? -58 : -18], stone, 19);
    r.line([39, -59, 61, -40, 64, happy ? -27 : -18], stone, 19);
    r.round(-38, -134, 76, 66, 21, tint ?? stone, ink);
    r.line([-29, -123, -12, -133, 14, -129, 33, -119], sage, 13);
    leaf(-13, -133, 0.7);
    leaf(18, -129, 0.65, teal);
    r.face(0, -107, 1.05, true);
    r.line([-30, -55, -18, -28, 0, -18, 19, -31, 31, -58], paper, 5);
    leaf(23, -58, 0.53, teal);
    bloom(21, -58, 0.43, coral);
    r.line([-36, -5, -22, -12, -12, -6], teal, 3);
    r.line([16, -77, 23, -67, 31, -69], ink, 2);
  } else if (kind === "crystalaunt") {
    for (const [x, top] of [
      [-25, -120],
      [0, -139],
      [25, -118],
    ]) {
      c.beginPath();
      c.moveTo(x - 17, -66);
      c.lineTo(x - 13, top + 17);
      c.lineTo(x, top);
      c.lineTo(x + 14, top + 18);
      c.lineTo(x + 16, -59);
      c.closePath();
      c.fillStyle = x === 0 ? cloud : lilac;
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 2;
      c.stroke();
      r.line([x, top + 10, x + 3, -71], paper, 3);
    }
    r.round(-33, -86, 66, 103, 21, tint ?? lilac, ink);
    r.line([-23, 10, -28, 27], ink, 5);
    r.line([23, 10, 28, 27], ink, 5);
    r.face(0, -62, 0.95, true);
    r.line([-28, -32, -46, -22, -52, -39], lilac, 10);
    r.line([28, -32, 46, -24, 51, -36], lilac, 10);
    r.line([-28, -35, 0, -17, 28, -35], paper, 5);
    if (happy) {
      r.round(-81, -124, 162, 29, 8, paper, gold);
      c.fillStyle = ink;
      c.font = "bold 13px system-ui";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("HAPPY FOR YOU", 0, -109);
      r.line([44, -94, 37, -86], gold, 3);
    }
  } else if (kind === "crystalchime") {
    c.beginPath();
    c.arc(0, -83, 8, 0, Math.PI * 2);
    c.strokeStyle = gold;
    c.lineWidth = 4;
    c.stroke();
    r.line([0, -76, 0, -63], wood, 2);
    c.beginPath();
    c.moveTo(0, -69);
    c.lineTo(-24, -40);
    c.lineTo(-18, -6);
    c.lineTo(0, 8);
    c.lineTo(18, -6);
    c.lineTo(24, -40);
    c.closePath();
    c.fillStyle = tint ?? lilac;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
    c.beginPath();
    c.moveTo(0, -69);
    c.lineTo(7, -37);
    c.lineTo(0, 8);
    c.lineTo(-8, -37);
    c.closePath();
    c.fillStyle = cloud;
    c.fill();
    r.line([-24, -40, -8, -37, 7, -37, 24, -40], paper, 2);
    r.line([0, 8, 0, 19], gold, 2);
    r.circle(0, 19, 4, gold);
    if (happy) {
      r.line([-33, -50, -43, -56], gold, 2);
      r.line([33, -50, 43, -56], gold, 2);
      r.line([-32, -20, -42, -15], gold, 2);
      r.line([32, -20, 42, -15], gold, 2);
    }
  } else if (kind === "moongrandmother") {
    r.circle(0, -73, 53, tint ?? gold);
    for (const [x, y, radius] of [
      [-27, -96, 9],
      [30, -70, 7],
      [-23, -55, 5],
    ])
      r.circle(x, y, radius, "#cdb683");
    r.face(4, -76, 1.05, true);
    for (const x of [-7, 15]) {
      c.beginPath();
      c.arc(x, -77, 12, 0, Math.PI * 2);
      c.strokeStyle = wood;
      c.lineWidth = 2;
      c.stroke();
    }
    r.line([5, -77, 3, -77], wood, 2);
    c.beginPath();
    c.moveTo(-49, -57);
    c.lineTo(-66, 16);
    c.quadraticCurveTo(0, 43, 65, 14);
    c.lineTo(48, -56);
    c.lineTo(0, -17);
    c.closePath();
    c.fillStyle = tint ?? lilac;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
    for (const [x, y] of [
      [-35, -22],
      [36, -23],
      [-45, 7],
      [17, 13],
      [-11, 4],
    ]) {
      r.line([x - 5, y, x + 5, y], paper, 2);
      r.line([x, y - 5, x, y + 5], paper, 2);
    }
    if (happy) {
      r.round(-26, -23, 52, 40, 3, gold, wood);
      r.round(-20, -18, 40, 29, 2, teal);
      puff(0, -2, 0.42, paper);
      r.circle(-4, -4, 1.4, ink);
      r.circle(4, -4, 1.4, ink);
      r.circle(-25, 6, 6, gold);
      r.circle(25, 6, 6, gold);
    }
  } else if (kind === "flowercousins") {
    for (const [x, y, color] of [
      [-34, -74, coral],
      [0, -99, lilac],
      [34, -64, gold],
    ] as const) {
      r.line([x, y + 12, x + 2, 21], teal, 8);
      leaf(x - 7, y + 42, 0.6);
      leaf(x + 11, y + 60, 0.6, teal);
      bloom(x, y, 1.25, color);
      r.circle(x, y, 13, paper);
      r.face(x, y - 2, 0.47, true);
      r.line([x - 7, 18, x - 13, 27, x - 22, 27], teal, 3);
      r.line([x + 4, 18, x + 13, 27, x + 19, 27], teal, 3);
      if (happy) r.line([x + 5, y + 34, x + 25, y + 20], sage, 5);
    }
  } else if (kind === "stoneuncle") {
    r.round(-31, 5, 24, 23, 7, stone, ink);
    r.round(7, 5, 24, 23, 7, stone, ink);
    r.round(-39, -79, 78, 92, 18, tint ?? stone, ink);
    r.round(-32, -121, 64, 61, 15, tint ?? stone, ink);
    r.face(0, -95, 0.9, true);
    r.line([-19, -80, 0, -72, 19, -80], paper, 6);
    bow(0, -52, 0.7, lilac);
    r.line([-30, -52, -51, -29, -50, -8], stone, 14);
    r.line([30, -52, 52, -29, 51, -8], stone, 14);
    r.round(26, -16, 55, 39, 6, wood, ink);
    r.round(43, -25, 20, 13, 3, gold, wood);
    r.line([38, -11, 38, 18], gold, 3);
    r.line([69, -11, 69, 18], gold, 3);
    if (happy) {
      r.round(27, -34, 54, 24, 4, paper, wood);
      fern(54, 6, 0.73);
    }
  } else if (kind === "cloudfamily") {
    for (const [x, y, s] of [
      [-28, -64, 0.7],
      [26, -76, 0.8],
      [1, -21, 0.46],
    ]) {
      puff(x, y, s, tint ?? cloud);
      r.face(x, y - 5 * s, 0.65 * s, true);
      bow(x, y + 13 * s, 0.45 * s, coral);
      r.line([x - 8 * s, y + 15 * s, x - 12 * s, y + 34 * s], teal, 2);
      r.line([x + 8 * s, y + 15 * s, x + 12 * s, y + 34 * s], teal, 2);
      if (happy) {
        r.round(x + 13 * s, y + 8 * s, 12 * s, 15 * s, 3 * s, paper, gold);
        r.circle(x + 27 * s, y + 14 * s, 3 * s, gold);
      }
    }
  } else if (kind === "weddingarch") {
    r.round(-130, 9, 43, 19, 5, wood, ink);
    r.round(87, 9, 43, 19, 5, wood, ink);
    c.beginPath();
    c.moveTo(-108, 17);
    c.lineTo(-108, -105);
    c.bezierCurveTo(-108, -219, 108, -219, 108, -105);
    c.lineTo(108, 17);
    c.strokeStyle = tint ?? paper;
    c.lineWidth = 17;
    c.lineCap = "round";
    c.stroke();
    c.strokeStyle = gold;
    c.lineWidth = 3;
    c.stroke();
    for (const [x, y] of [
      [-105, -78],
      [-102, -132],
      [-63, -174],
      [0, -189],
      [64, -174],
      [101, -132],
      [106, -78],
    ]) {
      leaf(x, y, 0.7);
      if (happy) bloom(x, y - 7, 0.8, x < 0 ? lilac : coral);
    }
    if (happy) {
      r.line([-96, -115, 0, -132, 96, -115], coral, 5);
      bow(0, -131, 1.2, lilac);
    }
  } else if (kind === "placecard") {
    r.round(-109, -110, 218, 111, 7, wood, ink);
    r.round(-102, -103, 204, 97, 3, paper);
    r.round(-19, -116, 38, 15, 4, gold, wood);
    r.round(-56, -65, 112, 21, 4, tint ?? teal);
    c.fillStyle = ink;
    c.font = "bold 18px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("RILL  +  MOSS", 0, -83);
    // Eight arrows lead into a single shared table, never two separate plans.
    for (const side of [-1, 1])
      for (let i = 0; i < 4; i++) {
        const x = -42 + i * 28;
        const y = side < 0 ? -72 : -16;
        const tip = side < 0 ? -64 : -43;
        r.line([x, y, x, tip], gold, 2);
        r.line([x - 3, tip - side * 4, x, tip, x + 3, tip - side * 4], gold, 2);
      }
    if (happy) {
      puff(-80, -34, 0.37, cloud);
      leaf(82, -32, 0.52);
    }
  } else if (kind === "lacepanel") {
    r.line([-109, -122, 109, -122], wood, 8);
    r.round(-102, -118, 204, 107, 4, tint ?? paper);
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 7; col++) {
        const x = -80 + col * 27;
        const y = -98 + row * 23;
        r.circle(x, y, 5, lilac);
        r.line([x - 7, y, x + 7, y], gold, 1);
        r.line([x, y - 7, x, y + 7], gold, 1);
      }
    for (let i = 0; i < 9; i++) r.circle(-90 + i * 22.5, -12, 10, paper);
    if (happy) {
      bouquet(-69, 20, 0.72);
      bouquet(69, 20, 0.72);
    }
  } else if (kind === "ringcushion" || kind === "emptyringcushion") {
    r.round(-72, -46, 144, 64, 18, tint ?? lilac, ink);
    r.round(-63, -40, 126, 45, 13, paper);
    for (const x of [-53, 53])
      for (const y of [-31, -5]) r.circle(x, y, 3, gold);
    r.line([-60, 12, 60, 12], gold, 2);
    for (const x of [-64, 64])
      r.line([x, 10, x + Math.sign(x) * 9, 27], coral, 4);
    if (happy && kind === "ringcushion") {
      c.beginPath();
      c.ellipse(0, -22, 23, 23 * 0.68, -0.24, 0, Math.PI * 2);
      c.strokeStyle = gold;
      c.lineWidth = 5;
      c.stroke();
      c.strokeStyle = paper;
      c.lineWidth = 1;
      c.stroke();
    } else bow(0, -17, 1, coral);
  } else if (kind === "weddingrings") {
    for (const [x, y, radius] of [
      [-18, -24, 24],
      [20, -20, 19],
    ]) {
      c.beginPath();
      c.ellipse(x, y, radius, radius * 0.78, -0.22, 0, Math.PI * 2);
      c.strokeStyle = gold;
      c.lineWidth = 7;
      c.stroke();
      c.strokeStyle = paper;
      c.lineWidth = 1.6;
      c.stroke();
    }
    if (happy) {
      leaf(-31, -42, 0.34, teal);
      puff(30, -36, 0.23, paper);
    }
  } else if (kind === "twosidedcake") {
    c.beginPath();
    c.ellipse(0, 12, 114, 19, 0, 0, Math.PI * 2);
    c.fillStyle = gold;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.round(-99, -72, 198, 84, 12, paper, wood);
    r.round(-99, -72, 99, 84, 12, tint ?? cloud);
    r.round(0, -72, 99, 84, 12, sage);
    r.round(-66, -126, 132, 62, 10, paper, wood);
    r.round(-66, -126, 66, 62, 10, cloud);
    r.round(0, -126, 66, 62, 10, sage);
    r.line([0, -124, 0, 9], gold, 2);
    if (happy) {
      for (const [x, y, s] of [
        [-70, -49, 0.62],
        [-36, -14, 0.57],
        [-35, -104, 0.55],
      ])
        puff(x, y, s, paper);
      fern(42, -9, 0.85);
      fern(76, 3, 0.66);
      fern(33, -71, 0.71);
      puff(-19, -132, 0.55, paper);
      leaf(17, -132, 0.67, teal);
      bow(0, -4, 0.62, coral);
    } else {
      r.line([-82, -52, -17, -52], paper, 4);
      r.line([17, -52, 82, -52], paper, 4);
    }
  } else if (kind === "ribbonspool") {
    r.round(-24, -80, 48, 92, 8, tint ?? coral, wood);
    r.round(-37, -88, 74, 18, 6, gold, wood);
    r.round(-37, 6, 74, 18, 6, gold, wood);
    for (let i = 0; i < 7; i++)
      r.line([-22, -65 + i * 10, 22, -62 + i * 10], paper, 2);
    c.beginPath();
    c.moveTo(22, -12);
    c.bezierCurveTo(84, -18, 59, 33, 104, 18);
    c.strokeStyle = coral;
    c.lineWidth = 9;
    c.stroke();
    if (happy) bow(94, 13, 0.8, lilac);
  } else if (kind === "weddingfavors") {
    r.round(-112, 10, 224, 16, 6, wood, ink);
    r.line([-94, 15, 94, 15], gold, 3);
    for (let i = 0; i < 8; i++) {
      const x = -88 + (i % 4) * 58;
      const y = i < 4 ? -87 : -38;
      r.round(x - 22, y, 44, 43, 5, i % 2 ? cloud : paper, wood);
      r.line([x, y + 1, x, y + 41], coral, 4);
      bow(x, y + 4, 0.55, coral);
      r.round(x - 15, y + 17, 30, 16, 2, paper);
      if (happy) {
        c.fillStyle = ink;
        c.font = "bold 10px system-ui";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText("ADA", x, y + 25);
      } else if (i % 2) puff(x, y + 26, 0.22, gold);
      else leaf(x, y + 28, 0.3, teal);
    }
  } else if (kind === "clipboardflower") {
    r.line([0, 23, 0, -54], teal, 8);
    leaf(-14, -1, 0.8);
    leaf(17, -19, 0.74, teal);
    for (let i = 0; i < 7; i++) {
      const a = (i * Math.PI * 2) / 7;
      r.circle(Math.cos(a) * 24, -73 + Math.sin(a) * 24, 13, paper);
    }
    r.round(-21, -100, 42, 53, 6, tint ?? coral, wood);
    r.round(-16, -94, 32, 40, 3, paper);
    r.round(-10, -104, 20, 10, 3, gold);
    for (let i = 0; i < 3; i++)
      r.line([-10, -82 + i * 8, 10, -82 + i * 8], happy ? teal : lilac, 2);
    if (happy) r.line([-8, -63, -2, -58, 9, -72], teal, 3);
  } else if (kind === "weddingchair") {
    r.line([-36, -8, -42, 29], wood, 8);
    r.line([36, -8, 42, 29], wood, 8);
    r.round(-41, -111, 82, 92, 16, tint ?? paper, wood);
    r.round(-32, -100, 64, 66, 13, lilac);
    r.round(-52, -23, 104, 21, 9, paper, wood);
    r.line([-50, -50, -50, -18], wood, 7);
    r.line([50, -50, 50, -18], wood, 7);
    if (happy) {
      r.line([-31, -55, 0, -48, 31, -55], coral, 5);
      bow(0, -48, 0.9, coral);
      leaf(0, -79, 0.64);
    }
  } else if (kind === "bowtieinvite") {
    r.round(-83, -110, 166, 121, 7, tint ?? paper, wood);
    r.round(-75, -102, 150, 105, 4, cloud);
    r.round(-67, -94, 134, 89, 3, paper);
    c.fillStyle = ink;
    c.font = "bold 13px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("FOR BELL'S", 0, -77);
    c.fillText("SPARE BOW TIE", 0, -58);
    bow(0, -28, 1.15, happy ? lilac : coral);
    if (happy) r.line([53, -20, 60, -12, 70, -27], teal, 3);
  } else if (kind === "weddingguestbook" || kind === "memorybook") {
    r.round(-124, -101, 248, 129, 7, tint ?? teal, ink);
    c.beginPath();
    c.moveTo(-116, -94);
    c.quadraticCurveTo(-57, -107, 0, -85);
    c.lineTo(0, 18);
    c.quadraticCurveTo(-58, 2, -116, 17);
    c.closePath();
    c.fillStyle = paper;
    c.fill();
    c.strokeStyle = gold;
    c.lineWidth = 2;
    c.stroke();
    c.beginPath();
    c.moveTo(0, -85);
    c.quadraticCurveTo(58, -107, 116, -94);
    c.lineTo(116, 17);
    c.quadraticCurveTo(56, 2, 0, 18);
    c.closePath();
    c.fill();
    c.stroke();
    r.line([0, -84, 0, 17], wood, 2);
    r.line([89, 5, 89, 34, 99, 28, 108, 34, 108, 4], coral, 4);
    c.fillStyle = ink;
    c.font = "bold 12px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      kind === "weddingguestbook" ? "OUR GUESTS" : "BOTH DRAFTS",
      -57,
      -72,
    );
    c.fillText(
      kind === "weddingguestbook" ? "WELCOME" : "LEAF + CLOUD",
      57,
      -72,
    );
    if (happy && kind === "weddingguestbook") {
      for (const [x, y, s] of [
        [-83, -38, 0.63],
        [-36, -25, 0.72],
        [31, -37, 0.67],
        [84, -23, 0.61],
      ])
        leaf(x, y, s, teal);
      fern(66, 5, 0.35);
      r.line([-93, -8, -39, -3], gold, 1.5);
      r.line([20, 5, 45, 5], gold, 1.5);
    } else if (happy) {
      for (const x of [-57, 57]) {
        r.round(x - 35, -55, 70, 58, 3, cloud, gold);
        c.beginPath();
        c.ellipse(x, -26, 24, 19, -0.18, 0, Math.PI * 2);
        c.strokeStyle = gold;
        c.lineWidth = 5;
        c.stroke();
        leaf(x - 5, -27, 0.41, teal);
      }
      puff(66, -34, 0.32, paper);
    } else {
      for (const x of [-57, 57])
        for (let i = 0; i < 3; i++)
          r.line([x - 32, -47 + i * 18, x + 32, -47 + i * 18], gold, 1.5);
    }
  } else if (kind === "ceremonymodel") {
    // These are deliberately paper stand-ins on a tabletop, not extra guests.
    r.round(-141, 7, 282, 17, 6, wood, ink);
    r.round(-133, 2, 266, 10, 4, paper);
    c.beginPath();
    c.moveTo(-71, 1);
    c.lineTo(-71, -69);
    c.bezierCurveTo(-71, -140, 71, -140, 71, -69);
    c.lineTo(71, 1);
    c.strokeStyle = gold;
    c.lineWidth = 8;
    c.stroke();
    for (const [actor, x, scale] of [
      ["adaplanner", -88, 0.36],
      ["rill", -28, 0.45],
      ["moss", 33, 0.44],
      ["weddingbell", 106, 0.4],
    ] as const) {
      c.save();
      c.translate(x, 6 - 30 * scale);
      c.scale(scale, scale);
      drawWedding(r, actor, happy, 0);
      c.restore();
      r.round(x - 13, 4, 26, 4, 1, paper, gold);
    }
    if (happy) {
      c.fillStyle = ink;
      c.font = "bold 10px system-ui";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("EVERY HELPFUL HAND", 0, 15);
      bow(0, -112, 0.7, coral);
    }
  } else if (kind === "weddingpanorama") {
    // The complete portrait owns its cast. Do not layer separate Ada/Bell/couple
    // props over it; the planner below really holds eight separate bouquets.
    r.round(-335, 23, 670, 13, 6, tint ?? paper, gold);
    const guests = [
      ["moongrandmother", -302, -18, 0.62],
      ["crystalaunt", 298, -9, 0.67],
      ["cloudfamily", 225, -45, 0.65],
      ["flowercousins", -268, 9, 0.51],
    ] as const;
    for (const [actor, x, y, scale] of guests) {
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);
      drawWedding(r, actor, happy, 0);
      c.restore();
    }
    // A quiet paper garland spans the family, well above every face.
    r.line([-294, -175, -144, -150, 0, -161, 146, -149, 299, -175], gold, 2);
    for (let i = 0; i < 9; i++) {
      const x = -272 + i * 68;
      leaf(x, -158 + Math.abs(4 - i) * -3, 0.45, i % 2 ? lilac : sage);
    }
    c.save();
    c.translate(-175, 7);
    c.scale(0.76, 0.76);
    ada(happy);
    c.restore();
    c.save();
    c.translate(-46, 2);
    c.scale(0.89, 0.89);
    drawWedding(r, "rill", happy, time);
    c.restore();
    c.save();
    c.translate(45, 0);
    c.scale(0.94, 0.94);
    drawWedding(r, "moss", happy, time);
    c.restore();
    c.save();
    c.translate(145, 7);
    c.scale(0.66, 0.66);
    drawWedding(r, "weddingbell", happy, time);
    c.restore();
    if (happy) {
      // A small side table, not a second full cake covering Bell's face.
      r.line([205, 8, 205, 29], wood, 5);
      r.line([249, 8, 249, 29], wood, 5);
      r.round(195, 2, 64, 9, 4, gold, wood);
      r.round(207, -23, 40, 26, 4, paper, gold);
      puff(214, -17, 0.27, cloud);
      leaf(237, -13, 0.35, teal);
      bow(223, -34, 0.43, coral);
    }
  } else return false;
  return true;
}
