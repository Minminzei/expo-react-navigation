import * as React from 'react';
import {
  View, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Data, List } from '@modules/Events';
import { RootProps } from '@libs/common';
import { Text, Image } from '@libs/ui';
import { CardStyle, Color } from '@libs/style';
import { navigation, setMessage } from '@libs/redux';

const Css = StyleSheet.create({
  card: {
    marginBottom: 0,
  },
  cardContent: {
    height: 200,
    width: '100%',
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

export default class EventsComponent extends React.Component<Props, State> {
  constructor(props: Props) {
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
      setMessage(e.message);
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
    navigation.navigate('Event', { id });
  }

  renderItem(data:Data) : JSX.Element {
    return (
      <View style={Css.card}>
        <View style={CardStyle.container}>
          <Ripple
            onPress={() => this.move(data.id)}
            rippleColor={Color.primary}
            rippleDuration={200}
          >
            <View>
              <View style={CardStyle.image}>
                <Image
                  source={{ uri: data.image }}
                  style={Css.cardContent}
                />
              </View>
              <View style={CardStyle.body}>
                <View>
                  <Text style={CardStyle.label}>{data.location}</Text>
                </View>
                <View style={CardStyle.separater}>
                  <Text style={CardStyle.subline}>{data.date}</Text>
                </View>
                <View style={CardStyle.separater}>
                  <Text style={CardStyle.text}>{data.title}</Text>
                </View>
              </View>
            </View>
          </Ripple>
        </View>
      </View>
    );
  }

  render() : JSX.Element {
    return (
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
    );
  }
}
