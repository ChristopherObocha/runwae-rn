import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import {
  Check,
  MoreHorizontal,
  MapPinned,
  CalendarRange,
} from 'lucide-react-native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
// import { useDelTripCallback } from '@/stores/TripListStore';
import { useTripUserNicknames, useTripValue } from '@/stores/TripStore';
import { DEFAULT_IMAGES, preloadImage } from '@/utils/imagePreloader';

const defaultImage =
  'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?cs=srgb&dl=pexels-vince-2265876.jpg';

// Preload the default image
preloadImage(DEFAULT_IMAGES.TRIP_COVER);

export const FlatTripCard = ({ tripId }: { tripId: string }) => {
  // const colorScheme = useColorScheme();
  // const isDarkMode = colorScheme === 'dark';
  const animatedValue = useSharedValue(0);

  const cardAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedValue.value, [0, 1], [0.5, 1]),
    };
  });

  return (
    <Animated.View style={[cardAnimStyle]}>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold">{tripId}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Check size={24} color={Colors.primary[500]} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export function TripCard({ tripId }: { tripId: string }) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  // Listening to just these cells means that the component won't unnecessarily
  // re-render if anything else in the row changes (such as the timestamps).
  const [name] = useTripValue(tripId, 'name');
  const [startDate] = useTripValue(tripId, 'startDate');
  const [endDate] = useTripValue(tripId, 'endDate');
  const [location] = useTripValue(tripId, 'destination');
  const [image] = useTripValue(tripId, 'coverImage');
  const userNicknames = useTripUserNicknames(tripId);

  // Preload the trip's cover image if it exists
  useEffect(() => {
    if (image) {
      preloadImage(image);
    }
  }, [image]);

  // const deleteCallback = useDelTripCallback(tripId);
  const animatedValue = useSharedValue(0);
  const cardAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedValue.value, [0, 1], [0.5, 1]),
    };
  });

  React.useEffect(() => {
    animatedValue.value = withTiming(1, { duration: 300 });
  }, []);

  const dynamicStyles = {
    tripCard: {
      backgroundColor: Colors[colorScheme].tripCardBackground,
    },
    tripName: {
      fontWeight: 'bold',
    },
    tripInfoText: {
      fontSize: 14,
      opacity: 0.7,
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

    if (diffDays < 0)
      return 'Past on ' + new Date(startDate).toLocaleDateString();
    if (diffDays === 0) return 'Departing today';
    if (diffDays === 1) return 'Departing tomorrow';
    if (isNaN(diffDays)) return null;
    return `${diffDays} days to departure`;
  };

  const handleMorePress = () => {
    router.push({
      pathname: '../trip/[tripId]/actions',
      params: { tripId },
    });
  };

  return (
    <Animated.View style={[cardAnimStyle]}>
      <Link href={{ pathname: '/trip/[tripId]', params: { tripId } }}>
        <View
          style={[styles.tripCard, dynamicStyles.tripCard]}
          className="w-full flex-row gap-x-4">
          {/* Column 1: Image */}
          <View className="h-full w-24 shrink-0">
            <Image
              source={{ uri: image || defaultImage }}
              style={styles.tripImage}
              contentFit="cover"
            />
          </View>

          {/* Column 2: Content */}
          <View className="flex-1 justify-between py-2">
            <ThemedText type="defaultSemiBold" numberOfLines={1}>
              {name}
            </ThemedText>

            {/* Info Container */}
            <View className="mt-4">
              {location && (
                <View className="flex-row items-center gap-x-1">
                  <MapPinned
                    size={14}
                    color={Colors[colorScheme].text}
                    style={{ opacity: 0.7 }}
                  />
                  <ThemedText
                    type="default"
                    style={dynamicStyles.tripInfoText}
                    numberOfLines={1}>
                    {location}
                  </ThemedText>
                </View>
              )}

              {startDate && endDate && (
                <View className="flex-row items-center gap-x-1">
                  <CalendarRange
                    size={14}
                    color={Colors[colorScheme].text}
                    style={{ opacity: 0.7 }}
                  />
                  <ThemedText type="default" style={dynamicStyles.tripInfoText}>
                    {getDaysUntilDeparture(startDate)}
                  </ThemedText>
                </View>
              )}
            </View>
          </View>

          {/* Column 3: Actions and Nicknames */}
          <View className="flex h-full w-16 shrink-0 items-center justify-between py-2">
            <TouchableOpacity
              onPress={handleMorePress}
              className="opacity-50"
              disabled>
              <MoreHorizontal size={20} color={Colors[colorScheme].text} />
            </TouchableOpacity>

            {userNicknames.length >= 1 && (
              <View className="mt-4 flex-row">
                {userNicknames.length === 4
                  ? userNicknames.map((nickname, index) => (
                      <NicknameCircle
                        key={nickname}
                        nickname={nickname}
                        color={Colors[colorScheme].primaryVariant}
                        index={index}
                      />
                    ))
                  : userNicknames.length > 4
                    ? userNicknames
                        .slice(0, 4)
                        .map((nickname, index) => (
                          <NicknameCircle
                            key={nickname}
                            nickname={nickname}
                            color={Colors[colorScheme].primaryVariant}
                            index={index}
                            isEllipsis={index === 3}
                          />
                        ))
                    : userNicknames.map((nickname, index) => (
                        <NicknameCircle
                          key={nickname}
                          nickname={nickname}
                          color={Colors[colorScheme].primaryVariant}
                          index={index}
                        />
                      ))}
              </View>
            )}
          </View>
        </View>
      </Link>
    </Animated.View>
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
  // const isDark = colorScheme === 'dark';

  return (
    <ThemedText
      type="defaultSemiBold"
      style={[
        styles.nicknameCircle,
        isEllipsis && styles.ellipsisCircle,
        {
          backgroundColor: color,
          // borderColor: isDark ? '#000000' : '#ffffff',
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginLeft: index > 0 ? -6 : 0,
          color: Colors[colorScheme].text,
        },
      ]}>
      {isEllipsis ? '...' : nickname[0].toUpperCase()}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  tripCard: {
    borderRadius: 16,
    minWidth: '100%',
  },
  tripInfoContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  tripTextInfoContainer: {
    flex: 1,
    minWidth: 0,
  },
  tripInfoTextContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    width: '100%',
  },
  tripImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  // Nickname Circle
  nicknameContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  nicknameCircle: {
    fontSize: 12,
    // color: 'white',
    // borderWidth: 1,
    // borderColor: 'white',
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
