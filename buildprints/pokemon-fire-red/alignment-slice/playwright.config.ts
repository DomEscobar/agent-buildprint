import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  outputDir: ".playwright-output",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4180",
    browserName: "chromium",
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: "npm run dev -- --port 4180",
    url: "http://127.0.0.1:4180",
    reuseExistingServer: false,
  },
});
