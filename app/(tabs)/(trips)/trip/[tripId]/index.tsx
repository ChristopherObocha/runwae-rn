import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import ItineraryCard from '@/components/cards/ItineraryCard';
import PlacesView from '@/components/trip/PlacesView';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useDelTripCallback } from '@/stores/TripListStore';
import {
  useTripItineraryIds,
  useTripValue,
  useAddTripItineraryCallback,
  useTripItineraryCell,
  useTripItineraryCreatedByNickname,
} from '@/stores/TripStore';

const SEGMENTS = ['Itinerary', 'Places', 'Bookings'] as const;
type SegmentType = (typeof SEGMENTS)[number];

export default function ListScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { tripId } = useLocalSearchParams() as { tripId: string };
  const [name] = useTripValue(tripId, 'name');
  const [description] = useTripValue(tripId, 'description');
  const [startDate] = useTripValue(tripId, 'startDate');
  const [endDate] = useTripValue(tripId, 'endDate');
  const [location] = useTripValue(tripId, 'destination');

  const deleteCallback = useDelTripCallback(tripId);
  const addItinerary = useAddTripItineraryCallback(tripId);

  // const newProductHref = {
  //   pathname: "/trip/[tripId]/itinerary/new",
  //   params: { tripId },
  // } as const;

  const [activeSegment, setActiveSegment] = useState<SegmentType>('Itinerary');
  const { width } = useWindowDimensions();
  const segmentWidth = (width - 32) / SEGMENTS.length; // 32 for padding
  const translateX = useSharedValue(0);

  const handleSegmentPress = (segment: SegmentType, index: number) => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setActiveSegment(segment);
    translateX.value = withSpring(index * segmentWidth);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const dynamicStyles = {
    backgroundColor: Colors[colorScheme].grey,
    color: Colors[colorScheme].text,
    activeSegmentStyles: {
      color: Colors[colorScheme].background,
      fontWeight: '600' as const,
    },
  };

  const SegmentedControl = () => (
    <View style={styles.segmentedControlContainer}>
      <Animated.View
        style={[
          styles.selectedSegment,
          animatedStyles,
          { width: segmentWidth },
          { backgroundColor: Colors[colorScheme].grey },
        ]}
      />
      {SEGMENTS.map((segment, index) => (
        <Pressable
          key={segment}
          onPress={() => handleSegmentPress(segment, index)}
          style={[styles.segment, { width: segmentWidth }]}>
          <ThemedText
            style={[
              styles.segmentText,
              { color: dynamicStyles.color },
              activeSegment === segment && dynamicStyles.activeSegmentStyles,
            ]}>
            {segment}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );

  const RenderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        {description && <ThemedText>{description}</ThemedText>}
        {startDate && endDate && (
          <ThemedText style={styles.dateText}>
            {new Date(startDate).toLocaleDateString()} -{' '}
            {new Date(endDate).toLocaleDateString()}
          </ThemedText>
        )}
      </View>
    );
  };

  const ItineraryRoute = () => {
    const itineraryIds = useTripItineraryIds(tripId);

    // Extract the item rendering logic into a separate component
    const ItineraryItem = ({ id }: { id: string }) => {
      const [name] = useTripItineraryCell(tripId, id, 'name');
      const [description] = useTripItineraryCell(tripId, id, 'description');
      const [location] = useTripItineraryCell(tripId, id, 'destination');
      const [startDate] = useTripItineraryCell(tripId, id, 'startDate');
      const createdByNickname = useTripItineraryCreatedByNickname(tripId, id);

      const itineraryObject = {
        id,
        tripId,
        title: name,
        location,
        startDate,
        description,
        createdByNickname,
      };

      return <ItineraryCard itinerary={itineraryObject} />;
    };

    return (
      <View style={styles.itineraryContentContainer}>
        {itineraryIds.map((id) => (
          <ItineraryItem key={id} id={id} />
        ))}

        <Button
          onPress={() => {
            if (process.env.EXPO_OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
            router.push({
              pathname: '/trip/[tripId]/itinerary/new',
              params: { tripId },
            });
          }}
          variant="ghost"
          style={styles.addButton}>
          Add Itinerary Item
        </Button>
      </View>
    );
  };

  const RenderContent = () => {
    switch (activeSegment) {
      case 'Itinerary':
        return <ItineraryRoute />;
      case 'Places':
        return (
          <PlacesView style={styles.contentContainer} location={location} />
        );
      case 'Bookings':
        return (
          <View style={styles.contentContainer}>
            <ThemedText>Bookings Content</ThemedText>
          </View>
        );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: name,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  if (process.env.EXPO_OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }
                  router.push({
                    pathname: '/trip/[tripId]/share',
                    params: { tripId },
                  });
                }}
                style={{ padding: 8 }}>
                <IconSymbol name="square.and.arrow.up" color="#007AFF" />
              </Pressable>
              <Pressable
                onPress={() => {
                  if (process.env.EXPO_OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }
                  router.push({
                    pathname: '/trip/[tripId]/edit',
                    params: { tripId },
                  });
                }}
                style={{ padding: 8 }}>
                <IconSymbol name="pencil.and.list.clipboard" color="#007AFF" />
              </Pressable>
              <Pressable
                onPress={() => {
                  if (process.env.EXPO_OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }
                  // router.push(newProductHref);
                }}
                style={{ paddingLeft: 8 }}>
                <IconSymbol name="plus" color="#007AFF" />
              </Pressable>
              <Pressable
                onPress={() => {
                  if (process.env.EXPO_OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }
                  deleteCallback();
                  router.replace('/(tabs)/(home)');
                }}
                style={{ paddingLeft: 8 }}>
                <IconSymbol name="trash" color="#007AFF" />
              </Pressable>
            </View>
          ),
        }}
      />
      <BodyScrollView style={styles.container}>
        <RenderHeader />
        <SegmentedControl />
        <RenderContent />
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
  dateText: {
    // fontSize: 14,
    // color: 'gray',
  },
  container: {
    flex: 1,
  },
  segmentedControlContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 2,
    position: 'relative',
    height: 36,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  selectedSegment: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    color: '#666',
  },
  activeSegmentText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  itineraryContentContainer: {
    // paddingHorizontal: 16,
    width: '100%',
    padding: 16,
    gap: 8,
  },
  itineraryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  createdBy: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  addButton: {
    marginTop: 16,
  },
});
