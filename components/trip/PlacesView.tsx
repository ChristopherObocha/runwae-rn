import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ENDPOINTS } from '~/hooks/client/endpoints';
import { AmadeusService } from '~/services/amadeus';
import { constants } from '~/utils/constants';
import { getCountryCode } from '~/utils/countryUtils';

const { GET } = constants;
const { baseAmadeus, cityInfo } = ENDPOINTS;

type PlacesViewProps = {
  style?: ViewStyle;
  location?: string;
};

const PlacesView = ({ style, location = 'Paris' }: PlacesViewProps) => {
  const amadeusService = AmadeusService.getInstance();
  const [cityResults, setCityResults] = useState<any[]>([]);

  // Split location into city and country parts
  const [city, country] = location.split(',').map((part) => part.trim());

  // Use our local getCountryCode function
  const countryCode: string = getCountryCode(country) || '';

  const keyword: string = city || '';

  useEffect(() => {
    amadeusService
      .makeRequest(cityInfo(countryCode, keyword), GET)
      .then((places) => {
        setCityResults(places);
      });
  }, [location]);

  const callCityInfo = async () => {
    if (!countryCode) {
      console.warn('No valid country code found');
      return;
    }

    const cityInfoResult = await amadeusService.makeRequest(
      `${baseAmadeus}${cityInfo(countryCode, keyword)}`,
      GET
    );
    console.log('cityInfo', JSON.stringify(cityInfoResult, null, 2));
  };

  callCityInfo();
  return (
    <View style={[styles.container, style]}>
      <Text>Places Content</Text>
    </View>
  );
};

export default PlacesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
});
