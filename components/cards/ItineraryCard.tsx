import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { formatTime } from '@/utils/formatters';
import {
  useTripItineraryParticipants,
  useAddTripItineraryParticipant,
} from '@/stores/TripStore';
import MemberAvatars from '@/components/MemberAvatars';
import Button from '@/components/ui/Button';

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
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const dynamicStyles = {
    container: {
      backgroundColor: Colors[colorScheme].background,
      borderColor: Colors[colorScheme].grey,
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
  };

  console.log(participants);

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
      {itinerary.image ? (
        <Image
          source={{ uri: itinerary.image }}
          style={styles.image}
          contentFit="cover"
          transition={100}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <LinearGradient
            colors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <BlurView intensity={50} style={styles.blur}>
              <ThemedText style={styles.placeholderText}>
                {/* {itinerary.location || 'No location set'} */}
              </ThemedText>
            </BlurView>
          </LinearGradient>
        </View>
      )}

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
              style={styles.addButton}>
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
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
  },
  ellipsisContainer: {
    padding: 5,
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

  imagePlaceholder: {
    height: '100%',
    maxWidth: 90,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '100%',
    maxWidth: 90,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  addButton: {
    padding: 4,
    marginLeft: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
  },
});
