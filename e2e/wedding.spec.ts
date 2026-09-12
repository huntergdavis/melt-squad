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

test("a shared wedding spotlight really reaches both names", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.clock.install();
  await page.goto("./#play/11.15");
  await set(page, "#temperature", -40);
  await set(page, "#pressure", 90);
  for (const [id, x, y] of [
    ["splitter", 350, 98],
    ["rillLens", 560, 78],
    ["mossLens", 340, 268],
  ] as const) {
    await aim(page, x, y);
    await page.clock.runFor(3400);
    await expect(page.locator(`#objective-${id}`)).toHaveClass(/complete/);
    await expect(page.locator("dialog")).not.toBeVisible();
  }
  await set(page, "#temperature", 100);
  const shutter = page.locator("#objective-shutter");
  for (
    let i = 0;
    i < 40 && !(await shutter.getAttribute("class"))?.includes("complete");
    i++
  ) {
    await aim(page, 228 + 39 * (0.5 + 0.5 * Math.sin((i * 15) / 29)), 123);
    await page.clock.runFor(250);
  }
  await expect(shutter).toHaveClass(/complete/);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/wedding-shared-light-postcard.png",
    fullPage: true,
  });
});

test("the wedding ring keeps its first proof and needs a second cast", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/11.18");
  const band = page.locator("#objective-band"),
    engraver = page.locator("#objective-engraver");
  await expect(engraver).toHaveClass(/locked/);
  await set(page, "#temperature", -40);
  await set(page, "#pressure", 90);
  await aim(page, 445, 248);
  await page.clock.runFor(2800);
  await expect(band.locator("strong")).toHaveText("Open the first proof");
  await expect(band).toHaveClass(/locked/);
  await expect(band).not.toHaveClass(/complete/);
  await expect(engraver).not.toHaveClass(/locked/);
  await set(page, "#temperature", 35);
  await set(page, "#pressure", 27);
  await aim(page, 702, 183);
  await page.clock.runFor(4000);
  await expect(engraver).toHaveClass(/complete/);
  await expect(band).not.toHaveClass(/locked/);
  await set(page, "#temperature", 100);
  await set(page, "#pressure", 90);
  for (
    let i = 0;
    i < 60 &&
    (await band.locator("strong").textContent()) !==
      "Build the cloud-and-leaf proof";
    i++
  ) {
    await aim(page, 358 + 174 * (0.5 + 0.5 * Math.sin((i * 15) / 29)), 248);
    await page.clock.runFor(250);
  }
  await expect(band.locator("strong")).toHaveText(
    "Build the cloud-and-leaf proof",
  );
  await expect(band).not.toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await set(page, "#temperature", -40);
  await aim(page, 445, 248);
  await page.clock.runFor(3800);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText("both drafts");
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/wedding-ring-proof-postcard.png",
    fullPage: true,
  });
});
