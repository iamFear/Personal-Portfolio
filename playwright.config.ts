import { defineConfig } from "@playwright/test";

export const testOrigin = "https://portfolio.example";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:3100",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm exec -- serve out --listen tcp://127.0.0.1:3100 --no-clipboard",
    env: { SITE_URL: testOrigin, NEXT_TELEMETRY_DISABLED: "1" },
    url: "http://127.0.0.1:3100",
    timeout: 120_000,
  },
});
