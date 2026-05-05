import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async navigate(path = '') {
    await this.page.goto(path);
  }

  async waitForVisible(locator: Locator, timeout = 10_000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async fillAndVerify(locator: Locator, value: string) {
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
  }

  /**
   * Fuerza el valor de un input que bloquea el pegado o el fill normal
   * (como el campo confirmEmail de Necsus)
   */
  async forceInputValue(locator: Locator, value: string) {
    await locator.evaluate(
      (el: HTMLInputElement, val: string) => {
        el.value = val;
      },
      value
    );
    await locator.dispatchEvent('input');
    await locator.dispatchEvent('change');
  }

  async clickDropdownOption(optionText: string) {
    await this.page.getByRole('option', { name: optionText }).click();
  }

  protected byTestId(testId: string) {
    return this.page.getByTestId(testId);
  }

  protected byFieldName(name: string) {
    return this.page.locator(`[name="${name}"]`);
  }
}
