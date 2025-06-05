import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ENDPOINTS } from '~/hooks/client/endpoints';
import { AmadeusService } from '~/services/amadeus';
import { constants } from '~/utils/constants';
import { getCountryCode } from '~/utils/countryUtils';

const { GET } = constants;
const { baseAmadeus, cityInfo, activitySearchByGeoCode } = ENDPOINTS;

type PlacesViewProps = {
  style?: ViewStyle;
  location?: string;
};

const PlacesView = ({ style, location = 'Paris' }: PlacesViewProps) => {
  const amadeusService = AmadeusService.getInstance();
  const [cityResults, setCityResults] = useState<any[]>([]);

  // Split location into city and country parts
  const [city, country] = location.split(',').map((part) => part.trim());
  const [cityDetails, setCityDetails] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  // Use our local getCountryCode function
  const countryCode: string = getCountryCode(country) || '';
  const keyword: string = city || '';

  useEffect(() => {
    if (!cityDetails) {
      callCityInfo();
    }
  }, [location]);

  useEffect(() => {
    if (cityDetails) {
      callActivitySearchByGeoCode();
    }
  }, [cityDetails]);

  const callCityInfo = async () => {
    if (!countryCode) {
      console.warn('No valid country code found');
      return;
    }

    try {
      const url = `${baseAmadeus}${cityInfo(countryCode, keyword)}`;
      console.log('City Info URL:', url);
      const cityInfoResult = await amadeusService.makeRequest(url, GET);
      if (cityInfoResult?.data) {
        setCityDetails(cityInfoResult);

        //call activity search by geo code
        callActivitySearchByGeoCode();
      } else {
        console.warn('No city details found in response');
      }
    } catch (error: any) {
      console.error('Error fetching city info:', error);
    }
  };

  const callActivitySearchByGeoCode = async () => {
    if (!cityDetails?.data[0]?.geoCode) {
      console.warn('No valid city details found. ');
      return;
    }

    try {
      const url = `${baseAmadeus}${activitySearchByGeoCode(
        cityDetails.data.geoCode.latitude,
        cityDetails.data.geoCode.longitude,
        '5'
      )}`;
      console.log('Activity Search URL:', url);
      const activitySearchByGeoCodeResult = await amadeusService.makeRequest(
        url,
        GET
      );
      if (activitySearchByGeoCodeResult?.data) {
        setActivities(activitySearchByGeoCodeResult);
      } else {
        console.warn('No activities found in response');
      }
    } catch (error: any) {
      console.error('Error calling activity search by geo code:', error);
    }
  };

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
