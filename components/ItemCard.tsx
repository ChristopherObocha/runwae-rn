import { FontAwesome6 } from '@expo/vector-icons';
import { Image, ImageBackground } from 'expo-image';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { TripItem } from '~/types';
import { Spacer } from '~/utils/Spacer';
import { appColors, textStyles } from '~/utils/styles';

interface ItemCardProps {
  hotel: TripItem;
  style?: StyleProp<ViewStyle>;
  hotDeal?: boolean;
}

const ItemCard = ({ hotel, style }: ItemCardProps) => {
  return (
    <View style={[styles.hotelCard, style]}>
      <Image source={hotel?.image} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{hotel?.title}</Text>
        <Spacer size={10} vertical />
        <Text style={styles.hotelLocation}>{hotel?.location}</Text>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  hotelCard: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: 186,
    marginRight: 10,
    borderRadius: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: appColors.grey,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  hotelImage: {
    height: 175,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
  },
  hotelInfo: {
    padding: 10,
  },
  hotelName: {
    fontWeight: 'bold',
  },
  hotelLocation: {
    color: 'gray',
    lineHeight: 18,
  },
});
