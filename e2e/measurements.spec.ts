import { test, expect } from "@playwright/test";

test("actual water builds mirrors, opens the light path, and earns the sunshine postcard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 750 });
  await page.clock.install();
  await page.goto("./#play/05.16");
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
  await expect(page.locator("#objective-signature")).toHaveClass(/locked/);
  await set("#temperature", -40);
  await set("#pressure", 90);
  await aim(710, 135);
  await page.clock.runFor(2500);
  await expect(page.locator("#objective-upperMirror")).toHaveClass(/complete/);
  await aim(710, 305);
  await page.clock.runFor(2500);
  await expect(page.locator("#objective-lowerMirror")).toHaveClass(/complete/);
  await expect(page.locator("#objective-signature")).toHaveClass(/locked/);
  await set("#temperature", 100);
  for (let i = 0; i < 12; i++) {
    await aim(458 + (i % 5) * 18, 143);
    await page.clock.runFor(400);
  }
  await expect(page.locator("#objective-aperture")).toHaveClass(/complete/);
  await expect(page.locator("#objective-signature")).not.toHaveClass(/locked/);
  await set("#temperature", 30);
  await set("#pressure", 22);
  await aim(492, 358);
  await page.clock.runFor(5000);
  await expect(page.locator(".postcard-stamp")).toHaveText(
    "SUNSHINE OCCUPANCY: LUNCH APPROVED",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/borough-sunshine-postcard.png",
    fullPage: true,
  });
});
