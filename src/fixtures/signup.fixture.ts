import {
  generateInternacionalData,
  generatePersonaFisicaData,
  generatePersonaMoralData,
  InternacionalData,
  PersonaFisicaData,
  PersonaMoralData,
} from '../utils/dataFactory';
import { pagesFixture } from './pages.fixture';

type SignUpDataFixtures = {
  personaFisicaData: PersonaFisicaData;
  personaMoralData: PersonaMoralData;
  internacionalData: InternacionalData;
};

type SignUpFlowFixtures = {
  createPersonaFisicaUser: (data?: PersonaFisicaData) => Promise<PersonaFisicaData>;
  createPersonaMoralUser: (data?: PersonaMoralData) => Promise<PersonaMoralData>;
  createInternacionalUser: (data?: InternacionalData) => Promise<InternacionalData>;
};

export const signUpFixture = pagesFixture.extend<SignUpDataFixtures & SignUpFlowFixtures>({
  personaFisicaData: async ({}, use) => {
    await use(generatePersonaFisicaData());
  },

  personaMoralData: async ({}, use) => {
    await use(generatePersonaMoralData());
  },

  internacionalData: async ({}, use) => {
    await use(generateInternacionalData());
  },

  createPersonaFisicaUser: async ({ signUpPage, personaFisicaData }, use) => {
    await use(async (data = personaFisicaData) => {
      await signUpPage.registerNacionalPersonaFisica(data);
      return data;
    });
  },

  createPersonaMoralUser: async ({ signUpPage, personaMoralData }, use) => {
    await use(async (data = personaMoralData) => {
      await signUpPage.registerNacionalPersonaMoral(data);
      return data;
    });
  },

  createInternacionalUser: async ({ signUpPage, internacionalData }, use) => {
    await use(async (data = internacionalData) => {
      await signUpPage.registerInternacional(data);
      return data;
    });
  },
});

