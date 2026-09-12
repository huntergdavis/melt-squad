import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Local illustration only: the scene owns water, channels, and planter motion.
// Clouds, plant growth, rain, and the seed procession are earned stage pictures.
export function drawConservatory(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#405c61";
  const paper = "#fff0d9";
  const sky = "#d9e9ea";
  const teal = "#76a7a0";
  const green = "#aac18e";
  const gold = "#dfbd7b";
  const coral = "#da9c91";
  const lilac = "#b7afd0";
  const wood = "#a58268";
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
  const leaf = (x: number, y: number, s = 1, color = green) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.beginPath();
    c.moveTo(0, 9);
    c.quadraticCurveTo(-25, -3, -8, -30);
    c.quadraticCurveTo(20, -15, 0, 9);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    r.line([0, 7, -5, -22], paper, 1.7);
    c.restore();
  };
  const cloud = (x: number, y: number, s = 1, uneven = false) => {
    r.circle(x - 22 * s, y, (uneven ? 15 : 22) * s, tint ?? sky);
    r.circle(
      x + (uneven ? 9 : 0) * s,
      y - (uneven ? 19 : 12) * s,
      (uneven ? 30 : 28) * s,
      tint ?? sky,
    );
    r.circle(x + 29 * s, y + (uneven ? 7 : 0) * s, 21 * s, tint ?? sky);
    r.round(x - 32 * s, y, 70 * s, 21 * s, 9 * s, tint ?? sky);
  };
  const snowflake = (x: number, y: number, s = 1) => {
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI) / 3;
      const dx = Math.cos(a) * 10 * s;
      const dy = Math.sin(a) * 10 * s;
      r.line([x - dx, y - dy, x + dx, y + dy], paper, 2 * s);
    }
  };
  const sun = (x: number, y: number, radius = 14) => {
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      r.line(
        [
          x + Math.cos(a) * (radius + 4),
          y + Math.sin(a) * (radius + 4),
          x + Math.cos(a) * (radius + 9),
          y + Math.sin(a) * (radius + 9),
        ],
        gold,
        2.4,
      );
    }
    r.circle(x, y, radius, gold);
  };
  const pot = (x: number, y: number, s = 1) => {
    c.beginPath();
    c.moveTo(x - 27 * s, y - 20 * s);
    c.lineTo(x - 21 * s, y + 22 * s);
    c.lineTo(x + 21 * s, y + 22 * s);
    c.lineTo(x + 27 * s, y - 20 * s);
    c.closePath();
    c.fillStyle = tint ?? coral;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.round(x - 30 * s, y - 26 * s, 60 * s, 13 * s, 4 * s, gold, wood);
    r.line([x - 14 * s, y + 15 * s, x + 14 * s, y + 15 * s], paper, 1.5);
  };
  const seedling = (blooming = false, umbrella = false) => {
    r.line([0, 5, 0, -84], teal, 8);
    // These two broad leaves are boots, not borrowed human footwear.
    r.round(-36, 7, 32, 21, 9, green, ink);
    r.round(4, 7, 34, 21, 9, green, ink);
    r.line([-29, 12, -17, 22], paper, 2);
    r.line([12, 12, 25, 22], paper, 2);
    leaf(-22, -35, 1.0, happy ? sky : green);
    leaf(29, -43, 1.0, happy ? gold : green);
    r.circle(0, -76, 24, tint ?? green);
    leaf(-7, -94, 0.76, teal);
    leaf(14, -91, 0.7, green);
    r.face(0, -78, 0.87, true);
    r.line([-10, -12, -33, -7, -43, happy ? -24 : -9], teal, 6);
    r.line([10, -12, 33, -7, 44, happy ? -24 : -9], teal, 6);
    if (happy) {
      snowflake(-28, -51, 0.62);
      r.circle(25, -59, 6, paper);
    }
    if (blooming && happy) {
      for (const side of [-1, 1]) {
        r.line([side * 8, -84, side * 36, -121], teal, 5);
        if (side < 0) {
          for (let i = 0; i < 5; i++)
            r.circle(
              -36 + Math.cos((i * Math.PI * 2) / 5) * 15,
              -129 + Math.sin((i * Math.PI * 2) / 5) * 15,
              10,
              sky,
            );
          r.circle(-36, -129, 9, teal);
          snowflake(-36, -129, 0.7);
        } else sun(37, -133, 14);
      }
      for (const [x, y] of [
        [-54, -109],
        [3, -124],
        [59, -92],
      ])
        r.line([x, y, x - 3, y + 11], sky, 2);
    }
    if (umbrella && happy) {
      r.line([39, -20, 36, -136], wood, 4);
      c.beginPath();
      c.moveTo(-39, -131);
      c.quadraticCurveTo(21, -218, 108, -153);
      c.quadraticCurveTo(75, -105, -39, -131);
      c.closePath();
      c.fillStyle = green;
      c.fill();
      c.strokeStyle = teal;
      c.lineWidth = 3;
      c.stroke();
      r.line([-27, -134, 95, -151], paper, 3);
      r.line([13, -139, 12, -159], paper, 2);
      r.line([48, -144, 58, -175], paper, 2);
    }
  };
  const nimbus = (rainhat = false) => {
    r.round(-31, 7, 24, 23, 7, wood, ink);
    r.round(7, 7, 24, 23, 7, wood, ink);
    cloud(0, -21, 0.9);
    cloud(0, -77, 1.2);
    r.round(-28, -65, 56, 78, 17, teal, ink);
    r.line([-24, -54, 0, -39, 24, -54], paper, 4);
    r.round(-18, -27, 36, 29, 4, paper);
    leaf(1, -7, 0.44, green);
    r.face(0, -89, 1.06, true);
    r.line([-20, -103, -9, -107], ink, 2);
    r.line([9, -107, 20, -103], ink, 2);
    r.line([-33, -43, -53, -31, -64, -46], sky, 11);
    r.line([33, -43, 54, -30, 63, -43], sky, 11);
    if (rainhat) {
      r.round(-63, -146, 126, 27, 11, gold, wood);
      c.beginPath();
      c.ellipse(0, -134, 88, 18, 0, 0, Math.PI * 2);
      c.fillStyle = teal;
      c.fill();
      c.strokeStyle = wood;
      c.lineWidth = 3;
      c.stroke();
      c.beginPath();
      c.ellipse(0, -136, 78, 13, 0, 0, Math.PI * 2);
      c.fillStyle = sky;
      c.fill();
      if (happy) {
        for (const [radius, color] of [
          [74, coral],
          [65, gold],
          [56, green],
          [47, sky],
          [38, lilac],
        ] as const) {
          c.beginPath();
          c.arc(-3, -140, radius, Math.PI, 0);
          c.strokeStyle = color;
          c.lineWidth = 7;
          c.stroke();
        }
        c.save();
        c.translate(76, -133);
        c.scale(0.46, 0.46);
        drawConservatory(r, "breebarometer", true, 0);
        c.restore();
      }
    } else {
      r.line([-63, 19, -63, -98], wood, 4);
      c.beginPath();
      c.moveTo(-77, -94);
      c.lineTo(-62, -145);
      c.lineTo(-48, -94);
      c.closePath();
      c.fillStyle = green;
      c.fill();
      c.strokeStyle = teal;
      c.lineWidth = 2;
      c.stroke();
      r.line([-63, -137, -63, -98], paper, 2);
      r.line([-64, 18, -57, 23, -51, 16], wood, 4);
    }
  };

  if (kind === "nimbusgardener" || kind === "nimbusrainhat") {
    nimbus(kind === "nimbusrainhat");
  } else if (kind === "breebarometer") {
    for (const side of [-1, 1])
      for (let i = 0; i < 3; i++)
        r.line(
          [
            side * 25,
            -29 + i * 16,
            side * 43,
            -19 + i * 16,
            side * 55,
            -28 + i * 21,
          ],
          ink,
          4,
        );
    r.round(-34, -82, 68, 100, 31, tint ?? teal, ink);
    r.line([0, -16, 0, 13], gold, 2);
    r.line([-13, -92, -28, -110, -34, -111], ink, 3);
    r.line([13, -92, 28, -110, 34, -111], ink, 3);
    r.circle(-34, -111, 4, gold);
    r.circle(34, -111, 4, gold);
    r.circle(0, -64, 35, gold);
    r.circle(0, -64, 29, paper);
    r.face(0, -70, 0.87, happy);
    for (let i = 0; i < 7; i++) {
      const a = Math.PI + (i * Math.PI) / 6;
      r.line(
        [
          Math.cos(a) * 23,
          -64 + Math.sin(a) * 23,
          Math.cos(a) * 27,
          -64 + Math.sin(a) * 27,
        ],
        teal,
        1.5,
      );
    }
    r.line([0, -42, happy ? 18 : -18, -49], happy ? teal : coral, 3);
    r.circle(0, -42, 4, gold);
  } else if (
    kind === "sleetseedling" ||
    kind === "sleetbloom" ||
    kind === "sleetumbrella"
  ) {
    seedling(kind === "sleetbloom", kind === "sleetumbrella");
    if (happy && kind === "sleetbloom") {
      r.round(-115, -204, 230, 35, 6, paper, wood);
      label("GOOD AT BEING SLEET", 0, -186, 16, teal);
    }
  } else if (kind === "forecastsign") {
    r.round(-126, -119, 252, 128, 11, paper, wood);
    r.round(-116, -109, 232, 108, 7, tint ?? teal);
    label(happy ? "INDOOR" : "TODAY'S", 0, -78, 28, paper);
    label(happy ? "GARDENING" : "FORECAST", 0, -44, 27, paper);
    if (happy) {
      leaf(-93, -28, 0.54);
      leaf(96, -28, 0.54);
    } else snowflake(0, -12, 0.75);
  } else if (kind === "forecastpots") {
    for (const x of [-119, 0, 119]) {
      pot(x, -31, 1.0);
      r.line([x, -51, x, -89], teal, 4);
      cloud(x, -104, 0.53);
      r.round(x - 58, -13, 116, 39, 4, paper, wood);
      label("BRISK", x, -2, 13);
      label("POSSIBLY VERY BRISK", x, 14, 8.5);
    }
  } else if (kind === "snowpeas") {
    pot(0, 0, 1.15);
    for (const [x, y] of [
      [-27, -70],
      [0, -105],
      [28, -65],
    ]) {
      r.line([x, -16, x, y + 12], teal, 5);
      leaf(x - 6, y + 32, 0.5);
      r.circle(x, y, 16, tint ?? green);
      r.face(x, y - 1, 0.48, true);
      if (happy) {
        c.beginPath();
        c.moveTo(x - 18, y - 10);
        c.quadraticCurveTo(x, y - 40, x + 18, y - 10);
        c.quadraticCurveTo(x + 8, y - 16, x + 2, y - 9);
        c.quadraticCurveTo(x - 8, y - 15, x - 18, y - 10);
        c.closePath();
        c.fillStyle = paper;
        c.fill();
        r.circle(x, y - 24, 4, sky);
      }
    }
    r.line([-27, -1, 4, 4, 24, -3], lilac, 7);
    r.line([15, 2, 15, 20], lilac, 6);
  } else if (kind === "sunseed") {
    r.circle(42, -5, 21, wood);
    r.circle(42, -5, 13, paper);
    pot(0, 0, 1.16);
    r.face(0, 0, 0.57, happy);
    r.line([0, -21, 0, -72], teal, 6);
    r.circle(0, -77, 25, gold);
    if (happy) {
      c.beginPath();
      c.moveTo(-6, -94);
      c.quadraticCurveTo(27, -151, 44, -111);
      c.quadraticCurveTo(47, -82, 7, -75);
      c.closePath();
      c.fillStyle = paper;
      c.fill();
      c.strokeStyle = gold;
      c.lineWidth = 2;
      c.stroke();
      r.face(0, -77, 0.8, true);
      // The same little sweater is now hanging from the pot handle.
      r.round(32, -13, 31, 35, 5, lilac, ink);
      r.line([33, -7, 25, 4], lilac, 10);
      r.line([61, -7, 68, 4], lilac, 10);
      r.line([38, 4, 58, 4], paper, 2);
      r.line([38, 12, 58, 12], paper, 2);
    } else {
      r.round(-24, -80, 48, 33, 8, lilac, ink);
      r.line([-19, -66, 19, -66], paper, 2);
      r.line([-19, -57, 19, -57], paper, 2);
      r.circle(-9, -91, 3, ink);
      r.circle(9, -91, 3, ink);
    }
  } else if (kind === "fogmushroom") {
    pot(0, 0, 1.15);
    r.round(-15, -91, 30, 71, 12, paper, wood);
    c.beginPath();
    c.moveTo(-57, -66);
    c.quadraticCurveTo(-54, -132, 0, -137);
    c.quadraticCurveTo(56, -132, 59, -66);
    c.closePath();
    c.fillStyle = tint ?? lilac;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
    for (const [x, y, radius] of [
      [-28, -91, 9],
      [9, -112, 12],
      [33, -85, 7],
    ])
      r.circle(x, y, radius, sky);
    r.face(0, -53, 0.61, true);
    if (happy) {
      for (const [x, y, s] of [
        [-44, -33, 0.3],
        [43, -44, 0.34],
        [-14, -13, 0.29],
      ])
        cloud(x, y, s);
    }
  } else if (kind === "breezeletters") {
    r.line([-145, -124, 145, -124], wood, 3);
    for (const [i, x] of [-95, 0, 95].entries()) {
      c.save();
      c.translate(x, -66);
      c.rotate(happy ? Math.sin(motion * 1.5 + i) * 0.03 : 0);
      r.line([0, -57, 0, -44], gold, 2);
      r.round(-39, -43, 78, 92, 5, paper, wood);
      label("REFERENCE", 0, -26, 9, teal);
      for (let j = 0; j < 4; j++)
        r.line([-27, -10 + j * 12, 27 - (j % 2) * 9, -10 + j * 12], gold, 2);
      if (happy) r.line([-18, 32, -4, 40, 19, 20], teal, 3);
      c.restore();
    }
  } else if (kind === "airrosette") {
    r.line([-22, -35, -35, 30], coral, 18);
    r.line([22, -35, 35, 30], lilac, 18);
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      r.circle(Math.cos(a) * 47, -73 + Math.sin(a) * 47, 14, gold);
    }
    r.circle(0, -73, 46, paper);
    label("EMPLOYEE", 0, -87, 13);
    label("OF THE AIR", 0, -66, 12, teal);
    r.line([-15, -51, 15, -51], gold, 2);
  } else if (kind === "nurserycloud" || kind === "lopsidedcloud") {
    cloud(0, -62, 1.16, kind === "lopsidedcloud");
    r.face(0, -65, 0.94, true);
    r.line([-22, -37, -33, -10], sky, 6);
    r.line([24, -35, 34, -10], sky, 6);
    if (happy) {
      r.round(-69, -13, 138, 43, 4, paper, wood);
      label("WATERING", 0, 0, 13);
      label("CERTIFIED", 0, 18, 13, teal);
    }
  } else if (kind === "mixedlabel") {
    r.line([0, -5, 0, 31], wood, 5);
    r.round(-104, -91, 208, 89, 7, tint ?? paper, wood);
    snowflake(-70, -55, 0.8);
    sun(71, -55, 9);
    label(happy ? "MIXED WEATHER" : "MIXED UP", 0, -26, 18, teal);
  } else if (kind === "steamflower") {
    pot(0, 0, 1.1);
    r.line([0, -20, 0, -79], teal, 6);
    leaf(-17, -41, 0.7);
    leaf(21, -59, 0.65, teal);
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      r.circle(Math.cos(a) * 21, -91 + Math.sin(a) * 21, 13, paper);
    }
    r.circle(0, -91, 16, gold);
    r.face(0, -93, 0.58, true);
    if (happy) {
      c.beginPath();
      c.moveTo(17, -113);
      c.bezierCurveTo(87, -135, -13, -167, 40, -186);
      c.strokeStyle = sky;
      c.lineWidth = 6;
      c.stroke();
      r.round(-27, -184, 91, 36, 7, sky, lilac);
      r.line([-17, -176, 54, -176], paper, 2);
      r.line([-17, -156, 54, -156], paper, 2);
      for (const x of [-18, 0, 18, 36, 54])
        r.line([x, -148, x, -140], lilac, 2);
      r.round(55, -5, 53, 29, 11, paper, wood);
      c.beginPath();
      c.ellipse(81, -5, 24, 7, 0, 0, Math.PI * 2);
      c.fillStyle = gold;
      c.fill();
      r.circle(72, -4, 2, paper);
      r.circle(87, -6, 2, paper);
    }
  } else if (kind === "cavegarden") {
    r.round(-109, -10, 218, 39, 12, wood, ink);
    c.beginPath();
    c.moveTo(-88, 0);
    c.lineTo(-88, -77);
    c.bezierCurveTo(-89, -182, 88, -183, 88, -77);
    c.lineTo(88, 0);
    c.closePath();
    c.fillStyle = ink;
    c.fill();
    c.strokeStyle = lilac;
    c.lineWidth = 23;
    c.stroke();
    r.round(-28, -80, 56, 65, 19, green, ink);
    r.circle(0, -91, 29, green);
    r.line([-17, -110, -26, -130], gold, 7);
    r.line([17, -110, 26, -130], gold, 7);
    r.face(0, -94, 0.87, true);
    r.line([-26, -56, -42, -79, -50, -50, -27, -31], teal, 7);
    r.line([26, -56, 42, -79, 50, -50, 27, -31], teal, 7);
    if (happy) {
      r.line([-78, -135, 78, -135], gold, 4);
      r.round(-79, -133, 27, 93, 6, paper, lilac);
      r.round(52, -133, 27, 93, 6, paper, lilac);
      r.line([-75, -79, -56, -76], coral, 7);
      r.line([56, -76, 75, -79], coral, 7);
      cloud(-72, -16, 0.35);
      cloud(73, -18, 0.35);
      r.round(-86, -21, 172, 43, 5, paper, gold);
      label("HOME", 0, -8, 15, teal);
      label("PLEASE KNOCK", 0, 10, 13);
    }
  } else if (kind === "moonflower") {
    pot(0, 0, 1.05);
    r.line([0, -18, 0, -75], teal, 7);
    leaf(-17, -38, 0.7);
    leaf(21, -52, 0.66, teal);
    for (let i = 0; i < 7; i++) {
      const a = (i * Math.PI * 2) / 7;
      r.circle(Math.cos(a) * 29, -101 + Math.sin(a) * 29, 15, tint ?? lilac);
    }
    r.circle(0, -101, 24, paper);
    r.circle(0, -101, 18, gold);
    if (happy) {
      c.beginPath();
      c.moveTo(-30, -103);
      c.quadraticCurveTo(-36, -146, -3, -150);
      c.lineTo(-3, -112);
      c.closePath();
      c.fillStyle = sky;
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 2;
      c.stroke();
      c.beginPath();
      c.moveTo(30, -103);
      c.quadraticCurveTo(36, -146, 3, -150);
      c.lineTo(3, -112);
      c.closePath();
      c.fill();
      c.stroke();
      r.face(0, -101, 0.62, true);
      r.line([-17, -73, -24, -48, -12, -39], teal, 5);
      r.line([17, -73, 24, -48, 12, -39], teal, 5);
      r.round(-24, -53, 19, 29, 6, ink, wood);
      r.round(5, -53, 19, 29, 6, ink, wood);
      r.line([-5, -40, 5, -40], wood, 6);
      r.circle(-14, -28, 7, sky);
      r.circle(14, -28, 7, sky);
    } else snowflake(0, -101, 1.1);
  } else if (kind === "highstreetweather") {
    const titles = ["PICNIC", "POND", "SKATING"];
    for (let i = 0; i < 3; i++) {
      const x = -141 + i * 141;
      r.round(x - 66, -116, 132, 145, 8, paper, wood);
      r.round(x - 57, -106, 114, 97, 4, i === 2 ? lilac : sky);
      label(titles[i], x, 12, 12, teal);
      if (happy && i === 0) {
        sun(x - 24, -79, 10);
        r.round(x - 40, -47, 80, 30, 5, green);
        r.line([x - 36, -41, x + 36, -41], paper, 2);
        r.line([x - 36, -27, x + 36, -27], paper, 2);
        r.round(x - 12, -64, 24, 25, 4, gold, wood);
      } else if (happy && i === 1) {
        c.beginPath();
        c.ellipse(x, -38, 44, 18, 0, 0, Math.PI * 2);
        c.fillStyle = teal;
        c.fill();
        r.round(x - 17, -52, 30, 16, 8, gold);
        r.circle(x + 8, -56, 9, gold);
        r.circle(x + 11, -58, 1.6, ink);
        r.line([x + 16, -53, x + 24, -52], coral, 3);
      } else if (happy) {
        r.round(x - 42, -52, 84, 35, 8, paper, teal);
        r.round(x - 12, -68, 25, 24, 7, coral);
        r.line([x - 17, -40, x + 19, -40], ink, 3);
        r.line([x - 4, -45, x - 4, -40], ink, 2);
        r.line([x + 10, -45, x + 10, -40], ink, 2);
      }
    }
  } else if (kind === "rainforestpot" || kind === "tinyforestpot") {
    const tiny = kind === "tinyforestpot";
    pot(0, 0, tiny ? 0.48 : 1.35);
    for (const [x, y, s] of [
      [-29, -59, 1.1],
      [13, -96, 1.4],
      [34, -54, 0.95],
    ]) {
      // The generous foliage shares a genuinely small central container.
      r.line([tiny ? 0 : x, tiny ? -9 : -25, x, y - 4], teal, 5);
      leaf(x, y, s, happy ? green : teal);
      leaf(x + 13, y + 31, s * 0.7, teal);
    }
    if (happy) {
      for (const [x, y] of [
        [-28, -88],
        [35, -110],
        [-2, -53],
      ])
        r.line([x, y, x - 2, y + 10], sky, 2);
      r.face(0, 0, tiny ? 0.26 : 0.53, true);
    }
  } else if (kind === "raincurtain") {
    // The two actual nursery-cloud props own the faces and bodies.
    r.line([-200, -50, 200, -50], gold, 4);
    if (happy) {
      for (let i = 0; i < 21; i++) {
        const x = -190 + i * 19;
        r.line([x, -46, x, -20], sky, 3);
        r.circle(x, -15, 3, sky);
      }
      r.round(-169, -14, 338, 59, 5, paper, wood);
      label("PLUMBING", 0, 1, 18, teal);
      label("OCCASIONALLY MISTAKEN", 0, 20, 13);
      label("FOR DESTINY", 0, 36, 13);
    }
  } else if (kind === "thundergourd") {
    r.line([0, -72, -7, -116, 10, -130], wood, 7);
    leaf(15, -109, 0.75, teal);
    r.circle(-22, -32, 37, tint ?? gold);
    r.circle(22, -32, 37, tint ?? gold);
    r.round(-30, -71, 60, 96, 29, gold);
    for (const x of [-33, 0, 33]) r.line([x, -56, x * 1.1, 5], coral, 2);
    r.face(0, -40, 1, true);
    r.line([-6, -19, 5, -19, -2, -3, 10, -3, -5, 15], paper, 4);
    if (happy) {
      r.round(23, -98, 83, 27, 11, paper, wood);
      label("rumble.", 65, -85, 12, teal);
      r.line([41, -72, 35, -61], wood, 2);
      r.line([-39, -13, -28, 15, -18, -13], lilac, 6);
    }
  } else if (kind === "floweraudience") {
    for (const [i, x] of [-89, 0, 89].entries()) {
      pot(x, 0, 0.87);
      r.line([x, -20, x, -61], teal, 5);
      for (let j = 0; j < 5; j++) {
        const a = (j * Math.PI * 2) / 5;
        r.circle(
          x + Math.cos(a) * 16,
          -79 + Math.sin(a) * 16,
          10,
          i === 1 ? lilac : gold,
        );
      }
      r.circle(x, -79, 13, paper);
      r.face(x, -81, 0.52, true);
      c.beginPath();
      c.arc(x, -82, 26, Math.PI, 0);
      c.strokeStyle = ink;
      c.lineWidth = 5;
      c.stroke();
      r.round(x - 30, -88, 12, 24, 5, teal, wood);
      r.round(x + 18, -88, 12, 24, 5, teal, wood);
      r.line([x - 3, -43, x - 24, happy ? -59 : -25], green, 5);
      r.line([x + 3, -43, x + 24, happy ? -59 : -25], green, 5);
    }
  } else if (kind === "weatherlabels") {
    r.line([-30, -3, -39, 31], wood, 4);
    r.line([46, -3, 50, 31], wood, 4);
    r.round(-110, -104, 220, 112, 6, paper, wood);
    r.round(-101, -95, 99, 86, 3, sky);
    r.round(2, -95, 99, 86, 3, gold);
    r.line([0, -94, 0, -8], wood, 2);
    snowflake(-49, -64, 1.3);
    sun(49, -66, 13);
    label("SNOW", -49, -25, 14);
    label("SUN", 49, -25, 14);
    if (happy) {
      r.round(65, -105, 58, 115, 4, paper, green);
      r.line([74, -85, 81, -91, 90, -78, 98, -86, 112, -73], teal, 2);
      r.line([76, -56, 95, -65, 111, -49], lilac, 2);
      r.round(75, -25, 15, 12, 4, green);
      r.round(96, -25, 15, 12, 4, green);
      label("…", 94, -4, 18, teal);
    }
  } else if (kind === "seasoncases") {
    const names = ["SPRING", "SUMMER", "WINTER", "YOUR CHOICE"];
    for (let i = 0; i < 4; i++) {
      const x = -132 + i * 88;
      const closed = happy && i < 3;
      r.round(
        x - 35,
        -44,
        70,
        68,
        7,
        i === 3 ? paper : i === 0 ? green : i === 1 ? gold : sky,
        wood,
      );
      r.round(
        x - 36,
        closed ? -45 : -101,
        72,
        closed ? 20 : 60,
        6,
        closed ? teal : paper,
        wood,
      );
      r.round(x - 11, closed ? -33 : -92, 22, 11, 3, gold, wood);
      if (!closed) {
        r.round(x - 28, -34, 56, 43, 4, ink);
        if (i < 3) {
          r.round(x - 19, -25, 38, 31, 3, paper);
          leaf(x, -9, 0.47);
        }
      }
      if (happy) {
        r.round(x - 33, 5, 66, 18, 3, paper);
        label(names[i], x, 14, i === 3 ? 8.5 : 10, teal);
      }
    }
  } else if (kind === "hangingplanter") {
    // follow() anchors at the actual basin's y + 0.75h. For the authored
    // 70px-high basin the real surface therefore lies at local y=-52.5.
    r.line([-61, -152, -71, -53], wood, 3);
    r.line([61, -152, 71, -53], wood, 3);
    for (const [x, y, s] of [
      [-38, -97, 1.15],
      [2, -126, 1.24],
      [38, -94, 1.08],
    ]) {
      r.line([x, -52, x, y], teal, 5);
      leaf(x, y, s);
      leaf(x + 13, y + 28, s * 0.7, teal);
    }
    c.beginPath();
    c.moveTo(-75, -52.5);
    c.lineTo(-59, 17.5);
    c.lineTo(59, 17.5);
    c.lineTo(75, -52.5);
    c.closePath();
    c.fillStyle = tint ?? coral;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 3;
    c.stroke();
    r.round(-80, -61.5, 160, 17, 5, gold, wood);
    c.beginPath();
    c.ellipse(0, -52.5, 75, 9, 0, 0, Math.PI * 2);
    c.fillStyle = ink;
    c.fill();
    r.face(0, -12, 0.82, true);
    if (happy) {
      c.beginPath();
      c.moveTo(14, -59);
      c.bezierCurveTo(86, -97, 57, -119, 18, -142);
      c.strokeStyle = teal;
      c.lineWidth = 5;
      c.stroke();
      r.round(-55, -154, 110, 34, 8, green, teal);
      r.circle(-55, -137, 5, paper);
      r.circle(55, -137, 5, paper);
      label("RETURN", 0, -143, 13);
      label("TICKET", 0, -129, 11, teal);
    }
  } else if (kind === "conservatorypanorama") {
    // Exactly Nimbus, Bree, and Sleet, with three closed cases and one choice.
    r.round(-343, 27, 686, 13, 6, paper, gold);
    r.round(-211, -210, 422, 91, 12, paper, wood);
    label("LOCALLY GROWN WEATHER", 0, -186, 22, teal);
    label("INCLUDING THE UNEXPECTED", 0, -158, 17);
    r.round(-20, -142, 17, 12, 4, green);
    r.round(3, -142, 17, 12, 4, green);
    c.save();
    c.translate(-233, 5);
    c.scale(0.79, 0.79);
    nimbus(false);
    c.restore();
    c.save();
    c.translate(-82, 5);
    c.scale(0.78, 0.78);
    drawConservatory(r, "breebarometer", happy, time);
    c.restore();
    c.save();
    c.translate(94, 4);
    c.scale(0.8, 0.8);
    seedling(true);
    c.restore();
    c.save();
    c.translate(4, 25);
    c.scale(0.53, 0.53);
    drawConservatory(r, "seasoncases", happy, 0);
    c.restore();
    if (happy) {
      r.round(202, -113, 101, 117, 7, teal, wood);
      r.round(211, -105, 83, 57, 4, paper);
      label("SEED", 252, -88, 18);
      label("EXCHANGE", 252, -67, 12);
      for (let i = 0; i < 3; i++) {
        r.round(213 + i * 26, -36, 22, 30, 3, i % 2 ? gold : sky, paper);
        leaf(224 + i * 26, -16, 0.3, teal);
      }
    }
  } else return false;
  return true;
}
