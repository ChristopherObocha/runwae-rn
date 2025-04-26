import { useCallback } from 'react';
import { randomUUID } from 'expo-crypto';
import { useRemoteRowId } from 'tinybase/ui-react';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  Cell,
  createMergeableStore,
  createRelationships,
  Value,
} from 'tinybase/with-schemas';
import { useUserIdAndNickname } from '@/hooks/useNickname';
import { useCreateClientPersisterAndStart } from '@/stores/persistence/useCreateClientPersisterAndStart';
import { useCreateServerSynchronizerAndStart } from './synchronization/useCreateServerSynchronizerAndStart';
// import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useUser } from '@clerk/clerk-expo';

const STORE_ID_PREFIX = 'tripStore-';

const VALUES_SCHEMA = {
  tripId: { type: 'string' },
  name: { type: 'string' },
  description: { type: 'string' },
  destination: { type: 'string' },
  status: { type: 'string' },
  budget: { type: 'string' },
  tags: { type: 'string' },
  coverImage: { type: 'string' },
  locations: { type: 'string' },
  notes: { type: 'string' },
  createdBy: { type: 'string' },
  startDate: { type: 'string' },
  endDate: { type: 'string' },
  createdAt: { type: 'string' },
  updatedAt: { type: 'string' },
} as const;
const TABLES_SCHEMA = {
  itineraries: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    createdBy: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    destination: { type: 'string' },
    status: { type: 'string' },
    budget: { type: 'string' },
    tags: { type: 'string' },
    coverImage: { type: 'string' },
    locations: { type: 'string' },
    notes: { type: 'string' },
  },
  collaborators: {
    nickname: { type: 'string' },
  },
  participants: {
    id: { type: 'string' },
    itineraryId: { type: 'string' },
    userId: { type: 'string' },
    nickname: { type: 'string' },
    joinedAt: { type: 'string' },
  },
} as const;

type Schemas = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA];
type TripValueId = keyof typeof VALUES_SCHEMA;
type TripItineraryCellId = keyof (typeof TABLES_SCHEMA)['itineraries'];
type TripField =
  | 'tripId'
  | 'name'
  | 'description'
  | 'createdAt'
  | 'updatedAt'
  | 'startDate'
  | 'endDate';

const {
  useCell,
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideRelationships,
  useProvideStore,
  useRowCount,
  useSetCellCallback,
  useSetValueCallback,
  useSortedRowIds,
  useStore,
  useCreateRelationships,
  useTable,
  useValue,
  useValuesListener,
  useRowIds,
} = UiReact as UiReact.WithSchemas<Schemas>;

const useStoreId = (tripId: string) => STORE_ID_PREFIX + tripId;

// Returns a callback that adds a new itinerary to the trip.
export const useAddTripItineraryCallback = (tripId: string) => {
  const store = useStore(useStoreId(tripId));
  const [userId] = useUserIdAndNickname();
  return useCallback(
    (name: string, description: string) => {
      const id = randomUUID();
      store.setRow('itineraries', id, {
        id,
        name,
        description,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startDate: new Date().toISOString(),
        destination: '',
        status: 'planned',
        budget: '',
        tags: '',
        coverImage: '',
        locations: '',
      });
      return id;
    },
    [store, tripId]
  );
};

// Returns a callback that deletes a itinerary from the trip.
export const useDelTripItineraryCallback = (
  tripId: string,
  itineraryId: string
) => useDelRowCallback('itineraries', itineraryId, useStoreId(tripId));

// Returns a pair of 1) a property of the trip, 2) a callback that
// updates it, similar to the React useState pattern.
export const useTripValue = <ValueId extends TripValueId>(
  tripId: string,
  valueId: ValueId
): [
  Value<Schemas[1], ValueId>,
  (value: Value<Schemas[1], ValueId>) => void,
] => [
  useValue(valueId, useStoreId(tripId)),
  useSetValueCallback(
    valueId,
    (value: Value<Schemas[1], ValueId>) => value,
    [],
    useStoreId(tripId)
  ),
];

// Returns the itinerary IDs of the trip, sorted by the specified cell.
export const useTripItineraryIds = (
  tripId: string,
  cellId: TripItineraryCellId = 'createdAt',
  descending?: boolean,
  offset?: number,
  limit?: number
) =>
  useSortedRowIds(
    'itineraries',
    cellId,
    descending,
    offset,
    limit,
    useStoreId(tripId)
  );

// Returns the number of itineraries in the trip.
export const useTripItineraryCount = (tripId: string) =>
  useRowCount('itineraries', useStoreId(tripId));

// Returns a pair of 1) a property of a itinerary in the trip, 2) a
// callback that updates it, similar to the React useState pattern.
export const useTripItineraryCell = <CellId extends TripItineraryCellId>(
  tripId: string,
  itineraryId: string,
  cellId: CellId
): [
  Cell<Schemas[0], 'itineraries', CellId>,
  (cell: Cell<Schemas[0], 'itineraries', CellId>) => void,
] => [
  useCell('itineraries', itineraryId, cellId, useStoreId(tripId)),
  useSetCellCallback(
    'itineraries',
    itineraryId,
    cellId,
    (cell: Cell<Schemas[0], 'itineraries', CellId>) => cell,
    [],
    useStoreId(tripId)
  ),
];

// Returns the nickname of the person who created the itinerary.
export const useTripItineraryCreatedByNickname = (
  tripId: string,
  itineraryId: string
) => {
  const userId = useRemoteRowId(
    'createdByNickname',
    itineraryId,
    useStoreId(tripId)
  );
  return useCell('collaborators', userId, 'nickname', useStoreId(tripId));
};

// Returns the nicknames of people involved in this trip.
export const useTripUserNicknames = (tripId: string) =>
  Object.entries(useTable('collaborators', useStoreId(tripId))).map(
    ([, { nickname }]) => nickname
  );

type Budget = {
  amount: number;
  currency: string;
};

export const getTripParsedValues = (tripId: string) => {
  const getBudget = (budgetStr: string) => JSON.parse(budgetStr) as Budget;
  const getTags = (tagsStr: string) => JSON.parse(tagsStr) as string[];
  const getLocations = (locationsStr: string) =>
    JSON.parse(locationsStr) as string[];
  return {
    getBudget,
    getTags,
    getLocations,
  };
};

// Create, persist, and sync a store containing the trip and itineraries.
export default function TripStore({
  tripId,
  useValuesCopy,
}: {
  tripId: string;
  useValuesCopy: (id: string) => [string, (valuesCopy: string) => void];
}) {
  const storeId = useStoreId(tripId);
  const [userId, nickname] = useUserIdAndNickname();
  const [valuesCopy, setValuesCopy] = useValuesCopy(tripId);

  const store = useCreateMergeableStore(() =>
    createMergeableStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
  );

  // Add listener to values for updating the parent 'lists store' copy.
  useValuesListener(
    () => setValuesCopy(JSON.stringify({ ...store.getValues(), tripId })),
    [setValuesCopy],
    false,
    store
  );

  // Persist store (with initial content if it hasn't been saved before), then
  // ensure the current user is added as a collaborator.
  useCreateClientPersisterAndStart(storeId, store, valuesCopy, () =>
    store.setRow('collaborators', userId, { nickname })
  );
  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);

  // Create relationship between itineraries (createdBy) and collaborators tables.
  const relationships = useCreateRelationships(store, store =>
    createRelationships(store).setRelationshipDefinition(
      'createdByNickname',
      'itineraries',
      'collaborators',
      'createdBy'
    )
  );
  useProvideRelationships(storeId, relationships);

  return null;
}

export function useTripItineraryParticipants(
  tripId: string,
  itineraryId: string
) {
  const store = useStore(useStoreId(tripId));
  const [userId] = useUserIdAndNickname();
  const participants = useTable('participants', store);

  const participantList = Object.values(participants)
    .filter(p => p.itineraryId === itineraryId)
    .map(p => ({
      nickname: p.nickname || '',
      userId: p.userId || '',
    }));

  const isParticipant = participantList.some(p => p.userId === userId);

  return { participants: participantList, isParticipant };
}

export function useAddTripItineraryParticipant(
  tripId: string,
  itineraryId: string
) {
  const store = useStore(useStoreId(tripId));
  const [userId, nickname] = useUserIdAndNickname();

  return useCallback(() => {
    const participantId = randomUUID();
    store.setRow('participants', participantId, {
      id: participantId,
      itineraryId,
      userId,
      nickname,
      joinedAt: new Date().toISOString(),
    });
  }, [store, itineraryId, userId, nickname]);
}
