import * as React from 'react';
import {
  View, StyleSheet, ActivityIndicator,
} from 'react-native';
import Text from '../Text';
import { FontSize } from '@libs/style';

const Css = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    padding: 8,
  },
  small: {
    ...FontSize.xs,
    textAlign: 'center',
  },
});

interface Props {
  size?: 'small' | 'large' | number;
  color?: string;
  label?: string;
}

export default class Loading extends React.Component<Props> {
  static defaultProps = {
    size: 'large',
    color: '#999999',
    label: '',
  };

  render() : JSX.Element {
    return (
      <View style={Css.loading}>
        <ActivityIndicator
          size={this.props.size}
          color={this.props.color}
        />
        {this.props.label ? (
          <View style={Css.label}>
            <Text style={Css.small}>{this.props.label}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
