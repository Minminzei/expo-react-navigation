import Data from '@libs/models/Users';
import { Meta } from '@modules/model';

const NameSpace = 'USERS';

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
    joinUsers: string;
  };
  actions: {
    initialize: string;
    get: string;
    fetch: string;
    fetchByEvent: string;
  };
  initialState: {
    list: List;
    data: Data | null;
    joinUsers: List;
  };
}

const config: Config = {
  states: {
    list: `${NameSpace}_LIST`,
    data: `${NameSpace}_DATA`,
    joinUsers: `${NameSpace}_JOIN_USERS`,
  },
  actions: {
    initialize: `${NameSpace}/INITIALIZE`,
    get: `${NameSpace}/GET`,
    fetch: `${NameSpace}/FETCH`,
    fetchByEvent: `${NameSpace}/FETCH_BY_EVENTS`,
  },
  initialState: {
    list: {
      meta: new Meta(),
      data:[],
    },
    data: null,
    joinUsers: {
      meta: new Meta(),
      data:[],
    },
  },
};

export default config;
export {
  Data,
};
