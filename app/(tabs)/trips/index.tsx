import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '~/components/ScreenContainer';
import ConciseTripCard from '~/components/cards/ConciseTripCard';
import { Trip, useTrips } from '~/hooks/useTrips';

const TripsScreen = () => {
  const { trips, getTrips } = useTrips();

  useEffect(() => {
    getTrips();
  }, []);

  const handleTripPress = (trip: Trip) => {
    // console.log('trip pressed', trip);
    router.push({
      pathname: '/trips/expanded-trip',
      params: { trip: JSON.stringify(trip) },
      // params: { trip: trip },
    });
  };

  return (
    <ScreenContainer
      withBoxes={false}
      style={styles.container}
      header={<Text style={styles.header}>My Trips</Text>}>
      <View style={styles.tripsContainer}>
        {trips.map((trip) => (
          <ConciseTripCard
            key={trip.id}
            trip={trip}
            onPress={() => handleTripPress(trip)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
};

export default TripsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tripsContainer: {
    flex: 1,
    gap: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
