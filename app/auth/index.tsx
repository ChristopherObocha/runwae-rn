import { Canvas, RadialGradient, Rect, vec } from '@shopify/react-native-skia';
import { router } from 'expo-router';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlertAnchor } from '~/components/nativewindui/Alert';
import { AlertRef } from '~/components/nativewindui/Alert/types';
import { Text } from '~/components/nativewindui/Text';
import { appColors } from '~/utils/styles';
import { supabase } from '~/utils/supabase';

export default function AuthIndexScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  const alertRef = React.useRef<AlertRef>(null);
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

  async function signInWithEmail() {
    setLoading(true);

    // Add validation
    if (!email || !password) {
      alertRef.current?.alert({
        title: 'Error',
        message: 'Please enter both email and password',
        buttons: [{ text: 'OK', style: 'cancel' }],
      });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Error:', error);
      alertRef.current?.prompt({
        title: 'Error',
        prompt: {
          type: 'login-password',
        },
        message: error.message,
        buttons: [{ text: 'OK', style: 'cancel' }],
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/');
    console.log('Login successful:', data);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: insets.top + 20,
      marginBottom: insets.bottom + 20,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    headerContainer: {
      paddingTop: 40,
    },
    canvas: {
      ...StyleSheet.absoluteFillObject,
    },
    button: {
      backgroundColor: '#FFF',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 12,
      alignItems: 'center',
    },
    buttonText: {
      color: '#EA5809',
      fontSize: 16,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'Inter',
      color: appColors.white,
      lineHeight: 48,
    },
    description: {
      fontSize: 16,
      fontFamily: 'Inter_500Medium',
      color: appColors.white,
      marginTop: 8,
      lineHeight: 24,
    },
    input: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: appColors.white,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      height: 50,
      color: appColors.white,
    },
    inputFocused: {
      borderColor: appColors.white,
      borderWidth: 2,
    },
    inputContainer: {
      gap: 16,
      paddingBottom: 20,
    },
  });

  const NextButton = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={signInWithEmail}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={vec(width + 50, height / 2)}
            r={height * 0.6}
            colors={[appColors.white, appColors.gradientOrange]}
          />
        </Rect>
      </Canvas>

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Get Started.</Text>
            <Text style={styles.description}>
              Your journey begins here. Let's make travel simple and exciting!
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={appColors.white}
              value={email}
              onChangeText={setEmail}
              style={[styles.input, isInputFocused && styles.inputFocused]}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={appColors.white}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, isPasswordFocused && styles.inputFocused]}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <NextButton />
          </View>
        </View>
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
}
