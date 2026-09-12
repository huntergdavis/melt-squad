import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Original room-service illustrations. The renderer supplies all placement,
// including the aquarium's single shared physical cabin transform. Nothing
// here moves a target, pours liquid, changes a weekday, or invents a recipe.
export function drawHotel(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
  _progress?: number,
): boolean {
  const c = r.ctx;
  const ink = "#48475c";
  const cream = "#fff0d8";
  const brass = "#dab97c";
  const wood = "#a28672";
  const plum = "#a390b3";
  const lilac = "#c8bbd6";
  const teal = "#85aaa4";
  const blue = "#b9d1dc";
  const coral = "#de9e94";
  const green = "#a7bd95";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;
  const at = (x: number, y: number, scale: number, draw: () => void) => {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    draw();
    c.restore();
  };
  const oval = (x: number, y: number, rx: number, ry: number, fill: string) => {
    c.beginPath();
    c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    c.fillStyle = fill;
    c.fill();
  };
  const label = (text: string, x: number, y: number, size = 15, fill = ink) => {
    c.font = `bold ${size}px system-ui`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = fill;
    c.fillText(text, x, y);
  };
  const caption = (text: string, x: number, y: number, size = 15) => {
    c.save();
    c.font = `bold ${size}px system-ui`;
    const width = Math.ceil(c.measureText(text).width) + 14;
    r.round(x - width / 2, y - (size + 8) / 2, width, size + 8, 4, cream);
    label(text, x, y, size);
    c.restore();
  };
  const plaque = (x: number, y: number, width: number, height: number) => {
    r.round(x - width / 2, y, width, height, 7, cream, brass);
    r.circle(x - width / 2 + 8, y + 8, 2, wood);
    r.circle(x + width / 2 - 8, y + 8, 2, wood);
  };
  const heart = (x: number, y: number, scale = 1) => {
    at(x, y, scale, () => {
      c.beginPath();
      c.moveTo(0, 8);
      c.bezierCurveTo(-23, -5, -12, -22, 0, -12);
      c.bezierCurveTo(12, -22, 23, -5, 0, 8);
      c.fillStyle = coral;
      c.fill();
    });
  };
  const key = (x: number, y: number, scale = 1) => {
    at(x, y, scale, () => {
      r.circle(0, -16, 8, brass);
      r.circle(0, -16, 3, cream);
      r.line([0, -9, 0, 11, 9, 11, 9, 6], brass, 5);
    });
  };
  const chair = (x: number, y: number, width = 67) => {
    r.round(x - width / 2, y - 70, width, 74, 17, plum, ink);
    r.round(x - width / 2 - 5, y - 1, width + 10, 14, 6, cream, wood);
    r.line([x - width * 0.34, y + 12, x - width * 0.39, y + 35], wood, 6);
    r.line([x + width * 0.34, y + 12, x + width * 0.39, y + 35], wood, 6);
  };
  const between = (resting = false) => {
    if (resting) chair(0, 5, 91);
    // Three paths per side, six rounded tips: no hidden seventh or eighth arm.
    for (const side of [-1, 1])
      for (let i = 0; i < 3; i++) {
        const x = side * (resting ? 42 + i * 18 : 53 + i * 12);
        const y = resting ? [-17, 8, 31][i]! : -45 + i * 29;
        const sway =
          !resting && happy && i === 0 ? Math.sin(motion * 1.3) * 1.5 : 0;
        c.beginPath();
        c.moveTo(side * (19 + i * 3), -35 + i * 12);
        c.bezierCurveTo(
          side * (resting ? 30 + i * 12 : 47),
          resting ? -25 + i * 18 : -25 + i * 21,
          x + side * 11,
          y + (resting ? 5 : 18),
          x,
          y + sway,
        );
        if (resting) {
          c.strokeStyle = ink;
          c.lineWidth = 14;
          c.lineCap = "round";
          c.stroke();
        }
        c.strokeStyle = tint ?? teal;
        c.lineWidth = 11;
        c.lineCap = "round";
        c.stroke();
        if (resting) r.circle(x, y, 7, ink);
        r.circle(x, y + sway, 5.5, teal);
        r.circle(x + side * 2, y + sway + 8, 1.8, cream);
        if (!resting && side < 0 && i === 0) key(x, y - 10 + sway, 0.7);
        if (!resting && side > 0 && i === 0) {
          r.round(x - 12, y - 27 + sway, 24, 25, 3, cream, wood);
          r.line([x - 6, y - 19 + sway, x + 6, y - 19 + sway], coral, 2);
        }
      }
    oval(-32, -79, 11, 39, lilac);
    oval(32, -79, 11, 39, lilac);
    r.round(-30, -114, 60, 90, 29, tint ?? teal, ink);
    r.round(-25, -44, 50, 41, 13, plum, ink);
    r.round(-16, -36, 32, 24, 5, cream);
    label("M. B.", 0, -24, 10);
    r.line([-12, -50, 0, -41, 12, -50], cream, 4);
    if (resting) {
      r.line([-18, -77, -12, -73, -6, -77], ink, 2.5);
      r.line([6, -77, 12, -73, 18, -77], ink, 2.5);
      r.line([-9, -61, 0, -57, 9, -61], ink, 2);
    } else r.face(0, -78, 0.88, happy);
    r.round(-18, -121, 36, 11, 4, brass, ink);
    r.circle(0, -116, 3, cream);
  };
  const yesterday = (noting = false) => {
    r.round(-69, -15, 143, 28, 14, cream, ink);
    r.round(34, -50, 37, 59, 17, cream, ink);
    r.circle(-20, -38, 39, tint ?? plum);
    c.beginPath();
    for (let i = 0; i <= 70; i++) {
      const a = i * 0.15,
        radius = 3 + i * 0.39;
      const x = -20 + Math.cos(a) * radius,
        y = -38 + Math.sin(a) * radius;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.strokeStyle = cream;
    c.lineWidth = 3;
    c.stroke();
    r.line([44, -45, 43, -73], cream, 6);
    r.line([62, -46, 68, -72], cream, 6);
    r.circle(43, -74, 7, cream);
    r.circle(68, -73, 7, cream);
    r.circle(45, -74, 2.8, ink);
    r.circle(70, -73, 2.8, ink);
    r.line([47, -30, 56, -26, 63, -31], ink, 2);
    r.round(33, -57, 40, 10, 4, brass, ink);
    r.round(39, -68, 28, 12, 4, plum, ink);
    r.round(-36, -57, 29, 37, 4, cream, brass);
    key(-22, -36, 0.55);
    if (noting) {
      r.round(68, -26, 35, 29, 3, cream, wood);
      r.line([74, -18, 95, -18, 74, -9, 89, -9], plum, 2);
      r.line([77, -26, 86, -39], wood, 3);
    }
  };
  const cloud = (x: number, y: number, scale = 1, sleepy = false) => {
    at(x, y, scale, () => {
      r.circle(-32, -3, 27, blue);
      r.circle(0, -18, 35, cream);
      r.circle(33, -4, 28, blue);
      r.round(-49, -5, 99, 35, 17, cream);
      if (sleepy) {
        r.line([-21, -3, -14, 2, -7, -3], ink, 3);
        r.line([7, -3, 14, 2, 21, -3], ink, 3);
        oval(0, 13, 5, 7, ink);
      } else r.face(0, 0, 0.8, true);
    });
  };
  const sun = (x: number, y: number, scale = 1, sleepy = false) => {
    at(x, y, scale, () => {
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        r.line(
          [
            Math.cos(a) * 33,
            Math.sin(a) * 33,
            Math.cos(a) * 44,
            Math.sin(a) * 44,
          ],
          brass,
          5,
        );
      }
      r.circle(0, 0, 31, brass);
      if (sleepy) {
        r.line([-17, -5, -10, 0, -3, -5], ink, 2.5);
        r.line([3, -5, 10, 0, 17, -5], ink, 2.5);
        r.line([-7, 13, 7, 13], ink, 2);
      } else r.face(0, -2, 0.85, true);
    });
  };
  const moon = (x: number, y: number, scale = 1) => {
    at(x, y, scale, () => {
      r.circle(0, 0, 34, blue);
      for (const [px, py, radius] of [
        [-18, -18, 6],
        [16, 19, 7],
        [-22, 10, 4],
      ])
        r.circle(px, py, radius, lilac);
      r.face(0, -1, 0.9, true);
    });
  };
  const ghost = (x: number, y: number, scale = 1) => {
    at(x, y, scale, () => {
      c.beginPath();
      c.moveTo(-28, 14);
      c.lineTo(-28, -22);
      c.bezierCurveTo(-28, -65, 29, -65, 29, -22);
      c.lineTo(35, 17);
      c.lineTo(18, 10);
      c.lineTo(3, 18);
      c.lineTo(-12, 11);
      c.closePath();
      c.fillStyle = cream;
      c.fill();
      c.strokeStyle = plum;
      c.lineWidth = 2.5;
      c.stroke();
      r.face(0, -25, 0.75, true);
    });
  };
  const bell = (silent = false) => {
    r.round(-46, -6, 92, 15, 6, wood, ink);
    c.beginPath();
    c.moveTo(-37, -7);
    c.bezierCurveTo(-36, -61, 36, -61, 37, -7);
    c.closePath();
    c.fillStyle = brass;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 3;
    c.stroke();
    r.line([0, -46, 0, -57], wood, 5);
    r.round(-12, -61, 24, 9, 4, brass, ink);
    if (silent) {
      r.round(-29, -34, 58, 18, 6, cream);
      r.line([-17, -25, 17, -25], plum, 2);
    } else r.circle(-20, -18, 4, cream);
  };
  const vessel = (style: string) => {
    if (style === "mug") r.round(59, -40, 37, 43, 13, cream, wood);
    r.round(-70, -52.5, 140, 70, 16, cream, brass);
    r.line([-69, -52.5, 69, -52.5], teal, 3);
    if (style === "vase") r.line([-52, 10, -32, -36, 34, -36, 52, 10], plum, 3);
    if (style === "umbrella") {
      for (const x of [-46, 0, 46]) r.line([x, -47, 0, 14], plum, 2);
      r.line([0, 18, 0, 33, 11, 37, 16, 30], wood, 4);
    }
    // No painted liquid: this exact 140×70 interior receives the real fill.
  };
  const parcel = () => {
    r.round(-45, -68, 90, 70, 9, cream, wood);
    r.line([-3, -65, -3, 0], teal, 7);
    r.line([-42, -32, 42, -32], teal, 7);
    r.line(
      [-3, -35, -26, -53, -31, -36, -3, -35, 21, -53, 26, -35, -3, -35],
      brass,
      3,
    );
  };

  if (kind === "betweenreceptionist") between();
  else if (kind === "yesterdayporter") yesterday(happy);
  else if (kind === "hotelbell") bell();
  else if (kind === "silentbell") bell(true);
  else if (kind === "hotelcup") vessel("mug");
  else if (kind === "hotelvase") vessel("vase");
  else if (kind === "hotelbowl") vessel("bowl");
  else if (kind === "umbrellabasin") vessel("umbrella");
  else if (kind === "reliablepostcard") {
    plaque(0, -75, 190, 80);
    r.round(51, -62, 31, 34, 3, teal, brass);
    r.line([58, -52, 73, -39], cream, 2);
    if (happy) {
      label("THE RELIABLE", -26, -46, 13);
      label("ONE", -26, -25, 16);
    } else label("POSTCARD", -20, -42, 15);
    r.line([-74, -10, 65, -10], plum, 2);
  } else if (kind === "linenparcel") {
    parcel();
  } else if (kind === "guesthearttag") {
    // The thin luggage-label frame never paints over the active pour-through hole.
    r.round(-90, -80, 180, 9, 3, cream, brass);
    r.round(-90, -71, 9, 62, 3, cream, brass);
    r.round(81, -71, 9, 62, 3, cream, brass);
    r.round(-90, -9, 180, 9, 3, cream, brass);
    if (happy) {
      caption("GUEST", -36, -76, 13);
      heart(61, -76, 0.35);
    }
  } else if (kind === "alwayscard") {
    plaque(0, -73, 220, 78);
    label(happy ? "ALWAYS WELCOME" : "ROOM RESERVED", 0, -47, 20);
    if (happy) label("WEDNESDAYS, TOO", 0, -18, 15);
    else key(0, -12, 0.6);
  } else if (kind === "hotelentrance") {
    // One doorway and one mat; opening is an earned illustration, not navigation.
    r.round(79, -237, 198, 238, 22, wood, brass);
    r.round(91, -224, 174, 216, 16, happy ? lilac : plum, cream);
    if (happy) {
      r.round(188, -220, 73, 205, 10, cream, brass);
      r.circle(204, -102, 5, wood);
      for (const x of [114, 143, 172])
        r.line([x, -209, x, -23], "#fff0d855", 2);
    } else {
      r.line([178, -216, 178, -16], brass, 4);
      r.circle(163, -101, 5, brass);
    }
    at(-170, -80, 0.84, () => between());
    r.round(-272, -115, 366, 28, 9, wood, brass);
    r.round(-257, -87, 336, 96, 12, plum, brass);
    r.round(-214, -66, 250, 43, 8, cream);
    label("BETWEEN TUESDAYS", -89, -45, 20);
    at(204, -12, 0.78, () => yesterday(happy));
    if (happy) {
      r.round(106, 22, 193, 33, 11, teal, brass);
      label("WELCOME", 202, 38, 17, cream);
    }
  } else if (kind === "mondaywindow") {
    r.round(-107, -168, 291, 169, 13, wood, brass);
    r.round(-95, -156, 267, 145, 7, happy ? blue : lilac);
    for (const x of [-83, 151]) r.round(x, -156, 23, 145, 5, plum);
    if (happy) {
      sun(64, -108, 0.57);
      r.line([-71, -36, -23, -57, 12, -38, 62, -49, 144, -22], green, 16);
      caption("MONDAY'S PLEASANT MINUTE", 29, 23, 15);
      r.line([170, 69, 170, 34, 181, 19], green, 5);
      for (const [x, y] of [
        [181, 11],
        [172, 18],
        [189, 20],
        [181, 27],
      ])
        r.circle(x, y, 8, coral);
      r.circle(181, 19, 5, brass);
    } else {
      cloud(32, -106, 0.75);
      for (const x of [-54, -20, 14, 48, 82, 116])
        r.line([x, -63, x - 5, -49], cream, 2);
      label("MONDAY", 34, -24, 16);
    }
    r.round(-180, -76, 60, 50, 8, brass, wood);
    r.round(-166, -66, 32, 29, 5, cream, wood);
    r.line([-150, -66, -150, -38], wood, 4);
  } else if (kind === "cloudpillow") {
    r.round(-130, 0, 261, 37, 16, plum, wood);
    r.round(-116, 10, 232, 23, 9, cream);
    cloud(0, -51, 1.65, happy);
    if (!happy) {
      r.line([-29, -67, -11, -61], ink, 4);
      r.line([11, -61, 29, -67], ink, 4);
    }
    plaque(158, -105, 98, 67);
    r.round(123, -90, 69, 35, 6, lilac, plum);
    for (const x of [139, 157, 175]) r.line([x, -87, x, -58], cream, 2);
    if (happy) caption("ROOM SERVICE, QUIETLY", 0, 58, 15);
  } else if (kind === "rainluggage") {
    cloud(-27, -104, 1.22);
    r.round(116, -51, 77, 71, 10, plum, wood);
    r.line([138, -51, 138, -67, 169, -67, 169, -51], brass, 5);
    r.line([132, -43, 132, 12, 177, 12, 177, -43], brass, 2);
    at(-145, 49, 0.76, () => yesterday(happy));
    plaque(260, -99, 86, 72);
    label(happy ? "RAINBOW" : "LUGGAGE", 260, -77, 11);
    if (happy) {
      for (const [i, color] of [coral, brass, green, blue].entries()) {
        c.beginPath();
        c.arc(260, -43, 24 - i * 4, Math.PI, Math.PI * 2);
        c.strokeStyle = color;
        c.lineWidth = 3;
        c.stroke();
      }
      // The one umbrella shelters the suitcase, deliberately not the porter.
      r.line([153, -73, 153, -10], wood, 4);
      c.beginPath();
      c.moveTo(90, -73);
      c.quadraticCurveTo(153, -142, 216, -73);
      c.closePath();
      c.fillStyle = teal;
      c.fill();
      c.strokeStyle = brass;
      c.lineWidth = 3;
      c.stroke();
      for (const x of [-62, -26, 12, 48]) r.line([x, -46, x - 3, -30], blue, 3);
      caption("THE LUGGAGE STAYS DRY", 0, -185, 15);
    }
  } else if (kind === "midnightbreakfast") {
    sun(-168, -62, 1.12, true);
    moon(168, -62, 1.1);
    plaque(0, -166, 150, 76);
    label("ROOM SERVICE", 0, -143, 15);
    r.line([-57, -119, 57, -119], brass, 3);
    if (happy) label("EXCHANGES WELCOME", 0, -105, 10);
    for (const [i, x] of [-168, 168].entries()) {
      r.round(x - 67, -11, 134, 26, 8, wood, brass);
      oval(x, -12, 51, 7, cream);
      const toast = happy ? i === 1 : i === 0;
      if (toast) {
        r.round(x - 28, -36, 56, 24, 7, brass, wood);
        r.round(x - 7, -37, 17, 7, 2, cream);
      } else {
        oval(x, -22, 29, 11, cream);
        r.circle(x + 5, -24, 7, brass);
      }
      caption(i ? "MOON" : "SUN", x, -119, 15);
    }
    if (happy) caption("I LIKE YOUR BREAKFAST", 0, -190, 15);
  } else if (kind === "holidaystairs") {
    // Illustrated stair character; the separate ice footprints own the tasks.
    c.beginPath();
    c.moveTo(-183, 59);
    c.lineTo(-183, 19);
    c.lineTo(-131, 19);
    c.lineTo(-131, -24);
    c.lineTo(-78, -24);
    c.lineTo(-78, -68);
    c.lineTo(-23, -68);
    c.lineTo(-23, -112);
    c.lineTo(30, -112);
    c.lineTo(30, 59);
    c.closePath();
    c.fillStyle = wood;
    c.fill();
    c.strokeStyle = brass;
    c.lineWidth = 4;
    c.stroke();
    r.face(-43, -4, 0.9, happy);
    if (happy) {
      r.round(-57, -80, 123, 13, 5, cream, wood);
      r.round(-25, -109, 59, 32, 12, cream, wood);
      r.line([-24, -87, 32, -87], coral, 7);
    } else {
      plaque(-63, 73, 192, 57);
      label("ON ANNUAL LEAVE", -63, 94, 16);
      label("BACK WITH SOUVENIRS", -63, 116, 11);
    }
    const tx = happy ? 187 : -120,
      ty = happy ? 26.316 : 145;
    at(tx, ty, 1, () => {
      r.line([-49, -14, -49, -90, 46, -90, 46, -14], brass, 5);
      r.round(-51, -21, 102, 12, 5, wood, ink);
      for (const x of [-36, 35]) r.circle(x, -8, 8, ink);
      r.round(-39, -67, 74, 45, 8, plum, brass);
      r.line([-8, -66, -8, -78, 10, -78, 10, -66], wood, 4);
      r.round(-21, -99, 48, 30, 7, teal, brass);
    });
    plaque(316, -99, 91, 70);
    label(happy ? "RELEASED" : "TROLLEY", 316, -70, 13);
    key(316, -41, 0.55);
  } else if (kind === "conservatorycase") {
    r.round(-244, -314, 481, 320, 23, wood, brass);
    r.round(-228, -298, 449, 288, 16, "#c9d8c588", cream);
    for (const x of [-213, -68, 77, 207]) r.line([x, -290, x, -17], cream, 3);
    r.line([-220, -234, 214, -234], brass, 3);
    r.round(-246, -180, 60, 72, 8, brass, wood);
    r.round(-231, -165, 30, 42, 6, cream, wood);
    r.line([-216, -165, -216, -125], wood, 5);
    r.line([156, -86, 152, -141, 174, -171, 154, -211], green, 7);
    for (const [x, y, side] of [
      [155, -115, -1],
      [161, -158, 1],
      [157, -193, -1],
    ]) {
      oval(x + side * 19, y - 10, 25, 10, green);
    }
    if (happy) {
      for (const [dx, dy] of [
        [-12, 0],
        [0, -12],
        [12, 0],
        [0, 12],
      ])
        r.circle(154 + dx, -224 + dy, 10, coral);
      r.circle(154, -224, 7, brass);
      r.line([154, -220, 202, -214, 233, -191], green, 5);
      caption("SUNLIGHT, NO HEAVY LIFTING", 0, -337, 15);
    }
  } else if (kind === "sleepyplanet") {
    r.circle(0, -65, 61, blue);
    for (const [x, y, radius] of [
      [-28, -92, 12],
      [31, -39, 13],
      [-31, -42, 8],
    ])
      r.circle(x, y, radius, lilac);
    c.beginPath();
    c.ellipse(0, -63, 82, 17, -0.2, 0, Math.PI * 2);
    c.strokeStyle = brass;
    c.lineWidth = 5;
    c.stroke();
    r.line([-27, -70, -18, -64, -9, -70], ink, 3);
    if (happy) {
      r.circle(19, -68, 9, cream);
      r.circle(20, -67, 3.5, ink);
    } else r.line([9, -70, 18, -64, 27, -70], ink, 3);
    r.line([-8, -46, 8, -46], ink, 3);
    if (happy) {
      caption("FIVE MORE GEOLOGICAL MINUTES", 0, 24, 14);
      plaque(0, -179, 203, 39);
      label("LATE CHECKOUT", 0, -159, 18);
    }
  } else if (kind === "honeymoonnook") {
    r.round(-248, -164, 188, 183, 16, blue, wood);
    r.round(69, -164, 188, 183, 16, green, wood);
    r.line([-235, -7, -185, -106, -145, -47, -83, -135], cream, 18);
    for (const [x, y] of [
      [112, -107],
      [218, -92],
      [158, -130],
    ]) {
      r.line([x, -7, x, y], teal, 5);
      r.circle(x, y, 13, coral);
    }
    // The actual wedding guests are reused once; both turn toward the shared view.
    r.prop("rill", -166, 35, 0.76, happy, motion);
    r.prop("moss", 168, 35, 0.76, happy, motion);
    r.round(-57, -176, 114, 87, 11, wood, brass);
    r.round(-48, -167, 96, 70, 7, blue);
    sun(13, -141, 0.42);
    r.line([-39, -111, -10, -124, 38, -109], green, 12);
    if (happy) caption("OUR SHARED WINDOW", 0, 41, 15);
  } else if (kind === "preschoolseminar") {
    // Two original adult dinosaurs and one hatchling; no generic replacement cast.
    r.prop("principal", -178, -31, 0.58, false, motion);
    r.prop("diplodocus", 90, -16, 0.43, false, motion);
    for (const [x, y, width] of [
      [-201, -7, 135],
      [49, 5, 161],
    ]) {
      r.round(x, y, width, 29, 8, plum, wood);
      if (happy)
        for (const dx of [12, 40, 68, 96])
          r.line([x + dx, y + 5, x + dx, y + 24], cream, 3);
    }
    at(-58, 22, 0.67, () => yesterday(happy));
    r.prop("ankylosaur", 197, 33, 0.48, true, motion);
    at(2, -105, 0.84, () => bell(happy));
    if (happy) {
      // Sleep masks cover the adult eyes, while hatchlings remain awake.
      r.round(-193, -84, 31, 13, 5, lilac, ink);
      r.line([-187, -78, -172, -78], ink, 2);
      r.round(88, -96, 27, 12, 5, lilac, ink);
      r.line([94, -90, 108, -90], ink, 2);
      plaque(-62, 36, 225, 40);
      label("TEMPORARY HEAD TEACHER", -62, 56, 13);
      caption("QUIET TIME FOR THE GROWN-UPS", 0, -211, 14);
    }
  } else if (kind === "linenfort") {
    if (happy) {
      r.line([-125, 43, -98, -100, 21, -140, 139, -101, 152, 43], wood, 6);
      for (const [x, width, color] of [
        [-121, 99, blue],
        [-22, 99, cream],
        [77, 70, lilac],
      ] as const) {
        c.beginPath();
        c.moveTo(x, 38);
        c.lineTo(x + 8, -93);
        c.lineTo(x + width, -120);
        c.lineTo(x + width, 39);
        c.closePath();
        c.fillStyle = color;
        c.fill();
        c.strokeStyle = brass;
        c.lineWidth = 2;
        c.stroke();
      }
      r.round(-18, -48, 87, 89, 31, plum);
      ghost(25, 12, 0.83);
      caption("KNOCK SOFTLY. WE CAN WAIT.", 0, -170, 14);
    } else {
      for (const [x, y] of [
        [-180, 38],
        [-10, -42],
        [160, -122],
      ])
        at(x, y, 1, parcel);
      ghost(70, 40, 0.8);
    }
    at(245, 20, 0.65, () => yesterday(happy));
  } else if (kind === "balconytrain") {
    r.round(-204, -81, 410, 111, 10, "#b9d1dc66", wood);
    r.prop("myceliumcarriage", -29, 25, 0.82, false, motion);
    r.prop("gillsconductor", 181, 25, 0.68, true, motion);
    r.line([-218, 51, 229, 51], brass, 7);
    for (const x of [-204, -128, -52, 24, 100, 176, 224])
      r.line([x, 51, x, 99], wood, 5);
    at(-190, 88, 0.65, () => yesterday(happy));
    plaque(5, -160, 131, 78);
    label("BALCONY SERVICE", 5, -140, 13);
    if (happy) {
      label("CURTAINS FIRST", 5, -114, 14);
      label("HAPPY TO WAIT", 5, -95, 12);
    } else label("TOUR AVAILABLE", 5, -109, 13);
  } else if (kind === "aquariumcabin") {
    // Every window, fish, and badge shares the one real follow transform.
    // In particular there is no time-based translation or bobbing in this branch.
    r.round(-235, -98, 470, 216, 17, wood, brass);
    r.round(-225, -91, 450, 28, 8, cream);
    label("THE AQUARIUM LIFT", 0, -77, 16);
    for (const [i, x] of [-150, 0, 150].entries()) {
      r.round(x - 50, -67.5, 100, 90, 8, blue, brass);
      const colors = [coral, brass, teal];
      oval(x, -23, 28, 19, colors[i]!);
      c.beginPath();
      c.moveTo(x - 24, -24);
      c.lineTo(x - 43, -39);
      c.lineTo(x - 43, -8);
      c.closePath();
      c.fillStyle = colors[i]!;
      c.fill();
      r.circle(x + 12, -28, 5, cream);
      r.circle(x + 14, -28, 2.5, ink);
      r.line([x + 13, -15, x + 21, -17], ink, 2);
      r.line(
        [x, -5, x + 10, happy ? -1 : 4, x + 28, happy ? -15 : 6],
        colors[i]!,
        5,
      );
      for (const dx of [-31, 29]) r.line([x + dx, 16, x + dx + 5, 3], green, 3);
    }
    r.line([-214, 38, 214, 38], brass, 3);
    plaque(0, 57.5, 110, 60);
    label(happy ? "WE CAN" : "SERVICE", 0, 78, 14);
    label(happy ? "WAIT" : "BADGE", 0, 99, 15);
  } else if (kind === "slipperlounge") {
    chair(-188, 17, 102);
    chair(195, 15, 74);
    r.round(-233, -102, 91, 107, 25, blue, ink);
    r.round(-236, -158, 96, 81, 26, cream, wood);
    r.face(-187, -119, 1.08, true);
    r.line([-226, -69, -253, -32], blue, 16);
    r.line([-150, -69, -119, -38], blue, 16);
    sun(195, -87, 0.89, false);
    at(9, -7, 0.74, () => yesterday(happy));
    if (happy) {
      r.round(55, 24, 100, 37, 16, lilac, brass);
      r.line([67, 43, 142, 43], cream, 3);
      caption("SIZED FOR NOBODY IN PARTICULAR", 0, -207, 14);
    }
  } else if (kind === "tuesdayguest") {
    r.round(98, -89, 80, 98, 18, lilac, ink);
    r.circle(138, -111, 34, cream);
    r.face(138, -112, 0.95, true);
    r.line([105, -68, 69, -39], lilac, 10);
    r.line([168, -68, 191, -38], lilac, 10);
    r.line([116, 8, 106, 28], ink, 6);
    r.line([159, 8, 170, 28], ink, 6);
    plaque(-20, -163, 140, 85);
    label(happy ? "WELCOME" : "DEPARTURE", -20, -138, 17);
    label(happy ? "ANYWAY" : "NEXT TUESDAY", -20, -111, 15);
    plaque(-47, -5, 165, 67);
    label(happy ? "WELCOME ANYWAY" : "NOT CHECKED IN", -47, 18, 13);
    if (happy) {
      heart(-47, 44, 0.6);
      caption("HAVE YOU EATEN?", 132, 56, 14);
    }
  } else if (kind === "tributaryguests") {
    for (const [i, x] of [-200, 0, 200].entries()) {
      const color = [coral, plum, teal][i]!;
      r.round(x - 28, -19, 56, 63, 15, color, ink);
      r.circle(x, -42, 27, cream);
      if (i === 0) {
        r.circle(x - 20, -65, 11, coral);
        r.circle(x + 20, -65, 11, coral);
      }
      if (i === 1) r.round(x - 20, -78, 40, 11, 5, brass, ink);
      if (i === 2) r.line([x - 16, -67, x - 24, -82, x - 27, -67], teal, 4);
      r.face(x, -44, 0.78, happy);
      // Hands toast at the one real cup's actual handle; cup and water never split.
      r.line(
        [
          x + 22,
          0,
          x + 49,
          happy ? 31 : 42,
          x + (happy ? 80 : 48),
          happy ? 71 : 51,
        ],
        color,
        9,
      );
      r.circle(x + (happy ? 80 : 48), happy ? 71 : 51, 5, cream);
      r.line([x - 22, 0, x - 42, 40], color, 9);
    }
    if (happy) caption("TO THE RIGHT ROOM", 0, -115, 15);
  } else if (kind === "guestcoat") {
    if (happy) chair(0, 7, 112);
    c.beginPath();
    c.moveTo(-21, -108);
    c.lineTo(-57, -85);
    c.lineTo(-86, -20);
    c.lineTo(-63, -8);
    c.lineTo(-35, -58);
    c.lineTo(-41, 16);
    c.lineTo(43, 16);
    c.lineTo(36, -59);
    c.lineTo(62, -12);
    c.lineTo(85, -23);
    c.lineTo(55, -87);
    c.lineTo(21, -108);
    c.closePath();
    c.fillStyle = tint ?? plum;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 3;
    c.stroke();
    r.line([-19, -102, 0, -73, 20, -102], cream, 5);
    r.line([0, -68, 0, 12], brass, 2);
    for (const y of [-52, -32, -12]) r.circle(8, y, 3, brass);
    // The empty collar remains a coat, not an invented invisible person's face.
    oval(0, -105, 21, 11, ink);
    if (happy) {
      heart(-23, -59, 0.55);
      caption("A PLACE FOR YOU", 0, 64, 15);
    }
  } else if (kind === "nightdesk") {
    plaque(-135, -214, 104, 80);
    r.round(-162, -197, 54, 43, 9, plum, wood);
    r.line([-154, -156, -154, -142, -116, -142, -116, -156], wood, 4);
    at(-155, -25, 0.88, () => between(happy));
    at(195, -45, 0.8, () => yesterday(happy));
    r.round(113, -25, 213, 25, 8, wood, brass);
    r.round(127, 0, 185, 43, 8, plum, brass);
    if (happy) {
      label("DESK", 176, 13, 14, cream);
      label("COVERED", 176, 31, 13, cream);
    } else label("RECEPTION", 176, 21, 13, cream);
    r.round(203, 46, 64, 9, 5, wood, ink);
    r.line([235, 47, 235, 14], wood, 5);
    r.round(216, 2, 38, 27, 8, happy ? brass : lilac, ink);
    if (happy) caption("SIX ARMS. ZERO TASKS.", -145, -253, 16);
  } else if (kind === "returningkeys") {
    cloud(-165, -70, 0.7);
    r.circle(0, -74, 35, blue);
    r.circle(-14, -88, 7, lilac);
    r.face(0, -76, 0.84, true);
    ghost(210, -40, 0.86);
    at(-24, 39, 0.76, () => yesterday(false));
    // The actual frozen ghost clasp sits above its guest, not over their face.
    r.round(175, -174, 78, 65, 8, brass, wood);
    r.round(192, -163, 43, 39, 5, cream, wood);
    r.line([212, -159, 212, -129], wood, 5);
    if (happy) {
      for (const x of [-165, 0, 210]) key(x + 45, -22, 0.7);
      caption("HELLO, YESTERDAY", 0, -237, 18);
    }
  } else if (kind === "hotelrouteboard") {
    plaque(0, -80, 260, 80);
    label(happy ? "UNTIL NEXT TIME" : "DEPARTURES", 0, -56, 21);
    label(
      happy ? "LEAVE A LITTLE ROOM FOR US" : "TUESDAY · WEDNESDAY · ELSEWHERE",
      0,
      -27,
      12,
    );
  } else if (kind === "hotelpanorama") {
    // Two hotel staff and three remembered guests, each appearing exactly once.
    at(-208, -37, 0.75, () => between(false));
    at(-15, -23, 0.8, () => yesterday(false));
    cloud(181, -115, 0.69);
    r.circle(81, -137, 31, blue);
    r.circle(69, -146, 6, lilac);
    r.face(81, -138, 0.74, happy);
    ghost(278, -31, 0.83);
    r.round(-276, 3, 605, 23, 9, wood, brass);
    r.line([-255, 24, -255, 51], wood, 6);
    r.line([305, 24, 305, 51], wood, 6);
    if (happy) {
      // A wave is a bounded final pose, not another actor or departure mechanic.
      r.line([200, -112, 225, -139, 225, -155], blue, 7);
      r.line([295, -52, 320, -73, 320, -92], cream, 7);
    }
  } else return false;
  return true;
}
