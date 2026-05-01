import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const PULSE_REPORT_DIR = path.resolve(__dirname, 'pulse-report');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,

  reporter: [
    ['list'],
    ['@arghajit/playwright-pulse-report', {
      outputDir: PULSE_REPORT_DIR,
      embedAssets: true,
      staticFilePath: true,
    }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://necsus.com.mx/signup/#/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    actionTimeout: process.env.CI ? 15_000 : 10_000,
    navigationTimeout: process.env.CI ? 30_000 : 15_000,
  },

  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  outputDir: './test-results',
});