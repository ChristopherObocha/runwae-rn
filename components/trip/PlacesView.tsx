import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type PlacesViewProps = {
  style?: ViewStyle;
  location?: string;
};

const PlacesView = ({ style, location = 'Paris' }: PlacesViewProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text>Places Content</Text>
    </View>
  );
};

export default PlacesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
});
