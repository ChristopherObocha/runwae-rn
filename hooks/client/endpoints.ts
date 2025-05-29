export const ENDPOINTS = {
  baseurl: 'https://runwae.com/api',
  baseAmadeus: 'https://test.api.amadeus.com/',
  amadeusGetToken: 'https://test.api.amadeus.com/v1/security/oauth2/token',
  cityInfo: (countryCode: string, keyword: string) =>
    `reference-data/locations/cities?countryCode=${countryCode}&keyword=${keyword}`,
};
