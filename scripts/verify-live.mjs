import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const expected = JSON.parse(readFileSync(new URL("../public/release.json", import.meta.url)));
const base = new URL(process.argv[2] ?? "https://hunterdavis.com/melt-squad/");
const nonce = `verify=${encodeURIComponent(expected.release)}-${Date.now()}`;
const get = async path => {
  const url = new URL(path, base);
  url.search = nonce;
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  assert(response.ok, `${url.pathname}: HTTP ${response.status}`);
  return response;
};
assert.deepEqual(await (await get("release.json")).json(), expected, "The live release marker is stale");
const html = await (await get("./")).text();
const built = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const asset = source => source.match(/<script[^>]+src="([^"]+)"/)?.[1];
assert(asset(built), "Build the project before verifying live assets");
assert.equal(asset(html), asset(built), "Live JavaScript does not match this production build");
await get(asset(html));

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(15000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(new URL(`?${nonce}#atlas`, base).href, { waitUntil: "networkidle", timeout: 45000 });
  assert.equal(await page.locator(".world-island.released").count(), expected.worlds);
  assert.equal(await page.locator(".world-island").count(), 20);
  const id = String(expected.worlds).padStart(2, "0");
  await page.locator(`[data-world="${id}"]`).click();
  await page.locator(`[data-scene="${id}.20"]`).waitFor();
  assert.equal(await page.locator(".scene-node.unbuilt").count(), 0);
  await page.locator(`[data-scene="${id}.20"]`).click();
  await page.locator("[data-launch]").click();
  await page.locator("#play").waitFor({ state: "visible" });
  assert.equal(await page.locator("#mission-number").innerText(), `WORLD ${id} · SCENE 20 / 20`);
  await page.getByRole("button", { name: "Credits & licenses" }).click();
  assert((await page.locator("dialog").innerText()).includes("Open Font License"));
  await page.getByRole("button", { name: "Back to the good deeds" }).click();
  await page.screenshot({ path: `scratch/live-${expected.release}.png`, fullPage: true });
  assert.deepEqual(errors, [], "The live browser reported asset or JavaScript errors");
  console.log(JSON.stringify({ verified: true, ...expected, url: base.href, asset: asset(html) }, null, 2));
} finally {
  await browser.close();
}
