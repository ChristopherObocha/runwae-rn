import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { supabase } from '~/utils/supabase';
import { Trip } from '~/hooks/useTrips';

// interface TripType {
//   id: string;
//   name: string;
//   description: string;
//   start_date: string;
//   end_date: string;
//   location: string;
//   image: string;
//   created_at?: string | Date;
//   updated_at?: string | Date;
//   members: string[];
//   itinerary: string[];
// }

interface TripsState {
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  getTrips: () => Promise<void>;
}

export const useTripsStore = create<TripsState>((set) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
  getTrips: async () => {
    const { data, error } = await supabase.from('trips').select('*');
    if (error) {
      console.error('Error fetching trips:', error);
    } else {
      set({ trips: data as Trip[] });
    }
  },
}));
