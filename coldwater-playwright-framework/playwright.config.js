// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000, // 30 seconds per test
  retries: 1, // Retry once if a test fails
  use: {
    headless: false, // show browser for demo
    baseURL: 'https://www.coldwatercreek.com/',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
