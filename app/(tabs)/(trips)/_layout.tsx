import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import HomeSkeleton from '@/components/skeletons/HomeSkeleton';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function HomeLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  if (!isLoaded) {
    return <HomeSkeleton />;
  }

  const screenOptions = {
    // headerShown: false,
    headerLargeTitle: true,
    headerTransparent: true,
    headerBlurEffect: 'systemChromeMaterial',
    headerShadowVisible: true,
    headerLargeTitleStyle: {
      backgroundColor: 'transparent',
    },
    headerLargeTitleShadowVisible: false,
  };

  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== 'ios'
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: 'systemChromeMaterial',
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                // NEW: Make the large title transparent to match the background.
                backgroundColor: 'transparent',
              },
            }),
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="trip/new/index"
        options={{
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="trip/new/scan"
        options={{
          presentation: 'fullScreenModal',
          // presentation: 'modal',
          headerLargeTitle: false,
          headerTitle: 'Scan QR code',
          headerLeft: () => (
            <Button variant="ghost" onPress={() => router.back()}>
              Cancel
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="trip/[tripId]/share"
        options={{
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          headerLargeTitle: false,
          headerTitle: 'Invite',
        }}
      />
      <Stack.Screen
        name="trip/[tripId]/edit"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.75, 1],
          sheetGrabberVisible: true,
          headerLargeTitle: false,
          headerTitle: 'Edit trip',
        }}
      />

      {/* 

      <Stack.Screen
        name="trip/[tripId]/product/new"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.8, 1],
          sheetGrabberVisible: true,
          headerLargeTitle: false,
          headerTitle: 'Add product',
        }}
      /> */}
      <Stack.Screen
        name="trip/[tripId]/itinerary/[itineraryId]"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.8, 1],
          sheetGrabberVisible: true,
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="trip/[tripId]/itinerary/new"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.8, 1],
          sheetGrabberVisible: true,
          headerLargeTitle: false,
          headerTitle: 'Add itinerary',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
