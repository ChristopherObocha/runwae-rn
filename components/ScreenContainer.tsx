import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type ScreenContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ScreenContainer = ({ children, style }: ScreenContainerProps) => {
  return (
    <View className="flex-1 bg-white" style={style}>
      {children}
    </View>
  );
};

export default ScreenContainer;

// const styles = StyleSheet.create({});
