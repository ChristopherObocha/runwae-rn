import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import { useRouter, Link, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import ScreenContainer from '@/components/ScreenContainer';
import LinearGradientScreen from '@/components/LinearGradientScreen';
import { Colors } from '@/constants/Colors';
import { Spacer } from '@/components/Spacer';
// import { Image } from "expo-image";
const LOGO = require('@/assets/images/figma/4.png');
const BIG_LOGO = require('@/assets/images/figma/5.png');

const SignUpScreen = () => {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const colorScheme = useColorScheme();
  if (!isLoaded) {
    return null;
  }

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setErrors([]);
    setIsLoading(true);

    // Start sign-up process using email and password provided
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setErrors([]);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error('signUpAttempt', JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <>
        <LinearGradientScreen />
        <ScreenContainer style={styles.container} scrollable={false}>
          {/* <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
              style={styles.contentContainer} 
              keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            > */}
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          <Spacer size={12} vertical />
          <ThemedText type="title" style={styles.text}>
            Verify your email
          </ThemedText>
          <Spacer size={12} vertical />
          <ThemedText type="default" style={styles.body}>
            We've sent a verification code to your email address.
          </ThemedText>
          <Spacer size={32} vertical />
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            onChangeText={code => setCode(code)}
            variant="outline"
            inputStyle={styles.text}
            keyboardType="numeric"
            autoCapitalize="none"
            inputMode="numeric"
          />
          {errors.map(error => (
            <ThemedText
              key={error.longMessage}
              type="default"
              style={styles.body}>
              {error.longMessage}
            </ThemedText>
          ))}
          <Spacer size={12} vertical />

          <Button
            onPress={onVerifyPress}
            loading={isLoading}
            variant="filled"
            disabled={code === ''}>
            Verify
          </Button>
          {/* </KeyboardAvoidingView> */}
        </ScreenContainer>
        <Image source={BIG_LOGO} style={styles.bigLogo} resizeMode="contain" />
      </>
    );
  }

  return (
    <>
      <LinearGradientScreen />
      <ScreenContainer style={styles.container} scrollable={true}>
        <View style={styles.contentContainer}>
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          <Spacer size={8} vertical />
          <ThemedText type="title" style={styles.text}>
            Welcome back
          </ThemedText>
          <Spacer size={12} vertical />
          <ThemedText type="default" style={styles.body}>
            Your journey begins here. Let's make travel simple and exciting!
          </ThemedText>

          <Spacer size={20} vertical />
          <TextInput
            variant="outline"
            label="Name"
            value={name}
            onChangeText={setName}
            labelColor={Colors.white}
            inputStyle={styles.text}
          />
          <Spacer size={10} vertical />
          <TextInput
            variant="outline"
            label="Email"
            value={email}
            onChangeText={setEmail}
            labelColor={Colors.white}
            inputStyle={styles.text}
            autoCapitalize="none"
          />
          <Spacer size={10} vertical />
          <TextInput
            variant="outline"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            labelColor={Colors.white}
            inputStyle={styles.text}
          />
          <Spacer size={12} vertical />
          {errors.map(error => (
            <ThemedText
              key={error.longMessage}
              type="default"
              style={[styles.body, { color: 'red' }]}>
              {error.longMessage}
            </ThemedText>
          ))}

          <Spacer size={12} vertical />

          <Button
            onPress={onSignUpPress}
            variant="filled"
            disabled={name === '' || email === '' || password === ''}>
            Sign Up
          </Button>
          <Spacer size={24} vertical />

          <View style={styles.routeContainer}>
            <ThemedText type="default" style={styles.routeText}>
              Already have an account?
            </ThemedText>
            <Button
              variant="ghost"
              onPress={() => router.push('/(auth)')}
              textStyle={{ color: Colors[colorScheme].primary }}>
              Sign In
            </Button>
          </View>
          {/* 
          <View style={styles.routeContainer}>
            <ThemedText type="default" style={styles.routeText}>
              Forgot your password?
            </ThemedText>
            <Button
              variant="ghost"
              onPress={() => router.push('/(auth)/reset-password')}
              textStyle={{ color: Colors[colorScheme].primary }}>
              Reset Password
            </Button>
          </View> */}
        </View>
      </ScreenContainer>
      <Image source={BIG_LOGO} style={styles.bigLogo} resizeMode="contain" />
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 4,
    // flex: 1,
    // backgroundColor: 'red',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    gap: 4,
  },
  logo: {
    width: 35,
    height: 50,
  },
  bigLogo: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  text: {
    color: Colors.white,
  },
  body: {
    color: Colors.white,
    fontSize: 12,
    lineHeight: 14,
  },
  routeContainer: {
    alignItems: 'center',
  },
  routeText: {
    color: Colors.white,
  },
});
