import * as React from 'react';
import {
  View, TouchableOpacity, StyleSheet,
  Image, ImageBackground, FlatList, RefreshControl,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Data, List } from '@modules/Users';
import { FilePath } from '@modules/Apps';
import { Text } from '@libs/ui';
import { RootProps } from '@libs/common';
import { CardStyle, FontSize, Color, Font } from '@libs/style';

const Css = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    marginRight: 16,
  },
  ranking: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: 16,
  },
  rankingText: {
    ...FontSize.lg,
    color: Color.primary,
    marginRight: 4,
  },
  text: {
    ...FontSize.xs,
    color: Color.black2,
  },
  score: {
    ...FontSize.xs,
  },
  name: {
    ...Font.strong,
  },
  cardContent: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  image: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  league: {
    flex: 1,
    alignItems: 'flex-end',
  },
  leagueArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 35,
  },
  leagueName: {
    marginTop: -8,
    color: Color.primary,
    ...Font.strong,
    fontSize: 14,
  },
});

interface Props extends RootProps {
  list: List;
  fetch: Function;
}

interface State {
  loaded: boolean;
  loading: boolean;
  refreshing: boolean;
}

export default class UsersComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
    this.fetch = this.fetch.bind(this);
    this.state = {
      loaded: false,
      loading: false,
      refreshing: false,
    };
  }

  mounted: boolean = false;

  async componentDidMount() : Promise<void> {
    try {
      this.mounted = true;
      await this.fetch({ page: 1 });
    } catch (e) {
      throw e;
    }
  }

  componentWillUnmount() : void {
    this.mounted = false;
  }

  async fetch(params: {
    page: number;
    refreshing?: boolean;
  }) : Promise<void> {
    try {
      this.setState({
        refreshing: !!params.refreshing,
        loading: !params.refreshing,
      });
      await this.props.fetch(params);
      if (this.mounted) {
        this.setState({
          refreshing: false,
          loading: false,
          loaded: true,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  move(id: string) : void {
    const { navigation } = this.props;
    navigation.push('User', { id});
  }

  renderItem(data:Data) : JSX.Element {
    return (
      <View style={CardStyle.container}>
        <Ripple
          onPress={() => this.move(data.id)}
          rippleColor={Color.primary}
          rippleDuration={200}
        >
          <View style={Css.card}>
            <View style={Css.ranking}>
              <Text style={Css.rankingText}>{data.ranking}</Text>
              <Text style={Css.text}>位</Text>
            </View>
            <View style={Css.item}>
              <Image
                source={{ uri: data.image }}
                style={Css.cardContent}
              />
            </View>
            <View style={Css.item}>
              <View>
                <Text style={Css.name}>{data.name}</Text>
              </View>
              <View style={CardStyle.separater}>
                <Text style={Css.score}>スコア: {data.score}, パター: {data.putt}</Text>
              </View>
            </View>
            <View style={Css.league}>
              <ImageBackground
                source={{ uri: `${FilePath}rank.jpg` }}
                style={Css.leagueArea}
              >
                <Text style={Css.leagueName}>{data.league || 'ー'}</Text>
              </ImageBackground>
            </View>
          </View>
        </Ripple>
      </View>
    );
  }

  rendaer() {
    return null;
  }

  render() : JSX.Element {
    return (
      <View style={Css.container}>
        <FlatList
          data={this.state.loaded ? this.props.list.data : []}
          keyExtractor={(item) => `item-${item.id}`}
          renderItem={({ item }) => this.renderItem(item)}
          onEndReached={() => {
            if (this.props.list.meta.canPaging && !this.state.loading) {
              this.fetch({
                page: this.props.list.meta.currentPage + 1,
              });
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.fetch({
                page: 1,
                refreshing: true,
              })}
            />
          }
        />
      </View>
    );
  }
}
