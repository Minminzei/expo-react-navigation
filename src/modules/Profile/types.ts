import Data from '@libs/models/Users';

const NameSpace = 'PROFILE';

interface Config {
  states: {
    data: string;
  };
  actions: {
    initialize: string;
    save: string;
    get: string;
  };
  initialState: {
    data: Data | null;
  };
}

const config: Config = {
  states: {
    data: `${NameSpace}_DATA`,
  },
  actions: {
    initialize: `${NameSpace}/INITIALIZE`,
    save: `${NameSpace}/SAVE`,
    get: `${NameSpace}/GET`,
  },
  initialState: {
    data: null,
  },
};

export default config;
export {
  Data,
};
