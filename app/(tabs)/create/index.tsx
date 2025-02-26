import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Alert, Button, TextInput, Share, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { useAuthStore } from '~/stores/useAuthStore';
import { generateRandomString } from '~/utils/helpers';
import { supabase } from '~/utils/supabase';

type CreateTripProps = {
  tripName: string;
  creatorId: string | undefined;
  description?: string;
  startDate?: string;
  endDate?: string;
};

const CreateScreen = () => {
  const insets = useSafeAreaInsets();
  const { user, session } = useAuthStore();

  const [tripName, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const createdAt = new Date().toISOString();
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [showInviteOptions, setShowInviteOptions] = useState(false);
  const [createdTrip, setCreatedTrip] = useState<{ id: string } | null>(null);

  const userId = user?.id; // Ensure we get the user ID

  const createTrip = async ({
    tripName,
    creatorId,
    description,
    startDate,
    endDate,
  }: CreateTripProps) => {
    setLoading(true);
    try {
      // Get the authenticated user's ID

      // Insert a new trip into the 'trips' table
      // console.log('createdAt: ', session);
      const { data: trip, error: tripError } = await supabase
        .from('trip')
        .insert([
          {
            name: tripName,
            created_by: userId,
            created_at: createdAt,
          },
        ])
        .select()
        .single();

      if (tripError) {
        console.log('tripError: ', tripError);
        throw tripError;
      }

      // Insert the trip creator into 'trip_users' table as admin
      // const { error: tripUserError } = await supabase
      //   .from('trip_users')
      //   .insert([{ trip_id: trip.id, user_id: userId, is_admin: true }]);

      // if (tripUserError) throw tripUserError;
      setLoading(false);
      return { success: true, trip };
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';

      // Check if the error is a Supabase error
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error; // Handle string errors
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message; // Handle errors from Supabase API
      }

      console.error('Error creating trip:', errorMessage);
      console.log('error: ', error);
    } finally {
      setLoading(false);
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

  const handleCreateTrip = async () => {
    const result = await createTrip({
      tripName,
      description,
      startDate,
      endDate,
      creatorId: userId,
    });
    if (result?.success) {
      setCreatedTrip(result.trip);
      setShowInviteOptions(true);
    } else {
      Alert.alert('Error', 'Failed to create trip');
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

  const getTrips = async () => {
    const { data: trips, error } = await supabase.from('trip').select('*');
    if (error) throw error;

    console.log('trips: ', JSON.stringify(trips, null, 2));
    return trips;
  };

  getTrips();

  const containerStyle = {
    paddingTop: insets.top,
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
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
