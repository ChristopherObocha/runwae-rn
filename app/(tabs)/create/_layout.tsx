import { Stack } from 'expo-router';

export default function CreateATripLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="startTrip" />
    </Stack>
  );
}
