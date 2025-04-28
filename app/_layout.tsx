import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

import { tokenCache } from '@/cache';
import { ListCreationProvider } from '@/context/ListCreationContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import TripListStore from '@/stores/TripListStore';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.log('Missing Publishable Key');
  throw new Error('Missing Publishable Key');
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a wrapper component that uses useAuth
function AuthenticatedContent() {
  const { isSignedIn, isLoaded } = useAuth();
  const colorScheme = useColorScheme();

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

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TinyBaseProvider>
      <ListCreationProvider>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <AuthenticatedContent />
          </ClerkLoaded>
        </ClerkProvider>
      </ListCreationProvider>
    </TinyBaseProvider>
  );
}
