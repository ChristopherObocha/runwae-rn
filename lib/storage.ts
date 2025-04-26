import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const storage = Platform.select({
  web: {
    getItem: (key: string) => {
      return localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
    },
  },
  default: AsyncStorage,
});
