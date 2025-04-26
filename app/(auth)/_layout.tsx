import { Link, Stack, useRouter } from 'expo-router';
import { Platform } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

export default function AuthLayout() {
  const router = useRouter();
  const colors = useColorScheme().colors;

  const LOGIN_MODAL_OPTIONS = {
    presentation: 'modal',
    headerShown: true,
    headerShadowVisible: false,
    title: 'Log in',
    headerLeft() {
      return (
        <Button variant="plain" className="ios:px-0" onPress={() => router.back()}>
          <Text className="text-primary">Cancel</Text>
        </Button>
      );
    },
    headerStyle: {
      backgroundColor: colors.background,
    },
  } as const;

  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(login)" options={LOGIN_MODAL_OPTIONS} />
      <Stack.Screen name="(create-account)" options={CREATE_ACCOUNT_MODAL_OPTIONS} />
    </Stack>
  );
}

const SCREEN_OPTIONS = {
  headerShown: false,
} as const;

const CREATE_ACCOUNT_MODAL_OPTIONS = {
  presentation: 'modal',
  headerShown: Platform.OS === 'ios',
  headerShadowVisible: false,
  headerLeft() {
    return (
      <Link asChild href="/auth">
        <Button variant="plain" className="ios:px-0">
          <Text className="text-primary">Cancel</Text>
        </Button>
      </Link>
    );
  },
} as const;
