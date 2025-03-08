import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabase';

export interface Trip {
  id: string;
  name: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  location?: string;
  preferences?: [];
  start_date?: string;
  end_date?: string;
  members?: [];
}

export type CreateTripProps = {
  tripName: string;
  creatorId: string | undefined;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
};

interface TripsContextType {
  createTrip: (
    props: CreateTripProps
  ) => Promise<{ success: boolean; trip?: Trip }>;
  getTrips: () => Promise<Trip[]>;
  loading: boolean;
  trips: Trip[];
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const userId = user?.id;

  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (userId && trips?.length === 0) {
      getTrips();
    }
  }, [userId, trips]);

  const createTrip = async ({
    tripName,
    creatorId,
    description,
    startDate,
    endDate,
  }: CreateTripProps) => {
    setLoading(true);
    try {
      const createdAt = new Date().toISOString();

      const { data: trip, error: tripError } = await supabase
        .from('trip')
        .insert([
          {
            name: tripName,
            created_by: userId,
            created_at: createdAt,
          },
        ])
        .select()
        .single();

      if (tripError) {
        console.log('tripError: ', tripError);
        throw tripError;
      }

      return { success: true, trip };
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error
      ) {
        errorMessage = (error as { message: string }).message;
      }

      console.error('Error creating trip:', errorMessage);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const getTrips = async () => {
    try {
      const { data: trips, error } = await supabase.from('trip').select('*');
      if (error) throw error;

      setTrips(trips);
      return trips;
    } catch (error) {
      console.error('Error fetching trips:', error);
      return [];
    }
  };

  const value = {
    createTrip,
    getTrips,
    loading,
    trips,
  };

  return (
    <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};
