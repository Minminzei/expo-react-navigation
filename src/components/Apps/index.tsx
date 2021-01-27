import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import Main from './main';
import Start from './start';
import { Message } from '@libs/ui';
import { Data } from '@modules/Profile';
import Event from '@containers/Event';
import User from '@containers/User';
import { isReadyRef, navigationRef, setMessage } from '@libs/redux';

enableScreens();

const Stack = createStackNavigator();
const initialRouteName = 'Main';

const Screen = {
  User: {
    component: props => <User {...props} />,
  },
  Event: {
    component: props => <Event {...props} />,
  },
  Main: {
    component: props => <Main {...props} />,
  },
};

interface Props {
  auth: Data;
  message: string | null;
  initialized: boolean;
  isConnected: boolean;
  initialize: Function;
  connected: Function;
  clearMessage: Function;
}

interface State {
  page: string;
}

class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      page: initialRouteName,
    };
  }

  async componentDidMount() : Promise<void> {
    try {
      await this.props.initialize();
    } catch (e) {
      setMessage(e.message);
    }
  }

  render() : JSX.Element {
    if (!this.props.initialized) {
      return <Start />;
    }
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          (isReadyRef as any).current = true;
        }}
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
        {this.props.message ? (
          <Message
            onClose={() => this.props.clearMessage()}
            message={this.props.message}
          />
        ) : null}
      </NavigationContainer>
    );
  }
}

export default App;
