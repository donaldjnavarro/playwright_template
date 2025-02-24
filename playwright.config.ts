import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import { config } from 'dotenv';
import process from 'process';
config({ path: './.env' })

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Default to not running in parallel, unless the .env file specifies */
  fullyParallel: (process.env.PARALLEL?.toLowerCase() === 'true') || false,
  // If running parallel, undefined workers will use a number of workers based on system resources
  workers: (process.env.PARALLEL?.toLowerCase() === 'true') ? undefined : 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /** Determine if we will run in a headless browser. Defaults to headless */
    headless: (process.env.HEADLESS?.toLowerCase() !== 'false') || true,

    /** Browser dimensions */
    viewport: {
        width: (parseInt(process.env.WIDTH || '1280')),
        height: (parseInt(process.env.HEIGHT || '720'))
    }
  },

  /**
   * Configure projects for major browsers
   * - Browser coverage is defined in the .env file
   * - Desktop Chrome will be included by default
   **/
  projects: [
    ... process.env.DESKTOP_CHROME?.toLowerCase() == 'false' ? [] : [{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }],

    ... process.env.DESKTOP_FIREFOX?.toLowerCase() == 'true' ? [{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }] : [],

    ... process.env.DESKTOP_SAFARI?.toLowerCase() == 'true' ? [{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }] : [],

    /* Test against branded browsers. */
    ... process.env.DESKTOP_EDGE?.toLowerCase() == 'true' ? [{
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    }] : [],

    ... process.env.DESKTOP_CHROME_BETA?.toLowerCase() == 'true' ? [{
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    }] : [],

    /* Test against mobile viewports. */
    ... process.env.MOBILE_CHROME?.toLowerCase() == 'true' ? [{
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    }] : [],

    ... process.env.MOBILE_SAFARI?.toLowerCase() == 'true' ? [{
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }] : []

  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
