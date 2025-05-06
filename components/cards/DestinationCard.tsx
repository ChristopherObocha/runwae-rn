import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { ThemedText } from '../ThemedText';

import { TripItem } from '@/types';

interface DestinationCardProps {
  destination: TripItem;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <View>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <ThemedText style={styles.title} numberOfLines={1}>
        {destination.title}
      </ThemedText>
      <ThemedText style={styles.location} numberOfLines={1}>
        {destination.location}
      </ThemedText>
    </View>
  );
};

export default DestinationCard;

const styles = StyleSheet.create({
  image: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: -5,
  },
  location: {
    fontSize: 12,
    color: 'gray',
  },
});
