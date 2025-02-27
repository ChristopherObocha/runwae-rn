import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Alert, Button, TextInput, Share, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { dummyProfiles } from '~/configs/constants';
import { useTrips, Trip } from '~/hooks/useTrips';
import { useAuthStore } from '~/stores/useAuthStore';
import { Spacer } from '~/utils/Spacer';
import { generateRandomString } from '~/utils/helpers';
import { appColors, textStyles } from '~/utils/styles';
import { supabase } from '~/utils/supabase';

// type CreateTripProps = {
//   tripName: string;
//   creatorId: string | undefined;
//   description?: string;
//   startDate?: string;
//   endDate?: string;
// };

const CreateScreen = () => {
  const insets = useSafeAreaInsets();
  const { user, session } = useAuthStore();
  const { createTrip, loading, trips } = useTrips();

  const [tripName, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const createdAt = new Date().toISOString();
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [showInviteOptions, setShowInviteOptions] = useState(false);
  const [createdTrip, setCreatedTrip] = useState<Trip | undefined>(undefined);

  const userId = user?.id; // Ensure we get the user ID
  // console.log('trips: ', JSON.stringify(trips, null, 2));

  const handleCreateTrip = async () => {
    const result = await createTrip({
      tripName,
      description,
      startDate,
      endDate,
      creatorId: userId,
    });

    if (result.success) {
      setCreatedTrip(result.trip);
      setShowInviteOptions(true);
    } else {
      Alert.alert('Error', 'Failed to create trip');
    }
  };

  const generateInviteCode = () => {
    // Generate a random 8-character string
    return generateRandomString(8);
  };

  const createInviteURL = (inviteCode: string) => {
    // Replace with your actual app URL
    return `https://yourapp.com/join-trip/${inviteCode}`;
  };

  const sendTripInvite = async (tripId: string, inviteeEmail: string) => {
    try {
      const { data: invite, error } = await supabase
        .from('trip_invites')
        .insert([
          {
            trip_id: tripId,
            inviter_id: userId,
            invitee_email: inviteeEmail,
            invite_type: 'email',
            status: 'pending',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          },
        ])
        .select();

      if (error) throw error;
      return { success: true, invite };
    } catch (error) {
      console.error('Error sending invite:', error);
      return { success: false, error };
    }
  };

  const createInviteLink = async (tripId: string) => {
    try {
      const inviteCode = generateInviteCode();
      const { data: invite, error } = await supabase
        .from('trip_invites')
        .insert([
          {
            trip_id: tripId,
            inviter_id: userId,
            invite_type: 'link',
            invite_code: inviteCode,
            status: 'pending',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          },
        ])
        .select();

      if (error) throw error;

      const inviteLink = createInviteURL(inviteCode);
      return { success: true, invite, inviteLink };
    } catch (error) {
      console.error('Error creating invite link:', error);
      return { success: false, error };
    }
  };

  const handleShareInviteLink = async (tripId: string | undefined) => {
    if (!tripId) {
      Alert.alert('Error', 'Trip ID is required');
      return;
    }
    const result = await createInviteLink(tripId);
    if (result.success) {
      try {
        await Share.share({
          message: `Join my trip! ${result.inviteLink}`,
          title: 'Trip Invitation',
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to share invite link');
        console.error('Error sharing invite link:', error);
      }
    }
  };

  const InviteOptions = ({ tripId }: { tripId: string | undefined }) => (
    <View>
      <Text>Invite People</Text>
      <View>
        <TextInput
          placeholder="Invite user (email)"
          value={inviteeEmail}
          onChangeText={setInviteeEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          title="Send Email Invite"
          disabled={!inviteeEmail || !tripId}
          onPress={async () => {
            if (inviteeEmail && tripId) {
              const result = await sendTripInvite(tripId, inviteeEmail);
              if (result.success) {
                Alert.alert('Success', 'Invitation sent!');
                setInviteeEmail('');
              }
            }
          }}
        />
      </View>
      <Button title="Create Invite Link" onPress={() => handleShareInviteLink(tripId)} />
    </View>
  );

  const containerStyle = {
    paddingTop: insets.top,
  };

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
              <FontAwesome6 name="location-dot" size={10} color={appColors.white} />
              <Text style={styles.tripInfoText}>{location}</Text>
            </View>
            <View style={styles.tripInfoTextContainer}>
              <FontAwesome6 name="calendar-days" size={10} color={appColors.white} />
              <Text style={styles.tripInfoText}>
                {startDate} - {endDate}
              </Text>
            </View>
          </View>
          <View style={styles.memberContainer}>
            {displayMembers.map((member) => (
              <View key={member.id}>
                <Image source={{ uri: member.image }} style={styles.memberAvatar} />
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

  if (loading) {
    return (
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {!showInviteOptions ? (
        <>
          <Text>Create Trip</Text>
          <TextInput placeholder="Trip Name" value={tripName} onChangeText={setTripName} />
          <Button title="Create Trip" onPress={handleCreateTrip} />
        </>
      ) : (
        <InviteOptions tripId={createdTrip?.id} />
      )}

      <Link href="/create/startTrip" asChild>
        <Button title="Start Trip" />
      </Link>

      <Spacer size={20} vertical />
      <Text>Your Trips</Text>
      <Spacer size={20} vertical />
      <View style={styles.tripContainer}>
        {trips.map((trip) => (
          <ConciseTripCard key={trip.id} trip={trip} />
        ))}
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // paddingVertical: 12,
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
  tripContainer: {
    gap: 10,
  },
  tripCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: appColors.pureBlack,
    borderRadius: 16,
    // borderWidth: 1,
    // borderColor: appColors.grey,
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
});
