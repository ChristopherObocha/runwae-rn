import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface CardContainerProps extends PressableProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  props?: PressableProps;
}

const CardContainer = ({
  onPress,
  children,
  style,
  ...props
}: CardContainerProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
      {...props}>
      {children}
    </Pressable>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
});
