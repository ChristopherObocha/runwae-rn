export interface Hotel {
  cc1: string;
  city_name: string;
  city_ufi: number | null;
  country: string;
  dest_id: string;
  dest_type: string;
  hotels: number;
  image_url: string;
  label: string;
  latitude: number;
  lc: string;
  longitude: number;
  name: string;
  nr_hotels: number;
  region: string;
  roundtrip: string;
  search_type: string;
  type: string;
}

interface DefaultHotels {
  data: Hotel[];
  message: string;
  status: boolean;
  timestamp: number;
}

export interface DefaultFriends {
  name: string;
  image: string;
}

const DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

export const createTripSlides = [
  {
    title: 'Welcome to Trip Planning',
    description: "Let's create your perfect journey together",
  },
  {
    title: 'Who is going?',
    description: 'Add people to your trip',
  },
  // {
  //   title: 'Set Your Dates',
  //   description: 'When are you planning to travel?',
  // },
  // {
  //   title: 'Travel Style',
  //   description: 'What kind of experience are you looking for?',
  // },
];

export const dummyProfiles = [
  {
    id: '1',
    name: 'Sarah Wilson',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Michael Chen',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Emma Thompson',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'James Rodriguez',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
  },
];

const DEFAULT_HOTELS: DefaultHotels = {
  data: [
    {
      cc1: 'us',
      city_name: 'New York',
      city_ufi: 20088325,
      country: 'United States',
      dest_id: '929',
      dest_type: 'district',
      hotels: 1267,
      image_url:
        'https://cf.bstatic.com/xdata/images/district/150x150/57691.jpg?k=de3390bd7f9a501b600f4954a39cb97aefe8ea5acaf438d75d689219a94fe981&o=',
      label: 'Manhattan, New York, New York, United States',
      latitude: 40.776115,
      lc: 'en',
      longitude: -73.970894,
      name: 'Manhattan',
      nr_hotels: 1267,
      region: 'New York',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAAoATICZW46A21hbkAASgBQAA==',
      search_type: 'district',
      type: 'di',
    },
    {
      cc1: 'us',
      city_name: 'Manchester',
      city_ufi: null,
      country: 'United States',
      dest_id: '20079942',
      dest_type: 'city',
      hotels: 21,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/980138.jpg?k=13118c0c36fd028243e14cd7fbd70f7e9b0364ef8dfc82e82791d3022aac8bc7&o=',
      label: 'Manchester, New Hampshire, United States',
      latitude: 42.9956,
      lc: 'en',
      longitude: -71.4553,
      name: 'Manchester',
      nr_hotels: 21,
      region: 'New Hampshire',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAEoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
    {
      cc1: 'gb',
      city_name: 'Manchester',
      city_ufi: null,
      country: 'United Kingdom',
      dest_id: '-2602512',
      dest_type: 'city',
      hotels: 1088,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/976977.jpg?k=8d13c94917fa00569d115c9123c7b5789ad41f7383b6fad32a1bda8e215e8936&o=',
      label: 'Manchester, Greater Manchester, United Kingdom',
      latitude: 53.4812,
      lc: 'en',
      longitude: -2.23615,
      name: 'Manchester',
      nr_hotels: 1088,
      region: 'Greater Manchester',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAIoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
    {
      cc1: 'ph',
      city_name: 'Manila',
      city_ufi: null,
      country: 'Philippines',
      dest_id: '-2437894',
      dest_type: 'city',
      hotels: 4803,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/685726.jpg?k=25b602b90c38b13fe9e858b62a9bbd3c773bf459b16e84b26642a8a056c9f524&o=',
      label: 'Manila, Luzon, Philippines',
      latitude: 14.5967655,
      lc: 'en',
      longitude: 120.98368,
      name: 'Manila',
      nr_hotels: 4803,
      region: 'Luzon',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAMoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
    {
      cc1: 'bh',
      city_name: 'Manama',
      city_ufi: null,
      country: 'Bahrain',
      dest_id: '-784833',
      dest_type: 'city',
      hotels: 199,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/654907.jpg?k=ad1646e402771be9a1e984c4a4aea71121a2ae474b4bbc99386ccc0ef04f5c7c&o=',
      label: 'Manama, Capital Governorate, Bahrain',
      latitude: 26.2235,
      lc: 'en',
      longitude: 50.58224,
      name: 'Manama',
      nr_hotels: 199,
      region: 'Capital Governorate',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAQoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
  ],
  message: 'Success',
  status: true,
  timestamp: 1737075666567,
};

const SEARCH_HOTELS_MAN = {
  API_URL:
    'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=man',
  API_OPTIONS: {
    method: 'GET',
    headers: {
      KEY: '2c964c95c5msh955042ea31151c5p14714djsn9777c2d3252d',
      HOST: 'booking-com15.p.rapidapi.com',
    },
  },
};
const CATEGORY_ITEMS = [
  {
    type: 'All',
    icon: 'all',
    isActive: false,
  },
  {
    type: 'Hotels',
    icon: 'hotel',
    isActive: false,
  },
  {
    type: 'Restaurants',
    icon: 'restaurant',
    isActive: false,
  },
  {
    type: 'Attractions',
    icon: 'attraction',
    isActive: false,
  },
  {
    type: 'Events',
    icon: 'event',
    isActive: false,
  },
  {
    type: 'Shopping',
    icon: 'shopping',
    isActive: false,
  },
  {
    type: 'Transportation',
    icon: 'transportation',
    isActive: false,
  },
  {
    type: 'Rentals',
    icon: 'rental',
    isActive: false,
  },
  {
    type: 'Entertainment',
    icon: 'entertainment',
    isActive: false,
  },
  {
    type: 'Other',
    icon: 'other',
  },
];

export interface Event {
  name: string;
  description: string;
  image: string;
  stars: number;
  type: string;
  location: string;
  isLiked: boolean | null;
}

const EVENTS_AND_EXPERIENCES: Event[] = [
  {
    name: 'The Grand Vesper',
    description:
      'A luxurious retreat in the heart of Vienna, The Grand Vesper blends classical elegance with modern sophistication....more',
    image:
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&auto=format&fit=crop',
    stars: 5,
    type: 'Event',
    location: 'Vienna, Austria',
    isLiked: null,
  },
  {
    name: 'Tokyo Street Food Tour',
    description:
      "Explore the vibrant flavors of Tokyo's hidden food scene. Journey through traditional markets and local favorites....more",
    image:
      'https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&auto=format&fit=crop',
    stars: 4.8,
    type: 'Experience',
    location: 'Tokyo, Japan',
    isLiked: null,
  },
  {
    name: 'Barcelona Wine Festival',
    description:
      "Annual celebration of Catalunya's finest wines, featuring tastings, workshops, and pairings with local cuisine....more",
    image:
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop',
    stars: 4.9,
    type: 'Event',
    location: 'Barcelona, Spain',
    isLiked: null,
  },
  {
    name: 'Northern Lights Adventure',
    description:
      "Chase the aurora borealis through Iceland's stunning landscapes. Includes professional photography guidance....more",
    image:
      'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&auto=format&fit=crop',
    stars: 5,
    type: 'Experience',
    location: 'Reykjavik, Iceland',
    isLiked: null,
  },
  {
    name: 'Sydney Opera House Tour',
    description:
      "Behind-the-scenes access to one of the world's most iconic performing arts venues. Exclusive backstage access....more",
    image:
      'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800&auto=format&fit=crop',
    stars: 4.7,
    type: 'Experience',
    location: 'Sydney, Australia',
    isLiked: null,
  },
  {
    name: 'Marrakech Cooking Class',
    description:
      'Learn traditional Moroccan cooking techniques in a historic riad. Includes spice market tour and lunch....more',
    image:
      'https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?w=800&auto=format&fit=crop',
    stars: 4.9,
    type: 'Experience',
    location: 'Marrakech, Morocco',
    isLiked: null,
  },
  {
    name: 'Rio Carnival Experience',
    description:
      "VIP access to Rio's world-famous carnival, including samba school visits and parade participation....more",
    image:
      'https://images.unsplash.com/photo-1518019671582-55004f1bc9ab?w=800&auto=format&fit=crop',
    stars: 4.8,
    type: 'Event',
    location: 'Rio de Janeiro, Brazil',
    isLiked: null,
  },
  {
    name: 'Greek Island Sailing',
    description:
      'Navigate through the crystal waters of the Aegean Sea, exploring hidden coves and ancient coastal ruins....more',
    image:
      'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&auto=format&fit=crop',
    stars: 4.6,
    type: 'Experience',
    location: 'Cyclades, Greece',
    isLiked: null,
  },
];

export const tempConstants = {
  DEFAULT_HOTELS_STRING: JSON.stringify(DEFAULT_HOTELS),
  DEFAULT_HOTELS_PARSED: DEFAULT_HOTELS,
  DEFAULT_HOTELS,
  SEARCH_HOTELS_MAN,
  CATEGORY_ITEMS,
  EVENTS_AND_EXPERIENCES,
  ...DIRECTIONS,
};
