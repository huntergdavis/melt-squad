import type { Renderer } from "../render";
import type { PropKind } from "../types";

// A reunion of the actual shipped illustrations. All liquid, target progress,
// machinery and the finale's bounded reveal clock belong to Renderer.
export function drawFestival(
  r: Renderer,
  kind: PropKind,
  happy: boolean,
  time: number,
  tint?: string,
  progress = happy ? 1 : 0,
): boolean {
  const c = r.ctx;
  const ink = "#45495a",
    cream = "#fff3d7",
    brass = "#dbb96e";
  const teal = "#86aca4",
    coral = "#df9c8e",
    lilac = "#b9aad0";
  const wood = "#ac8a6c",
    green = "#a6bd91",
    blue = "#9bb6c5";
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
  const label = (
    text: string,
    x: number,
    y: number,
    size = 15,
    color = ink,
  ) => {
    c.font = `bold ${size}px system-ui`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = color;
    c.fillText(text, x, y);
  };
  const caption = (text: string, x: number, y: number, size = 15) => {
    c.save();
    c.font = `bold ${size}px system-ui`;
    const width = Math.ceil(c.measureText(text).width) + 16;
    r.round(x - width / 2, y - size / 2 - 5, width, size + 10, 5, cream);
    label(text, x, y, size);
    c.restore();
  };
  const card = (x: number, y: number, w: number, h: number) => {
    r.round(x - w / 2, y, w, h, 6, cream, brass);
  };
  const cameo = (
    k: PropKind,
    x: number,
    y: number,
    s: number,
    earned = happy,
  ) => r.prop(k, x, y, s, earned, motion);
  const chair = (x: number, y: number, s = 1) =>
    at(x, y, s, () => {
      r.round(-33, -72, 66, 70, 14, teal, ink);
      r.round(-39, -7, 78, 15, 5, cream, wood);
      r.line([-27, 8, -31, 35], wood, 7);
      r.line([27, 8, 31, 35], wood, 7);
    });
  const table = (x: number, y: number, width: number) => {
    r.line([x - width * 0.36, y + 5, x - width * 0.39, y + 66], wood, 8);
    r.line([x + width * 0.36, y + 5, x + width * 0.39, y + 66], wood, 8);
    r.round(x - width / 2, y, width, 17, 7, cream, wood);
  };
  const medal = (x: number, y: number, s = 1) =>
    at(x, y, s, () => {
      r.line([-15, -31, 0, -8, 15, -31], coral, 9);
      r.circle(0, 0, 17, brass);
      r.circle(0, 0, 11, cream);
      r.line([-6, 0, -1, 5, 7, -6], teal, 3);
    });
  const pigeon = (resting = false, eating = false) => {
    if (resting) chair(0, 3, 0.92);
    r.line([-14, 1, -17, 20, -31, 20], coral, 5);
    r.line([14, 1, 17, 20, 30, 20], coral, 5);
    oval(0, -29, 38, 47, tint ?? blue);
    r.round(-29, -44, 58, 44, 17, teal);
    oval(-24, -29, 12, 28, "#7e96b0");
    oval(24, -29, 12, 28, "#7e96b0");
    r.circle(0, -77, 29, tint ?? blue);
    r.circle(-11, -82, 9, cream);
    r.circle(11, -82, 9, cream);
    r.circle(-10, -81, 3.5, ink);
    r.circle(10, -81, 3.5, ink);
    r.line([-4, -68, 0, -63, 5, -68], brass, 6);
    r.line([-12, -104, -17, -113, -5, -109], "#7e96b0", 4);
    r.circle(13, -29, 8, cream);
    label("?", 13, -29, 10);
    if (!resting) {
      card(0, -19, 35, 34);
      r.round(-8, -23, 16, 7, 2, brass);
      r.line([-11, -6, 9, -6, 9, 2, -11, 2], teal, 2);
    }
    if (eating) {
      oval(0, 8, 33, 10, cream);
      r.round(-17, -3, 34, 12, 5, brass);
      r.circle(12, -5, 5, coral);
    }
  };
  const envelope = (x: number, y: number, s = 1, umbrella = false) =>
    at(x, y, s, () => {
      r.round(-30, -23, 60, 41, 4, cream, teal);
      r.line([-28, -20, 0, 1, 28, -20], teal, 2);
      r.round(15, -17, 10, 11, 2, coral);
      if (umbrella) {
        r.line([0, -18, 0, -59], ink, 3);
        c.beginPath();
        c.arc(0, -57, 35, Math.PI, 0);
        c.closePath();
        c.fillStyle = lilac;
        c.fill();
        r.line([-34, -57, 34, -57], cream, 3);
      }
    });
  const flower = (x: number, y: number, color = coral) => {
    r.line([x, y, x, y + 28], green, 4);
    for (let i = 0; i < 5; i++)
      r.circle(
        x + Math.cos(i * Math.PI * 0.4) * 8,
        y + Math.sin(i * Math.PI * 0.4) * 8,
        6,
        color,
      );
    r.circle(x, y, 5, brass);
  };
  const annWithAlbum = (x: number, y: number, scale: number) =>
    at(x, y, scale, () => {
      // Keep the original Ann; replace only her old folder and emergency light.
      // An even-odd hole prevents those old marks showing around the new album.
      if (happy) {
        c.save();
        c.beginPath();
        c.rect(-150, -150, 300, 200);
        c.moveTo(18, -54);
        c.lineTo(26, -61);
        c.lineTo(40, -61);
        c.lineTo(40, -69);
        c.lineTo(71, -69);
        c.lineTo(71, 3);
        c.lineTo(18, 3);
        c.closePath();
        c.clip("evenodd");
        cameo("annmoth", 0, 0, 1);
        c.restore();
        r.round(18, -54, 42, 55, 5, teal, ink);
        r.round(24, -47, 30, 29, 3, cream);
        r.circle(34, -38, 5, brass);
        r.line([27, -23, 37, -34, 50, -23], coral, 4);
        label("ALBUM", 39, -8, 8);
        r.line([17, -43, 23, -23], cream, 5);
      } else cameo("annmoth", 0, 0, 1);
    });

  if (kind === "festivalpigeon") pigeon();
  else if (kind === "firstwelcome") {
    card(-170, -151, 135, 80);
    if (happy) {
      label("WELCOME", -170, -137, 17);
      label("YOU TOO", -170, -117, 14);
    }
    cameo("wizard", -170, -23, 0.78, true);
    cameo("heart", 240, -3, 0.8);
    at(110, 28, 0.85, () => pigeon(true));
    // The wizard's familiar boots are hanging upright, never a second wizard.
    if (happy) {
      r.line([-97, -115, -35, -115], wood, 4);
      for (const x of [-84, -55]) {
        r.line([x, -115, x, -91], cream, 3);
        r.round(x - 7, -94, 14, 26, 4, ink);
        r.round(x - 7, -77, 25, 12, 5, ink);
      }
      caption("THE FIRST CUP IS YOURS", 80, -147);
    }
  } else if (kind === "sockarch") {
    r.line([-195, 20, -195, -170, 0, -255, 215, -170, 215, 20], wood, 10);
    for (const [x, y] of [
      [-170, -195],
      [0, -250],
      [170, -190],
    ])
      r.round(x - 13, y - 12, 26, 35, 5, brass);
    cameo("ghost", -230, -3, 0.64);
    cameo("moth", 225, -85, 0.72);
    const colors = [coral, teal, lilac, brass, blue, green];
    for (let i = 0; i < 6; i++)
      cameo("sock", -145 + i * 58, -137 + Math.abs(2.5 - i) * 9, 0.43, happy);
    if (happy) {
      for (let i = 0; i < 3; i++)
        r.line([-145 + i * 116, -159, -87 + i * 116, -159], colors[i], 5);
      caption("ODD TOGETHER", 0, -51);
    }
  } else if (kind === "postaltriangle") {
    card(200, -140, 135, 73);
    if (happy) label("DEAR PUDDLE", 200, -112, 15);
    cameo("crab", -165, 20, 0.57);
    cameo("eel", -4, 5, 0.66);
    cameo("octopus", 175, 20, 0.56);
    if (happy) {
      envelope(-120, -75, 0.65, true);
      envelope(5, 75, 0.65, true);
      oval(265, 72, 65, 14, blue);
      r.face(265, 73, 0.5, true);
      envelope(265, 26, 0.6, true);
      caption("AN UMBRELLA ENCLOSED", 0, -162);
    }
  } else if (kind === "circusqueue") {
    cameo("ringmaster", happy ? -170 : -200, happy ? 70 : 8, 0.7);
    cameo("giraffe", happy ? 0 : 180, happy ? 36 : -5, 0.77);
    cameo("beetle", 170, happy ? 67 : 30, 0.8);
    if (happy) {
      r.line([70, -94, 275, -94], coral, 7);
      card(180, -120, 225, 47);
      label("CONSIDERATE INTERVAL", 180, -96, 14);
      caption("THE QUEUE APPLAUDS", 0, -147);
    }
  } else if (kind === "delightpermit") {
    for (const [x, y] of [
      [-205, -100],
      [-100, -190],
      [110, -190],
      [265, -100],
    ]) {
      card(x, y, 41, 80);
      if (happy)
        r.line([x - 11, y + 30, x - 3, y + 41, x + 12, y + 18], teal, 4);
    }
    cameo("mousemayor", -150, 22, 0.65);
    cameo("hedgehog", 150, 25, 0.64);
    cameo("stamp", 4, -1, 1);
    if (happy) {
      card(0, -110, 330, 58);
      label("EVERYONE MAY HAVE A NICE TIME", 0, -92, 15);
      label("INCLUDING VOLUNTEERS", 0, -69, 14);
    }
  } else if (kind === "dessertcitizens") {
    r.round(-230, -143, 210, 51, 12, cream, brass);
    for (let i = 0; i < 5; i++)
      cameo("biscuit", -207 + i * 40, -115, 0.33, true);
    cameo("biscuitcaptain", happy ? -185 : -170, 22, 0.7);
    cameo("pudding", happy ? 5 : 25, 17, 0.77);
    cameo("jellybean", happy ? 166 : 208, -12, 0.73);
    // A separate buffet dish, not either player-filled serving basin. Its soup
    // never turns into custard when its honorary citizenship is awarded.
    r.round(203, 10, 85, 44, 15, cream, teal);
    oval(245.5, 12, 40, 10, "#bd8c59");
    for (const [x, y] of [
      [226, 10],
      [246, 15],
      [262, 9],
    ])
      r.circle(x, y, 3, green);
    if (happy) {
      medal(245, 39, 0.43);
      card(15, -150, 220, 57);
      label("HONORARY DESSERT", 15, -130, 16);
      label("SOUP IS STILL SOUP", 15, -109, 13);
    }
  } else if (kind === "tailroom") {
    for (const [x, y] of [
      [-130, -121],
      [15, -186],
      [160, -121],
    ]) {
      r.round(x - 42, y, 84, 75, 9, teal, wood);
      r.round(x - 46, y - 7, 92, 18, 6, cream, wood);
      r.circle(x, y + 22, 5, brass);
      if (happy) cameo("crayon", x, y + 32, 0.28, true);
    }
    cameo("principal", -210, 27, 0.58);
    // The actual long-necked preschooler has room to turn, not a new dinosaur.
    at(happy ? 140 : 210, 41, 0.64, () => {
      if (happy) c.scale(-1, 1);
      cameo("diplodocus", 0, 0, 1, true);
    });
    if (happy) caption("TAIL ROOM", -62, -183, 18);
  } else if (kind === "flintcounter") {
    const desks = [
      [-160, -67, 77],
      [10, -157, 100],
      [220, -247, 100],
    ];
    for (const [x, y, w] of desks) {
      card(x, y, w, 60);
      r.line([x, y + 60, x, y + 84], wood, 6);
      if (happy)
        caption(
          x < 0 ? "WYVERN" : x < 100 ? "DRAGON" : "TALL TOO",
          x,
          y - 14,
          11,
        );
    }
    cameo("flintclerk", -150, 10, 0.7);
    cameo("cindermayor", 6, -45, 0.74);
    cameo("catdragon", 205, -102, 0.79);
    if (happy) caption("A COUNTER AT YOUR HEIGHT", 0, -17);
  } else if (kind === "endingnest") {
    cameo("openbook", -160, -90, 0.62, false);
    cameo("openbook", 180, -90, 0.62, false);
    r.line([-175, -44, -180, 28], wood, 9);
    r.line([185, -44, 190, 28], wood, 9);
    cameo("pagelibrarian", -95, 7, 0.69);
    oval(45, 10, 78, 20, wood);
    oval(45, 5, 64, 14, cream);
    if (happy) {
      card(30, -151, 245, 81);
      label("STAY AS LONG", 9, -133, 16);
      label("AS YOU LIKE", -6, -110, 16);
      cameo("endy", 105, -96, 0.68, false);
    } else cameo("endy", 45, 0, 0.93, false);
  } else if (kind === "tryingpodium") {
    card(0, -246, 300, 67);
    if (happy) label("TRYING SOMETHING COUNTS", 0, -213, 17);
    for (const x of [-175, 5, 185]) {
      r.line([x, -65, x, -12], wood, 5);
      medal(x, -45, 0.8);
    }
    cameo("gus", -105, 10, 0.85);
    at(115, 8, 1, () => pigeon(happy));
    if (happy) {
      medal(-108, -35, 0.67);
      medal(112, -32, 0.66);
      r.line([-56, -35, 20, -28, 72, -37], cream, 6);
      caption("JOINING IN", -115, 56, 14);
      caption("MAKING ROOM", 120, 56, 14);
    }
  } else if (kind === "everypairdance") {
    card(10, -215, 110, 75);
    r.line([10, -140, 10, -109], wood, 6);
    if (happy) {
      label("EVERY KIND", 10, -191, 14);
      label("OF PAIR", 10, -168, 14);
    }
    cameo("rill", -195, 32, 0.56);
    cameo("moss", -130, 32, 0.45);
    cameo("adaplanner", 97, 30, 0.6);
    cameo("flowercousins", 210, 40, 0.42);
    cameo("pudding", 5, 16, 0.64);
    at(330, 30, 0.78, () => pigeon(true));
    if (happy) {
      r.line([-171, 9, -151, 9], cream, 4);
      caption("SOLOS TOO", 0, -84, 14);
      caption("THIS ONE OUT", 328, 73, 13);
    }
  } else if (kind === "quietdreamtent") {
    r.line([-205, 22, -205, -184, 0, -230, 222, -184, 222, 22], wood, 7);
    r.line([-205, -178, -128, -20], lilac, 21);
    r.line([222, -178, 148, -20], teal, 21);
    card(10, -244, 220, 62);
    if (happy) label("A BREAK BELONGS HERE", 10, -213, 16);
    cameo("stitchtailor", -153, 1, 0.72);
    cameo("bramble", 146, 12, 0.75);
    at(0, 17, 0.91, () => pigeon(true));
    if (happy) {
      r.round(-39, 8, 78, 26, 9, lilac, cream);
      for (let i = 0; i < 5; i++)
        r.line([-31 + i * 14, 13, -25 + i * 14, 28], teal, 3);
      caption("THE FOREST CAN KEEP WATCH", 0, -123, 14);
    }
  } else if (kind === "twoweatherpicnic") {
    // Real completed snowy platforms remain visible under their own plants.
    cameo("snowpeas", -240, 29, 0.55);
    cameo("snowpeas", -140, -36, 0.47);
    cameo("snowpeas", -235, -121, 0.47);
    r.line([132, 8, 132, -164, 255, -164, 255, 8], wood, 6);
    r.round(123, -174, 145, 25, 9, brass, cream);
    cameo("sunseed", 224, 1, 0.74);
    cameo("nimbusgardener", 80, -26, 0.73);
    if (happy) {
      at(-24, -143, 0.6, () => {
        r.circle(-24, 0, 23, cream);
        r.circle(7, -12, 29, cream);
        r.circle(32, 1, 23, cream);
        r.round(-44, 0, 94, 25, 12, cream);
        r.face(2, 4, 0.55, true);
      });
      caption("A CUSHION FOR THE ORGANIZER", 44, -206, 14);
    }
  } else if (kind === "extrastoptrain") {
    card(240, -204, 125, 72);
    if (happy) {
      label("ONE MORE", 240, -182, 15);
      label("GOODBYE", 240, -157, 15);
    }
    cameo("myceliumcarriage", 0, 26, 0.76);
    cameo("sprigporter", 202, 24, 0.91);
    cameo("gillsconductor", -214, 21, 0.59);
    if (happy) {
      card(22, -111, 103, 53);
      label("SAVED", 22, -94, 15);
      label("WINDOW SEAT", 22, -75, 10);
      caption("ONE MORE GOODBYE", -25, -177);
    }
  } else if (kind === "firstsketchexhibit") {
    // A crooked, original proposal, not a new optical question-mark puzzle.
    r.line(
      [-96, -153, -30, -180, 38, -163, 57, -119, 20, -94, 20, -16],
      lilac,
      20,
    );
    r.circle(10, 70, 18, lilac);
    cameo("drprobably", -190, 30, 0.8);
    cameo("marginassistant", 210, 31, 0.73);
    card(-3, -82, 203, 111);
    if (happy) {
      r.line([-82, -12, -46, -49, -3, -20, 36, -62, 81, -10], teal, 3);
      r.line([-73, -31, -72, 6, 72, 6, 74, -36], coral, 3);
      r.circle(1, -42, 10, brass);
      label("FIRST MESSY SKETCH", -3, 14, 13);
      caption("THANK YOU FOR STARTING", 0, -210, 15);
    }
  } else if (kind === "crewbreakfast") {
    for (const x of [-160, 160]) {
      r.round(x - 49, -185, 98, 140, 12, teal, ink);
      r.round(x - 40, -173, 80, 49, 7, cream, brass);
      label("COFFEE", x, -149, 13);
      r.line([x, -99, x, -35, x + 24, -35], brass, 9);
      r.circle(x, -75, 11, cream);
      r.line([x - 7, -75, x + 7, -75], ink, 3);
    }
    if (happy) {
      chair(-110, -5, 0.8);
      chair(122, -5, 0.8);
      chair(235, 0, 0.7);
    }
    cameo("misocook", -110, -7, 0.73);
    cameo("mallowhost", 122, -7, 0.69);
    cameo("ziphauler", 235, -2, 0.64);
    if (happy) {
      cameo("betweenreceptionist", -285, 0, 0.6, true);
      oval(-249, -13, 31, 8, cream);
      r.round(-269, -28, 37, 13, 5, brass);
      r.line([-264, -16, -256, -17], teal, 5);
    }
    at(0, -6, 0.89, () => pigeon(true, happy));
    table(0, 43, 145);
    if (happy) {
      oval(0, 47, 47, 13, teal);
      oval(0, 42, 40, 10, cream);
      r.round(-25, 26, 40, 16, 5, brass);
      flower(25, 31, coral);
      caption("YOU GET TO EAT TOO", 0, -213, 17);
    }
  } else if (kind === "toyparade") {
    r.round(-153, 11, 303, 28, 9, teal, wood);
    r.line([-145, 10, -145, -126], wood, 4);
    r.line([175, 10, 175, -126], wood, 4);
    for (const x of [-145, 175]) {
      c.beginPath();
      c.moveTo(x, -190);
      c.lineTo(x + 41, -165);
      c.lineTo(x, -139);
      c.closePath();
      c.fillStyle = happy ? coral : cream;
      c.fill();
    }
    cameo("captainbutton", -17, 6, 0.66);
    cameo("junduck", -106, 7, 0.7);
    cameo("glimstar", happy ? 205 : 30, happy ? 6 : -77, 0.72);
    // The original sports guest bends a knee to the toys' eye level.
    at(-260, -1, 0.72, () => {
      c.save();
      c.beginPath();
      c.rect(-100, -190, 200, 180);
      c.clip();
      cameo("gus", 0, 0, 1);
      c.restore();
      r.line([-19, -12, -34, 8, -7, 8], wood, 14);
      r.line([20, -12, 40, 8, 57, 8], wood, 14);
    });
    if (happy) {
      r.line([161, -14, 181, -14], brass, 3);
      caption("FOLLOW THE LITTLE STAR", 0, -231, 16);
    }
  } else if (kind === "tomorrowflowers") {
    card(5, -180, 250, 73);
    if (happy) {
      label("TOMORROW SENT FLOWERS", 5, -154, 16);
      label("NOT AN EMERGENCY", 5, -131, 13);
    }
    const ponies: PropKind[] = [
      "breakfastpony",
      "spoonpony",
      "laundrypony",
      "trainpony",
    ];
    ponies.forEach((pony, i) => {
      const x = [-227, -102, 120, 251][i]!;
      cameo(pony, x, 13, 0.66);
      if (happy) flower(x + 34, -32, [coral, brass, lilac, cream][i]);
    });
    annWithAlbum(10, -2, 0.81);
    if (happy) caption("A DAY FOR THE PHOTO ALBUM", 6, 115, 14);
  } else if (kind === "volunteerroom") {
    r.line([-175, 36, -175, -217, 139, -217, 139, 36], wood, 8);
    r.round(-72, -183, 144, 88, 24, cream, lilac);
    for (const x of [-55, 55]) r.line([x, -173, x, -110], lilac, 2);
    cameo("betweenreceptionist", -237, 21, 0.62);
    cameo("yesterdayporter", 240, 19, 0.75);
    at(-35, -5, 0.95, () => pigeon(happy));
    if (happy) {
      card(112, -137, 72, 68);
      at(112, -93, 0.31, () => pigeon(true));
      caption("OFF CALL", -35, -202, 16);
      caption("YESTERDAY HAS THE DOOR", 62, 132, 14);
    }
  } else if (kind === "festivalpanorama") {
    // One representative of every prior world, using its original native art.
    // These are two readable welcoming rows, not nineteen anonymous portraits.
    const delegations: PropKind[] = [
      "wizard",
      "ghost",
      "crab",
      "ringmaster",
      "mousemayor",
      "pudding",
      "principal",
      "flintclerk",
      "pagelibrarian",
      "gus",
      "adaplanner",
      "stitchtailor",
      "nimbusgardener",
      "sprigporter",
      "drprobably",
      "misocook",
      "captainbutton",
      "annmoth",
      "betweenreceptionist",
    ];
    const reveal = happy
      ? r.reducedMotion
        ? 1
        : Number.isFinite(progress)
          ? Math.max(0, Math.min(1, progress))
          : 1
      : 0;
    const lit = reveal === 1 ? 19 : Math.floor(reveal * 19);
    delegations.forEach((delegate, i) => {
      const firstRow = i < 10;
      const x = firstRow ? -354 + i * 78 : -336 + (i - 10) * 84;
      const y = firstRow ? -139 : -53;
      const scale =
        delegate === "wizard"
          ? 0.41
          : delegate === "flintclerk" || delegate === "sprigporter"
            ? 0.62
            : 0.47;
      if (i < lit) {
        oval(x, y - 35, 37, 48, "#fff1b666");
        r.line([x - 30, y + 17, x + 30, y + 17], brass, 3);
      }
      if (delegate === "annmoth") annWithAlbum(x, y, scale);
      else cameo(delegate, x, y, scale, true);
      r.round(x - 9, y + 15, 18, 12, 4, i < lit ? brass : wood, cream);
      r.circle(x, y + 20, 3, i < lit ? cream : ink);
    });
    chair(-130, 10, 1);
    at(0, 47, 0.95, () => pigeon(true));
    table(0, 6, 445);
    if (happy) {
      // The one actual shared basin remains at center; no replacement drink.
      caption("ROOM FOR YOU", 132, -10, 15);
      r.round(-161, 4, 60, 21, 6, lilac, cream);
      r.line([-153, 8, -120, 21], teal, 3);
    }
  } else if (
    kind === "festivalcup" ||
    kind === "festivalbasin" ||
    kind === "festivalvase"
  ) {
    // The open rectangle is exactly 140 x 70. Engine water paints over its
    // interior. The cup's familiar smile is on its saucer, outside that area.
    const fill =
      kind === "festivalcup"
        ? "#fffcf0"
        : kind === "festivalvase"
          ? teal
          : coral;
    r.round(-70, -52.5, 140, 70, kind === "festivalbasin" ? 22 : 13, fill, ink);
    r.line([-70, -52.5, 70, -52.5], cream, 5);
    r.line([-70, -51, -70, 15, 70, 15, 70, -51], fill, 6);
    if (kind === "festivalcup") {
      c.beginPath();
      c.ellipse(83, -19, 19, 25, 0, 0, Math.PI * 2);
      c.strokeStyle = cream;
      c.lineWidth = 10;
      c.stroke();
      r.round(-78, 19, 156, 23, 8, cream, teal);
      r.face(0, 27, 0.43, true);
      r.line([-46, -40, -46, -9], brass, 2);
    } else if (kind === "festivalvase" && happy) {
      flower(-39, -82);
      flower(0, -94, lilac);
      flower(37, -84, brass);
    }
  } else if (kind === "festivalmedal") medal(0, -24, 1.5);
  else if (kind === "festivalbanner") {
    card(0, 0, 520, 44);
    label(happy ? "GLAD YOU CAME" : "THE GREAT THAW FESTIVAL", 0, 22, 23);
  } else return false;
  return true;
}
