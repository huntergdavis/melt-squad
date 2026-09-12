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
async function melt(page: Page, x: number, y: number, width: number) {
  await set(page, "#temperature", 100);
  for (let step = 0; step < 16; step++) {
    await aim(page, x + [-0.42, -0.14, 0.14, 0.42][step % 4] * width, y);
    await page.clock.runFor(250);
  }
}

test("the aquarium's saved stationary assist keeps all three windows and the gentle cabin service", async ({
  page,
}) => {
  test.setTimeout(90000);
  await start(page, "19.13");
  await page.locator("#motion-assist").click();
  await page.reload();
  await expect(page.locator("#motion-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".objective")).toHaveCount(4);
  await set(page, "#pressure", 85);
  await set(page, "#temperature", 35);
  await aim(page, 490, 398);
  await page.clock.runFor(600);
  await expect(page.locator("#objective-cabinBadge")).toHaveClass(/locked/);
  for (const [id, x] of [
    ["leftWindow", 340],
    ["middleWindow", 490],
    ["rightWindow", 640],
  ] as const) {
    await melt(page, x, 273, 100);
    await expect(page.locator("#objective-" + id)).toHaveClass(/complete/);
  }
  await expect(page.locator("#objective-cabinBadge")).not.toHaveClass(
    /complete/,
  );
  await page.keyboard.press("Space");
  await page.clock.runFor(800);
  await set(page, "#temperature", 35);
  await set(page, "#pressure", 22);
  await aim(page, 490, 398);
  await page.keyboard.press("Space");
  await page.clock.runFor(5000);
  await expect(page.locator("#objective-cabinBadge")).toHaveClass(/complete/);
  await page.clock.runFor(2100);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("tour guides");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/hotel-aquarium-postcard.png",
    fullPage: true,
  });
});

test("hotel tea reaches all three rooms only through opened gates and real reservoir overflow", async ({
  page,
}) => {
  test.setTimeout(90000);
  await start(page, "19.16");
  await set(page, "#temperature", 20);
  const cups = page
    .locator(".objective")
    .filter({ has: page.locator("small") });
  const before = await page
    .locator(".objective i")
    .evaluateAll((items) => items.map((item) => item.getAttribute("style")));
  await aim(page, 280, 373);
  await page.clock.runFor(1000);
  expect(
    await page
      .locator(".objective i")
      .evaluateAll((items) => items.map((item) => item.getAttribute("style"))),
  ).toEqual(before);
  await expect(cups).toHaveCount(7);
  for (const [x, y] of [
    [335, 228],
    [480, 263],
    [625, 228],
  ])
    await melt(page, x, y, 70);
  await set(page, "#temperature", 20);
  await aim(page, 480, 98);
  await page.clock.runFor(12000);
  await expect(page.locator(".objective.complete")).toHaveCount(7);
  await page.clock.runFor(2100);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("tiny tray");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/hotel-room-service-postcard.png",
    fullPage: true,
  });
});
