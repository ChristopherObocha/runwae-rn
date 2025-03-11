import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '~/components/ScreenContainer';
import { Trip } from '~/hooks/useTrips';
import ItineraryCard from '~/components/cards/ItineraryCard';
import { Spacer } from '~/utils/Spacer';

// type TripParams = {
//   trip: string; // if you're passing trip as a string
//   // OR
//   // trip: {
//   //   id: string;
//   //   // ... other trip properties
//   // };
// };
const itinerary = [
  {
    date: '2024-01-01',
    title: 'Check in at Hotel Paris',
    description:
      'This is a description of the trip. Let us make this obsenely long and see what happens',
    image: 'https://picsum.photos/200/300',
    location: 'Champ de Mars, 5 Avenue Anatole, 75007 Paris',
    time: '10:00 AM',
  },
];

const ExpandedTripScreen = () =>
  // { trip }: { trip: Trip }
  {
    const { trip } = useLocalSearchParams();

    // If trip is a string, you might need to parse it
    const tripData = typeof trip === 'string' ? JSON.parse(trip) : trip;

    const HeaderComponent = () => {
      return (
        <View>
          <Text>{tripData?.name ?? 'Trip Name'}</Text>
        </View>
      );
    };

    console.log('trip', tripData);
    return (
      <ScreenContainer
        withBoxes={false}
        header={<HeaderComponent />}
        style={styles.container}>
        <Spacer size={10} vertical />
        <ItineraryCard itinerary={itinerary[0]} />
      </ScreenContainer>
    );
  };

export default ExpandedTripScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
