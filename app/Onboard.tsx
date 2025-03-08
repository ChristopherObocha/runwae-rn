import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WIDTH } from '~/configs/constants';
import { Spacer } from '~/utils/Spacer';

const SLIDESVG = require('~/assets/svgs/dummy2.svg');

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
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const currentIndex = Math.round(contentOffset.x / WIDTH);
    setCurrentIndex(currentIndex);
  };

  const goToNextSlide = () => {
    if (currentIndex < OnboardingItems.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * WIDTH,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {OnboardingItems.map((item, index) => (
          <View key={index} style={styles.slide}>
            <LinearGradient
              colors={['#FFFFFF', '#EA5809']}
              locations={[0, 0.4]}
              style={styles.gradient}>
              <Image
                source={SLIDESVG}
                style={[styles.image, { marginTop: insets.top + 20 }]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              {/* <Spacer size={20} vertical /> */}
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.pagination}>
          {OnboardingItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <Spacer size={20} vertical />

        <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
          <Text style={styles.buttonText}>
            {currentIndex === OnboardingItems.length - 1
              ? 'Get Started'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: WIDTH,
    flex: 1,
    justifyContent: 'space-between',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 120,
  },
  image: {
    width: WIDTH * 0.8,
    aspectRatio: 1,
    zIndex: 1,
    marginTop: 40,
  },
  textContainer: {
    paddingHorizontal: 20,
    width: '100%',
    paddingBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
    marginBottom: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFF',
    width: 40,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#EA5809',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
