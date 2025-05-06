import { Image } from 'expo-image';

// Define default images
export const DEFAULT_IMAGES = {
  TRIP_COVER:
    'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?cs=srgb&dl=pexels-vince-2265876.jpg',
  // Add more default images here as needed
  // PROFILE_PLACEHOLDER: '...',
  // EVENT_COVER: '...',
} as const;

// Cache to track preloaded images
const preloadedImages = new Set<string>();

/**
 * Preloads a single image
 * @param url The URL of the image to preload
 * @returns Promise that resolves when the image is preloaded
 */
export const preloadImage = async (url: string): Promise<void> => {
  if (!url || preloadedImages.has(url)) return;

  try {
    await Image.prefetch(url);
    preloadedImages.add(url);
  } catch (error) {
    console.warn(`Failed to preload image: ${url}`, error);
  }
};

/**
 * Preloads multiple images
 * @param urls Array of image URLs to preload
 * @returns Promise that resolves when all images are preloaded
 */
export const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(urls.map((url) => preloadImage(url)));
};

/**
 * Preloads all default images
 * @returns Promise that resolves when all default images are preloaded
 */
export const preloadDefaultImages = async (): Promise<void> => {
  const defaultImageUrls = Object.values(DEFAULT_IMAGES);
  await preloadImages(defaultImageUrls);
};

/**
 * Checks if an image has been preloaded
 * @param url The URL of the image to check
 * @returns boolean indicating if the image has been preloaded
 */
export const isImagePreloaded = (url: string): boolean => {
  return preloadedImages.has(url);
};
