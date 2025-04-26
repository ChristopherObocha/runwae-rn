import { FontAwesome6 } from '@expo/vector-icons';
import {
  Link,
  // useRouter
} from 'expo-router';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

// import { IconSymbol } from '../ui/IconSymbol.ios';

import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
// import { useDelTripCallback } from '@/stores/TripListStore';
import { useTripUserNicknames, useTripValue } from '@/stores/TripStore';

export default function TripCard({ tripId }: { tripId: string }) {
  // const router = useRouter();
  const colorScheme = useColorScheme();
  // Listening to just these cells means that the component won't unnecessarily
  // re-render if anything else in the row changes (such as the timestamps).
  const [name] = useTripValue(tripId, 'name');
  const [startDate] = useTripValue(tripId, 'startDate');
  const [endDate] = useTripValue(tripId, 'endDate');
  const [location] = useTripValue(tripId, 'destination');
  // const productCount = useTripValues(tripId, "productCount");
  const userNicknames = useTripUserNicknames(tripId);

  // const deleteCallback = useDelTripCallback(tripId);

  const dynamicStyles = {
    tripCard: {
      backgroundColor: Colors[colorScheme].tripCardBackground,
    },
    tripName: {
      color: Colors[colorScheme].background,
    },
    tripInfoText: {
      color: Colors[colorScheme].background,
      fontSize: 10,
    },
  };

  const getDaysUntilDeparture = (date: string) => {
    const today = new Date();
    const departureDate = new Date(date);

    // Reset time part to compare just dates
    today.setHours(0, 0, 0, 0);
    departureDate.setHours(0, 0, 0, 0);

    const diffTime = departureDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Departing today';
    if (diffDays === 1) return 'Departing tomorrow';
    if (isNaN(diffDays)) return null;
    return `${diffDays} days to departure`;
  };

  // TODO: Add swipeable card
  // const Render = () => {
  //   return (
  //     <Link href={{ pathname: '/trip/[tripId]', params: { tripId } }}>
  //       <View style={styles.swipeable}>
  //         <View style={styles.leftContent}>
  //           <View style={styles.textContent}>
  //             <ThemedText type="defaultSemiBold" numberOfLines={2}>
  //               {name}
  //             </ThemedText>
  //             {/* <ThemedText type="defaultSemiBold" style={styles.productCount}>
  //                 Created on {startDate}
  //               </ThemedText> */}
  //           </View>
  //         </View>

  //         <View style={styles.rightContent}>
  //           {userNicknames.length > 1 && (
  //             <View style={styles.nicknameContainer}>
  //               {userNicknames.length === 4
  //                 ? // Show all 4 letters when length is exactly 4
  //                   userNicknames.map((nickname, index) => (
  //                     <NicknameCircle
  //                       key={nickname}
  //                       nickname={nickname}
  //                       color={Colors.light.primary}
  //                       index={index}
  //                     />
  //                   ))
  //                 : userNicknames.length > 4
  //                   ? // Show first 3 letters and ellipsis when length > 4
  //                     userNicknames
  //                       .slice(0, 4)
  //                       .map((nickname, index) => (
  //                         <NicknameCircle
  //                           key={nickname}
  //                           nickname={nickname}
  //                           color={Colors.light.primary}
  //                           index={index}
  //                           isEllipsis={index === 3}
  //                         />
  //                       ))
  //                   : // Show all letters when length is 2 or 3
  //                     userNicknames.map((nickname, index) => (
  //                       <NicknameCircle
  //                         key={nickname}
  //                         nickname={nickname}
  //                         color={Colors.light.primary}
  //                         index={index}
  //                       />
  //                     ))}
  //             </View>
  //           )}
  //           <IconSymbol name="chevron.right" size={14} color="#A1A1AA" />
  //         </View>
  //       </View>
  //     </Link>
  //   );
  // };

  return (
    <Link href={{ pathname: '/trip/[tripId]', params: { tripId } }}>
      <View style={[styles.tripCard, dynamicStyles.tripCard]}>
        <ThemedText type="subtitle" style={dynamicStyles.tripName}>
          {name}
        </ThemedText>
        <Spacer size={10} vertical />
        <View style={styles.tripInfoContainer}>
          <View style={styles.tripTextInfoContainer}>
            {location && (
              <View style={styles.tripInfoTextContainer}>
                <FontAwesome6
                  name="location-dot"
                  size={10}
                  color={Colors[colorScheme].background}
                />
                <ThemedText type="default" style={dynamicStyles.tripInfoText}>
                  {location}
                </ThemedText>
              </View>
            )}

            {startDate && endDate && (
              <View style={styles.tripInfoTextContainer}>
                <FontAwesome6
                  name="calendar-days"
                  size={10}
                  color={Colors[colorScheme].background}
                />
                <ThemedText type="default" style={dynamicStyles.tripInfoText}>
                  {new Date(startDate).toLocaleDateString()} -{' '}
                  {new Date(endDate).toLocaleDateString()}
                </ThemedText>
              </View>
            )}
            {startDate && (
              <ThemedText type="default" style={dynamicStyles.tripInfoText}>
                {getDaysUntilDeparture(startDate)}
              </ThemedText>
            )}
          </View>
          <View style={styles.memberContainer}>
            {userNicknames.length > 1 && (
              <View style={styles.nicknameContainer}>
                {userNicknames.length === 4
                  ? // Show all 4 letters when length is exactly 4
                    userNicknames.map((nickname, index) => (
                      <NicknameCircle
                        key={nickname}
                        nickname={nickname}
                        color={Colors.light.primary}
                        index={index}
                      />
                    ))
                  : userNicknames.length > 4
                    ? // Show first 3 letters and ellipsis when length > 4
                      userNicknames
                        .slice(0, 4)
                        .map((nickname, index) => (
                          <NicknameCircle
                            key={nickname}
                            nickname={nickname}
                            color={Colors.light.primary}
                            index={index}
                            isEllipsis={index === 3}
                          />
                        ))
                    : // Show all letters when length is 2 or 3
                      userNicknames.map((nickname, index) => (
                        <NicknameCircle
                          key={nickname}
                          nickname={nickname}
                          color={Colors.light.primary}
                          index={index}
                        />
                      ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </Link>
  );
}

export const NicknameCircle = ({
  nickname,
  color,
  index = 0,
  isEllipsis = false,
}: {
  nickname: string;
  color: string;
  index?: number;
  isEllipsis?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemedText
      type="defaultSemiBold"
      style={[
        styles.nicknameCircle,
        isEllipsis && styles.ellipsisCircle,
        {
          backgroundColor: color,
          borderColor: isDark ? '#000000' : '#ffffff',
          marginLeft: index > 0 ? -6 : 0,
        },
      ]}>
      {isEllipsis ? '...' : nickname[0].toUpperCase()}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  tripCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: '100%',
  },
  tripInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripTextInfoContainer: {
    // gap: 6,
  },
  tripInfoTextContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightAction: {
    width: 200,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeable: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 1,
  },
  textContent: {
    flexShrink: 1,
  },
  productCount: {
    fontSize: 12,
    color: 'gray',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nicknameContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  nicknameCircle: {
    fontSize: 12,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    padding: 1,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 20,
    overflow: 'hidden',
  },
  ellipsisCircle: {
    lineHeight: 0,
    marginLeft: -6,
  },
});
