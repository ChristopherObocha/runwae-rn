import { useUser } from '@clerk/clerk-expo';
import { Octicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import ScreenContainer from '@/components/ScreenContainer';
import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import EventCard from '@/components/cards/EventCard';
import ItemCard from '@/components/cards/ItemCard';
import TripCard from '@/components/cards/TripCard';
import { Colors } from '@/constants/Colors';
import { useTripIds } from '@/stores/TripListStore';
import { TripItem } from '@/types';
import { tempConstants } from '@/utils/temp-constants';
// import { Collapsible } from '~/components/Collapsible';
import { MyCollapsible } from '~/components/MyCollapsible';

const TOP_PICKS: TripItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    title: 'Mountain Explorers',
    location: 'Colorado, USA',
    members: 24,
    isFavorite: true,
    date: 'Aug 3 - Aug 9',
    description:
      'Join us for an adventure through the Rocky Mountains with experienced hikers...more',
  },
  {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    title: 'Urban Photography',
    location: 'New York City, USA',
    members: 32,
    isFavorite: false,
    date: 'Sep 5 - Sep 8',
    description:
      'Street photography workshop in the heart of Manhattan with pro photographers...more',
  },
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    title: 'Foodie Adventures',
    location: 'New Orleans, USA',
    members: 18,
    isFavorite: true,
    date: 'Oct 12 - Oct 16',
    description:
      'Discover the best of Creole cuisine and local food culture...more',
  },
  {
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    title: 'Beach Yoga Retreat',
    location: 'Miami, USA',
    members: 15,
    isFavorite: false,
    date: 'Aug 20 - Aug 25',
    description:
      'Morning yoga sessions by the beach with meditation and wellness activities...more',
  },
  {
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb',
    title: 'Wine Country Tour',
    location: 'Napa Valley, USA',
    members: 21,
    isFavorite: true,
    date: 'Sep 25 - Sep 29',
    description:
      'Visit premium wineries and learn about wine making processes...more',
  },
  {
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    title: 'Desert Adventure',
    location: 'Arizona, USA',
    members: 9,
    isFavorite: false,
    date: 'Nov 8 - Nov 13',
    description:
      'Explore the Grand Canyon and surrounding desert landscapes...more',
  },
];

const Home = () => {
  const { user } = useUser();
  const { CATEGORY_ITEMS, EVENTS_AND_EXPERIENCES } = tempConstants;
  const tripIds = useTripIds();
  const colorScheme = useColorScheme();
  const appColors = Colors[colorScheme];

  const [activeCategory, setActiveCategory] = useState<string>(
    CATEGORY_ITEMS[0]?.type
  );

  const hookedStyles = StyleSheet.create({
    categoryItem: {
      backgroundColor: appColors.text,
      borderRadius: 8,
      paddingHorizontal: 13,
      paddingVertical: 4,
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      minWidth: 45,
    },
    categoryItemText: {
      color: appColors.background,
      fontSize: 12,
      lineHeight: 17,
      fontFamily: 'Inter',
      opacity: 1,
      zIndex: 100,
    },
    categoryItemActive: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: appColors.text,
    },
    categoryItemActiveText: {
      color: appColors.text,
    },
    topNavBarRightIcon: {
      height: 50,
      aspectRatio: 1,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hotDealCard: {
      height: 200,
    },
    nameHeader: {
      fontFamily: 'Rowan-Medium',
      fontSize: 22,
      color: appColors.text,
    },
  });

  const TabsComponent = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveCategory(item?.type)}
        key={item?.type}
        style={[
          hookedStyles.categoryItem,
          activeCategory === item?.type && hookedStyles.categoryItemActive,
        ]}>
        <ThemedText
          style={[
            hookedStyles.categoryItemText,
            activeCategory === item?.type &&
              hookedStyles.categoryItemActiveText,
          ]}>
          {item?.type}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const RenderTrips = () => {
    if (!tripIds || !Array.isArray(tripIds)) return null;
    return (
      <View style={styles.tripsContainer}>
        <FlashList
          data={tripIds.slice(0, 4)}
          renderItem={({ item: tripId }) => <TripCard tripId={tripId} />}
          contentContainerStyle={{ paddingTop: 4 }}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          estimatedItemSize={79}
          ItemSeparatorComponent={() => <Spacer vertical size={8} />}
        />
      </View>
    );
  };

  return (
    <ScreenContainer
      header={
        <View style={styles.topNavBar}>
          <View style={styles.topNavBarLeft}>
            <Image
              source={{
                uri: user?.imageUrl,
              }}
              style={styles.avatar}
            />
            <ThemedText style={hookedStyles.nameHeader}>
              Hi, {user?.firstName}
            </ThemedText>
          </View>
          <View style={styles.topNavBarRight}>
            <View style={hookedStyles.topNavBarRightIcon}>
              <Octicons name="bell-fill" size={22} color="black" />
            </View>
          </View>
        </View>
      }>
      <View style={styles.container}>
        <Spacer vertical size={30} />

        <Animated.Text entering={FadeIn} exiting={FadeOut}>
          <ThemedText style={styles.hugeHeader}>
            {`Experience \nSeamless bookings, \nsmart itineraries, \nand unforgettable adventures`}
          </ThemedText>
        </Animated.Text>

        <Spacer vertical size={15} />
      </View>
      <ScrollView
        style={styles.sectionStyles}
        contentContainerStyle={styles.categoryContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {CATEGORY_ITEMS.map((item) => (
          <TabsComponent key={item?.type} item={item} />
        ))}
      </ScrollView>

      <Spacer vertical size={30} />

      <View style={styles.sectionStyles}>
        <ThemedText type="subtitle" style={styles.header1}>
          ⭐️ Recommended for you
        </ThemedText>
        <ScrollView
          contentContainerStyle={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {TOP_PICKS.map((item) => (
            <ItemCard key={item.title} hotel={item} />
          ))}
        </ScrollView>

        <ThemedText type="subtitle" style={styles.header1}>
          🌍 Trending trips in your circle
        </ThemedText>
        <ScrollView
          contentContainerStyle={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {TOP_PICKS.map((item) => (
            <ItemCard key={item.title} hotel={item} />
          ))}
        </ScrollView>

        {Array.isArray(tripIds) && tripIds.length > 0 && (
          <>
            <ThemedText type="subtitle" style={styles.header1}>
              💬 My groups and active trips
            </ThemedText>
            <Spacer vertical size={10} />
            <RenderTrips />
          </>
        )}

        <Spacer vertical size={30} />

        <MyCollapsible title="🎟️ Event & experience picks">
          {/* <ThemedText type="subtitle" style={styles.header1}>
          🎟️ Event & experience picks
        </ThemedText> */}

          <ScrollView
            contentContainerStyle={styles.categoryContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {EVENTS_AND_EXPERIENCES.map((item) => (
              <EventCard key={item.name} event={item} />
            ))}
          </ScrollView>
        </MyCollapsible>
      </View>

      <View style={styles.sectionContainer} />
    </ScreenContainer>
  );
};

export default Home;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  avatar: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
  topNavBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  topNavBarLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topNavBarRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  categoryContainer: {
    gap: 10,
    paddingVertical: 10,
  },
  sectionContainer: {
    height: 50,
  },
  header1: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  hugeHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'SFProText-Bold',
    marginHorizontal: 15,
    lineHeight: 40,
    color: Colors.light.grey2, // TODO: change to appColors.grey2
  },
  sectionStyles: {
    paddingLeft: 15,
  },
  tripsContainer: {
    gap: 10,
    paddingRight: 15,
  },
});
