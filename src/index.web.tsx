import * as React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers';
import Apps from '@containers/Apps';

console.log('index.web!!');

const Css = StyleSheet.create({
  container: {
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
});

ReactDOM.hydrate(
  (
    <View style={Css.container}>
      <Provider store={store}>
        <Apps />
      </Provider>
    </View>
  ),
  document.getElementById('apps'),
);
