import { test, expect } from "@playwright/test";
import release from "../public/release.json" with { type: "json" };

test("dispatch, keyboard, pause, hints, and all authored scenes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const failedAssets: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400) failedAssets.push(r.url());
  });
  const externalRequests: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4197/"))
      externalRequests.push(r.url());
  });
  await page.goto("./");
  await expect(page.locator(".world-island")).toHaveCount(20);
  await expect(page.locator(".world-island.released")).toHaveCount(
    release.worlds,
  );
  await page.screenshot({
    path: "scratch/dispatch-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Start your shift" }).click();
  await expect(page.locator("#mission-title")).toHaveText(
    "A storm in a teacup",
  );
  await page.keyboard.down("ArrowDown");
  await expect
    .poll(async () =>
      Number((await page.locator("#temp-value").innerText()).replace("°", "")),
    )
    .toBeLessThan(30);
  await page.keyboard.up("ArrowDown");
  await page.keyboard.press("Space");
  await expect(page.locator("#stage-state")).toHaveText("○ WATER OFF");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toBeVisible();
  const elapsed = await page.locator("#elapsed").innerText();
  await page.waitForTimeout(1100);
  await expect(page.locator("#elapsed")).toHaveText(elapsed);
  await page.getByRole("button", { name: "Back to the rescue" }).click();
  await page.getByRole("button", { name: "Need a hint?" }).click();
  await expect(page.locator("#hint")).toBeVisible();
  await page.screenshot({ path: "scratch/rescue-desktop.png", fullPage: true });
  for (const i of [1, 2, 7, 14, 19]) {
    await page.locator('.nav-item[data-action="atlas"]').click();
    await page.locator('[data-world="01"]').click();
    await page.locator(".scene-node").nth(i).click();
    await page.locator("[data-launch]").click();
    await expect(page.locator(".objective")).toHaveCount(
      i === 19 ? 5 : i === 14 || i === 7 ? 3 : 2,
    );
    await page.screenshot({
      path: "scratch/call-" + (i + 1) + ".png",
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
  expect(failedAssets).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test("a real stream finishes the teacup, saves medals, and advances", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./");
  await page.getByRole("button", { name: "Start your shift" }).click();
  await page.locator("#temperature").evaluate((el: HTMLInputElement) => {
    el.value = "100";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.locator("#pressure").evaluate((el: HTMLInputElement) => {
    el.value = "90";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const box = (await page.locator("#game").boundingBox())!;
  for (let i = 0; i < 40 && !(await page.locator("dialog").isVisible()); i++) {
    const x = 408 + (i % 8) * 20;
    await page.mouse.move(
      box.x + (x / 960) * box.width,
      box.y + (273 / 580) * box.height,
    );
    await page.mouse.down();
    await page.mouse.up();
    await page.clock.runFor(500);
  }
  await page.clock.runFor(2500);
  await expect(page.locator("dialog")).toBeVisible();
  await expect(page.locator(".win-seal")).toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("melt-squad-v1")!).stars.cup,
    ),
  ).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Next little good deed" }).click();
  await expect(page.locator("#mission-title")).toHaveText(
    "An inconvenient wizard",
  );
  await page.reload();
  await expect(page.locator("#total-progress")).toHaveText(
    `1 / ${release.scenes} calls answered`,
  );
});

test("standard gamepad controls menus, thermal mix, and disconnect pause", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const buttons = Array.from({ length: 17 }, () => ({
      pressed: false,
      value: 0,
      touched: false,
    }));
    const pad = {
      axes: [0, 0, 0, 0],
      buttons,
      connected: true,
      mapping: "standard",
      index: 0,
      id: "Test pad",
      timestamp: 0,
    };
    Object.assign(window, { testPad: pad });
    Object.defineProperty(navigator, "getGamepads", { value: () => [pad] });
  });
  await page.goto("./");
  await page.waitForTimeout(150);
  const button = async (index: number, pressed: boolean) => {
    await page.evaluate(
      ({ index, pressed }) => {
        (window as any).testPad.buttons[index].pressed = pressed;
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
  await button(13, false); // Establish the connected pad's released baseline.
  for (let i = 0; i < 2; i++) {
    await button(13, true);
    await button(13, false);
  }
  await expect(page.locator('[data-world="02"]')).toBeFocused();
  await button(0, true);
  await button(0, false);
  await expect(page.locator('[data-scene="02.01"]')).toBeFocused();
  await button(15, true);
  await button(15, false);
  await expect(page.locator('[data-scene="02.02"]')).toBeFocused();
  await button(0, true);
  await button(0, false);
  await expect(page.locator('[data-launch="02.02"]')).toBeFocused();
  await button(0, true);
  await button(0, false);
  await expect(page.locator("#play")).toBeVisible();
  await page.evaluate(() => {
    (window as any).testPad.axes = [1, 0, 1, -1];
  });
  await expect
    .poll(async () =>
      Number(
        (await page.locator("#pressure-value").innerText()).replace("%", ""),
      ),
    )
    .toBeGreaterThan(65);
  await page.evaluate(() => {
    (window as any).testPad.axes = [0, 0, 0, 0];
  });
  await button(0, true);
  await button(0, false);
  await expect(page.locator("#stage-state")).toHaveText("○ WATER OFF");
  await page.evaluate(() => {
    (window as any).testPad.connected = false;
  });
  await expect(page.locator("dialog")).toBeVisible();
  await page.evaluate(() => {
    (window as any).testPad.connected = true;
  });
  await page.waitForTimeout(150);
  await page.evaluate(() => {
    (window as any).testPad.connected = false;
  });
  await page.waitForTimeout(150);
  await expect(page.locator("dialog")).toBeVisible();
});

test("phone layout works without storage and has no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get: () => {
        throw Error("Storage blocked");
      },
    }),
  );
  await page.goto("./");
  await expect(page.locator(".world-island")).toHaveCount(20);
  await page.screenshot({ path: "scratch/dispatch-phone.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
  await page.getByRole("button", { name: "Start your shift" }).click();
  await page.screenshot({ path: "scratch/rescue-phone.png", fullPage: true });
  await page.locator("#temperature").evaluate((el: HTMLInputElement) => {
    el.value = "-40";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await expect(page.locator("#temp-value")).toHaveText("-40°");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
});
