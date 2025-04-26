import { useUser } from '@clerk/clerk-expo';
import { useRouter, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
  Platform,
  FlatList,
} from 'react-native';

import ScreenContainer from '@/components/ScreenContainer';
import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import TripCard from '@/components/cards/TripCard';
import HomeSkeleton from '@/components/skeletons/HomeSkeleton';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTripIds } from '@/stores/TripListStore';

const TripsScreen = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const colorScheme = useColorScheme() || 'light';
  const [tripName, setTripName] = useState('');
  const tripIds = useTripIds();

  if (!isLoaded) {
    return <HomeSkeleton />;
  }

  const handleNewListPress = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // router.push("/list/new");
  };

  const handleProfilePress = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // router.push("/profile");
  };

  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
      <Button onPress={handleNewListPress} variant="ghost">
        Create your first list
      </Button>
    </BodyScrollView>
  );

  // const handleCreateTrip = () => {
  //   if (tripName.length === 0) return;

  //   const tripId =
  // };

  const renderHeaderRight = () => (
    <Pressable
      // work around for https://github.com/software-mansion/react-native-screens/issues/2219
      // onPress={handleNewListPress}
      onPress={() => router.push('/(tabs)/(trips)/trip/new')}
      style={styles.headerButton}>
      <IconSymbol name="plus" color={Colors[colorScheme].primary} />
      {/* <Image
        source={require('@/assets/images/avatar.jpg')}
        style={styles.headerButtonIcon}
      /> */}
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      // work around for https://github.com/software-mansion/react-native-screens/issues/2219
      onPress={() => router.push('/(tabs)/(trips)/trip/new')}
      style={[styles.headerButton, styles.headerButtonLeft]}>
      <IconSymbol
        name="gear"
        color={Colors[colorScheme].primary}
        style={{ marginRight: Platform.select({ default: 0, android: 8 }) }}
      />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Trips',
          headerRight: renderHeaderRight,
          // headerLeft: renderHeaderLeft,
        }}
      />
      <FlatList
        data={tripIds}
        renderItem={({ item: tripId }) => <TripCard tripId={tripId} />}
        contentContainerStyle={styles.listContainer}
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={<Spacer vertical size={100} />}
      />
    </>
  );
};

export default TripsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    resizeMode: 'contain',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    paddingRight: 0,
    marginHorizontal: Platform.select({ web: 16, default: 0 }),
  },
  headerButtonLeft: {
    paddingLeft: 0,
  },
  headerButtonIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    resizeMode: 'cover',
  },

  listContainer: {
    paddingTop: 8,
    gap: 12,
  },
  emptyStateContainer: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 100,
  },
});
