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

test("the loaded ice podium rises to its dock after real construction and filling", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/10.18");
  const pontoon = page.locator("#objective-pontoon"),
    basin = page.locator("#objective-basin");
  await expect(basin).toHaveClass(/locked/);
  await set(page, "#temperature", -40);
  await set(page, "#pressure", 90);
  await aim(page, 485, 388);
  await page.clock.runFor(2800);
  await expect(pontoon).toHaveClass(/complete/);
  await expect(basin).not.toHaveClass(/locked/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await set(page, "#temperature", 20);
  await aim(page, 485, 273);
  for (
    let i = 0;
    i < 70 && !(await basin.getAttribute("class"))?.includes("complete");
    i++
  )
    await page.clock.runFor(50);
  await expect(basin).toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(page.locator("#stage-state")).toContainText(/settle/i);
  await page.clock.runFor(12000);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("everyone rises");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/sports-floating-podium-postcard.png",
    fullPage: true,
  });
});

test("patient relay lamps hold OPEN, show NEXT, and advance through all three athletes", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("./#play/10.15");
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const left = page.locator("#objective-leftLane"),
    middle = page.locator("#objective-middleLane"),
    right = page.locator("#objective-rightLane");
  await expect(left.locator("small")).toContainText("OPEN");
  await expect(middle.locator("small")).toContainText("NEXT");
  await expect(right.locator("small")).toContainText("NEXT");
  await set(page, "#temperature", 35);
  await set(page, "#pressure", 27);
  await aim(page, 707, 303);
  await page.clock.runFor(1200);
  await expect(right.locator("i")).toHaveAttribute("style", /width: 0%/);
  for (const [x, row] of [
    [297, left],
    [502, middle],
    [707, right],
  ] as const) {
    await expect(row.locator("small")).toContainText("OPEN");
    await aim(page, x, 303);
    await page.clock.runFor(4000);
    await expect(row).toHaveClass(/complete/);
  }
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/sports-patient-relay-postcard.png",
    fullPage: true,
  });
});
