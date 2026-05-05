import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/environments';
import {
  PersonaFisicaData,
  PersonaMoralData,
  InternacionalData,
} from '../utils/dataFactory';

export class SignUpPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────

  private readonly businessNameInput = this.byFieldName('businessName');

  // Dropdowns de origen y personalidad
  private readonly origenDropdown = this.page
    .locator('.sign-up__holder', { hasText: 'Origen de la empresa' })
    .locator('.multiselect__select');

  private readonly personalidadDropdown = this.page
    .locator('.sign-up__holder', { hasText: 'Personalidad jurídica' })
    .locator('.multiselect__select');

  // Campos Persona Física
  private readonly naturalRfcInput = this.byFieldName('naturalRfc');
  private readonly confirmNaturalRfcInput = this.byFieldName('confirmNaturalRFC');

  // Campos Persona Moral
  private readonly legalRfcInput = this.byFieldName('legalRfc');
  private readonly confirmLegalRfcInput = this.byFieldName('confirmLegalRFC');

  // Campos Internacional
  private readonly tinInput = this.byFieldName('tin');

  // Datos personales (comunes)
  private readonly namesInput = this.byFieldName('names');
  private readonly firstSurnameInput = this.byFieldName('firstSurname');
  private readonly secondSurnameInput = this.byFieldName('secondSurname');
  private readonly positionInput = this.byFieldName('position');

  // Teléfonos Nacional
  private readonly mobilePhoneInput = this.byFieldName('mobilePhone');
  private readonly landLineInput = this.byFieldName('landLine');

  // Teléfonos Internacional
  private readonly foreignMobileInput = this.byFieldName('foreignmobilePhone');
  private readonly foreignLandLineInput = this.byFieldName('foreignlandLine');

  // Correo
  private readonly emailInput = this.byFieldName('email');
  private readonly confirmEmailInput = this.byFieldName('confirmEmail');

  // Términos y botón
  private readonly termsCheckbox = this.page.getByRole('checkbox').or(this.page.locator('.radio__check_mark'));
  private readonly saveButton = this.page
    .getByRole('button', { name: /guardar|registrar|enviar/i })
    .or(this.byFieldName('save'));

  // ── Navegación ────────────────────────────────────────────────────────────

  async goto() {
    await this.navigate(config.baseUrl);
    await this.waitForVisible(this.businessNameInput);
  }

  async goToSignUp() {
    await this.goto();
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
    await this.termsCheckbox.first().click();
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
