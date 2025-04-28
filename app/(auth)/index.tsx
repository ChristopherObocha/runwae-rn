import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import LinearGradientScreen from '@/components/LinearGradientScreen';
import ScreenContainer from '@/components/ScreenContainer';
import { Spacer } from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { Colors } from '@/constants/Colors';

const LOGO = require('@/assets/images/figma/4.png');
const BIG_LOGO = require('@/assets/images/figma/5.png');

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoaded) {
    return null;
  }

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    setIsSigningIn(true);
    setErrors([]);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
        });
        router.replace('/(tabs)/(home)');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <>
      <LinearGradientScreen />
      <ScreenContainer style={styles.container}>
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
            autoCapitalize="none"
            label="Email"
            value={email}
            onChangeText={setEmail}
            labelColor={Colors.white}
            inputStyle={styles.text}
          />
          <Spacer size={10} vertical />
          <View style={styles.passwordContainer}>
            <TextInput
              variant="outline"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              labelColor={Colors.white}
              inputStyle={styles.text}
              containerStyle={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
          {errors.map((error) => (
            <ThemedText key={error.longMessage} style={styles.errorText}>
              {error.longMessage}
            </ThemedText>
          ))}
          <Spacer size={20} vertical />
          <Button
            onPress={onSignInPress}
            variant="filled"
            disabled={email === '' || password === ''}
            loading={isSigningIn}
            textStyle={{ color: Colors[colorScheme].text }}>
            Sign In
          </Button>
          <Spacer size={30} vertical />

          <View style={styles.routeContainer}>
            <ThemedText
              type="default"
              style={styles.routeText}>{`Don't have an account?`}</ThemedText>
            <Button
              variant="ghost"
              onPress={() => router.push('/(auth)/sign-up')}
              textStyle={{
                color: Colors[colorScheme].primary,
              }}>
              Sign Up
            </Button>
          </View>
          <Spacer size={16} vertical />

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
          </View>
        </View>
      </ScreenContainer>
      <Image source={BIG_LOGO} style={styles.bigLogo} resizeMode="contain" />
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 4,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
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
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    top: 40,
  },
});
