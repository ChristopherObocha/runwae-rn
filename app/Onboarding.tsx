import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Slide from '~/components/onboarding/slide';
import Slider from '~/components/onboarding/slider';
// import { onBoardingSlides } from '~/configs/constants';
import { onBoardingSlides } from '~/configs/constants';

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const prev = onBoardingSlides[index - 1];
  const next = onBoardingSlides[index + 1];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Button title="Go to Home" onPress={() => router.back()} />
      <Slider
        key={index}
        index={index}
        setIndex={setIndex}
        prev={
          prev && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={prev}
              totalSlides={onBoardingSlides.length}
            />
          )
        }
        next={
          next && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={next}
              totalSlides={onBoardingSlides.length}
            />
          )
        }>
        <Slide
          slide={onBoardingSlides[index]}
          index={index}
          setIndex={setIndex}
          totalSlides={onBoardingSlides.length}
        />
      </Slider>
    </GestureHandlerRootView>
  );
}
