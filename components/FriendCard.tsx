import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { dummyProfiles } from '~/configs/constants';
import { appColors, textStyles } from '~/utils/styles';

const FriendCard = ({ image, name }: { image: string; name: string }) => {
  const defaultImage = dummyProfiles[0].image;
  const defaultName = dummyProfiles[0].name;

  return (
    <View style={styles.container}>
      <Image source={image || defaultImage} style={styles.image} />
      <Text numberOfLines={1} style={styles.name}>
        {name || defaultName}
      </Text>
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.textH1,
    gap: 10,
    width: '48%',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  name: {
    ...textStyles.regular_12,
    color: appColors.textH1,
  },
});
