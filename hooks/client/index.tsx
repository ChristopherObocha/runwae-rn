/*
 * Jira Ticket:
 * Created Date: Fri, 18th Feb 2022, 11:06:00 am
 * Author: Rafiul Ansari
 * Email: raf.ansari@thedistance.co.uk
 * Copyright (c) 2022 The Distance
 */

import { useAuth } from '@clerk/clerk-expo';
import React, { useCallback, useMemo } from 'react';
// import DeviceInfo from 'react-native-device-info';

// import {useAuth, useDictionary} from '@/hooks';
import { fetchRequest } from '@/hooks/client/fetchRequest';
import { constants } from '@/utils/constants';
import { getObject } from '@/utils/storage-utils';

const { TOKENS } = constants;

interface ClientContextType {
  request: (method: string, path: string, params?: any) => Promise<any>;
}

export const Context = React.createContext<ClientContextType | null>(null);

export function useClient() {
  const context = React.useContext(Context);
  if (context === undefined || context === null) {
    throw new Error(
      '`ClientHook` hook must be used within a `ClientProvider` component'
    );
  }
  return context;
}

export function ClientProvider(props) {
  const { getToken } = useAuth();
  const { ANDROID, IOS } = constants;

  // const {dictionary} = useDictionary();
  // const {DownloadPermission} = dictionary;

  const request = useCallback(
    async (method: string, path: string, params?: any) => {
      const tokensObj = getToken() ?? (await getObject(TOKENS));
      const response = await fetchRequest({
        method,
        path,
        params,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokensObj?.access_token}`,
        },
      });
      return response;
    },
    [getToken, getObject, fetchRequest]
  );

  const values = useMemo(() => ({ request }), [request]);

  return <Context.Provider value={values}>{props.children}</Context.Provider>;
}
