import React, { useState, useCallback } from 'react';
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import debounce from 'lodash/debounce';
import { ThemedText } from '@/components/ThemedText';
import { useTripItineraryCell } from '@/stores/TripStore';
import { formatTime } from '@/utils/formatters';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

interface PlaceResult {
  display_name: string;
  place_id: number;
  lat: string;
  lon: string;
}

export default function ItineraryDetailScreen() {
  const router = useRouter();
  const { tripId, itineraryId } = useLocalSearchParams() as {
    tripId: string;
    itineraryId: string;
  };

  const [name, setName] = useTripItineraryCell(tripId, itineraryId, 'name');
  const [description, setDescription] = useTripItineraryCell(
    tripId,
    itineraryId,
    'description'
  );
  const [location, setLocation] = useTripItineraryCell(
    tripId,
    itineraryId,
    'destination'
  );
  const [startDate, setStartDate] = useTripItineraryCell(
    tripId,
    itineraryId,
    'startDate'
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
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
              'Accept-Language': 'en',
              'User-Agent': 'YourAppName',
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
    const parts = place.display_name.split(', ');
    const cityAndCountry = `${parts[0]}, ${parts[parts.length - 1]}`;
    setLocation(cityAndCountry);
    setShowDropdown(false);
    setPlaceSuggestions([]);
  };

  // const openInMaps = async (location: string, type: 'apple' | 'google') => {
  //   Alert.alert(
  //     'Open Maps',
  //     `Open ${type === 'apple' ? 'Maps' : 'Google Maps'}?`,
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Open',
  //         onPress: async () => {
  //           const encodedLocation = encodeURIComponent(location);
  //           const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  //           try {
  //             await Linking.openURL(url);
  //             // return router.replace(`/(tabs)/(home)`);
  //             return <Redirect href="/(tabs)/(home)" />;
  //           } catch (error) {
  //             console.error('Error opening maps:', error);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'formSheet',
          headerTitle: name || 'Itinerary Details',
        }}
      />
      <BodyScrollView style={styles.container}>
        <View style={styles.section}>
          <ThemedText style={styles.label}>Name</ThemedText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Add a name"
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Location</ThemedText>
          <View style={styles.locationContainer}>
            <TextInput
              value={location}
              onChangeText={handleLocationChange}
              placeholder="Add a location"
              style={styles.input}
            />
            {showDropdown && placeSuggestions.length > 0 && (
              <ScrollView
                style={styles.dropdown}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}>
                {placeSuggestions.map(place => (
                  <TouchableOpacity
                    key={place.place_id}
                    onPress={() => handlePlaceSelect(place)}
                    style={styles.dropdownItem}>
                    <ThemedText>{place.display_name}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {location && (
              <View style={styles.mapButtons}>
                <Button
                  // onPress={() => openInMaps(location, 'apple')}
                  onPress={() => {}}
                  variant="outline"
                  style={styles.mapButton}
                  leftIcon="map-outline">
                  <ThemedText style={styles.mapButtonText}>
                    Open in Maps
                  </ThemedText>
                </Button>
                <Button
                  // onPress={() => openInMaps(location, 'google')}
                  onPress={() => {}}
                  variant="outline"
                  style={styles.mapButton}
                  leftIcon="logo-google">
                  <ThemedText style={styles.mapButtonText}>
                    Open in Google Maps
                  </ThemedText>
                </Button>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Time</ThemedText>
          <Button
            onPress={() => setShowDatePicker(true)}
            variant="ghost"
            style={{
              padding: 0,
              alignSelf: 'flex-start',
              marginTop: -8,
            }}>
            <ThemedText>
              {startDate ? formatTime(startDate) : 'Set a time'}
            </ThemedText>
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={startDate ? new Date(startDate) : new Date()}
              mode="datetime"
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setStartDate(selectedDate.toISOString());
                }
              }}
            />
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Add a description"
            style={styles.input}
            multiline
          />
        </View>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  section: {
    gap: 8,
    paddingBottom: 16,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
  },
  input: {
    marginVertical: 4,
  },
  locationContainer: {
    position: 'relative',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 2,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mapButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // gap: ,
    justifyContent: 'center',
    // width: '100%',
    // backgroundColor: 'red',
  },
  mapButtonText: {
    fontSize: 12,
  },
});
