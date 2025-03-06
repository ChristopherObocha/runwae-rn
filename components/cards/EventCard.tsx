import { Octicons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacer } from '~/utils/Spacer';
import { Event } from '~/utils/constants';
import { appColors, textStyles } from '~/utils/styles';

interface EventCardProps {
  event: Event;
}

const Pill = ({ name }: { name: string }) => {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>🏨 {name}</Text>
    </View>
  );
};

const CTAButton = ({ name }: { name: string }) => {
  return (
    <View style={styles.CTAButton}>
      <Text style={styles.CTAText}>{name}</Text>
    </View>
  );
};

const EventCard = ({ event }: EventCardProps) => {
  const hookedStyles = StyleSheet.create({
    likeIcon: {
      ...styles.likeIcon,
      backgroundColor: event.isLiked ? appColors.pureBlack : appColors.white,
    },
  });

  return (
    // <View style={styles.container}>
    <LinearGradient
      colors={[appColors.grey, appColors.pureBlack]}
      style={styles.container}>
      <ImageBackground
        source={{ uri: event.image }}
        style={styles.image}
        // imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.starsContainer}>
          <Text style={styles.stars}>{event.stars}</Text>
        </View>
        <View style={styles.likeContainer}>
          <View style={hookedStyles.likeIcon}>
            <Octicons
              name="thumbsup"
              size={12}
              color={event.isLiked ? appColors.white : appColors.pureBlack}
            />
          </View>
          <View style={styles.likeIcon}>
            <Octicons
              name="thumbsdown"
              size={12}
              color={event.isLiked ? appColors.white : appColors.pureBlack}
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
            <Text style={styles.header} numberOfLines={2}>
              {event.name}
            </Text>
            <View style={styles.locationContainer}>
              <Octicons name="location" size={12} color={appColors.white} />
              <Text style={styles.location}>{event.location}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CTAButton name="Add to trip" />
          </View>
        </View>

        <Spacer size={10} vertical />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={2}>
            {event.description}
          </Text>
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
  starsContainer: {
    backgroundColor: appColors.white,
    borderRadius: 100,
    padding: 4,
  },
  stars: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  likeContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  likeIcon: {
    height: 28,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: appColors.white,
  },
  pill: {
    backgroundColor: appColors.pureBlack,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: appColors.white,
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
    ...textStyles.medium_17,
    color: appColors.white,
    flexShrink: 1,
  },
  location: {
    ...textStyles.regular_12,
    color: appColors.white,
  },
  descriptionContainer: {
    width: '100%',
  },
  description: {
    ...textStyles.regular_12,
    color: appColors.white,
  },
  CTAButton: {
    backgroundColor: appColors.pureBlack,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  CTAText: {
    ...textStyles.medium_17,
    color: appColors.white,
    fontSize: 10,
    fontWeight: '600',
  },
});
