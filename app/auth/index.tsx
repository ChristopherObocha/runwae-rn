import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import * as React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '~/components/Logo';
import { AlertAnchor } from '~/components/nativewindui/Alert';
import { AlertRef } from '~/components/nativewindui/Alert/types';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { styles } from '~/components/onboarding/slide';
import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';

const GOOGLE_SOURCE = {
  uri: 'https://www.pngall.com/wp-content/uploads/13/Google-Logo.png',
};

export default function AuthIndexScreen() {
  const alertRef = React.useRef<AlertRef>(null);
  const insets = useSafeAreaInsets();
  const colors = useColorScheme().colors;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'center',
      gap: 16,
      marginHorizontal: 32,
      marginBottom: insets.bottom + 20,
    },
    linearGradient: {
      flex: 1,
      marginHorizontal: -32,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 52,
      borderBottomRightRadius: 52,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 32,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={[COLORS.gradientOne, COLORS.gradientTwo]}
          style={styles.linearGradient}>
          <View className="items-center">
            <Logo />
          </View>
        </LinearGradient>

        <View className="ios:pb-5 ios:pt-2 pb-2">
          <Text className="ios:font-extrabold text-center text-3xl font-medium">
            Brace Yourself
          </Text>
          <Text className="ios:font-extrabold text-center text-3xl font-medium">
            for What's Next
          </Text>
        </View>

        <Link href="/auth/(create-account)" asChild>
          <Button
            size={Platform.select({ ios: 'lg', default: 'md' })}
            style={{ backgroundColor: COLORS.gradientOne }}>
            <Text>Sign up free</Text>
          </Button>
        </Link>
        <Button
          variant="secondary"
          className="ios:border-foreground/60"
          size={Platform.select({ ios: 'lg', default: 'md' })}
          onPress={() => {
            alertRef.current?.alert({
              title: 'Suggestion',
              message: 'Use @react-native-google-signin/google-signin',
              buttons: [{ text: 'OK', style: 'cancel' }],
            });
          }}>
          <Image source={GOOGLE_SOURCE} className="absolute left-4 h-4 w-4" resizeMode="contain" />
          <Text className="ios:text-foreground">Continue with Google</Text>
        </Button>
        {Platform.OS === 'ios' && (
          <Button
            variant="secondary"
            className="ios:border-foreground/60"
            size={Platform.select({ ios: 'lg', default: 'md' })}
            onPress={() => {
              alertRef.current?.alert({
                title: 'Suggestion',
                message: 'Use expo-apple-authentication',
                buttons: [{ text: 'OK', style: 'cancel' }],
              });
            }}>
            <Text className="ios:text-foreground absolute left-4 text-[22px]"></Text>
            <Text className="ios:text-foreground">Continue with Apple</Text>
          </Button>
        )}
        <Link href="/auth/(login)" asChild>
          <Button variant="plain" size={Platform.select({ ios: 'lg', default: 'md' })}>
            <Text className="text-primary">Log in</Text>
          </Button>
        </Link>
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
}
