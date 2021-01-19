import Data from '@libs/models/Events';
import { Meta } from '@modules/model';

const NameSpace = 'EVENTS';

export class List {
  meta: Meta;
  data: Data[];
  constructor(params:{
    meta: Meta;
    data: Data[];
  }) {
    this.meta = params.meta;
    this.data = params.data;
  }
}

interface Config {
  states: {
    list: string;
    data: string;
  };
  actions: {
    initialize: string;
    get: string;
    fetch: string;
  };
  initialState: {
    list: List;
    data: Data | null;
  };
}

const config: Config = {
  states: {
    list: `${NameSpace}_LIST`,
    data: `${NameSpace}_DATA`,
  },
  actions: {
    initialize: `${NameSpace}/INITIALIZE`,
    get: `${NameSpace}/GET`,
    fetch: `${NameSpace}/FETCH`,
  },
  initialState: {
    list: {
      meta: new Meta(),
      data:[],
    },
    data: null,
  },
};

export default config;
export {
  Data,
};
