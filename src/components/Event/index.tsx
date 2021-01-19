import * as React from 'react';
import * as _ from 'lodash';
import {
  View, StyleSheet, Image, TouchableOpacity, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Data } from '@modules/Events';
import { Users } from '@modules/EventUsers';
import EventUser from '@libs/models/EventUsers';
import { Data as Profile } from '@modules/Profile';
import { Text, Loading, Button, ScrollView } from '@libs/ui';
import { RootProps } from '@libs/common';
import { Color, FontSize, Font } from '@libs/style';
import Header from '@components/Apps/header';

const Css = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  // content
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: Color.white1,
  },
  section: {
    marginTop: 8,
    paddingTop: 8,
    marginBottom: 8,
    paddingBottom: 8,
  },
  bordered: {
    borderStyle: 'solid',
    borderColor: Color.black3,
    borderTopWidth: 1,
  },
  title: {
    ...FontSize.xxl,
    ...Font.strong,
    color: Color.black1,
  },
  primary: {
    color: Color.primary,
    marginRight: 8,
  },
  smallText: {
    color: Color.black2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  column: {
    marginTop: 8,
    ...FontSize.xl,
    ...Font.strong,
    color: Color.black1,
  },
  text: {
    ...FontSize.lg,
    color: Color.black1,
  },
  icon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  // members
  members: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  member: {
    marginTop: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberName: {
    marginTop: 4,
    textAlign: 'center',
    ...FontSize.xxs,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black3,
  },
});

interface Props extends RootProps {
  auth: Profile;
  data: Data;
  users: Users;
  get: Function;
  fetchUsersByEvent: Function;
  save: Function;
  delete: Function;
}

interface State {
  loading: boolean;
  loaded: boolean;
  joined: boolean;
}

export default class EventComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.save = this.save.bind(this);
    this.move = this.move.bind(this);
    this.back = this.back.bind(this);
    this.state = {
      loading: false,
      loaded: false,
      joined: false,
    };
  }

  mounted: boolean = false;

  async componentDidMount() : Promise<void> {
    try {
      this.mounted = true;
      await this.props.get(this.props.route.params.id);
      await this.props.fetchUsersByEvent(this.props.route.params.id);
      if (this.mounted) {
        this.setState({
          loaded: true,
          joined: this.isJoined,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  componentWillUnmount() : void {
    this.mounted = false;
  }

  async save() : Promise<void> {
    try {
      const data = _.head(this.props.users.data.filter(row => row.users.id === this.props.auth.id));
      this.setState({ loading: true });
      if (data) {
        await this.props.delete(data.event_users.id);
      } else {
        await this.props.save(new EventUser({
          user_id: this.props.auth.id,
          event_id: this.props.route.params.id,
        }));
      }
      // await this.props.fetchUsersByEvent(this.props.id);
      this.setState({
        loading: false,
        joined: this.isJoined,
      });
      Alert.alert(!data ? '参加しました' : 'キャンセルしました');
    } catch (e) {
      throw e;
    }
  }

  move(id: string) : void {
    const { navigation } = this.props;
    navigation.push('User', { id });
  }

  back() : void {
    const { navigation } = this.props;
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('/');
    }
  }

  get isJoined() : boolean {
    const member = _.head(this.props.users.data.filter(row => row.users.id === this.props.auth.id));
    return !!member;
  }

  get members() : JSX.Element | null {
    if (this.props.users.data.length > 0) {
      return (
        <View style={[Css.section, Css.bordered]}>
          <View>
            <Text style={Css.column}>参加者</Text>
          </View>
          <View style={Css.members}>
            {this.props.users.data.map(row => (
              <TouchableOpacity
                key={`user-${row.users.id}`}
                style={Css.member}
                onPress={() => this.move(row.users.id)}
              >
                <Image
                  source={{ uri: row.users.image }}
                  style={Css.thumbnail}
                />
                <Text style={Css.memberName}>{row.users.name || 'ゲスト'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    return null;
  }

  render() : JSX.Element {
    if (!this.state.loaded) {
      return <Loading />;
    }
    return (
      <View style={Css.container}>
        <Header
          back={this.back}
        />
        <ScrollView>
          <Image
          source={{ uri: this.props.data.image }}
          style={Css.image}
          />
          <View style={Css.content}>
            <View style={Css.section}>
              <View style={Css.row}>
                <Text style={Css.primary}>{this.props.data.location}</Text>
              </View>
              <View>
                <Text style={Css.title}>{this.props.data.title}</Text>
              </View>
            </View>

            <View style={[Css.section, Css.bordered]}>
              <View style={Css.row}>
                <View style={Css.icon}>
                  <Icon name="clock-outline" size={25} color={Color.black2} />
                </View>
                <View>
                  <Text style={Css.text}>{this.props.data.date}</Text>
                </View>
              </View>
              <View style={Css.row}>
              <View style={Css.icon}>
                  <Icon name="golf" size={25} color={Color.black2} />
                </View>
                <View>
                  <Text style={Css.text}>{this.props.data.hole}</Text>
                </View>
              </View>

              <View style={Css.row}>
              <View style={Css.icon}>
                  <Icon name="currency-jpy" size={25} color={Color.black2} />
                </View>
                <View>
                  <Text style={Css.text}>{this.props.data.price}円</Text>
                </View>
              </View>
            </View>

            {this.members}

            <View style={[Css.section, Css.bordered]}>
              <View>
                <Text style={Css.column}>持ち物</Text>
              </View>
              <View>
                <Text style={Css.text}>{this.props.data.note}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={Css.button}>
          <Button
            title={this.state.joined ? 'キャンセルする' : '参加する'}
            color={Color.white1}
            backgroundColor={this.state.joined ? Color.black2 : Color.primary}
            onPress={() => this.save()}
          />
        </View>
      </View>
    );
  }
}
