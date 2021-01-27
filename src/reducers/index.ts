import { combineReducers } from 'redux';
import Apps from './Apps';
import Events from './Events';
import Profile from './Profile';
import Users from './Users';
import EventUsers from './EventUsers';

const reducer = combineReducers({
  ...Apps,
  ...Events,
  ...Profile,
  ...Users,
  ...EventUsers,
});

export default reducer;
