import { TextStyle } from 'react-native';

export const appColors = {
  purple: '#3E63DD',
  lightPurple: 'rgba(62, 99, 221, 0.28)',
  grey: '#ECEBEB',
  grey2: '#686868',
  grey3: '#454545',
  grey4: '#333333',
  grey5: '#636363',
  black: '#33363F',
  textBlack: '#252525',
  textGrey: '#747272',
  textH1: '#4B4B4B',
  pitchBlack: '#1C1C1C',
  pureBlack: '#000000',
  white: '#FFFFFF',
  gradientOne: '#3B82F6',
  gradientTwo: '#1E3A8A',
};

export const textStyles: Record<string, TextStyle> = {
  medium_22: {
    fontSize: 22,
    fontFamily: 'SFProText-Bold',
    color: appColors.textH1,
  },
  medium_17: {
    fontSize: 17,
    fontFamily: 'SFProText-Medium',
    color: appColors.pitchBlack,
  },
  medium_8: {
    fontSize: 8,
    fontFamily: 'SFProText-Medium',
  },
  regular_8: {
    fontSize: 8,
    fontFamily: 'SFProText-Regular',
    color: appColors.grey2,
  },
  regular_10: {
    fontSize: 10,
    fontFamily: 'SFProText-Regular',
  },
  regular_12: {
    fontSize: 12,
    fontFamily: 'SFProText-Regular',
  },
  regular_14: {
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
  },
};
