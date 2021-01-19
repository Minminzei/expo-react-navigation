import * as React from 'react';
import {
  Platform, KeyboardAvoidingView, StatusBar,
} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default class KeyboardAvoidingViewtUi extends React.Component<Props> {
  render() : JSX.Element {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={50}
        >
          {this.props.children}
        </KeyboardAvoidingView>
      );
    }
    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={StatusBar.currentHeight}
      >
        {this.props.children}
      </KeyboardAvoidingView>
    );
  }
}
