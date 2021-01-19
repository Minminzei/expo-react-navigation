import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './reducers';
import Apps from '@containers/Apps';

const Css = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => (
  <Provider store={store}>
    <Apps />
  </Provider>
);

export default App;
