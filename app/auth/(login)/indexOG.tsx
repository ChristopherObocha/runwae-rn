import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, AppState, Platform, StyleSheet, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '~/components/Logo';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';
import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColorScheme().colors;

  const [focusedTextField, setFocusedTextField] = React.useState<'email' | 'password' | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      return console.log(error);
    }

    setLoading(false);
    router.replace('/');
  }

  // const handleFormItemSubmit =

  const styles = StyleSheet.create({
    container: {
      paddingBottom: insets.bottom,
      backgroundColor: colors.background,
    },
  });
  return (
    <View className="ios:bg-card flex-1" style={styles.container}>
      <KeyboardAwareScrollView
        bottomOffset={Platform.select({ ios: 175 })}
        bounces={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="ios:pt-12 pt-20">
        <View className="ios:px-12 flex-1 px-8">
          <View className="items-center pb-1">
            <View className="ios:h-12 ios:w-12 h-8 w-8 items-center justify-center">
              <Logo width={Platform.select({ ios: 180, default: 72 })} color={COLORS.gradientOne} />
            </View>
            <Text variant="title3" className="ios:font-bold pb-1 pt-4 text-center">
              {Platform.select({ ios: 'Welcome back!', default: 'Log in' })}
            </Text>
            {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">Welcome back!</Text>
            )}
          </View>
          <View className="ios:pt-4 flex-1 pt-6">
            <Form className="flex-1 gap-2">
              <FormSection className="ios:bg-background flex-1">
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Email', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Email' })}
                    onSubmitEditing={(event) => {
                      setEmail(event.nativeEvent.text);
                      KeyboardController.setFocusTo('next');
                    }}
                    submitBehavior="submit"
                    autoFocus
                    onFocus={() => setFocusedTextField('email')}
                    onBlur={() => setFocusedTextField(null)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    autoCapitalize="none"
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Password', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Password' })}
                    onFocus={() => setFocusedTextField('password')}
                    onBlur={() => setFocusedTextField(null)}
                    // secureTextEntry
                    returnKeyType="done"
                    textContentType="password"
                    autoCapitalize="none"
                    onSubmitEditing={(event) => {
                      setPassword(event.nativeEvent.text);
                      signInWithEmail();
                    }}
                  />
                </FormItem>
              </FormSection>
              <View className="flex-row">
                <Link asChild href="/auth/(login)/forgot-password">
                  <Button size="sm" variant="plain" className="px-0.5">
                    <Text className="text-sm text-primary">Forgot password?</Text>
                  </Button>
                </Link>
              </View>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView
        offset={{
          closed: 0,
          opened: Platform.select({ ios: insets.bottom + 30, default: insets.bottom }),
        }}>
        {Platform.OS === 'ios' ? (
          <View className=" px-12 py-4">
            <Button
              size="lg"
              onPress={() => {
                signInWithEmail();
              }}>
              {loading ? <ActivityIndicator /> : <Text>Continue</Text>}
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-between py-4 pl-6 pr-8">
            <Button
              variant="plain"
              className="px-2"
              onPress={() => {
                router.replace('/auth/(create-account)');
              }}>
              <Text className="px-0.5 text-sm text-primary">Create Account</Text>
            </Button>
            <Button
              onPress={() => {
                if (focusedTextField === 'email') {
                  KeyboardController.setFocusTo('next');
                  return;
                }
                KeyboardController.dismiss();
                router.replace('/');
              }}>
              <Text className="text-sm">{focusedTextField === 'email' ? 'Next' : 'Submit'}</Text>
            </Button>
          </View>
        )}
      </KeyboardStickyView>
      {Platform.OS === 'ios' && (
        <Button
          variant="plain"
          onPress={() => {
            router.replace('/auth/(create-account)');
          }}>
          <Text className="text-sm text-primary">Create Account</Text>
        </Button>
      )}
    </View>
  );
}
