import Types from '@modules/Apps/types';

interface Action {
  [index: string]: object | string;
}

const initialized = (state = Types.initialState.initialized, action: Action) => {
  const { type } = action;
  switch (type) {
    case Types.actions.initialize:
      return action[Types.states.initialized];
    default:
      return state;
  }
};

const isConnected = (state = Types.initialState.isConnected, action: Action) => {
  const { type } = action;
  switch (type) {
    case Types.actions.connected:
      return action[Types.states.isConnected];
    default:
      return state;
  }
};

export default {
  [Types.states.initialized]: initialized,
  [Types.states.isConnected]: isConnected,
};
