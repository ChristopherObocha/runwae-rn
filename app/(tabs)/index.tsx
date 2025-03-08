import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import ItemCard from '~/components/ItemCard';
import ScreenContainer from '~/components/ScreenContainer';
import ConciseTripCard from '~/components/cards/ConciseTripCard';
import EventCard from '~/components/cards/EventCard';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/nativewindui/Avatar';
import { useTrips } from '~/hooks/useTrips';
import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';
import { TripItem } from '~/types';
import { Spacer } from '~/utils/Spacer';
import { dummyProfiles, constants } from '~/utils/constants';
import { appColors, textStyles } from '~/utils/styles';

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

const HOT_DEALS: TripItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    title: 'The Ritz Carlton',
    location: 'New York, USA',
    promo: 50,
  },
  {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    title: 'Four Seasons Resort',
    location: 'Maui, Hawaii',
    promo: 35,
  },
  {
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    title: 'Mandarin Oriental',
    location: 'Tokyo, Japan',
    promo: 45,
  },
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    title: 'Burj Al Arab',
    location: 'Dubai, UAE',
    promo: 30,
  },
  {
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    title: 'Peninsula Hotel',
    location: 'Paris, France',
    promo: 40,
  },
  {
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c',
    title: 'Atlantis Resort',
    location: 'Bahamas',
    promo: 55,
  },
];

const Home = () => {
  const { CATEGORY_ITEMS, EVENTS_AND_EXPERIENCES } = constants;
  const colorScheme = useColorScheme();
  const { colors } = colorScheme;
  const { trips } = useTrips();
  const color = {
    darkBlack: COLORS.dark,
    grey2: colors.grey2,
    grey: '#ECEBEB',
    black: '#33363F',
    textBlack: '#252525',
    purple: '#3E63DD',
    lightPurple: 'rgba(62, 99, 221, 0.28)',
  };
  const [activeCategory, setActiveCategory] = useState<string>(
    CATEGORY_ITEMS[0]?.type
  );

  const hookedStyles = StyleSheet.create({
    categoryItem: {
      backgroundColor: appColors.pureBlack,
      borderRadius: 8,
      paddingHorizontal: 13,
      paddingVertical: 4,
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      minWidth: 45,
    },
    categoryItemText: {
      color: appColors.white,
      fontSize: 12,
      lineHeight: 17,
      fontFamily: 'Inter',
      opacity: 1,
      zIndex: 100,
    },
    categoryItemActive: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: appColors.pureBlack,
    },
    categoryItemActiveText: {
      color: appColors.pureBlack,
    },
    topNavBarRightIcon: {
      height: 50,
      aspectRatio: 1,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: color.grey,
    },
    hotDealCard: {
      height: 200,
    },
    nameHeader: {
      fontFamily: 'Rowan-Medium',
      fontSize: 22,
      color: appColors.pitchBlack,
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
        <Text
          style={[
            hookedStyles.categoryItemText,
            activeCategory === item?.type &&
              hookedStyles.categoryItemActiveText,
          ]}>
          {item?.type}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderTrips = () => {
    return (
      <View style={styles.tripsContainer}>
        {trips.slice(0, 2).map((trip) => (
          <ConciseTripCard key={trip.id} trip={trip} />
        ))}
      </View>
    );
  };

  return (
    <ScreenContainer
      header={
        <View style={styles.topNavBar}>
          <View style={styles.topNavBarLeft}>
            <Avatar alt="NativeWindUI Avatar" style={styles.avatar}>
              <AvatarImage
                source={{
                  uri: dummyProfiles[0]?.image,
                }}
              />
              <AvatarImage
                source={{
                  uri: dummyProfiles[0]?.image,
                }}
              />
              <AvatarFallback>
                <Text className="text-foreground">NUI</Text>
              </AvatarFallback>
            </Avatar>
            <Text style={hookedStyles.nameHeader}>Hi, Shirley</Text>
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
          <Text style={styles.hugeHeader}>
            {`Experience \nSeamless bookings, \nsmart itineraries, \nand unforgettable adventures`}
          </Text>
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
        <Text style={styles.header1}>⭐️ Recommended for you</Text>
        <ScrollView
          contentContainerStyle={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {TOP_PICKS.map((item) => (
            <ItemCard key={item.title} hotel={item} />
          ))}
        </ScrollView>

        <Text style={styles.header1}>🌍 Trending trips in your circle</Text>
        <ScrollView
          contentContainerStyle={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {TOP_PICKS.map((item) => (
            <ItemCard key={item.title} hotel={item} />
          ))}
        </ScrollView>

        {trips.length > 0 && (
          <>
            <Text style={styles.header1}>💬 My groups and active trips</Text>
            <Spacer vertical size={10} />
            <RenderTrips />
          </>
        )}

        <Spacer vertical size={30} />

        <Text style={styles.header1}>🎟️ Event & experience picks</Text>
        <ScrollView
          contentContainerStyle={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {EVENTS_AND_EXPERIENCES.map((item) => (
            <EventCard key={item.name} event={item} />
          ))}
        </ScrollView>
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
    ...textStyles.medium_22,
    color: appColors.pitchBlack,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  header2: {
    ...textStyles.medium_17,
  },
  text1: {
    ...textStyles.regular_10,
  },
  hugeHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'SFProText-Bold',
    marginHorizontal: 15,
    lineHeight: 40,
    color: appColors.grey2,
  },
  sectionStyles: {
    paddingLeft: 15,
  },
  tripsContainer: {
    gap: 10,
    paddingRight: 15,
  },
});
