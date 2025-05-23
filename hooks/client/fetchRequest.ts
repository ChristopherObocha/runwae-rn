/*
 * Jira Ticket:
 * Created Date: Fri, 18th Feb 2022, 11:06:00 am
 * Author: Rafiul Ansari
 * Email: raf.ansari@thedistance.co.uk
 * Copyright (c) 2022 The Distance
 */

import axios from 'axios';
import { NativeModules, Platform } from 'react-native';

import { ENDPOINTS } from '@/hooks/client/endpoints';
import { constants } from '@/utils/constants';

const { AndroidFetchManager } = NativeModules;

const { DELETE, GET, POST, PUT, PATCH, ANDROID } = constants;

const apiConfig = {
  baseUrl: ENDPOINTS.baseurl,
};

function processResponse(response) {
  if (response?.status) {
    if (response.status >= 300) {
      console.log('ERROR: getting data from fetchRequest', response);
      return {
        success: false,
        error: {
          code: response.status,
          message: response.title,
        },
      };
    }

    return { success: true, data: response.data, headers: response.headers };
  }
  return { success: true, data: response.data, headers: response.headers };
}

export const fetchRequest = ({ method, path, headers, params }) => {
  let body;

  if (method === GET || method === DELETE) {
    if (params) path = path + params;
  } else {
    if (params) body = JSON.stringify(params);
  }

  const requestOptions = {
    method,
    headers,
    body,
  };
  const endpoint = encodeURI(apiConfig.baseUrl + path);

  if (Platform.OS === ANDROID) {
    return AndroidFetchManager.NativeFetch(endpoint, requestOptions) //Using AndroidNativeFetch to workaround GoodShape's Network Firewall leading to Significant slowing in android
      .then((result) => {
        return { success: true, data: result ? JSON.parse(result) : null };
      })
      .catch((error) => {
        console.log(`androidNativeFetch - error ${path}: `, {
          method,
          error: error?.message,
        });
        return { success: false, message: error?.message };
      });
  } else {
    const execute = () => {
      switch (method) {
        case GET:
          return axios.create(requestOptions).get(endpoint);
        case POST:
          return axios.create(requestOptions).post(endpoint, body);
        case PUT:
          return axios.create(requestOptions).put(endpoint, body);
        case DELETE:
          return axios.delete(endpoint, requestOptions);
        case PATCH:
          return axios.create(requestOptions).patch(endpoint, body);
        default:
          throw new Error('Invalid request method');
      }
    };

    return execute()
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        console.log(`fetchRequest - error ${path}: `, error);

        return {
          success: false,
          status: error?.response?.status,
          data: error?.response?.data,
          message: error?.message,
        };
      });
  }
};
