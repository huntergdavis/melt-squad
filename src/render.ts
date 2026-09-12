import { CELL, temperatureColor, type World } from "./engine";
import { H, W, clamp, type PropKind, type Theme } from "./types";
import { drawPostal } from "./art/postal";
const motionSafe = (time: number, reduced: boolean) => (reduced ? 0 : time);

const palettes: Record<Theme, [string, string, string]> = {
  kitchen: ["#f3e7d9", "#d7e7de", "#b8d4c7"],
  cave: ["#b8d7e0", "#e2eee7", "#7eacb4"],
  garden: ["#e9dddc", "#eaf0d8", "#a4b98f"],
  cosmos: ["#283d58", "#738b99", "#304c64"],
  town: ["#d9e3db", "#e8d8bd", "#acc0b2"],
  laundry: ["#363958", "#9490b2", "#555674"],
  reef: ["#245967", "#7fb5b2", "#517f83"],
};
export class Renderer {
  ctx: CanvasRenderingContext2D;
  private sparkle = new Image();
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.sparkle.src = import.meta.env.BASE_URL + "art/spark.png";
  }
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr),
      h = Math.round(rect.height * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }
  round(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    color: string,
    stroke?: string,
  ) {
    const c = this.ctx;
    c.beginPath();
    c.roundRect(x, y, w, h, r);
    c.fillStyle = color;
    c.fill();
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = 3;
      c.stroke();
    }
  }
  circle(x: number, y: number, r: number, color: string) {
    const c = this.ctx;
    c.fillStyle = color;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
  }
  line(points: number[], color: string, width = 3) {
    const c = this.ctx;
    c.beginPath();
    c.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2)
      c.lineTo(points[i], points[i + 1]);
    c.strokeStyle = color;
    c.lineWidth = width;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.stroke();
  }
  face(x: number, y: number, size = 1, happy = true) {
    this.circle(x - 10 * size, y, 3 * size, "#234b4c");
    this.circle(x + 10 * size, y, 3 * size, "#234b4c");
    const c = this.ctx;
    c.beginPath();
    c.arc(
      x,
      y + 4 * size,
      7 * size,
      happy ? 0 : Math.PI,
      happy ? Math.PI : 2 * Math.PI,
    );
    c.lineWidth = 2.4 * size;
    c.strokeStyle = "#234b4c";
    c.stroke();
    this.circle(x - 18 * size, y + 7 * size, 5 * size, "#f8a698");
    this.circle(x + 18 * size, y + 7 * size, 5 * size, "#f8a698");
  }
  prop(
    kind: PropKind,
    x: number,
    y: number,
    scale = 1,
    happy = false,
    t = 0,
    tint?: string,
  ) {
    const c = this.ctx;
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    if (drawPostal(this, kind, happy, t, tint)) {
      c.restore();
      return;
    }
    if (kind === "ghost") {
      c.translate(0, Math.sin(t * 1.5) * 5);
      this.round(-38, -85, 76, 85, 37, "#ffe4ac");
      for (let i = 0; i < 4; i++) this.circle(-28 + i * 19, -2, 10, "#ffe4ac");
      this.face(0, -45, 1.1, happy);
      this.round(-21, -88, 42, 12, 5, "#bf8ea8");
      this.line([-33, -25, -52, happy ? -65 : -18], "#ffe4ac", 12);
      this.line([33, -25, 51, happy ? -55 : -18], "#ffe4ac", 12);
    } else if (kind === "sock") {
      c.rotate(happy ? Math.sin(t * 2) * 0.08 : -0.08);
      this.round(-24, -75, 47, 80, 14, tint ?? "#edb692");
      this.round(-24, -18, 76, 32, 15, tint ?? "#edb692");
      this.round(-25, -77, 50, 12, 4, "#faf0d4");
      this.line([-20, -51, 20, -51], "#ffffff66", 5);
      this.face(0, -32, 0.65, happy);
      if (!tint) {
        this.round(-30, -89, 60, 9, 3, "#654d67");
        this.round(-19, -108, 38, 24, 8, "#85687f");
        this.circle(31, -27, 13, "#d7f0ef88");
        this.line([38, -17, 50, -2], "#654d67", 5);
      }
    } else if (kind === "moth") {
      c.save();
      c.scale(1 + Math.sin(t * 6) * 0.09, 1);
      this.round(-47, -25, 45, 40, 20, "#e3d3f0");
      this.round(2, -25, 45, 40, 20, "#e3d3f0");
      this.circle(-24, -5, 8, "#c1aecf");
      this.circle(24, -5, 8, "#c1aecf");
      c.restore();
      this.round(-10, -22, 20, 46, 10, "#f4d298");
      this.line([-5, -20, -14, -38], "#f4d298", 3);
      this.line([5, -20, 14, -38], "#f4d298", 3);
      this.face(0, -14, 0.4, happy);
      if (happy) this.round(-15, -28, 30, 5, 2, "#685976");
    } else if (kind === "washer") {
      this.round(-62, -105, 124, 122, 14, "#625f86", "#bab9d0");
      this.round(-53, -95, 106, 23, 5, "#c9c5d8");
      this.circle(0, -24, 43, "#b5cbd3");
      this.circle(0, -24, 33, "#424966");
      for (let i = 0; i < 3; i++)
        this.circle(-28 + i * 26, -83, 4, happy ? "#ffd391" : "#747899");
      c.save();
      c.translate(0, -24);
      c.rotate(happy ? t * 2 : 0);
      this.line([-20, 0, 0, -18, 20, 0, 0, 18, -20, 0], "#d5b6d1", 6);
      c.restore();
    } else if (kind === "basket") {
      this.round(-62, -38, 124, 59, 12, "#b7947d", "#d9b799");
      for (let i = 0; i < 6; i++)
        this.line([-49 + i * 19, -30, -49 + i * 19, 12], "#d9b799", 4);
      this.line([-52, -6, 52, -6], "#d9b799", 4);
      if (happy) this.face(0, -16, 0.5, true);
    } else if (kind === "receipt") {
      this.round(-35, -55, 70, 82, 3, "#fff0cf");
      for (let i = 0; i < 4; i++)
        this.line(
          [-23, -40 + i * 13, 17 + (i % 2) * 8, -40 + i * 13],
          "#ad91a5",
          3,
        );
      this.circle(14, 6, 12, happy ? "#db9379" : "#c4c1d0");
      if (happy) this.line([8, 5, 13, 11, 23, -1], "#fff0cf", 3);
    } else if (kind === "worm") {
      for (let i = 0; i < 5; i++)
        this.circle(-45 + i * 22, -10 + Math.sin(t * 2 + i) * 4, 17, "#e4a798");
      this.face(40, -12, 0.55, happy);
      if (happy)
        for (let i = 0; i < 3; i++)
          this.round(-44 + i * 25, -28, 19, 22, 5, "#796986");
    } else if (["coat", "apron", "cape", "trousers", "scarf"].includes(kind)) {
      const cloth =
        tint ??
        (
          {
            coat: "#b4ccd1",
            apron: "#eee0b7",
            cape: "#817594",
            trousers: "#a6b1d0",
            scarf: "#dea895",
          } as Record<string, string>
        )[kind];
      if (kind === "scarf") {
        this.round(-42, -68, 84, 24, 10, cloth);
        this.round(-33, -58, 26, 88, 9, cloth);
        this.round(8, -53, 26, 63, 9, cloth);
      } else if (kind === "trousers") {
        this.round(-43, -75, 86, 34, 7, cloth);
        this.round(-43, -50, 35, 72, 6, cloth);
        this.round(8, -50, 35, 72, 6, cloth);
        this.circle(-23, -56, 8, "#ffe0a1");
        this.circle(23, -56, 8, "#d9d0ec");
      } else {
        c.beginPath();
        c.moveTo(-26, -78);
        c.lineTo(26, -78);
        c.lineTo(56, 18);
        c.lineTo(-56, 18);
        c.closePath();
        c.fillStyle = cloth;
        c.fill();
        if (kind === "coat") {
          this.line([-30, -62, -65, -12], cloth, 23);
          this.line([30, -62, 65, -12, 79, -38], cloth, 23);
        }
        if (kind === "apron") this.round(-25, -18, 50, 26, 7, "#bdc7a0");
        this.face(0, -39, 0.75, happy);
      }
    } else if (kind === "cup") {
      c.strokeStyle = "#fbf5e6";
      c.lineWidth = 15;
      c.beginPath();
      c.ellipse(60, -27, 23, 28, 0, 0, Math.PI * 2);
      c.stroke();
      this.round(-65, -63, 126, 77, 22, "#fffcf0", "#bfd3c7");
      this.round(-72, 15, 145, 9, 5, "#fcf7e8");
      this.face(0, -26, 1, true);
      this.line([-44, -48, -44, -18], "#e9b568", 3);
      this.round(-50, -20, 12, 18, 3, "#dca96c");
    } else if (kind === "heart") {
      c.beginPath();
      c.moveTo(0, 26);
      c.bezierCurveTo(-80, -20, -36, -65, 0, -36);
      c.bezierCurveTo(36, -65, 80, -20, 0, 26);
      c.fillStyle = happy ? "#f88077" : "#dc939b";
      c.fill();
      this.face(0, -13, 0.85, happy);
    } else if (kind === "wizard") {
      if (!happy) c.rotate(Math.PI);
      this.round(-25, -25, 50, 74, 14, "#8e8aba");
      this.line([-19, 42, -19, 57, -34, 57], "#473f68", 11);
      this.line([18, 42, 18, 57, 31, 57], "#473f68", 11);
      this.circle(0, -29, 27, "#ffdfb4");
      this.face(0, -29, 0.85, happy);
      c.beginPath();
      c.moveTo(-38, -45);
      c.lineTo(0, -110);
      c.lineTo(35, -45);
      c.closePath();
      c.fillStyle = "#7774b2";
      c.fill();
      this.round(-42, -50, 84, 11, 5, "#aca5d1");
      this.circle(0, -76, 5, "#ffe2a0");
      c.beginPath();
      c.moveTo(-21, -12);
      c.lineTo(0, 30);
      c.lineTo(23, -12);
      c.fillStyle = "#f5f1dd";
      c.fill();
    } else if (kind === "penguin" || kind === "cat" || kind === "robot") {
      const color =
        kind === "penguin" ? "#345e67" : kind === "cat" ? "#e9b067" : "#9dbeb4";
      this.round(-33, -70, 66, 79, 30, color);
      if (kind === "penguin") this.round(-24, -39, 48, 45, 20, "#fff4d8");
      if (kind === "cat") {
        this.line([-24, -60, -28, -82, -9, -65], color, 12);
        this.line([9, -65, 28, -82, 24, -60], color, 12);
      }
      if (kind === "robot") {
        this.round(-27, -59, 54, 29, 8, "#dbead5");
        this.line([0, -70, 0, -84], "#345e67", 3);
        this.circle(0, -87, 6, "#ff9e6e");
        this.round(-42, -39, 9, 33, 4, color);
        this.round(33, -39, 9, 33, 4, color);
      }
      this.face(0, -46, 0.8, happy);
      this.round(-31, 3, 25, 10, 5, "#e1a258");
      this.round(6, 3, 25, 10, 5, "#e1a258");
    } else if (kind === "dragon") {
      c.fillStyle = "#6caa9b";
      c.beginPath();
      c.moveTo(-20, -35);
      c.lineTo(-90, -75);
      c.lineTo(-65, 10);
      c.lineTo(0, 20);
      c.fill();
      this.round(-47, -38, 94, 75, 28, "#8abca4");
      this.round(-26, -13, 52, 47, 22, "#cfdbab");
      this.circle(27, -54, 38, "#95c4aa");
      this.round(25, -50, 63, 37, 17, "#a8d1b0");
      this.line([6, -81, 3, -101, 19, -88], "#e8d09c", 9);
      this.line([36, -86, 45, -101, 47, -77], "#e8d09c", 9);
      this.circle(30, -59, 4, "#284e48");
      this.circle(74, -34, 3, "#507e69");
      this.round(-52, 22, 33, 16, 8, "#73a990");
      this.round(16, 22, 33, 16, 8, "#73a990");
      this.line([-44, 20, -77, 30, -92, 15], "#73a990", 14);
    } else if (kind === "snowcone") {
      this.round(-64, -112, 128, 128, 15, "#b7cbbb", "#83a59d");
      this.round(-52, -101, 104, 65, 9, "#e6efde");
      this.round(-52, -28, 104, 35, 7, "#f0dfb7");
      this.line([-24, -81, 0, -42, 24, -81], "#b49476", 3);
      this.circle(0, -80, 23, "#f2b5a5");
      this.circle(-17, -85, 14, "#f5c7b5");
      this.circle(17, -85, 14, "#f5c7b5");
      this.round(-68, -120, 136, 19, 7, "#e8a883");
      this.circle(31, -10, 6, "#6e9d92");
    } else if (kind === "letter") {
      this.round(-49, -38, 98, 69, 7, "#fcf1d3", "#bdc6a5");
      this.line([-46, -33, 0, 3, 46, -33], "#c6ae84", 2);
      this.circle(0, 4, 14, "#e79a92");
      this.face(0, 1, 0.35, true);
    } else if (kind === "sun") {
      c.save();
      c.rotate(motionSafe(t, this.reducedMotion) * 0.06);
      for (let i = 0; i < 12; i++) {
        c.rotate(Math.PI / 6);
        this.line([0, -49, 0, -58], happy ? "#ffbc64" : "#b9cabb", 5);
      }
      c.restore();
      this.circle(0, 0, 42, happy ? "#ffd578" : "#d9e1c0");
      this.face(0, -2, 1, happy);
    } else if (kind === "duck") {
      c.save();
      c.rotate(happy ? Math.sin(t * 2) * 0.08 : 0);
      this.round(-42, -28, 80, 40, 22, "#f9cf68");
      this.circle(24, -32, 26, "#ffda75");
      this.round(42, -29, 23, 12, 5, "#ec9164");
      this.circle(29, -38, 3, "#355353");
      this.round(-25, -15, 37, 19, 10, "#edb652");
      c.restore();
    } else if (kind === "flower") {
      this.line([0, 0, 0, -77], "#6c9277", 7);
      c.save();
      c.translate(0, -80);
      if (happy) c.rotate(Math.sin(t) * 0.1);
      for (let i = 0; i < 6; i++)
        this.circle(
          Math.cos((i * Math.PI) / 3) * 21,
          Math.sin((i * Math.PI) / 3) * 21,
          17,
          "#f7d3bb",
        );
      this.circle(0, 0, 22, "#e8b760");
      this.face(0, -3, 0.6, happy);
      c.restore();
      this.round(-28, -4, 56, 23, 7, "#c58d73");
    } else if (kind === "ufo") {
      this.circle(0, -23, 39, "#b4dcd2");
      this.round(-70, -19, 140, 25, 15, "#b2aea3");
      this.round(-49, 4, 98, 12, 6, "#748f8d");
      this.face(0, -29, 0.8, true);
      for (let i = 0; i < 5; i++)
        this.circle(-48 + i * 24, -7, 4, i % 2 ? "#f7c975" : "#ed9980");
    } else if (kind === "jukebox") {
      this.round(-46, -111, 92, 126, 39, "#dc9d78", "#b78067");
      this.round(-35, -99, 70, 100, 29, "#f4d49c");
      this.round(-26, -58, 52, 55, 9, "#557c78");
      this.circle(0, -76, 13, "#fff1c6");
      for (let i = 0; i < 4; i++)
        this.line([-18, -42 + i * 10, 18, -42 + i * 10], "#385f5d", 3);
    } else if (kind === "cake") {
      this.round(-59, -70, 118, 80, 10, "#d9a081");
      this.round(-59, -75, 118, 27, 10, "#fff1db");
      this.line([-55, -25, 55, -25], "#fce9d4", 9);
      for (let i = -1; i <= 1; i++) {
        this.round(i * 32 - 3, -103, 7, 30, 3, "#78b6af");
        if (happy) this.circle(i * 32, -111, 6, "#ffb44d");
      }
      this.round(-70, 10, 140, 9, 4, "#eee9d5");
    } else {
      this.circle(0, 0, 42, happy ? "#ffd77b" : "#e6e3b7");
      this.circle(-20, -12, 8, "#d6d3a3");
      this.circle(22, 16, 6, "#d6d3a3");
      this.face(0, -2, 1, happy);
    }
    c.restore();
  }
  draw(world: World, time: number, thumbnail = false) {
    this.resize();
    const c = this.ctx;
    c.setTransform(this.canvas.width / W, 0, 0, this.canvas.height / H, 0, 0);
    c.clearRect(0, 0, W, H);
    const motion = this.reducedMotion ? 0 : time;
    const [top, bottom, ground] = palettes[world.level.theme];
    const bg = c.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, top);
    bg.addColorStop(1, bottom);
    c.fillStyle = bg;
    c.fillRect(0, 0, W, H);
    // Illustrated set dressing stays behind the puzzle, never in the HUD.
    c.globalAlpha = 0.3;
    if (world.level.theme === "kitchen" || world.level.theme === "town") {
      for (let x = 90; x < W; x += 270) {
        this.round(x, 84, 170, 208, 70, "#fffcf0");
        this.line([x + 85, 84, x + 85, 292], ground, 7);
        this.line([x, 185, x + 170, 185], ground, 7);
      }
    } else if (world.level.theme === "cave") {
      for (let i = 0; i < 13; i++) {
        c.beginPath();
        c.moveTo(i * 83, 0);
        c.lineTo(i * 83 + 35, 60 + (i % 3) * 32);
        c.lineTo(i * 83 + 73, 0);
        c.fillStyle = "#507f95";
        c.fill();
      }
    } else if (world.level.theme === "garden") {
      for (let i = 0; i < 7; i++)
        this.circle(i * 165, 487, 100 + (i % 3) * 20, "#9fae83");
    } else if (world.level.theme === "reef") {
      for (let i = 0; i < 6; i++) {
        const x = 80 + i * 163;
        this.round(x, 80, 116, 103, 16, "#deaeaa");
        this.round(x + 12, 97, 92, 55, 9, "#245f70");
        this.line([x + 15, 165, x + 101, 165], "#f0d4b6", 5);
      }
      for (let i = 0; i < 14; i++) {
        const x = i < 7 ? 24 + i * 13 : 835 + (i - 7) * 15;
        this.line(
          [
            x,
            504,
            x - 9,
            460,
            x + Math.sin(motion + i) * 12,
            408 - (i % 4) * 30,
          ],
          "#9fcab4",
          10,
        );
      }
      for (let i = 0; i < 10; i++) {
        const x = (i * 113 + 37) % W,
          y = H - ((i * 71 + motion * 9) % H);
        c.beginPath();
        c.arc(x, y, 7 + (i % 3) * 4, 0, Math.PI * 2);
        c.strokeStyle = "#d9f7f0";
        c.lineWidth = 2;
        c.stroke();
      }
    } else {
      for (let i = 0; i < 70; i++)
        this.circle(
          (i * 137.3) % W,
          (i * 57.8) % 460,
          i % 4 === 0 ? 2.5 : 1.2,
          "#fff4cf",
        );
      c.strokeStyle = "#e7d6b8";
      c.lineWidth = 2;
      c.beginPath();
      c.ellipse(780, 150, 92, 35, -0.4, 0, Math.PI * 2);
      c.stroke();
      this.circle(780, 150, 43, "#b0b6c1");
    }
    c.globalAlpha = 1;
    if (world.level.theme === "laundry") {
      this.round(70, 65, 820, 62, 15, "#34344ed9");
      c.fillStyle = "#ffe4ac";
      c.textAlign = "center";
      c.font = "600 24px Outfit, sans-serif";
      c.fillText(
        world.completed
          ? "ODD SOCKS. GOOD COMPANY."
          : "PEARL'S MIDNIGHT EXCHANGE",
        480,
        102,
      );
      this.line([80, 151, 880, 151], "#d7c4c3", 3);
      for (let i = 0; i < 7; i++)
        this.prop(
          "sock",
          170 + i * 105,
          193,
          0.26,
          world.completed,
          motion,
          ["#c9b6dc", "#a4cbbf", "#e4b697"][i % 3],
        );
    }
    if (world.level.theme === "reef") {
      this.round(235, 63, 490, 58, 17, "#244f60ed", "#dca8a0");
      c.fillStyle = "#fff0ce";
      c.textAlign = "center";
      c.font = "600 25px Outfit, sans-serif";
      c.fillText(
        world.completed ? "DELIVERED WITH FEELING." : "BRINE & PARCEL",
        480,
        100,
      );
    }
    this.round(82, 487, 796, 23, 12, "#ffffff55");
    this.round(64, 506, 832, 70, 25, ground);
    this.round(64, 501, 832, 17, 8, "#edf2df");
    for (let i = 0; i < 24; i++) {
      const x = (i * 97 + 36 + Math.sin(motion * 0.2 + i) * 8) % W;
      const y = (i * 47 + motion * (3 + (i % 4))) % H;
      c.globalAlpha = 0.4;
      this.circle(x, y, 1 + (i % 3), "#ffffff");
      c.globalAlpha = 1;
    }
    if (world.level.channels) {
      const channels = world.level.channels;
      for (let i = 0; i < channels.branches.length; i++) {
        const points = world.channelPath(i).flat();
        this.line(points, "#353c5d", 21);
        this.line(points, "#aaa9c7", 12);
      }
      const inlet = channels.inlet;
      this.round(inlet.x, inlet.y, inlet.w, inlet.h, 8, "#d4e6df", "#435b70");
      c.fillStyle = "#2d465b";
      c.textAlign = "center";
      c.font = "bold 14px system-ui";
      c.fillText("INLET ↓", inlet.x + inlet.w / 2, inlet.y + 25);
      for (const drop of world.runoff) {
        const at = world.runoffPosition(drop);
        this.circle(at.x, at.y, 3, "#8ce2f4");
      }
    }
    for (const t of world.level.targets)
      if (t.motion) {
        c.beginPath();
        c.ellipse(
          t.x + t.w / 2,
          t.y + t.h / 2,
          t.motion.rx,
          t.motion.ry,
          0,
          0,
          Math.PI * 2,
        );
        c.strokeStyle = "#eee0cb66";
        c.lineWidth = 8;
        c.stroke();
      }
    for (const p of world.level.props) {
      const target = world.targets.find((t) => t.id === p.target);
      const done = target?.done ?? world.completed;
      if (p.revealOnly && !done) continue;
      const since = target?.done
        ? world.elapsed - target.completedAt + world.celebration
        : 0;
      let x = p.x,
        y = p.y;
      const followed = world.targets.find((t) => t.id === p.follow);
      if (followed) {
        x = followed.x + followed.w / 2;
        y = followed.y + followed.h * 0.75;
      }
      const reveal = world.completed ? p.reveal : undefined;
      if (reveal) {
        const mix = this.reducedMotion
          ? 1
          : clamp(world.celebration / 1.2, 0, 1);
        x += (reveal.x - x) * mix;
        y += (reveal.y - y) * mix;
      }
      if (done && p.kind === "wizard") y += clamp(since * 160, 0, 120);
      if (done && (p.kind === "penguin" || p.kind === "cat"))
        x += clamp(since * 90, 0, 280);
      if (done && p.kind === "ufo") y -= clamp(since * 50, 0, 120);
      if (p.kind === "duck" && target) y -= target.progress * 22;
      this.prop(
        reveal?.kind ?? p.kind,
        x,
        y,
        reveal?.scale ?? p.scale,
        done,
        motion,
        p.tint,
      );
    }
    for (const [index, t] of world.targets.entries()) {
      const available = world.available(t);
      if (t.done && t.verb !== "freeze" && t.verb !== "fill") continue;
      c.save();
      if (!available) c.globalAlpha = 0.3;
      if (t.verb === "melt") {
        for (let row = 0; row < t.rows; row++)
          for (let col = 0; col < t.cols; col++) {
            const health = t.cells[row * t.cols + col];
            if (health < 0.025) continue;
            c.globalAlpha = (available ? 0.62 : 0.24) * (0.35 + health * 0.65);
            this.round(
              t.x + col * CELL + 0.3,
              t.y + row * CELL + 0.3,
              Math.min(CELL, t.w - col * CELL) - 0.6,
              Math.min(CELL, t.h - row * CELL) - 0.6,
              2,
              (col + row) % 7 < 3 ? "#b4eff5" : "#89d2e2",
            );
          }
        c.globalAlpha = available ? 0.8 : 0.25;
        this.line([t.x + 9, t.y + 7, t.x + 26, t.y + 7], "#efffff", 3);
      } else {
        const colors = {
          freeze: "#74b8d4",
          warm: "#e79576",
          fill: "#77b0b6",
          spin: "#d4a55e",
        };
        c.setLineDash(t.done ? [] : [5, 6]);
        c.strokeStyle = colors[t.verb];
        c.lineWidth = 2;
        c.beginPath();
        c.roundRect(t.x, t.y, t.w, t.h, 9);
        c.stroke();
        c.setLineDash([]);
        if (t.verb === "freeze" || t.verb === "fill") {
          const h = Math.max(0, (t.h - 4) * t.progress);
          if (h > 0)
            this.round(
              t.x + 2,
              t.y + t.h - h - 2,
              t.w - 4,
              h,
              4,
              t.verb === "freeze" ? "#9ad4e4dd" : "#5dbece99",
            );
          if (t.verb === "freeze" && t.progress > 0.2) {
            for (let i = 1; i < t.w / 30; i++)
              this.line(
                [t.x + i * 30, t.y + t.h - h, t.x + i * 30 + 5, t.y + t.h - 8],
                "#e0faff88",
                2,
              );
          }
        }
        if (t.verb === "spin") {
          c.save();
          c.translate(t.x + t.w / 2, t.y + t.h / 2);
          c.rotate(t.progress * 40);
          this.circle(0, 0, 23, "#e8c28c");
          for (let i = 0; i < 6; i++) {
            c.rotate(Math.PI / 3);
            this.round(-4, -27, 8, 24, 3, "#618982");
          }
          this.circle(0, 0, 8, "#f9e7ba");
          c.restore();
        }
        if (t.verb === "warm" && t.progress > 0) {
          c.globalAlpha = t.progress * 0.4;
          this.circle(t.x + t.w / 2, t.y + t.h / 2, t.w / 2, "#ffb765");
        }
      }
      c.restore();
      if (!thumbnail && !t.done) {
        if (t.motion) {
          this.round(t.x + 5, t.y - 28, t.w - 10, 19, 6, "#fff1db");
          c.fillStyle = "#434661";
          c.font = "bold 10px system-ui";
          c.textAlign = "center";
          c.fillText(
            t.name.replace(/^Follow the /, "").toUpperCase(),
            t.x + t.w / 2,
            t.y - 15,
          );
        }
        this.circle(t.x - 12, t.y - 12, 13, available ? "#214f50" : "#899d97");
        c.fillStyle = "#fffcf0";
        c.font = "bold 13px system-ui";
        c.textAlign = "center";
        c.fillText(String(index + 1), t.x - 12, t.y - 7);
        if (t.progress > 0) {
          this.round(t.x, t.y + t.h + 7, t.w, 4, 2, "#234b4c22");
          this.round(
            t.x,
            t.y + t.h + 7,
            Math.max(3, t.w * t.progress),
            4,
            2,
            "#397a76",
          );
        }
      }
    }
    if (!thumbnail) {
      // A tiny squad member anchors the hose, not an information panel.
      this.prop("robot", 130, 493, 0.64, true, motion);
      this.round(103, 442, 54, 11, 5, "#f99d69");
      this.round(110, 424, 40, 24, 11, "#ffb27e");
      const n = world.nozzle;
      c.beginPath();
      c.moveTo(140, 484);
      c.bezierCurveTo(270, 562, n.x - 130, n.y - 50, n.x, n.y - 12);
      c.strokeStyle = "#244e50";
      c.lineWidth = 13;
      c.stroke();
      c.strokeStyle = "#e9ab72";
      c.lineWidth = 8;
      c.stroke();
      for (const d of world.drops) {
        this.line(
          [d.x - d.vx * 0.014, d.y - d.vy * 0.014, d.x, d.y],
          temperatureColor(d.temp),
          3.4,
        );
      }
      c.save();
      c.translate(n.x, n.y);
      c.rotate(-n.angle);
      this.round(-15, -27, 30, 45, 8, "#234f51");
      this.round(-17, -15, 34, 25, 6, "#ff9e68");
      this.round(-12, 13, 24, 13, 4, "#ebefdb");
      this.round(-7, -12, 14, 7, 3, temperatureColor(n.temp));
      c.restore();
      c.textAlign = "left";
      c.font = "bold 11px system-ui";
      c.letterSpacing = "2px";
      c.fillStyle = ["cosmos", "laundry", "reef"].includes(world.level.theme)
        ? "#e5efdf"
        : "#416965";
      c.fillText("MELT SQUAD  /  RESCUE CAM", 28, 31);
      c.letterSpacing = "0px";
      const active = world.targets.find((t) => t.flash > 0 && t.feedback);
      if (active) {
        c.font = "bold 14px system-ui";
        c.textAlign = "center";
        const width = c.measureText(active.feedback).width + 35;
        this.round(W / 2 - width / 2, 48, width, 32, 16, "#fff6e8ed");
        c.fillStyle = "#8e5342";
        c.fillText(active.feedback, W / 2, 69);
      }
    }
    for (const s of world.sparks) {
      c.globalAlpha = clamp(s.life / s.maxLife, 0, 1);
      if (
        this.sparkle.complete &&
        this.sparkle.naturalWidth &&
        s.maxLife > 0.65
      )
        c.drawImage(this.sparkle, s.x - 7, s.y - 7, 14, 14);
      else this.circle(s.x, s.y, 2.8, s.color);
    }
    c.globalAlpha = 1;
  }
}
