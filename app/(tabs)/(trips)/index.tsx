import { useUser } from '@clerk/clerk-expo';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { useRouter, Stack } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  Pressable,
  Platform,
  View,
} from 'react-native';

import { Spacer } from '@/components/Spacer';
import TripCard from '@/components/cards/TripCard';
import HomeSkeleton from '@/components/skeletons/HomeSkeleton';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTripIds } from '@/stores/TripListStore';

const TripsScreen = () => {
  const router = useRouter();
  const { isLoaded } = useUser();
  const colorScheme = useColorScheme() || 'light';
  const tripIds = useTripIds();

  if (!isLoaded) {
    return <HomeSkeleton />;
  }

  const handleNewListPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    return router.push('/(tabs)/(trips)/trip/new');
  };

  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
      <Button onPress={handleNewListPress} variant="filled">
        Create your first list
      </Button>
    </BodyScrollView>
  );

  const renderHeaderRight = () => (
    <Pressable
      // work around for https://github.com/software-mansion/react-native-screens/issues/2219
      // onPress={handleNewListPress}
      onPress={() => router.push('/(tabs)/(trips)/trip/new')}
      style={styles.headerButton}>
      <IconSymbol name="plus" color={Colors[colorScheme].primary} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Trips',
          headerRight: renderHeaderRight,
        }}
      />
      <View style={styles.container}>
        <FlashList
          data={tripIds}
          renderItem={({ item: tripId }) => <TripCard tripId={tripId} />}
          contentContainerStyle={styles.listContainer}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyList}
          ListFooterComponent={() => <Spacer vertical size={100} />}
          estimatedItemSize={79}
          ItemSeparatorComponent={() => <Spacer vertical size={8} />}
        />
      </View>
    </>
  );
};

export default TripsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 100,
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

  emptyStateContainer: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 100,
  },
});
