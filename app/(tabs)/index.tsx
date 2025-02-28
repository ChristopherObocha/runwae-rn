import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HotDealCard from '~/components/HotDealCard';

import ItemCard from '~/components/ItemCard';
import ScreenContainer from '~/components/ScreenContainer';
import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';
import { TripItem } from '~/types';
import { Spacer } from '~/utils/Spacer';
import { appColors, textStyles } from '~/utils/styles';

const CATEGORY_ITEMS = [
  {
    type: 'Hotels',
    icon: 'hotel',
  },
  {
    type: 'Restaurants',
    icon: 'restaurant',
  },
  {
    type: 'Attractions',
    icon: 'attraction',
  },
  {
    type: 'Events',
    icon: 'event',
  },
  {
    type: 'Shopping',
    icon: 'shopping',
  },
  {
    type: 'Transportation',
    icon: 'transportation',
  },
  {
    type: 'Rentals',
    icon: 'rental',
  },
  {
    type: 'Entertainment',
    icon: 'entertainment',
  },
  {
    type: 'Other',
    icon: 'other',
  },
];

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
    description: 'Discover the best of Creole cuisine and local food culture...more',
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
    description: 'Visit premium wineries and learn about wine making processes...more',
  },
  {
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    title: 'Desert Adventure',
    location: 'Arizona, USA',
    members: 9,
    isFavorite: false,
    date: 'Nov 8 - Nov 13',
    description: 'Explore the Grand Canyon and surrounding desert landscapes...more',
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
  const colorScheme = useColorScheme();
  const { colors } = colorScheme;
  const color = {
    darkBlack: COLORS.dark,
    grey2: colors.grey2,
    grey: '#ECEBEB',
    black: '#33363F',
    textBlack: '#252525',
    purple: '#3E63DD',
    lightPurple: 'rgba(62, 99, 221, 0.28)',
  };

  const hookedStyles = StyleSheet.create({
    categoryItem: {
      backgroundColor: color.lightPurple,
      borderRadius: 15,
      paddingHorizontal: 13,
      paddingVertical: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryItemText: {
      color: color.textBlack,
      fontSize: 12,
      lineHeight: 17,
      fontFamily: 'Inter',
      opacity: 1,
      zIndex: 100,
    },
    topNavBarRightIcon: {
      height: 30,
      aspectRatio: 1,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.grey,
    },
    hotDealCard: {
      // width: '100%',
      height: 200,
    },
  });

  return (
    <ScreenContainer>
      <View style={styles.topNavBar}>
        <View style={styles.topNavBarLeft}>
          <Text style={styles.text1}>Current Location</Text>
          <Text style={styles.header2}>New York</Text>
        </View>
        <View style={styles.topNavBarRight}>
          <View style={hookedStyles.topNavBarRightIcon}>
            <FontAwesome6 name="magnifying-glass" size={13} color="black" />
          </View>
        </View>
      </View>
      <Spacer vertical size={30} />

      <ScrollView
        style={{ paddingLeft: 30 }}
        contentContainerStyle={styles.categoryContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {CATEGORY_ITEMS.map((item) => (
          <View key={item.type} style={hookedStyles.categoryItem}>
            <Text style={hookedStyles.categoryItemText}>{item.type}</Text>
          </View>
        ))}
      </ScrollView>

      <View>
        <Text style={styles.header1}>Top Picks</Text>
        <ScrollView
          style={{ paddingLeft: 30 }}
          contentContainerStyle={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {TOP_PICKS.map((item) => (
            <ItemCard key={item.title} hotel={item} />
          ))}
        </ScrollView>
      </View>

      <View>
        <Text style={styles.header1}>Top Picks</Text>
        <ScrollView
          style={{ paddingLeft: 30 }}
          contentContainerStyle={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {HOT_DEALS.map((item) => (
            <HotDealCard key={item.title} hotel={item} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer} />
    </ScreenContainer>
  );
};

export default Home;

export const styles = StyleSheet.create({
  topNavBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  topNavBarLeft: {
    flex: 1,
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
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 10,
    color: appColors.grey2,
  },
  header2: {
    ...textStyles.medium_17,
  },
  text1: {
    ...textStyles.regular_10,
  },
});
