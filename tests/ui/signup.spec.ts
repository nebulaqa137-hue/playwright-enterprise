import { test } from '../../src/fixtures';

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
test.describe('Registro de empresas — Necsus @regression', () => {

  test.describe.configure({ mode: 'serial' }); // corren en serie para no chocar en la misma URL

  // ── Test 1: Nacional Persona Física ──────────────────────────────────────

  test('Registro Nacional — Persona Física @smoke @signup', async ({
    createPersonaFisicaUser,
    signUpPage,
  }, testInfo) => {
    await test.step('Completar registro como Persona Física', async () => {
      const data = await createPersonaFisicaUser();
      await testInfo.attach('persona-fisica-data', {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step('Verificar envío exitoso', async () => {
      await signUpPage.expectSubmitSuccess();
    });
  });

  // ── Test 2: Nacional Persona Moral ───────────────────────────────────────

  test('Registro Nacional — Persona Moral @regression @signup', async ({
    createPersonaMoralUser,
    signUpPage,
  }, testInfo) => {
    await test.step('Completar registro como Persona Moral', async () => {
      const data = await createPersonaMoralUser();
      await testInfo.attach('persona-moral-data', {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step('Verificar envío exitoso', async () => {
      await signUpPage.expectSubmitSuccess();
    });
  });

  // ── Test 3: Internacional ─────────────────────────────────────────────────

  test('Registro Internacional @regression @signup', async ({
    createInternacionalUser,
    signUpPage,
  }, testInfo) => {
    await test.step('Completar registro Internacional', async () => {
      const data = await createInternacionalUser();
      await testInfo.attach('internacional-data', {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step('Verificar envío exitoso', async () => {
      await signUpPage.expectSubmitSuccess();
    });
  });

});
