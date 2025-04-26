import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ItineraryForm } from '@/components/forms/ItineraryForm';
import { useAddTripItineraryCallback } from '@/stores/TripStore';

export default function NewItineraryScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams() as { tripId: string };
  const addItinerary = useAddTripItineraryCallback(tripId);

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'formSheet',
          headerShown: false,
          headerLargeTitle: false,
        }}
      />
      <ItineraryForm
        onClose={() => router.back()}
        onSubmit={async data => {
          addItinerary(data.name, data.description);
          router.back();
        }}
      />
    </>
  );
}
