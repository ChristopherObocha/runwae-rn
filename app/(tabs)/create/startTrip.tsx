import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ScreenContainer from '~/components/ScreenContainer';
import Slide from '~/components/create-trip/slide';
import Slider from '~/components/create-trip/slider';
import { createTripSlides } from '~/configs/constants';

const StartTrip = () => {
  const [index, setIndex] = useState(0);
  const prev = createTripSlides[index - 1];
  const next = createTripSlides[index + 1];
  return (
    // <ScreenContainer withBoxes={false}>
    <View style={{ flex: 1 }}>
      {/* <Text>StartTrip</Text> */}
      <Slider
        index={index}
        setIndex={setIndex}
        prev={
          prev && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={prev}
              totalSlides={createTripSlides.length}
            />
          )
        }
        next={
          next && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={next}
              totalSlides={createTripSlides.length}
            />
          )
        }>
        <Slide
          slide={createTripSlides[index]}
          index={index}
          setIndex={setIndex}
          totalSlides={createTripSlides.length}
        />
      </Slider>
    </View>
    // </ScreenContainer>
  );
};

export default StartTrip;

const styles = StyleSheet.create({});
