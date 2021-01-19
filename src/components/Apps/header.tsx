import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '@libs/style';

const Css = StyleSheet.create({
  container: {
    paddingLeft: 8,
    height: 40,
    backgroundColor: Color.white1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black3,
  },
});

interface Props {
  back: Function;
}

const HeaderComponent = (props:Props) => (
  <TouchableOpacity
    style={Css.container}
    onPress={() => props.back()}
  >
    <Icon name="arrow-left" size={30} color={Color.blue1} />
  </TouchableOpacity>
);

export default HeaderComponent;
