import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

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

  console.log('cityResults', cityResults);
  const callCityInfo = async () => {
    const cityInfo = await amadeusService.makeRequest(
      `${baseAmadeus}v1/reference-data/locations/cities`,
      GET
    );
    console.log('cityInfo', cityInfo);
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
