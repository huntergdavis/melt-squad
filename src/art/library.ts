import type { Renderer } from "../render";
import type { PropKind } from "../types";

// Renderer supplies the local prop transform. Paper folds, page turns, ink,
// constellations, and carts are illustrations; the scene owns actual mechanics.
export function drawLibrary(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
): boolean {
  const c = r.ctx;
  const ink = "#43515c",
    paper = "#fff0d8",
    parchment = "#e2cba6",
    wood = "#a3826b",
    teal = "#6d9790",
    lilac = "#b6a5c6",
    rose = "#d69a96",
    gold = "#e4c07b";
  const motion = r.reducedMotion || !Number.isFinite(time) ? 0 : time;

  if (kind === "pagelibrarian") {
    for (const side of [-1, 1]) {
      const fold = happy ? 0.27 + Math.sin(motion * 1.8) * 0.035 : -0.12;
      c.save();
      c.translate(side * 17, -62);
      c.rotate(-side * fold);
      c.beginPath();
      c.moveTo(0, -13);
      c.bezierCurveTo(side * 34, -60, side * 85, -47, side * 57, 0);
      c.bezierCurveTo(side * 80, 40, side * 20, 50, 0, 13);
      c.closePath();
      c.fillStyle = tint ?? paper;
      c.fill();
      c.strokeStyle = wood;
      c.lineWidth = 2.5;
      c.stroke();
      r.line([side * 8, -8, side * 50, -30, side * 40, -8], lilac, 3);
      r.line([side * 8, 4, side * 50, 23, side * 30, 29], lilac, 3);
      r.line([side * 20, -3, side * 47, -12], parchment, 2);
      r.circle(side * 40, 15, 7, rose);
      r.circle(side * 40, 15, 3, paper);
      c.restore();
    }
    r.round(-24, -67, 48, 84, 20, tint ?? teal, ink);
    r.round(-9, -54, 18, 60, 5, paper);
    r.line([-19, -58, -10, -42, -3, -50], parchment, 4);
    r.line([19, -58, 10, -42, 3, -50], parchment, 4);
    for (const y of [-30, -17, -4]) r.circle(0, y, 2.5, wood);
    r.round(-24, 14, 19, 12, 5, ink);
    r.round(6, 14, 19, 12, 5, ink);
    r.line([-12, -110, -23, -130, -30, -130], wood, 3);
    r.line([12, -110, 23, -130, 30, -130], wood, 3);
    r.circle(-30, -130, 4, rose);
    r.circle(30, -130, 4, rose);
    r.circle(0, -90, 28, parchment);
    r.round(-24, -102, 48, 39, 18, paper);
    r.face(0, -91, 0.91, true);
    for (const x of [-12, 12]) {
      c.beginPath();
      c.arc(x, -91, 10, 0, Math.PI * 2);
      c.strokeStyle = ink;
      c.lineWidth = 2.5;
      c.stroke();
    }
    r.line([-2, -91, 2, -91], ink, 2);
    r.line([-23, -90, -25, -73, -17, -60], gold, 1.5);
    r.line([23, -90, 25, -73, 17, -60], gold, 1.5);
    // Lantern is suspended from Page's belt, leaving both wings free to applaud.
    r.line([19, -20, 42, -17, 47, -3], wood, 2.5);
    if (happy) r.circle(48, 11, 23, "#f1cc8230");
    r.round(36, -2, 24, 31, 4, gold, wood);
    r.round(41, 3, 14, 19, 3, happy ? paper : parchment);
    r.round(33, -6, 30, 7, 3, teal);
    r.round(33, 26, 30, 6, 3, teal);
    r.line([48, 4, 48, 21], wood, 1.5);
  } else if (kind === "endy") {
    r.line([-10, -2, -16, 19, -24, 19], ink, 5);
    r.line([10, -2, 16, 19, 24, 19], ink, 5);
    r.circle(0, -20, 23, tint ?? ink);
    r.circle(-7, -26, 3, paper);
    r.circle(7, -26, 3, paper);
    r.line([-6, -14, 0, -10, 6, -14], paper, 2);
    r.line([20, -20, 30, -12, 35, -25], ink, 5);
    if (happy) {
      r.line([-20, -20, -30, -12, -40, -20], ink, 5);
      r.round(-87, -65, 65, 35, 4, paper, wood);
      r.line([-42, -30, -42, -17], wood, 3);
      c.fillStyle = ink;
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.font = "bold 11px system-ui";
      c.fillText("BRIEF", -54, -53);
      c.fillText("PAUSE", -54, -40);
    }
  } else if (kind === "comma") {
    r.circle(0, -35, 21, tint ?? teal);
    c.beginPath();
    c.moveTo(13, -27);
    c.bezierCurveTo(28, -8, 17, 11, -3, 15);
    c.strokeStyle = tint ?? teal;
    c.lineWidth = 12;
    c.lineCap = "round";
    c.stroke();
    r.circle(-7, -40, 2.7, paper);
    r.circle(7, -40, 2.7, paper);
    r.line([-5, -28, 0, -25, 5, -28], paper, 2);
    r.line([-12, -19, -25, -10], teal, 4);
    r.line([-10, -18, -16, 22, -24, 22], teal, 4);
    r.line([5, 10, 17, 22, 25, 22], teal, 4);
  } else if (kind === "questionmark" || kind === "exclamation") {
    const color = tint ?? (kind === "questionmark" ? lilac : rose);
    if (kind === "questionmark") {
      c.beginPath();
      c.moveTo(-22, -86);
      c.bezierCurveTo(-20, -121, 40, -117, 31, -80);
      c.bezierCurveTo(26, -60, -1, -60, 0, -35);
      c.strokeStyle = color;
      c.lineWidth = 20;
      c.lineCap = "round";
      c.stroke();
    } else {
      r.round(-13, -112, 26, 77, 10, color);
      r.line([-7, -103, -7, -60], paper, 3);
    }
    r.circle(0, -8, 15, color);
    r.circle(-5, -12, 2.5, paper);
    r.circle(5, -12, 2.5, paper);
    r.line([-5, -3, 0, happy ? 0 : -1, 5, -3], paper, 1.7);
    r.line([-9, 2, -16, 22, -24, 22], color, 4);
    r.line([9, 2, 16, 22, 24, 22], color, 4);
    if (happy) r.line([0, -40, 24, -30, 20, -13], color, 4);
  } else if (kind === "paperwolf") {
    c.beginPath();
    c.moveTo(22, -12);
    c.lineTo(74, -31);
    c.lineTo(57, 3);
    c.lineTo(26, 10);
    c.closePath();
    c.fillStyle = tint ?? parchment;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.line([30, 2, 60, -15], paper, 2);
    r.round(-28, -60, 56, 79, 9, tint ?? parchment, wood);
    r.line([-19, -50, 0, -30, 19, -50], paper, 3);
    r.line([0, -30, 0, 10], wood, 2);
    r.round(-30, 16, 24, 12, 3, tint ?? parchment, wood);
    r.round(7, 16, 24, 12, 3, tint ?? parchment, wood);
    for (const side of [-1, 1]) {
      r.line([side * 23, -43, side * 44, -24, side * 55, -13], parchment, 11);
      r.round(side * 55 - 10, -22, 20, 25, 5, happy ? teal : paper, wood);
      if (happy) {
        const x = side * 55;
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5;
          r.circle(x + Math.cos(a) * 4, -10 + Math.sin(a) * 4, 2.6, rose);
        }
        r.circle(x, -10, 2, gold);
        r.line([x, -4, x + 3, 0], paper, 1.5);
      }
    }
    c.beginPath();
    c.moveTo(-33, -80);
    c.lineTo(-38, -129);
    c.lineTo(-7, -108);
    c.lineTo(15, -128);
    c.lineTo(20, -99);
    c.lineTo(52, -75);
    c.lineTo(20, -60);
    c.lineTo(-28, -60);
    c.closePath();
    c.fillStyle = tint ?? parchment;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.line([-30, -114, -24, -97], rose, 4);
    r.line([10, -112, 7, -101], rose, 4);
    c.beginPath();
    c.moveTo(5, -91);
    c.lineTo(50, -75);
    c.lineTo(19, -65);
    c.lineTo(-6, -70);
    c.closePath();
    c.fillStyle = paper;
    c.fill();
    r.face(-7, -91, 0.79, true);
    r.circle(49, -75, 5, ink);
    r.line([22, -70, 36, -70], wood, 2);
  } else if (kind === "paperknight") {
    r.round(-20, 14, 16, 14, 3, wood);
    r.round(6, 14, 16, 14, 3, wood);
    r.round(-29, -60, 58, 76, 5, tint ?? parchment, wood);
    r.line([-24, -53, 0, -35, 24, -53], paper, 3);
    r.line([0, -35, 0, 11], wood, 2);
    r.round(-32, -105, 64, 50, 9, tint ?? parchment, wood);
    r.round(-25, -90, 50, 28, 4, paper);
    r.face(0, -80, 0.81, true);
    r.line([-25, -90, 25, -90], wood, 3);
    r.line([0, -107, 0, -122, 19, -132, 34, -123], lilac, 9);
    r.line([-26, -43, -43, -30, -45, -12], parchment, 9);
    r.round(-58, -24, 30, 38, 3, teal, ink);
    r.line([-51, -16, -36, -16], paper, 2);
    r.line([-51, -8, -36, -8], paper, 2);
    r.circle(-44, -21, 5, paper);
    r.line([26, -43, 43, -30, 53, -21], parchment, 9);
    if (happy) {
      r.line([51, -112, 51, 26], wood, 6);
      r.line([80, -112, 80, 26], wood, 6);
      for (let i = 0; i < 6; i++)
        r.line([51, -99 + i * 22, 80, -99 + i * 22], parchment, 5);
    } else {
      r.round(42, -42, 29, 40, 3, paper, wood);
      r.line([48, -31, 65, -31], lilac, 2);
      r.line([48, -24, 61, -24], lilac, 2);
    }
    r.circle(53, -21, 5, paper);
  } else if (kind === "papermoon") {
    c.beginPath();
    c.moveTo(20, -104);
    c.bezierCurveTo(-44, -111, -71, -34, -20, 0);
    c.bezierCurveTo(0, 15, 28, 13, 48, -5);
    c.bezierCurveTo(4, -5, -14, -33, -7, -61);
    c.bezierCurveTo(-3, -79, 8, -93, 20, -104);
    c.closePath();
    c.fillStyle = tint ?? paper;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.line([-41, -50, -35, -47, -29, -50], ink, 2);
    r.line([-29, -37, -24, -34, -19, -37], ink, 2);
    r.circle(-42, -40, 5, rose);
    r.circle(-26, -70, 5, parchment);
    r.circle(-44, -60, 3, parchment);
    if (happy) {
      // Actual drawn constellation of a rocking chair, not a generic starfield.
      const stars = [
        [57, -136],
        [63, -90],
        [107, -90],
        [113, -53],
        [60, -53],
        [56, -113],
        [112, -110],
      ];
      r.line([57, -136, 63, -90, 107, -90, 113, -53], lilac, 2);
      r.line([63, -90, 60, -53], lilac, 2);
      r.line([56, -113, 112, -110], lilac, 2);
      r.line([106, -111, 107, -90], lilac, 2);
      c.beginPath();
      c.moveTo(46, -52);
      c.quadraticCurveTo(80, -24, 130, -52);
      c.strokeStyle = lilac;
      c.lineWidth = 2;
      c.stroke();
      for (const [x, y] of stars) {
        r.circle(x, y, 3.5, gold);
        r.line([x - 4, y, x + 4, y], paper, 1);
        r.line([x, y - 4, x, y + 4], paper, 1);
      }
    }
  } else if (kind === "paperdragon") {
    c.beginPath();
    c.moveTo(-139, -48);
    c.lineTo(141, -48);
    c.lineTo(183, -70);
    c.lineTo(159, -10);
    c.lineTo(-139, -10);
    c.closePath();
    c.fillStyle = tint ?? paper;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.line([141, -48, 159, -10], parchment, 3);
    for (const x of [-106, -43, 46, 111])
      r.line([x, -10, x - 9, 18, x + 6, 18], parchment, 7);
    c.beginPath();
    c.moveTo(-176, -49);
    c.lineTo(-179, -102);
    c.lineTo(-151, -88);
    c.lineTo(-134, -110);
    c.lineTo(-124, -70);
    c.lineTo(-101, -53);
    c.lineTo(-123, -36);
    c.closePath();
    c.fillStyle = tint ?? paper;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.face(-149, -70, 0.75, true);
    r.circle(-109, -53, 3, ink);
    r.line([-174, -90, -157, -78], lilac, 2);
    c.fillStyle = ink;
    c.font = "10px Georgia, serif";
    c.textAlign = "left";
    c.textBaseline = "middle";
    c.fillText("They made room for everybody, and stayed for tea.", -121, -28);
    if (happy) r.line([-132, -18, -145, -8, -154, -19], teal, 4);
  } else if (
    kind === "openbook" ||
    kind === "communalbook" ||
    kind === "guestbook"
  ) {
    const picnic = kind === "communalbook";
    c.save();
    if (picnic) c.scale(3, 1.7);
    c.beginPath();
    c.moveTo(-89, -70);
    c.quadraticCurveTo(-44, -93, 0, -70);
    c.quadraticCurveTo(44, -93, 89, -70);
    c.lineTo(89, 13);
    c.quadraticCurveTo(40, 0, 0, 17);
    c.quadraticCurveTo(-40, 0, -89, 13);
    c.closePath();
    c.fillStyle = tint ?? teal;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    for (const side of [-1, 1]) {
      c.beginPath();
      c.moveTo(side * 4, -65);
      c.quadraticCurveTo(side * 44, -80, side * 80, -60);
      c.lineTo(side * 80, 3);
      c.quadraticCurveTo(side * 40, -5, side * 4, 11);
      c.closePath();
      c.fillStyle = paper;
      c.fill();
    }
    r.line([0, -66, 0, 16], parchment, 2);
    c.restore();
    if (kind === "guestbook") {
      // 09.19 deliberately leaves the entire right page open for future friends.
      // Do not substitute the nested-book joke from the page-turning scene.
      for (let i = 0; i < 3; i++)
        r.line([-67, -47 + i * 13, -19 - i * 5, -47 + i * 13], parchment, 2);
      return true;
    }
    if (picnic && happy) {
      // A real drawn picnic insert: blanket, basket, cups, sandwich and flowers.
      // The surrounding scene supplies Page and friends, without duplicate cast.
      r.round(-225, -82, 170, 84, 4, rose);
      for (let i = 0; i < 6; i++)
        r.line([-212 + i * 27, -78, -212 + i * 27, -3], "#f3d6bf", 7);
      for (let i = 0; i < 3; i++)
        r.line([-221, -60 + i * 24, -59, -60 + i * 24], "#f3d6bf", 7);
      r.round(-210, -70, 50, 30, 5, parchment, wood);
      c.beginPath();
      c.moveTo(-204, -69);
      c.bezierCurveTo(-204, -102, -166, -102, -166, -69);
      c.strokeStyle = wood;
      c.lineWidth = 4;
      c.stroke();
      for (let i = 0; i < 4; i++)
        r.line([-204, -63 + i * 6, -166, -63 + i * 6], wood, 1.2);
      c.beginPath();
      c.ellipse(-114, -27, 30, 12, 0, 0, Math.PI * 2);
      c.fillStyle = paper;
      c.fill();
      c.beginPath();
      c.moveTo(-137, -27);
      c.lineTo(-106, -50);
      c.lineTo(-94, -22);
      c.closePath();
      c.fillStyle = gold;
      c.fill();
      r.line([-130, -27, -108, -40, -99, -25], teal, 3);
      for (const x of [-198, -70]) {
        r.round(x - 8, -30, 16, 19, 4, paper, wood);
        r.circle(x + 10, -22, 5, paper);
        r.circle(x + 10, -22, 2.5, rose);
      }
      for (const [x, y] of [
        [-126, -78],
        [-103, -91],
        [-83, -70],
      ]) {
        r.line([x, y, -90, -45], teal, 2.5);
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5;
          r.circle(
            x + Math.cos(a) * 6,
            y + Math.sin(a) * 6,
            4,
            i % 2 ? gold : paper,
          );
        }
        r.circle(x, y, 3, rose);
      }
      c.fillStyle = ink;
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.font = "bold 19px Georgia, serif";
      c.fillText("welcome back.", 132, -50);
      c.font = "12px Georgia, serif";
      c.fillStyle = teal;
      c.fillText("There is room for you.", 132, -23);
    } else if (picnic) {
      c.fillStyle = wood;
      c.font = "bold 18px Georgia, serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("OUR NEXT CHAPTER", 0, -90);
      r.line([-210, -56, -50, -56], parchment, 3);
      r.line([50, -56, 210, -56], parchment, 3);
    } else if (happy) {
      c.save();
      c.translate(20, -22);
      c.scale(0.48, 0.48);
      drawLibrary(r, "openbook", false, 0, lilac);
      c.restore();
      r.line([-70, -47, -30, -47], parchment, 2);
      r.line([-70, -30, -43, -30], parchment, 2);
    } else {
      for (const side of [-1, 1])
        for (let i = 0; i < 4; i++)
          r.line(
            [side * 17, -48 + i * 12, side * 60, -48 + i * 12],
            parchment,
            2,
          );
    }
  } else if (kind === "bookcart") {
    for (const x of [-50, 50]) {
      r.circle(x, 13, 12, ink);
      r.circle(x, 13, 6, parchment);
    }
    r.line([-70, 7, -70, -105, -80, -105], wood, 6);
    r.line([70, 7, 70, -105, 80, -105], wood, 6);
    r.round(-75, -7, 150, 13, 3, tint ?? teal, wood);
    r.round(-75, -50, 150, 11, 3, tint ?? teal, wood);
    if (happy) {
      r.round(-15, -76, 30, 23, 3, paper, wood);
      r.line([-8, -60, 8, -60], lilac, 2);
      r.line([0, -72, 0, -55], parchment, 1.5);
    } else {
      for (let i = 0; i < 5; i++) {
        const x = -56 + i * 23,
          h = 30 + (i % 3) * 11;
        r.round(x, -50 - h, 18, h, 3, i % 2 ? rose : lilac, wood);
        r.line([x + 4, -60, x + 14, -60], paper, 2);
      }
    }
    r.round(-54, -30, 70, 16, 3, parchment, wood);
    r.round(-40, -18, 86, 10, 3, lilac, wood);
    r.line([-40, -22, 12, -22], paper, 2);
  } else if (kind === "booklamp") {
    if (happy) {
      c.beginPath();
      c.ellipse(0, -40, 50, 40, 0, 0, Math.PI * 2);
      c.fillStyle = "#eed39b30";
      c.fill();
    }
    r.round(-30, 14, 60, 12, 5, wood);
    r.round(-23, 9, 46, 10, 4, gold);
    r.line([0, 12, 0, -70], wood, 7);
    r.circle(0, -67, 11, happy ? paper : parchment);
    c.beginPath();
    c.moveTo(-20, -113);
    c.lineTo(20, -113);
    c.lineTo(40, -70);
    c.quadraticCurveTo(0, -58, -40, -70);
    c.closePath();
    c.fillStyle = tint ?? teal;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 3;
    c.stroke();
    r.line([-13, -104, -23, -77], paper, 2);
    r.circle(0, -116, 4, gold);
    r.line([26, -70, 26, -42], gold, 1.5);
    r.circle(26, -40, 3, gold);
  } else if (kind === "bookmark") {
    c.beginPath();
    c.moveTo(-34, -118);
    c.lineTo(34, -118);
    c.lineTo(34, 25);
    c.lineTo(0, 7);
    c.lineTo(-34, 25);
    c.closePath();
    c.fillStyle = tint ?? lilac;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    r.circle(0, -102, 6, paper);
    r.line([0, -102, 0, -131, 9, -135], gold, 3);
    r.round(-29, -83, 58, 58, 4, paper);
    c.fillStyle = ink;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = "bold 10px system-ui";
    c.fillText(happy ? "YOU MAY" : "SAVE", 0, -68);
    c.fillText(happy ? "STOP HERE" : "YOUR PLACE", 0, -50);
    r.line([-18, -15, 0, -7, 18, -15], paper, 2);
  } else if (kind === "librarychair") {
    r.round(-38, -111, 76, 111, 20, tint ?? lilac, wood);
    r.round(-29, -101, 58, 67, 18, paper);
    r.circle(0, -68, 4, rose);
    r.round(-40, -32, 80, 40, 11, tint ?? lilac, wood);
    r.round(-32, -30, 64, 20, 9, paper);
    for (const x of [-50, 50]) {
      r.round(x - 11, -50, 22, 50, 9, tint ?? lilac, wood);
      r.line([x - 4, 0, x - 4, 26], wood, 7);
    }
    if (happy) {
      r.round(-20, -32, 40, 24, 3, parchment, wood);
      r.line([-18, -30, 0, -17, 18, -30], rose, 2);
    }
  } else if (kind === "bookspine") {
    r.round(-54, -128, 108, 151, 6, tint ?? teal, wood);
    r.round(-40, -122, 88, 137, 4, paper);
    r.round(-48, -128, 12, 151, 3, wood);
    for (const y of [-108, -82, -56, -30, -4])
      r.line([-50, y, -35, y], gold, 3);
    r.round(-28, -89, 67, 50, 4, gold);
    c.fillStyle = ink;
    c.textAlign = "center";
    c.textBaseline = "middle";
    if (happy) {
      c.font = "bold 13px Georgia, serif";
      c.fillText("PERHAPS", 6, -64);
    } else {
      r.circle(6, -64, 10, paper);
      r.line([0, -64, 12, -64], teal, 2);
    }
    r.line([-26, -17, 30, -17], parchment, 2);
    r.line([-26, -9, 20, -9], parchment, 2);
  } else if (kind === "paperboat") {
    c.beginPath();
    c.moveTo(-86, -29);
    c.lineTo(86, -29);
    c.lineTo(52, 23);
    c.lineTo(-52, 23);
    c.closePath();
    c.fillStyle = tint ?? paper;
    c.fill();
    c.strokeStyle = wood;
    c.lineWidth = 2;
    c.stroke();
    c.beginPath();
    c.moveTo(-65, -29);
    c.lineTo(-8, -89);
    c.lineTo(60, -29);
    c.closePath();
    c.fillStyle = parchment;
    c.fill();
    r.line([-8, -86, -5, -30, -52, 22], wood, 2);
    r.line([-5, -30, 52, 22], wood, 2);
    r.line([-8, -89, -8, -113], wood, 2.5);
    if (happy) {
      r.round(-6, -112, 85, 21, 3, teal);
      c.fillStyle = paper;
      c.font = "bold 10px system-ui";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("ON HOLIDAY", 36, -101);
    }
    c.fillStyle = wood;
    c.font = "9px Georgia, serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("THE LAST LINE", 0, -10);
  } else if (kind === "bookplate") {
    r.round(-66, -85, 132, 108, 8, tint ?? parchment, wood);
    r.round(-59, -78, 118, 94, 5, paper);
    r.line([-51, -60, 51, -60], gold, 2);
    r.line([-51, -1, 51, -1], gold, 2);
    c.fillStyle = ink;
    c.font = "bold 12px Georgia, serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(happy ? "ROOM FOR" : "LIBRARY", 0, -48);
    c.fillText(happy ? "WHOEVER" : "CARD", 0, -30);
    if (happy) c.fillText("ARRIVES NEXT", 0, -12);
    r.circle(-50, -70, 2.5, rose);
    r.circle(50, -70, 2.5, rose);
  } else return false;
  return true;
}
