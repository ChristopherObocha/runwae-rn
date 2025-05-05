export interface TripItem {
  image?: string;
  title?: string;
  location?: string;
  members?: number;
  isFavorite?: boolean;
  date?: string;
  description?: string;
  promo?: number;
}

export interface Destination {
  destination: {
    image: string;
    title: string;
    location?: string;
    // id: string;
  };
}
