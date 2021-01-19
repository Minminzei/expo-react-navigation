import Types from '@modules/EventUsers/types';

interface Action {
  [index: string]: object | string;
}

const users = (state = Types.initialState.users, action: Action) => {
  const { type } = action;
  switch (type) {
    case Types.actions.fetchUsersByEvent:
      return action[Types.states.users];
    default:
      return state;
  }
};

const events = (state = Types.initialState.events, action: Action) => {
  const { type } = action;
  switch (type) {
    case Types.actions.fetchEventsByUser:
      return action[Types.states.events];
    default:
      return state;
  }
};

export default {
  [Types.states.users]: users,
  [Types.states.events]: events,
};
