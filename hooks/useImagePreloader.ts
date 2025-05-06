import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { preloadDefaultImages } from '@/utils/imagePreloader';

const MINIMUM_LOADING_TIME = 3000; // 3 seconds in milliseconds

export const useImagePreloader = () => {
  const preloadImages = async () => {
    const startTime = Date.now();

    try {
      await preloadDefaultImages();
    } catch (error) {
      console.warn('Failed to preload default images:', error);
    }

    // Calculate how much time has passed
    const elapsedTime = Date.now() - startTime;

    // If less than 3 seconds have passed, wait for the remaining time
    if (elapsedTime < MINIMUM_LOADING_TIME) {
      await new Promise((resolve) =>
        setTimeout(resolve, MINIMUM_LOADING_TIME - elapsedTime)
      );
    }
  };

  return { preloadImages };
};
