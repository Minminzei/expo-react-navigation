import Types from '@modules/Profile/types';

interface Action {
  [index: string]: object | string;
}

const data = (state = Types.initialState.data, action: Action) => {
  const { type } = action;
  switch (type) {
    case Types.actions.get:
    case Types.actions.save:
      return action[Types.states.data];
    default:
      return state;
  }
};

export default {
  [Types.states.data]: data,
};
