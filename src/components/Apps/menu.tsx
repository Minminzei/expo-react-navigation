import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import { Color } from '@libs/style';
import { RootProps } from '@libs/common';

const Css = StyleSheet.create({
  menus: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black2,
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white1,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Color.black3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

const Menu: {
  name: string;
  url: string;
  icon: string;
}[] = [
  {
    name: 'Users',
    url: 'users',
    icon: 'trophy-outline',
  },
  {
    name: 'Events',
    url: 'events',
    icon: 'calendar-text',
  },
  {
    name: 'Profile',
    url: 'profile',
    icon: 'account-circle-outline',
  },
];

interface Props {
  move: Function;
  page: string;
}

export default class MenuComponent extends React.Component<Props> {
  render() {
    return (
      <View style={Css.menus}>
        {Menu.map(row => (
          <Ripple
            onPress={() => this.props.move(row.name)}
            style={Css.menu}
            rippleColor={Color.primary}
            rippleDuration={300}
            rippleSize={180}
            key={`menu-${row.name}`}
          >
            <Icon
              name={row.icon}
              color={this.props.page === row.name ? Color.primary : Color.black2}
              size={40}
            />
          </Ripple>
        ))}
      </View>
    );
  }
}

