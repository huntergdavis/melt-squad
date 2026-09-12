import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Practical, non-catastrophic illustrations. Real channels, plugs, pulsing
// bells and optical paths are supplied by the scene engine, never simulated here.
export function drawApocalypse(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
  _progress?: number,
): boolean {
  const c = r.ctx;
  const ink = "#48465e";
  const cream = "#fff0d5";
  const plum = "#847391";
  const lilac = "#b8a8c8";
  const coral = "#d88f89";
  const teal = "#86aaa6";
  const blue = "#b0cbd2";
  const gold = "#e6c27d";
  const green = "#a8b98e";
  const stone = "#bab5ac";
  const wood = "#a58b74";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;
  const label = (words: string, x: number, y: number, size = 15, color = ink) => {
    c.font = `bold ${size}px system-ui`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = color;
    c.fillText(words, x, y);
  };
  const caption = (words: string, x: number, y: number, size = 15) => {
    c.save();
    c.font = `bold ${size}px system-ui`;
    const width = Math.ceil(c.measureText(words).width) + 14;
    const height = size + 8;
    r.round(x - width / 2, y - height / 2, width, height, 4, cream);
    label(words, x, y, size);
    c.restore();
  };
  const at = (x: number, y: number, scale: number, draw: () => void) => {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    draw();
    c.restore();
  };
  const oval = (x: number, y: number, rx: number, ry: number, color: string) => {
    c.beginPath();
    c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    c.fillStyle = color;
    c.fill();
  };
  const plaque = (x: number, y: number, width: number, height: number, color = cream) => {
    r.round(x - width / 2, y, width, height, 7, color, wood);
    r.circle(x - width / 2 + 10, y + 10, 2, wood);
    r.circle(x + width / 2 - 10, y + 10, 2, wood);
  };
  const chair = (x: number, y: number, width = 47) => {
    r.round(x - width / 2, y - 46, width, 54, 8, teal, ink);
    r.round(x - width / 2 - 3, y - 1, width + 6, 12, 5, cream, ink);
    r.line([x - width * 0.34, y + 11, x - width * 0.38, y + 31], wood, 6);
    r.line([x + width * 0.34, y + 11, x + width * 0.38, y + 31], wood, 6);
  };
  const ann = (seated = false, lightOn = true) => {
    if (seated) chair(0, 0, 62);
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 13, -53);
      c.bezierCurveTo(side * 73, -145, side * 94, -67, side * 41, -14);
      c.quadraticCurveTo(side * 22, -21, side * 13, -53);
      c.closePath();
      c.fillStyle = tint ?? plum;
      c.fill();
      c.strokeStyle = cream;
      c.lineWidth = 2;
      c.stroke();
      r.line([side * 24, -50, side * 55, -80], lilac, 3);
      r.round(side < 0 ? -58 : 34, -68, 25, 19, 4, lilac);
      r.line([side * 49, -62, side * 40, -62], cream, 2);
    }
    r.round(-20, -57, 40, 57, 15, plum, ink);
    r.round(-15, -39, 30, 28, 7, cream);
    r.line([-11, -1, -17, 14], ink, 5);
    r.line([11, -1, 17, 14], ink, 5);
    r.circle(0, -75, 26, cream);
    r.line([-11, -98, -18, -117, -28, -121], ink, 2.5);
    r.line([11, -98, 18, -117, 28, -121], ink, 2.5);
    r.circle(-28, -121, 4, gold);
    r.circle(28, -121, 4, gold);
    r.face(0, -78, 0.75, happy || seated);
    r.round(-23, -89, 20, 16, 5, "#ffffff22", ink);
    r.round(3, -89, 20, 16, 5, "#ffffff22", ink);
    r.line([-3, -82, 3, -82], ink, 2);
    r.line([-17, -43, -36, -21], cream, 5);
    r.line([17, -43, 36, -24], cream, 5);
    r.round(18, -54, 39, 54, 5, wood, ink);
    r.round(22, -47, 31, 41, 2, cream);
    r.round(29, -58, 18, 9, 3, teal, ink);
    r.line([28, -33, 45, -33, 28, -23, 45, -23], plum, 2);
    // Only the final ordinary-tomorrow tableau switches this emergency light off.
    r.circle(47, -52, 6, lightOn ? gold : stone);
    if (lightOn) {
      r.line([52, -61, 57, -66], gold, 2);
      r.line([58, -51, 64, -51], gold, 2);
    }
  };
  const pony = (which: number, napkin = false) => {
    const coats = [coral, blue, lilac, green];
    const manes = [gold, teal, plum, wood];
    const coat = coats[which]!;
    const mane = manes[which]!;
    r.line([-41, -57, -66, -70, -71, -45], mane, 10);
    oval(-5, -49, 47, 30, coat);
    for (const [i, x] of [-31, -11, 15, 36].entries()) {
      r.round(x - 6, -26, 12, 27, 5, i % 2 ? mane : coat);
      r.round(x - 8, -7, 17, 9, 3, ink);
    }
    r.round(22, -94, 31, 63, 15, coat);
    r.circle(36, -90, 25, coat);
    r.round(40, -85, 36, 23, 11, coat, ink);
    r.round(18, -125, 12, 30, 6, coat, ink);
    r.round(41, -122, 12, 28, 6, coat, ink);
    r.circle(43, -94, 3.4, ink);
    r.circle(65, -75, 2.5, ink);
    r.line([47, -70, 57, -68, 64, -71], ink, 2);
    for (const [x, y] of [[18, -98], [13, -82], [14, -63]]) r.circle(x, y, 12, mane);
    if (which === 0) {
      r.round(-24, -63, 39, 24, 6, blue);
      r.circle(-5, -51, 8, cream);
      r.line([-5, -57, -5, -51, 0, -49], ink, 2);
      if (napkin) {
        c.beginPath();
        c.moveTo(18, -66);
        c.lineTo(54, -62);
        c.lineTo(33, -36);
        c.closePath();
        c.fillStyle = cream;
        c.fill();
        r.line([28, -60, 40, -58], coral, 2);
      }
    } else if (which === 1) {
      for (const [x, y] of [[-25, -55], [-8, -45], [6, -60]]) r.circle(x, y, 5, cream);
      r.line([-18, -69, -10, -95], wood, 5);
      oval(-8, -99, 8, 12, cream);
    } else if (which === 2) {
      r.round(-28, -64, 49, 29, 6, cream);
      for (const x of [-21, -7, 7]) r.line([x, -59, x + 4, -40], lilac, 4);
      c.beginPath();
      c.moveTo(17, -109);
      c.quadraticCurveTo(32, -139, 61, -117);
      c.lineTo(40, -108);
      c.closePath();
      c.fillStyle = plum;
      c.fill();
      r.circle(62, -117, 6, cream);
    } else {
      r.round(-27, -68, 42, 30, 4, wood, ink);
      r.line([-18, -60, 6, -60], cream, 2);
      r.line([-18, -48, 6, -48], cream, 2);
      r.round(17, -117, 43, 10, 4, teal, ink);
    }
  };
  const giant = (host = false) => {
    r.round(-22, -14, 19, 15, 6, stone, ink);
    r.round(3, -14, 19, 15, 6, stone, ink);
    r.round(-27, -58, 54, 52, 15, stone, ink);
    r.round(-28, -92, 56, 46, 13, stone, ink);
    r.line([-16, -87, -9, -79, -15, -70], wood, 2);
    r.face(0, -70, 0.68, true);
    r.line([-24, -41, -43, host ? -53 : -23], stone, 11);
    r.line([24, -41, 43, host ? -52 : -23], stone, 11);
    if (host) {
      r.round(-20, -44, 40, 32, 5, cream);
      label("HOST", 0, -28, 11);
    }
  };
  const littleCup = (x: number, y: number, scale = 1) => {
    at(x, y, scale, () => {
      r.round(13, -23, 19, 19, 6, cream, teal);
      r.round(-20, -34, 40, 35, 9, cream, wood);
      oval(0, -33, 18, 4, teal);
    });
  };
  const envelope = () => {
    if (happy) {
      c.beginPath();
      c.moveTo(-39, -50);
      c.lineTo(0, -75);
      c.lineTo(39, -50);
      c.closePath();
      c.fillStyle = cream;
      c.fill();
      r.round(-31, -66, 62, 51, 3, cream, wood);
      label("INVITED", 0, -58, 10);
      r.line([-19, -34, 19, -34], coral, 2);
    }
    r.round(-40, -50, 80, 55, 5, cream, wood);
    r.line([-38, 1, 0, -22, 38, 1], teal, 2);
    if (!happy) {
      r.line([-38, -46, 0, -18, 38, -46], teal, 2);
      r.circle(0, -18, 9, coral);
      r.line([-4, -18, 4, -18], cream, 2);
    }
  };
  const walrus = () => {
    oval(0, -42, 65, 48, wood);
    oval(-52, -9, 30, 12, wood);
    oval(52, -9, 30, 12, wood);
    r.circle(0, -77, 39, stone);
    r.circle(-12, -87, 4, ink);
    r.circle(12, -87, 4, ink);
    oval(0, -63, 29, 18, cream);
    r.circle(0, -70, 8, ink);
    for (const side of [-1, 1]) {
      r.line([side * 13, -56, side * 15, -24, side * 21, -30], cream, 8);
      for (const dy of [-8, 0, 8]) r.line([side * 17, -62, side * 43, -62 + dy], ink, 1.5);
    }
    if (happy) {
      r.line([-50, -28, -18, -19], wood, 14);
      r.line([50, -28, 18, -19], wood, 14);
      r.round(-21, -46, 42, 15, 4, teal);
      label("GUEST", 0, -38, 10, cream);
    }
  };
  const bowl = (height: number, mug: boolean) => {
    const top = -height * 0.75;
    if (mug) r.round(58, top + 12, 37, height - 25, 12, cream, wood);
    // The engine paints the actual liquid over this empty vessel interior.
    r.round(-70, top, 140, height, 17, cream, wood);
    r.line([-69, top, 69, top], teal, 3);
    r.line([-56, top + height - 7, 56, top + height - 7], gold, 3);
  };
  const clasp = (x: number, y: number) => {
    r.round(x - 24, y - 20, 48, 40, 6, gold, wood);
    r.round(x - 12, y - 12, 24, 24, 4, cream, wood);
    r.line([x, y - 15, x, y + 12], wood, 4);
  };

  if (kind === "annmoth") ann();
  else if (kind === "breakfastpony") pony(0, happy);
  else if (kind === "spoonpony") pony(1);
  else if (kind === "laundrypony") pony(2);
  else if (kind === "trainpony") pony(3);
  else if (kind === "pocketgiant") giant();
  else if (kind === "schedulingnotice") {
    plaque(0, -155, 350, 95, plum);
    label("END OF THE", 0, -129, 23, cream);
    label("WORLD?", 0, -92, 37, cream);
    plaque(0, -30, 190, 50);
    if (happy) {
      label("REGARDS,", 0, -16, 14);
      label("SCHEDULING", 0, 5, 18);
    } else r.line([-68, -8, 68, -8], lilac, 4);
  } else if (kind === "breakfastservice") {
    at(-154, 0, 0.68, () => pony(0, happy));
    r.round(-91, -79, 122, 49, 18, cream, wood);
    oval(-30, -78, 59, 9, gold);
    for (const [x, y] of [[-63, -79], [-39, -77], [-13, -79], [10, -75]]) r.circle(x, y, 4, wood);
    r.line([-4, 123, 7, 78], wood, 6);
    oval(7, 77, 9, 14, cream);
    if (happy) caption("THE PONY OF REASONABLY SOON", -25, 25, 14);
    else {
      r.line([-228, 5, -228, -126], wood, 4);
      r.round(-225, -124, 94, 37, 4, plum);
      label("EVENTUALLY", -178, -105, 11, cream);
    }
  } else if (kind === "marshmallowmeteor") {
    oval(0, -66, 86, 13, stone);
    r.line([-61, -62, -56, 7], wood, 5);
    r.line([61, -62, 56, 7], wood, 5);
    r.round(-43, -157, 86, 88, 30, cream, wood);
    oval(0, -153, 37, 10, "#fff9ed");
    r.line([-31, -137, -31, -96], gold, 3);
    at(100, 0, 0.57, () => giant(happy));
    if (happy) {
      r.round(-75, -60, 150, 41, 7, coral, cream);
      for (const x of [-55, -25, 5, 35, 65]) r.line([x, -55, x, -24], cream, 2);
      r.circle(77, -31, 3.5, cream);
      caption("DELICIOUSLY SAFE", 0, 34, 15);
    }
  } else if (kind === "omeninvitation") envelope();
  else if (kind === "omenmilk") bowl(70, true);
  else if (kind === "omenbowl") bowl(65, false);
  else if (kind === "krakenkettle") {
    // Each of these eight paths is one arm, with one unmistakable rounded tip.
    const tips = [[-145, -13], [-120, 29], [-97, -105], [-66, -151], [68, -151], [104, -100], [129, -24], [143, 29]];
    for (const [i, [x, y]] of tips.entries()) {
      const side = x < 0 ? -1 : 1;
      const wiggle = happy ? Math.sin(motion * 1.4 + i) * 2 : 0;
      c.beginPath();
      c.moveTo(side * 17, -99);
      c.bezierCurveTo(side * 62, -58, x - side * 24, y + 18, x, y + wiggle);
      c.strokeStyle = teal;
      c.lineWidth = 10;
      c.lineCap = "round";
      c.stroke();
      r.circle(x, y + wiggle, 6, teal);
      if (happy) littleCup(x, y + wiggle - 1, 0.38);
    }
    // This spout is enclosed by the authored ice; it never supplies fake fluid.
    r.line([-58, -33, -96, -59, -110, -89, -151, -89], wood, 19);
    r.line([-59, -34, -96, -61, -112, -89, -151, -89], cream, 13);
    r.round(62, -38, 35, 45, 12, cream, wood);
    bowl(70, false);
    r.round(-31, -142, 62, 58, 27, teal, ink);
    r.face(0, -115, 0.87, happy);
    r.round(-32, -148, 64, 11, 5, gold, wood);
    r.circle(0, -154, 6, gold);
    if (happy) {
      for (const x of [-21, 3, 26]) r.line([x, -165, x - 5, -173, x + 2, -181], cream, 3);
      caption("ENTHUSIASTIC BEVERAGE MARKETING", 0, 55, 13);
    }
  } else if (kind === "walrusinvites") walrus();
  else if (kind === "soupcounter") {
    // A flat, disconnected painted river motif: the three real basins are separate.
    r.round(-225, -24, 450, 35, 10, wood, ink);
    r.line([-213, -9, 210, -9], coral, 13);
    for (const x of [-181, -69, 44, 164]) r.line([x, 9, x, 39], wood, 7);
    at(155, -28, 0.78, () => pony(1));
    if (happy) {
      r.line([201, -62, 208, -80], wood, 3);
      oval(210, -84, 5, 7, cream);
      caption("A SMALLER SPOON, PLEASE", -58, -53, 15);
    }
  } else if (kind === "giantpicnic") {
    r.round(-213, -27, 426, 51, 9, cream, plum);
    for (const x of [-159, -54, 51, 156]) r.round(x - 42, -20, 84, 36, 5, happy ? coral : lilac);
    r.line([-96, -30, -91, -84, 91, -84, 96, -30], wood, 11);
    r.round(-98, -86, 196, 76, 14, gold, wood);
    for (const x of [-81, -50, -19, 12, 43, 74]) r.line([x, -75, x + 15, -22], cream, 2);
    if (happy) {
      clasp(-57, -64); clasp(57, -64);
      at(-116, -3, 0.64, () => giant());
      r.round(116, -122, 89, 20, 9, gold, wood);
      r.round(111, -102, 98, 17, 6, green);
      r.round(116, -85, 89, 19, 6, coral);
      r.round(111, -66, 98, 16, 6, green);
      r.round(116, -50, 89, 20, 9, gold, wood);
      caption("A SANDWICH OF CONSIDERABLE HEIGHT", 0, -205, 13);
    } else {
      clasp(-244.44, -177.78); clasp(288.89, -183.33);
      at(-116, -3, 0.64, () => giant());
    }
  } else if (kind === "shoppingchoir") {
    for (const [i, [x, y]] of [[-175, -80], [5, -80], [205, -100]].entries()) {
      const color = [coral, teal, lilac][i]!;
      r.round(x - 28, y + 18, 56, 62, 16, color, ink);
      r.line([x - 15, y + 78, x - 20, y + 92], ink, 5);
      r.line([x + 15, y + 78, x + 20, y + 92], ink, 5);
      if (i === 0) { r.circle(x - 22, y - 19, 12, color); r.circle(x + 22, y - 19, 12, color); }
      if (i === 1) r.round(x - 23, y - 36, 46, 16, 7, gold, ink);
      if (i === 2) for (const dx of [-22, 0, 22]) oval(x + dx, y - 16, 12, 22, green);
      r.circle(x, y, 27, cream);
      r.face(x, y - 3, 0.78, happy);
      if (!happy) oval(x, y + 10, 6, 9, ink);
      r.round(x - 23, y + 32, 46, 27, 3, cream, wood);
      if (happy) label(["BREAD", "APPLES", "TEA"][i]!, x, y + 46, 10);
      else r.line([x - 13, y + 44, x + 13, y + 44], plum, 2);
    }
    r.line([-195, 164, -195, 109], wood, 6);
    r.round(-252, 103, 114, 55, 6, cream, wood);
    if (happy) { label("SHOPPING", -195, 119, 13); label("IN HARMONY", -195, 142, 12); }
    else label("PROPHECY", -195, 132, 13);
  } else if (kind === "dragoncalendar") {
    plaque(-95, -160, 126, 97);
    plaque(95, -130, 126, 97);
    for (const [x, y] of [[-95, -160], [95, -130]]) {
      r.line([x - 42, y + 26, x + 42, y + 26], coral, 3);
      for (const dx of [-29, 0, 29]) for (const dy of [40, 58, 76]) r.circle(x + dx, y + dy, 3, teal);
    }
    label("CALENDAR", -95, -145, 12);
    label("TOMORROW", 95, -115, 12);
    r.prop("flintclerk", 210, -5, 0.77, happy, motion);
    if (happy) {
      r.round(-151, -119, 112, 39, 5, cream);
      label("END OF DAY", -95, -100, 14);
      c.beginPath(); c.ellipse(-95, -100, 57, 24, 0, 0, Math.PI * 2); c.strokeStyle = coral; c.lineWidth = 3; c.stroke();
      caption("A SECOND OPINION WOULD BE NICE", 0, 32, 13);
    }
  } else if (kind === "ponybed") {
    // The old workshop textile is a borrowed object, not a second courier.
    r.round(-143, -21, 287, 34, 12, wood, ink);
    r.line([-131, 8, -139, 35], wood, 7);
    r.line([132, 8, 140, 35], wood, 7);
    r.prop("dreamquilt", -15, -7, 0.77, true, motion);
    if (happy) {
      at(-8, -12, 0.8, () => pony(2));
      r.round(73, -41, 114, 38, 15, cream, plum);
      caption("ONLY LAUNDRY", 0, 57, 16);
    } else {
      at(-8, -12, 0.8, () => pony(2));
      r.round(66, -125, 124, 67, 19, cream, plum);
      r.line([80, -94, 169, -94], lilac, 3);
    }
  } else if (kind === "soupmap") {
    at(0, 0, 0.72, walrus);
    if (happy) {
      plaque(0, 15, 177, 67);
      label("DINNER DELIVERIES", 0, 34, 14);
      label("AMBASSADOR OF", 0, 54, 11);
      label("SECOND HELPINGS", 0, 69, 12);
    }
  } else if (kind === "lasttrain") {
    r.prop("myceliumcarriage", 0, -4, 1, false, motion);
    r.prop("gillsconductor", 176, 6, 0.62, happy, motion);
    if (happy) {
      at(-93, -21, 0.52, () => pony(3));
      // One formerly ominous banner is now a folded carriage picnic cloth.
      r.round(-104, -29, 136, 29, 5, plum, cream);
      for (const x of [-86, -62, -38, -14, 10]) r.line([x, -24, x, -4], cream, 2);
    } else {
      at(-210, 37, 0.61, () => pony(3));
      r.line([-250, 28, -250, -112], wood, 4);
      r.round(-247, -109, 86, 33, 4, plum);
      label("DOOM", -204, -92, 15, cream);
    }
    plaque(39, -108, 105, 76);
    label(happy ? "LAST TRAIN" : "FINAL TRAIN", 39, -87, 13);
    if (happy) { label("BEFORE", 39, -66, 12); label("SUPPER", 39, -46, 17); }
    else r.line([7, -60, 70, -60], lilac, 3);
  } else if (kind === "footnotecard") {
    plaque(0, -65, 100, 70);
    label(happy ? "PARTY" : "SMALL", 0, -44, 15);
    label(happy ? "DETAILS" : "PRINT", 0, -23, 15);
    r.line([-25, -8, 25, -8], teal, 2);
  } else if (kind === "smallprint") {
    at(-270, 30, 0.88, () => ann(happy));
    r.round(5, 75, 82, 11, 5, wood, ink);
    r.line([46, 74, 46, 35], wood, 7);
    r.round(17, 22, 59, 32, 12, happy ? gold : stone, ink);
    if (happy) {
      plaque(0, -25, 260, 45);
      label("CELEBRATION", 0, -12, 20);
      label("BRING SNACKS", 0, 7, 16);
      for (const side of [-1, 1]) r.line([46 + side * 37, 39, 46 + side * 49, 30], gold, 3);
    } else {
      plaque(0, -25, 260, 45);
      label("PLEASE REFER TO", 0, -12, 14);
      label("THE SMALL PRINT", 0, 7, 16);
    }
  } else if (kind === "doomclocktea") {
    // This clock is a still ornament. The actual three timed rings are elsewhere.
    r.round(-72, -153, 144, 130, 24, plum, ink);
    r.circle(0, -92, 55, cream);
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      r.circle(Math.cos(a) * 43, -92 + Math.sin(a) * 43, 2.5, ink);
    }
    r.line([0, -127, 0, -92, 27, -80], ink, 4);
    r.circle(0, -92, 5, coral);
    at(-35, 19, 0.67, () => giant(happy));
    if (happy) {
      littleCup(49, 10, 0.83);
      r.round(-7, -33, 37, 29, 11, cream, wood);
      r.line([26, -21, 44, -12], cream, 7);
      r.line([-4, -34, 4, -39, 18, -37], wood, 3);
      for (const x of [41, 51, 62]) r.line([x, -24, x - 3, -32, x + 2, -40], cream, 2);
      caption("TEA CHIME", 0, 50, 17);
    }
  } else if (kind === "warningpennant" || kind === "souppennant" || kind === "skullpennant") {
    r.line([-66, 2, -66, -173, 66, -173], wood, 5);
    c.beginPath();
    c.moveTo(-61, -168); c.lineTo(61, -168); c.lineTo(61, -38);
    c.lineTo(0, -17); c.lineTo(-61, -38); c.closePath();
    c.fillStyle = happy ? cream : tint ?? plum; c.fill();
    c.strokeStyle = gold; c.lineWidth = 3; c.stroke();
    if (kind === "skullpennant") {
      r.circle(0, -110, 31, happy ? stone : cream);
      r.round(-20, -92, 40, 28, 6, happy ? stone : cream);
      r.circle(-11, -114, 6, ink); r.circle(11, -114, 6, ink);
      r.line([-11, -87, -3, -81, 4, -81, 12, -87], ink, 3);
      if (happy) label("STILL ME", 0, -45, 13);
    } else if (kind === "warningpennant") {
      label(happy ? "BE HERE" : "BEWARE", 0, -114, 20, happy ? ink : cream);
      if (happy) r.face(0, -69, 0.55, true);
    } else {
      label(happy ? "ABUNDANT" : "ABANDON", 0, -119, 16, happy ? ink : cream);
      label(happy ? "SOUP" : "HOPE", 0, -86, 23, happy ? ink : cream);
      if (happy) r.line([-21, -56, 0, -48, 21, -56], teal, 3);
    }
  } else if (kind === "giantservice") {
    // The initially detached stool is exactly beneath its authored ice block.
    const sx = happy ? -15 : -120;
    const sy = happy ? -15 : -7;
    r.round(sx - 39, sy - 44, 78, 15, 6, wood, ink);
    r.line([sx - 28, sy - 32, sx - 32, sy + 15], wood, 7);
    r.line([sx + 28, sy - 32, sx + 32, sy + 15], wood, 7);
    at(-15, happy ? sy - 45 : -5, 0.62, () => giant(happy));
    if (happy) {
      plaque(0, -215, 205, 43);
      label("ASK THE SMALL HOST", 0, -194, 15);
      // A tall guest bends at the waist; their cup remains the real engine basin.
      r.line([154, -17, 149, -78, 102, -91], plum, 24);
      r.line([143, -20, 129, 16], ink, 6);
      r.line([162, -20, 175, 16], ink, 6);
      r.circle(89, -92, 24, cream);
      r.face(86, -93, 0.65, true);
      r.line([117, -64, 92, -39], plum, 9);
    }
  } else if (kind === "ponyerrands") {
    const names = ["BREAKFAST", "NAPS", "SNACKS", "COMPANY"];
    for (const [i, x] of [-186, -62, 62, 186].entries()) {
      at(x, -22, 0.59, () => pony(i));
      r.line([x - 47, -1, x - 47, -167], wood, 3);
      r.round(x - 47, -167, 104, 30, 4, happy ? cream : plum, gold);
      if (happy) label(names[i]!, x + 5, -152, 12);
      else label("AN OMEN", x + 5, -152, 12, cream);
    }
    // The one bun tray is present beneath its own ice, not another phantom task.
    r.round(-271, 79, 98, 11, 5, wood, ink);
    for (const [x, y] of [[-251, 57], [-222, 57], [-193, 57]]) {
      r.round(x - 13, y - 10, 26, 28, 11, gold, wood);
      r.line([x - 7, y - 1, x + 6, y - 5], cream, 2);
    }
  } else if (kind === "reassuringsky") {
    // The enormous open face surrounds the real optics: no opaque sky panel,
    // no invented stars, no decorative rays, and no unearned smile.
    if (happy) {
      for (const x of [-280, 310]) {
        oval(x, -245, 27, 17, cream);
        r.line([x - 16, -242, x - 7, -251, x + 7, -251, x + 16, -242], ink, 4);
      }
      r.line([-180, 45, -90, 65, 0, 72, 110, 62, 200, 40], cream, 12);
      r.line([-180, 45, -90, 65, 0, 72, 110, 62, 200, 40], ink, 4);
      r.circle(80, 75, 7, gold);
      r.circle(83, 72, 1.8, wood);
      r.circle(92, 81, 3, gold);
    }
  } else if (kind === "quietguests") {
    for (const [i, x] of [-238, 238].entries()) {
      if (happy) chair(x, 0, 63);
      const color = i ? blue : coral;
      r.round(x - 26, -57, 52, 57, 18, color, ink);
      r.circle(x, -82, 29, cream);
      if (i === 0) { r.circle(x - 22, -105, 13, coral); r.circle(x + 22, -105, 13, coral); }
      else { r.line([x - 14, -109, x - 20, -128], teal, 5); r.line([x + 14, -109, x + 20, -128], teal, 5); }
      r.face(x, -84, 0.8, happy);
      if (!happy) {
        r.round(x + 27, -29, 36, 35, 6, wood, ink);
        r.line([x + 36, -28, x + 37, -38, x + 53, -38, x + 55, -28], ink, 3);
      }
    }
    if (happy) {
      plaque(266, -175, 95, 37);
      label("EXIT →", 266, -156, 17);
      caption("A CHAIR NEAR THE DOOR", 0, -190, 15);
    }
  } else if (kind === "datesign") {
    plaque(0, -75, 180, 80);
    label(happy ? "SEE YOU" : "END OF", 0, -52, 23);
    label(happy ? "TOMORROW" : "THE DAY", 0, -19, 24);
  } else if (kind === "tomorrowparty") {
    // Each actor appears once. Ann actually sits; her clipboard lamp is off.
    for (const [i, x] of [-247, -140, 100, 208].entries()) {
      chair(x, -17, 48);
      at(x, -18, 0.53, () => pony(i));
    }
    at(-70, -18, 0.67, () => ann(happy, !happy));
    r.round(-277, -14, 554, 34, 12, wood, ink);
    r.line([-247, 19, -247, 53], wood, 9);
    r.line([247, 19, 247, 53], wood, 9);
    for (const x of [-220, -112, -3, 106, 217]) oval(x, -10, 28, 7, cream);
    if (happy) {
      for (const x of [-220, -112, -3, 106, 217]) {
        r.round(x - 17, -23, 34, 12, 6, gold, wood);
        r.circle(x + 5, -21, 2, coral);
      }
      at(294, 18, 0.55, () => giant(true));
      caption("A PERFECTLY ORDINARY TOMORROW", 0, -125, 16);
    } else at(294, 18, 0.55, () => giant());
  } else return false;
  return true;
}
