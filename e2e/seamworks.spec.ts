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

test("the sleepy mask needs two real reflected moon-eyes and an unfrosted eyelid", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.clock.install();
  await page.goto("./#play/12.14");
  await set(page, "#temperature", -40);
  await set(page, "#pressure", 90);
  for (const [id, y] of [
    ["upperPrism", 98],
    ["lowerPrism", 258],
  ] as const) {
    await aim(page, 350, y);
    await page.clock.runFor(3000);
    await expect(page.locator(`#objective-${id}`)).toHaveClass(/complete/);
  }
  await expect(page.locator("dialog")).not.toBeVisible();
  const frost = page.locator("#objective-eyeFrost");
  await expect(frost).not.toHaveClass(/complete/);
  await set(page, "#temperature", 100);
  for (
    let i = 0;
    i < 40 && !(await frost.getAttribute("class"))?.includes("complete");
    i++
  ) {
    await aim(page, 743 + 34 * (0.5 + 0.5 * Math.sin((i * 15) / 29)), 283);
    await page.clock.runFor(250);
  }
  await expect(frost).toHaveClass(/complete/);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("matching moons");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/seamworks-moon-eyes-postcard.png",
    fullPage: true,
  });
});

test("changing the seam's mind visibly acknowledges all three stages", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/12.18");
  const seam = page.locator("#objective-seam");
  await expect(seam.locator("strong")).toHaveText("Support the first panel");
  await set(page, "#temperature", -40);
  await set(page, "#pressure", 90);
  await aim(page, 485, 228);
  await page.clock.runFor(3000);
  await expect(seam.locator("strong")).toHaveText("Open the second panel");
  await expect(seam).not.toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await set(page, "#temperature", 100);
  for (
    let i = 0;
    i < 60 &&
    (await seam.locator("strong").textContent()) !== "Repair the new seam";
    i++
  ) {
    await aim(page, 433 + 104 * (0.5 + 0.5 * Math.sin((i * 15) / 29)), 228);
    await page.clock.runFor(250);
  }
  await expect(seam.locator("strong")).toHaveText("Repair the new seam");
  await expect(seam).not.toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await set(page, "#temperature", -40);
  await aim(page, 485, 228);
  await page.clock.runFor(3500);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "Changed My Mind, Still Me",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/seamworks-reconsidered-seam-postcard.png",
    fullPage: true,
  });
});
