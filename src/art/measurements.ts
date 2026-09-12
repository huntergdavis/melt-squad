import type { Renderer } from "../render";
import type { World } from "../engine";

/** Physical indicators stay separate from decorative scene props. */
export function drawMeasurements(r: Renderer, world: World) {
  const c = r.ctx;
  const scale = world.level.balance,
    state = world.balance;
  if (scale && state) {
    c.save();
    c.translate(scale.x, scale.y);
    r.round(-8, -4, 16, 104, 6, "#7d8e80");
    r.round(-48, 94, 96, 14, 6, "#b99263", "#766e5e");
    const dx = Math.cos(state.angle) * scale.arm;
    const dy = Math.sin(state.angle) * scale.arm;
    r.line([-dx, -dy, dx, dy], "#9f835e", 9);
    r.line([-dx, -dy - 3, dx, dy - 3], "#e7d3a3", 3);
    for (const side of [-1, 1]) {
      const x = dx * side,
        y = dy * side;
      const mass = side < 0 ? state.leftMass : state.rightMass;
      const capacity = side < 0 ? scale.left.mass : scale.right.mass;
      r.line([x, y, x - 28, y + 49, x + 28, y + 49, x, y], "#82968c", 2);
      const height = Math.min(25, (25 * mass) / capacity);
      if (height > 0)
        r.round(
          x - 23,
          y + 48 - height,
          46,
          height,
          4,
          side < 0 ? "#74b7c0" : "#a1d9e0",
        );
      r.round(x - 33, y + 46, 66, 10, 4, "#d3b077", "#8e785e");
      c.fillStyle = "#345651";
      c.font = "bold 12px system-ui";
      c.textAlign = "center";
      c.fillText(mass.toFixed(1) + " kg", x, y + 76);
    }
    r.circle(0, 0, 13, "#9f835e");
    r.circle(0, 0, 10, "#eed3a0");
    r.circle(0, 0, 4, "#48786f");
    r.round(
      -84,
      -58,
      168,
      29,
      8,
      state.level ? "#d6ead0" : "#fff0d4",
      "#849485",
    );
    c.fillStyle = "#345651";
    c.font = "bold 13px system-ui";
    c.textAlign = "center";
    c.fillText(
      state.level
        ? "LEVEL · FAIRLY SHARED"
        : state.leftMass + state.rightMass < 0.05
          ? "ADD THE WEIGHTS"
          : Math.abs(state.leftMass - state.rightMass) < 0.02
            ? "SETTLING…"
            : "MATCH THE LOADS",
      0,
      -39,
    );
    c.restore();
  }
  const optics = world.level.optics;
  if (optics) {
    c.save();
    for (const { from, to } of world.light.segments) {
      r.line([...from, ...to], "#efc86644", 10);
      r.line([...from, ...to], "#fff2a7", 3);
    }
    const lamp = optics.source;
    r.round(lamp.x - 47, lamp.y - 21, 40, 42, 10, "#d0ac6b", "#8e785e");
    r.round(lamp.x - 10, lamp.y - 14, 12, 28, 4, "#fff1bb");
    r.line([lamp.x - 28, lamp.y + 21, lamp.x - 28, lamp.y + 40], "#82968c", 6);
    r.round(lamp.x - 44, lamp.y + 36, 34, 9, 4, "#82968c");
    for (const mirror of optics.mirrors) {
      const built = world.targets.find((t) => t.id === mirror.target)?.done;
      const dx = (Math.cos(mirror.angle) * mirror.length) / 2;
      const dy = (Math.sin(mirror.angle) * mirror.length) / 2;
      c.setLineDash(built ? [] : [4, 6]);
      r.line(
        [mirror.x - dx, mirror.y - dy, mirror.x + dx, mirror.y + dy],
        built ? "#608e91" : "#6b949488",
        built ? 10 : 4,
      );
      c.setLineDash([]);
      if (built)
        r.line(
          [mirror.x - dx, mirror.y - dy, mirror.x + dx, mirror.y + dy],
          "#edffff",
          3,
        );
    }
    for (const detector of optics.detectors) {
      const lit = world.light.lit.has(detector.id);
      r.circle(
        detector.x,
        detector.y,
        detector.radius + 6,
        lit ? "#568e78" : "#8b8f85",
      );
      r.circle(
        detector.x,
        detector.y,
        detector.radius,
        lit ? "#fff0a4" : "#d9dfcf",
      );
      if (lit)
        r.line(
          [
            detector.x - 8,
            detector.y,
            detector.x - 2,
            detector.y + 6,
            detector.x + 9,
            detector.y - 7,
          ],
          "#3d7967",
          3,
        );
      else r.circle(detector.x, detector.y, 6, "#7c9790");
      c.fillStyle = "#345651";
      c.font = "bold 12px system-ui";
      c.textAlign = "center";
      c.fillText(
        lit ? "LIGHT RECEIVED" : "WAITING FOR LIGHT",
        detector.x,
        detector.y + detector.radius + 23,
      );
    }
    c.restore();
  }
}
