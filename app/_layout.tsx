import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';
import '@/global.css';

import { tokenCache } from '@/cache';
import { ListCreationProvider } from '@/context/ListCreationContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import TripListStore from '@/stores/TripListStore';
import SplashScreen from '@/screens/SplashScreen';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.log('Missing Publishable Key');
  throw new Error('Missing Publishable Key');
}

// Create a wrapper component that uses useAuth
function AuthenticatedContent() {
  const { isSignedIn, isLoaded } = useAuth();
  const colorScheme = useColorScheme();
  const [isPreloading, setIsPreloading] = useState(true);
  const { preloadImages } = useImagePreloader();

  useEffect(() => {
    const initialize = async () => {
      await preloadImages();
      setIsPreloading(false);
    };
    initialize();
  }, []);

  if (isPreloading) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isLoaded && (
          <>
            {isSignedIn && <TripListStore />}
            <Slot />
            <StatusBar style="auto" />
          </>
        )}
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

function OnboardingFlow() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(onboarding)" />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <TinyBaseProvider>
      <ListCreationProvider>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <AuthenticatedContent />
            {/* <OnboardingFlow /> */}
          </ClerkLoaded>
        </ClerkProvider>
      </ListCreationProvider>
    </TinyBaseProvider>
  );
}
