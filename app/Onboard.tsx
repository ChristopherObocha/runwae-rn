import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

import { HEIGHT, WIDTH } from '~/configs/constants';

const SLIDESVG = require('~/assets/svgs/dummy2.svg');
// const SLIDEIMAGE = require('~/assets/images/slides/slide1.png');
const OnboardingItems = [
  {
    title: 'Plan a trip.',
    description:
      'Quickly plan your trip with easy bookings and smart recommendations.',
  },
  {
    title: 'Discover Places.',
    description: 'Explore top destinations curated just for you.',
  },
  {
    title: 'Hassle-Free Booking.',
    description: 'Secure your flights, stays, and activities in one place.',
  },
];

const Onboard = () => {
  const insets = useSafeAreaInsets();
  const backgroundStyles = {
    paddingTop: insets.top + 10,
    paddingBottom: insets.bottom,
  };

  return (
    <>
      <View style={[styles.container]}>
        <LinearGradient
          colors={['#FFFFFF', '#EA5809']}
          locations={[0, 0.4]}
          style={styles.gradient}>
          <Image
            source={SLIDESVG}
            style={[styles.image, { marginTop: insets.top + 20 }]}
          />
        </LinearGradient>
      </View>
    </>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gradient: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: WIDTH * 0.8,
    aspectRatio: 1,
    zIndex: 9999,
  },
});
