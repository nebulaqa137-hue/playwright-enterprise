import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,

  // ── Reportes ──────────────────────────────────────────────
  // IMPORTANTE: HTML debe ir ANTES que JSON (TestDino lo requiere)
  reporter: [
    ['html', { outputDir: './playwright-report', open: 'never' }],
    ['json', { outputFile: './playwright-report/report.json' }],
    ['list'],
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
    {
      name: 'api',
      testDir: './tests/api',
    },
  ],

  outputDir: './test-results',
});
