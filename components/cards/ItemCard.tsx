import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

import { TripItem } from '@/types';
import { Spacer } from '@/components/Spacer';
// import { appColors, textStyles } from '@/utils/styles';
import { Colors } from '@/constants/Colors';
interface ItemCardProps {
  hotel: TripItem;
  style?: StyleProp<ViewStyle>;
  hotDeal?: boolean;
}

const ItemCard = ({ hotel, style }: ItemCardProps) => {
  const colorScheme = useColorScheme();

  const dynamicStyles = {
    hotelCard: {
      backgroundColor: Colors[colorScheme].background,
      borderColor: Colors[colorScheme].grey,
    },
    hotelName: {
      color: Colors[colorScheme].text,
    },
    description: {
      color: Colors[colorScheme].grey2,
    },
    locationPill: {
      backgroundColor: Colors[colorScheme].background,
    },
    locationText: {
      color: Colors[colorScheme].text,
    },
    membersText: {
      color: Colors[colorScheme].text,
    },
    datePill: {
      backgroundColor: Colors[colorScheme].text,
      opacity: 0.3,
    },
    dateText: {
      color: Colors[colorScheme].background,
    },
  };

  return (
    <View style={[styles.hotelCard, dynamicStyles.hotelCard, style]}>
      <ImageBackground source={hotel?.image} style={styles.hotelImage}>
        <View style={styles.topSpan}>
          <View style={[styles.locationPill, dynamicStyles.locationPill]}>
            <Text
              numberOfLines={1}
              style={[styles.locationText, dynamicStyles.locationText]}>
              {hotel?.location}
            </Text>
          </View>
          <FontAwesome name="heart" size={17} color="white" />
        </View>
      </ImageBackground>

      <Spacer size={12} vertical />

      <View style={styles.hotelInfo}>
        <Text style={[styles.hotelName, dynamicStyles.hotelName]}>
          {hotel?.title}
        </Text>
        <Text
          style={[styles.description, dynamicStyles.description]}
          numberOfLines={2}>
          {hotel?.description}
        </Text>
      </View>

      <Spacer size={12} vertical />

      <View style={styles.topSpan}>
        <View style={[styles.datePill, dynamicStyles.datePill]}>
          <Text
            numberOfLines={1}
            style={[styles.dateText, dynamicStyles.dateText]}>
            {hotel?.date}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={17}
            color={Colors[colorScheme].text}
          />
          <Text style={[styles.membersText, dynamicStyles.membersText]}>
            {hotel?.members}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  hotelCard: {
    marginBottom: 10,
    width: 186,
    borderRadius: 10,
    borderWidth: 1,
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
  hotelInfo: {},
  hotelName: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 18,
  },
  description: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
  },
  hotelLocation: {},
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
  },
  locationText: {
    fontWeight: '500',
  },
  membersText: {
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  datePill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  dateText: {
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
