// import { Leaf } from 'lucide-react-native';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const LogoDark = require('@/assets/images/figma/4.png');
const LogoLight = require('@/assets/images/icon.png');

export default function SplashScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const isDarkMode = colorScheme === 'dark';

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
  }, []);

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: isDarkMode ? '#121212' : colors.background }}>
      <Animated.View style={[logoStyle]}>
        <View className="rounded-2xl p-5" style={{}}>
          <Image
            source={isDarkMode ? LogoDark : LogoLight}
            style={{
              width: 192,
              height: 192,
            }}
            contentFit="contain"
          />
        </View>
      </Animated.View>

      <Animated.Text
        className={`mt-6 text-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-yellow-700'}`}
        style={[logoStyle]}>
        Runwae
      </Animated.Text>

      <Animated.Text
        className={`mt-2 px-6 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        style={[logoStyle]}>
        Plan and share group trips with friends and family.
      </Animated.Text>
    </View>
  );
}
