import '../global.css';
import 'expo-dev-client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Icon } from '@roninoss/icons';
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import Onboarding from '~/app/Onboarding';
import { ThemeToggle } from '~/components/ThemeToggle';
import { cn } from '~/lib/cn';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { useAuthStore } from '~/stores/useAuthStore';
import { useOnboardingStore } from '~/stores/useOnboardingStore';
import { NAV_THEME } from '~/theme';
import { TripsProvider } from '~/hooks/useTrips';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const { session, initialize: initAuth, initialized: authInitialized } = useAuthStore();
  const {
    hasCompletedOnboarding,
    initialize: initOnboarding,
    initialized: onboardingInitialized,
  } = useOnboardingStore();

  useEffect(() => {
    Promise.all([initAuth(), initOnboarding()]);
  }, []);

  // Don't render until both auth and onboarding state are initialized
  if (!authInitialized || !onboardingInitialized) {
    return null; // or a loading spinner
  }

  const MainApp = () => {
    return (
      <>
        <Stack screenOptions={SCREEN_OPTIONS}>
          <Stack.Screen name="(tabs)" options={TABS_OPTIONS} />
          <Stack.Screen name="modal" options={MODAL_OPTIONS} />
        </Stack>
      </>
    );
  };

  return (
    <TripsProvider>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <BottomSheetModalProvider>
            <ActionSheetProvider>
              <NavThemeProvider value={NAV_THEME[colorScheme]}>
                {/* <Stack>
                  {!hasCompletedOnboarding ? (
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                  ) : (
                    <Stack.Screen name="auth" options={{ headerShown: false }} />
                  )}
                </Stack> */}
                {/* {session ? (
                  <Stack>
                    <Stack.Screen name="auth" options={{ headerShown: false }} />
                  </Stack>
                ) : (
                  <MainApp />
                )} */}
                <MainApp />
                <PortalHost />
              </NavThemeProvider>
            </ActionSheetProvider>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </TripsProvider>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
  headerShown: false,
  // headerShown: true,
  // headerLeft: () => <SettingsIcon />,
} as const;

const TABS_OPTIONS = {
  headerShown: false,
  // headerLeft: () => <SettingsIcon />,
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'NativeWindUI',
  headerRight: () => <SettingsIcon />,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;
