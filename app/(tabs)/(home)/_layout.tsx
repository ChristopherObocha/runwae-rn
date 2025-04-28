import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';

import HomeSkeleton from '@/components/skeletons/HomeSkeleton';

export default function HomeLayout() {
  const { isLoaded } = useAuth();
  if (!isLoaded) {
    return <HomeSkeleton />;
  }

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
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
