import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Local museum illustrations only. The optical signal and buoyant deck are
// supplied by the real scene engine; Zero never changes water or gravity.
export function drawInstitute(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
  _progress?: number,
): boolean {
  const c = r.ctx;
  const ink = "#495368";
  const paper = "#fff2d9";
  const cream = "#efe0c1";
  const teal = "#79a39b";
  const blue = "#bad4df";
  const lilac = "#b3a7c9";
  const coral = "#d8a399";
  const gold = "#d6b67d";
  const green = "#a9bc8f";
  const wood = "#9e8772";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;
  const label = (
    text: string,
    x: number,
    y: number,
    size = 14,
    color = ink,
  ) => {
    c.fillStyle = color;
    c.font = `bold ${size}px system-ui`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, x, y);
  };
  const leaf = (x: number, y: number, scale = 1, color = green) => {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    c.beginPath();
    c.moveTo(0, 8);
    c.quadraticCurveTo(-25, -10, -5, -31);
    c.quadraticCurveTo(22, -16, 0, 8);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    r.line([0, 6, -4, -24], cream, 1.8);
    c.restore();
  };
  const question = (x: number, y: number, scale: number, color: string) => {
    c.beginPath();
    c.moveTo(x - 17 * scale, y - 19 * scale);
    c.bezierCurveTo(
      x - 14 * scale,
      y - 46 * scale,
      x + 30 * scale,
      y - 45 * scale,
      x + 26 * scale,
      y - 20 * scale,
    );
    c.bezierCurveTo(
      x + 23 * scale,
      y - 5 * scale,
      x + 1 * scale,
      y - 6 * scale,
      x + 1 * scale,
      y + 7 * scale,
    );
    c.strokeStyle = color;
    c.lineWidth = 8 * scale;
    c.lineCap = "round";
    c.stroke();
    r.circle(x + scale, y + 25 * scale, 5 * scale, color);
  };
  const probably = () => {
    c.beginPath();
    c.moveTo(-20, 7);
    c.quadraticCurveTo(-63, 39, -70, 1);
    c.quadraticCurveTo(-46, 21, -24, -3);
    c.closePath();
    c.fillStyle = coral;
    c.fill();
    r.round(-27, 8, 22, 20, 7, teal, ink);
    r.round(5, 8, 22, 20, 7, teal, ink);
    r.round(-32, -51, 64, 66, 17, paper, ink);
    r.circle(0, -75, 35, tint ?? coral);
    for (const side of [-1, 1]) {
      r.line([side * 25, -77, side * 50, -77], coral, 8);
      for (const [i, y] of [-103, -80, -56].entries()) {
        r.line([side * 44, -77, side * (57 + (i === 1 ? 5 : 0)), y], coral, 7);
        r.line(
          [
            side * (57 + (i === 1 ? 5 : 0)),
            y,
            side * (64 + (i === 1 ? 3 : 0)),
            y - 7,
          ],
          cream,
          3,
        );
      }
    }
    r.face(0, -77, 1.09, true);
    r.line([-24, -48, -9, -31, 0, -48, 10, -31, 24, -48], teal, 4);
    r.line([0, -29, 0, 12], gold, 2);
    r.round(-25, -12, 18, 17, 3, blue, teal);
    r.circle(10, -13, 2.5, gold);
    r.circle(10, 0, 2.5, gold);
    r.line([-31, -29, -48, -16, -60, happy ? -39 : -10], coral, 8);
    r.line([31, -31, 48, -8], coral, 8);
    r.line([43, 7, 77, -111], wood, 4);
    r.circle(77, -111, 3.5, gold);
  };
  const margin = () => {
    const lift = happy ? Math.sin(motion * 1.4) * 1.5 : 0;
    c.beginPath();
    c.moveTo(-34, -61);
    c.lineTo(-66 - lift, happy ? -49 : -25);
    c.lineTo(-43, -4);
    c.lineTo(-28, -21);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    c.strokeStyle = gold;
    c.lineWidth = 2;
    c.stroke();
    c.beginPath();
    c.moveTo(33, -61);
    c.lineTo(65 + lift, happy ? -53 : -25);
    c.lineTo(44, -5);
    c.lineTo(27, -23);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    c.stroke();
    r.line([-52, -27, -39, -16], teal, 2);
    r.line([52, -28, 39, -17], teal, 2);
    c.beginPath();
    c.moveTo(-38, -85);
    c.lineTo(13, -110);
    c.lineTo(42, -85);
    c.lineTo(38, -18);
    c.lineTo(0, 3);
    c.lineTo(-38, -18);
    c.closePath();
    c.fillStyle = tint ?? paper;
    c.fill();
    c.strokeStyle = gold;
    c.lineWidth = 2.5;
    c.stroke();
    r.line([-37, -83, 5, -77, 13, -109], lilac, 2);
    r.line([5, -77, 38, -84], lilac, 2);
    r.line([-35, -17, 0, -2, 35, -17], lilac, 2);
    r.face(0, -57, 0.87, true);
    r.line([-16, 0, -23, 23, -5, 16], paper, 6);
    r.line([16, 0, 24, 23, 6, 16], paper, 6);
    r.round(-18, -27, 36, 16, 3, teal);
    r.line([-11, -19, 11, -19], cream, 2);
  };
  const zero = () => {
    r.line([-17, -9, -24, 12], ink, 6);
    r.line([17, -9, 24, 12], ink, 6);
    c.beginPath();
    c.ellipse(0, -59, 43, 48, 0, 0, Math.PI * 2);
    c.fillStyle = tint ?? ink;
    c.fill();
    c.strokeStyle = lilac;
    c.lineWidth = 9;
    c.stroke();
    c.beginPath();
    c.ellipse(0, -59, 49, 54, 0, 0, Math.PI * 2);
    c.strokeStyle = paper;
    c.lineWidth = 2.5;
    c.stroke();
    r.circle(-12, -63, 4, paper);
    r.circle(12, -63, 4, paper);
    c.beginPath();
    c.arc(0, -48, 10, 0, Math.PI);
    c.strokeStyle = paper;
    c.lineWidth = 3;
    c.stroke();
    r.line([-42, -46, -58, happy ? -58 : -29], lilac, 5);
    r.line([42, -46, 58, happy ? -64 : -28], lilac, 5);
    if (happy) {
      r.line([23, -20, 19, 6], gold, 8);
      r.line([33, -20, 40, 4], coral, 8);
      r.circle(28, -23, 12, gold);
      r.circle(28, -23, 7, paper);
      r.circle(28, -23, 3, teal);
    }
  };
  const frame = (color = paper) => {
    r.round(-86, -130, 172, 145, 9, wood, ink);
    r.round(-78, -122, 156, 129, 6, color, gold);
  };
  const biscuit = (x: number, y: number, scale = 1) => {
    r.circle(x, y, 25 * scale, gold);
    r.circle(x, y, 20 * scale, cream);
    for (const [dx, dy] of [
      [-9, -8],
      [7, -11],
      [-11, 8],
      [9, 7],
      [0, 0],
    ])
      r.circle(x + dx * scale, y + dy * scale, 2 * scale, wood);
  };
  const pot = () => {
    c.beginPath();
    c.moveTo(-37, -28);
    c.lineTo(-29, 23);
    c.lineTo(29, 23);
    c.lineTo(37, -28);
    c.closePath();
    c.fillStyle = coral;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.round(-42, -33, 84, 14, 5, gold, wood);
  };
  const stool = (x: number, y: number, width: number) => {
    r.round(x - width / 2, y - 13, width, 17, 5, teal, gold);
    r.line([x - width * 0.34, y + 2, x - width * 0.4, y + 30], wood, 7);
    r.line([x + width * 0.34, y + 2, x + width * 0.4, y + 30], wood, 7);
  };

  if (kind === "drprobably") probably();
  else if (kind === "marginassistant") margin();
  else if (kind === "zeroexhibit") zero();
  else if (kind === "welcomeplaque") {
    r.round(-150, -90, 300, 90, 10, paper, gold);
    label("WE THINK", 0, -62, 25, teal);
    label("YOU'LL LIKE THIS", 0, -29, 23, teal);
    if (happy) r.line([-100, -12, 102, -12], coral, 3);
  } else if (kind === "emptinesscaption") {
    r.round(-119, -84, 238, 99, 7, paper, gold);
    label("NOTHING", 0, -56, 24, teal);
    label("CAREFULLY PRESENTED", 0, -24, 14);
  } else if (kind === "almostkettle") {
    c.beginPath();
    c.ellipse(0, -42, 55, 49, 0, 0, Math.PI * 2);
    c.fillStyle = "#bad4df55";
    c.fill();
    c.strokeStyle = teal;
    c.lineWidth = 5;
    c.stroke();
    c.beginPath();
    c.moveTo(40, -73);
    c.bezierCurveTo(95, -99, 99, -15, 49, -21);
    c.strokeStyle = gold;
    c.lineWidth = 8;
    c.stroke();
    c.beginPath();
    c.moveTo(-44, -58);
    c.lineTo(-77, -85);
    c.lineTo(-94, -84);
    c.lineTo(-62, -28);
    c.lineTo(-48, -26);
    c.closePath();
    c.fillStyle = blue;
    c.fill();
    c.strokeStyle = teal;
    c.lineWidth = 3;
    c.stroke();
    r.round(-36, -93, 72, 12, 5, gold, teal);
    r.circle(0, -100, 9, teal);
    r.round(-66, 11, 132, 29, 5, paper, gold);
    label("QUITE ENOUGH", 0, 26, 13, teal);
    if (happy) question(-62, -133, 0.75, paper);
  } else if (kind === "biscuitclipboard") {
    const x = happy ? -57 : 0;
    const scale = happy ? 0.74 : 1;
    r.round(
      x - 52 * scale,
      -100 * scale,
      104 * scale,
      118 * scale,
      7 * scale,
      wood,
      gold,
    );
    r.round(
      x - 44 * scale,
      -89 * scale,
      88 * scale,
      98 * scale,
      3 * scale,
      paper,
    );
    r.round(
      x - 21 * scale,
      -107 * scale,
      42 * scale,
      19 * scale,
      5 * scale,
      teal,
      gold,
    );
    for (const y of [-74, -57, -40])
      r.line([x - 31 * scale, y * scale, x + 31 * scale, y * scale], lilac, 2);
    if (happy) {
      c.beginPath();
      c.ellipse(63, -10, 57, 23, 0, 0, Math.PI * 2);
      c.fillStyle = paper;
      c.fill();
      c.strokeStyle = teal;
      c.lineWidth = 3;
      c.stroke();
      c.beginPath();
      c.ellipse(63, -10, 43, 15, 0, 0, Math.PI * 2);
      c.strokeStyle = gold;
      c.lineWidth = 2;
      c.stroke();
      biscuit(63, -17, 0.85);
    } else biscuit(0, -35, 0.94);
  } else if (kind === "turningproof") {
    frame();
    if (happy) {
      label("ALSO", 0, -87, 24, teal);
      label("INTERESTING", 0, -54, 20, teal);
      r.line([-51, -23, 51, -23], coral, 3);
      c.beginPath();
      c.moveTo(61, -115);
      c.lineTo(75, -101);
      c.lineTo(61, -100);
      c.closePath();
      c.fillStyle = lilac;
      c.fill();
    } else {
      c.beginPath();
      c.arc(0, -62, 42, 0, Math.PI * 2);
      c.strokeStyle = teal;
      c.lineWidth = 4;
      c.stroke();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        r.line([0, -62, Math.cos(a) * 37, -62 + Math.sin(a) * 37], lilac, 3);
      }
      label("A TURNING IDEA", 0, -4, 12, teal);
    }
  } else if (kind === "luminousmoss" || kind === "ceramicsun") {
    frame(happy ? (kind === "luminousmoss" ? "#dcece4" : "#f7e9c6") : paper);
    if (kind === "luminousmoss") {
      r.round(-58, -24, 116, 27, 9, wood, gold);
      for (const [x, y, scale] of [
        [-34, -53, 0.92],
        [0, -78, 1.15],
        [36, -54, 0.88],
      ]) {
        r.line([x, -25, x, y - 6], teal, 5);
        leaf(x, y, scale, happy ? teal : green);
        if (happy) {
          r.circle(x - 15, y - 27, 3, paper);
          r.circle(x + 17, y - 8, 2.5, paper);
        }
      }
      label("COOL MOSS", 0, -7, 11, paper);
    } else {
      if (happy) r.circle(0, -69, 49, cream);
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        r.line(
          [
            Math.cos(a) * 34,
            -69 + Math.sin(a) * 34,
            Math.cos(a) * 45,
            -69 + Math.sin(a) * 45,
          ],
          gold,
          5,
        );
      }
      r.circle(0, -69, 30, happy ? gold : cream);
      r.face(0, -74, 0.77, true);
      label("CERAMIC SUN", 0, -7, 11, teal);
    }
  } else if (kind === "tinymuseum") {
    r.round(-124, -137, 248, 163, 11, paper, wood);
    r.round(-114, -107, 228, 116, 6, blue, gold);
    label("A SECOND TINY MUSEUM", 0, -121, 13, teal);
    for (const x of [-98, 98]) r.round(x - 7, -92, 14, 101, 3, cream, gold);
    r.round(-76, -52, 37, 51, 9, paper, teal);
    r.circle(-58, -63, 22, teal);
    r.face(-58, -65, 0.56, true);
    r.line([-40, -40, -11, -31, 12, -63], wood, 3);
    r.round(24, -25, 58, 34, 4, paper, gold);
    r.round(17, -32, 72, 12, 3, gold, wood);
    r.line([-105, 10, 105, 10], wood, 4);
  } else if (kind === "upsidedownroom") {
    r.round(-136, -143, 272, 166, 10, paper, gold);
    c.save();
    c.translate(0, -73);
    c.rotate(happy ? 0 : Math.PI);
    r.round(-76, -19, 93, 12, 4, wood, gold);
    r.line([-63, -7, -63, 35], wood, 6);
    r.line([4, -7, 4, 35], wood, 6);
    r.round(36, -45, 39, 66, 9, teal, gold);
    r.round(29, -2, 50, 15, 5, lilac, wood);
    r.line([37, 12, 34, 35], wood, 5);
    r.line([71, 12, 76, 35], wood, 5);
    c.restore();
    label(
      happy ? "A CHANGE OF PERSPECTIVE" : "THIS WAY UP ↓",
      0,
      -128,
      happy ? 13 : 16,
      teal,
    );
    label(happy ? "NOT OF PLUMBING" : "THE WATER STILL FALLS", 0, 8, 13, teal);
  } else if (kind === "roomforidea") {
    r.round(-132, -129, 264, 152, 9, paper, gold);
    label("ROOM FOR", 0, -99, 24, teal);
    label("THE NEXT IDEA", 0, -69, 22, teal);
    r.round(-96, -47, 192, 56, 4, "#fff8e9", cream);
    if (happy) {
      c.beginPath();
      c.arc(62, -18, 16, 0, Math.PI * 2);
      c.strokeStyle = lilac;
      c.lineWidth = 2.5;
      c.stroke();
    }
  } else if (
    kind === "squaretoast" ||
    kind === "squaretoaststack" ||
    kind === "squaretoastgarden"
  ) {
    r.round(-58, -84, 116, 84, 7, wood, gold);
    r.round(-51, -77, 102, 70, 5, cream, coral);
    for (const [x, y] of [
      [-39, -59],
      [34, -23],
      [-31, -19],
      [38, -62],
    ])
      r.circle(x, y, 2, gold);
    if (happy && kind === "squaretoast")
      r.round(-20, -59, 40, 40, 2, gold, paper);
    else if (happy && kind === "squaretoaststack") {
      for (const [x, y, side] of [
        [-27, -66, 54],
        [-19, -90, 38],
        [-12, -111, 24],
      ]) {
        r.round(x, y, side, side, 2, gold, paper);
        r.line([x + 5, y + 6, x + side - 6, y + 6], cream, 2);
      }
    } else if (happy) {
      r.round(-39, -52, 78, 36, 2, coral, paper);
      for (const [x, y] of [
        [-27, -72],
        [0, -101],
        [28, -77],
      ]) {
        r.line([x, -42, x, y], teal, 3);
        r.round(x - 10, y - 14, 20, 20, 1, coral, gold);
        r.round(x - 6, y - 10, 5, 5, 1, paper);
      }
    }
  } else if (kind === "tomorrowfossil") {
    r.round(-120, -150, 240, 174, 37, tint ?? "#c7c3b7", wood);
    for (const [x, y, radius] of [
      [-91, -110, 4],
      [-97, -20, 5],
      [90, -9, 3],
      [63, -132, 4],
    ])
      r.circle(x, y, radius, cream);
    r.round(-75, -74, 116, 65, 9, happy ? cream : wood, gold);
    r.round(-80, -86, 126, 20, 7, paper, wood);
    for (const x of [-65, -37, -9, 19]) r.line([x, -73, x, -60], paper, 8);
    r.line([-64, -31, 28, -31], coral, 5);
    r.round(-26, -111, 10, 25, 3, coral, wood);
    c.beginPath();
    c.moveTo(-22, -127);
    c.quadraticCurveTo(-36, -112, -21, -109);
    c.quadraticCurveTo(-9, -114, -22, -127);
    c.closePath();
    c.fillStyle = gold;
    c.fill();
    r.round(46, -105, 62, 74, 5, paper, wood);
    r.round(46, -105, 62, 20, 4, teal);
    label("NEXT", 77, -95, 11, paper);
    label("TUESDAY", 77, -63, 10, teal);
    r.line([56, -43, 96, -43], gold, 2);
    label("SOMETHING TO LOOK FORWARD TO", 0, 10, 10, ink);
  } else if (kind === "questionplant") {
    pot();
    r.line([0, -29, 0, -52], teal, 6);
    if (happy) {
      question(0, -80, 1.45, teal);
      leaf(-29, -79, 0.76);
      leaf(36, -105, 0.8);
    } else {
      c.save();
      c.translate(0, -68);
      c.rotate(-Math.PI / 2);
      question(0, 0, 1.2, teal);
      c.restore();
    }
    r.round(58, -42, 61, 49, 4, paper, gold);
    c.beginPath();
    c.moveTo(106, -42);
    c.lineTo(119, -29);
    c.lineTo(106, -29);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
  } else if (kind === "visitorqueue") {
    r.round(-157, -174, 314, 38, 7, paper, gold);
    label("ROOM FOR EVERYONE", 0, -154, 21, teal);
    r.round(-51, -126, 102, 123, 7, gold, wood);
    r.round(-42, -117, 84, 105, 4, paper);
    for (const [i, x] of [-127, -84, 84, 127].entries()) {
      const color = i % 2 ? lilac : teal;
      r.round(x - 13, -40, 26, 46, 11, color, ink);
      r.circle(x, -49, 17, cream);
      r.face(x, -51, 0.45, true);
      r.line([x - 7, 3, x - 10, 20], wood, 4);
      r.line([x + 7, 3, x + 10, 20], wood, 4);
      const direction = (x < 0 ? 1 : -1) * (happy ? 1 : -1);
      r.line([x + direction * 10, -22, x + direction * 28, -34], cream, 5);
    }
  } else if (kind === "marginnotes") {
    r.round(-159, -123, 144, 141, 7, paper, gold);
    label("FIRST IDEA", -87, -97, 15, teal);
    for (let i = 0; i < 4; i++)
      r.line([-142, -77 + i * 17, -34 - (i % 2) * 12, -77 + i * 17], lilac, 2);
    label("Dr. Probably", -86, -1, 12, ink);
    r.round(3, -143, 157, 162, 7, happy ? paper : cream, gold);
    if (happy) {
      label("Margin", 81, -108, 31, teal);
      r.line([24, -82, 138, -82], coral, 3);
      label("A BETTER", 81, -55, 18, teal);
      label("QUESTION", 81, -28, 18, teal);
    } else {
      r.line([18, -130, 147, 6], lilac, 2);
      label("NOTES", 85, -63, 17, teal);
    }
  } else if (kind === "lightquestion") {
    // happy is supplied by the actual explanation:lit signal, not by time,
    // target progress, a decorative ray, or a locally invented light sensor.
    question(0, 3, 0.56, happy ? gold : "#87939e");
  } else if (
    kind === "tinyocean" ||
    kind === "oceanstar" ||
    kind === "oceanhorse"
  ) {
    // Each dedicated kind matches its actual FILL rectangle. The narrow
    // seahorse exhibit stays narrow; these creatures are painted specimens.
    const width = kind === "oceanstar" ? 170 : kind === "oceanhorse" ? 90 : 145;
    const height = kind === "oceanstar" ? 70 : kind === "oceanhorse" ? 65 : 75;
    r.round(
      -width / 2,
      -60,
      width,
      height,
      11,
      happy ? blue : "#fff2d955",
      teal,
    );
    c.beginPath();
    c.ellipse(0, -60, width / 2 - 3, 7, 0, 0, Math.PI * 2);
    c.strokeStyle = gold;
    c.lineWidth = 3;
    c.stroke();
    if (kind === "oceanstar") {
      c.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const radius = i % 2 ? 12 : 28;
        const x = Math.cos(a) * radius,
          y = -24 + Math.sin(a) * radius;
        if (i === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.closePath();
      c.fillStyle = happy ? coral : cream;
      c.fill();
      c.strokeStyle = gold;
      c.lineWidth = 2;
      c.stroke();
      r.face(0, -29, 0.43, true);
      if (happy) {
        r.circle(-55, -30, 3, paper);
        r.circle(54, -13, 2.5, paper);
      }
    } else if (kind === "oceanhorse") {
      c.save();
      c.translate(0, -5);
      c.beginPath();
      c.moveTo(7, -44);
      c.bezierCurveTo(-21, -43, -23, -18, -4, -11);
      c.bezierCurveTo(14, -5, 8, 10, -8, 2);
      c.bezierCurveTo(-20, -6, -9, -17, -3, -9);
      c.strokeStyle = happy ? gold : cream;
      c.lineWidth = 11;
      c.lineCap = "round";
      c.stroke();
      r.circle(6, -39, 13, happy ? gold : cream);
      r.round(10, -41, 22, 9, 4, gold);
      r.circle(6, -42, 2.5, ink);
      r.line([-16, -29, -27, -24, -17, -17], coral, 3);
      if (happy) r.circle(-26, -48, 3, paper);
      c.restore();
    } else {
      c.beginPath();
      c.ellipse(-6, -24, 47, 24, 0, 0, Math.PI * 2);
      c.fillStyle = happy ? teal : lilac;
      c.fill();
      c.beginPath();
      c.moveTo(34, -30);
      c.lineTo(61, -45);
      c.lineTo(56, -25);
      c.lineTo(68, -9);
      c.lineTo(35, -14);
      c.closePath();
      c.fill();
      r.circle(-30, -30, 3, ink);
      c.beginPath();
      c.arc(-30, -20, 8, 0, Math.PI / 2);
      c.strokeStyle = paper;
      c.lineWidth = 2;
      c.stroke();
      if (happy) {
        r.line([-12, -46, -12, -72, -22, -81], teal, 3);
        r.line([-12, -72, -3, -85], teal, 3);
        r.circle(-23, -85, 2.5, blue);
        r.circle(-1, -88, 2.5, blue);
        r.round(44, -8, 20, 15, 3, paper, gold);
        r.line([48, -3, 60, -3], lilac, 1.5);
        r.line([48, 2, 57, 2], lilac, 1.5);
      }
    }
  } else if (kind === "moonmarble") {
    r.circle(0, -80, 48, cream);
    for (const [x, y, radius] of [
      [-21, -95, 10],
      [17, -106, 6],
      [19, -61, 12],
      [-15, -54, 5],
    ])
      r.circle(x, y, radius, lilac);
    c.beginPath();
    c.moveTo(-48, -45);
    c.quadraticCurveTo(0, -5, 48, -45);
    c.lineTo(39, -9);
    c.lineTo(-39, -9);
    c.closePath();
    c.fillStyle = teal;
    c.fill();
    c.strokeStyle = gold;
    c.lineWidth = 3;
    c.stroke();
    r.round(-130, 0, 260, 45, 7, paper, gold);
    label("RETURN AFTER", 0, 13, 15, teal);
    label("EVERYONE HAS HAD A LOOK", 0, 32, 12, teal);
  } else if (kind === "visitorquestions") {
    r.round(-157, -140, 314, 163, 8, paper, gold);
    if (happy) {
      label("VISITORS' QUESTIONS", 0, -115, 21, teal);
      r.line([-128, -96, 128, -96], coral, 3);
      label("Room to think?", -17, -69, 17, teal);
      label("Why not?", 37, -38, 17, teal);
      label("What happens next?", -6, -7, 17, teal);
      for (const [x, y] of [
        [-131, -69],
        [109, -38],
        [-124, -7],
      ])
        r.circle(x, y, 4, gold);
    }
  } else if (kind === "footnotesymbol") {
    // This is the physical deck's passenger, not a second floating body.
    // Its lowest painted point is exactly y=0 in either presentation state.
    const color = happy ? teal : ink;
    r.line([0, -69, 0, -6], color, 8);
    r.line([-25, -58, 25, -18], color, 8);
    r.line([-25, -18, 25, -58], color, 8);
    r.circle(0, -4, 4, color);
  } else if (kind === "footnoteexplanation") {
    r.round(-110, -73, 220, 88, 7, paper, gold);
    label("IMPORTANT ENOUGH", 0, -45, 17, teal);
    label("TO COME UP HERE", 0, -15, 18, teal);
    r.line([-76, 3, 76, 3], lilac, 2);
  } else if (kind === "uncertaincase") {
    for (const x of [-135, 135]) r.round(x - 90, -145, 180, 68, 7, paper, gold);
    label("WHAT WE", -135, -124, 19, teal);
    label("KNOW", -135, -97, 22, teal);
    label("WHAT WE", 135, -124, 19, teal);
    label("WONDER", 135, -97, 22, teal);
    if (happy) {
      r.round(-83, -6, 166, 32, 8, teal, gold);
      label("WELCOME", 0, 11, 18, paper);
    }
  } else if (kind === "institutepanorama") {
    r.round(-344, 27, 688, 17, 7, paper, gold);
    r.round(-307, -220, 614, 75, 11, paper, gold);
    label("ALMOST POSSIBLE", 0, -195, 29, teal);
    label("DEFINITELY WORTH ASKING", 0, -164, 23, teal);
    stool(-163, 12, 215);
    c.save();
    c.translate(-220, -24);
    c.scale(0.82, 0.82);
    probably();
    c.restore();
    c.save();
    c.translate(-105, -24);
    c.scale(0.8, 0.8);
    margin();
    c.restore();
    c.save();
    c.translate(75, 11);
    c.scale(0.9, 0.9);
    zero();
    c.restore();
    r.round(220, -28, 43, 52, 14, lilac, ink);
    r.circle(242, -46, 26, cream);
    r.face(242, -50, 0.74, true);
    r.line([230, 21, 225, 32], wood, 5);
    r.line([253, 21, 260, 32], wood, 5);
    r.round(206, -10, 68, 35, 4, paper, gold);
    r.line([214, -3, 240, 7, 266, -3], lilac, 2);
    if (happy) {
      r.round(159, -131, 172, 51, 7, paper, gold);
      label("WHERE DO", 245, -115, 17, teal);
      label("WE START?", 245, -94, 17, teal);
    }
  } else return false;
  return true;
}
