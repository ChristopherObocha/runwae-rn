import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';

import { useAddTripCallback } from '@/stores/TripListStore';
import { Colors } from '@/constants/Colors';

export default function CreateListScreen() {
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

  const router = useRouter();
  const useAddTrip = useAddTripCallback();

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + 7);
    const endDate = date.toISOString();

    const tripId = useAddTrip(
      listName,
      listDescription,
      new Date().toISOString(),
      endDate
    );

    router.replace({
      pathname: '/trip/[tripId]',
      params: { tripId },
    });
  };

  const handleCreateTestLists = () => {
    const testTripNames = [
      'Morocco 2025',
      'Paris 2025',
      'Barcelona 2025',
      'Rome 2025',
      'Madrid 2025',
      'Berlin 2025',
      'Amsterdam 2025',
      'Paris 2025',
    ];

    // Generate random dates for each trip
    testTripNames.forEach(name => {
      // Create base date
      const currentDate = new Date();

      // Add random offset for start date (-2 to +2 days from now)
      const startDateOffset = Math.floor(Math.random() * 5) - 2;
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() + startDateOffset);

      // Create end date 5-9 days after start date
      const daysToAdd = Math.floor(Math.random() * 5) + 5;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + daysToAdd);

      // Call the addTrip function (not a hook)
      useAddTrip(
        name,
        `This is a test list for ${name}`,
        startDate.toISOString(),
        endDate.toISOString()
      );
    });

    // Navigate back to the main list view
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: 'New list',
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Trip name"
            value={listName}
            onChangeText={setListName}
            onSubmitEditing={handleCreateList}
            returnKeyType="done"
            variant="ghost"
            size="lg"
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />
        </View>
        <TextInput
          placeholder="Description (optional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          inputStyle={styles.descriptionInput}
        />
        <Button
          onPress={handleCreateList}
          disabled={!listName}
          variant="ghost"
          textStyle={styles.createButtonText}>
          Create list
        </Button>
        <Button
          onPress={handleCreateTestLists}
          variant="ghost"
          textStyle={styles.createButtonText}>
          Create 10 test lists
        </Button>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleInput: {
    fontWeight: '600',
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 'auto',
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: Colors.light.primary, //change later
    fontWeight: 'normal',
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
