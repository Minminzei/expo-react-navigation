import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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

export default createStore(reducer, applyMiddleware(thunk));
