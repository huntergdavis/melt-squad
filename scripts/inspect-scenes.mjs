// Local development aid, not a CI gate. Run a Vite dev server on port 4178 first.
// Usage: node scripts/inspect-scenes.mjs 07.05 07.16 07.20
import { chromium } from "@playwright/test";

const ids = process.argv.slice(2);
if (!ids.length || ids.some((id) => !/^\d{2}\.\d{2}$/.test(id)))
  throw new Error("Pass scene IDs, e.g. 07.20");
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1000, height: 620 },
  });
  await page.goto("http://127.0.0.1:4178/melt-squad/");
  for (const id of ids) {
    const result = await page.evaluate(async (id) => {
      const { levels } = await import("/melt-squad/src/levels.ts");
      const { World } = await import("/melt-squad/src/engine.ts");
      const { Renderer } = await import("/melt-squad/src/render.ts");
      const level = levels.find((level) => level.id === id);
      if (!level) throw new Error("Unknown scene: " + id);
      const world = new World(level);
      if (world.targets.some((t) => t.reversibleIce)) {
        const { solveBallast } = await import(
          "/melt-squad/scripts/solve-ballast.ts"
        );
        solveBallast(world);
      }
      const idle = { x: 0, y: 0, heat: 0, pressure: 0, tilt: 0 };
      const operations = world.targets.reduce(
        (n, t) => n + (t.phase?.steps.length ?? 1),
        0,
      );
      for (
        let operation = 0;
        operation < operations && !world.completed;
        operation++
      ) {
        let t = world.targets.find((t) => !t.done && world.available(t));
        if (!t) {
          world.nozzle.on = false;
          for (let frame = 0; frame < 1200 && !t; frame++) {
            world.update(1 / 60, idle);
            t = world.targets.find((t) => !t.done && world.available(t));
          }
          world.nozzle.on = true;
        }
        if (!t) throw new Error(id + ": no available work");
        const phase = t.phaseStep;
        const n = world.nozzle;
        n.temp =
          t.verb === "freeze"
            ? -40
            : t.verb === "warm"
              ? ((t.temp?.[0] ?? 20) + (t.temp?.[1] ?? 55)) / 2
              : 95;
        n.pressure =
          t.verb === "warm"
            ? ((t.pressure?.[0] ?? 10) + (t.pressure?.[1] ?? 55)) / 2
            : 90;
        n.angle = 0;
        for (
          let frame = 0;
          frame < 12000 && !t.done && phase === t.phaseStep;
          frame++
        ) {
          n.x = t.x + 8 + (t.w - 16) * (0.5 + 0.5 * Math.sin(frame / 29));
          n.y = t.y - 52;
          if (t.flowOnly) {
            n.x = level.channels.inlet.x + level.channels.inlet.w / 2;
            n.y = level.channels.inlet.y - 52;
          }
          world.update(1 / 60, idle);
        }
        if (!t.done && t.phaseStep === phase)
          throw new Error(id + ": stalled at " + t.id);
      }
      world.nozzle.on = false;
      for (let frame = 0; frame < 1200 && !world.completed; frame++)
        world.update(1 / 60, idle);
      if (!world.completed)
        throw new Error(id + ": physical completion did not settle");
      for (let frame = 0; frame < 180; frame++) world.update(1 / 60, idle);
      document.querySelector("#inspection")?.remove();
      const canvas = document.createElement("canvas");
      canvas.id = "inspection";
      canvas.width = 960;
      canvas.height = 580;
      canvas.style.cssText =
        "position:fixed;left:0;top:0;width:960px;height:580px;z-index:99999";
      document.body.append(canvas);
      const renderer = new Renderer(canvas);
      renderer.reducedMotion = true;
      renderer.draw(world, world.elapsed, true);
      return {
        id,
        name: level.name,
        elapsed: world.elapsed,
        completed: world.completed,
      };
    }, id);
    await page
      .locator("#inspection")
      .screenshot({ path: `scratch/ending-${id}.png` });
    console.log(JSON.stringify(result));
  }
} finally {
  await browser.close();
}
