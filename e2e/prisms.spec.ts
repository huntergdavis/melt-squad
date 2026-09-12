import { test, expect } from "@playwright/test";

test("two ice prisms bend real light onto the municipal sunshine bench", async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 750 });
  await page.clock.install();
  await page.goto("./#play/08.18");
  const set = async (selector: string, value: number) =>
    page.locator(selector).evaluate((element: HTMLInputElement, value) => {
      element.value = String(value);
      element.dispatchEvent(new Event("input", { bubbles: true }));
    }, value);
  const aim = async (x: number, y: number) => {
    const box = (await page.locator("#game").boundingBox())!;
    await page.mouse.click(
      box.x + (x / 960) * box.width,
      box.y + (y / 580) * box.height,
    );
  };
  await expect(page.locator(".objective.locked")).toHaveCount(2);
  await set("#temperature", 100);
  await set("#pressure", 90);
  for (let i = 0; i < 8; i++) {
    await aim(228 + (i % 3) * 18, 123);
    await page.clock.runFor(400);
  }
  await expect(page.locator(".objective.complete")).toHaveCount(1);
  await set("#temperature", -40);
  await aim(360, 78);
  await page.clock.runFor(2800);
  await expect(page.locator(".objective.complete")).toHaveCount(2);
  await expect(page.locator("dialog")).not.toBeVisible();
  await aim(620, 153);
  await page.clock.runFor(3800);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "sleepy municipal cat dragon",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/emberborough-sunshine-postcard.png",
    fullPage: true,
  });
});
