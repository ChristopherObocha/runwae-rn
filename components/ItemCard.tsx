import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
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
      <ImageBackground source={hotel?.image} style={styles.hotelImage}>
        <View style={styles.topSpan}>
          <View style={styles.locationPill}>
            <Text numberOfLines={1} style={styles.locationText}>
              {hotel?.location}
            </Text>
          </View>
          <FontAwesome name="heart" size={17} color="white" />
        </View>
      </ImageBackground>

      <Spacer size={12} vertical />

      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{hotel?.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {hotel?.description}
        </Text>
      </View>

      <Spacer size={12} vertical />

      <View style={styles.topSpan}>
        <View style={styles.datePill}>
          <Text numberOfLines={1} style={styles.dateText}>
            {hotel?.date}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={17}
            color="black"
          />
          <Text style={styles.membersText}>{hotel?.members}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  hotelCard: {
    backgroundColor: appColors.white,
    marginBottom: 10,
    width: 186,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.grey,
    paddingBottom: 10,
    paddingTop: 6,
    paddingHorizontal: 6,
  },
  hotelImage: {
    height: 175,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  hotelInfo: {
    // padding: 10,
  },
  hotelName: {
    fontFamily: 'Inter-Medium',
    color: appColors.pureBlack,
    fontSize: 18,
    lineHeight: 18,
  },
  description: {
    fontFamily: 'Inter-Medium',
    color: appColors.grey3,
    fontSize: 10,
  },
  hotelLocation: {
    color: 'gray',
  },

  topSpan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationPill: {
    maxWidth: 86,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: appColors.white,
  },
  locationText: {
    ...textStyles.regular_10,
    color: appColors.pureBlack,
    fontWeight: '500',
  },
  membersText: {
    ...textStyles.regular_10,
    color: appColors.pureBlack,
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  datePill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: appColors.pureBlack,
    opacity: 0.3,
  },
  dateText: {
    ...textStyles.regular_10,
    color: appColors.white,
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
