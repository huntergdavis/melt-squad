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

test("syrup takes the real scenic route through three overflowing pancakes", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.clock.install();
  await page.goto("./#play/16.14");
  const reservoir = page.locator("#objective-reservoir");
  await expect(reservoir).toHaveClass(/locked/);
  await set(page, "#temperature", 100);
  await set(page, "#pressure", 85);
  // The lower outlet can be cleared first without thawing the upper outlet.
  // Four real stream positions cover each seven-column mouth.
  for (const [id, xs, y] of [
    ["lowerOutlet", [415, 435, 455, 475], 350],
    ["upperOutlet", [500, 520, 540, 560], 255],
  ] as const) {
    const goal = page.locator(`#objective-${id}`);
    for (
      let i = 0;
      i < 12 && !(await goal.getAttribute("class"))?.includes("complete");
      i++
    ) {
      await aim(page, xs[i % 4], y);
      await page.clock.runFor(250);
    }
    await expect(goal).toHaveClass(/complete/);
    if (id === "lowerOutlet") {
      await expect(page.locator("#objective-upperOutlet")).not.toHaveClass(
        /complete/,
      );
      await expect(reservoir).toHaveClass(/locked/);
    }
  }
  await expect(reservoir).not.toHaveClass(/locked/);
  await set(page, "#temperature", 20);
  await aim(page, 540, 103);
  await page.clock.runFor(2300);
  await expect(reservoir).toHaveClass(/complete/);
  await expect(page.locator("#objective-pancake1")).not.toHaveClass(/complete/);
  await page.clock.runFor(3500);
  await expect(page.locator("#objective-pancake1")).toHaveClass(/complete/);
  await expect(page.locator("#objective-pancake2")).not.toHaveClass(/complete/);
  await page.clock.runFor(5300);
  await expect(page.locator("#objective-pancake2")).toHaveClass(/complete/);
  await expect(page.locator("#objective-pancake3")).not.toHaveClass(/complete/);
  await expect(page.locator("dialog")).not.toBeVisible();
  await page.clock.runFor(7500);
  await expect(page.locator("#objective-pancake3")).toHaveClass(/complete/);
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "particularly interesting journey",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/diner-syrup-route-postcard.png",
    fullPage: true,
  });
});

test("the breakfast beat patiently opens one food lamp at a time", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 640, height: 750 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("./#play/16.18");
  // The game intentionally starts spraying at the first turbine. Set up the
  // closed-lane check with water off so UI assertion time cannot solve toast.
  await page.keyboard.press("Space");
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const toast = page.locator("#objective-toastBeat");
  const mug = page.locator("#objective-mugBeat");
  const pancake = page.locator("#objective-pancakeBeat");
  await expect(toast.locator("small")).toContainText("OPEN");
  await expect(mug.locator("small")).toContainText("NEXT");
  await expect(pancake.locator("small")).toContainText("NEXT");
  await set(page, "#temperature", 20);
  await set(page, "#pressure", 85);
  await aim(page, 705, 378);
  await page.keyboard.press("Space");
  await page.clock.runFor(1000);
  await expect(pancake.locator("i")).toHaveAttribute("style", /width: 0%/);
  for (const [x, goal] of [
    [355, toast],
    [530, mug],
    [705, pancake],
  ] as const) {
    await expect(goal.locator("small")).toContainText("OPEN");
    await aim(page, x, 378);
    await page.clock.runFor(3500);
    await expect(goal).toHaveClass(/complete/);
  }
  await expect(page.locator(".postcard-stamp")).toBeVisible();
  await expect(page.locator("#modal-content")).toContainText(
    "room between notes",
  );
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/diner-breakfast-beat-postcard.png",
    fullPage: true,
  });
});
