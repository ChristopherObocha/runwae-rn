import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  initialized: boolean;
  setHasCompletedOnboarding: (value: boolean) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  hasCompletedOnboarding: false,
  initialized: false,
  setHasCompletedOnboarding: async (value) => {
    await AsyncStorage.setItem('hasCompletedOnboarding', JSON.stringify(value));
    set({ hasCompletedOnboarding: value });
  },
  initialize: async () => {
    const value = await AsyncStorage.getItem('hasCompletedOnboarding');
    set({
      hasCompletedOnboarding: value === 'true',
      initialized: true,
    });
  },
}));
