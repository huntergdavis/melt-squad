import { test, expect, type Page } from "@playwright/test";
async function clock(page: Page) {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
}
const set = (page: Page, selector: string, value: number) =>
  page.locator(selector).evaluate((el: HTMLInputElement, value) => {
    el.value = String(value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
async function choose(page: Page, mode: string) {
  await page.locator('.sidebar [data-action="difficulty"]').click();
  await page.locator('[data-action="difficulty-' + mode + '"]').click();
}
async function aim(page: Page, x: number, y: number) {
  const box = (await page.locator("#game").boundingBox())!;
  await page.mouse.click(
    box.x + (x / 960) * box.width,
    box.y + (y / 580) * box.height,
  );
}
const icePixel = (page: Page) =>
  page
    .locator("#game")
    .evaluate((canvas: HTMLCanvasElement) =>
      Array.from(
        canvas
          .getContext("2d")!
          .getImageData(
            Math.floor((413 / 960) * canvas.width),
            Math.floor((333 / 580) * canvas.height),
            1,
            1,
          ).data,
      ),
    );
test("fresh-hub difficulty works; Normal removes recipes, clears open hints, and persists", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await clock(page);
  await page.goto("./#atlas");
  await choose(page, "normal");
  await page.goto("./#play/18.08");
  await expect(page.locator(".difficulty-label")).toHaveText("Normal");
  await expect(page.locator('[data-action="hint"]')).toBeHidden();
  await expect(page.locator(".objective small").first()).not.toContainText("°");
  await page.locator('.sidebar [data-action="help"]').click();
  await expect(page.locator("#modal-content")).not.toContainText("70%");
  await expect(page.locator("#modal-content")).not.toContainText("−10°");
  await page.keyboard.press("Escape");
  await choose(page, "easy");
  await expect(page.locator(".objective small").first()).toContainText(
    "20–35°",
  );
  await page.locator('[data-action="hint"]').click();
  await expect(page.locator("#hint")).toBeVisible();
  await choose(page, "normal");
  await expect(page.locator("#hint")).toBeHidden();
  await expect(page.locator("#hint")).toHaveText("");
  await page.reload();
  await expect(page.locator(".difficulty-label")).toHaveText("Normal");
  await expect(page.locator(".objective small").first()).not.toContainText("°");
  expect(errors).toEqual([]);
});
test("Impossible Challenge discovers a zone only with correct arriving water and resets on replay", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await clock(page);
  await page.goto("./#atlas");
  await choose(page, "impossible");
  await page.goto("./#play/cup");
  const target = page.locator("#objective-tea");
  await expect(page.locator("#stage-state")).toHaveText("● NEUTRAL STREAM");
  await expect(page.locator("#temperature")).toHaveValue("0");
  await expect(page.locator(".instrument-bar button")).toHaveCount(0);
  await page.clock.runFor(1200);
  await expect(target).toHaveAttribute("data-discovered", "false");
  const hiddenIce = await icePixel(page);
  await set(page, "#temperature", -40);
  await set(page, "#pressure", 85);
  await aim(page, 480, 278);
  await page.clock.runFor(600);
  await expect(target).toHaveAttribute("data-discovered", "false");
  await set(page, "#temperature", 40);
  await page.clock.runFor(350);
  await set(page, "#temperature", 0);
  await expect(target).toHaveAttribute("data-discovered", "true");
  expect(await icePixel(page)).not.toEqual(hiddenIce);
  await expect(target).not.toHaveClass(/complete/);
  const progress = await target.locator("i").getAttribute("style");
  await choose(page, "normal");
  await choose(page, "impossible");
  await expect(target).toHaveAttribute("data-discovered", "true");
  await expect(target.locator("i")).toHaveAttribute("style", progress!);
  await page.locator('[data-action="restart"]').click();
  await expect(target).toHaveAttribute("data-discovered", "false");
  await expect(page.locator("#stage-state")).toHaveText("● NEUTRAL STREAM");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth + 1,
  );
  expect(overflow).toBe(false);
  await page.clock.resume();
  await page.screenshot({
    path: "scratch/impossible-challenge-phone.png",
    fullPage: true,
  });
});
test("a standard controller opens difficulty from Pause and starts a fresh Challenge attempt", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const pad = {
      axes: [0, 0, 0, 0],
      buttons: Array.from({ length: 17 }, () => ({
        pressed: false,
        value: 0,
        touched: false,
      })),
      connected: true,
      mapping: "standard",
      index: 0,
      id: "Difficulty test pad",
      timestamp: 0,
    };
    Object.assign(window, { difficultyPad: pad });
    Object.defineProperty(navigator, "getGamepads", { value: () => [pad] });
  });
  await page.goto("./#play/cup");
  const state = async (index: number, pressed: boolean) => {
    await page.evaluate(
      ({ index, pressed }) => {
        (window as any).difficultyPad.buttons[index].pressed = pressed;
      },
      { index, pressed },
    );
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
  };
  const tap = async (index: number) => {
    await state(index, true);
    await state(index, false);
  };
  await state(9, false);
  await tap(9);
  for (let i = 0; i < 3; i++) await tap(13);
  await expect(page.locator('dialog [data-action="difficulty"]')).toBeFocused();
  await tap(0);
  await expect(page.locator('[data-action="difficulty-easy"]')).toBeFocused();
  await tap(13);
  await tap(13);
  await tap(0);
  await expect(page.locator(".difficulty-label")).toHaveText(
    "Impossible Challenge",
  );
  await expect(page.locator("dialog")).not.toBeVisible();
  await tap(2);
  await expect(page.locator("#stage-state")).toHaveText("● NEUTRAL STREAM");
  await expect(page.locator("#objective-tea")).toHaveAttribute(
    "data-discovered",
    "false",
  );
});
