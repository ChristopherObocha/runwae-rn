import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Platform, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabase';

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/logo.28276aeb.png&w=2048&q=75',
};

export default function CredentialsScreen() {
  const params = useLocalSearchParams();
  const name = params.name ? JSON.parse(params.name as string) : null;
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<
    'email' | 'password' | 'confirm-password' | null
  >(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // console.log('name: ', name);
  const handleSubmit = () => {
    console.log('password: ', password);
    console.log('confirmPassword: ', confirmPassword);
    if (password === confirmPassword) {
      console.log('passwords match');
      signUpWithEmail();
    } else {
      console.log('passwords do not match');
    }
  };

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${name?.firstName} ${name?.lastName}`,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
    console.log('session: ', session);
  }

  return (
    <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
      <KeyboardAwareScrollView
        bottomOffset={Platform.select({ ios: 8 })}
        bounces={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="ios:pt-12 pt-20">
        <View className="ios:px-12 flex-1 px-8">
          <View className="items-center pb-1">
            <Image
              source={LOGO_SOURCE}
              className="ios:h-12 ios:w-12 h-8 w-8"
              resizeMode="contain"
            />
            <Text variant="title1" className="ios:font-bold pb-1 pt-4 text-center">
              {Platform.select({ ios: 'Set up your credentials', default: 'Create Account' })}
            </Text>
            {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">
                Set up your credentials
              </Text>
            )}
          </View>
          <View className="ios:pt-4 pt-6">
            <Form className="gap-2">
              <FormSection className="ios:bg-background">
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Email', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Email' })}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    submitBehavior="submit"
                    autoFocus
                    onFocus={() => setFocusedTextField('email')}
                    onBlur={() => setFocusedTextField(null)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    onChangeText={(val) => setEmail(val)}
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Password', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Password' })}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    onFocus={() => setFocusedTextField('password')}
                    onBlur={() => setFocusedTextField(null)}
                    submitBehavior="submit"
                    secureTextEntry
                    returnKeyType="next"
                    textContentType="newPassword"
                    onChangeText={(val) => setPassword(val)}
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Confirm password', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Confirm password' })}
                    onFocus={() => setFocusedTextField('confirm-password')}
                    onBlur={() => setFocusedTextField(null)}
                    // onSubmitEditing={() => router.replace('/')}
                    onSubmitEditing={handleSubmit}
                    secureTextEntry
                    returnKeyType="done"
                    textContentType="newPassword"
                    onChangeText={(val) => setConfirmPassword(val)}
                  />
                </FormItem>
              </FormSection>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
        {Platform.OS === 'ios' ? (
          <View className=" px-12 py-4">
            <Button
              size="lg"
              onPress={() => {
                // router.replace('/');
                handleSubmit();
              }}>
              <Text>Submit</Text>
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-end py-4 pl-6 pr-8">
            <Button
              onPress={() => {
                if (focusedTextField !== 'confirm-password') {
                  KeyboardController.setFocusTo('next');
                  return;
                }
                KeyboardController.dismiss();
                // router.replace('/');
                handleSubmit();
              }}>
              <Text className="text-sm">
                {focusedTextField !== 'confirm-password' ? 'Next' : 'Submit'}
              </Text>
            </Button>
          </View>
        )}
      </KeyboardStickyView>
    </View>
  );
}
