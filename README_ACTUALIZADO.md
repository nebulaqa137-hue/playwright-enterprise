  # Playwright Enterprise Framework - Necsus

  Framework de automatizacion enterprise con Playwright, TypeScript, Page Object Model, fixtures personalizados, Allure Report y GitHub Actions.

  ## Stack

  | Herramienta | Version | Proposito |
  |---|---:|---|
  | Playwright | ^1.44 | Framework principal de automatizacion |
  | TypeScript | ^5.4 | Lenguaje base del framework |
  | Faker.js | ^8.4 | Generacion dinamica de datos de prueba |
  | Allure Playwright | ^3.7 | Reporter principal de resultados |
  | Allure Commandline | ^2.38 | Generacion y apertura de reportes Allure |
  | GitHub Actions | - | CI/CD |

  ## Estructura

  ```text
  playwright-enterprise/
  ├── .github/
  │   └── workflows/
  │       └── playwright-ci.yml             # Pipeline CI/CD
  ├── src/
  │   ├── api/                              # Clientes/helpers API
  │   ├── components/                       # Componentes reutilizables de UI
  │   ├── config/
  │   │   └── environments.ts               # Configuracion por ambiente
  │   ├── fixtures/
  │   │   ├── index.ts                      # Export central de test/expect
  │   │   ├── pages.fixture.ts              # Fixtures de Page Objects
  │   │   └── signup.fixture.ts             # Fixtures de datos y flujos signup
  │   ├── pages/
  │   │   ├── BasePage.ts                   # Clase base para POM
  │   │   └── SignUpPage.ts                 # Page Object del formulario signup
  │   └── utils/
  │       └── dataFactory.ts                # Generadores de datos con Faker
  ├── test-data/
  │   └── signupTestData.ts                 # Datos estaticos de respaldo/debug
  ├── tests/
  │   ├── api/                              # Tests API
  │   ├── hybrid/                           # Tests combinados UI/API
  │   └── ui/
  │       └── signup.spec.ts                # Tests UI con tags
  ├── allure-results/                       # Resultados Allure generados
  ├── playwright-report/                    # Reporte HTML generado
  ├── test-results/                         # Artefactos de ejecucion
  ├── playwright.config.ts                  # Config principal Playwright
  ├── tsconfig.json                         # Config TypeScript y aliases
  ├── .env.example
  └── package.json
  ```

  ## Arquitectura

  ### Page Object Model

  Los flujos de UI viven en `src/pages`. Cada pagina encapsula:

  | Archivo | Responsabilidad |
  |---|---|
  | `BasePage.ts` | Navegacion, esperas, helpers comunes y acceso a locators reutilizables |
  | `SignUpPage.ts` | Locators y acciones del formulario de registro Necsus |

  Los tests no deben manipular locators directamente. La interaccion con la UI debe pasar por metodos del Page Object, por ejemplo:

  ```typescript
  await signUpPage.registerNacionalPersonaFisica(data);
  await signUpPage.expectSubmitSuccess();
  ```

  ### Fixtures personalizados

  Los fixtures viven en `src/fixtures` y separan responsabilidades:

  | Fixture | Proposito |
  |---|---|
  | `signUpPage` | Inicializa el Page Object y navega al formulario |
  | `personaFisicaData` | Genera datos dinamicos para Persona Fisica |
  | `personaMoralData` | Genera datos dinamicos para Persona Moral |
  | `internacionalData` | Genera datos dinamicos para registro Internacional |
  | `createPersonaFisicaUser` | Ejecuta el flujo comun de creacion Persona Fisica |
  | `createPersonaMoralUser` | Ejecuta el flujo comun de creacion Persona Moral |
  | `createInternacionalUser` | Ejecuta el flujo comun de creacion Internacional |

  Ejemplo de uso:

  ```typescript
  import { test } from '../../src/fixtures';

  test('Registro Nacional - Persona Fisica @smoke @signup', async ({
    createPersonaFisicaUser,
    signUpPage,
  }, testInfo) => {
    const data = await createPersonaFisicaUser();

    await testInfo.attach('persona-fisica-data', {
      body: JSON.stringify(data, null, 2),
      contentType: 'application/json',
    });

    await signUpPage.expectSubmitSuccess();
  });
  ```

  ## Locators

  Buenas practicas aplicadas:

  | Practica | Estado |
  |---|---|
  | Preferir `getByRole` | Aplicado en botones, opciones y checkbox cuando el DOM lo permite |
  | Usar `getByTestId` | Habilitado con `testIdAttribute: 'data-testid'` |
  | Evitar XPath | No se usa XPath |
  | Centralizar selectores | Selectores ubicados dentro de Page Objects |
  | Evitar selectores en tests | Los tests usan fixtures y metodos del POM |

  Cuando la aplicacion no expone roles o `data-testid`, se usan selectores CSS estables como `[name="email"]`.

  ## Tags

  Los tests usan tags en el titulo para filtrar ejecuciones:

  | Tag | Uso |
  |---|---|
  | `@smoke` | Validacion minima critica |
  | `@regression` | Casos completos de regresion |
  | `@signup` | Casos asociados al modulo signup |

  Ejemplos:

  ```bash
  npm run test:smoke
  npm run test:regression
  npx playwright test --grep "@signup"
  ```

  ## Playwright Config

  Configuracion principal en `playwright.config.ts`:

  | Configuracion | Valor |
  |---|---|
  | `testDir` | `./tests` |
  | `timeout` | `45_000` |
  | `expect.timeout` | `10_000` |
  | `retries` | `2` en CI, `0` local |
  | `workers` | `4` en CI, automatico local |
  | `trace` | `on-first-retry` |
  | `screenshot` | `only-on-failure` |
  | `video` | `on-first-retry` |
  | `testIdAttribute` | `data-testid` |

  ### Proyectos

  | Proyecto | Uso |
  |---|---|
  | `ui-chromium` | UI en Desktop Chrome |
  | `ui-firefox` | UI en Desktop Firefox |
  | `ui-webkit` | UI en Desktop Safari/WebKit |
  | `api` | Tests API |

  ## Reportes

  El framework deja activos HTML + Allure.

  | Reporter | Salida |
  |---|---|
  | `list` | Consola |
  | `html` | `playwright-report/` |
  | `allure-playwright` | `allure-results/` |

  Comandos:

  ```bash
  npm run report
  npm run allure:generate
  npm run allure:open
  ```

  ## Setup local

  ```bash
  npm install
  npx playwright install --with-deps chromium
  cp .env.example .env
  ```

  Variables principales:

  | Variable | Descripcion |
  |---|---|
  | `BASE_URL` | URL del formulario signup |
  | `API_URL` | URL base API |
  | `ENV` | Ambiente objetivo |
  | `TEST_EMAIL` | Email fijo opcional para debug |
  | `TEST_PHONE` | Telefono fijo opcional para debug |

  ## Ejecucion

  ```bash
  # Todos los tests
  npm test

  # UI principal en Chromium
  npm run test:ui

  # UI en Chromium, Firefox y WebKit
  npm run test:ui:all

  # API
  npm run test:api

  # Smoke
  npm run test:smoke

  # Regression
  npm run test:regression

  # Headed
  npm run test:headed

  # Debug UI
  npm run test:debug
  ```

  ## CI/CD

  El workflow `.github/workflows/playwright-ci.yml` ejecuta:

  ```bash
  npx playwright test --project=ui-chromium --grep @smoke
  ```

  Despues genera el reporte Allure:

  ```bash
  npx allure generate allure-results --clean -o allure-report
  ```

  Y publica el reporte en GitHub Pages mediante la rama `gh-pages`.

  ## Datos de prueba

  Los tests principales usan `src/utils/dataFactory.ts` para generar datos dinamicos con Faker.

  `test-data/signupTestData.ts` queda como dataset estatico de respaldo para debugging o reproduccion de casos especificos.

  Flujos cubiertos actualmente:

  | Flujo | Data factory | Fixture de flujo | Tags |
  |---|---|---|---|
  | Nacional Persona Fisica | `generatePersonaFisicaData` | `createPersonaFisicaUser` | `@smoke @signup` |
  | Nacional Persona Moral | `generatePersonaMoralData` | `createPersonaMoralUser` | `@regression @signup` |
  | Internacional | `generateInternacionalData` | `createInternacionalUser` | `@regression @signup` |

  ## Validacion realizada

  Se valido el refactor con:

  ```bash
  npx tsc --noEmit
  npx playwright test --list
  npx playwright test --project=ui-chromium --grep '@smoke'
  ```

  Resultado:

  ```text
  TypeScript OK
  Playwright descubre 9 tests
  Smoke en Chromium: 1 passed
  ```

