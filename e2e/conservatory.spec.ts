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
async function thaw(page: Page, id: string, x: number) {
  await set(page, "#temperature", 100);
  const goal = page.locator(`#objective-${id}`);
  for (
    let i = 0;
    i < 50 && !(await goal.getAttribute("class"))?.includes("complete");
    i++
  ) {
    // Four real stream positions cover the six-column ice mouth without
    // repeatedly visiting already-open cells; measured against the authored World.
    await aim(page, x + [5, 25, 35, 55][i % 4], 240);
    await page.clock.runFor(250);
  }
  await expect(goal).toHaveClass(/complete/);
}

test("rain reaches the greenhouse clouds only through their open irrigation routes", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 960, height: 800 });
  await page.clock.install();
  await page.goto("./#play/13.14");
  await set(page, "#temperature", 20);
  await set(page, "#pressure", 85);
  await aim(page, 490, 108);
  await page.clock.runFor(3000);
  await expect(page.locator("#objective-reservoir")).toHaveClass(/complete/);
  await expect(page.locator("#objective-nearCloud")).not.toHaveClass(
    /complete/,
  );
  await expect(page.locator("#objective-farCloud")).not.toHaveClass(/complete/);
  await thaw(page, "nearBlock", 370);
  await set(page, "#temperature", 20);
  await aim(page, 490, 108);
  await page.clock.runFor(5000);
  await expect(page.locator("#objective-nearCloud")).toHaveClass(/complete/);
  await expect(page.locator("#objective-farCloud")).not.toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await thaw(page, "farBlock", 550);
  await set(page, "#temperature", 20);
  await aim(page, 490, 108);
  await page.clock.runFor(9000);
  await expect(page.locator("#objective-farCloud")).toHaveClass(/complete/);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("Destiny");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/conservatory-irrigation-postcard.png",
    fullPage: true,
  });
});

test("the single rail planter supports saved stationary play without an extra startup chore", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./#play/13.18");
  await expect(page.locator(".objective")).toHaveCount(1);
  await page.keyboard.press("Space");
  await page.clock.runFor(4000);
  await page.locator("#motion-assist").click();
  await expect(page.locator("#motion-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.reload();
  await expect(page.locator("#motion-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await set(page, "#temperature", 20);
  await set(page, "#pressure", 85);
  await aim(page, 655, 288);
  await page.clock.runFor(5000);
  await expect(page.locator("#objective-planter")).toHaveClass(/complete/);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("return ticket");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/conservatory-rail-planter-postcard.png",
    fullPage: true,
  });
});
