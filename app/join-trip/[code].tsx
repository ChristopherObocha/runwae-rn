import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabase';
export default function JoinTripScreen() {
  const { code } = useLocalSearchParams();
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinTrip = async () => {
      try {
        // Find the invitation
        const { data: invite, error: inviteError } = await supabase
          .from('trip_invites')
          .select('*')
          .eq('invite_code', code)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invalid or expired invitation');
        }

        if (new Date(invite.expires_at) < new Date()) {
          throw new Error('Invitation has expired');
        }

        // Add user to trip_users
        const { error: joinError } = await supabase.from('trip_users').insert([
          {
            trip_id: invite.trip_id,
            user_id: user?.id,
            is_admin: false,
          },
        ]);

        if (joinError) throw joinError;

        // Update invitation status
        await supabase.from('trip_invites').update({ status: 'accepted' }).eq('id', invite.id);

        Alert.alert('Success', 'You have joined the trip!');
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
        console.error('Error joining trip:', error);
        router.replace('/(tabs)');
      } finally {
        setLoading(false);
      }
    };

    if (user && code) {
      joinTrip();
    }
  }, [code, user]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return null;
}
