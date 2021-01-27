import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const NameSpace = 'APPS';

const FilePath = Platform.OS === 'web' ? '/assets/' : `${FileSystem.documentDirectory}CACHES/`;

interface Config {
  states: {
    initialized: string;
    isConnected: string;
    message: string;
  };
  actions: {
    initialize: string;
    connected: string;
    deleteFiles: string;
    setMessage: string;
    clearMessage: string;
  };
  initialState: {
    initialized: boolean;
    isConnected: boolean;
    message: string | null;
  };
}

const config: Config = {
  states: {
    initialized: `${NameSpace}_INITIALIZED`,
    isConnected: `${NameSpace}_IS_CONNECTED`,
    message: `${NameSpace}_MESSAGE`,
  },
  actions: {
    initialize: `${NameSpace}/INITIALIZE`,
    connected: `${NameSpace}/CONNECTED`,
    deleteFiles: `${NameSpace}/DELETE_FILES`,
    setMessage: `${NameSpace}/SET_MESSAGE`,
    clearMessage: `${NameSpace}/CLEAR_MESSAGE`,
  },
  initialState: {
    initialized: false,
    isConnected: true,
    message: null,
  },
};

export default config;
export {
  FilePath,
};
