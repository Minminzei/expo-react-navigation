import * as React from 'react';
import {
  View, StyleSheet, Animated, Modal, ViewStyle,
  TouchableWithoutFeedback, Platform,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as _ from 'lodash';
import { Color, Font } from '@libs/style';
import Text from '../Text';

const initialBottom = -300;

const Css = StyleSheet.create({
  modal: {
    flex: 1,
  },
  content: {
    padding: 8,
    flex: 1,
  },
  animated: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: 999,
  },
  backgroundLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: Color.layer2,
  },
  item: {
    borderRadius: 16,
    backgroundColor: Color.white1,
    width: '100%',
    marginTop: 8,
    overflow: 'hidden',
  },
  bordered: {
    borderTopWidth: 1,
  },
  itemBar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderStyle: 'solid',
    borderColor: Color.black3,
  },
  text: {
    color: Color.blue1,
    fontSize: 16,
  },
  cancel: {
    ...Font.strong,
    color: Color.blue1,
    fontSize: 16,
  },
});

interface Props {
  onCancel: Function;
  onSelect: Function;
  options: {
    label: string;
    value: string | number;
  }[];
}

interface State {
  animateBottom: Animated.Value;
}

export default class SlideUp extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
    this.state = {
      animateBottom: new Animated.Value(initialBottom),
    };
  }

  componentDidMount() : void {
    const animate = Animated.timing(this.state.animateBottom, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    });
    animate.start(() => animate.stop());
  }

  get style() : ViewStyle[] {
    const styles:ViewStyle[] = [Css.content];
    styles.push({
      paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    });
    return styles;
  }

  cancel() : void {
    const animate = Animated.timing(this.state.animateBottom, {
      toValue: initialBottom,
      duration: 100,
      delay: 200,
      useNativeDriver: false,
    });
    animate.start(() => {
      animate.stop();
      this.props.onCancel();
    });
  }

  render() : JSX.Element {
    return (
      <Modal
        visible
        animationType="none"
        onRequestClose={this.cancel}
        transparent
      >
        <View style={Css.modal}>
          <Animated.View
            style={[
              Css.animated,
              {
                bottom: this.state.animateBottom,
              },
            ]}
          >
            <View style={this.style}>
              {this.props.options.length > 0 ? (
                <View style={Css.item}>
                  {this.props.options.map((row, index) => (
                    <Ripple
                      onPress={() => this.props.onSelect(row.value)}
                      key={`item-${row.value}`}
                    >
                      <View
                        style={[
                          Css.itemBar,
                          index !== 0 ? Css.bordered : null,
                        ]}
                      >
                        <Text style={Css.text}>{row.label}</Text>
                      </View>
                    </Ripple>
                  ))}
                </View>
              ) : null}
              <View style={Css.item}>
                <Ripple onPress={this.cancel}>
                  <View style={Css.itemBar}>
                    <Text style={Css.cancel}>キャンセル</Text>
                  </View>
                </Ripple>
              </View>
            </View>
          </Animated.View>
          <TouchableWithoutFeedback
            onPress={this.cancel}
          >
            <View style={Css.backgroundLayer} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
