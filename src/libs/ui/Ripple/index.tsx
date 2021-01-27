import * as React from 'react';
import MaterialRipple from 'react-native-material-ripple';
import { Color } from '@libs/style';

interface Props {
  onPress: Function;
  rippleColor?: string;
  rippleDuration?: number;
  children: JSX.Element;
}

export default class Ripple extends React.Component<Props> {
  static defaultProps = {
    rippleColor: Color.black1,
    rippleDuration: 200,
  };

  constructor(props:Props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() : void {
    setTimeout(() => this.props.onPress(), this.props.rippleDuration || 0);
  }

  render() : JSX.Element {
    return (
      <MaterialRipple
        onPress={this.onPress}
        rippleColor={this.props.rippleColor}
        rippleDuration={this.props.rippleDuration}
      >
        {this.props.children}
      </MaterialRipple>
    );
  }
}
