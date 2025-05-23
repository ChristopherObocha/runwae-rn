import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import MemberAvatars from '@/components/MemberAvatars';
import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import {
  useTripItineraryParticipants,
  useAddTripItineraryParticipant,
} from '@/stores/TripStore';
import { formatTime } from '@/utils/formatters';

const defaultImage = require('@/assets/images/high-quality-images/4.jpg');

interface ItineraryCardProps {
  itinerary: {
    id: string;
    tripId: string;
    title: string;
    location: string;
    startDate: string;
    description: string;
    createdByNickname: string;
    image?: string; // Make image optional
    participants?: string[];
  };
}

const ItineraryCard = ({ itinerary }: ItineraryCardProps) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { participants, isParticipant } = useTripItineraryParticipants(
    itinerary.tripId,
    itinerary.id
  );
  const addParticipant = useAddTripItineraryParticipant(
    itinerary.tripId,
    itinerary.id
  );

  const dynamicStyles = {
    container: {
      backgroundColor: Colors[colorScheme].tripCardBackground,
    },
    description: {
      color: Colors[colorScheme].grey2,
    },
    icon: {
      color: Colors[colorScheme].text,
    },
    participantCount: {
      fontSize: 14,
      color: Colors[colorScheme].grey2,
    },
    addButton: {
      backgroundColor: Colors[colorScheme].primaryVariant,
    },
  };

  return (
    <TouchableOpacity
      style={[styles.container, dynamicStyles.container]}
      onPress={() => {
        router.push({
          pathname: '/trip/[tripId]/itinerary/[itineraryId]',
          params: {
            tripId: itinerary.tripId,
            itineraryId: itinerary.id,
          },
        });
      }}>
      <Image
        source={itinerary?.image ? { uri: itinerary.image } : defaultImage}
        style={styles.image}
        contentFit="cover"
        transition={100}
      />

      <View style={styles.contentContainer}>
        <ThemedText style={styles.title}>{itinerary?.title}</ThemedText>
        <Spacer size={8} vertical />
        {itinerary?.description && (
          <>
            <ThemedText
              numberOfLines={2}
              style={[styles.description, dynamicStyles.description]}>
              {itinerary?.description}
            </ThemedText>
            <Spacer size={4} vertical />
          </>
        )}
        {itinerary?.location && (
          <View style={styles.locationContainer}>
            <Ionicons
              name="location"
              size={14}
              color={dynamicStyles.icon.color}
            />
            <ThemedText style={styles.location}>
              {itinerary?.location}
            </ThemedText>
          </View>
        )}
        <Spacer size={4} vertical />
        {itinerary?.startDate && (
          <View style={styles.locationContainer}>
            <Ionicons
              name="time-outline"
              size={14}
              color={dynamicStyles.icon.color}
            />
            <ThemedText style={styles.time}>
              {formatTime(itinerary.startDate)}
            </ThemedText>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.avatarContainer}>
            <MemberAvatars participants={participants} size={18} />
            <ThemedText style={dynamicStyles.participantCount}>
              {participants.length}s are going
            </ThemedText>
          </View>
          {!isParticipant && (
            <Button
              variant="filled"
              leftIcon="add"
              onPress={addParticipant}
              style={dynamicStyles.addButton}
              textStyle={{ color: Colors[colorScheme].text }}>
              Join
            </Button>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.ellipsisContainer}>
        <Ionicons
          name="ellipsis-vertical-sharp"
          size={14}
          color={dynamicStyles.icon.color}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItineraryCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
  },
  image: {
    width: '30%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 8,
    paddingLeft: 12,
  },
  ellipsisContainer: {
    paddingVertical: 8,
    paddingRight: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 10,
  },
  location: {
    fontSize: 10,
  },
  time: {
    fontSize: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    // alignSelf: 'flex-end',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
  },
});
