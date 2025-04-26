import React, { useMemo, useState } from 'react';
import { Href, useGlobalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';

import { useJoinTripCallback } from '@/stores/TripListStore';

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewListScreen() {
  const params = useGlobalSearchParams();
  const { tripId: tripIdParam } = params as { tripId: string | undefined };

  const router = useRouter();
  const joinTripCallback = useJoinTripCallback();
  const [tripId, setTripId] = useState<string | null>(tripIdParam);
  const isValidTripId = useMemo(() => isValidUUID(tripId), [tripId]);

  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();
      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };

  const handleJoinList = () => {
    if (tripId && isValidUUID(tripId)) {
      joinTripCallback(tripId);

      // dismissTo method is not working due to a bug in react-native-screens
      router.dismiss();
      setTimeout(() => {
        router.push({
          pathname: '/trip/[tripId]',
          params: { tripId },
        });
      }, 100);
    }
  };

  return (
    <>
      {/* <Stack.Screen
        options={{
          title: 'Create Event',
          headerShown: false,
          presentation: 'formSheet',
          sheetGrabberVisible: true,
        }}
      /> */}
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.heroSection}>
            <ThemedText type="subtitle" style={styles.title}>
              Create a trip ✈️
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.subtitle}>
              Create shared trip plans and collaborate in real-time with family
              and friends
            </ThemedText>
          </View>

          <View style={styles.actionSection}>
            <Button onPress={() => handleDismissTo('/trip/new/create')}>
              Create a new trip
            </Button>

            <View style={styles.divider}>
              <View style={styles.line} />
              <ThemedText type="default" style={styles.orText}>
                or join existing
              </ThemedText>
              <View style={styles.line} />
            </View>

            <View style={styles.joinSection}>
              <TextInput
                placeholder="Enter a list code"
                value={tripId}
                onChangeText={setTripId}
                onSubmitEditing={e => {
                  joinTripCallback(e.nativeEvent.text);
                }}
                containerStyle={{ marginBottom: 0 }}
              />
              <Button onPress={handleJoinList} disabled={!isValidTripId}>
                Join list
              </Button>
              <Button
                variant="ghost"
                onPress={() => handleDismissTo('/trip/new/scan')}>
                Scan QR code
              </Button>
            </View>
          </View>
        </View>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    marginBottom: 100,
  },
  container: {
    gap: 32,
  },
  heroSection: {
    alignItems: 'center',
    gap: 16,
    marginTop: 32,
  },
  iconCircle: {
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  actionSection: {
    gap: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  orText: {
    color: 'gray',
  },
  joinSection: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textInput: {
    flex: 1,
  },
  qrButton: {
    marginBottom: 16,
  },
  joinButton: {
    marginTop: 8,
  },
});
