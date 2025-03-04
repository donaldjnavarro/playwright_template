import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Default to not running in parallel, unless the .env file specifies */
  fullyParallel: (env.PARALLEL && env.PARALLEL.toLowerCase() === 'true') || false,
  // If running parallel, undefined workers will use a number of workers based on system resources
  workers: (env.PARALLEL?.toLowerCase() === 'true') ? undefined : 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!env.CI,
  /* Retry on CI only */
  retries: env.RETRY ? parseInt(env.RETRY) : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ ['html', { open: 'never' }], [ env.REPORTER ? env.REPORTER : 'dot'] ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* See https://playwright.dev/docs/trace-viewer */
    // Do not trace when using the Github reporter, otherwise default to only keep traces for failures.
    trace: (env.REPORTER === 'github') ? 'off' : 'retain-on-failure',

    /** Determine if we will run in a headless browser. Defaults to headless */
    headless: (env.HEADLESS?.toLowerCase() !== 'false'),

    /** Browser dimensions */
    viewport: {
      width: (parseInt(env.WIDTH || '1280')),
      height: (parseInt(env.HEIGHT || '720'))
    }
  },

  /* Configure projects for major browsers */
  projects: [
    ... env.DESKTOP_CHROME?.toLowerCase() == 'true' ? [{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }] : [],

    ... env.DESKTOP_FIREFOX?.toLowerCase() == 'true' ? [{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }] : [],

    ... env.DESKTOP_SAFARI?.toLowerCase() == 'true' ? [{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }] : [],

    /* Test against branded browsers. */
    ... env.DESKTOP_EDGE?.toLowerCase() == 'true' ? [{
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    }] : [],

    ... env.DESKTOP_CHROME_BETA?.toLowerCase() == 'true' ? [{
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    }] : [],

    /* Test against mobile viewports. */
    ... env.MOBILE_CHROME?.toLowerCase() == 'true' ? [{
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    }] : [],

    ... env.MOBILE_SAFARI?.toLowerCase() == 'true' ? [{
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }] : []

  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !env.CI,
  // },
});
