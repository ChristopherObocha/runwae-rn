import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Button from '@/components/ui/Button';

export default function TripActions() {
  const params = useLocalSearchParams();
  const tripId = params.tripId as string;
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleEdit = () => {
    router.push({
      pathname: '/trip/[tripId]/edit',
      params: { tripId },
    });
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    router.back();
  };

  return (
    <View
      className="flex-1 p-4"
      style={{ backgroundColor: Colors[colorScheme].background }}>
      <ThemedText type="title" className="mb-4">
        Trips Actionss
      </ThemedText>

      <Button onPress={handleEdit} variant="filled" style={{ marginBottom: 8 }}>
        Edit Trip
      </Button>

      <Button
        onPress={handleDelete}
        variant="outline"
        outlineColor={Colors[colorScheme].destructive}>
        Delete Trip
      </Button>
    </View>
  );
}
