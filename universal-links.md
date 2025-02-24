# Setting Up Trip Invitations with Universal Links in React Native/Expo

## Database Setup (Supabase)

Create a `trip_invites` table with these columns:

- `id` (uuid, primary key)
- `trip_id` (uuid, foreign key to trip.id)
- `inviter_id` (uuid, foreign key to auth.users.id)
- `invitee_email` (string)
- `invite_code` (string, unique) - for link-based invites
- `invite_type` (enum: 'email', 'link')
- `status` (enum: 'pending', 'accepted', 'rejected')
- `created_at` (timestamp with timezone)
- `expires_at` (timestamp with timezone)

## Code Implementation

### 1. Helper Function (utils/helpers.ts)

```typescript
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

### 2. Create Screen (app/(tabs)/create.tsx)

```typescript
import React, { useState } from 'react';
import { View, Text, Alert, Button, TextInput, Share } from 'react-native';
import { generateRandomString } from '~/utils/helpers';
import Constants from 'expo-constants';
import * as Application from 'expo-application';

const CreateScreen = () => {
  const [tripName, setTripName] = useState('');
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [showInviteOptions, setShowInviteOptions] = useState(false);
  const [createdTrip, setCreatedTrip] = useState<{ id: string } | null>(null);

  const createInviteURL = (inviteCode: string) => {
    if (__DEV__ && !Application.applicationId) {
      // In Expo Go
      return `exp://${Constants.expoConfig?.hostUri}/join-trip/${inviteCode}`;
    } else {
      // In development client or production build
      return `https://runwae.io/join-trip/${inviteCode}`;
    }
  };

  const sendTripInvite = async (tripId: string, inviteeEmail: string) => {
    try {
      const { data: invite, error } = await supabase
        .from('trip_invites')
        .insert([
          {
            trip_id: tripId,
            inviter_id: userId,
            invitee_email: inviteeEmail,
            invite_type: 'email',
            status: 'pending',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          },
        ])
        .select();

      if (error) throw error;
      return { success: true, invite };
    } catch (error) {
      console.error('Error sending invite:', error);
      return { success: false, error };
    }
  };

  const createInviteLink = async (tripId: string) => {
    try {
      const inviteCode = generateRandomString(8);
      const { data: invite, error } = await supabase
        .from('trip_invites')
        .insert([
          {
            trip_id: tripId,
            inviter_id: userId,
            invite_type: 'link',
            invite_code: inviteCode,
            status: 'pending',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        ])
        .select();

      if (error) throw error;

      const inviteLink = createInviteURL(inviteCode);
      return { success: true, invite, inviteLink };
    } catch (error) {
      console.error('Error creating invite link:', error);
      return { success: false, error };
    }
  };

  // ... rest of the component implementation
};
```

### 3. Join Trip Screen (app/join-trip/[code].tsx)

```typescript
import { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '~/utils/supabase';
import { useAuthStore } from '~/stores/useAuthStore';

export default function JoinTripScreen() {
  const { code } = useLocalSearchParams();
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinTrip = async () => {
      try {
        // Find the invitation
        const { data: invite, error: inviteError } = await supabase
          .from('trip_invites')
          .select('*')
          .eq('invite_code', code)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invalid or expired invitation');
        }

        if (new Date(invite.expires_at) < new Date()) {
          throw new Error('Invitation has expired');
        }

        // Add user to trip_users
        const { error: joinError } = await supabase
          .from('trip_users')
          .insert([
            {
              trip_id: invite.trip_id,
              user_id: user.id,
              is_admin: false,
            }
          ]);

        if (joinError) throw joinError;

        // Update invitation status
        await supabase
          .from('trip_invites')
          .update({ status: 'accepted' })
          .eq('id', invite.id);

        Alert.alert('Success', 'You have joined the trip!');
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Error', error.message);
        router.replace('/(tabs)');
      } finally {
        setLoading(false);
      }
    };

    if (user && code) {
      joinTrip();
    }
  }, [code, user]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return null;
}
```

## Universal Links Setup

### 1. App Configuration (app.json)

```json
{
  "expo": {
    "scheme": "runwae",
    "ios": {
      "bundleIdentifier": "io.runwae.app",
      "associatedDomains": ["applinks:runwae.io"]
    },
    "android": {
      "package": "io.runwae.app",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "runwae.io",
              "pathPrefix": "/join-trip"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### 2. Domain Configuration Files

Apple App Site Association (at `https://runwae.io/.well-known/apple-app-site-association`):

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOUR_TEAM_ID.io.runwae.app",
        "paths": ["/join-trip/*"]
      }
    ]
  }
}
```

Android Asset Links (at `https://runwae.io/.well-known/assetlinks.json`):

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "io.runwae.app",
      "sha256_cert_fingerprints": ["YOUR_APP_FINGERPRINT"]
    }
  }
]
```

### 3. Development Build Setup (eas.json)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  }
}
```

## Important Notes

- Universal links won't work in Expo Go
- Development client builds will support universal links
- Domain must have valid SSL certificate
- AASA and assetlinks.json must be served without redirects
- Test universal links using Apple's validator and Android App Links Assistant
