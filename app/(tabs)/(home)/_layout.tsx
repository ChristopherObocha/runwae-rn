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
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
