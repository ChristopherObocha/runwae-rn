import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';

interface NicknameCircleProps {
  nickname: string;
  userId: string;
  color: string;
  index?: number;
  isEllipsis?: boolean;
  size?: number;
}

export const NicknameCircle = ({
  nickname,
  userId,
  color,
  index = 0,
  isEllipsis = false,
  size = 24,
}: NicknameCircleProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useUser();

  const isCurrentUser = user?.id === userId;
  const hasImage = isCurrentUser ? user?.hasImage : false;
  const imageUrl = isCurrentUser ? user?.imageUrl : null;

  return (
    <View
      style={[
        styles.nicknameCircle,
        isEllipsis && styles.ellipsisCircle,
        {
          marginLeft: index > 0 ? -6 : 0,
          borderColor: isDark ? '#000000' : '#ffffff',
          backgroundColor: Colors[colorScheme].primary,
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      {isEllipsis ? (
        <ThemedText style={styles.ellipsisText}>...</ThemedText>
      ) : hasImage && imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.avatarImage}
          contentFit="cover"
        />
      ) : (
        <ThemedText
          style={[
            styles.initialsText,
            {
              fontSize: size / 2,
              color: 'white',
              lineHeight: size,
              textAlignVertical: 'center',
            },
          ]}>
          {nickname[0].toUpperCase()}
        </ThemedText>
      )}
    </View>
  );
};

interface MemberAvatarsProps {
  participants: Array<{ nickname: string; userId: string }>;
  size?: number;
}

export default function MemberAvatars({
  participants,
  size = 24,
}: MemberAvatarsProps) {
  return (
    <View style={styles.memberContainer}>
      {participants.length > 0 && (
        <View style={styles.nicknameContainer}>
          {participants.length === 4
            ? participants.map((p, index) => (
                <NicknameCircle
                  key={p.userId}
                  nickname={p.nickname}
                  userId={p.userId}
                  color={Colors.light.primary}
                  index={index}
                  size={size}
                />
              ))
            : participants.length > 4
              ? participants
                  .slice(0, 4)
                  .map((p, index) => (
                    <NicknameCircle
                      key={p.userId}
                      nickname={p.nickname}
                      userId={p.userId}
                      color={Colors.light.primary}
                      index={index}
                      isEllipsis={index === 3}
                      size={size}
                    />
                  ))
              : participants.map((p, index) => (
                  <NicknameCircle
                    key={p.userId}
                    nickname={p.nickname}
                    userId={p.userId}
                    color={Colors.light.primary}
                    index={index}
                    size={size}
                  />
                ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nicknameContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  nicknameCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  ellipsisCircle: {
    marginLeft: -6,
  },
  ellipsisText: {
    fontSize: 12,
  },
});
