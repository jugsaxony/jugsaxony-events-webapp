export const environment = {
  version: '@APP_VERSION@',
  name: 'Production',
  production: true,
  apiRoot: '/api',
  eventRefreshMillis: 60 * 60 * 1000,
  companyRefreshMillis: 60 * 60 * 1000,
  wpApiRoot: '/wp/api',
  wpPages: {
    'imprint': 4427,
    'about': 4472,
    'data-protection': 5617
  }
};
