import { Dimensions, StyleSheet, View, Platform } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';

import { Canvas, Rect, RadialGradient, vec } from "@shopify/react-native-skia";
import { Colors } from "@/constants/Colors";

const LinearGradientScreen = () => {
  const { width, height } = Dimensions.get('window');

  // Return a simple colored View for web platform
  if (Platform.OS === 'web') {
    return (
      <LinearGradient
      // colors={[Colors.white, Colors.purpleGradient]}
      colors={[Colors.white, Colors.black]}
      style={styles.canvas}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0, y: 0.5 }}
    />
    );
  }

  // Return Skia canvas for native platforms
  return (
    <Canvas style={styles.canvas}>
      <Rect x={0} y={0} width={width} height={height}>
        <RadialGradient
          c={vec(width + 50, height / 2)}
          r={height * 0.6}
          // colors={[Colors.white, Colors.purpleGradient]}
          colors={[Colors.white, Colors.black]}
        />
      </Rect>
    </Canvas>
  );
};

export default LinearGradientScreen;

const styles = StyleSheet.create({
    canvas: {
      ...StyleSheet.absoluteFillObject,
    },
});
