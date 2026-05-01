import { faker } from '@faker-js/faker/locale/es_MX';

// ── Tipos ──────────────────────────────────────────────────────────────────

export interface PersonaFisicaData {
  businessName: string;
  rfc: string;
  names: string;
  firstSurname: string;
  secondSurname: string;
  position: string;
  mobilePhone: string;
  landLine: string;
  email: string;
}

export interface PersonaMoralData {
  businessName: string;
  rfc: string;
  names: string;
  firstSurname: string;
  secondSurname: string;
  position: string;
  mobilePhone: string;
  landLine: string;
  email: string;
}

export interface InternacionalData {
  businessName: string;
  tin: string;
  names: string;
  firstSurname: string;
  secondSurname: string;
  position: string;
  mobilePhone: string;
  landLine: string;
  email: string;
}

// ── Helpers internos ───────────────────────────────────────────────────────

/**
 * Genera un RFC de Persona Física válido en formato (4 letras + 6 dígitos fecha + 3 homoclave)
 * Ejemplo: RELJ981212NH5
 */
function generateRfcFisica(): string {
  const letters = faker.string.alpha({ length: 4, casing: 'upper' });
  const year = faker.number.int({ min: 60, max: 99 }).toString().padStart(2, '0');
  const month = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
  const day = faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0');
  const homoclave = faker.string.alphanumeric({ length: 3, casing: 'upper' });
  return `${letters}${year}${month}${day}${homoclave}`;
}

/**
 * Genera un RFC de Persona Moral válido en formato (3 letras + 6 dígitos fecha + 3 homoclave)
 * Ejemplo: SAB941124XN2
 */
function generateRfcMoral(): string {
  const letters = faker.string.alpha({ length: 3, casing: 'upper' });
  const year = faker.number.int({ min: 60, max: 99 }).toString().padStart(2, '0');
  const month = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
  const day = faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0');
  const homoclave = faker.string.alphanumeric({ length: 3, casing: 'upper' });
  return `${letters}${year}${month}${day}${homoclave}`;
}

/**
 * Genera un TIN (Tax Identification Number) internacional
 * Formato: letras + dígitos, longitud variable
 */
function generateTin(): string {
  const letters = faker.string.alpha({ length: 5, casing: 'upper' });
  const digits = faker.number.int({ min: 1000000, max: 9999999 }).toString();
  return `${letters}${digits}`;
}

/**
 * Genera un número de teléfono mexicano de 10 dígitos
 * Empieza con 55 (CDMX) o 33 (GDL) o 81 (MTY)
 */
function generateMexicanPhone(): string {
  const prefix = faker.helpers.arrayElement(['55', '33', '81', '56', '66']);
  const rest = faker.number.int({ min: 10000000, max: 99999999 }).toString();
  return `${prefix}${rest}`;
}

/**
 * Genera un nombre de empresa con razón social
 */
function generateBusinessName(): string {
  const prefixes = ['SA de CV', 'S de RL de CV', 'SAB de CV', 'SAPI de CV'];
  const razonSocial = faker.company.name().replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
  const prefix = faker.helpers.arrayElement(prefixes);
  return `${prefix} ${razonSocial}`.trim();
}

/**
 * Genera un cargo / posición profesional
 */
function generatePosition(): string {
  return faker.helpers.arrayElement([
    'Director General',
    'Gerente de Operaciones',
    'Consultor',
    'Representante Legal',
    'Director Financiero',
    'Subdirector',
    'Coordinador de Proyectos',
    'Apoderado Legal',
    'Socio',
  ]);
}

// ── Factories públicas ─────────────────────────────────────────────────────

/**
 * Genera datos completos para registro de Persona Física Nacional
 */
export function generatePersonaFisicaData(): PersonaFisicaData {
  const phone = generateMexicanPhone();
  return {
    businessName: generateBusinessName(),
    rfc: generateRfcFisica(),
    names: faker.person.firstName(),
    firstSurname: faker.person.lastName(),
    secondSurname: faker.person.lastName(),
    position: generatePosition(),
    mobilePhone: phone,
    landLine: generateMexicanPhone(),
    email: faker.internet.email({ provider: 'testmail.com' }).toLowerCase(),
  };
}

/**
 * Genera datos completos para registro de Persona Moral Nacional
 */
export function generatePersonaMoralData(): PersonaMoralData {
  const phone = generateMexicanPhone();
  return {
    businessName: generateBusinessName(),
    rfc: generateRfcMoral(),
    names: faker.person.firstName(),
    firstSurname: faker.person.lastName(),
    secondSurname: faker.person.lastName(),
    position: generatePosition(),
    mobilePhone: phone,
    landLine: generateMexicanPhone(),
    email: faker.internet.email({ provider: 'testmail.com' }).toLowerCase(),
  };
}

/**
 * Genera datos completos para registro Internacional
 */
export function generateInternacionalData(): InternacionalData {
  return {
    businessName: generateBusinessName(),
    tin: generateTin(),
    names: faker.person.firstName(),
    firstSurname: faker.person.lastName(),
    secondSurname: faker.person.lastName(),
    position: generatePosition(),
    mobilePhone: generateMexicanPhone(),
    landLine: generateMexicanPhone(),
    email: faker.internet.email({ provider: 'testmail.com' }).toLowerCase(),
  };
}
