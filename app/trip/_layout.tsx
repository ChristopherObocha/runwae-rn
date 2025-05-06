import { Stack } from 'expo-router';

export default function TripLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <Stack.Screen
        name="[tripId]/actions"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.25],
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
