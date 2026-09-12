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
async function clock(page: Page) {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
}

test("full ice cups still tip; hot trimming and real settling earn the feather captain's view", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await clock(page);
  await page.goto("./#play/17.14");
  await set(page, "#temperature", -40);
  await set(page, "#pressure", 85);
  await aim(page, 300, 328);
  await page.clock.runFor(5500);
  const left = page.locator("#objective-leftIce");
  const right = page.locator("#objective-rightIce");
  await expect(left.locator("small")).toContainText("100% ICE CAPACITY");
  await expect(left).not.toHaveClass(/complete/);
  await aim(page, 660, 266);
  await page.clock.runFor(5500);
  await page.keyboard.press("Space");
  await page.clock.runFor(2000);
  await expect(right.locator("small")).toContainText("100% ICE CAPACITY");
  await expect(right).not.toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await set(page, "#temperature", 40);
  await aim(page, 300, 390);
  await page.keyboard.press("Space");
  await page.clock.runFor(3750);
  await page.keyboard.press("Space");
  await page.clock.runFor(3500);
  await expect(left).toHaveClass(/complete/);
  await expect(right).toHaveClass(/complete/);
  await expect(left.locator("small")).toContainText(
    "ballast stays just this size",
  );
  // Completion is already real and visible above. Let the existing two-second
  // celebration finish; a paused browser clock does not advance during expect.
  await page.clock.runFor(2100);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("bravery");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/toybox-balanced-postcard.png",
    fullPage: true,
  });
});

test("the biscuit moons keep their orbit assist and reveal a Duck Nebula", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await clock(page);
  await page.goto("./#play/17.18");
  await expect(page.locator("#motion-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await set(page, "#temperature", 100);
  await set(page, "#pressure", 85);
  for (const [x, y] of [
    [580, 238],
    [390, 328.9327],
    [352.5, 116.7564],
  ]) {
    for (let step = 0; step < 12; step++) {
      await aim(page, x + [-27, -9, 9, 27][step % 4], y);
      await page.clock.runFor(250);
    }
  }
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("Duck Nebula");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/toybox-biscuit-nebula-postcard.png",
    fullPage: true,
  });
});
