import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/(home)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: 'Sign In' }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, headerTitle: 'Sign Up' }}
      />
      <Stack.Screen
        name="reset-password"
        options={{ headerShown: false, headerTitle: 'Reset Password' }}
      />
    </Stack>
  );
}
