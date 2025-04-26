import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log('Token found in cache', key);
        } else {
          console.log('No values found under key', key);
        }
        return item;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined;