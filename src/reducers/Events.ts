import Types from '@modules/Events/types';

interface Action {
  [index: string]: object | string;
}

const data = (state = Types.initialState.data, action: Action) => {
  const { type } = action;
  switch (type) {
    case Types.actions.get:
      return action[Types.states.data];
    default:
      return state;
  }
};

const list = (state = Types.initialState.list, action: Action) => {
  const { type } = action;
  switch (type) {
    case Types.actions.fetch:
      return action[Types.states.list];
    default:
      return state;
  }
};

export default {
  [Types.states.data]: data,
  [Types.states.list]: list,
};
