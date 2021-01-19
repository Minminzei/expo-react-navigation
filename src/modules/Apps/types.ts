import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const NameSpace = 'APPS';

const FilePath = Platform.OS === 'web' ? '/assets/' : `${FileSystem.documentDirectory}CACHES/`;

interface Config {
  states: {
    initialized: string;
    isConnected: string;
  };
  actions: {
    initialize: string;
    connected: string;
    deleteFiles: string;
  };
  initialState: {
    initialized: boolean;
    isConnected: boolean;
  };
}

const config: Config = {
  states: {
    initialized: `${NameSpace}_INITIALIZED`,
    isConnected: `${NameSpace}_IS_CONNECTED`,
  },
  actions: {
    initialize: `${NameSpace}/INITIALIZE`,
    connected: `${NameSpace}/CONNECTED`,
    deleteFiles: `${NameSpace}/DELETE_FILES`,
  },
  initialState: {
    initialized: false,
    isConnected: true,
  },
};

export default config;
export {
  FilePath,
};
