import * as React from 'react';
import {
  View, StyleSheet, Image, ImageBackground,
} from 'react-native';
import { Data } from '@modules/Users';
import Ripple from 'react-native-material-ripple';
import { Events } from '@modules/EventUsers';
import { FilePath } from '@modules/Apps';
import { Text, Loading, ScrollView } from '@libs/ui';
import { RootProps } from '@libs/common';
import { navigation, setMessage } from '@libs/redux';
import { Color, FontSize, Font, CardStyle } from '@libs/style';
import Header from '@components/Apps/header';

const Css = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    backgroundColor: Color.white1,
  },
  userimage: {
    position: 'relative',
  },
  usericon: {
    position: 'absolute',
    top: -40,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: 120,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cover: {
    alignItems: 'center',
    height: 200,
    width: '100%',
  },
  user: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    paddingTop: 40,
  },
  username: {
    ...Font.strong,
  },
  ranking: {
    ...FontSize.xs,
    color: Color.black2,
  },
  comment: {
    ...FontSize.sm,
    color: Color.black2,
  },
  league: {
    width: 90,
    height: 90,
  },
  leagueArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueName: {
    marginTop: -10,
    color: Color.primary,
    ...Font.strong,
    fontSize: 30,
    lineHeight: 30,
  },
  leagueLabel: {
    ...FontSize.xxs,
    color: Color.primary,
  },
  headWrapper: {
    padding: 8,
  },
  info: {
    paddingBottom: 24,
  },
  infoArea: {
    borderRadius: 8,
    backgroundColor: Color.black4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 16,
    paddingTop: 16,
    backgroundColor: Color.white1,
  },
  title: {
    paddingLeft: 8,
  },
  titleText: {
    ...FontSize.xl,
    ...Font.strong,
  },
  card: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  blank: {
    padding: 8,
  },
});

interface Props extends RootProps {
  data: Data;
  events: Events;
  get: Function;
  fetchEventsByUser: Function;
}

interface State {
  loaded: boolean;
}

export default class UserComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.move = this.move.bind(this);
    this.back = this.back.bind(this);
    this.state = {
      loaded: false,
    };
  }

  mounted: boolean = false;

  async componentDidMount() : Promise<void> {
    try {
      this.mounted = true;
      await this.props.get(this.props.route.params.id);
      await this.props.fetchEventsByUser(this.props.route.params.id);
      if (this.mounted) {
        this.setState({ loaded: true });
      }
    } catch (e) {
      setMessage(e.message);
    }
  }

  componentWillUnmount() : void {
    this.mounted = false;
  }

  move(id: string) : void {
    navigation.push('Event', { id });
  }

  back() : void {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('/');
    }
  }

  get rankingText() : string {
    if (this.props.data.league) {
      return `${this.props.data.league}リーグ ${this.props.data.ranking || '--'}位`;
    }
    return '所属リーグはありません';
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
          <View style={Css.container}>
            <View style={Css.head}>
              <Image
                source={{ uri: this.props.data.cover || '' }}
                style={Css.cover}
              />
              <View style={Css.userimage}>
                <View style={Css.usericon}>
                  <Image
                    source={{ uri: this.props.data.image }}
                    style={Css.thumbnail}
                  />
                </View>
              </View>

              <View style={Css.user}>
                <View style={Css.name}>
                  <Text style={Css.username}>{this.props.data.name}</Text>
                  <Text style={Css.ranking}>{this.rankingText}</Text>
                  <Text style={Css.comment}>{this.props.data.comment || '紹介文未記入'}</Text>
                </View>

                <ImageBackground
                  source={{ uri: `${FilePath}rank.jpg` }}
                  style={Css.league}
                >
                  <View style={Css.leagueArea}>
                    <Text style={Css.leagueName}>{this.props.data.league || 'ー'}</Text>
                    <Text style={Css.leagueLabel}>リーグ</Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={Css.headWrapper}>
                <View style={Css.info}>
                  <View style={Css.infoArea}>
                    <View style={Css.infoItem}>
                      <View>
                        <Text>スコア</Text>
                      </View>
                      <View>
                        <Text>{this.props.data.score || '--'}</Text>
                      </View>
                    </View>
                    <View style={Css.infoItem}>
                      <View>
                        <Text>ゴルフ歴</Text>
                      </View>
                      <View>
                        <Text>
                          {this.props.data.career || '--'}
                        </Text>
                      </View>
                    </View>
                    <View style={Css.infoItem}>
                      <View>
                        <Text>エリア</Text>
                      </View>
                      <View>
                        <Text>{this.props.data.location || '--'}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={Css.content}>
              <View style={Css.title}>
                <Text style={Css.titleText}>参加するラウンド</Text>
              </View>
              {this.props.events.data.length > 0 ?
                this.props.events.data.map((data) => (
                  <View
                    style={Css.card}
                    key={`item-${data.events.id}`}
                  >
                    <Ripple
                      onPress={() => this.move(data.events.id)}
                      rippleColor={Color.primary}
                      rippleDuration={200}
                    >
                      <View style={CardStyle.image}>
                        <Image
                          source={{ uri: data.events.image }}
                          style={Css.image}
                        />
                      </View>
                      <View style={CardStyle.body}>
                        <View>
                          <Text style={CardStyle.label}>{data.events.location}</Text>
                        </View>
                        <View style={CardStyle.separater}>
                          <Text style={CardStyle.subline}>{data.events.date}</Text>
                        </View>
                        <View style={CardStyle.separater}>
                          <Text style={CardStyle.text}>{data.events.title}</Text>
                        </View>
                      </View>
                    </Ripple>
                  </View>
                )) :
                (
                  <View style={Css.blank}>
                    <Text>参加予定のラウンドはありません</Text>
                  </View>
                )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
