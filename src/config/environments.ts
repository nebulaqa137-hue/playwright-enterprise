import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://necsus.com.mx/signup/#/',
  apiUrl: process.env.API_URL || 'https://api.necsus.com.mx',
  env: process.env.ENV || 'qa',
  testEmail: process.env.TEST_EMAIL || 'desktop@callcenter.com',
  testPhone: process.env.TEST_PHONE || '5529310516',
};
