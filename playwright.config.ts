import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 require('dotenv').config(); // disabled by default have to install dotenv from npm first...lets us define our own process.env variables.

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  //timeout: 10000,
  globalTimeout: 180000,
  //expect:{ timeout: 2000 },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  //retries: process.env.CI ? 2 : 1,   // switches on local retries - i.e. 1 retry. 
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */ //lesson 73...install allure for instance...
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
      //  token: "ARGOS_TOKEN=036e15b25d10ae214586528363de8725a92d64cb",
      },
    ],
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    // can put some logic in here to define which baseURL is used depending on CLI value passed...
    /*
    baseURL: process.env.DEV === '1' ? 'https://localhost:4200/'
    : process.env.STAGING == '1' ? 'https://localhost:4210/',  etc
    CLI > DEV=1 npx playwright test pageObjects.spec.ts --project=chromium  
    */
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // actionTimeout: 5000,
    // navigationTimeout: 5000
    //video: 'on'
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */  // can configure projects to do anything you want i.e. config for QA, EVT, UAT envs etc
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'qa',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201'
      },
    },

    {
      name: 'firefox',
      //use: { ...devices['Desktop Firefox'] },
      use: { browserName: 'firefox' } // altenative - seems a bit clearer
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'pageObjectsFullScreen',
      testMatch: 'pageObjects.spec.ts',
      use: {viewport: {width: 1920, height: 1080}}
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {...devices['iPhone 13 Pro']}
    },

  ],
webServer: { 
  timeout: 480000,
  command: 'npm run start',  // this command makes the project spin up this command - i.e. the server...althouh
  url: 'http://localhost:4200'
}
  
});
