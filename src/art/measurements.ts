import type { Renderer } from "../render";
import type { World } from "../engine";
import { activePrismVertices } from "../mechanics/optics";

/** Physical indicators stay separate from decorative scene props. */
export function drawMeasurements(r: Renderer, world: World) {
  const c = r.ctx;
  for (const target of world.targets) {
    if (!world.targetVisible(target)) continue;
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
    const mycelium = world.level.theme === "mycelium";
    if (mycelium) {
      const inlet = world.targets.find(
        (target) => target.id === scale.right.target,
      );
      if (inlet) {
        c.save();
        r.line(
          [inlet.x - 12, inlet.y, inlet.x + inlet.w + 12, inlet.y],
          "#648975",
          3,
        );
        c.fillStyle = "#345651";
        c.font = "bold 11px system-ui";
        c.textAlign = "center";
        c.fillText("CAPACITY · 5 kg", inlet.x + inlet.w / 2, inlet.y - 10);
        c.restore();
      }
    }
    c.save();
    c.translate(scale.x, scale.y);
    if (mycelium) {
      r.round(-240, 40, 480, 12, 6, "#a2c29a66");
      r.line([-240, 46, -215, 46], "#648975", 2);
      r.line([215, 46, 240, 46], "#648975", 2);
    }
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
      const load = side < 0 ? scale.left : scale.right;
      const ice = world.targets.find(
        (target) => target.id === load.target && target.reversibleIce,
      );
      if (ice) {
        // The actual collision cup rides this endpoint; its ice body is drawn
        // once by the target renderer, at its measured partial volume.
        r.line(
          [x - 54, y + 40, x - 54, y + 115, x + 54, y + 115, x + 54, y + 40],
          "#a78a70",
          4,
        );
        r.line(
          [x - 54, y + 40, x - 20, y, x + 20, y, x + 54, y + 40],
          "#ae9fbb",
          2,
        );
        r.round(x - 34, y - 3, 68, 8, 3, "#d4b487", "#806978");
        r.prop(
          side < 0 ? "buttonseated" : "featheradmiral",
          x,
          y - 3,
          side < 0 ? 0.55 : 0.7,
          world.completed,
          world.elapsed,
        );
        r.round(x - 82, y + 119, 164, 22, 6, "#fff0d5", "#a78a70");
        c.fillStyle = "#345651";
        c.font = "bold 12px system-ui";
        c.textAlign = "center";
        c.fillText(mass.toFixed(2) + " kg · toy + ice", x, y + 133);
        continue;
      }
      r.line([x, y, x - 28, y + 49, x + 28, y + 49, x, y], "#82968c", 2);
      const height = Math.min(25, (25 * mass) / capacity);
      if (height > 0 && !(mycelium && side < 0))
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
      if (mycelium && side < 0)
        r.prop("modestcrate", x, y + 46, 0.5, world.completed, world.elapsed);
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
      const target = world.targets.find((t) => t.id === splitter.target);
      if (target && !world.targetVisible(target)) continue;
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
      if (target && !world.targetVisible(target)) continue;
      const active = activePrismVertices(prism, target);
      c.beginPath();
      prism.vertices.forEach(([x, y], i) =>
        i === 0 ? c.moveTo(x, y) : c.lineTo(x, y),
      );
      c.closePath();
      c.fillStyle = target?.done && !prism.height ? "#b9edf499" : "#b9edf422";
      c.fill();
      c.strokeStyle = target?.done ? "#8ab7c6" : "#759eae";
      c.lineWidth = target?.done ? 4 : 2;
      c.setLineDash(target?.done && !prism.height ? [] : [5, 6]);
      c.stroke();
      c.setLineDash([]);
      if (prism.height && target) {
        if (active) {
          c.beginPath();
          active.forEach(([x, y], i) =>
            i === 0 ? c.moveTo(x, y) : c.lineTo(x, y),
          );
          c.closePath();
          c.fillStyle = "#b9edf4aa";
          c.fill();
          c.strokeStyle = "#497f96";
          c.lineWidth = 3;
          c.stroke();
        }
        const base = Math.max(...prism.vertices.map(([, y]) => y));
        const top = Math.min(...prism.vertices.map(([, y]) => y));
        const notch = base - (base - top) * prism.height.mark;
        r.line(
          [target.x - 7, notch, target.x + target.w + 7, notch],
          "#fff1c7",
          3,
        );
        r.round(
          target.x - 8,
          base + 8,
          target.w + 16,
          36,
          7,
          "#fff1d8",
          "#8d766c",
        );
        c.fillStyle = "#4d485b";
        c.font = "bold 11px system-ui";
        c.textAlign = "center";
        c.fillText(
          Math.round(target.progress * 100) + "% HEIGHT",
          target.x + target.w / 2,
          base + 23,
        );
        c.font = "10px system-ui";
        c.fillText(
          prism.height.mark === 1 ? "FULL GUIDE" : "65% NOTCH",
          target.x + target.w / 2,
          base + 37,
        );
      }
    }
    r.round(lamp.x - 47, lamp.y - 21, 40, 42, 10, "#d0ac6b", "#8e785e");
    r.round(lamp.x - 10, lamp.y - 14, 12, 28, 4, "#fff1bb");
    r.line([lamp.x - 28, lamp.y + 21, lamp.x - 28, lamp.y + 40], "#82968c", 6);
    r.round(lamp.x - 44, lamp.y + 36, 34, 9, 4, "#82968c");
    for (const mirror of optics.mirrors) {
      const target = world.targets.find((t) => t.id === mirror.target);
      if (target && !world.targetVisible(target)) continue;
      const built = world.targets.find((t) => t.id === mirror.target)?.done;
      const dx = (Math.cos(mirror.angle) * mirror.length) / 2;
      const dy = (Math.sin(mirror.angle) * mirror.length) / 2;
      if (mirror.housing === "prism") {
        // A silvered diagonal in an ice-prism housing. The ray still follows
        // the actual finite reflector; these outer edges are display only.
        c.beginPath();
        c.moveTo(mirror.x - dx, mirror.y - dy);
        c.lineTo(mirror.x - dx, mirror.y + dy);
        c.lineTo(mirror.x + dx, mirror.y + dy);
        c.closePath();
        c.fillStyle = built ? "#b9edf499" : "#b9edf433";
        c.fill();
        c.strokeStyle = "#8ab7c6";
        c.lineWidth = built ? 3 : 2;
        c.setLineDash(built ? [] : [5, 6]);
        c.stroke();
        c.setLineDash([]);
      }
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
      const dx = detector.label?.[0] ?? detector.x;
      const dy = detector.label?.[1] ?? detector.y + detector.radius + 23;
      if (world.level.theme === "apocalypse")
        r.round(dx - 79, dy - 15, 158, 23, 6, "#fff1d8");
      c.fillStyle = world.level.theme === "seamworks" ? "#fff0d9" : "#345651";
      c.font = "bold 12px system-ui";
      c.textAlign = "center";
      c.fillText(
        detector.name
          ? detector.name.toUpperCase() + (lit ? " · READY" : " · WAITING")
          : lit
            ? "LIGHT RECEIVED"
            : "WAITING FOR LIGHT",
        dx,
        dy,
      );
    }
    c.restore();
  }
}
