import { TextStyle } from 'react-native';

export const appColors = {
  purple: '#3E63DD',
  lightPurple: 'rgba(62, 99, 221, 0.28)',
  grey: '#ECEBEB',
  grey2: '#686868',
  grey3: '#454545',
  grey4: '#333333',
  black: '#33363F',
  textBlack: '#252525',
  textH1: '#4B4B4B',
  pitchBlack: '#1C1C1C',
  white: '#FFFFFF',
  gradientOne: '#3B82F6',
  gradientTwo: '#1E3A8A',
};

export const textStyles: Record<string, TextStyle> = {
  medium_22: {
    fontSize: 22,
    fontFamily: 'Inter-Medium',
    color: appColors.textH1,
  },
  medium_17: {
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    color: appColors.pitchBlack,
  },
  regular_8: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: appColors.grey2,
  },
  regular_10: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
};
