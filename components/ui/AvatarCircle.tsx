import { useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Pressable } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export const AvatarCircle = ({ style }: { style: StyleProp<ViewStyle> }) => {
  const colorScheme = useColorScheme();
  const { user } = useUser();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.replace('/(tabs)/(profile)')}
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].primaryVariant,
        },
        style,
      ]}
      className="items-center justify-center rounded-full">
      {user?.hasImage ? (
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
      ) : (
        <User size={18} color={Colors[colorScheme].text} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 4,
    width: 32,
    height: 32,
  },
  image: {
    width: 'auto',
    height: 'auto',
    overflow: 'hidden',
  },
});
