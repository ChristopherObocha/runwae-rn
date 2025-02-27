import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import ScreenContainer from '~/components/ScreenContainer';
import { createTripSlides } from '~/configs/constants';
import { Spacer } from '~/utils/Spacer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StartTrip = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContentContainer}>
        {createTripSlides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Spacer size={20} vertical />
            <View style={styles.slideContainer}>
              {/* Progress indicator */}
              <View style={styles.progressContainer}>
                {createTripSlides.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.progressDot, i === activeIndex && styles.progressDotActive]}
                  />
                ))}
              </View>

              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StartTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContentContainer: {
    // flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  progressDotActive: {
    backgroundColor: '#6366F1',
    width: 16,
  },
});
