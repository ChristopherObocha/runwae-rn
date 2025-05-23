import DateTimePicker from '@react-native-community/datetimepicker';
import debounce from 'lodash/debounce';
import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { Colors } from '@/constants/Colors';
type ItineraryFormProps = {
  onSubmit: (data: {
    name: string;
    description: string;
    startDate: string;
    location: string;
  }) => void;
  onClose: () => void;
};

interface PlaceResult {
  display_name: string;
  place_id: number;
  lat: string;
  lon: string;
}

export function ItineraryForm({ onSubmit, onClose }: ItineraryFormProps) {
  const colorScheme = useColorScheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [placeSuggestions, setPlaceSuggestions] = useState<PlaceResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchPlaces = useCallback(
    debounce(async (searchText: string) => {
      if (searchText.length < 2) {
        setPlaceSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            `format=json&q=${encodeURIComponent(searchText)}` +
            `&limit=5&featuretype=city`,
          {
            headers: {
              'Accept-Language': 'en', // Get results in English
              'User-Agent': 'YourAppName', // Replace with your app name
            },
          }
        );
        const data = await response.json();
        setPlaceSuggestions(data);
      } catch (error) {
        console.error('Error fetching places:', error);
        setPlaceSuggestions([]);
      }
    }, 300),
    []
  );

  const handleLocationChange = (text: string) => {
    setLocation(text);
    setShowDropdown(true);
    searchPlaces(text);
  };

  const handlePlaceSelect = (place: PlaceResult) => {
    // Extract city and country from the display name
    const parts = place.display_name.split(', ');
    const cityAndCountry = `${parts[0]}, ${parts[parts.length - 1]}`;
    setLocation(cityAndCountry);
    setShowDropdown(false);
    setPlaceSuggestions([]);
  };

  const dynamicStyle = {
    dropdown: {
      position: 'absolute' as const,
      top: 90,
      left: 0,
      right: 0,
      maxHeight: 200,
      backgroundColor: Colors[colorScheme].tripCardBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors[colorScheme].text,
      zIndex: 2,
    },
    dropdownItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme].text,
    },
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>New Itinerary Item</ThemedText>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        label="Name"
      />

      <View style={styles.locationContainer}>
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={handleLocationChange}
          style={styles.input}
          label="Location"
        />
        {showDropdown && placeSuggestions.length > 0 && (
          <ScrollView
            style={dynamicStyle.dropdown}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled>
            {placeSuggestions.map((place) => (
              <TouchableOpacity
                key={place.place_id}
                onPress={() => handlePlaceSelect(place)}
                style={dynamicStyle.dropdownItem}>
                <ThemedText style={{ color: Colors[colorScheme].text }}>
                  {place.display_name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.dateContainer}>
        {/* incorrect style for label */}
        <ThemedText style={styles.label} type="defaultSemiBold">
          Date
        </ThemedText>
        <DateTimePicker
          value={date}
          mode="datetime"
          onChange={(_, selectedDate) => setDate(selectedDate || date)}
        />
      </View>

      <TextInput
        label="Description"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />

      <View style={styles.buttons}>
        <Button onPress={onClose} variant="ghost">
          Cancel
        </Button>
        <Button
          onPress={() => {
            onSubmit({
              name,
              description,
              startDate: date.toISOString(),
              location,
            });
          }}
          disabled={!name || !location}>
          Add Itinerary
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    marginVertical: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  locationContainer: {
    position: 'relative',
    zIndex: 1,
  },
  dateContainer: {
    marginVertical: 4,
  },
  label: {
    marginBottom: 4,
  },
});
