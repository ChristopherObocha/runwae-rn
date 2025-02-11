import axios from 'axios';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '~/components/nativewindui/Text';
import { Spacer } from '~/utils/Spacer';
import { constants, Hotel } from '~/utils/constants';

const { DEFAULT_HOTELS } = constants;
type Category = 'hotels' | 'restaurants' | 'geos' | 'attractions';

export default function Home() {
  const hotelData = DEFAULT_HOTELS;
  const defaultLocation: Location.LocationObject = {
    coords: {
      latitude: 42.3455,
      longitude: -71.10767,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: new Date().getTime(),
  };
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState<Location.LocationObject | null>(defaultLocation);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hotels, setHotels] = useState<any>();

  const backgroundContainer = {
    paddingTop: insets.top + 10,
  };

  // useEffect(() => {
  //   (async () => {
  //     // Request permission to access location
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     // Get the user's location
  //     const location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  useEffect(() => {
    getNearbyCategories('hotels');
    console.log('ran');
  }, [location]);

  const getNearbyCategories = async (category: Category) => {
    const options = {
      method: 'GET',
      url: 'https://api.content.tripadvisor.com/api/v1/location/nearby_search',
      params: {
        latLong: '42.3455%2C-71.10767',
        // key: process.env.TRIPADVISOR_API_KEY,
        key: 'C653ED7F198341E28C521B15D4DF4AC1',
        category,
        language: 'en',
      },
      headers: { accept: 'application/json' },
    };

    const response = await axios.request(options).catch((error) => {
      console.error(error);
    });

    if (response) {
      setHotels(response?.data);
    }

    // console.log(JSON.stringify(response?.data));
  };

  const HotelCard = ({ hotel }: { hotel: any }) => {
    return (
      <View style={styles.hotelCard}>
        <Image source={hotel.image_url} style={styles.hotelImage} />
        <View style={styles.hotelInfo}>
          <Text variant="heading" style={styles.hotelName}>
            {hotel.name}
          </Text>
          <Spacer size={10} vertical />
          <Text variant="body" style={styles.hotelLocation}>
            {`${hotel.city_name}, ${hotel.country}`}
          </Text>
        </View>
      </View>
    );
  };

  const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
    return (
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  };

  const TripAdvisorDestinationCard = ({ destination }: { destination: any }) => {
    return (
      <View style={styles.hotelCard}>
        <Text>{destination.name}</Text>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <ScrollView style={[styles.container, backgroundContainer]}>
        <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
          {hotelData?.data?.map((hotel: Hotel, index: number) => (
            <HotelCard key={`${hotel.dest_id}-${index}`} hotel={hotel} />
          ))}
        </ScrollView>
        <Spacer size={10} vertical />
        <Text>Nearby Hotels</Text>
        <HorizontalScroll>
          {hotels?.data?.map((hotel: Hotel, index: number) => (
            <HotelCard key={`${hotel.dest_id}-${index}`} hotel={hotel} />
          ))}
        </HorizontalScroll>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 24,
  },
  scrollView: {
    flexDirection: 'row',
  },
  hotelCard: {
    backgroundColor: 'white',
    marginBottom: 10,
    maxHeight: 200,
    width: 180,
    marginRight: 10,
    borderRadius: 10,
    paddingBottom: 10,
  },
  hotelImage: {
    height: 100,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hotelInfo: {
    padding: 10,
  },
  hotelName: {
    fontWeight: 'bold',
  },
  hotelLocation: {
    color: 'gray',
    lineHeight: 18,
  },
});
