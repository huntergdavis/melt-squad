import { test, expect } from "@playwright/test";
import release from "../public/release.json" with { type: "json" };
const pendingWorld = String(Math.min(20, release.worlds + 1)).padStart(2, "0");

test("Pearl's first rescue earns its story postcard with actual water", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1100, height: 850 });
  await page.clock.install();
  await page.goto("./#play/02.01");
  const set = async (selector: string, value: number) =>
    page.locator(selector).evaluate((element: HTMLInputElement, number) => {
      element.value = String(number);
      element.dispatchEvent(new Event("input", { bubbles: true }));
    }, value);
  const aim = async (x: number, y: number) => {
    const box = (await page.locator("#game").boundingBox())!;
    await page.mouse.click(
      box.x + (x / 960) * box.width,
      box.y + (y / 580) * box.height,
    );
  };
  await set("#temperature", 100);
  await set("#pressure", 90);
  for (
    let i = 0;
    i < 36 &&
    !(await page.locator("#objective-counter").getAttribute("class"))?.includes(
      "complete",
    );
    i++
  ) {
    await aim(350 + (i % 8) * 22, 213);
    await page.clock.runFor(400);
  }
  await expect(page.locator("#objective-counter")).toHaveClass(/complete/);
  await set("#temperature", 27);
  await set("#pressure", 22);
  await aim(605, 323);
  await page.clock.runFor(8000);
  await expect(page.locator(".postcard-stamp")).toHaveText("EXISTS, PROBABLY");
  await expect(page.locator("#postcard")).toBeVisible();
  await page.clock.resume(); // Screenshot stabilization needs live animation frames.
  await page.screenshot({
    path: "scratch/sock-first-postcard.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("melt-squad-v1")!).stars["02.01"],
    ),
  ).toBeGreaterThan(0);
});

test("world atlas, story path, browser Back, and legacy progress", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    if (!localStorage.getItem("melt-squad-v1"))
      localStorage.setItem(
        "melt-squad-v1",
        JSON.stringify({ version: 1, stars: { cup: 3 }, best: { cup: 14 } }),
      );
  });
  await page.goto("./");
  await expect(page.locator("#total-progress")).toHaveText(
    `1 / ${release.scenes} calls answered`,
  );
  await page.locator('[data-world="02"]').click();
  await expect(page.locator(".scene-node")).toHaveCount(20);
  await expect(page.locator(".scene-node.unbuilt")).toHaveCount(0);
  await page.locator('[data-node="3"]').focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("[data-launch]")).toBeFocused();
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await expect(page).toHaveURL(/#world\/02$/);
  await page.screenshot({
    path: "scratch/sock-map-desktop.png",
    fullPage: true,
  });
  await page.locator('[data-scene="02.01"]').focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-scene="02.02"]')).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".rescue-preview h2")).toHaveText(
    "The Sock Needs a Step",
  );
  await expect(page.locator("[data-launch]")).toBeFocused();
  await page.locator("[data-launch]").click();
  await expect(page.locator("#mission-title")).toHaveText(
    "The Sock Needs a Step",
  );
  await page.goBack();
  await expect(page.locator('[data-scene="02.02"]')).toBeFocused();
  await expect(page.locator("#play")).toBeHidden();
  await page.getByRole("button", { name: "Show scene list" }).click();
  await expect(page.locator(".scene-map")).toHaveClass(/scene-list/);
  await page.reload();
  await expect(page.locator(".scene-map")).toHaveClass(/scene-list/);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("melt-squad-v1")!).stars.cup,
    ),
  ).toBe(3);
  expect(errors).toEqual([]);
});

test("unbuilt worlds are previews, never fake playable scenes", async ({
  page,
}) => {
  await page.goto(`./#world/${pendingWorld}`);
  await expect(page.locator(".scene-node.unbuilt")).toHaveCount(
    release.worlds < 20 ? 20 : 0,
  );
  if (release.worlds < 20) {
    await expect(page.locator("[data-launch]")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Coming later", exact: true }),
    ).toBeDisabled();
  }
  await page.goto("./#play/not-a-scene");
  await expect(page.locator(".world-island")).toHaveCount(20);
  await expect(page.locator("#announcement")).toContainText("isn't available");
  await page.goto("./#play/02.16");
  await page.locator('.nav-item[data-action="atlas"]').click();
  await page.locator(`[data-world="${pendingWorld}"]`).click();
  await page.getByRole("button", { name: "All worlds", exact: false }).click();
  await page
    .getByRole("button", { name: "Continue adventure", exact: false })
    .click();
  await expect(page.locator("#mission-title")).toHaveText(
    "Carousel of Unclaimed Cuffs",
  );
});

test("all sock rescues render, credits work, and motion assist persists", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  for (let i = 1; i <= 20; i++) {
    await page.evaluate(
      (id) => (location.hash = "#play/02." + id),
      String(i).padStart(2, "0"),
    );
    await expect(page.locator("#mission-number")).toHaveText(
      `WORLD 02 · SCENE ${String(i).padStart(2, "0")} / 20`,
    );
    if ([1, 5, 14, 16, 20].includes(i))
      await page.screenshot({
        path: `scratch/sock-scene-${i}.png`,
        fullPage: true,
      });
    if (i === 16) {
      await page.locator("#motion-assist").click();
      await expect(page.locator("#motion-assist")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await page.reload();
      await expect(page.locator("#motion-assist")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    }
  }
  await page.getByRole("button", { name: "Credits & licenses" }).click();
  await expect(page.locator("dialog")).toContainText("DM Sans");
  await expect(page.locator("dialog")).toContainText("Outfit");
  const links = await page
    .locator('dialog a[href$=".txt"]')
    .evaluateAll((elements) =>
      elements.map((element) => (element as HTMLAnchorElement).href),
    );
  expect(links).toHaveLength(3);
  for (const link of links)
    expect((await page.request.get(link)).ok()).toBe(true);
  expect(errors).toEqual([]);
});

test("phone world map remains usable with blocked storage", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get: () => {
        throw Error("Blocked");
      },
    }),
  );
  await page.goto("./#world/02");
  await page.screenshot({ path: "scratch/sock-map-phone.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
  await page.locator('[data-scene="02.20"]').click();
  await page.locator("[data-launch]").click();
  await expect(page.locator("#mission-title")).toHaveText(
    "Nobody Leaves Unpaired",
  );
  await expect(page.locator("#save-warning")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
});
