import { Link, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Svg, { Path, Circle } from 'react-native-svg';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: require('~/assets/images/high-quality-images/4.jpg'),
    title: 'Welcome to Runwae',
    description:
      'Your personal running companion to track, analyze, and improve your performance.',
  },
  {
    id: 2,
    image: require('~/assets/images/high-quality-images/1.jpg'),
    title: 'Track Your Progress',
    description:
      'Monitor your runs, set goals, and watch your improvement over time with detailed analytics.',
  },
  {
    id: 3,
    image: require('~/assets/images/high-quality-images/2.jpg'),
    title: 'Join the Community',
    description:
      'Connect with fellow runners, share achievements, and participate in challenges together.',
  },
  {
    id: 4,
    image: require('~/assets/images/high-quality-images/3.jpg'),
    title: 'Ready to Start?',
    description:
      'Begin your running journey today and discover a new way to track and improve your performance.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const insets = useSafeAreaInsets();

  const handleNext = () => {
    if (currentPage < slides.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      router.replace('/(tabs)/explore');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)/explore');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    pager: {
      flex: 1,
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    imageContainer: {
      top: 0 - insets.top - 30,
      width: width * 1,
      height: height * 0.6,
      // marginBottom: 40,
      // backgroundColor: 'red',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      marginBottom: 16,
      textAlign: 'center',
      color: 'white',
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      color: 'white',
      opacity: 0.8,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'white',
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: 'white',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    skipText: {
      color: 'white',
      fontSize: 16,
      opacity: 0.8,
    },
    button: {
      backgroundColor: 'white',
      paddingHorizontal: 40,
      paddingVertical: 15,
      borderRadius: 25,
    },
  });

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 500 }}
              style={styles.imageContainer}>
              {slide.svg ? (
                <MotiView
                  from={{ rotate: '0deg' }}
                  animate={{ rotate: '360deg' }}
                  transition={{
                    type: 'timing',
                    duration: 2000,
                    loop: true,
                  }}>
                  <Svg
                    width={width * 0.8}
                    height={width * 0.8}
                    viewBox="0 0 374 496">
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M311.418 307.409C278.339 409.637 168.651 465.693 66.4226 432.614C-35.8053 399.535 -91.8614 289.847 -58.7821 187.619C-53.8229 172.293 -47.1418 158.005 -39.0223 144.899C-43.8186 153.853 -47.886 163.358 -51.1235 173.363C-80.3785 263.773 -30.8031 360.779 59.6061 390.034C150.015 419.289 247.022 369.714 276.277 279.305C305.532 188.896 255.957 91.8886 165.548 62.6337C143.821 55.6032 121.712 53.1254 100.255 54.6729C128.257 50.8682 157.529 53.1322 186.213 62.414C288.441 95.4933 344.497 205.181 311.418 307.409Z"
                      fill="white"
                      fillOpacity="0.28"
                    />
                    <Circle cx="55.5" cy="210.5" r="6.5" fill="white" />
                    <Circle cx="248.5" cy="218.5" r="8.5" fill="white" />
                    <Circle cx="55" cy="429" r="10" fill="white" />
                  </Svg>
                </MotiView>
              ) : (
                <Image
                  source={slide.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </MotiView>

            <View style={styles.content}>
              <ThemedText type="title" style={styles.title}>
                {slide.title}
              </ThemedText>
              <ThemedText type="default" style={styles.description}>
                {slide.description}
              </ThemedText>
            </View>
          </View>
        ))}
      </PagerView>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          {slides.map((_, index) => (
            <MotiView
              key={index}
              style={[
                styles.progressDot,
                currentPage === index && styles.activeDot,
              ]}
              animate={{
                scale: currentPage === index ? 1.2 : 1,
                opacity: currentPage === index ? 1 : 0.5,
              }}
              transition={{ type: 'timing', duration: 300 }}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentPage < slides.length - 1 && (
            <Pressable onPress={handleSkip}>
              <ThemedText style={styles.skipText}>Skip</ThemedText>
            </Pressable>
          )}
          <MotiView
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              type: 'timing',
              duration: 1000,
              loop: true,
            }}>
            <Button
              variant="filled"
              size="lg"
              onPress={handleNext}
              style={styles.button}>
              {currentPage === slides.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </MotiView>
        </View>
      </View>
    </View>
  );
}
