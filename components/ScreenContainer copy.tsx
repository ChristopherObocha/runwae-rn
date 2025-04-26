import React from 'react';
import { Platform,StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
type ScreenContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
  scrollable?: boolean;
};

const ScreenContainer = ({
  children,
  style,
  header,
  scrollable = true,
}: ScreenContainerProps) => {

  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      paddingTop: Platform.OS === 'web' ? 32: insets.top + 10,
      alignItems: Platform.OS === 'web' ? 'center' : undefined,
    },
    contentContainerStyle: {
      paddingBottom: insets.bottom,
      // flex: 1,
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
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.content}>{children}</View>
        </ScrollView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </View>
  );
};

export default ScreenContainer;
