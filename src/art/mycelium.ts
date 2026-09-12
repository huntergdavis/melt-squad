import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Illustrations stay in prop-local coordinates. Real water, rail construction,
// the freight carrier, and the balance pans remain owned by the scene engine.
export function drawMycelium(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
  progress = happy ? 1 : 0,
): boolean {
  const c = r.ctx;
  const ink = "#425353";
  const cream = "#f5e9ce";
  const paper = "#fff4dd";
  const teal = "#739a8c";
  const moss = "#a7b582";
  const coral = "#c98773";
  const gold = "#d8b675";
  const wood = "#937761";
  const lilac = "#afa5bf";
  const blue = "#b8d0d0";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;
  const care = Number.isFinite(progress)
    ? Math.max(0, Math.min(1, progress))
    : 0;

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
  const leaf = (x: number, y: number, scale = 1, color = moss) => {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    c.beginPath();
    c.moveTo(0, 7);
    c.quadraticCurveTo(-23, -9, -5, -29);
    c.quadraticCurveTo(22, -17, 0, 7);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    r.line([0, 5, -3, -20], cream, 1.8);
    c.restore();
  };
  const cap = (
    x: number,
    y: number,
    width: number,
    color: string,
    shaggy = false,
  ) => {
    c.beginPath();
    c.moveTo(x - width, y);
    c.quadraticCurveTo(x - width * 0.75, y - width * 0.94, x, y - width * 1.01);
    c.quadraticCurveTo(x + width * 0.79, y - width * 0.93, x + width, y);
    c.quadraticCurveTo(x, y + width * 0.25, x - width, y);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2.5;
    c.stroke();
    for (let i = -3; i <= 3; i++) {
      const offset = i * width * 0.22;
      r.line(
        [x + offset, y + 2, x + offset * 0.73, y + width * 0.08],
        cream,
        2,
      );
      if (shaggy) {
        c.beginPath();
        c.moveTo(x + offset - 6, y - 10);
        c.lineTo(x + offset, y - 24 - (i % 2 === 0 ? 4 : 0));
        c.lineTo(x + offset + 7, y - 10);
        c.closePath();
        c.fillStyle = cream;
        c.fill();
      }
    }
  };
  const puff = (x: number, y: number, scale = 1) => {
    c.beginPath();
    c.moveTo(x, y);
    c.bezierCurveTo(
      x - 19 * scale,
      y - 14 * scale,
      x + 21 * scale,
      y - 27 * scale,
      x + 4 * scale,
      y - 43 * scale,
    );
    c.strokeStyle = cream;
    c.lineWidth = 5 * scale;
    c.lineCap = "round";
    c.stroke();
  };
  const punch = () => {
    r.round(-35, -19, 70, 29, 8, ink, gold);
    r.round(-20, -39, 40, 25, 6, teal, ink);
    r.line([-27, -31, 27, -77], gold, 16);
    r.line([-22, -35, 29, -78], cream, 4);
    r.circle(-25, -29, 10, coral);
    r.circle(-25, -29, 4, paper);
    r.round(10, -89, 34, 15, 7, coral, ink);
  };
  const gills = () => {
    r.round(-27, 5, 23, 21, 7, wood, ink);
    r.round(5, 5, 23, 21, 7, wood, ink);
    r.round(-31, -64, 62, 73, 17, teal, ink);
    r.round(-23, -108, 46, 62, 19, cream, ink);
    cap(0, -93, 63, tint ?? moss, true);
    r.round(-30, -116, 60, 13, 4, teal, gold);
    r.circle(0, -110, 5, gold);
    r.face(0, -77, 0.94, true);
    r.line([-24, -51, -8, -30, 0, -52, 8, -30, 24, -51], cream, 3);
    r.line([0, -29, 0, 5], gold, 2);
    r.circle(10, -20, 3, gold);
    r.circle(10, -6, 3, gold);
    r.line([-31, -41, -50, -23, -63, happy ? -49 : -19], cream, 8);
    r.line([31, -42, 51, -33, 63, happy ? -65 : -22], cream, 8);
    r.round(-26, -15, 18, 16, 3, cream, gold);
  };
  const sprig = (scarf = false) => {
    r.round(-16, 7, 14, 13, 5, wood, ink);
    r.round(3, 7, 14, 13, 5, wood, ink);
    r.round(-20, -31, 40, 43, 13, cream, ink);
    r.round(-23, -48, 46, 39, 16, cream, ink);
    cap(0, -43, 48, tint ?? coral);
    for (const [x, y, radius] of [
      [-23, -57, 6],
      [1, -74, 8],
      [25, -58, 5],
    ])
      r.circle(x, y, radius, cream);
    r.face(0, -31, 0.72, true);
    r.line([-18, -5, -35, 1, -44, happy ? -24 : -1], cream, 6);
    r.line([18, -5, 35, 0, 44, happy ? -29 : -2], cream, 6);
    r.round(-13, -9, 26, 17, 3, teal, ink);
    r.line([-9, -4, 9, -4], gold, 2);
    if (scarf) {
      r.line([-25, -15, 2, -11, 26, -16], lilac, 11);
      r.line([19, -12, 28, 15, 45, 22], lilac, 12);
      r.line([29, 12, 39, 10], cream, 2);
      r.line([35, 19, 45, 17], cream, 2);
      for (const x of [41, 46, 51]) r.line([x, 19, x + 1, 29], lilac, 2);
    }
  };
  const edna = () => {
    r.round(-26, 5, 22, 22, 7, wood, ink);
    r.round(4, 5, 22, 22, 7, wood, ink);
    r.round(-30, -64, 60, 73, 17, lilac, ink);
    r.round(-23, -105, 46, 64, 18, cream, ink);
    c.beginPath();
    c.moveTo(-53, -82);
    c.quadraticCurveTo(-35, -153, 0, -157);
    c.quadraticCurveTo(37, -152, 53, -82);
    c.quadraticCurveTo(0, -63, -53, -82);
    c.closePath();
    c.fillStyle = tint ?? ink;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    for (const x of [-34, -17, 0, 17, 34])
      r.line([x * 0.42, -135, x, -84], lilac, 2);
    r.face(0, -56, 0.81, true);
    c.beginPath();
    c.arc(-11, -57, 12, 0, Math.PI * 2);
    c.moveTo(23, -57);
    c.arc(11, -57, 12, 0, Math.PI * 2);
    c.strokeStyle = gold;
    c.lineWidth = 2.5;
    c.stroke();
    r.line([-2, -59, 2, -59], gold, 2);
    r.line([-21, -42, 0, -25, 21, -42], cream, 3);
    r.line([-29, -25, -46, -8, -39, 6], cream, 8);
    r.line([29, -25, 47, happy ? -52 : -6], cream, 8);
    r.round(-42, -5, 56, 33, 4, paper, gold);
    r.line([-36, 0, -14, 16, 8, 0], lilac, 2);
    r.circle(-14, 13, 4, teal);
  };
  const book = (
    x: number,
    y: number,
    scale = 1,
    jacket = false,
    color = teal,
  ) => {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    r.round(-24, -71, 48, 73, 5, color, ink);
    r.round(-19, -65, 37, 61, 3, paper);
    r.line([-12, -50, 11, -50], gold, 2);
    r.line([-12, -40, 9, -40], gold, 2);
    if (jacket) {
      r.round(-24, -38, 48, 39, 4, color, ink);
      r.line([-19, -37, -6, -23, 0, -37, 7, -23, 19, -37], cream, 3);
      r.line([0, -21, 0, -1], gold, 2);
      r.circle(7, -16, 2, gold);
      r.circle(7, -6, 2, gold);
      r.face(0, -51, 0.5, true);
    }
    c.restore();
  };
  const bowl = (x: number, y: number, scale = 1) => {
    r.round(
      x - 28 * scale,
      y - 9 * scale,
      56 * scale,
      26 * scale,
      11 * scale,
      paper,
      wood,
    );
    c.beginPath();
    c.ellipse(x, y - 8 * scale, 26 * scale, 7 * scale, 0, 0, Math.PI * 2);
    c.fillStyle = gold;
    c.fill();
    r.circle(x - 9 * scale, y - 8 * scale, 3 * scale, moss);
    r.circle(x + 9 * scale, y - 8 * scale, 2.5 * scale, coral);
  };
  const snail = (x: number, y: number, scale = 1, color = coral) => {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    r.round(-34, -3, 74, 22, 11, cream, ink);
    r.circle(-5, -18, 32, color);
    c.beginPath();
    c.arc(-6, -18, 22, 0, Math.PI * 1.65);
    c.strokeStyle = gold;
    c.lineWidth = 3;
    c.stroke();
    c.beginPath();
    c.arc(-5, -18, 11, Math.PI * 0.8, Math.PI * 2.45);
    c.stroke();
    r.round(24, -37, 22, 45, 10, cream, ink);
    r.line([28, -30, 24, -51], cream, 5);
    r.line([42, -30, 48, -51], cream, 5);
    r.circle(24, -51, 3.5, ink);
    r.circle(48, -51, 3.5, ink);
    c.beginPath();
    c.arc(36, -18, 6, 0, Math.PI);
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
    c.restore();
  };
  const carriage = () => {
    for (const x of [-92, 85]) {
      r.circle(x, 8, 25, ink);
      r.circle(x, 8, 17, gold);
      r.line([x - 12, 8, x + 12, 8], cream, 3);
      r.line([x, -4, x, 20], cream, 3);
    }
    r.round(-137, -93, 274, 103, 17, tint ?? teal, ink);
    r.round(-148, -113, 296, 27, 13, moss, ink);
    for (const x of [-98, -33, 32]) {
      r.round(x - 24, -79, 48, 52, 8, cream, gold);
      r.round(x - 17, -72, 34, 33, 4, blue);
      r.round(x - 16, -37, 32, 6, 3, lilac);
    }
    r.round(74, -75, 45, 76, 9, paper, gold);
    r.circle(86, -32, 3, ink);
    r.line([-124, -11, 123, -11], gold, 4);
    r.round(-114, -142, 25, 34, 5, wood, ink);
    r.round(-119, -146, 35, 10, 4, gold, ink);
    if (happy) {
      puff(-101, -148, 0.7);
      puff(-80, -161, 0.55);
    }
    r.line([-137, -9, -155, -9], wood, 8);
    r.line([137, -9, 155, -9], wood, 8);
  };

  if (kind === "gillsconductor") gills();
  else if (kind === "sprigporter" || kind === "sprigscarf")
    sprig(kind === "sprigscarf");
  else if (kind === "ednalibrarian") edna();
  else if (kind === "myceliumcarriage") carriage();
  else if (kind === "boilergauge") {
    r.round(-63, -115, 126, 139, 13, tint ?? teal, ink);
    r.circle(0, -57, 48, gold);
    r.circle(0, -57, 41, paper);
    for (let i = 0; i <= 8; i++) {
      const a = Math.PI * (0.8 + (i * 1.4) / 8);
      r.line(
        [
          Math.cos(a) * 29,
          -57 + Math.sin(a) * 29,
          Math.cos(a) * 34,
          -57 + Math.sin(a) * 34,
        ],
        teal,
        2,
      );
    }
    // The actual target fraction alone drives this pointer, not decorative time.
    const angle = Math.PI * (0.8 + care * 1.4);
    r.line(
      [0, -57, Math.cos(angle) * 30, -57 + Math.sin(angle) * 30],
      coral,
      4,
    );
    r.circle(0, -57, 6, gold);
    label("BOILER CARE", 0, 8, 13, paper);
  } else if (kind === "ticketpunch") punch();
  else if (kind === "giantpunchedticket") {
    c.beginPath();
    c.roundRect(-98, -115, 196, 135, 10);
    if (happy) {
      c.moveTo(60, -47);
      c.arc(23, -47, 37, 0, Math.PI * 2);
    }
    c.fillStyle = paper;
    c.fill("evenodd");
    c.strokeStyle = gold;
    c.lineWidth = 3;
    c.stroke();
    label("TICKET", 0, -98, 18, teal);
    for (const y of [-77, -54, -31, -8]) {
      r.circle(-87, y, 2, coral);
      r.circle(87, y, 2, coral);
    }
    if (!happy) label("HERE → THERE", 0, -47, 16, teal);
    else {
      r.line([-72, -54, -26, -54], gold, 2);
      r.line([-72, -31, -30, -31], gold, 2);
    }
  } else if (kind === "librarycrate") {
    if (happy) {
      book(-56, -32, 0.8, true, teal);
      book(0, -36, 0.87, true, lilac);
      book(56, -32, 0.8, true, coral);
    }
    r.round(-99, -39, 198, 66, 7, wood, ink);
    if (!happy) r.round(-102, -98, 204, 64, 7, gold, wood);
    for (const x of [-82, 82]) r.line([x, -33, x, 21], gold, 8);
    r.round(-72, -20, 144, 35, 4, paper, gold);
    label("PLEASE DO NOT", 0, -10, 12);
    label("TOAST", 0, 6, 14, coral);
  } else if (kind === "departurehats") {
    r.round(-158, -169, 316, 39, 7, paper, gold);
    label("LOCAL SERVICE", 0, -149, 24, teal);
    for (const [i, x] of [-98, 0, 98].entries()) {
      c.save();
      c.translate(x, -42);
      c.rotate(happy ? Math.sin(motion * 1.5 + i) * 0.045 : 0);
      const color = i === 0 ? lilac : i === 1 ? coral : teal;
      r.round(-32, -52, 64, 50 + i * 4, 11, color, ink);
      r.round(-44, -7, 88, 15, 7, color, ink);
      r.line([-27, -19, 27, -19], gold, 7);
      if (i === 1) leaf(19, -44, 0.62);
      c.restore();
    }
  } else if (kind === "porterhandcart") {
    r.circle(-38, 8, 16, ink);
    r.circle(38, 8, 16, ink);
    r.circle(-38, 8, 8, gold);
    r.circle(38, 8, 8, gold);
    r.round(-62, -27, 124, 33, 8, teal, ink);
    r.line([-59, -27, -77, -61, -94, -61], wood, 7);
    r.round(-45, -48, 63, 27, 5, cream, gold);
    r.round(29, -67, 18, 45, 4, wood, ink);
    r.round(25, -72, 26, 9, 4, gold, ink);
    if (happy) puff(38, -75, 0.38);
  } else if (kind === "acornpassenger") {
    r.round(-26, -47, 52, 65, 24, gold, wood);
    r.circle(0, -56, 29, gold);
    cap(0, -57, 34, wood);
    r.line([0, -87, 7, -110], wood, 7);
    r.face(0, -41, 0.84, true);
    r.round(-23, 11, 19, 15, 6, wood, ink);
    r.round(4, 11, 19, 15, 6, wood, ink);
    if (happy) {
      r.line([71, 24, 71, -100, 58, -114], wood, 5);
      r.round(41, -68, 62, 78, 12, teal, ink);
      r.line([49, -64, 72, -49, 95, -64], cream, 3);
      for (const [x, y] of [
        [48, -80],
        [77, -93],
        [98, -80],
      ]) {
        r.line([72, -32, x, y], wood, 4);
        leaf(x, y, 0.6);
      }
      r.round(-81, -15, 66, 28, 4, paper, gold);
      label("LEAF ROOM", -48, -1, 9, teal);
      r.line([-38, -20, -55, -33], cream, 6);
      r.line([-55, -33, -63, -50], gold, 3);
      r.round(-72, -64, 22, 20, 7, paper, wood);
    } else {
      r.round(-31, -23, 62, 41, 9, teal, ink);
      r.line([-26, -19, 0, -6, 26, -19], cream, 3);
    }
  } else if (kind === "dripreadingroom") {
    for (const x of [-108, 108]) {
      r.round(x - 38, -62, 76, 74, 13, tint ?? teal, ink);
      r.round(x - 33, -27, 66, 25, 8, blue, gold);
      r.line([x - 25, 9, x - 29, 27], wood, 6);
      r.line([x + 25, 9, x + 29, 27], wood, 6);
      for (const dx of [-19, 0, 19])
        r.line([x + dx, -50, x + dx - 3, -39], cream, 2);
    }
    r.round(-97, -154, 194, 89, 6, lilac, ink);
    r.round(-87, -145, 174, 70, 3, paper);
    label("A BRIEF HISTORY", 0, -129, 14, teal);
    label("OF DRIPS", 0, -108, 20, teal);
    label("VOLUME ONE OF SEVEN", 0, -86, 10);
  } else if (kind === "quietnursery") {
    r.round(-104, -19, 208, 48, 15, wood, ink);
    for (const [i, x] of [-62, 0, 62].entries()) {
      r.round(x - 12, -49, 24, 40, 9, cream, ink);
      cap(x, -42, 25, i === 1 ? lilac : coral);
      r.face(x, -31, 0.39, true);
    }
    if (happy) {
      c.beginPath();
      c.moveTo(-100, 0);
      c.quadraticCurveTo(-56, -38, 95, -8);
      c.quadraticCurveTo(60, 25, -100, 13);
      c.closePath();
      c.fillStyle = moss;
      c.fill();
      r.line([-91, 1, 80, -10], cream, 2);
      for (const x of [-55, -15, 25, 65])
        r.line([x, -3, x - 6, -14], cream, 1.5);
    }
  } else if (kind === "announcementcard" || kind === "freightcertificate") {
    r.round(-100, -97, 200, 116, 7, paper, gold);
    if (kind === "freightcertificate") {
      label("CERTIFIED", 0, -78, 18, teal);
      label("LIFTS REFRESHMENTS", 0, -52, 14, teal);
      label("SLIGHTLY HIGHER", 0, -29, 13, teal);
      r.circle(0, 3, 11, teal);
      r.round(-6, -2, 12, 7, 2, gold);
      r.circle(-3, 6, 2, paper);
      r.circle(4, 6, 2, paper);
      r.line([-7, 9, 7, 9], paper, 1.5);
    } else {
      label("A QUIET", 0, -68, 19, teal);
      label("WARM WELCOME", 0, -39, 18, teal);
      r.line([-60, -13, 60, -13], lilac, 2);
    }
  } else if (kind === "platformsoup") {
    // The two actual 110x65 bowls are centered 160px apart. This earned
    // foreground serving covers their own completed fill, not another target.
    for (const [i, x] of [-80, 80].entries()) {
      r.round(x - 55, -60, 110, 65, 14, paper, wood);
      c.beginPath();
      c.ellipse(x, -60, 53, 8, 0, 0, Math.PI * 2);
      c.fillStyle = gold;
      c.fill();
      r.circle(x - 16, -60, 4, moss);
      r.circle(x + 16, -60, 3.5, coral);
      label("PLATFORM", x, -25, 13, teal);
      label(i === 0 ? "ONE" : "TWO", x, -6, 14, teal);
    }
  } else if (kind === "porterconstellation") {
    c.save();
    c.translate(0, -45);
    r.round(-139, -156, 278, 139, 13, ink, wood);
    const stars = [-73, -92, -48, -64, 58, -64, 73, -92, -48, -37, 49, -37];
    r.line(stars.slice(0, 8), gold, 2);
    r.line([-48, -64, -48, -37, 49, -37, 58, -64], gold, 2);
    r.line([-73, -92, -84, -116, -104, -116], gold, 2);
    for (let i = 0; i < stars.length; i += 2)
      r.circle(stars[i], stars[i + 1], 4, paper);
    label("PORTER'S REST", 0, -138, 14, paper);
    c.restore();
    r.line([-33, 29, 0, -16, 33, 29], wood, 5);
    c.save();
    c.translate(0, -28);
    c.rotate(-0.35);
    r.round(-56, -13, 112, 26, 7, gold, ink);
    r.round(42, -20, 23, 40, 6, teal, ink);
    r.circle(54, 0, 12, blue);
    c.restore();
  } else if (kind === "peafamily") {
    // Six distinct helpers share exactly one pea and one carrying rail.
    r.circle(0, -73, 41, moss);
    r.line([-12, -95, -17, -85], cream, 5);
    r.line([-129, -30, 129, -30], wood, 5);
    for (const [i, x] of [-120, -72, -24, 24, 72, 120].entries()) {
      r.round(x - 11, -17, 22, 29, 10, i % 2 ? lilac : teal, ink);
      r.circle(x, -20, 13, cream);
      r.face(x, -21, 0.35, true);
      r.line([x - 5, 10, x - 10, 21], ink, 3);
      r.line([x + 5, 10, x + 10, 21], ink, 3);
      r.line([x - 8, -2, x - 17, -29], cream, 4);
      r.line([x + 8, -2, x + 17, -29], cream, 4);
      r.line([x - 5, -31, x - 10, -39], ink, 2);
      r.line([x + 5, -31, x + 10, -39], ink, 2);
    }
    r.round(-99, 27, 198, 30, 5, paper, gold);
    label("SOMEWHERE NEARBY", 0, 42, 14, teal);
  } else if (kind === "sleeperseeds") {
    if (happy) {
      // The scene's 110x230 completed divider at (460,245), viewed from
      // this prop's (515,465) anchor and .95 scale, receives its own paint.
      r.round(-55 / 0.95, -220 / 0.95, 110 / 0.95, 230 / 0.95, 7, ink, gold);
      r.circle(17, -201, 16, cream);
      r.circle(24, -206, 14, ink);
      for (const [x, y] of [
        [-32, -206],
        [-13, -173],
        [35, -157],
        [-35, -143],
        [29, -65],
        [-9, -88],
      ]) {
        r.circle(x, y, 2.7, cream);
      }
    }
    for (const x of [-99, 99]) {
      r.round(x - 73, -95, 146, 122, 8, wood, ink);
      r.round(x - 65, -87, 130, 86, 4, ink);
      for (const [dx, dy] of [
        [-41, -68],
        [28, -70],
        [47, -38],
      ])
        r.circle(x + dx, dy, 2.5, cream);
      r.round(x - 55, -20, 110, 39, 8, happy ? blue : paper, gold);
      for (const dx of [-26, 26]) {
        r.round(x + dx - 12, -49, 24, 37, 12, gold, wood);
        if (happy) r.line([x + dx - 6, -29, x + dx + 6, -29], ink, 2);
      }
      if (happy) r.line([x - 47, -7, x + 47, -7], cream, 2);
    }
    r.round(-78, -139, 156, 32, 5, paper, gold);
    label("BEDTIME TIMETABLE", 0, -123, 12, teal);
  } else if (kind === "cushiontickets") {
    const color = tint ?? blue;
    if (happy) {
      r.round(-44, -108, 88, 82, 14, color, ink);
      r.round(-50, -39, 100, 39, 12, color, gold);
      r.line([-32, -1, -39, 29], wood, 6);
      r.line([32, -1, 39, 29], wood, 6);
      r.line([-44, -51, -57, -27], gold, 5);
      r.line([44, -51, 57, -27], gold, 5);
      r.round(-25, -93, 50, 31, 4, paper, gold);
      label("SEAT", 0, -77, 12, teal);
      r.circle(17, -84, 3, wood);
    } else {
      r.round(-44, -103, 88, 129, 7, paper, gold);
      r.round(-35, -92, 70, 43, 4, color);
      label("TICKET", 0, -69, 13, teal);
      r.line([-29, -28, 29, -28], wood, 2);
      r.line([-29, -11, 29, -11], wood, 2);
    }
  } else if (kind === "freightcup") {
    // The real 140x70 moving basin owns the y+52.5 follow anchor. This
    // illustration never adds a second motion or relocates the parked cup.
    r.round(-70, -52.5, 140, 70, 15, paper, gold);
    r.circle(76, -24, 25, gold);
    r.circle(76, -24, 16, paper);
    r.round(-70, -60.5, 140, 16, 7, teal, gold);
    c.beginPath();
    c.ellipse(0, -52.5, 65, 8, 0, 0, Math.PI * 2);
    c.fillStyle = happy ? blue : ink;
    c.fill();
    if (happy) {
      r.line([-31, -27, -19, -15, 6, -41], teal, 5);
    }
  } else if (kind === "junctionboard") {
    r.round(-163, -124, 326, 145, 9, paper, wood);
    label("GOOD REASONS", 0, -101, 21, teal);
    r.line([-117, -51, 0, -26, 117, -51], happy ? teal : gold, 5);
    r.circle(0, -26, 9, gold);
    label("LIBRARY", -93, -72, 15, teal);
    label("GARDEN", 93, -72, 15, teal);
    if (happy) {
      book(105, -4, 0.37, false, lilac);
      r.round(-124, -38, 47, 41, 5, blue, gold);
      leaf(-101, -10, 0.61);
      r.line([-46, -44, -36, -36, -48, -32], teal, 3);
      r.line([46, -43, 37, -35, 49, -32], teal, 3);
    }
  } else if (kind === "lostsnail") {
    snail(-24, -5, 1.15);
    r.line([40, 12, 40, -113], wood, 4);
    c.beginPath();
    c.moveTo(-15, -86);
    c.quadraticCurveTo(39, -172, 100, -86);
    c.quadraticCurveTo(84, -96, 65, -86);
    c.quadraticCurveTo(44, -97, 22, -86);
    c.quadraticCurveTo(3, -98, -15, -86);
    c.closePath();
    c.fillStyle = lilac;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
    r.line([40, -132, 40, -89], cream, 2);
    r.round(55, -7, 59, 37, 7, teal, gold);
    r.round(71, -19, 27, 15, 5, gold, ink);
    r.line([60, 4, 109, 4], cream, 2);
  } else if (kind === "sprighalt") {
    r.round(-153, 4, 306, 28, 7, wood, gold);
    r.round(-131, -30, 91, 37, 5, teal, ink);
    r.line([-121, -30, -121, -123, -54, -123, -54, -30], wood, 5);
    r.round(-139, -126, 109, 54, 7, paper, gold);
    label("SPRIG", -85, -111, 17, teal);
    label("HALT", -85, -88, 17, teal);
    if (happy)
      for (const [i, x] of [0, 43, 91].entries()) {
        r.round(x - 9, -21, 18, 27, 8, cream, ink);
        cap(x, -18, 17, i === 1 ? lilac : moss);
        r.face(x, -10, 0.3, true);
        r.round(x + 11, -10, 14, 16, 3, gold, wood);
      }
  } else if (kind === "modestcrate") {
    // The bottom is y=0, so the real balance pan can carry this exact crate.
    r.round(-60, -81, 120, 79.5, 6, wood, ink);
    r.round(-63, -89, 126, 15, 4, gold, wood);
    r.line([-47, -72, -47, -7], gold, 7);
    r.line([47, -72, 47, -7], gold, 7);
    r.round(-41, -60, 82, 49, 4, paper, gold);
    label("A SMALL BOOK", 0, -48, 9, teal);
    label("OF", 0, -34, 9);
    label("MODEST IDEAS", 0, -20, 9, teal);
    if (happy) {
      r.round(-29, -119, 58, 32, 4, lilac, ink);
      r.line([-22, -110, 22, -110], paper, 2);
      r.line([-22, -101, 16, -101], paper, 2);
    }
  } else if (kind === "staffsupper") {
    c.save();
    c.translate(-67, -31);
    c.scale(0.8, 0.8);
    gills();
    c.restore();
    c.save();
    c.translate(77, -29);
    c.scale(0.8, 0.8);
    edna();
    c.restore();
    c.save();
    c.translate(224, -30);
    c.scale(0.9, 0.9);
    sprig();
    c.restore();
    snail(-238, -24, 0.53);
    snail(-195, -25, 0.43, lilac);
    snail(-209, -3, 0.32, moss);
    r.round(-287, -17, 574, 32, 9, wood, gold);
    r.line([-245, 13, -245, 37], wood, 9);
    r.line([245, 13, 245, 37], wood, 9);
    for (const x of happy ? [-213, -67, 77, 224] : [-213, -67, 77])
      bowl(x, -29, 1.02);
    if (happy) {
      r.round(173, 15, 102, 27, 4, paper, gold);
      label("FOR THE PORTER", 224, 29, 10, teal);
    }
  } else if (kind === "myceliumpanorama") {
    r.round(-344, 20, 688, 24, 8, wood, gold);
    r.round(-146, -200, 292, 48, 9, paper, gold);
    label("WE HAVE TIME", 0, -175, 27, teal);
    c.save();
    c.translate(-53, 10);
    c.scale(0.86, 0.86);
    carriage();
    c.restore();
    c.save();
    c.translate(-275, -1);
    c.scale(0.74, 0.74);
    gills();
    c.restore();
    c.save();
    c.translate(113, -2);
    c.scale(0.75, 0.75);
    edna();
    c.restore();
    c.save();
    c.translate(253, -3);
    c.scale(0.97, 0.97);
    sprig();
    c.restore();
    r.round(177, 20, 141, 31, 6, paper, gold);
    label("SPRIG HALT", 248, 36, 16, teal);
    r.line([168, 8, 195, 8], cream, 3);
    r.line([172, 2, 168, 8, 172, 14], cream, 2);
  } else return false;
  return true;
}
