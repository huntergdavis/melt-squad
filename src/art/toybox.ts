import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Original toy-scale illustrations. Real ballast, seesaw poses, orbital arms
// and liquid belong to the engine. Decorative reveals never drive physics.
export function drawToybox(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
  _progress?: number,
): boolean {
  const c = r.ctx;
  const ink = "#4c4c64";
  const cream = "#fff0d5";
  const cloth = "#d8b99b";
  const wood = "#bd8e68";
  const coral = "#d58e8e";
  const teal = "#80aaa6";
  const blue = "#a9c7d6";
  const lilac = "#b5a2c5";
  const gold = "#efca73";
  const green = "#a9bd91";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;
  const label = (s: string, x: number, y: number, size = 15, color = ink) => {
    c.font = `bold ${size}px system-ui`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = color;
    c.fillText(s, x, y);
  };
  const caption = (s: string, x: number, y: number, size = 15) => {
    c.save();
    c.font = `bold ${size}px system-ui`;
    const width = Math.ceil(c.measureText(s).width) + 12;
    const height = size + 6;
    r.round(x - width / 2, y - height / 2, width, height, 4, cream);
    label(s, x, y, size, ink);
    c.restore();
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
  const star = (x: number, y: number, size: number, color = gold) => {
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 ? size * 0.51 : size;
      const px = x + Math.cos(a) * radius;
      const py = y + Math.sin(a) * radius;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.closePath();
    c.fillStyle = color;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 2;
    c.stroke();
  };
  const stitch = (x: number, y: number, color = cream, size = 4) => {
    r.line([x - size, y - size, x + size, y + size], color, 1.8);
    r.line([x + size, y - size, x - size, y + size], color, 1.8);
  };
  const plaque = (
    x: number,
    y: number,
    width: number,
    height: number,
    color = cream,
  ) => {
    r.round(x - width / 2, y, width, height, 7, color, wood);
    for (const px of [x - width / 2 + 9, x + width / 2 - 9]) {
      r.circle(px, y + 9, 2.5, wood);
    }
  };
  const badge = (x: number, y: number, scale = 1, patched = false) => {
    at(x, y, scale, () => {
      c.beginPath();
      c.moveTo(-23, -24);
      c.lineTo(23, -24);
      c.lineTo(20, 8);
      c.lineTo(0, 25);
      c.lineTo(-20, 8);
      c.closePath();
      c.fillStyle = cream;
      c.fill();
      c.strokeStyle = wood;
      c.lineWidth = 3;
      c.stroke();
      if (patched) {
        r.circle(0, -1, 12, coral);
        stitch(0, -1, cream, 7);
      } else star(0, -2, 11, teal);
    });
  };
  const button = (
    pose: "usual" | "welcome" | "seated" | "modest" = "usual",
  ) => {
    r.round(-27, -157, 20, 73, 10, cloth, ink);
    r.round(-21, -149, 8, 42, 4, coral);
    c.beginPath();
    c.moveTo(9, -105);
    c.quadraticCurveTo(5, -164, 27, -160);
    c.quadraticCurveTo(44, -158, 35, -139);
    c.lineTo(25, -125);
    c.lineTo(29, -103);
    c.closePath();
    c.fillStyle = cloth;
    c.fill();
    c.strokeStyle = ink;
    c.lineWidth = 3;
    c.stroke();
    r.line([19, -141, 26, -151, 30, -147], coral, 5);
    r.round(-29, -66, 58, 56, 21, tint ?? cloth, ink);
    oval(0, -31, 18, 20, cream);
    if (pose === "seated") {
      r.round(-38, -17, 32, 17, 8, cloth);
      r.round(6, -17, 32, 17, 8, cloth);
      r.line([-22, -21, -37, -14], cloth, 13);
      r.line([22, -21, 37, -14], cloth, 13);
    } else {
      r.round(-25, -19, 21, 19, 8, cloth);
      r.round(4, -19, 21, 19, 8, cloth);
    }
    r.circle(0, -89, 34, cloth);
    // One seeing eye. The other is a sewn patch, never a second eye dot.
    r.circle(-12, -94, 4.2, ink);
    r.circle(13, -93, 11, coral);
    stitch(13, -93, cream, 6);
    oval(0, -80, 5, 3.5, ink);
    r.line([0, -78, 0, -73, -7, -69], ink, 2);
    r.line([0, -73, 7, -69], ink, 2);
    r.circle(-23, -80, 5, coral);
    for (const y of [-54, -42, -30]) stitch(-23, y, cream, 2.7);
    r.line([-27, -53, -49, happy && pose !== "seated" ? -76 : -34], cloth, 11);
    const endX = pose === "welcome" && happy ? 68 : 50;
    const endY =
      pose === "welcome" && happy
        ? -58
        : happy && pose !== "seated"
          ? -77
          : -34;
    r.line([27, -53, endX, endY], cloth, 11);
    if (pose !== "modest") badge(0, -49, 0.4);
    else r.round(-14, -59, 28, 16, 4, teal);
  };
  const glim = (guide = false) => {
    r.line([35, -57, 61, -57], wood, 5);
    oval(60, -66, 8, 8, wood);
    oval(60, -48, 8, 8, wood);
    oval(60, -66, 3, 3, cream);
    oval(60, -48, 3, 3, cream);
    star(0, -53, 47, tint ?? gold);
    r.round(-23, -16, 20, 16, 5, teal);
    r.round(3, -16, 20, 16, 5, teal);
    r.line([-18, -8, -8, -8], cream, 2);
    r.line([8, -8, 18, -8], cream, 2);
    if (guide || happy) {
      r.face(0, -56, 0.78, true);
      r.line([-45, -48, -54, -66], gold, 6);
      r.line([42, -48, 50, -70], gold, 6);
    } else {
      r.face(0, -48, 0.7, true);
      r.line([-29, -26, -10, -30], gold, 5);
      r.line([29, -26, 10, -30], gold, 5);
    }
    if (guide) {
      for (const [x, y] of [
        [-51, -98],
        [45, -112],
        [0, -126],
      ]) {
        r.line([x * 0.89, -53 + (y + 53) * 0.86, x, y], cream, 3);
      }
    }
  };
  const jun = (regret = false) => {
    r.line([-34, -36, -52, -36], wood, 5);
    oval(-52, -44, 7, 7, wood);
    oval(-52, -28, 7, 7, wood);
    oval(0, -30, 36, 26, tint ?? teal);
    oval(-5, -28, 21, 14, blue);
    r.circle(25, -62, 24, teal);
    r.round(41, -65, 31, 12, 5, gold, ink);
    r.circle(30, -67, 3.6, ink);
    r.circle(36, -59, 4, coral);
    r.line([-19, -7, -24, -2, -8, -2], gold, 6);
    r.line([16, -7, 21, -2, 34, -2], gold, 6);
    for (const x of [-20, -5, 10]) r.circle(x, -15, 2, cream);
    r.line([-12, -39, 3, -47, 13, -36], chromeColor(), 2);
    if (regret) {
      r.line([47, -60, 65, -61], ink, 2);
      r.line([35, -76, 26, -78], ink, 2);
    }
  };
  function chromeColor() {
    return "#d3ded5";
  }
  const wheel = (x: number, y: number, size = 19) => {
    r.circle(x, y, size, ink);
    r.circle(x, y, size - 5, wood);
    r.circle(x, y, 4, cream);
  };
  const biscuit = (x: number, y: number, size: number, cardboard = false) => {
    r.circle(x, y, size, cardboard ? wood : gold);
    c.beginPath();
    c.arc(x, y, size - 4, 0, Math.PI * 2);
    c.strokeStyle = cardboard ? cloth : wood;
    c.lineWidth = 2;
    c.stroke();
    for (const [dx, dy] of [
      [-0.35, -0.3],
      [0.3, -0.25],
      [0, 0.25],
    ]) {
      r.circle(x + dx * size, y + dy * size, Math.max(2, size * 0.09), wood);
    }
    if (cardboard) {
      for (const yOffset of [-5, 1, 7])
        r.line(
          [x - size + 3, y + yOffset, x - size + 11, y + yOffset],
          cream,
          1.5,
        );
    }
  };
  const doll = (x: number, y: number, color: string, hat: number) => {
    at(x, y, 1, () => {
      r.round(-23, -49, 46, 45, 12, color, ink);
      r.line([-13, -6, -17, 4], wood, 5);
      r.line([13, -6, 17, 4], wood, 5);
      r.circle(0, -67, 24, cream);
      r.face(0, -70, 0.63, true);
      if (hat === 0) {
        oval(0, -90, 67, 14, coral);
        r.round(-31, -132, 62, 44, 13, coral, ink);
        star(0, -118, 9, cream);
      } else if (hat === 1) {
        oval(0, -91, 63, 14, teal);
        r.round(-35, -137, 70, 47, 10, teal, ink);
        r.line([-31, -106, 30, -106], gold, 7);
      } else {
        c.beginPath();
        c.moveTo(-65, -88);
        c.lineTo(0, -149);
        c.lineTo(65, -88);
        c.closePath();
        c.fillStyle = lilac;
        c.fill();
        r.line([-58, -89, 58, -89], cream, 5);
      }
      r.line([-22, -34, -36, happy ? -25 : -45], cream, 6);
      r.line([22, -34, 36, happy ? -25 : -45], cream, 6);
    });
  };

  if (kind === "captainbutton") button();
  else if (kind === "buttonseated") button("seated");
  else if (kind === "glimstar") glim();
  else if (kind === "junduck") jun();
  else if (kind === "cardboardbadge") {
    badge(0, -40, 1.45);
    if (happy) caption("OPERATIONAL", 0, 17, 15);
  } else if (kind === "toyfireengine") {
    // One48px wooden block, exactly once at the earned reveal; never time-driven.
    for (let i = 0; i < 6; i++) {
      const x = -144 + i * 48;
      r.round(x, 2, 48, 24, 3, i % 2 ? cloth : wood, ink);
      r.line([x + 7, 18, x + 31, 18], cream, 2);
    }
    at(happy ? 48 : 0, 0, 1, () => {
      r.round(-105, -67, 207, 42, 8, coral, ink);
      r.round(24, -103, 74, 53, 8, coral, ink);
      r.round(41, -94, 45, 29, 5, blue, ink);
      r.line([-95, -86, 10, -86, 10, -73, -95, -73, -95, -86], wood, 4);
      for (const x of [-76, -55, -34, -13]) r.line([x, -86, x, -73], cream, 3);
      wheel(-60, -17, 19);
      wheel(62, -17, 19);
      at(-35, -68, 0.54, () => jun());
      r.circle(100, -48, 6, gold);
    });
    if (happy) caption("ONE BLOCK. STATION OPEN.", 0, -145, 16);
  } else if (kind === "buttonwelcome") {
    at(-78, 0, 0.95, () => button("welcome"));
    at(92, 0, 0.92, () => glim());
    if (happy) {
      plaque(7, -188, 253, 33);
      label("THERE'S ROOM ON THE CREW", 7, -171, 14);
    }
  } else if (kind === "dollteasummit") {
    doll(-147, -14, lilac, 0);
    doll(0, -14, coral, 1);
    doll(147, -14, teal, 2);
    r.round(-214, -20, 428, 22, 8, wood, ink);
    r.line([-185, 2, -185, 26], wood, 8);
    r.line([185, 2, 185, 26], wood, 8);
    // One shared teapot inside the separate real WARM station, not another cup.
    c.beginPath();
    c.ellipse(-43, 88, 24, 19, 0, Math.PI / 2, Math.PI * 1.5);
    c.strokeStyle = teal;
    c.lineWidth = 7;
    c.stroke();
    c.beginPath();
    c.moveTo(38, 84);
    c.lineTo(70, 72);
    c.quadraticCurveTo(67, 101, 38, 110);
    c.closePath();
    c.fillStyle = cream;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 3;
    c.stroke();
    oval(0, 90, 47, 26, cream);
    c.strokeStyle = wood;
    c.lineWidth = 3;
    c.stroke();
    r.round(-26, 59, 52, 9, 4, teal, wood);
    r.circle(0, 56, 6, gold);
    r.line([-28, 91, 28, 91], teal, 3);
    star(0, 89, 9, gold);
    if (happy) {
      for (const x of [-16, 16])
        r.line([x, 47, x - 5, 39, x + 3, 31], cream, 2.5);
      biscuit(-94, -33, 14, true);
      biscuit(0, -33, 14, true);
      biscuit(94, -33, 14, true);
      at(245, 4, 0.68, () => jun(true));
      biscuit(286, -36, 12, true);
      caption("A CARDBOARD AFTERTASTE.", 219, 28, 12);
    }
  } else if (kind === "glimperch") {
    glim(happy);
    if (happy) {
      for (const x of [-31, 0, 31]) stitch(x, -5, cream, 3);
      caption("RESCUERS MAY BE RESCUED", 0, -145, 14);
    }
  } else if (kind === "marblesoup") {
    const guests: readonly (readonly [number, number, string])[] = [
      [-139, -31, coral],
      [-88, -12, blue],
      [89, -12, lilac],
      [139, -31, green],
      [0, -118, gold],
    ];
    for (const [x, y, color] of guests) {
      r.circle(x, y, 25, color);
      r.line([x - 15, y - 12, x + 4, y - 19], "#ffffffaa", 3);
      r.face(x, y - 4, 0.56, true);
    }
    r.round(-62, -68, 124, 64, 17, teal, ink);
    oval(0, -69, 61, 11, cream);
    r.line([-60, -46, -80, -46], ink, 6);
    r.line([60, -46, 80, -46], ink, 6);
    r.round(-27, -152, 54, 15, 5, cream);
    for (const x of [-16, 0, 16]) r.circle(x, -155, 12, cream);
    plaque(0, 10, 254, 31);
    label(happy ? "SOUP FOR MARBLES" : "MARBLE SOUP?", 0, 26, 17);
    if (happy) {
      for (const x of [-24, 0, 24]) {
        r.line([x, -81, x - 6, -90, x + 4, -101], cream, 2.5);
      }
    }
  } else if (kind === "longdog") {
    const dogShift = happy ? -26 : 0;
    at(dogShift, 0, 1, () => {
      r.round(-204, -64, 402, 48, 22, wood, ink);
      r.circle(-208, -70, 34, cloth);
      r.round(-247, -75, 47, 26, 11, cloth, ink);
      oval(-190, -68, 15, 36, coral);
      r.circle(-220, -81, 4, ink);
      r.circle(-248, -64, 6, ink);
      for (const x of [-152, -59, 41, 151]) wheel(x, -15, 15);
      r.line([194, -48, 223, -68, 221, -92], wood, 9);
      r.line([-250, -64, -289, -40], cream, 2);
      for (const x of [-127, 2, 123]) stitch(x, -39, cream, 4);
    });
    at(278, 0, 0.62, () => glim(happy));
    if (happy) {
      plaque(139, -151, 242, 43);
      label("REAR-END NAVIGATION", 139, -138, 15);
      label("OFFICER", 139, -121, 13);
    }
  } else if (kind === "toyxylophone") {
    r.round(-190, -17, 380, 27, 7, wood, ink);
    const colors = [coral, gold, teal, lilac];
    colors.forEach((color, i) => {
      const x = -185 + i * 100;
      r.round(x, -94 + i * 7, 70, 83 - i * 7, 6, color, ink);
      r.circle(x + 35, -82 + i * 7, 3.5, cream);
      if (happy) label(String(i + 1), x + 35, -44, 22);
    });
    if (happy) {
      for (const [i, x] of [-150, -50, 50, 150].entries()) {
        r.line([x, -124 - (i % 2) * 13, x, -143 - (i % 2) * 13], gold, 3);
        oval(x - 4, -123 - (i % 2) * 13, 6, 4, gold);
      }
    }
  } else if (kind === "snowexplorer") {
    c.beginPath();
    c.arc(-70, -76, 62, Math.PI, Math.PI * 2);
    c.strokeStyle = blue;
    c.lineWidth = 4;
    c.stroke();
    r.round(-137, -24, 134, 24, 6, wood, ink);
    if (!happy) {
      at(-69, -26, 0.52, () => {
        r.round(-20, -40, 40, 40, 9, coral, ink);
        r.circle(0, -61, 26, cream);
        r.face(0, -64, 0.58, true);
        r.line([19, -29, 38, -51], coral, 6);
      });
    } else {
      r.circle(83, -52, 53, cream);
      star(83, -53, 22, teal);
      for (const [x, y] of [
        [44, -82],
        [122, -80],
        [117, -19],
        [46, -21],
      ])
        r.line([83, -53, x, y], teal, 3);
      at(-11, -4, 0.67, () => {
        r.round(-20, -40, 40, 40, 9, coral, ink);
        r.circle(0, -61, 26, cream);
        r.face(0, -64, 0.58, true);
        r.line([19, -29, 44, -42], coral, 6);
      });
      r.round(-122, -78, 76, 47, 3, cream, lilac);
      r.line([-112, -48, -98, -65, -76, -48, -55, -64], teal, 2);
      caption("BIGGER GLOBE", 80, 19, 14);
    }
  } else if (kind === "stringrocket") {
    const lift = happy ? -34 : 0;
    const boot = (x: number, y: number) => {
      r.round(x - 14, y - 34, 28, 44, 8, lilac, ink);
      r.round(x - 14, y - 7, 45, 19, 7, lilac, ink);
      star(x, y - 23, 5, gold);
    };
    // One plainly visible taut string connects the actual illustrated nose.
    r.line([0, -223, 0, -167 + lift], cream, 3);
    r.round(-25, -231, 50, 10, 4, wood, ink);
    at(0, lift, 1, () => {
      r.round(-44, -125, 88, 104, 8, cloth, ink);
      c.beginPath();
      c.moveTo(-44, -124);
      c.lineTo(0, -167);
      c.lineTo(44, -124);
      c.closePath();
      c.fillStyle = coral;
      c.fill();
      r.circle(0, -88, 22, blue);
      r.circle(0, -88, 15, ink);
      r.line([-35, -52, 35, -52], cream, 3);
      if (happy) for (const x of [-37, 37]) boot(x, 0);
      label("UP, PLEASE", 0, -63, 11);
    });
    // Preparation cases centered355/665; launch attaches those same two boots.
    if (!happy) for (const x of [-155, 155]) boot(x, -87);
    if (happy) {
      plaque(0, 17, 247, 31);
      label("ADVANCED STRING PROPULSION", 0, 33, 13);
    }
  } else if (kind === "crayongarden") {
    const colors = [blue, gold, coral];
    colors.forEach((color, i) => {
      const x = -105 + i * 99;
      r.round(x - 15, -67, 30, 65, 4, color, ink);
      r.line([x - 13, -14, x + 13, -14], cream, 3);
      c.beginPath();
      c.moveTo(x - 14, -67);
      c.lineTo(x, -93);
      c.lineTo(x + 14, -67);
      c.closePath();
      c.fillStyle = color;
      c.fill();
      if (happy) {
        r.line([x, -80, x, -116], green, 5);
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI) / 3;
          r.circle(x + Math.cos(a) * 15, -121 + Math.sin(a) * 15, 10, color);
        }
        r.circle(x, -121, 9, cream);
        r.face(x, -124, 0.32, true);
        caption("BUTTON", x, 16, 13);
      }
    });
    // The established preschool guest, not another new species or named NPC.
    r.prop("ankylosaur", 191, 1, 0.69, happy, motion);
  } else if (kind === "mittenghost") {
    if (happy) {
      r.round(-66, -38, 123, 48, 22, lilac, ink);
      r.round(37, -59, 30, 39, 13, lilac, ink);
      r.round(-70, -28, 23, 42, 5, teal, ink);
      for (const x of [-63, -56]) r.line([x, -24, x, 10], cream, 2);
      r.round(-39, -59, 80, 37, 17, cream, ink);
      r.line([-18, -45, -12, -42, -6, -45], ink, 2);
      r.line([9, -45, 15, -42, 21, -45], ink, 2);
      r.circle(-25, -35, 4, coral);
      r.circle(26, -35, 4, coral);
      caption("LIGHT ON, PLEASE", 0, -88, 15);
    } else {
      r.round(-27, -111, 53, 89, 19, cream, ink);
      r.round(-27, -43, 83, 31, 13, cream, ink);
      r.round(-31, -115, 61, 20, 5, lilac, ink);
      r.face(0, -64, 0.73, true);
      r.line([-25, -56, -45, -47], cream, 7);
    }
  } else if (kind === "mooncheese") {
    r.circle(48, -154, 37, gold);
    for (const [x, y, radius] of [
      [34, -165, 6],
      [62, -145, 9],
      [34, -136, 4],
    ])
      r.circle(x, y, radius, cloth);
    r.round(-144, -14, 295, 19, 5, wood, ink);
    at(33, -76, 1, () => {
      c.save();
      c.rotate(-0.69);
      r.round(-48, -13, 96, 26, 8, teal, ink);
      r.round(34, -17, 18, 34, 4, cream, ink);
      c.restore();
      r.line([0, 0, -25, 60], wood, 5);
      r.line([0, 0, 25, 60], wood, 5);
    });
    at(-107, -17, 1, () => {
      r.line([-15, -5, -36, 6, -49, -6], coral, 3);
      oval(0, -21, 22, 27, cloth);
      r.circle(0, -57, 24, cloth);
      r.circle(-18, -77, 14, cloth);
      r.circle(18, -77, 14, cloth);
      r.circle(-18, -77, 8, coral);
      r.circle(18, -77, 8, coral);
      r.face(0, -59, 0.53, true);
      r.line([17, -30, happy ? 50 : 32, happy ? -7 : -44], cloth, 6);
    });
    c.beginPath();
    c.moveTo(-60, -17);
    c.lineTo(-19, -17);
    c.lineTo(-21, -48);
    c.closePath();
    c.fillStyle = gold;
    c.fill();
    r.circle(-32, -28, 4, cloth);
    if (happy) caption("INTERDISCIPLINARY RESEARCH", 0, 18, 15);
  } else if (kind === "repairqueue") {
    const helmet = (x: number, y: number) => {
      at(x, y, 1, () => {
        c.beginPath();
        c.moveTo(-29, -14);
        c.quadraticCurveTo(-30, -40, 0, -40);
        c.quadraticCurveTo(30, -40, 29, -14);
        c.closePath();
        c.fillStyle = coral;
        c.fill();
        c.strokeStyle = ink;
        c.lineWidth = 2.5;
        c.stroke();
        r.round(-32, -17, 64, 8, 3, coral, ink);
        r.line([0, -34, 0, -20], cream, 3);
      });
    };
    if (!happy) helmet(-255, -65);
    at(-174, -1, 0.83, () => glim(happy));
    const colors = [coral, blue, lilac];
    colors.forEach((color, i) => {
      const x = -52 + i * 86;
      r.round(x - 25, -64, 50, 56, 12, color, ink);
      r.circle(x, -87, 26, cream);
      r.face(x, -90, 0.65, true);
      r.line([x - 13, -7, x - 20, 0], wood, 5);
      r.line([x + 13, -7, x + 20, 0], wood, 5);
      if (happy) {
        if (i === 0) helmet(x, -87);
        r.round(x - 32, -45, 64, 23, 4, cream, wood);
        label(["TUMBLE", "TAP", "NIB"][i]!, x, -33, 12);
      }
    });
    at(247, 0, 0.62, () => button(happy ? "modest" : "usual"));
    if (happy) caption("GLIM KNOWS EVERYONE", 0, -156, 16);
  } else if (kind === "featheradmiral") {
    // Sole ends are exactlyy0 for the engine's actual moving seesaw pan.
    r.round(-27, -14, 23, 14, 6, wood);
    r.round(4, -14, 23, 14, 6, wood);
    r.round(-23, -57, 46, 46, 13, cream, ink);
    r.line([-22, -36, -37, happy ? -57 : -24], cream, 6);
    r.line([22, -36, 37, happy ? -57 : -24], cream, 6);
    r.circle(0, -74, 24, cream);
    r.face(0, -77, 0.6, true);
    r.round(-36, -97, 72, 11, 4, lilac, ink);
    c.beginPath();
    c.moveTo(-31, -98);
    c.lineTo(0, -117);
    c.lineTo(31, -98);
    c.closePath();
    c.fillStyle = lilac;
    c.fill();
    r.line([0, -108, 7, -142], cream, 4);
    for (let i = 0; i < 4; i++)
      r.line(
        [2 + i, -117 - i * 6, -7, -124 - i * 5, 7, -126 - i * 5],
        cream,
        2,
      );
    badge(0, -42, 0.35);
  } else if (kind === "plushbus") {
    r.round(-210, -122, 420, 103, 24, teal, ink);
    r.round(-206, -40, 412, 24, 9, lilac);
    for (const x of [-159, -78, 3, 84]) {
      r.round(x - 31, -106, 62, 56, 9, cream, ink);
      r.round(x - 28, -64, 56, 10, 4, coral);
      const bounce = happy ? 0 : x === -78 || x === 84 ? -8 : 0;
      r.circle(
        x,
        -79 + bounce,
        14,
        [coral, gold, blue, green][Math.round((x + 159) / 81)]!,
      );
      r.face(x, -82 + bounce, 0.32, true);
    }
    r.round(136, -106, 62, 56, 9, blue, ink);
    wheel(-144, -18, 23);
    wheel(145, -18, 23);
    if (happy) {
      at(166, -50, 0.46, () => glim(true));
      r.circle(211, -71, 10, gold);
      r.line([210, -81, 219, -85], cream, 2);
      caption("HELPER'S BELL", 129, -148, 14);
    }
  } else if (kind === "biscuitmountain") {
    const boxes = [
      [-90, -45, 180, 44],
      [-76, -87, 152, 42],
      [-59, -128, 118, 41],
    ];
    for (const [x, y, width, height] of boxes) {
      r.round(x, y, width, height, 8, y === -87 ? lilac : teal, ink);
      r.line([x + 6, y + 7, x + width - 6, y + 7], cream, 3);
      label("BISCUITS", x + width / 2, y + 27, 12, cream);
    }
    if (happy) {
      biscuit(209, -56, 82);
      at(145, 0, 0.84, () => jun());
      plaque(209, -25, 176, 43);
      label("ESSENTIAL", 209, -12, 16);
      label("EQUIPMENT", 209, 5, 16);
      r.line([167, -40, 180, -50], teal, 8);
    } else at(0, -128, 0.82, () => jun());
  } else if (kind === "blockaudience") {
    const xs = [-111, 0, 111];
    xs.forEach((x, i) => {
      const color = [coral, teal, lilac][i]!;
      r.round(x - 35, -74, 70, 70, 8, color, ink);
      r.face(x, -47, 0.72, true);
      for (const side of [-1, 1]) {
        const handX = x + side * (happy ? 18 : 50);
        const handY = happy ? -84 + Math.sin(motion * 2) * 1.1 : -29;
        r.line([x + side * 34, -39, handX, handY], wood, 6);
        r.circle(x + side * 34, -39, 5, cream);
        r.round(handX - 8, handY - 8, 16, 16, 4, cream, wood);
      }
    });
  } else if (kind === "glimstage") {
    glim(happy);
    if (happy) {
      caption("SEEN, NOT INSPECTED", 0, -155, 15);
      for (const x of [-73, 73]) star(x, -62, 7, cream);
    }
  } else if (kind === "biscuitmoon") {
    //70×70 moving MELT: follow anchors centerY+17.5, hence this fixed offset.
    biscuit(0, -17.5, 28);
    if (happy) {
      star(-7, -22, 5, cream);
      r.circle(10, -10, 3.5, cream);
    } else {
      r.line([-15, -30, 4, -33], cream, 2);
    }
  } else if (kind === "ducknebula") {
    r.line([0, 16, 0, -27], wood, 6);
    r.round(-29, 12, 58, 11, 5, wood, ink);
    r.circle(0, -45, 31, happy ? gold : cream);
    if (happy) {
      // A duck-shaped constellation of crumbs, not an extra Jun or biscuit.
      const crumbs: readonly (readonly [number, number])[] = [
        [-44, -105],
        [-22, -118],
        [2, -111],
        [24, -110],
        [33, -133],
        [53, -147],
        [69, -139],
        [83, -131],
        [68, -121],
        [52, -116],
        [43, -98],
        [22, -87],
        [-3, -88],
        [-26, -94],
      ];
      r.line(
        crumbs.flatMap(([x, y]) => [x, y]),
        "#efca7355",
        1.5,
      );
      crumbs.forEach(([x, y], i) => r.circle(x, y, i % 3 ? 3 : 4.5, gold));
      caption("DUCK NEBULA", 0, 200, 15);
    }
  } else if (kind === "toyparadefloat") {
    r.round(-276, -23, 552, 43, 11, teal, ink);
    for (const x of [-201, 195]) wheel(x, 19, 22);
    for (let i = 0; i < 9; i++) {
      const x = -264 + i * 60;
      r.round(x, -17, 48, 29, 4, i % 2 ? lilac : coral);
      stitch(x + 24, -3, cream, 5);
    }
    at(-179, -25, 0.77, () => button(happy ? "modest" : "usual"));
    at(-57, -25, 0.79, () => glim(happy));
    at(77, -25, 0.8, () => jun());
    if (happy) {
      r.line([169, -22, 169, -194], wood, 5);
      r.round(135, -185, 119, 68, 6, cream, coral);
      r.circle(169, -153, 17, coral);
      stitch(169, -153, cream, 9);
      label("ROOM FOR", 218, -162, 10);
      label("EVERYONE", 218, -146, 10);
      for (const [x, color] of [
        [145, blue],
        [205, gold],
      ] as const) {
        r.circle(x, -59, 24, color);
        r.face(x, -62, 0.55, true);
      }
      r.line([-249, -27, 245, -27], cream, 4);
    }
  } else if (kind === "toyboxpanorama") {
    plaque(0, -212, 498, 41, "#59627b");
    label(
      happy ? "THE SMALLEST LIGHT GOES FIRST" : "EVERYONE HAS A PLACE",
      0,
      -191,
      20,
      cream,
    );
    // Travel reads left→right. Glim is unambiguously in front of Button.
    at(happy ? 241 : -41, 0, 0.95, () => glim(happy));
    at(happy ? 94 : 99, 0, 0.83, () => button(happy ? "modest" : "usual"));
    at(happy ? -24 : 233, 0, 0.79, () => jun());
    if (happy) {
      at(-144, 0, 0.65, () => {
        r.round(-44, -61, 88, 43, 18, wood, ink);
        r.circle(-44, -64, 24, cloth);
        r.circle(-51, -69, 3, ink);
        oval(-33, -61, 9, 23, coral);
        wheel(-26, -12, 12);
        wheel(29, -12, 12);
      });
      for (const [x, color] of [
        [-235, blue],
        [-281, lilac],
      ] as const) {
        r.circle(x, -25, 23, color);
        r.face(x, -28, 0.51, true);
      }
      for (const x of [-307, -199, -77, 44, 164, 298]) {
        r.line([x - 8, 21, x + 8, 21], cream, 3);
      }
    }
  } else if (kind === "toyteacup") {
    //140×70 real container; opaque art stays below the actual liquid layer.
    c.beginPath();
    c.arc(68, -20, 24, -Math.PI / 2, Math.PI / 2);
    c.strokeStyle = teal;
    c.lineWidth = 8;
    c.stroke();
    r.round(-70, -52.5, 140, 70, 13, cream, wood);
    oval(0, -52.5, 70, 7, blue);
    r.line([-56, 9, 56, 9], lilac, 3);
  } else if (kind === "toybag") {
    r.round(-69, -74, 138, 84, 12, lilac, ink);
    r.line([-25, -77, -25, -94, 25, -94, 25, -77], wood, 8);
    r.round(-52, -35, 48, 31, 5, cream, wood);
    stitch(40, -18, cream, 7);
    label(happy ? "STAY OVER" : "OVERNIGHT", -28, -19, 10);
    r.line([-59, -63, 59, -63], cream, 2);
  } else if (kind === "departuretag") {
    plaque(0, -81, 206, 89);
    badge(-69, -38, 0.58);
    label(happy ? "READY" : "DEPARTURE", 20, -48, 19);
    if (happy) label("WHENEVER YOU ARE", 20, -23, 12);
    else r.line([-17, -22, 81, -22], lilac, 3);
  } else if (kind === "paradepennant") {
    r.line([-60, 13, -60, -139], wood, 6);
    c.beginPath();
    c.moveTo(-57, -133);
    c.lineTo(73, -117);
    c.lineTo(44, -82);
    c.lineTo(65, -48);
    c.lineTo(-57, -62);
    c.closePath();
    c.fillStyle = happy ? teal : lilac;
    c.fill();
    c.strokeStyle = cream;
    c.lineWidth = 2;
    c.stroke();
    r.circle(-11, -96, 18, coral);
    stitch(-11, -96, cream, 10);
    if (happy) star(36, -90, 11, gold);
  } else return false;
  return true;
}
