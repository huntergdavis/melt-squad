import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Local illustrations only. Water, syrup channels and breakfast pulse gates
// belong to the real scene engine; the diner never invents their progress.
export function drawDiner(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
  _progress?: number,
): boolean {
  const c = r.ctx;
  const ink = "#42475d";
  const cream = "#fff0cf";
  const chrome = "#c3d4d0";
  const teal = "#75a5a2";
  const coral = "#db8e85";
  const toast = "#c78b58";
  const butter = "#f1cc70";
  const lilac = "#b6a5c8";
  const night = "#59617f";
  const green = "#9cb98b";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;
  const text = (s: string, x: number, y: number, size = 15, color = ink) => {
    c.font = `bold ${size}px system-ui`;
    c.fillStyle = color;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(s, x, y);
  };
  const at = (x: number, y: number, scale: number, draw: () => void) => {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    draw();
    c.restore();
  };
  const oval = (
    x: number,
    y: number,
    rx: number,
    ry: number,
    color: string,
  ) => {
    c.beginPath();
    c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    c.fillStyle = color;
    c.fill();
  };
  const star = (x: number, y: number, size = 8, color = butter) => {
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 ? size * 0.43 : size;
      const px = x + Math.cos(a) * radius;
      const py = y + Math.sin(a) * radius;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.closePath();
    c.fillStyle = color;
    c.fill();
  };
  const leaf = (x: number, y: number, scale = 1, color = green) => {
    c.beginPath();
    c.moveTo(x, y + 8 * scale);
    c.quadraticCurveTo(
      x - 24 * scale,
      y - 8 * scale,
      x - 3 * scale,
      y - 28 * scale,
    );
    c.quadraticCurveTo(x + 23 * scale, y - 12 * scale, x, y + 8 * scale);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    r.line([x, y + 5 * scale, x - 2 * scale, y - 20 * scale], cream, 1.6);
  };
  const card = (x: number, y: number, w: number, h: number, color = cream) => {
    r.round(x - w / 2, y, w, h, 9, chrome, ink);
    r.round(x - w / 2 + 6, y + 6, w - 12, h - 12, 5, color);
    r.circle(x - w / 2 + 12, y + 12, 2, ink);
    r.circle(x + w / 2 - 12, y + 12, 2, ink);
  };
  const stool = (x: number, y: number, width = 48, color = coral) => {
    r.line([x - width * 0.3, y + 4, x - width * 0.36, y + 33], chrome, 7);
    r.line([x + width * 0.3, y + 4, x + width * 0.36, y + 33], chrome, 7);
    r.line([x - width * 0.31, y + 21, x + width * 0.31, y + 21], ink, 3);
    r.round(x - width / 2, y - 6, width, 13, 6, color, ink);
  };
  const cup = (x: number, y: number, scale = 1, color = cream) => {
    at(x, y, scale, () => {
      c.beginPath();
      c.arc(18, -18, 13, -Math.PI / 2, Math.PI / 2);
      c.strokeStyle = chrome;
      c.lineWidth = 6;
      c.stroke();
      r.round(-21, -36, 42, 38, 9, color, ink);
      oval(0, -34, 19, 4, chrome);
      r.line([-12, -23, -12, -8], "#ffffff99", 3);
    });
  };
  const plate = (x: number, y: number, radius = 35) => {
    oval(x, y, radius, radius * 0.3, chrome);
    oval(x, y - 2, radius - 5, radius * 0.21, cream);
  };
  const pancake = (x: number, y: number, radius = 31) => {
    oval(x, y, radius, radius * 0.27, toast);
    oval(x, y - 5, radius, radius * 0.29, butter);
    oval(x - 3, y - 6, radius * 0.77, radius * 0.22, "#ebbd7a");
  };
  const miso = (pose: "idle" | "serve" | "pat" | "seated" = "idle") => {
    // Eight separate roots and eight separate tips: no hidden ninth serving arm.
    const ends: readonly (readonly [number, number])[] = [
      [-72, happy ? -42 : -20],
      [-61, 2],
      [-40, 20],
      [-14, 24],
      [14, 24],
      [40, 20],
      [61, 2],
      [
        happy && pose === "pat" ? 162 : happy && pose === "serve" ? 62 : 72,
        happy && pose === "pat"
          ? -76
          : happy && pose === "serve"
            ? 25
            : happy
              ? -43
              : -20,
      ],
    ];
    if (pose === "seated") {
      r.round(-51, -60, 102, 73, 15, teal, ink);
      r.round(-43, -53, 86, 56, 11, chrome);
      stool(0, 5, 88, teal);
    }
    ends.forEach(([x, y], i) => {
      const rootX = -28 + i * 8;
      c.beginPath();
      c.moveTo(rootX, -25);
      c.bezierCurveTo(rootX * 1.7, -9, x * 0.85, y + 15, x, y);
      c.strokeStyle = tint ?? coral;
      c.lineWidth = 13;
      c.lineCap = "round";
      c.stroke();
      r.circle(x, y, 6.5, tint ?? coral);
      r.circle(x * 0.91, y + 3, 2.7, cream);
    });
    oval(0, -65, 39, 43, tint ?? coral);
    r.round(-26, -38, 52, 38, 10, cream, ink);
    r.line([-24, -33, 0, -15, 24, -33], teal, 3);
    r.round(-12, -17, 24, 12, 3, teal);
    r.face(0, -69, 1.02, true);
    r.round(-28, -111, 56, 15, 4, cream, ink);
    for (const [x, y, radius] of [
      [-22, -115, 13],
      [0, -120, 17],
      [22, -115, 13],
    ]) {
      r.circle(x, y, radius, cream);
    }
    r.line([-22, -106, 22, -106], teal, 2);
  };
  const mallow = (triangle = false, seated = false) => {
    if (seated) stool(0, 0, 63, lilac);
    r.line([-19, 5, -28, 18, -14, 18], toast, 6);
    r.line([19, 5, 28, 18, 14, 18], toast, 6);
    r.round(-47, -39, 94, 45, 21, toast, ink);
    r.round(-46, -45, 92, 36, 19, "#efc689", ink);
    r.line([-35, -6, 34, -6], cream, 3);
    r.face(0, -28, 0.91, true);
    r.line([-45, -20, -58, -12], toast, 6);
    r.line(
      [
        45,
        -21,
        58,
        happy ? -44 + Math.sin(motion * 1.4) * 1.2 : -11,
        38,
        happy ? -52 : -8,
      ],
      toast,
      6,
    );
    if (triangle) {
      c.beginPath();
      c.moveTo(-17, -46);
      c.lineTo(15, -46);
      c.lineTo(5, -67);
      c.closePath();
      c.fillStyle = butter;
      c.fill();
      c.strokeStyle = toast;
      c.lineWidth = 2;
      c.stroke();
    } else {
      r.round(-17, -59, 34, 14, 3, butter, toast);
      r.line([-10, -55, 8, -55], cream, 2);
    }
    if (happy && !triangle) {
      r.round(-40, -3, 80, 16, 4, teal);
      text("HOST", 0, 5, 12, cream);
    }
  };
  const zip = (mug = true, seated = false, receive = false) => {
    if (seated) stool(0, 2, 62, teal);
    c.beginPath();
    c.moveTo(-24, -78);
    c.quadraticCurveTo(-61, -104, -40, -135);
    c.quadraticCurveTo(-28, -102, 5, -111);
    c.quadraticCurveTo(30, -89, 25, -63);
    c.closePath();
    c.fillStyle = butter;
    c.fill();
    r.line([-35, -114, -23, -95], coral, 4);
    r.round(-29, -47, 58, 54, 17, tint ?? teal, ink);
    r.line([-14, 4, -20, 22, -4, 22], ink, 6);
    r.line([14, 4, 20, 22, 5, 22], ink, 6);
    r.circle(0, -66, 32, butter);
    r.face(0, -69, 0.9, true);
    r.round(-28, -45, 56, 12, 4, lilac, ink);
    r.round(-23, -35, 14, 29, 3, lilac, ink);
    r.line(
      [
        -28,
        -25,
        receive && happy ? -37 : -48,
        receive && happy ? 10 : happy ? -50 : -13,
      ],
      butter,
      8,
    );
    r.line([28, -25, 47, mug && happy ? -49 : -10], butter, 8);
    if (mug) cup(48, happy ? -41 : 0, 0.57);
  };
  const traveler = (x: number, y: number, scale: number, variant: number) => {
    at(x, y, scale, () => {
      const colors = [chrome, butter, lilac, green, coral];
      const color = colors[variant % colors.length]!;
      r.round(-26, -45, 52, 49, 13, color, ink);
      r.line([-15, 2, -20, 15], ink, 5);
      r.line([15, 2, 20, 15], ink, 5);
      if (variant === 1) {
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          r.line(
            [
              Math.cos(angle) * 25,
              -67 + Math.sin(angle) * 25,
              Math.cos(angle) * 37,
              -67 + Math.sin(angle) * 37,
            ],
            butter,
            5,
          );
        }
      }
      r.circle(0, -66, 27, color);
      if (variant === 0) {
        c.beginPath();
        c.arc(0, -66, 29, Math.PI, Math.PI * 2);
        c.strokeStyle = cream;
        c.lineWidth = 10;
        c.stroke();
        r.round(-27, -45, 54, 10, 4, teal);
      }
      if (variant === 2) {
        r.line([-22, -87, -34, -105, -10, -91], lilac, 5);
        r.line([22, -87, 34, -105, 10, -91], lilac, 5);
      }
      if (variant === 3) leaf(0, -96, 0.7);
      if (variant === 4) r.round(-31, -96, 62, 11, 4, teal, ink);
      r.face(0, -69, 0.75, true);
      r.line([-24, -29, -37, happy ? -48 : -13], color, 6);
      r.line([24, -29, 37, happy ? -43 : -13], color, 6);
    });
  };
  const truck = () => {
    r.round(-113, -90, 149, 83, 15, chrome, ink);
    r.round(20, -63, 94, 57, 13, tint ?? teal, ink);
    r.round(46, -55, 53, 29, 8, night, ink);
    r.line([54, -48, 75, -48], chrome, 3);
    r.round(-95, -74, 111, 40, 7, night, ink);
    star(-57, -54, 12);
    r.line([-83, -53, -70, -53], cream, 3);
    r.line([-80, -42, -66, -42], cream, 3);
    for (const x of [-69, 73]) {
      r.circle(x, -4, 19, ink);
      r.circle(x, -4, 10, chrome);
      r.circle(x, -4, 4, teal);
    }
    r.round(108, -24, 10, 10, 3, butter);
    text("ZIP", -38, -19, 13);
  };

  if (kind === "misocook") miso();
  else if (kind === "mallowhost") mallow();
  else if (kind === "ziphauler") zip();
  else if (kind === "mallowtriangle") mallow(happy);
  else if (kind === "comettruck") truck();
  else if (kind === "dineropen") {
    card(0, -91, 280, 100, happy ? night : chrome);
    text("OPEN", 0, -55, 39, happy ? butter : ink);
    if (happy) text("UNDER NEW TEMPERATURE", 0, -15, 16, cream);
    else r.line([-110, -13, 110, -13], teal, 3);
  } else if (kind === "dinermug") {
    // Physical140×70 basin: top−52.5, bottom17.5. No painted liquid.
    c.beginPath();
    c.arc(68, -20, 24, -Math.PI / 2, Math.PI / 2);
    c.strokeStyle = ink;
    c.lineWidth = 11;
    c.stroke();
    c.beginPath();
    c.arc(68, -20, 24, -Math.PI / 2, Math.PI / 2);
    c.strokeStyle = chrome;
    c.lineWidth = 7;
    c.stroke();
    r.round(-70, -52.5, 140, 70, 14, tint ?? cream, ink);
    oval(0, -52.5, 70, 8, chrome);
    r.line([-60, -37, -60, 1], "#ffffff99", 4);
    r.line([-49, 10, 46, 10], teal, 3);
  } else if (kind === "mugservice") {
    // Author anchor340,400 at.8: Miso touches the ONE real cup at270,425;
    // Zip receives its real handle at431,423. No second illustrated mug.
    at(-140, 10, 0.85, () => miso("serve"));
    at(145, 20, 0.85, () => zip(false, false, true));
    if (happy) {
      text("BREAKFAST HOST", 0, -142, 18, cream);
    }
  } else if (kind === "restingtravelers") {
    at(-65, -9, 0.83, () => zip(false, happy));
    at(91, -8, 0.94, () => mallow(false, happy));
    card(0, -169, 306, 34);
    text(happy ? "TAKE THE TIME YOU NEED" : "QUICK STOP", 0, -151, 17);
  } else if (kind === "dinerjukebox") {
    r.round(-75, -157, 150, 173, 48, coral, ink);
    r.round(-62, -144, 124, 143, 38, cream, ink);
    r.round(-47, -125, 94, 70, 28, night, ink);
    r.circle(-8, -90, 23, chrome);
    r.face(-10, -93, 0.55, false);
    r.line([11, -82, 28, -98, 38, -81, 21, -81], butter, 2.7);
    r.line([24, -94, 35, -106], cream, 2);
    for (let i = 0; i < 4; i++) r.round(-39, -39 + i * 10, 78, 4, 2, teal);
    if (happy) {
      for (const [x, y] of [
        [-95, -76],
        [96, -106],
        [100, -49],
      ]) {
        r.line([x, y, x, y - 24, x + 12, y - 19], butter, 4);
        oval(x - 4, y, 7, 5, butter);
      }
    }
  } else if (kind === "travelerbreakfasts") {
    traveler(-103, -14, 0.92, 0);
    traveler(108, -14, 0.92, 1);
    r.round(-167, -19, 334, 17, 7, chrome, ink);
    if (happy) {
      plate(-100, -21, 36);
      r.round(-122, -45, 43, 22, 6, lilac, cream);
      star(-101, -34, 7, cream);
      plate(105, -21, 39);
      for (const x of [86, 101, 116])
        r.line([x, -26, x + 7, -39, x + 12, -26], toast, 4);
      at(-31, -63, 1, () => {
        r.round(-23, -16, 46, 32, 3, cream, teal);
        star(-6, 0, 9);
        r.line([6, -6, 16, -6, 6, 3, 16, 3], lilac, 2);
      });
      at(34, -63, 1, () => {
        r.round(-23, -16, 46, 32, 3, cream, teal);
        r.line([-16, 8, -5, -9, 3, 8], chrome, 4);
        r.line([8, -6, 17, -6, 8, 3, 17, 3], coral, 2);
      });
    }
  } else if (kind === "breakfastchart") {
    card(0, -126, 286, 138, night);
    for (const [x, y] of [
      [-111, -93],
      [-40, -108],
      [92, -98],
      [112, -24],
    ])
      star(x, y, 4, chrome);
    if (happy) {
      r.line([-102, -66, -57, -35, 0, -60, 64, -40, 111, -75], lilac, 2);
      at(-88, -56, 0.52, () => cup(0, 0));
      pancake(0, -61, 42);
      r.circle(-11, -64, 2.8, ink);
      r.circle(9, -64, 2.8, ink);
      r.line([70, -70, 61, -49, 86, -56], butter, 5);
      text("PANCAKE: CELESTIAL ENOUGH", 0, -6, 13, cream);
    }
  } else if (kind === "dishpat") {
    at(-108, -8, 0.9, () => miso(happy ? "pat" : "idle"));
    at(38, -17, 1, () => mallow());
    r.round(99, -22, 72, 43, 7, chrome, ink);
    for (let i = 0; i < 3; i++) {
      const px = happy ? 135 : 111 + i * 23;
      const py = happy ? -28 - i * 7 : -38;
      if (happy) plate(px, py, 29);
      else {
        oval(px, py, 12, 30, cream);
        r.line([px - 4, py - 14, px + 5, py - 3, px - 2, py + 13], toast, 3);
      }
    }
  } else if (kind === "scarfmoonpie") {
    plate(0, 7, 66);
    r.round(-54, -54, 108, 58, 26, toast, ink);
    r.round(-51, -58, 102, 49, 24, cream, ink);
    r.face(0, -37, 0.9, true);
    if (happy) {
      r.line([-94, -96, 0, -81, 94, -96], ink, 2);
      for (let i = 0; i < 7; i++) {
        const x = -73 + i * 24;
        c.beginPath();
        c.moveTo(x - 10, -92 + (1 - Math.abs(x) / 90) * 12);
        c.lineTo(x + 10, -92 + (1 - Math.abs(x) / 90) * 12);
        c.lineTo(x, -65 + (1 - Math.abs(x) / 90) * 12);
        c.closePath();
        c.fillStyle = i % 2 ? lilac : teal;
        c.fill();
      }
    } else {
      r.round(-51, -14, 102, 12, 4, lilac, ink);
      r.round(31, -8, 15, 32, 3, lilac, ink);
    }
  } else if (kind === "cavesalt") {
    r.round(-31, -76, 62, 86, 12, chrome, ink);
    r.round(-28, -57, 56, 64, 10, cream);
    r.round(-34, -84, 68, 23, 8, teal, ink);
    for (const x of [-17, 0, 17]) r.circle(x, -75, 2.5, ink);
    if (happy) {
      text("SALT", 0, -26, 17);
      for (const [x, y] of [
        [-15, -46],
        [13, -39],
        [-9, -8],
      ])
        star(x, y, 4, chrome);
    }
  } else if (kind === "cavespoons") {
    r.round(-42, -19, 84, 20, 6, toast, ink);
    for (const [x, top] of [
      [-23, -64],
      [0, -79],
      [23, -54],
    ]) {
      r.line([x, top + 13, x, -4], chrome, 7);
      oval(x, top, 10, 16, chrome);
      oval(x - 2, top - 3, 4, 10, cream);
    }
    if (happy) text("SPOONS", 0, -8, 13, cream);
  } else if (kind === "thankyoupebble") {
    if (happy) {
      stool(0, -1, 58, coral);
      r.round(-40, -89, 80, 26, 5, cream, ink);
      text("BEST SEAT", 0, -75, 13);
    } else r.round(-40, -4, 80, 18, 6, cream, toast);
    oval(0, -27, 27, 21, chrome);
    r.face(0, -32, 0.53, true);
    r.line([-14, -15, -2, -9, 13, -16], teal, 2);
    if (happy) text("THANK YOU", 0, 46, 14);
  } else if (kind === "herbawning") {
    r.line([-111, 14, -111, -120, 111, -120, 111, 14], chrome, 7);
    r.line([-109, -117, 109, -117], teal, 12);
    if (happy) {
      for (let i = 0; i < 9; i++)
        leaf(-98 + i * 24, -101, 0.72, i % 2 ? green : teal);
      for (const x of [-99, 99]) {
        r.line([x, 4, x - 6, -57, x, -102], green, 4);
        leaf(x - 6, -36, 0.7);
      }
      oval(0, -34, 25, 16, green);
      r.line([-31, -26, 29, -43], cream, 3);
      text("A LITTLE LIKE HOME", 0, 5, 15);
    }
  } else if (kind === "regularstable") {
    if (happy) {
      [-190, -78, 78, 190].forEach((x, i) => {
        stool(x, -6, i % 2 ? 54 : 64, i % 2 ? teal : lilac);
        traveler(x, -14, 0.77, i);
      });
    }
    r.round(-246, -18, 492, 23, 8, chrome, ink);
    r.line([-205, 5, -205, 29], ink, 8);
    r.line([205, 5, 205, 29], ink, 8);
    card(0, -162, 368, 39);
    if (happy) text("ANYONE WHO CALLS THIS THEIR USUAL", 0, -142, 15);
    else text("RESERVATION", 0, -142, 18);
  } else if (kind === "truckdiagnostic") {
    at(-24, 0, 0.9, truck);
    card(0, -154, 278, 38);
    text(happy ? "READY, WHENEVER YOU ARE" : "TAKE A LOOK", 0, -134, 16);
    if (happy) {
      r.circle(117, -33, 17, teal);
      r.line([107, -34, 114, -26, 128, -43], cream, 4);
    }
  } else if (kind === "counterconversation") {
    // Five customers, no duplicate mugs: the actual five basin props own cups.
    const positions = happy
      ? [-193, -99, 0, 99, 193]
      : [-235, -118, 0, 118, 235];
    positions.forEach((x, i) => traveler(x, 0, 0.75, i));
    if (happy) {
      for (const [x, y, color] of [
        [-130, -116, lilac],
        [6, -111, coral],
        [139, -118, teal],
      ] as const) {
        r.round(x - 31, y, 62, 30, 14, cream, color);
        star(x, y + 15, 9, color);
      }
    }
  } else if (kind === "pancakeroute") {
    // One physical140×60 basin, opening−45 and bottom15. Syrup is real water.
    plate(0, 18, 79);
    r.round(-70, -45, 140, 60, 15, toast, ink);
    r.line([-65, -8, 65, -8], cream, 3);
    r.line([-65, 3, 65, 3], butter, 3);
    oval(0, -45, 70, 9, "#efc689");
    if (happy) {
      r.circle(-10, 6, 2, ink);
      r.circle(10, 6, 2, ink);
      r.line([-5, 10, 0, 12, 5, 10], ink, 2);
    }
  } else if (kind === "tastingtray") {
    r.round(-181, -13, 362, 28, 11, chrome, ink);
    r.line([-176, -1, -202, -1], chrome, 7);
    r.line([176, -1, 202, -1], chrome, 7);
    if (happy) {
      plate(-118, -16, 46);
      r.round(-146, -51, 56, 35, 8, lilac, cream);
      star(-118, -36, 8, cream);
      plate(0, -16, 46);
      for (let i = 0; i < 5; i++)
        r.line(
          [-30, -22 - i * 4, -15, -34 - i * 3, 8, -23 - i * 4, 28, -33 - i * 2],
          butter,
          3,
        );
      plate(119, -16, 46);
      pancake(119, -24, 35);
      for (const x of [104, 118, 132]) leaf(x, -42, 0.45, coral);
      text("COOL", -118, 0, 13);
      text("WARM", 0, 0, 13);
      text("SUNNY", 119, 0, 13);
    }
  } else if (kind === "smallestorder") {
    card(0, -104, 278, 117);
    r.round(-120, -87, 240, 23, 4, teal);
    text("ORDER", 0, -75, 17, cream);
    if (happy) {
      text("SOMEWHERE", 0, -41, 24);
      text("TO SIT", 0, -12, 24);
    } else {
      r.line([-97, -40, 97, -40], chrome, 3);
      r.line([-97, -14, 67, -14], chrome, 3);
    }
  } else if (kind === "sittingtogether") {
    if (happy) {
      stool(-67, -7, 58, teal);
      traveler(-67, -15, 0.82, 3);
      at(73, -14, 0.93, () => mallow(false, true));
    } else {
      stool(-67, -7, 58, teal);
      stool(73, -7, 58, lilac);
    }
  } else if (kind === "windowqueue") {
    at(-164, 0, 0.72, truck);
    r.round(-20, -27, 107, 28, 6, toast, ink);
    r.line([78, -23, 107, -61], chrome, 5);
    for (const x of [0, 65]) r.circle(x, 5, 12, ink);
    for (const x of [1, 30, 59]) leaf(x, -35, 0.74);
    traveler(177, 0, 0.91, 2);
    if (happy) {
      at(-124, -48, 0.45, () => zip(false));
      card(0, -157, 273, 37);
      text("WALK-INS WELCOME TOO", 0, -138, 17);
    }
  } else if (kind === "breakfastbeat") {
    // The real three pulse frames are drawn elsewhere, below this cast tableau.
    at(-173, 0, 0.92, () => miso());
    at(0, -3, 1, () => mallow());
    at(167, 0, 0.91, () => zip());
    if (happy) {
      for (const [x, y] of [
        [-175, -157],
        [0, -93],
        [167, -157],
      ]) {
        r.line([x, y, x, y - 21, x + 12, y - 16], butter, 3);
        oval(x - 4, y, 6, 4, butter);
      }
    }
  } else if (kind === "mallowlamp") {
    stool(-12, -1, 69, lilac);
    at(-12, -8, 0.9, () => mallow());
    r.line([67, 22, 67, -134, 11, -134], chrome, 7);
    r.round(42, 18, 48, 9, 4, chrome, ink);
    r.line([11, -134, 11, -119], ink, 3);
    if (happy) {
      oval(11, -104, 44, 32, "#f1cc7038");
      oval(11, -103, 33, 24, butter);
      r.circle(-1, -110, 4, "#e3b869");
      r.circle(24, -100, 6, "#e3b869");
      r.line([-7, -101, -2, -98, 3, -101], toast, 2);
      r.line([13, -101, 18, -98, 23, -101], toast, 2);
      // Beside the base: the built stand remains visible beneath the lamp.
      text("WELCOME", -100, 18, 16);
    } else {
      oval(11, -103, 33, 24, chrome);
      r.line([-9, -102, 31, -102], teal, 2);
    }
  } else if (kind === "dinerguestbook") {
    r.round(-111, -94, 222, 107, 8, coral, ink);
    r.round(-106, -91, 105, 99, 5, cream);
    r.round(1, -91, 105, 99, 5, cream);
    r.line([0, -89, 0, 6], toast, 2);
    if (happy) {
      for (const [i, y] of [-64, -32, -2].entries()) {
        const x = -83 + i * 15;
        r.line([x, y, -33, y + 9, 39, -36, 69, -36], i % 2 ? teal : lilac, 2);
        star(x, y, 5, coral);
      }
      r.round(58, -50, 34, 30, 5, teal, ink);
      text("HERE", 74, -35, 10, cream);
      text("ROUTES BACK", -51, -77, 11);
    }
  } else if (kind === "dinerpanorama") {
    card(0, -231, 528, 45, night);
    text(
      happy ? "SEE YOU NEXT BREAKFAST" : "THERE'S A PLACE FOR YOU",
      0,
      -207,
      23,
      cream,
    );
    if (happy) {
      stool(-241, -14, 58, lilac);
      stool(247, -14, 56, coral);
      traveler(-241, -23, 0.81, 0);
      traveler(247, -23, 0.81, 1);
      at(-130, -15, 0.96, () => mallow(false, true));
      at(137, -14, 0.87, () => zip(false, true));
      at(0, -23, 0.94, () => miso("seated"));
    } else {
      at(-130, -13, 0.96, () => mallow());
      at(137, -14, 0.87, () => zip(false));
      at(0, -23, 0.94, () => miso());
      stool(-241, -14, 58, lilac);
      stool(247, -14, 56, coral);
    }
    r.round(-299, -16, 598, 26, 11, chrome, ink);
    r.line([-262, 10, -262, 28], ink, 8);
    r.line([262, 10, 262, 28], ink, 8);
    if (happy) {
      for (const x of [-210, 0, 211]) {
        plate(x, -20, 40);
        pancake(x, -27, 27);
      }
    }
  } else return false;
  return true;
}
