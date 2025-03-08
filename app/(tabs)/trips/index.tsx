import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '~/components/ScreenContainer';
import ConciseTripCard from '~/components/cards/ConciseTripCard';
import { useTrips } from '~/hooks/useTrips';

const TripsScreen = () => {
  const { trips, getTrips } = useTrips();

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <ScreenContainer
      withBoxes={false}
      style={styles.container}
      header={<Text style={styles.header}>My Trips</Text>}>
      <View style={styles.tripsContainer}>
        {trips.map((trip) => (
          <ConciseTripCard key={trip.id} trip={trip} />
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
