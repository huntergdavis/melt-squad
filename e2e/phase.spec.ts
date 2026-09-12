import { test, expect } from "@playwright/test";

test("a real stream builds, fills, and reopens the same pudding mold", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/06.14");
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
  const mold = page.locator("#objective-mold");
  await expect(page.locator("#objective-basin")).toHaveClass(/locked/);
  await set("#temperature", -40);
  await set("#pressure", 90);
  await aim(435, 193);
  await page.clock.runFor(2800);
  await expect(mold.locator("strong")).toHaveText("Open the finished mold");
  await expect(mold).toHaveClass(/locked/);
  await expect(mold).not.toHaveClass(/complete/);
  await expect(page.locator("#objective-basin")).not.toHaveClass(/locked/);
  await expect(page.locator("#objective-release")).toHaveClass(/locked/);
  await set("#temperature", 30);
  await aim(435, 278);
  await page.clock.runFor(3000);
  await expect(page.locator("#objective-basin")).toHaveClass(/complete/);
  await expect(mold).not.toHaveClass(/locked/);
  await set("#temperature", 100);
  for (
    let i = 0;
    i < 60 && !(await mold.getAttribute("class"))?.includes("complete");
    i++
  ) {
    await aim(333 + 204 * (0.5 + 0.5 * Math.sin((i * 15) / 29)), 193);
    await page.clock.runFor(250);
  }
  await expect(mold).toHaveClass(/complete/);
  await expect(page.locator("#objective-release")).not.toHaveClass(/locked/);
  await set("#temperature", 30);
  await set("#pressure", 20);
  await aim(677, 318);
  await page.clock.runFor(4000);
  await expect(page.locator(".postcard-stamp")).toHaveText(
    "THANK YOU, MOLD. EXCELLENT PERSONAL GROWTH.",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/pudding-mold-postcard.png",
    fullPage: true,
  });
});
