import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
  getCountryCode,
  getCountryData,
  getCountryDataList,
  getEmojiFlag,
} from 'countries-list';

import { AmadeusService } from '~/services/amadeus';
import { constants } from '~/utils/constants';
import { ENDPOINTS } from '~/hooks/client/endpoints';

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
  const countryCode = getCountryCode(country || '');
  const keyword = city;

  // useEffect(() => {
  //   amadeusService
  //     .makeRequest(cityInfo, GET, {
  //       params: {
  //         keyword: 'Paris',
  //         countryCode: 'FR',
  //       },
  //     })
  //     .then((places) => {
  //       setCityResults(places);
  //     });
  // }, [location]);

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
