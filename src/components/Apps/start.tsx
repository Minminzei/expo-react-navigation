import * as React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Text, Loading } from '@libs/ui';

const Css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 250,
    height: 100,
  },
  text: {
    textAlign: 'center',
  },
});

class Splash extends React.Component {
  render() : JSX.Element {
    if (Platform.OS === 'web') {
      return (
        <View style={Css.container}>
          <View style={Css.loading}>
            <Loading size="large" />
            <Text style={Css.text}>loading...</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={Css.container}>
        <Loading size="large" />
      </View>
    );
  }
}

export default Splash;
