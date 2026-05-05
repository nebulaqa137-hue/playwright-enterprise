import { test as base } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

export type PageFixtures = {
  signUpPage: SignUpPage;
};

export const pagesFixture = base.extend<PageFixtures>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();
    await use(signUpPage);
  },
});

