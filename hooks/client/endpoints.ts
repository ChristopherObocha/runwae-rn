export const ENDPOINTS = {
  baseurl: 'https://runwae.com/api',
  baseAmadeus: 'https://test.api.amadeus.com/',
  amadeusGetToken: 'https://test.api.amadeus.com/v1/security/oauth2/token',
  cityInfo: (countryCode: string, keyword: string) =>
    `v1/reference-data/locations/cities?countryCode=${countryCode}&keyword=${keyword}`,
  activitySearchByGeoCode: (
    latitude: string,
    longitude: string,
    radius: string
  ) =>
    `v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
};
