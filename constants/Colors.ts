/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const gradientLighter = '#3B82F6';
const gradientDarker = '#1E3A8A';
const purpleGradient = '#6352FF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    destructive: '#BA1A1A',
    primary: '#0070E9',
    grey2: '#AFB0B4',
    grey: '#8E8E93',
    tripCardBackground: '#000',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    destructive: '#93000A',
    primary: '#0385FF',
    grey2: '#636366',
    grey: '#8E8E93',
    tripCardBackground: '#fff',
  },
  white: '#FFFFFF',
  black: '#000000',
  gradientOne: gradientLighter,
  gradientTwo: gradientDarker,
  purpleGradient: purpleGradient,
};
