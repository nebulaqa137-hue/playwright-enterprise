import { test as base } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

// Definición de fixtures personalizadas
type CustomFixtures = {
  signUpPage: SignUpPage;
};

export const test = base.extend<CustomFixtures>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goToSignUp();
    await use(signUpPage);
    // teardown: no se requiere limpieza especial para esta página
  },
});

export { expect } from '@playwright/test';
