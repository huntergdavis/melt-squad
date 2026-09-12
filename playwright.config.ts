import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4197/melt-squad/",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm run preview -- --port 4197 --strictPort",
    url: "http://127.0.0.1:4197/melt-squad/",
    reuseExistingServer: false,
  },
});
