import { Link } from 'expo-router';
import * as React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

// import LogoSvg from '~/assets/svgs/logo-svg';
import { Logo } from '~/components/Logo';
import { AlertAnchor } from '~/components/nativewindui/Alert';
import { AlertRef } from '~/components/nativewindui/Alert/types';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

// const LOGO_SOURCE = {
//   uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/logo.28276aeb.png&w=2048&q=75',
// };
const LOGO_SOURCE = require('~/assets/icon.png');
// const LOGO_SVG = require('~/assets/svgs/logo-svg.svg');

const GOOGLE_SOURCE = {
  uri: 'https://www.pngall.com/wp-content/uploads/13/Google-Logo.png',
};

export default function AuthIndexScreen() {
  const alertRef = React.useRef<AlertRef>(null);
  // const colors = useColorScheme().colorScheme;
  const colors = useColorScheme().colors;

  const styles = StyleSheet.create({
    logo: {
      width: 100,
      height: 100,
    },
    container: {
      // backgroundColor: colors.primary,
      flex: 1,
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View className="ios:justify-end flex-1 justify-center gap-4 px-8 py-4">
          <View className="items-center">
            {/* <Image
              source={LOGO_SOURCE}
              className="ios:h-48 ios:w-48 h-8 w-8"
              resizeMode="contain"
            /> */}
            <Logo width={120} height={120} />
          </View>
          <View className="ios:pb-5 ios:pt-2 pb-2">
            <Text className="ios:font-extrabold text-center text-3xl font-medium">
              Brace Yourself
            </Text>
            <Text className="ios:font-extrabold text-center text-3xl font-medium">
              for What's Next
            </Text>
          </View>
          <Link href="/auth/(create-account)" asChild>
            <Button size={Platform.select({ ios: 'lg', default: 'md' })}>
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
            <Image
              source={GOOGLE_SOURCE}
              className="absolute left-4 h-4 w-4"
              resizeMode="contain"
            />
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
      </SafeAreaView>
      <AlertAnchor ref={alertRef} />
    </>
  );
}
