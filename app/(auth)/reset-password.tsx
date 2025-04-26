import { StyleSheet, Image, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { isClerkAPIResponseError, useAuth, useSignIn } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';

import { useRouter, Link } from 'expo-router';
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

const ResetPasswordScreen = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { signIn, setActive, isLoaded } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resettingPassword, setResettingPassword] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const onResetPasswordPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrors([]);

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrors([]);

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)/(home)');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
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
          <View style={styles.contentContainer}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <Spacer size={24} vertical />

            <TextInput
              value={code}
              label={`Enter the verification code we sent to ${email}`}
              placeholder="Enter your verification code"
              onChangeText={setCode}
              labelColor={Colors.white}
              variant="outline"
              inputStyle={styles.text}
            />
            <Spacer size={8} vertical />
            <TextInput
              value={password}
              label="Enter your new password"
              placeholder="Enter your new password"
              secureTextEntry
              onChangeText={setPassword}
              labelColor={Colors.white}
              variant="outline"
              inputStyle={styles.text}
            />
            <Spacer size={8} vertical />
            {errors.map(error => (
              <ThemedText key={error.longMessage} style={{ color: 'red' }}>
                {error.longMessage}
              </ThemedText>
            ))}
            <Spacer size={24} vertical />
            <Button onPress={onVerifyPress} disabled={!code || !password}>
              Reset password
            </Button>
          </View>
        </ScreenContainer>
        <Image source={BIG_LOGO} style={styles.bigLogo} resizeMode="contain" />
      </>
    );
  }

  return (
    <>
      <LinearGradientScreen />
      <ScreenContainer style={styles.container} scrollable={false}>
        <View style={styles.contentContainer}>
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          <Spacer size={8} vertical />
          <ThemedText type="title" style={styles.text}>
            Reset password
          </ThemedText>
          <Spacer size={12} vertical />
          <ThemedText type="default" style={styles.body}>
            Enter your email to reset your password
          </ThemedText>

          <Spacer size={20} vertical />
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
            inputMode="email"
            variant="outline"
            label="Email"
            value={email}
            onChangeText={setEmail}
            labelColor={Colors.white}
            inputStyle={styles.text}
          />
          <Spacer size={30} vertical />

          <Button
            onPress={onResetPasswordPress}
            variant="filled"
            disabled={email === ''}>
            Reset password
          </Button>
          <Spacer size={30} vertical />
          <Link href=".." asChild>
            <Button
              variant="ghost"
              onPress={() => {}}
              textStyle={{ color: Colors.white }}
              outlineColor={Colors.white}
              style={{ width: '100%' }}>
              Go back
            </Button>
          </Link>
        </View>
      </ScreenContainer>
      <Image source={BIG_LOGO} style={styles.bigLogo} resizeMode="contain" />
    </>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 4,
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
});
