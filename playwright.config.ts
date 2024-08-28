import { defineConfig, devices } from '@playwright/test'
import testrail from './src/utils/testrails'

// require('dotenv').config()
require('dotenv').config({ path: `env/.env.${process.env.ENV}` })
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const testRailOptions = {
  // Whether to add <properties> with all annotations; default is false
  embedAnnotationsAsProperties: true,
  // Where to put the report.
  outputFile: './test-results/junit-report.xml'
}

export default defineConfig({
  testDir: './tests',
  // testDir: './tests/fixedAssetEvent/dividing',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  globalSetup: require.resolve('./tests/setupTeardown/globalSetup'),
  globalTeardown: require.resolve('./tests/setupTeardown/globalTeardown'),
  name: 'API Testing Playwright',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['./reporter/CustomReporter.ts'],
    ['html', { open: 'never' }],
    ['junit', testRailOptions],
    [
      'monocart-reporter',
      {
        name: 'API Asset Accounting Test Report',
        outputFile: './test-results/report.html',
        // connect previous report data for trend chart
        trend: './test-results/report.json',
        onEnd: async (reportData, capability) => {
          await testrail(reportData, capability)
        }
      }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on'
  },
  timeout: 500 * 1000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API Testing Playwright projects',
      testDir: 'tests/',
      use: { ...devices['Desktop Chrome'], locale: 'ja' }
    }
  ]
  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },
  // ],
})
