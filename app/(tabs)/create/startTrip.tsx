import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';

import FriendCard from '~/components/FriendCard';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { TextField } from '~/components/nativewindui/TextField';
import { createTripSlides, dummyProfiles } from '~/configs/constants';
import { fontSizes } from '~/theme/app.constant';
import { Spacer } from '~/utils/Spacer';
import { DefaultFriends } from '~/utils/constants';
import { appColors, textStyles } from '~/utils/styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface LinearButtonProps {
  type: 'prev' | 'next';
}

const StartTrip = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const [tripName, setTripName] = useState<string>('');
  const [tripLocation, setTripLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [inviteLink, setInviteLink] = useState<string>('https://runwae.io/invite/trip-id=1234');
  // Add this to prevent horizontal scrolling while typing
  const [isEditing, setIsEditing] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isEditing) return; // Prevent scroll handling while editing
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const handlePress = (index: number, setIndex: (value: number) => void, type: 'prev' | 'next') => {
    if (type === 'prev' && index === 0) return;
    if (type === 'next' && index === createTripSlides.length - 1) return;

    const newIndex = type === 'next' ? index + 1 : index - 1;
    setActiveIndex(newIndex);

    // Scroll to the new index
    scrollViewRef.current?.scrollTo({
      x: newIndex * SCREEN_WIDTH,
      animated: true,
    });
  };

  // *********** RENDERS **********

  const NavButton = ({ type }: LinearButtonProps) => {
    const isDisabled = type === 'prev' && activeIndex === 0;
    const textColor =
      type === 'next' ? appColors.white : isDisabled ? appColors.grey3 : appColors.grey3;

    const buttonStyle = {
      backgroundColor: type === 'next' ? appColors.black : 'transparent',
      borderWidth: 1,
      borderColor:
        type === 'prev' ? (isDisabled ? appColors.grey3 : appColors.grey3) : 'transparent',
      borderRadius: 6,
      opacity: isDisabled ? 0.5 : 1,
    };

    return (
      <View style={buttonStyle}>
        <Pressable
          style={[styles.navButtonPressable, isDisabled && styles.navButtonDisabled]}
          onPress={() => handlePress(activeIndex, setActiveIndex, type)}
          disabled={isDisabled}>
          <Text style={[styles.navButtonText, { color: textColor }]}>
            {type === 'prev'
              ? 'Prev'
              : activeIndex === createTripSlides.length - 1
                ? 'Complete'
                : 'Next'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const RenderSlideOne = () => {
    return (
      <View style={styles.slideOneContainer}>
        <TextField
          label="Trip Name"
          style={styles.textField}
          value={tripName}
          onChangeText={setTripName}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          onTouchStart={(e) => {
            // Prevent scroll event propagation when touching input
            e.stopPropagation();
          }}
        />
        <Spacer size={20} vertical />
        <TextField
          label="Trip Location"
          style={styles.textField}
          value={tripLocation}
          onChangeText={setTripLocation}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
        />
        <Spacer size={40} vertical />
        <View style={styles.datePickerContainer}>
          <View>
            <Text style={styles.datePickerLabel}>Start Date</Text>
            <DatePicker
              value={startDate}
              mode="date"
              onChange={(ev) => {
                setStartDate(new Date(ev.nativeEvent.timestamp));
              }}
            />
          </View>
          <View>
            <Text style={styles.datePickerLabel}>End Date</Text>
            <DatePicker
              value={endDate}
              mode="date"
              onChange={(ev) => {
                setEndDate(new Date(ev.nativeEvent.timestamp));
              }}
              minimumDate={startDate}
            />
          </View>
        </View>
      </View>
    );
  };

  const RenderSlideTwo = () => {
    return (
      <View>
        <Text>Select from friends</Text>
        <Spacer size={20} vertical />
        <View style={styles.friendCardContainer}>
          {dummyProfiles.map((profile: DefaultFriends) => (
            <FriendCard
              key={`${profile.name}-${profile.image}`}
              image={profile.image}
              name={profile.name}
            />
          ))}
        </View>
        <Spacer size={40} vertical />

        <Text style={styles.inviteFriendsText}>Invite via link</Text>
        <Spacer size={20} vertical />
        <View style={styles.inviteFriendsContainer}>
          <View style={styles.inviteFriendsInputContainer}>
            <TextInput
              readOnly
              value={inviteLink}
              style={styles.inviteFriendsInput}
              placeholder="Enter email"
            />
          </View>
          <View style={styles.inviteFriendsIconsContainer}>
            <Pressable
              onPress={() => {
                console.log('copy');
                // Clipboard.setStringAsync(inviteLink);
              }}>
              <FontAwesome6 name="copy" size={20} color={appColors.textH1} />
            </Pressable>
            <Pressable
              onPress={() => {
                console.log('qrcode');
                // Clipboard.setStringAsync(inviteLink);
              }}>
              <AntDesign name="qrcode" size={20} color={appColors.textH1} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContentContainer}>
        {createTripSlides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Spacer size={20} vertical />
            <View style={styles.slideContainer}>
              {/* Progress indicator */}
              <View style={styles.progressContainer}>
                {createTripSlides.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.progressDot, i === activeIndex && styles.progressDotActive]}
                  />
                ))}
              </View>

              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
              <Spacer size={40} vertical />
              {index === 0 && <RenderSlideOne />}
              {index === 1 && <RenderSlideTwo />}

              <View style={styles.indexButtonsContainer}>
                <NavButton type="prev" />
                <NavButton type="next" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StartTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContentContainer: {
    // flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  progressDotActive: {
    backgroundColor: '#6366F1',
    width: 16,
  },
  slideOneContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  textField: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: appColors.textGrey,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  datePickerLabel: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
  },

  navButtonText: {
    color: 'white',
    fontSize: fontSizes.FONT22,
    fontWeight: 'bold',
  },
  navButtonPressable: {
    width: 171,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  indexButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: '100%',
    marginBottom: verticalScale(40),
  },

  friendCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inviteFriendsIconsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inviteFriendsContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  inviteFriendsInputContainer: {
    width: '75%',
  },
  inviteFriendsInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: appColors.textGrey,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  inviteFriendsText: {
    ...textStyles.medium_17,
    color: appColors.textGrey,
  },
});
