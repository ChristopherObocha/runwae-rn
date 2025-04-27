import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

type ScreenContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
};

const ScreenContainer = ({ children, style, header }: ScreenContainerProps) => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      paddingTop: insets.top + 10,
    },
    contentContainerStyle: {
      paddingBottom: insets.bottom,
    },
    content: {
      flex: 1,
      paddingTop: !header ? insets.top + 10 : 0,
      paddingBottom: insets.bottom + 80,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {header && header}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default ScreenContainer;
