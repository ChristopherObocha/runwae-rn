import { router } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';

const more = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>more</Text>
      <Button title="Onboarding?" onPress={() => router.push('/Onboard')} />
    </View>
  );
};

export default more;
