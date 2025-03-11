import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Spacer } from '~/utils/Spacer';

import { appColors } from '~/utils/styles';
// type ItineraryCardProps = {
//   itinerary: Itinerary;
// };

const ItineraryCard = ({ itinerary }: any) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: itinerary.image }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{itinerary.title}</Text>
        <Spacer size={10} vertical />
        <Text numberOfLines={2} style={styles.description}>
          {itinerary.description}
        </Text>
        <Spacer size={4} vertical />
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="black" />
          <Text style={styles.location}>{itinerary.location}</Text>
        </View>
        <Spacer size={4} vertical />
        <View style={styles.locationContainer}>
          <Ionicons name="time-outline" size={14} color="black" />
          <Text style={styles.time}>{itinerary.time}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.ellipsisContainer}>
        <Ionicons name="ellipsis-vertical-sharp" size={14} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItineraryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: appColors.dedede,
    flexDirection: 'row',
  },
  imageContainer: {
    // width: 40,
    height: '100%',
    maxWidth: 90,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
  },
  ellipsisContainer: {
    padding: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // right: 0,
    // top: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 10,
  },
  location: {
    fontSize: 10,
  },
  time: {
    fontSize: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
