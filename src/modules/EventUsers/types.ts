import Event from '@libs/models/Events';
import User from '@libs/models/Users';
import Data from '@libs/models/EventUsers';
import { Meta } from '@modules/model';

const NameSpace = 'EVENT_USERSS';

export class Events {
  meta: Meta;
  data: {
    events: Event;
    event_users: Data;
  }[];
  constructor(params:{
    meta: Meta;
    data: {
      events: Event;
      event_users: Data;
    }[];
  }) {
    this.meta = params.meta;
    this.data = params.data;
  }
}

export class Users {
  meta: Meta;
  data: {
    users: User;
    event_users: Data;
  }[];
  constructor(params:{
    meta: Meta;
    data: {
      users: User;
      event_users: Data;
    }[];
  }) {
    this.meta = params.meta;
    this.data = params.data;
  }
}

interface Config {
  states: {
    events: string;
    users: string;
  };
  actions: {
    initialize: string;
    fetchUsersByEvent: string;
    fetchEventsByUser: string;
    save: string;
    delete: string;
  };
  initialState: {
    events: Events;
    users: Users;
  };
}

const config: Config = {
  states: {
    events: `${NameSpace}_EVENTS`,
    users: `${NameSpace}_USERS`,
  },
  actions: {
    initialize: `${NameSpace}/INITIALIZE`,
    fetchUsersByEvent: `${NameSpace}/FETCH_USERS_BY_EVENT`,
    fetchEventsByUser: `${NameSpace}/FETCH_EVENTS_BY_USER`,
    save: `${NameSpace}/SAVE`,
    delete: `${NameSpace}/DELETE`,
  },
  initialState: {
    events: {
      meta: new Meta(),
      data:[],
    },
    users: {
      meta: new Meta(),
      data:[],
    },
  },
};

export default config;
export {
  Data,
};
