import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  withBoxes?: boolean;
  withBackground?: boolean;
};

const ScreenContainer = ({ children, style, withBoxes, withBackground }: ScreenContainerProps) => {
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
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: [{ translateX: -140 }, { translateY: -350 }, { rotate: '45deg' }],
    },
    box2: {
      backgroundColor: '#ECD5E3',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: [{ translateX: 340 }, { translateY: 50 }, { rotate: '45deg' }],
    },
    content: {
      flex: 1,
      paddingTop: insets.top + 10,
      paddingBottom: insets.bottom + 80,
    },
  });

  const Box = ({ style }: { style: StyleProp<ViewStyle> }) => {
    return <View style={[styles.boxContainer, style]} />;
  };

  console.log('withBoxes: ', withBoxes);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainerStyle}>
      {withBoxes === true && (
        <>
          <Box style={styles.box1} />
          <Box style={styles.box2} />
        </>
      )}
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

export default ScreenContainer;
