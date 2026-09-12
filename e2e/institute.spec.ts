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
  const objective = page.locator(`#objective-${id}`);
  for (
    let step = 0;
    step < 48 && !(await objective.getAttribute("class"))?.includes("complete");
    step++
  ) {
    await aim(page, x + [5, 25, 45, 65, 85, 95][step % 6], 188);
    await page.clock.runFor(250);
  }
  await expect(objective).toHaveClass(/complete/);
}

test("the museum light reaches its question mark only after the real ice windows are opened", async ({
  page,
}) => {
  await page.setViewportSize({ width: 960, height: 800 });
  await page.clock.install();
  await page.goto("./#play/15.14");
  await expect(page.locator(".objective")).toHaveCount(2);
  await set(page, "#temperature", 100);
  await set(page, "#pressure", 85);
  await thaw(page, "leftPane", 330);
  await expect(page.locator("#objective-rightPane")).not.toHaveClass(
    /complete/,
  );
  await expect(page.locator("dialog")).not.toBeVisible();
  await thaw(page, "rightPane", 535);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "clear explanation",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/institute-light-postcard.png",
    fullPage: true,
  });
});

test("the prebuilt floating footnote needs only filling and real settling, and Pause stops its clock", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/15.18");
  const tank = page.locator("#objective-tank");
  await expect(page.locator(".objective")).toHaveCount(1);
  await expect(tank).not.toHaveClass(/locked/);
  await set(page, "#temperature", 20);
  await set(page, "#pressure", 85);
  await aim(page, 590, 273);
  for (
    let step = 0;
    step < 70 && !(await tank.getAttribute("class"))?.includes("complete");
    step++
  )
    await page.clock.runFor(50);
  await expect(tank).toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(page.locator("#stage-state")).toContainText(/settle/i);
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toBeVisible();
  const pausedTime = await page.locator("#elapsed").innerText();
  await page.clock.runFor(3000);
  await expect(page.locator("#elapsed")).toHaveText(pausedTime);
  await page.getByRole("button", { name: "Back to the rescue" }).click();
  for (
    let step = 0;
    step < 40 && !(await page.locator(".postcard-stamp").isVisible());
    step++
  )
    await page.clock.runFor(250);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "Important Enough to Come Up Here",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/institute-footnote-postcard.png",
    fullPage: true,
  });
});
