import { test, expect } from "@playwright/test";

test("the preschool seesaw waits for real balance and respects pause", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/07.15");
  await page.keyboard.press("Space");
  await page.clock.runFor(2000);
  const set = async (selector: string, value: number) =>
    page.locator(selector).evaluate((element: HTMLInputElement, value) => {
      element.value = String(value);
      element.dispatchEvent(new Event("input", { bubbles: true }));
    }, value);
  await set("#temperature", -40);
  await set("#pressure", 90);
  const box = (await page.locator("#game").boundingBox())!;
  await page.mouse.click(
    box.x + (670 / 960) * box.width,
    box.y + (393 / 580) * box.height,
  );
  await page.keyboard.press("Space");
  await page.clock.runFor(2200);
  await expect(page.locator("#objective-iceSeat")).toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(page.locator("#stage-state")).toContainText(/settle|wobble/i);
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toBeVisible();
  const elapsed = await page.locator("#elapsed").innerText();
  await page.clock.runFor(3000);
  await expect(page.locator("#elapsed")).toHaveText(elapsed);
  await page.getByRole("button", { name: "Back to the rescue" }).click();
  await page.clock.runFor(8000);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "smallest dinosaur",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/preschool-seesaw-postcard.png",
    fullPage: true,
  });
});
