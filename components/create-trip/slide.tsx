import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Platform, Modal } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Defs, RadialGradient, Rect, Stop, Svg } from 'react-native-svg';

import { HEIGHT, WIDTH } from '~/configs/constants';
import { useOnboardingStore } from '~/stores/useOnboardingStore';
// import AuthModal from '../auth/auth.modal';
import { fontSizes, SCREEN_WIDTH, windowHeight, windowWidth } from '~/theme/app.constant';
import { Spacer } from '~/utils/Spacer';
import { appColors } from '~/utils/styles';

interface SlideProps {
  slide: createTripSlidesTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number;
  isLast?: boolean;
}

interface LinearButtonProps {
  type: 'prev' | 'next';
  // index: number;
  // setIndex: (value: number) => void;
  // totalSlides: number;
  // isLast?: boolean;
}

const Slide = ({ slide, index, setIndex, totalSlides, isLast }: SlideProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { completeOnboarding } = useOnboardingStore();

  const handlePress = (index: number, setIndex: (value: number) => void) => {
    if (index === 2) {
      completeOnboarding();
      console.log('completeOnboarding');
    } else {
      setIndex(index + 1);
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
        <Pressable style={styles.navButtonPressable} onPress={() => handlePress(index, setIndex)}>
          <Text style={[styles.navButtonText, { color: textColor }]}>
            {type === 'prev' ? 'Prev' : index === totalSlides - 1 ? 'Complete' : 'Next'}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      {/* Gradient Background */}
      {/* <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={'#6D55FE'} />
            <Stop offset="100%" stopColor={'#8976FC'} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="url(#gradient)" />
      </Svg> */}

      {/* Container */}
      <View style={styles.container}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
        <Spacer size={verticalScale(15)} vertical />
        <Text style={styles.span}>{slide.span}</Text>

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
