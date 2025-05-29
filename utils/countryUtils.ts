/**
 * Converts a country name to its ISO 3166-1 alpha-2 code
 * @param countryName - The name of the country (e.g., "United Kingdom", "UK", "France")
 * @returns The ISO alpha-2 code for the country (e.g., "GB", "FR")
 */
export const getCountryCode = (countryName: string): string => {
  // Normalize the input by trimming and converting to lowercase
  const normalizedName = countryName.trim().toLowerCase();

  // Map of common country names and their ISO codes
  const countryMap: { [key: string]: string } = {
    // Full names
    'united kingdom': 'GB',
    'united states': 'US',
    'united states of america': 'US',
    france: 'FR',
    germany: 'DE',
    spain: 'ES',
    italy: 'IT',
    portugal: 'PT',
    netherlands: 'NL',
    belgium: 'BE',
    switzerland: 'CH',
    australia: 'AU',
    canada: 'CA',
    japan: 'JP',
    china: 'CN',
    india: 'IN',
    brazil: 'BR',
    russia: 'RU',
    'south africa': 'ZA',
    mexico: 'MX',

    // Common abbreviations
    uk: 'GB',
    usa: 'US',
    'u.s.a.': 'US',
    'u.s.': 'US',
    'u.k.': 'GB',
  };

  // Check if the normalized name exists in our map
  const code = countryMap[normalizedName];

  if (!code) {
    console.warn(`No ISO code found for country: ${countryName}`);
    return ''; // Return empty string if no match found
  }

  return code;
};
