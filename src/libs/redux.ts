import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { NavigationContainerRef } from '@react-navigation/native';
import thunk from 'redux-thunk';
import AppReducers from '@reducers/index';
import { Types } from '@modules/Apps';

const store = createStore(
  AppReducers,
  applyMiddleware(thunk),
);

interface RootProps {
  route: any;
  navigation: any;
}

const isReadyRef = React.createRef();
const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();
const navigation = {
  push: (name, params) => {
    if (isReadyRef.current && navigationRef.current) {
      navigationRef.current.navigate(name, params);
    }
  },
  navigate: (name, params?) => {
    if (isReadyRef.current && navigationRef.current) {
      navigationRef.current.navigate(name, params);
    }
  },
  canGoBack: () => {
    if (isReadyRef.current && navigationRef.current) {
      return navigationRef.current.canGoBack();
    }
    return false;
  },
  goBack: () => {
    if (isReadyRef.current && navigationRef.current) {
      navigationRef.current.goBack();
    }
  },
};

const setMessage = (message:string) => {
  store.dispatch({
    type: Types.actions.setMessage,
    [Types.states.message]: message,
  });
};

export {
  isReadyRef,
  navigationRef,
  navigation,
  store,
  RootProps,
  setMessage,
};
