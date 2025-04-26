import React, { useCallback } from 'react';
import { randomUUID } from 'expo-crypto';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import { createMergeableStore, NoValuesSchema } from 'tinybase/with-schemas';
import { useCreateClientPersisterAndStart } from '@/stores/persistence/useCreateClientPersisterAndStart';
import { useUser } from '@clerk/clerk-expo';

import TripStore from './TripStore';
import { useCreateServerSynchronizerAndStart } from './synchronization/useCreateServerSynchronizerAndStart';

const STORE_ID_PREFIX = 'tripListsStore-';

const TABLES_SCHEMA = {
  trips: {
    id: { type: 'string' },
    valuesCopy: { type: 'string' },
  },
} as const;

const {
  useCell,
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideStore,
  useRowIds,
  useSetCellCallback,
  useSortedRowIds,
  useStore,
  useTable,
} = UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

const useStoreId = () => STORE_ID_PREFIX + useUser().user.id;

// Returns a callback that adds a new trip to the store.
export const useAddTripCallback = () => {
  const store = useStore(useStoreId());
  return useCallback(
    (name: string, description: string, startDate: string, endDate: string) => {
      const id = randomUUID();
      store.setRow('trips', id, {
        id,
        valuesCopy: JSON.stringify({
          id,
          name,
          description,
          startDate,
          endDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      return id;
    },
    [store]
  );
};

// Returns a callback that adds an existing trip to the store.
export const useJoinTripCallback = () => {
  const store = useStore(useStoreId());
  return useCallback(
    (tripId: string) => {
      store.setRow('trips', tripId, {
        id: tripId,
        valuesCopy: '{}',
      });
    },
    [store]
  );
};

export const useValuesCopy = (
  id: string
): [string, (valuesCopy: string) => void] => [
  useCell('trips', id, 'valuesCopy', useStoreId()),
  useSetCellCallback(
    'trips',
    id,
    'valuesCopy',
    (valuesCopy: string) => valuesCopy,
    [],
    useStoreId()
  ),
];

// Returns a callback that deletes a trip from the store.
export const useDelTripCallback = (id: string) =>
  useDelRowCallback('trips', id, useStoreId());

// Returns the IDs of all trips in the store.
export const useTripIds = () => useRowIds('trips', useStoreId());

// Returns the (copy of) values of up to 10 trips in the store.
export const useTripValues = () =>
  Object.values(useTable('trips', useStoreId()))
    .slice(0, 10)
    .map(({ valuesCopy }) => {
      try {
        return JSON.parse(valuesCopy);
      } catch {
        return {};
      }
    });

// Create, persist, and sync a store containing the IDs of the trips.
export default function TripListsStore() {
  const storeId = useStoreId();
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setTablesSchema(TABLES_SCHEMA)
  );
  useCreateClientPersisterAndStart(storeId, store);
  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);

  // In turn 'render' (i.e. create) all of the trips themselves.
  return Object.entries(useTable('trips', storeId)).map(([tripId]) => (
    <TripStore tripId={tripId} key={tripId} useValuesCopy={useValuesCopy} />
  ));
}
