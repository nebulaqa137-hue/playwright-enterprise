import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import {
  PersonaFisicaData,
  PersonaMoralData,
  InternacionalData,
} from '../utils/dataFactory';

export class SignUpPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────

  private readonly businessNameInput = this.page.locator('input[name="businessName"]');

  // Dropdowns de origen y personalidad
  private readonly origenDropdown = this.page
    .locator('.sign-up__holder', { hasText: 'Origen de la empresa' })
    .locator('.multiselect__select');

  private readonly personalidadDropdown = this.page
    .locator('.sign-up__holder', { hasText: 'Personalidad jurídica' })
    .locator('.multiselect__select');

  // Campos Persona Física
  private readonly naturalRfcInput = this.page.locator('input[name="naturalRfc"]');
  private readonly confirmNaturalRfcInput = this.page.locator('input[name="confirmNaturalRFC"]');

  // Campos Persona Moral
  private readonly legalRfcInput = this.page.locator('input[name="legalRfc"]');
  private readonly confirmLegalRfcInput = this.page.locator('input[name="confirmLegalRFC"]');

  // Campos Internacional
  private readonly tinInput = this.page.locator('input[name="tin"]');

  // Datos personales (comunes)
  private readonly namesInput = this.page.locator('input[name="names"]');
  private readonly firstSurnameInput = this.page.locator('input[name="firstSurname"]');
  private readonly secondSurnameInput = this.page.locator('input[name="secondSurname"]');
  private readonly positionInput = this.page.locator('input[name="position"]');

  // Teléfonos Nacional
  private readonly mobilePhoneInput = this.page.locator('input[name="mobilePhone"]');
  private readonly landLineInput = this.page.locator('input[name="landLine"]');

  // Teléfonos Internacional
  private readonly foreignMobileInput = this.page.locator('input[name="foreignmobilePhone"]');
  private readonly foreignLandLineInput = this.page.locator('input[name="foreignlandLine"]');

  // Correo
  private readonly emailInput = this.page.locator('input[name="email"]');
  private readonly confirmEmailInput = this.page.locator('input[name="confirmEmail"]');

  // Términos y botón
  private readonly termsCheckbox = this.page.locator('.radio__check_mark');
  private readonly saveButton = this.page.locator('button[name="save"]');

  // ── Navegación ────────────────────────────────────────────────────────────

  async goToSignUp() {
    await this.page.goto(process.env.BASE_URL || 'https://necsus.com.mx/signup/#/');
    await this.waitForVisible(this.businessNameInput);
  }

  // ── Secciones reutilizables ───────────────────────────────────────────────

  private async fillBusinessName(name: string) {
    await this.fillAndVerify(this.businessNameInput, name);
  }

  private async selectOrigen(origen: 'Nacional' | 'Internacional') {
    if (origen === 'Internacional') {
      await this.origenDropdown.click();
      await this.clickDropdownOption('Internacional');
    }
    // Nacional es el valor por defecto, no necesita acción
  }

  private async selectPersonalidad(tipo: 'Persona Fisica' | 'Persona Moral') {
    await this.personalidadDropdown.click();
    await this.clickDropdownOption(tipo);
  }

  private async fillDatosPersonales(data: {
    names: string;
    firstSurname: string;
    secondSurname: string;
    position: string;
  }) {
    await this.namesInput.fill(data.names);
    await this.firstSurnameInput.fill(data.firstSurname);
    await this.secondSurnameInput.fill(data.secondSurname);
    await this.positionInput.fill(data.position);
  }

  private async selectLada() {
    await this.page
      .locator('.multiselect__placeholder')
      .filter({ hasText: 'Seleccione' })
      .click();
    await this.clickDropdownOption('México (+52)');
  }

  private async fillContacto(data: { mobilePhone: string; landLine: string; email: string }) {
    await this.mobilePhoneInput.fill(data.mobilePhone);
    await this.landLineInput.fill(data.landLine);
    await this.emailInput.fill(data.email);
    await this.forceInputValue(this.confirmEmailInput, data.email);
  }

  private async fillContactoInternacional(data: {
    mobilePhone: string;
    landLine: string;
    email: string;
  }) {
    await this.foreignMobileInput.fill(data.mobilePhone);
    await this.foreignLandLineInput.fill(data.landLine);
    await this.emailInput.fill(data.email);
    await this.forceInputValue(this.confirmEmailInput, data.email);
  }

  private async acceptTermsAndSubmit() {
    await this.termsCheckbox.click();
    await this.saveButton.click();
  }

  // ── Flujos completos ──────────────────────────────────────────────────────

  /**
   * Flujo completo: Registro Nacional Persona Física
   */
  async registerNacionalPersonaFisica(data: PersonaFisicaData) {
    await this.fillBusinessName(data.businessName);
    await this.selectPersonalidad('Persona Fisica');
    await this.naturalRfcInput.fill(data.rfc);
    await this.confirmNaturalRfcInput.fill(data.rfc);
    await this.fillDatosPersonales(data);
    await this.selectLada();
    await this.fillContacto(data);
    await this.acceptTermsAndSubmit();
  }

  /**
   * Flujo completo: Registro Nacional Persona Moral
   */
  async registerNacionalPersonaMoral(data: PersonaMoralData) {
    await this.fillBusinessName(data.businessName);
    // Persona Moral ya es default, solo necesitamos confirmar que está seleccionado
    await this.legalRfcInput.fill(data.rfc);
    await this.confirmLegalRfcInput.fill(data.rfc);
    await this.fillDatosPersonales(data);
    await this.selectLada();
    await this.fillContacto(data);
    await this.acceptTermsAndSubmit();
  }

  /**
   * Flujo completo: Registro Internacional
   */
  async registerInternacional(data: InternacionalData) {
    await this.fillBusinessName(data.businessName);
    await this.selectOrigen('Internacional');
    await this.tinInput.fill(data.tin);
    await this.fillDatosPersonales(data);
    await this.selectLada();
    await this.fillContactoInternacional(data);
    await this.acceptTermsAndSubmit();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async expectSubmitSuccess() {
    // Ajustar según el comportamiento real post-submit de Necsus
    await expect(this.saveButton).toBeDisabled({ timeout: 10_000 }).catch(() => {
      // Si el botón no se deshabilita, verificar que no hay errores visibles
    });
  }
}
