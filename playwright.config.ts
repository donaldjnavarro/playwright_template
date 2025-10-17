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
  outputDir: 'Reports/Playwright/RawResults',
  reporter: [
    ['html', { open: 'never', outputFolder: 'Reports/Playwright/HTMLReport' }],
    [env.REPORTER ? env.REPORTER : 'dot']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

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
    ... env.DESKTOP_CHROME?.toLowerCase() === 'true' ? [{
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [/mobile\/.*\.spec\.ts/, /api\/.*\.spec\.ts/]
    }] : [],

    ... env.DESKTOP_FIREFOX?.toLowerCase() === 'true' ? [{
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: [/mobile\/.*\.spec\.ts/, /api\/.*\.spec\.ts/]
    }] : [],

    ... env.DESKTOP_SAFARI?.toLowerCase() === 'true' ? [{
      name: 'Desktop Safari (webkit)',
      use: { ...devices['Desktop Safari'] },
      testIgnore: [/mobile\/.*\.spec\.ts/, /api\/.*\.spec\.ts/]
    }] : [],

    /* Test against branded browsers. */
    ... env.DESKTOP_EDGE?.toLowerCase() === 'true' ? [{
      name: 'Desktop Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      testIgnore: [/mobile\/.*\.spec\.ts/, /api\/.*\.spec\.ts/]
    }] : [],

    ... env.DESKTOP_CHROME_BETA?.toLowerCase() === 'true' ? [{
      name: 'Desktop Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      testIgnore: [/mobile\/.*\.spec\.ts/, /api\/.*\.spec\.ts/]
    }] : [],

    /* Test against mobile viewports. */
    ... env.MOBILE_CHROME?.toLowerCase() === 'true' ? [{
      name: 'Mobile Chrome',
      use: { ...devices[env.ANDROID_DEVICE || 'Pixel 5'] },
      testIgnore: [/desktop\/.*\.spec\.ts/, /api\/.*\.spec\.ts/]
    }] : [],

    ... env.MOBILE_SAFARI?.toLowerCase() === 'true' ? [{
      name: 'Mobile Safari',
      use: { ...devices[env.IOS_DEVICE || 'iPhone 12'] },
      testIgnore: [/desktop\/.*\.spec\.ts/, /api\/.*\.spec\.ts/]
    }] : [],

    /* Test API exclusive tests. These will run without opening a browser. */
    ... [{
      name: 'API',
      use: { },
      testMatch: /api\/.*\.spec\.ts/
    }]

  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !env.CI,
  // },
});
