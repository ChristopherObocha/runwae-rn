import { Octicons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Event } from '@/utils/temp-constants';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const colorScheme = useColorScheme();
  const appColors = Colors[colorScheme];

  const hookedStyles = StyleSheet.create({
    genericTextStyle: {
      color: appColors.background,
    },
    likeIcon: {
      height: 28,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: event.isLiked ? appColors.text : appColors.background,
    },
    pill: {
      backgroundColor: appColors.background, // TODO: change to appColors.pureBlack
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pillText: {
      fontSize: 12,
      fontWeight: 'bold',
      // color: appColors.background, // TODO: change to appColors.white
    },
    CTAButton: {
      backgroundColor: appColors.tripCardBackground, // TODO: change to appColors.pureBlack
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 4,
    },
    CTAText: {
      fontSize: 10,
      fontWeight: '600',
      color: appColors.background,
    },
    starsContainer: {
      backgroundColor: appColors.tripCardBackground, // TODO: change to appColors.white
      height: 28,
      width: 28,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
    },
  });

  const Pill = ({ name }: { name: string }) => {
    return (
      <View style={hookedStyles.pill}>
        <ThemedText style={hookedStyles.pillText}>🏨 {name}</ThemedText>
      </View>
    );
  };

  const CTAButton = ({ name }: { name: string }) => {
    return (
      <View style={hookedStyles.CTAButton}>
        <ThemedText style={hookedStyles.CTAText}>{name}</ThemedText>
      </View>
    );
  };

  return (
    // <View style={styles.container}>
    <LinearGradient
      colors={[appColors.grey, appColors.text]}
      style={styles.container}>
      <ImageBackground
        source={{ uri: event.image }}
        style={styles.image}
        // imageStyle={{ borderRadius: 12 }}
      >
        <View style={hookedStyles.starsContainer}>
          <ThemedText style={[styles.stars, hookedStyles.genericTextStyle]}>
            {event.stars}
          </ThemedText>
        </View>
        <View style={styles.likeContainer}>
          <View style={hookedStyles.likeIcon}>
            <Octicons
              name="thumbsup"
              size={12}
              color={event.isLiked ? appColors.background : appColors.text}
            />
          </View>
          <View style={hookedStyles.likeIcon}>
            <Octicons
              name="thumbsdown"
              size={12}
              color={event.isLiked ? appColors.background : appColors.text}
            />
          </View>
        </View>
      </ImageBackground>

      <Spacer size={10} vertical />

      <View style={styles.CTAContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Pill name={event.type} />
            <Spacer size={4} vertical />
            <ThemedText
              type="subtitle"
              numberOfLines={2}
              style={hookedStyles.genericTextStyle}>
              {event.name}
            </ThemedText>
            <View style={styles.locationContainer}>
              <Octicons
                name="location"
                size={12}
                color={appColors.background}
              />
              <ThemedText
                type="default"
                style={[styles.location, hookedStyles.genericTextStyle]}>
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
    </LinearGradient>
    // </View>
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
    resizeMode: 'contain',
    height: 150,
    borderRadius: 12,
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
