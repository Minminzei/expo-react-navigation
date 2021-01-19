import * as React from 'react';
import {
  View, StyleSheet, ActivityIndicator,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Text from '../Text';
import { FontSize, Font, Color } from '@libs/style';

const Css = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'relative',
  },
  icon: {
    height: '100%',
    position: 'absolute',
    top: 2,
    left: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  text: {
    ...FontSize.xl,
    ...Font.strong,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Color.white3,
  },
});

interface Props {
  title: string;
  color?: string;
  backgroundColor?: string;
  onPress: Function;
  width?: number;
  height?: number;
  radius?: number;
  loading?: boolean;
  textStyle?: {[index:string]: string | number ; };
}

export default class Button extends React.Component<Props> {
  static defaultProps = {
    color: Color.black1,
    width: 270,
    radius: 8,
    height: 45,
    backgroundColor: Color.white1,
    textStyle: {
      fontSize: 18,
    },
  };

  render() : JSX.Element {
    return (
      <View style={Css.wrapper}>
        <View
          style={[
            Css.container,
            {
              width: this.props.width,
              height: this.props.height,
              borderRadius: this.props.radius,
              maxWidth: '100%',
            },
          ]}
        >
          <Ripple
            onPress={() => this.props.onPress()}
            rippleColor={Color.black4}
            rippleDuration={200}
          >
            <View
              style={[
                Css.button,
                {
                  width: this.props.width,
                  height: this.props.height,
                  maxWidth: '100%',
                  backgroundColor: this.props.backgroundColor,
                  borderRadius: this.props.radius,
                  borderColor: this.props.color,
                },
              ]}
            >
              {this.props.loading ? (
                <View style={Css.icon}>
                  <ActivityIndicator size="small" color="#00ff00" />
                </View>
              ) : null}
              <Text
                style={{
                  color: this.props.color,
                  ...this.props.textStyle,
                  lineHeight: this.props.height,
                }}
              >
                {this.props.title}
              </Text>
            </View>
          </Ripple>
          {this.props.loading ? <View style={Css.loading} /> : null}
        </View>
      </View>
    );
  }
}
