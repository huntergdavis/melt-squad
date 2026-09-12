import { test, expect, type Page } from "@playwright/test";
import { levels } from "../src/levels";

const set = (page: Page, selector: string, value: number) =>
  page.locator(selector).evaluate((element: HTMLInputElement, value) => {
    element.value = String(value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
async function aim(page: Page, x: number, y: number) {
  const box = (await page.locator("#game").boundingBox())!;
  await page.mouse.click(
    box.x + (x / 960) * box.width,
    box.y + (y / 580) * box.height,
  );
}
async function sprayUntilComplete(page: Page, id: string, budget: number) {
  const objective = page.locator("#objective-" + id);
  for (let elapsed = 0; elapsed < budget; elapsed += 500) {
    if ((await objective.getAttribute("class"))?.includes("complete")) break;
    await page.clock.runFor(500);
  }
  await expect(objective).toHaveClass(/complete/);
}

test("the Festival finale is earned with actual water and no earlier medals", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.goto("./#play/20.20");
  await expect(page.locator(".objective")).toHaveCount(7);
  await expect(page.locator("#total-progress")).toHaveText(
    "0 / 400 calls answered",
  );
  await expect(page.locator("#objective-sharedBasin")).toHaveClass(/locked/);
  await set(page, "#pressure", 85);
  // Deliberately interleave the four independent preparations.
  for (const [id, x, y, temp] of [
    ["rightBase", 725, 398, -20],
    ["leftPennant", 355, 123, 100],
    ["leftBase", 300, 398, -20],
    ["rightPennant", 610, 123, 100],
  ] as const) {
    await set(page, "#temperature", temp);
    if (temp > 0) {
      for (let step = 0; step < 16; step++) {
        if (
          (
            await page.locator("#objective-" + id).getAttribute("class")
          )?.includes("complete")
        )
          break;
        await aim(page, x + [-42, -14, 14, 42][step % 4], y);
        await page.clock.runFor(250);
      }
    } else {
      await aim(page, x, y);
      await sprayUntilComplete(page, id, 4000);
    }
    await expect(page.locator("#objective-" + id)).toHaveClass(/complete/);
  }
  await expect(page.locator("#objective-heart")).toHaveClass(/locked/);
  await set(page, "#temperature", 20);
  await aim(page, 430, 380);
  await sprayUntilComplete(page, "sharedBasin", 4000);
  await expect(page.locator("#objective-sharedBasin")).toHaveClass(/complete/);
  await expect(page.locator("#objective-celebration")).toHaveClass(/locked/);
  await page.keyboard.press("Space");
  await page.clock.runFor(800);
  await set(page, "#temperature", 40);
  await set(page, "#pressure", 22);
  await aim(page, 495, 248);
  await page.keyboard.press("Space");
  await sprayUntilComplete(page, "heart", 5000);
  await expect(page.locator("#objective-heart")).toHaveClass(/complete/);
  await set(page, "#pressure", 85);
  await aim(page, 805, 228);
  await sprayUntilComplete(page, "celebration", 5000);
  await expect(page.locator(".objective.complete")).toHaveCount(7);
  await page.clock.runFor(2100);
  await expect(page.locator(".postcard-stamp")).toHaveText(
    "GLAD YOU CAME. YOUR PLACE WAS PART OF THE PLAN.",
  );
  const stars = await page.evaluate(
    () => JSON.parse(localStorage.getItem("melt-squad-v1")!).stars,
  );
  expect(Object.keys(stars)).toEqual(["20.20"]);
  expect(stars["20.20"]).toBeGreaterThan(0);
  await expect(page.locator('dialog [data-action="next"]')).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Back to the world map", exact: true }),
  ).toBeVisible();
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/festival-earned-finale.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Replay this call", exact: true })
    .click();
  await expect(page.locator("#objective-sharedBasin")).toHaveClass(/locked/);
  await expect(page.locator(".objective.complete")).toHaveCount(0);
  await expect(page.locator("#total-progress")).toHaveText(
    "1 / 400 calls answered",
  );
});

test("a completed 400-call save has twenty open worlds and direct replay", async ({
  page,
}) => {
  // Navigation fixture only; physical reachability is tested with real water separately.
  await page.addInitScript(
    (ids) => {
      if (localStorage.getItem("melt-squad-v1")) return;
      localStorage.setItem(
        "melt-squad-v1",
        JSON.stringify({
          version: 1,
          stars: Object.fromEntries(ids.map((id) => [id, 1])),
          best: Object.fromEntries(ids.map((id) => [id, 60])),
          lastWorld: "20",
          lastScene: "20.20",
        }),
      );
    },
    levels.map((level) => level.id),
  );
  await page.goto("./#atlas");
  await expect(page.locator("#total-progress")).toHaveText(
    "400 / 400 calls answered",
  );
  await expect(page.locator(".world-island.released")).toHaveCount(20);
  await expect(page.locator(".world-island.coming")).toHaveCount(0);
  await expect(page.locator(".board-note")).toHaveText(
    "20 worlds open · 400 rescue calls",
  );
  await page.locator(".hero .primary").click();
  await expect(page.locator(".world-island")).toHaveCount(20);
  await page.locator('[data-world="20"]').click();
  await expect(page.locator(".scene-node.rescued")).toHaveCount(20);
  await expect(page.locator(".map-legend")).not.toContainText("coming later");
  await expect(page.locator('[data-action="world-continue"]')).toBeDisabled();
  await page.locator('[data-scene="20.20"]').click();
  await expect(page.locator("[data-launch]")).toContainText("Replay rescue");
  await page.locator("[data-launch]").click();
  await expect(page.locator("#mission-title")).toHaveText(
    "The Warmest Place Is the Welcome",
  );
  await expect(page.locator(".objective.complete")).toHaveCount(0);
  await expect(page.locator("#total-progress")).toHaveText(
    "400 / 400 calls answered",
  );
});
