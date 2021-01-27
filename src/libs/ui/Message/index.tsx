import * as React from 'react';
import {
  View, StyleSheet, TouchableWithoutFeedback, Modal,
} from 'react-native';
import Text from '../Text';
import Ripple from '../Ripple';
import { FontSize, Color, Font } from '@libs/style';

const Css = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 10,
  },
  backgroundLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  card: {
    width: 300,
    borderRadius: 16,
    backgroundColor: Color.white1,
    overflow: 'hidden',
  },
  message: {
    padding: 30,
  },
  text: {
    ...FontSize.lg,
    ...Font.strong,
  },
  button: {
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    ...Font.strong,
    color: Color.blue1,
  },
});

interface Props {
  message: string;
  onClose: Function;
  onPress?: Function;
  label?: string;
}

const Message = (props:Props) => (
  <Modal
    animationType="none"
    visible
    onRequestClose={() => props.onClose()}
    transparent
  >
    <View style={Css.container}>
      <View style={Css.card}>
        <View style={Css.message}>
          <Text style={Css.text}>{props.message}</Text>
        </View>
        <Ripple
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            } else {
              props.onClose();
            }
          }}
          rippleColor={Color.black1}
          rippleDuration={200}
        >
          <View style={Css.button}>
            <Text style={Css.link}>{props.label || '閉じる'}</Text>
          </View>
        </Ripple>
      </View>
      <TouchableWithoutFeedback
        onPress={() => props.onClose()}
      >
        <View
          style={[
            Css.backgroundLayer,
            {
              backgroundColor: Color.layer1,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  </Modal>
);

export default Message;
