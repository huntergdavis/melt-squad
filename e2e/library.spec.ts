import { test, expect } from "@playwright/test";

test("the library earns a second draft by rebuilding the same ice page", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/09.15");
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
  const draft = page.locator("#objective-page");
  const ink = page.locator("#objective-ink");
  await expect(ink).not.toHaveClass(/locked/);
  await set("#temperature", -40);
  await set("#pressure", 90);
  await aim(480, 188);
  await page.clock.runFor(2800);
  await expect(draft.locator("strong")).toHaveText("Open the first draft");
  await expect(draft).not.toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await set("#temperature", 100);
  for (
    let i = 0;
    i < 60 &&
    (await draft.locator("strong").textContent()) !== "Build the second draft";
    i++
  ) {
    await aim(393 + 174 * (0.5 + 0.5 * Math.sin((i * 15) / 29)), 188);
    await page.clock.runFor(250);
  }
  await expect(draft.locator("strong")).toHaveText("Build the second draft");
  await expect(draft).not.toHaveClass(/complete/);
  await set("#temperature", 20);
  await aim(480, 373);
  await page.clock.runFor(3500);
  await expect(ink).toHaveClass(/complete/);
  await set("#temperature", -40);
  await aim(480, 188);
  await page.clock.runFor(3800);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "picnic invitation",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/library-second-draft-postcard.png",
    fullPage: true,
  });
});
