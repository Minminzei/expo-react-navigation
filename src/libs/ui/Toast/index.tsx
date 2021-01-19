import * as React from 'react';
import {
  View, StyleSheet, Animated, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import { Color, FontSize } from '@libs/style';

const initialBottom = -200;

const Css = StyleSheet.create({
  animated: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: 999,
  },
  wrapper: {
    flex: 1,
    padding: 20,
  },
  content: {
    width: '100%',
    height: 44,
    position: 'relative',
    backgroundColor: Color.layer1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: 40,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...FontSize.lg,
    color: Color.white1,
    lineHeight: 44,
  },
});

interface Props {
  onClose: Function;
  message: string;
}

interface State {
  animateBottom: any;
}

export default class Toast extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      animateBottom: new Animated.Value(initialBottom),
    };
  }

  timerId: any;

  componentDidMount() : void {
    const animate = Animated.timing(this.state.animateBottom, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    });
    animate.start(() => animate.stop());
    this.timerId = setTimeout(() => this.close(), 4000);
  }

  componentWillUnmount() : void {
    clearTimeout(this.timerId);
  }

  close() : void {
    const animate = Animated.timing(this.state.animateBottom, {
      toValue: initialBottom,
      duration: 100,
      useNativeDriver: false,
    });
    animate.start(() => {
      this.props.onClose();
      animate.stop();
    });
  }

  render() : JSX.Element {
    return (
      <Animated.View
        style={[
          Css.animated,
          {
            bottom: this.state.animateBottom,
          },
        ]}
      >
        <View style={Css.wrapper}>
          <View style={Css.content}>
            <Text style={Css.text}>{this.props.message}</Text>
            <TouchableOpacity
              style={Css.close}
              onPress={this.close}
            >
              <Icon name="close" color={Color.white1} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}
