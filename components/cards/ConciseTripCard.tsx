import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { dummyProfiles } from '~/configs/constants';
import { Trip } from '~/hooks/useTrips';
import { Spacer } from '~/utils/Spacer';
import { appColors, textStyles } from '~/utils/styles';

const ConciseTripCard = ({ trip }: { trip: Trip }) => {
  const members = trip?.members || dummyProfiles;
  const location = trip?.location || 'Paris, France';
  const startDate = trip?.start_date || 'Feb 8';
  const endDate = trip?.end_date || 'Feb 10';

  const displayMembers = members.slice(0, 2);
  const remainingCount = members.length - 2;

  return (
    <View style={styles.tripCard}>
      <Text style={styles.tripName}>{trip.name}</Text>
      <Spacer size={10} vertical />
      <View style={styles.tripInfoContainer}>
        <View style={styles.tripTextInfoContainer}>
          <View style={styles.tripInfoTextContainer}>
            <FontAwesome6
              name="location-dot"
              size={10}
              color={appColors.white}
            />
            <Text style={styles.tripInfoText}>{location}</Text>
          </View>
          <View style={styles.tripInfoTextContainer}>
            <FontAwesome6
              name="calendar-days"
              size={10}
              color={appColors.white}
            />
            <Text style={styles.tripInfoText}>
              {startDate} - {endDate}
            </Text>
          </View>
        </View>
        <View style={styles.memberContainer}>
          {displayMembers.map((member) => (
            <View key={member.id}>
              <Image
                source={{ uri: member.image }}
                style={styles.memberAvatar}
              />
            </View>
          ))}
          {remainingCount > 0 && (
            <View style={[styles.memberAvatar, styles.memberCount]}>
              <Text style={styles.memberCountText}>+{remainingCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ConciseTripCard;

const styles = StyleSheet.create({
  tripCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: appColors.pureBlack,
    borderRadius: 16,
  },
  tripName: {
    ...textStyles.medium_22,
    color: appColors.white,
  },
  tripInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripTextInfoContainer: {
    gap: 6,
  },
  tripInfoText: {
    ...textStyles.regular_10,
    color: appColors.white,
  },
  tripInfoTextContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  memberCount: {
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberCountText: {
    color: appColors.grey5,
    fontSize: 12,
    fontWeight: '500',
  },
  memberAvatar: {
    width: 30,
    height: 30,
    marginLeft: -5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: appColors.white,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
