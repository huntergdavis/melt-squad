import { test, expect } from "@playwright/test";

test("a controller can enable untimed assist from Pause and resume", async ({
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
      id: "Rhythm test pad",
      timestamp: 0,
    };
    Object.assign(window, { rhythmPad: pad });
    Object.defineProperty(navigator, "getGamepads", { value: () => [pad] });
  });
  await page.goto("./#play/04.16");
  const state = async (index: number, pressed: boolean) => {
    await page.evaluate(
      ({ index, pressed }) => {
        (window as any).rhythmPad.buttons[index].pressed = pressed;
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
  await expect(page.locator("dialog")).toBeVisible();
  for (let i = 0; i < 3; i++) await tap(13);
  const assist = page.locator('dialog [data-action="pulse-assist"]');
  await expect(assist).toBeFocused();
  await tap(0);
  await expect(assist).toHaveAttribute("aria-pressed", "true");
  await tap(1);
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator("#game")).toBeFocused();
});

test("rhythm windows visibly alternate, pause with the game, and offer saved untimed play", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./#play/04.16");
  await page.keyboard.press("Space");
  const first = page.locator(".objective small").nth(0);
  const second = page.locator(".objective small").nth(1);
  await expect(first).toContainText("GO");
  await expect(second).toContainText("REST");
  await page.clock.runFor(1900);
  await expect(first).toContainText("REST");
  await expect(second).toContainText("GO");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toBeVisible();
  const paused = await page.locator("#elapsed").innerText();
  await page.clock.runFor(3000);
  await expect(page.locator("#elapsed")).toHaveText(paused);
  await page.keyboard.press("Escape");
  await page.locator("#pulse-assist").click();
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(first).not.toContainText("ON BEAT");
  await page.reload();
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.clock.resume();
  await page.screenshot({ path: "scratch/circus-untimed.png", fullPage: true });
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("melt-squad-v1")!).untimed,
    ),
  ).toBe(true);
});

test("reduced-motion visitors start untimed, and an explicit choice survives reload", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./#play/04.16");
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator("#pulse-assist").click();
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.reload();
  await expect(page.locator("#pulse-assist")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.evaluate(() => (location.hash = "#play/04.01"));
  await expect(page.locator("#pulse-assist")).toBeHidden();
});
