import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { ImageBackground } from 'expo-image';
import { FontAwesome6 } from '@expo/vector-icons';
import { TripItem } from '~/types';
import { Spacer } from '~/utils/Spacer';
import { appColors, textStyles } from '~/utils/styles';

interface HotDealCardProps {
  hotel: TripItem;
  style?: StyleProp<ViewStyle>;
}

const HotDealCard = ({ hotel, style }: HotDealCardProps) => {
  return (
    <View style={[styles.hotDealCard, style]}>
      <ImageBackground source={hotel?.image} style={styles.hotelImage}>
        <View style={styles.promoPill}>
          <Text style={styles.promoPillText}>{hotel?.promo}% off</Text>
        </View>
        <View style={styles.hotelInfo}>
          <Text style={styles.hotDealName}>{hotel?.title}</Text>
          <Spacer size={10} vertical />
          <View style={styles.rowContainer}>
            <FontAwesome6 name="location-dot" size={12} color="white" />
            <Text style={styles.hotDealLocation}>{hotel?.location}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HotDealCard;

const styles = StyleSheet.create({
  hotDealCard: {
    width: 342,
    height: 200,
    // backgroundColor: 'white',
    // marginBottom: 10,
    // marginRight: 10,
    // borderRadius: 10,
    // paddingBottom: 10,
    // borderWidth: 1,
    // borderColor: appColors.grey,
    // paddingVertical: 6,
    // paddingHorizontal: 6,
  },
  hotelImage: {
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  hotelInfo: {
    // padding: 10,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  promoPill: {
    // backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 5,
    // height: 24,
    // maxWidth: 60,
    // // justifyContent: 'center',
    // // alignItems: 'center',
    // // flexDirection: 'row',
    // flex: 0,
    backgroundColor: 'white',
    maxWidth: 100,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  promoPillText: {
    ...textStyles.regular_12,
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hotDealName: {
    ...textStyles.medium_17,
    color: 'white',
  },
  hotDealLocation: {
    ...textStyles.regular_12,
    color: 'white',
  },
});
