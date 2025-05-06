import { Octicons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPinned } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme as useAppColorScheme } from '@/hooks/useColorScheme';
import { Event } from '@/utils/temp-constants';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const colorScheme = useAppColorScheme();
  const appColors = Colors[colorScheme];

  const hookedStyles = StyleSheet.create({
    genericTextStyle: {
      // color: appColors.background,
    },
    tripInfoText: {
      fontSize: 14,
      opacity: 0.7,
    },
    pill: {
      // backgroundColor: appColors.tripCardBackground,
      backgroundColor: appColors.background,
    },
    pillText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    CTAButton: {
      backgroundColor: appColors.primaryVariant,
    },
    CTAText: {
      fontSize: 12,
      fontWeight: '600',
    },
  });

  const Pill = ({ name }: { name: string }) => {
    return (
      <View
        style={hookedStyles.pill}
        className="items-center justify-center rounded-xl px-4 py-1">
        <ThemedText style={hookedStyles.pillText}>{name} 🧫</ThemedText>
      </View>
    );
  };

  const CTAButton = ({ name }: { name: string }) => {
    return (
      <View style={hookedStyles.CTAButton} className="rounded-xl px-4 py-1">
        <ThemedText style={hookedStyles.CTAText}>{name}</ThemedText>
      </View>
    );
  };

  return (
    <View
      style={{ backgroundColor: appColors.tripCardBackground }}
      className="w-60 rounded-lg">
      <ImageBackground
        source={{ uri: event.image }}
        style={styles.image}
        contentFit="cover">
        <View className="absolute left-2 top-2">
          <Pill name={event.type} />
        </View>
      </ImageBackground>

      <View className="px-2 py-4" style={styles.CTAContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <ThemedText
              type="defaultSemiBold"
              numberOfLines={2}
              style={hookedStyles.genericTextStyle}>
              {event.name}
            </ThemedText>
            <View className="flex-row items-center gap-x-1">
              <MapPinned
                size={14}
                color={Colors[colorScheme].text}
                style={{ opacity: 0.7 }}
              />
              <ThemedText
                type="default"
                style={hookedStyles.tripInfoText}
                numberOfLines={1}>
                {event.location}
              </ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CTAButton name="Add to trip" />
          </View>
        </View>

        <Spacer size={10} vertical />
        <View style={styles.descriptionContainer}>
          <ThemedText
            type="default"
            style={[styles.description, hookedStyles.genericTextStyle]}
            numberOfLines={2}>
            {event.description}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: 265.5,
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 16,
  },
  image: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  stars: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  likeContainer: {
    flexDirection: 'row',
    gap: 4,
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  infoContainer: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  buttonContainer: {
    flexShrink: 0,
    alignSelf: 'flex-end',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  CTAContainer: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexShrink: 1,
  },
  location: {
    fontSize: 12,
  },
  descriptionContainer: {
    width: '100%',
  },
  description: {
    fontSize: 12,
  },
  CTAText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
