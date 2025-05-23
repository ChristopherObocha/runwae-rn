import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ENDPOINTS } from '~/hooks/client/endpoints';

const { baseAmadeus } = ENDPOINTS;
const AMADEUS_TOKEN_KEY = 'amadeus_token';
const AMADEUS_TOKEN_EXPIRY_KEY = 'amadeus_token_expiry';

interface AmadeusToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class AmadeusService {
  private static instance: AmadeusService;
  private baseUrl = 'https://test.api.amadeus.com/v1';
  private clientId: string;
  private clientSecret: string;

  private constructor() {
    // Initialize with your Amadeus API credentials
    this.clientId = process.env.EXPO_PUBLIC_AMADEUS_CLIENT_ID || '';
    this.clientSecret = process.env.EXPO_PUBLIC_AMADEUS_CLIENT_SECRET || '';
  }

  public static getInstance(): AmadeusService {
    if (!AmadeusService.instance) {
      AmadeusService.instance = new AmadeusService();
    }
    return AmadeusService.instance;
  }

  private async getToken(): Promise<string> {
    try {
      // Check if we have a valid token in storage
      const storedToken = await SecureStore.getItemAsync(AMADEUS_TOKEN_KEY);
      const tokenExpiry = await SecureStore.getItemAsync(
        AMADEUS_TOKEN_EXPIRY_KEY
      );

      if (storedToken && tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry);
        // If token is still valid (with 5 minute buffer)
        if (Date.now() < expiryTime - 300000) {
          return storedToken;
        }
      }

      // If no valid token, request a new one
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const tokenData: AmadeusToken = response.data;

      // Store the new token and its expiry
      await SecureStore.setItemAsync(AMADEUS_TOKEN_KEY, tokenData.access_token);
      console.log('token: ', tokenData.access_token);
      const expiryTime = Date.now() + tokenData.expires_in * 1000;
      await SecureStore.setItemAsync(
        AMADEUS_TOKEN_EXPIRY_KEY,
        expiryTime.toString()
      );

      return tokenData.access_token;
    } catch (error) {
      console.error('Error getting Amadeus token:', error);
      throw error;
    }
  }

  public async makeRequest(
    endpoint: string,
    method: string = 'GET',
    data?: any
  ) {
    try {
      const token = await this.getToken();

      const response = await axios({
        method,
        // url: `${this.baseUrl}${endpoint}`,
        url: 'https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=MA&keyword=Marrakesh',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      return response.data;
    } catch (error) {
      console.error('Error making Amadeus request:', error);
      throw error;
    }
  }
}
