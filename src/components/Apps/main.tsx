import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ripple from 'react-native-material-ripple';
import { Color } from '@libs/style';
import Events from '@containers/Events';
import Users from '@containers/Users';
import Profile from '@containers/Profile';
import { Data } from '@modules/Profile';
import { Image } from '@libs/ui';

const Tab = createBottomTabNavigator();

const Css = StyleSheet.create({
  container: {
    flex: 1,
  },
  menus: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black2,
    paddingTop: 8,
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
  label: {
    color: Color.black1,
    fontSize: 10,
    lineHeight: 10,
  },
  selected: {
    color: Color.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});


export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.tabBar = this.tabBar.bind(this);
  }

  tabBar(params:BottomTabBarProps) : JSX.Element {
    const { state, descriptors, navigation } = params;
    return (
      <View style={Css.menus}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          return (
            <Ripple
              onPress={() => navigation.navigate(route.name)}
              style={Css.menu}
              key={`menu-${route.name}`}
              rippleColor={Color.primary}
              rippleDuration={300}
              rippleSize={180}
            >

              <Icon name={options.tabBarLabel as string} color={isFocused ? Color.primary : Color.black1} size={40} />

            </Ripple>
          );
        })}
      </View>
    );
  }

  render() : JSX.Element {
    return (
      <Tab.Navigator
        tabBar={this.tabBar}
        initialRouteName="Events"
      >
        <Tab.Screen
          name="Users"
          options={{
            title: 'ユーザー',
            tabBarLabel: 'trophy-outline',
          }}
        >
          {props => <Users {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name="Events"
          options={{
            title: 'ラウンド',
            tabBarLabel: 'calendar-text',
          }}
        >
          {props => <Events {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            title: 'プロフィール',
            tabBarLabel: 'account-circle-outline',
          }}
        >
          {props => <Profile {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}
