import { Stack } from 'expo-router';

export default function LoginLayout() {
  return <Stack screenOptions={SCREEN_OPTIONS} />;
}

const SCREEN_OPTIONS = {
  headerShown: false,
} as const;
