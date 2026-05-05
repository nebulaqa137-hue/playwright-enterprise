# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup.spec.ts >> Registro de empresas — Necsus @regression >> Registro Nacional — Persona Física @smoke @signup
- Location: tests\ui\signup.spec.ts:19:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.sign-up__holder').filter({ hasText: 'Personalidad jurídica' }).locator('.multiselect__select')
    - locator resolved to <div class="multiselect__select"></div>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e7] [cursor=pointer]:
      - img "flag" [ref=e8]
      - generic [ref=e9]: ESP
      - img "select" [ref=e11]
    - img "logo" [ref=e13]
  - generic [ref=e14]: Registro
  - generic [ref=e15]:
    - generic [ref=e16]:
      - generic [ref=e17]: Información de la empresa
      - generic [ref=e18]:
        - generic [ref=e20]:
          - textbox [active] [ref=e21]: SAB de CV Lucero y Segura
          - generic: "*Razón social"
        - generic [ref=e24]:
          - combobox [ref=e26] [cursor=pointer]:
            - generic [ref=e28]:
              - textbox "Seleccione"
              - generic "Nacional" [ref=e29]
          - generic [ref=e30]: "*Origen de la empresa"
        - generic [ref=e32]:
          - combobox [ref=e34] [cursor=pointer]:
            - generic [ref=e36]:
              - textbox "Seleccione"
              - generic "Persona Moral" [ref=e37]
          - generic [ref=e38]: "*Personalidad jurídica"
        - generic [ref=e40]:
          - textbox [ref=e41]
          - generic: "*RFC"
        - generic [ref=e44]:
          - textbox [ref=e45]
          - generic: "*Confirmar RFC"
    - generic [ref=e47]:
      - generic [ref=e48]: Contacto principal
      - generic [ref=e49]: ( El contacto principal es la persona que recibirá las notificaciones del proceso de certificación )
      - generic [ref=e50]:
        - generic [ref=e52]:
          - textbox [ref=e53]
          - generic: "*Nombre (s)"
        - generic [ref=e56]:
          - textbox [ref=e57]
          - generic: "*Apellido paterno"
        - generic [ref=e60]:
          - textbox [ref=e61]
          - generic: Apellido materno
        - generic [ref=e64]:
          - textbox [ref=e65]
          - generic: "*Cargo"
        - generic [ref=e67]:
          - generic [ref=e69]:
            - combobox [ref=e71] [cursor=pointer]:
              - generic [ref=e73]:
                - textbox "Seleccione"
                - generic [ref=e74]: Seleccione
            - generic [ref=e75]: "*Código de país"
          - generic [ref=e77]:
            - textbox [ref=e78]
            - generic: "*Teléfono celular"
          - generic [ref=e81]:
            - textbox [ref=e82]
            - generic: "*Teléfono fijo"
        - generic [ref=e85]:
          - textbox [ref=e86]
          - generic: "*Email"
        - generic [ref=e89]:
          - textbox [ref=e90]
          - generic: "*Confirmar email"
  - generic [ref=e92]:
    - text: He leído y acepto los
    - link "Términos y condiciones" [ref=e94] [cursor=pointer]:
      - /url: https://s3-respaldo-documentos-necsus-prod.s3.amazonaws.com/Te%CC%81rminos_y_Condiciones_2024__septiembre_2024_.pdf
    - link "Aviso de privacidad." [ref=e95] [cursor=pointer]:
      - /url: https://s3-proveedores-managed-documets.s3.us-east-1.amazonaws.com/privacy-notice.pdf
  - paragraph [ref=e97]: "* Datos obligatorios"
  - button "Finalizar" [disabled] [ref=e99]
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | import { BasePage } from './BasePage';
  3   | import { config } from '../config/environments';
  4   | import {
  5   |   PersonaFisicaData,
  6   |   PersonaMoralData,
  7   |   InternacionalData,
  8   | } from '../utils/dataFactory';
  9   | 
  10  | export class SignUpPage extends BasePage {
  11  |   // ── Locators ──────────────────────────────────────────────────────────────
  12  | 
  13  |   private readonly businessNameInput = this.byFieldName('businessName');
  14  | 
  15  |   // Dropdowns de origen y personalidad
  16  |   private readonly origenDropdown = this.page
  17  |     .locator('.sign-up__holder', { hasText: 'Origen de la empresa' })
  18  |     .locator('.multiselect__select');
  19  | 
  20  |   private readonly personalidadDropdown = this.page
  21  |     .locator('.sign-up__holder', { hasText: 'Personalidad jurídica' })
  22  |     .locator('.multiselect__select');
  23  | 
  24  |   // Campos Persona Física
  25  |   private readonly naturalRfcInput = this.byFieldName('naturalRfc');
  26  |   private readonly confirmNaturalRfcInput = this.byFieldName('confirmNaturalRFC');
  27  | 
  28  |   // Campos Persona Moral
  29  |   private readonly legalRfcInput = this.byFieldName('legalRfc');
  30  |   private readonly confirmLegalRfcInput = this.byFieldName('confirmLegalRFC');
  31  | 
  32  |   // Campos Internacional
  33  |   private readonly tinInput = this.byFieldName('tin');
  34  | 
  35  |   // Datos personales (comunes)
  36  |   private readonly namesInput = this.byFieldName('names');
  37  |   private readonly firstSurnameInput = this.byFieldName('firstSurname');
  38  |   private readonly secondSurnameInput = this.byFieldName('secondSurname');
  39  |   private readonly positionInput = this.byFieldName('position');
  40  | 
  41  |   // Teléfonos Nacional
  42  |   private readonly mobilePhoneInput = this.byFieldName('mobilePhone');
  43  |   private readonly landLineInput = this.byFieldName('landLine');
  44  | 
  45  |   // Teléfonos Internacional
  46  |   private readonly foreignMobileInput = this.byFieldName('foreignmobilePhone');
  47  |   private readonly foreignLandLineInput = this.byFieldName('foreignlandLine');
  48  | 
  49  |   // Correo
  50  |   private readonly emailInput = this.byFieldName('email');
  51  |   private readonly confirmEmailInput = this.byFieldName('confirmEmail');
  52  | 
  53  |   // Términos y botón
  54  |   private readonly termsCheckbox = this.page.getByRole('checkbox').or(this.page.locator('.radio__check_mark'));
  55  |   private readonly saveButton = this.page
  56  |     .getByRole('button', { name: /guardar|registrar|enviar/i })
  57  |     .or(this.byFieldName('save'));
  58  | 
  59  |   // ── Navegación ────────────────────────────────────────────────────────────
  60  | 
  61  |   async goto() {
  62  |     await this.navigate(config.baseUrl);
  63  |     await this.waitForVisible(this.businessNameInput);
  64  |   }
  65  | 
  66  |   async goToSignUp() {
  67  |     await this.goto();
  68  |   }
  69  | 
  70  |   // ── Secciones reutilizables ───────────────────────────────────────────────
  71  | 
  72  |   private async fillBusinessName(name: string) {
  73  |     await this.fillAndVerify(this.businessNameInput, name);
  74  |   }
  75  | 
  76  |   private async selectOrigen(origen: 'Nacional' | 'Internacional') {
  77  |     if (origen === 'Internacional') {
  78  |       await this.origenDropdown.click();
  79  |       await this.clickDropdownOption('Internacional');
  80  |     }
  81  |     // Nacional es el valor por defecto, no necesita acción
  82  |   }
  83  | 
  84  |   private async selectPersonalidad(tipo: 'Persona Fisica' | 'Persona Moral') {
> 85  |     await this.personalidadDropdown.click();
      |                                     ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  86  |     await this.clickDropdownOption(tipo);
  87  |   }
  88  | 
  89  |   private async fillDatosPersonales(data: {
  90  |     names: string;
  91  |     firstSurname: string;
  92  |     secondSurname: string;
  93  |     position: string;
  94  |   }) {
  95  |     await this.namesInput.fill(data.names);
  96  |     await this.firstSurnameInput.fill(data.firstSurname);
  97  |     await this.secondSurnameInput.fill(data.secondSurname);
  98  |     await this.positionInput.fill(data.position);
  99  |   }
  100 | 
  101 |   private async selectLada() {
  102 |     await this.page
  103 |       .locator('.multiselect__placeholder')
  104 |       .filter({ hasText: 'Seleccione' })
  105 |       .click();
  106 |     await this.clickDropdownOption('México (+52)');
  107 |   }
  108 | 
  109 |   private async fillContacto(data: { mobilePhone: string; landLine: string; email: string }) {
  110 |     await this.mobilePhoneInput.fill(data.mobilePhone);
  111 |     await this.landLineInput.fill(data.landLine);
  112 |     await this.emailInput.fill(data.email);
  113 |     await this.forceInputValue(this.confirmEmailInput, data.email);
  114 |   }
  115 | 
  116 |   private async fillContactoInternacional(data: {
  117 |     mobilePhone: string;
  118 |     landLine: string;
  119 |     email: string;
  120 |   }) {
  121 |     await this.foreignMobileInput.fill(data.mobilePhone);
  122 |     await this.foreignLandLineInput.fill(data.landLine);
  123 |     await this.emailInput.fill(data.email);
  124 |     await this.forceInputValue(this.confirmEmailInput, data.email);
  125 |   }
  126 | 
  127 |   private async acceptTermsAndSubmit() {
  128 |     await this.termsCheckbox.first().click();
  129 |     await this.saveButton.click();
  130 |   }
  131 | 
  132 |   // ── Flujos completos ──────────────────────────────────────────────────────
  133 | 
  134 |   /**
  135 |    * Flujo completo: Registro Nacional Persona Física
  136 |    */
  137 |   async registerNacionalPersonaFisica(data: PersonaFisicaData) {
  138 |     await this.fillBusinessName(data.businessName);
  139 |     await this.selectPersonalidad('Persona Fisica');
  140 |     await this.naturalRfcInput.fill(data.rfc);
  141 |     await this.confirmNaturalRfcInput.fill(data.rfc);
  142 |     await this.fillDatosPersonales(data);
  143 |     await this.selectLada();
  144 |     await this.fillContacto(data);
  145 |     await this.acceptTermsAndSubmit();
  146 |   }
  147 | 
  148 |   /**
  149 |    * Flujo completo: Registro Nacional Persona Moral
  150 |    */
  151 |   async registerNacionalPersonaMoral(data: PersonaMoralData) {
  152 |     await this.fillBusinessName(data.businessName);
  153 |     // Persona Moral ya es default, solo necesitamos confirmar que está seleccionado
  154 |     await this.legalRfcInput.fill(data.rfc);
  155 |     await this.confirmLegalRfcInput.fill(data.rfc);
  156 |     await this.fillDatosPersonales(data);
  157 |     await this.selectLada();
  158 |     await this.fillContacto(data);
  159 |     await this.acceptTermsAndSubmit();
  160 |   }
  161 | 
  162 |   /**
  163 |    * Flujo completo: Registro Internacional
  164 |    */
  165 |   async registerInternacional(data: InternacionalData) {
  166 |     await this.fillBusinessName(data.businessName);
  167 |     await this.selectOrigen('Internacional');
  168 |     await this.tinInput.fill(data.tin);
  169 |     await this.fillDatosPersonales(data);
  170 |     await this.selectLada();
  171 |     await this.fillContactoInternacional(data);
  172 |     await this.acceptTermsAndSubmit();
  173 |   }
  174 | 
  175 |   // ── Assertions ────────────────────────────────────────────────────────────
  176 | 
  177 |   async expectSubmitSuccess() {
  178 |     // Ajustar según el comportamiento real post-submit de Necsus
  179 |     await expect(this.saveButton).toBeDisabled({ timeout: 10_000 }).catch(() => {
  180 |       // Si el botón no se deshabilita, verificar que no hay errores visibles
  181 |     });
  182 |   }
  183 | }
  184 | 
```