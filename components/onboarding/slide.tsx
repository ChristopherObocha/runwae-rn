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

interface SlideProps {
  slide: onBoardingSlidesTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number;
  isLast?: boolean;
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

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={slide.color} />
            <Stop offset="100%" stopColor={slide.color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <View style={styles.imageContainer}>{slide.image}</View>
        <View>
          <View
            style={{
              width: SCREEN_WIDTH * 1,
              paddingHorizontal: verticalScale(25),
            }}>
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: '600',
                color: '#05030D',
                fontFamily: 'Poppins_600SemiBold',
              }}>
              {slide.title}
            </Text>
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: '600',
                color: '#05030D',
                fontFamily: 'Poppins_600SemiBold',
              }}>
              {slide.secondTitle}
            </Text>
            <Text
              style={{
                paddingVertical: verticalScale(4),
                fontSize: fontSizes.FONT18,
                color: '#3E3B54',
                fontFamily: 'Poppins_300Light',
              }}>
              {slide.subTitle}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.indicator, i === index && styles.activeIndicator]}
          />
        ))}
      </View>
      {/* Next Button */}
      {index <= totalSlides - 1 && (
        <LinearGradient colors={['#6D55FE', '#8976FC']} style={styles.nextButton}>
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
            onPress={() => handlePress(index, setIndex)}>
            <Text style={styles.nextButtonText}>
              {index === totalSlides - 1 ? 'Get Started' : 'Next'}
            </Text>
          </Pressable>
        </LinearGradient>
      )}
      {index < totalSlides - 1 && (
        <TouchableOpacity style={styles.arrowButton} onPress={() => handlePress(index, setIndex)}>
          <Ionicons name="chevron-forward-outline" size={scale(18)} color="black" />
        </TouchableOpacity>
      )}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
          {/* <AuthModal setModalVisible={setModalVisible} /> */}
          <Text>Hello</Text>
        </Pressable>
      </Modal>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: scale(60),
    paddingTop: verticalScale(100),
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(35),
    position: 'absolute',
    bottom: verticalScale(55),
    left: scale(22),
  },
  indicator: {
    height: verticalScale(7),
    width: scale(18),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: scale(4),
    borderRadius: scale(4),
  },
  activeIndicator: {
    height: verticalScale(7),
    width: scale(35),
    backgroundColor: 'white',
  },
  nextButton: {
    position: 'absolute',
    zIndex: 999999999,
    right: windowWidth(25),
    bottom: windowHeight(50),
    marginTop: windowHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
    // width: windowWidth(140),
    height: windowHeight(37),
    borderRadius: windowWidth(20),
    maxWidth: windowWidth(200),
  },
  nextButtonText: {
    color: 'white',
    fontSize: fontSizes.FONT22,
    fontWeight: 'bold',
  },
  arrowButton: {
    position: 'absolute',
    width: scale(30),
    height: scale(30),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    right: moderateScale(5),
    top: Platform.OS === 'ios' ? verticalScale(345) : verticalScale(385),
    transform: [{ translateY: -30 }],
  },
  imageContainer: {
    // width: 200,
    // alignSelf: 'center',
    // height: windowHeight(200),
    backgroundColor: 'red',
    // borderRadius: 100,
    // width: '90%',
    marginBottom: verticalScale(20),
  },
});

export default Slide;
