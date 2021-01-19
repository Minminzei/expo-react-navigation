import * as React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import store from './src/reducers';
import Apps from './src/containers/Apps';

const Css = StyleSheet.create({
  container: {
   flex: 1,
  },
});

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={Css.container}>
      <Provider store={store}>
        <Apps />
      </Provider>
    </SafeAreaView>
  </SafeAreaProvider>
);

export default App;
