import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

import { TextField } from '../nativewindui/TextField';
import { DatePicker } from '../nativewindui/DatePicker';
import { ProgressIndicator } from '../nativewindui/ProgressIndicator';

import { useOnboardingStore } from '~/stores/useOnboardingStore';
import { fontSizes, SCREEN_WIDTH } from '~/theme/app.constant';
import { Spacer } from '~/utils/Spacer';
import { appColors } from '~/utils/styles';
import { cn } from '~/lib/cn';

interface SlideProps {
  slide: createTripSlidesTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number;
  isLast?: boolean;
}

interface LinearButtonProps {
  type: 'prev' | 'next';
}

const Slide = ({ slide, index, setIndex, totalSlides, isLast }: SlideProps) => {
  const { completeOnboarding } = useOnboardingStore();
  const [tripName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handlePress = (index: number, setIndex: (value: number) => void, type: 'prev' | 'next') => {
    if (type === 'prev' && index !== 0) {
      setIndex(index - 1);
    } else {
      if (index === 2) {
        // completeOnboarding();
        console.log('completeOnboarding');
      } else {
        setIndex(index + 1);
      }
    }
  };

  const NavButton = ({ type }: LinearButtonProps) => {
    const textColor = type === 'next' ? appColors.white : appColors.grey3;
    const buttonStyle = {
      backgroundColor: type === 'next' ? appColors.black : 'transparent',
      borderWidth: 1,
      borderColor: type === 'prev' ? appColors.grey3 : 'transparent',
      borderRadius: 6,
    };

    return (
      <View style={buttonStyle}>
        <Pressable
          style={styles.navButtonPressable}
          onPress={() => handlePress(index, setIndex, type)}
          disabled={type === 'prev' && index === 0}
          // onPress={() => setIndex(index + 1)}
        >
          <Text style={[styles.navButtonText, { color: textColor }]}>
            {type === 'prev' ? 'Prev' : index === totalSlides - 1 ? 'Complete' : 'Next'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const FormInput = () => {
    const formStyles = {
      borderColor: appColors.grey3,
      borderBottomWidth: 1,
      borderRadius: 6,
    };
    return (
      <View>
        <TextField
          label="Trip Name"
          style={formStyles}
          value={tripName}
          onChangeText={setTripName}
        />
        <TextField
          label="Where to?"
          style={formStyles}
          value={location}
          onChangeText={setLocation}
        />
        <TextField label="For how long?" style={formStyles} value={date} onChangeText={setDate} />
      </View>
    );
  };

  return (
    <>
      {/* Container */}
      <View style={styles.container}>
        <ProgressIndicator
          value={((index + 1) / totalSlides) * 100}
          max={100}
          style={{ marginBottom: verticalScale(10) }}
        />
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
        <Spacer size={verticalScale(15)} vertical />
        <Text style={styles.span}>{slide.span}</Text>
        <FormInput />
        <TextField label="Search" />
        <View style={styles.indexButtonsContainer}>
          <NavButton type="prev" />
          <NavButton type="next" />
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: verticalScale(100),
    paddingHorizontal: 15,
    flex: 1,
    width: SCREEN_WIDTH * 1,
  },
  title: {
    fontSize: fontSizes.FONT30,
    fontWeight: '600',
    color: appColors.textGrey,
    fontFamily: 'SFProText-Bold',
  },
  description: {
    fontSize: fontSizes.FONT14,
    fontWeight: '600',
    color: appColors.textGrey,
    fontFamily: 'SFProText-Regular',
  },
  span: {
    fontSize: fontSizes.FONT14,
    color: '#3E3B54',
    fontFamily: 'SFProText-Regular',
    alignSelf: 'flex-end',
  },
  navButtonText: {
    color: 'white',
    fontSize: fontSizes.FONT22,
    fontWeight: 'bold',
  },
  navButtonPressable: {
    width: 171,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: '100%',
    marginBottom: verticalScale(100),
  },
});

export default Slide;
