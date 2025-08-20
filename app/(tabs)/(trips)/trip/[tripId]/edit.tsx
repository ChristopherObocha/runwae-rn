import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { useListCreation } from '@/context/ListCreationContext';
import { useTripValue } from '@/stores/TripStore';

export default function ListScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams() as { tripId: string };

  // List values
  const [name, setName] = useTripValue(tripId, 'name');
  const [description, setDescription] = useTripValue(tripId, 'description');
  const [destination, setDestination] = useTripValue(tripId, 'destination');
  const [startDate, setStartDate] = useTripValue(tripId, 'startDate');
  const [endDate, setEndDate] = useTripValue(tripId, 'endDate');
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button variant="ghost" onPress={router.back}>
              Cancel
            </Button>
          ),
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            placeholder="Potatoes"
            value={name}
            onChangeText={setName}
            returnKeyType="done"
            containerStyle={styles.titleInputContainer}
          />
        </View>

        <Spacer vertical size={16} />
        <View style={styles.inputContainer}>
          <TextInput
            label="Description"
            placeholder="Potatoes are good"
            textAlignVertical="top"
            value={description}
            // multiline
            // numberOfLines={4}
            onChangeText={setDescription}
            returnKeyType="done"
            returnKeyLabel="Done"
            containerStyle={styles.descriptionInputContainer}
          />
        </View>

        <Spacer vertical size={16} />
        <View style={styles.inputContainer}>
          <TextInput
            label="Destination"
            placeholder="Potatoes are good"
            textAlignVertical="top"
            value={destination || ''}
            multiline
            numberOfLines={4}
            onChangeText={setDestination}
            returnKeyType="done"
            returnKeyLabel="Done"
            containerStyle={styles.descriptionInputContainer}
          />
        </View>

        <Spacer vertical size={24} />
        <View style={styles.dateInputContainer}>
          <View style={styles.datePickerContainer}>
            <ThemedText type="defaultSemiBold">Start Date</ThemedText>
            <RNDateTimePicker
              value={startDate ? new Date(startDate) : new Date()}
              mode="date"
              display="compact"
              onChange={(event, date) => {
                if (date) {
                  setStartDate(date.toISOString());
                  setShowDatePicker(false);
                }
              }}
            />
          </View>
          <View style={styles.datePickerContainer}>
            <ThemedText type="defaultSemiBold">End Date</ThemedText>
            <RNDateTimePicker
              value={endDate ? new Date(endDate) : new Date()}
              mode="date"
              display="compact"
              onChange={(event, date) => {
                if (date) {
                  setEndDate(date.toISOString());
                  setShowDatePicker(false);
                }
              }}
              minimumDate={startDate ? new Date(startDate) : new Date()}
            />
          </View>
        </View>

        <Spacer vertical size={100} />
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
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
    marginTop: 16,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorButton: {
    marginTop: 16,
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
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  descriptionInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  datePickerContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
