import { Platform } from 'react-native';

const IOS_SYSTEM_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  gradientOne: '#3B82F6',
  gradientTwo: '#1E3A8A',
  light: {
    grey6: '#F2F2F7',
    grey5: '#E6E6EB',
    grey4: '#D2D2D7',
    grey3: '#C7C7CC',
    grey2: '#AFB0B4',
    grey: '#8E8E93',
    background: '#F2F2F7',
    foreground: '#000000',
    root: '#FFFFFF',
    card: '#FFFFFF',
    destructive: '#FF382B',
    primary: '#007BFE',
  },
  dark: {
    grey6: '#151518',
    grey5: '#28282A',
    grey4: '#373739',
    grey3: '#464649',
    grey2: '#636366',
    grey: '#8E8E93',
    background: '#000000',
    foreground: '#FFFFFF',
    root: '#000000',
    card: '#1C1C1E',
    destructive: '#FE4336',
    primary: '#0385FF',
  },
} as const;

const ANDROID_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  gradientOne: '#3B82F6',
  gradientTwo: '#1E3A8A',
  light: {
    grey6: '#F9F9FF',
    grey5: '#D7D9E4',
    grey4: '#C1C6D7',
    grey3: '#717786',
    grey2: '#414754',
    grey: '#181C23',
    background: '#F9F9FF',
    foreground: '#000000',
    root: '#FFFFFF',
    card: '#FFFFFF',
    destructive: '#BA1A1A',
    primary: '#0070E9',
  },
  dark: {
    grey6: '#10131B',
    grey5: '#272A32',
    grey4: '#31353D',
    grey3: '#363942',
    grey2: '#8B90A0',
    grey: '#C1C6D7',
    background: '#000000',
    foreground: '#FFFFFF',
    root: '#000000',
    card: '#10131B',
    destructive: '#93000A',
    primary: '#0385FF',
  },
} as const;

const COLORS = Platform.OS === 'ios' ? IOS_SYSTEM_COLORS : ANDROID_COLORS;

export { COLORS }; 