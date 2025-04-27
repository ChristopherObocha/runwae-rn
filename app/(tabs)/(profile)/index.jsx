import { useAuth, useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { useRouter, Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, useColorScheme, View, Pressable } from 'react-native';

import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const [selectedTab, setSelectedTab] = useState('Preferences');

  const tabs = ['Preferences', 'Settings', 'Trips'];
  const propopsedUserMetadata = {
    userInterests: ['Concerts', 'Food', 'Music', 'Art'],
    userActivities: ['Explorer', 'Beach Lover', 'Foodie', 'Yoga'],
  };

  const dynamicStyles = {
    selectedTab: {
      backgroundColor: Colors[colorScheme].grey,
      borderBottomWidth: 2,
      borderBottomColor: Colors[colorScheme].tripCardBackground,
    },
    signOutButton: {
      color: Colors[colorScheme].destructive,
    },
    separator: {
      color: Colors[colorScheme].grey,
    },
    activityCard: {
      backgroundColor: Colors.purpleGradient,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      opacity: 0.8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userImageContainer: {
      width: 90,
      aspectRatio: 1,
      borderRadius: 45,
      backgroundColor: 'gray',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: Colors[colorScheme].grey,
    },
    segmentedControl: {
      flexDirection: 'row',
      marginVertical: 16,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomWidth: 1,
      borderColor: Colors[colorScheme].grey,
      paddingTop: 4,
      gap: 4,
    },
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Preferences':
        return (
          <View style={[styles.tabContent, { backgroundColor: '#FFE5E5' }]} />
        );
      case 'Settings':
        return (
          <View style={[styles.tabContent, { backgroundColor: '#E5FFE5' }]} />
        );
      case 'Trips':
        return (
          <View style={[styles.tabContent, { backgroundColor: '#E5E5FF' }]} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerLargeTitleStyle: styles.headerLargeTitle,
        }}
      />
      <BodyScrollView style={styles.container}>
        <View style={styles.userContainer}>
          <View
            style={[
              styles.userImageContainerBase,
              dynamicStyles.userImageContainer,
            ]}>
            {user?.imageUrl && (
              <Image
                source={user.imageUrl}
                style={styles.userImage}
                contentFit="cover"
              />
            )}
          </View>
          <View style={styles.userInfo}>
            <ThemedText type="subtitle">{user?.fullName}</ThemedText>
            <Spacer vertical size={4} />
            <ThemedText type="defaultSemiBold">
              {user?.emailAddresses[0].emailAddress}
            </ThemedText>
            <View style={styles.userInterests}>
              {propopsedUserMetadata.userInterests
                .slice(0, 3)
                .map((interest, index) => (
                  <React.Fragment key={interest}>
                    <ThemedText type="caption">{interest}</ThemedText>
                    {index !==
                      Math.min(
                        propopsedUserMetadata.userInterests.length - 1,
                        2
                      ) && (
                      <ThemedText
                        type="caption"
                        style={dynamicStyles.separator}>
                        {' | '}
                      </ThemedText>
                    )}
                  </React.Fragment>
                ))}
            </View>
            <View style={styles.userActivities}>
              {propopsedUserMetadata.userActivities
                .slice(0, 3)
                .map((activity) => (
                  <View key={activity} style={dynamicStyles.activityCard}>
                    <ThemedText type="caption">⭐ {activity}</ThemedText>
                  </View>
                ))}
            </View>
          </View>
        </View>

        <Spacer vertical size={16} />
        {/* Segmented Control */}
        <View style={dynamicStyles.segmentedControl}>
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[
                styles.tab,
                selectedTab === tab && dynamicStyles.selectedTab,
              ]}>
              <ThemedText
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.selectedTabText,
                ]}>
                {tab}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Content Area */}
        {renderContent()}

        <Spacer vertical size={16} />
        <View style={styles.supportContainer}>
          <ThemedText type="subtitle">Support & More</ThemedText>
          <Spacer vertical size={8} />
          <Button
            size="lg"
            textStyle={styles.supportButtonText}
            variant="outline"
            leftIcon="chatbubble-outline"
            onPress={() => {
              router.push('/contact-support');
            }}>
            Contact Support
          </Button>
          <Button
            size="lg"
            textStyle={styles.supportButtonText}
            variant="outline"
            leftIcon="document-text-outline"
            onPress={() => {}}>
            Terms of Service
          </Button>
          <Button
            size="lg"
            textStyle={styles.supportButtonText}
            variant="outline"
            leftIcon="shield-outline"
            onPress={() => {}}>
            Privacy Policy
          </Button>
          <Button
            variant="outline"
            size="lg"
            textStyle={styles.supportButtonText}
            leftIcon="star-outline"
            onPress={() => {}}>
            Rate Us
          </Button>
        </View>

        <Spacer vertical size={40} />
        <Button
          variant="ghost"
          onPress={() => {
            signOut();
            router.replace('/');
          }}
          textStyle={dynamicStyles.signOutButton}>
          Sign Out
        </Button>
        <Spacer vertical size={160} />
      </BodyScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerLargeTitle: {
    // fontSize: 40,
    // fontWeight: 'bold',
    // color: '#747272',
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    gap: 12,
    alignItems: 'center',
  },
  userImageContainerBase: {
    width: 90,
    aspectRatio: 1,
    borderRadius: 45,
    overflow: 'hidden',
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTabText: {
    color: Colors.white,
  },
  tabContent: {
    height: 300,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 16,
  },
  userInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    alignItems: 'center',
  },
  userActivities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
  supportContainer: {
    gap: 4,
  },
  supportButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
