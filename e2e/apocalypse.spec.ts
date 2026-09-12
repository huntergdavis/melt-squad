import { test, expect, type Page } from "@playwright/test";
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
async function start(page: Page, id: string) {
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.goto("./#play/" + id);
  await set(page, "#pressure", 85);
}
test("real ice plugs divert soup to the raised bowl, then remelt to serve both sides", async ({
  page,
}) => {
  test.setTimeout(90000);
  await start(page, "18.11");
  await set(page, "#temperature", -40);
  for (const x of [370, 590]) {
    await aim(page, x, 203);
    await page.clock.runFor(1600);
  }
  await expect(page.locator("#objective-leftPlug strong")).toHaveText(
    "Reopen the left tributary",
  );
  await expect(page.locator("#objective-leftPlug")).toHaveClass(/locked/);
  await expect(page.locator("#objective-leftPlug small")).toContainText(
    "raised middle weir",
  );
  await set(page, "#temperature", 20);
  await aim(page, 480, 98);
  await page.clock.runFor(5800);
  await expect(page.locator("#objective-middleBowl")).toHaveClass(/complete/);
  await expect(page.locator("#objective-leftBowl")).not.toHaveClass(/complete/);
  await expect(page.locator("#objective-rightBowl")).not.toHaveClass(
    /complete/,
  );
  await set(page, "#temperature", 100);
  for (const x of [370, 590])
    for (let i = 0; i < 12; i++) {
      await aim(page, x + [-27, -9, 9, 27][i % 4], 203);
      await page.clock.runFor(250);
    }
  await expect(page.locator("#objective-leftPlug")).toHaveClass(/complete/);
  await expect(page.locator("#objective-rightPlug")).toHaveClass(/complete/);
  await set(page, "#temperature", 20);
  await aim(page, 480, 98);
  await page.clock.runFor(8000);
  await expect(page.locator("#objective-leftBowl")).toHaveClass(/complete/);
  await expect(page.locator("#objective-rightBowl")).toHaveClass(/complete/);
  await page.clock.runFor(2100);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/apocalypse-soup-postcard.png",
    fullPage: true,
  });
});
test("three adjustable ice prisms turn an ominous sky into actual received light", async ({
  page,
}) => {
  test.setTimeout(90000);
  await start(page, "18.18");
  await set(page, "#temperature", -40);
  for (const [x, y] of [
    [280, 118],
    [495, 163],
    [740, 158],
  ]) {
    await aim(page, x, y);
    await page.clock.runFor(5500);
  }
  await page.keyboard.press("Space");
  await page.clock.runFor(1000);
  for (const id of ["leftPrism", "centerPrism", "rightPrism"]) {
    await expect(page.locator("#objective-" + id + " small")).toContainText(
      "100% ICE HEIGHT",
    );
    await expect(page.locator("#objective-" + id)).not.toHaveClass(/complete/);
  }
  await set(page, "#temperature", 40);
  for (const [x, y] of [
    [280, 118],
    [740, 158],
  ]) {
    await aim(page, x, y);
    await page.keyboard.press("Space");
    await page.clock.runFor(1750);
    await page.keyboard.press("Space");
    await page.clock.runFor(1000);
  }
  await page.clock.runFor(2100);
  await expect(page.locator("#objective-leftPrism small")).toContainText(
    "ice stays just this size",
  );
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/apocalypse-constellation-postcard.png",
    fullPage: true,
  });
});
