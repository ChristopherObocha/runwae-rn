import { Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import HomeSkeleton from '@/components/skeletons/HomeSkeleton';
import { Redirect } from 'expo-router';

export default function ProfileLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <HomeSkeleton />;
  }

  if (!isSignedIn) return <Redirect href="/(auth)" />;

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
        name="contact-support"
        options={{
          title: 'Contact support',
          headerShown: false,
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          sheetAllowedDetents: ['0.75', '1'],
        }}
      />
    </Stack>
  );
}
