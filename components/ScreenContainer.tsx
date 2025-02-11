import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ScreenContainer = ({ children, style }: ScreenContainerProps) => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentContainerStyle: {
      // paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },

    boxContainer: {
      backgroundColor: '#EAE6FF',
      height: 678,
      // width: 739,
      aspectRatio: 1,
      borderRadius: 100,
    },
    box1: {
      backgroundColor: '#EAE6FF',
      // position: 'absolute',
      // top: -500,
      // left: 0,
      // right: 0,
      // bottom: 0,
      transform: [{ translateX: -739 / 2 }, { translateY: -500 }, { rotate: '45deg' }],
    },
    box2: {
      backgroundColor: '#ECD5E3',
      // position: 'absolute',
      // top: 200,
      // left: 100,
      // right: 40,
      // bottom: 0,
      transform: [{ translateX: 340 }, { translateY: -500 }, { rotate: '45deg' }],
    },
  });

  const Box = ({ style }: { style: StyleProp<ViewStyle> }) => {
    // console.log('style', style);
    return <View style={[styles.boxContainer, style]} />;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainerStyle}>
      <Box style={styles.box1} />
      <Box style={styles.box2} />
      {children}
    </ScrollView>
  );
};

export default ScreenContainer;
