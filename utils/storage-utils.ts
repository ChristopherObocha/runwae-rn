/*
    https://github.com/mrousavy/react-native-mmkv

        Get and set strings, booleans and numbers
        Fully synchronous calls, no async/await, no Promises, no Bridge.
        Encryption support (secure storage)
        Multiple instances support (separate user-data with global data)
        Customize storage location
        High performance because everything is written in C++
        ~30x faster than AsyncStorage
        Uses JSI instead of the "old" Bridge
        iOS, Android and Web support
        Easy to use React Hooks API
 */

import { MMKV } from 'react-native-mmkv';

const GlobalStorage = new MMKV({
  id: `global-storage`,
  encryptionKey: 'runwae',
});

const setObject = function (name, value) {
  // Serialize the object into a JSON string
  return GlobalStorage.set(name, JSON.stringify(value));
};

const getObject = function (name) {
  // Deserialize the JSON string into an object
  const jsonString = GlobalStorage.getString(name);
  if (!jsonString) return;

  const json = JSON.parse(jsonString);
  return json;
};

export { GlobalStorage, getObject, setObject };
