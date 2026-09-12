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

test("the freight cup keeps its one-time lift requirement with saved stationary assist", async ({
  page,
}) => {
  await page.setViewportSize({ width: 960, height: 800 });
  await page.clock.install();
  await page.goto("./#play/14.14");
  await expect(page.locator(".objective")).toHaveCount(2);
  await page.locator("#motion-assist").click();
  await page.reload();
  await expect(page.locator("#motion-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await set(page, "#temperature", 20);
  await set(page, "#pressure", 85);
  // The cup begins at the lower stop. Assist parks it there, without bypassing
  // the turbine or replacing actual liquid-water arrivals with a completion flag.
  await aim(page, 670, 353);
  await page.clock.runFor(1000);
  await expect(page.locator("#objective-cup")).not.toHaveClass(/complete/);
  await aim(page, 355, 278);
  await page.clock.runFor(3000);
  await expect(page.locator("#objective-lift")).toHaveClass(/complete/);
  await expect(page.locator("#objective-cup")).not.toHaveClass(/complete/);
  await aim(page, 670, 353);
  await page.clock.runFor(3000);
  await expect(page.locator("#objective-cup")).toHaveClass(/complete/);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("refreshments");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/mycelium-freight-postcard.png",
    fullPage: true,
  });
});

test("the book freight waits for its filled counterweight to settle before awarding the postcard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 960, height: 800 });
  await page.clock.install();
  await page.goto("./#play/14.18");
  await expect(page.locator(".objective")).toHaveCount(1);
  await set(page, "#temperature", 20);
  await set(page, "#pressure", 85);
  await aim(page, 660, 123);
  await page.clock.runFor(3000);
  await expect(page.locator("#objective-counterweight")).toHaveClass(
    /complete/,
  );
  await expect(page.locator("#stage-state")).toContainText("scale settle");
  await expect(page.locator("dialog")).not.toBeVisible();
  await page.keyboard.press("Space");
  await page.clock.runFor(6000);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("Modest Ideas");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/mycelium-book-scale-postcard.png",
    fullPage: true,
  });
});
