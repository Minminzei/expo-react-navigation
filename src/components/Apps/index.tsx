import * as React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './header';
import Main from './main';
import Menu from './menu';
import Start from './start';
import { Data } from '@modules/Profile';
import Event from '@containers/Event';
import User from '@containers/User';
import Events from '@containers/Events';
import Users from '@containers/Users';
import Profile from '@containers/Profile';
import { Color } from '@libs/style';

const Css = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
  },
  back: {
    paddingLeft: 8,
    height: 40,
    backgroundColor: Color.white1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

const Stack = createStackNavigator();
const initialRouteName = 'Main';

const Screen = {
  User: {
    component: props => <User {...props} />,
    header: true,
    menu: false,
  },
  Event: {
    component: props => <Event {...props} />,
    header: true,
    menu: false,
  },
  Main: {
    component: props => <Main {...props} />,
    header: false,
    menu: true,
  },
  /*
  Users: {
    component: props => <Users {...props} />,
    header: false,
    menu: true,
  },
  Events: {
    component: props => <Events {...props} />,
    header: false,
    menu: true,
  },
  Profile: {
    component: props => <Profile {...props} />,
    header: false,
    menu: true,
  },
  */
};

interface Props {
  auth: Data;
  initialized: boolean;
  isConnected: boolean;
  initialize: Function;
  connected: Function;
}

interface State {
  page: string;
}

class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.move = this.move.bind(this);
    this.state = {
      page: initialRouteName,
    };
  }
  async componentDidMount() : Promise<void> {
    try {
      await this.props.initialize();
    } catch (e) {
      throw e;
    }
  }

  back() : void {
    if (this.$nav) {
      if (this.$nav.canGoBack()) {
        this.$nav.goBack();
      } else {
        this.$nav.navigate('/');
      }
    }
  }

  move(url: string) : void {
    if (this.$nav) {
      this.$nav.navigate(url);
    }
  }

  $nav: NavigationContainerRef | null = null;

  render() : JSX.Element {
    if (!this.props.initialized) {
      return <Start />;
    }
    return (
      <SafeAreaView style={Css.container}>

        <View style={Css.content}>
          <NavigationContainer
            ref={ref => this.$nav = ref}
            onStateChange={e => {
              if (e) {
                this.setState({ page: e.routes[e.index].name });
              }
            }}
            linking={{
              prefixes: [],
              config: {
                initialRouteName,
                screens: {
                  User: {
                    path: 'users/:id',
                    parse: {
                      id:  String,
                    },
                  },
                  Event: {
                    path: 'events/:id',
                    parse: {
                      id:  String,
                    },
                  },
                  Main: {
                    screens: {
                      Users: {
                        path: 'users',
                      },
                      Events: {
                        path: 'events',
                      },
                      Profile: {
                        path: 'profile',
                      },
                    },
                  },
                },
              },
            }}
          >
            <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
              {Object.keys(Screen).map(page => (
                <Stack.Screen
                  name={page}
                  key={page}
                >
                  {Screen[page].component}
                </Stack.Screen>
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
