import { test, expect } from "@playwright/test";
import release from "../public/release.json" with { type: "json" };
import { levels } from "../src/levels";
const worldId = String(release.worlds).padStart(2, "0");
const content = levels.filter((level) => (level.pack ?? "01") === worldId);

test("the current release renders all twenty authored rescues", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(response.url());
  });
  await page.goto(`./#world/${worldId}`);
  await expect(page.locator(".scene-node.unbuilt")).toHaveCount(0);
  expect(content).toHaveLength(20);
  for (const [i, scene] of content.entries()) {
    await page.evaluate((id) => (location.hash = "#play/" + id), scene.id);
    await expect(page.locator("#mission-title")).toHaveText(scene.name);
    await expect(page.locator(".objective")).toHaveCount(scene.targets.length);
    if ([0, 4, 5, 13, 15, 17, 19].includes(i))
      await page.screenshot({
        path: `scratch/${release.release}-scene-${i + 1}.png`,
        fullPage: true,
      });
  }
  expect(errors).toEqual([]);
});

test("the current release's map and finale fit a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`./#world/${worldId}`);
  await page.screenshot({
    path: `scratch/${release.release}-map-phone.png`,
    fullPage: true,
  });
  await page.locator(`[data-scene="${worldId}.20"]`).click();
  await page.locator("[data-launch]").click();
  await expect(page.locator("#mission-title")).toHaveText(content[19].name);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
  const story = (await page.locator("#mission-pitch").boundingBox())!;
  const actions = (await page.locator(".mission-actions").boundingBox())!;
  expect(actions.y).toBeGreaterThanOrEqual(story.y + story.height);
  expect(story.width).toBeGreaterThan(300);
  await page.screenshot({
    path: `scratch/${release.release}-finale-phone.png`,
    fullPage: true,
  });
});
