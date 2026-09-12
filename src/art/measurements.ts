import type { Renderer } from "../render";
import type { World } from "../engine";

/** Physical indicators stay separate from decorative scene props. */
export function drawMeasurements(r: Renderer, world: World) {
  const c = r.ctx;
  for (const target of world.targets) {
    if (!target.phase) continue;
    const cards = target.phase.steps.flatMap((step, i) => [
      ...(step.requires ?? []).map((id) => {
        const task = world.targets.find((t) => t.id === id)!;
        return {
          label: task.verb.toUpperCase(),
          done: task.done,
          active: world.available(task) && !task.done,
        };
      }),
      {
        label: step.verb === "freeze" ? "BUILD" : "OPEN",
        done: target.done || target.phaseStep > i,
        active:
          target.phaseStep === i && world.available(target) && !target.done,
      },
    ]);
    const width = Math.max(65, target.w / cards.length);
    const left = target.x + target.w / 2 - (width * cards.length) / 2;
    const top =
      target.y + target.h + 17 <= 480
        ? target.y + target.h + 17
        : target.y - 41;
    c.save();
    cards.forEach((card, i) => {
      const x = left + i * width;
      r.round(
        x,
        top,
        width - 5,
        27,
        7,
        card.done ? "#d5edcc" : card.active ? "#fff0bb" : "#ede4d4",
        "#8c8670",
      );
      c.font = "bold 11px system-ui";
      c.textAlign = "center";
      c.fillStyle = "#355952";
      c.fillText(
        (card.done ? "✓ " : "") + card.label,
        x + (width - 5) / 2,
        top + 18,
      );
    });
    c.restore();
  }
  const scale = world.level.balance,
    state = world.balance;
  if (scale && state) {
    c.save();
    c.translate(scale.x, scale.y);
    r.round(-8, -4, 16, 104, 6, "#7d8e80");
    r.round(-48, 94, 96, 14, 6, "#b99263", "#766e5e");
    const dx = Math.cos(state.angle) * scale.arm;
    const dy = Math.sin(state.angle) * scale.arm;
    const leftArm = scale.left.arm ?? 1,
      rightArm = scale.right.arm ?? 1;
    const unequal = leftArm !== rightArm;
    r.line(
      [-dx * leftArm, -dy * leftArm, dx * rightArm, dy * rightArm],
      "#9f835e",
      9,
    );
    r.line(
      [-dx * leftArm, -dy * leftArm - 3, dx * rightArm, dy * rightArm - 3],
      "#e7d3a3",
      3,
    );
    for (const side of [-1, 1]) {
      const arm = side < 0 ? leftArm : rightArm;
      const x = dx * side * arm,
        y = dy * side * arm;
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
      if (world.level.theme === "preschool" && side < 0)
        r.prop("ankylosaur", x, y + 42, 0.43, state.level, world.elapsed);
      c.fillStyle = "#345651";
      c.font = "bold 12px system-ui";
      c.textAlign = "center";
      c.fillText(
        mass.toFixed(1) +
          " kg" +
          (unequal ? " · " + arm + (arm === 1 ? " arm" : " arms") : ""),
        x,
        y + 76,
      );
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
          : Math.abs(state.leftMass * leftArm - state.rightMass * rightArm) <
              0.02
            ? "SETTLING…"
            : unequal
              ? "MAKE IT LEVEL"
              : "MATCH THE LOADS",
      0,
      -39,
    );
    c.restore();
  }
  const optics = world.level.optics;
  if (optics) {
    c.save();
    for (const { from, to, power } of world.light.segments) {
      r.line([...from, ...to], "#efc86644", 10);
      if (
        world.completed &&
        world.level.theme === "wedding" &&
        power !== undefined
      ) {
        // Painted celebration along an actual traced ray, not dispersion physics.
        const colors = c.createLinearGradient(from[0], from[1], to[0], to[1]);
        colors.addColorStop(0, "#bd9ed4");
        colors.addColorStop(0.5, "#e6aa93");
        colors.addColorStop(1, "#79b5a2");
        c.beginPath();
        c.moveTo(...from);
        c.lineTo(...to);
        c.strokeStyle = colors;
        c.lineWidth = 4;
        c.stroke();
      } else
        r.line(
          [...from, ...to],
          "#fff2a7",
          power === undefined ? 3 : Math.max(1.5, 3 * Math.sqrt(power)),
        );
    }
    const lamp = optics.source;
    for (const splitter of optics.splitters ?? []) {
      const built = world.targets.find((t) => t.id === splitter.target)?.done;
      const dx = (Math.cos(splitter.angle) * splitter.length) / 2;
      const dy = (Math.sin(splitter.angle) * splitter.length) / 2;
      const half = Math.max(Math.abs(dx), Math.abs(dy));
      r.round(
        splitter.x - half,
        splitter.y - half,
        half * 2,
        half * 2,
        4,
        built ? "#d4e8e5aa" : "#d4e8e544",
        "#73989d",
      );
      c.setLineDash(built ? [] : [5, 5]);
      r.line(
        [splitter.x - dx, splitter.y - dy, splitter.x + dx, splitter.y + dy],
        built ? "#a187b3" : "#a187b388",
        built ? 5 : 2,
      );
      c.setLineDash([]);
      if (built)
        r.line(
          [splitter.x - dx, splitter.y - dy, splitter.x + dx, splitter.y + dy],
          "#fff3d9",
          1.5,
        );
      c.fillStyle = "#53666a";
      c.font = "bold 11px system-ui";
      c.textAlign = "center";
      c.fillText(
        "SHARE THE LIGHT",
        splitter.x - half - 65,
        splitter.y + half + 18,
      );
    }
    for (const prism of optics.prisms ?? []) {
      const target = world.targets.find((t) => t.id === prism.target);
      c.beginPath();
      prism.vertices.forEach(([x, y], i) =>
        i === 0 ? c.moveTo(x, y) : c.lineTo(x, y),
      );
      c.closePath();
      c.fillStyle = target?.done ? "#b9edf499" : "#b9edf433";
      c.fill();
      c.strokeStyle = target?.done ? "#8ab7c6" : "#759eae";
      c.lineWidth = target?.done ? 4 : 2;
      c.setLineDash(target?.done ? [] : [5, 6]);
      c.stroke();
      c.setLineDash([]);
    }
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
        detector.name
          ? detector.name.toUpperCase() + (lit ? " · READY" : " · WAITING")
          : lit
            ? "LIGHT RECEIVED"
            : "WAITING FOR LIGHT",
        detector.label?.[0] ?? detector.x,
        detector.label?.[1] ?? detector.y + detector.radius + 23,
      );
    }
    c.restore();
  }
}
