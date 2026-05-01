import { test, expect } from '../../src/fixtures';
import {
  generatePersonaFisicaData,
  generatePersonaMoralData,
  generateInternacionalData,
} from '../../src/utils/dataFactory';

/**
 * Suite: Registro de empresas — Necsus Signup
 *
 * Cubre los tres flujos principales del formulario:
 *  1. Nacional Persona Física
 *  2. Nacional Persona Moral
 *  3. Internacional
 *
 * Todos los datos son generados con faker — sin valores hardcodeados.
 */
test.describe('Registro de empresas — Necsus', () => {

  test.describe.configure({ mode: 'serial' }); // corren en serie para no chocar en la misma URL

  // ── Test 1: Nacional Persona Física ──────────────────────────────────────

  test('Registro Nacional — Persona Física', async ({ signUpPage }) => {
    const data = generatePersonaFisicaData();

    // Log de los datos generados (visible en el reporte de TestDino)
    console.log('[DataFactory] Persona Física:', JSON.stringify(data, null, 2));

    await test.step('Llenar nombre de empresa', async () => {
      // goToSignUp ya fue llamado por el fixture
    });

    await test.step('Completar registro como Persona Física', async () => {
      await signUpPage.registerNacionalPersonaFisica(data);
    });

    await test.step('Verificar envío exitoso', async () => {
      await signUpPage.expectSubmitSuccess();
    });
  });

  // ── Test 2: Nacional Persona Moral ───────────────────────────────────────

  test('Registro Nacional — Persona Moral', async ({ signUpPage }) => {
    const data = generatePersonaMoralData();

    console.log('[DataFactory] Persona Moral:', JSON.stringify(data, null, 2));

    await test.step('Completar registro como Persona Moral', async () => {
      await signUpPage.registerNacionalPersonaMoral(data);
    });

    await test.step('Verificar envío exitoso', async () => {
      await signUpPage.expectSubmitSuccess();
    });
  });

  // ── Test 3: Internacional ─────────────────────────────────────────────────

  test('Registro Internacional', async ({ signUpPage }) => {
    const data = generateInternacionalData();

    console.log('[DataFactory] Internacional:', JSON.stringify(data, null, 2));

    await test.step('Completar registro Internacional', async () => {
      await signUpPage.registerInternacional(data);
    });

    await test.step('Verificar envío exitoso', async () => {
      await signUpPage.expectSubmitSuccess();
    });
  });

});
