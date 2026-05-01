# Playwright Enterprise Framework — Necsus

Framework de automatización enterprise con Playwright, TypeScript, GitHub Actions y TestDino.

## Stack

| Herramienta | Versión | Propósito |
|---|---|---|
| Playwright | ^1.44 | Framework principal |
| TypeScript | ^5.4 | Lenguaje |
| Faker.js | ^8.4 | Generación de datos random |
| GitHub Actions | - | CI/CD en la nube |
| TestDino | - | Reportes con IA |

## Estructura

```
playwright-enterprise/
├── .github/workflows/playwright-ci.yml   ← Pipeline CI/CD
├── src/
│   ├── pages/SignUpPage.ts               ← Page Object del formulario
│   ├── pages/BasePage.ts                 ← Clase base
│   ├── fixtures/index.ts                 ← Fixtures personalizadas
│   ├── utils/dataFactory.ts              ← Generadores con faker
│   └── config/environments.ts           ← Config por ambiente
├── tests/ui/signup.spec.ts               ← Los 3 casos de prueba
├── test-data/signupTestData.ts           ← Datos estáticos de respaldo
├── playwright.config.ts
├── .env.example
└── package.json
```

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Instalar browsers de Playwright
npx playwright install --with-deps chromium

# 3. Copiar y configurar variables de entorno
cp .env.example .env
```

## Ejecución

```bash
# Todos los tests
npm test

# Solo UI
npm run test:ui

# Modo visual (ver el navegador)
npm run test:headed

# Modo debug interactivo
npm run test:debug

# Ver reporte HTML
npm run report
```

## GitHub Actions

El pipeline se dispara automáticamente con cada `push` o `pull_request` a `main` o `develop`.

### Secrets requeridos en GitHub

Ir a **Settings → Secrets → Actions** y agregar:

| Secret | Descripción |
|---|---|
| `BASE_URL` | URL del formulario de signup |
| `API_URL` | URL base de la API |
| `TESTDINO_TOKEN` | Token de tu cuenta en testdino.com |

## Datos de prueba

Todos los datos son generados con faker — **nada está hardcodeado** en los tests.

```typescript
import { generatePersonaFisicaData } from '../../src/utils/dataFactory';

const data = generatePersonaFisicaData();
// {
//   businessName: "SA de CV Torres Hermanos",
//   rfc: "GRTM821104XN2",
//   names: "Carlos",
//   firstSurname: "Mendoza",
//   ...
// }
```
