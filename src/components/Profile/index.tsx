import * as React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Alert,
  ImageBackground, Modal, SafeAreaView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Data } from '@modules/Profile';
import {
  Button, Loading, TextInput, KeyboardAvoidingView,
  ImagePicker, Picker, Camera, ScrollView, Text,
} from '@libs/ui';
import { FilePath } from '@modules/Apps';
import { Events } from '@modules/EventUsers';
import { RootProps } from '@libs/common';
import validator from '@libs/validate';
import { Color, FontSize, Font, ModalStyle, CardStyle } from '@libs/style';

const Css = StyleSheet.create({
  container: {
    flex: 1,
  },
  // head
  head: {
    width: '100%',
    backgroundColor: Color.white1,
  },
  edit: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
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
    width: 100,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  thumbnailIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: Color.layer2,
  },
  cover: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: '100%',
    backgroundColor: Color.layer2,
  },
  coverIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.white1,
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
  loading: {
    height: 200,
  },
  item: {
    padding: 8,
  },
  button: {
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props extends RootProps {
  data: Data;
  events: Events;
  save: Function;
  fetchEventsByUser: Function;
}

interface State {
  loaded: boolean;
  profile: Data | null;
  loading: boolean;
  media: 'image' | 'cover' | null;
  picker: boolean;
  imagePicker: boolean;
  camera: boolean;
}

export default class ProfileComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.update = this.update.bind(this);
    this.save = this.save.bind(this);
    this.move = this.move.bind(this);
    this.openMedia = this.openMedia.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.changedPhoto = this.changedPhoto.bind(this);
    this.state = {
      loaded: false,
      profile: null,
      loading: false,
      media: null,
      picker: false,
      imagePicker: false,
      camera: false,
    };
  }

  mounted: boolean = false;
  options = [
    {
      label: '写真を撮る',
      value: 'camera',
    },
    {
      label: '写真を選択',
      value: 'library',
    },
  ];

  async componentDidMount() : Promise<void> {
    try {
      this.mounted = true;
      await this.props.fetchEventsByUser(this.props.data.id);
      if (this.mounted) {
        this.setState({ loaded: true });
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
      if (!this.state.profile) {
        return;
      }
      const error = validator(this.state.profile);
      if (error) {
        throw new Error(error);
      }
      this.setState({ loading: true });
      await this.props.save(this.state.profile);
      if (this.mounted) {
        this.setState({ loading: false });
        Alert.alert('保存しました');
      }
    } catch (e) {
      this.setState({ loading: false });
      Alert.alert(e.message);
    }
  }

  openMedia(mode: 'camera' | 'library') : void {
    if (mode === 'camera') {
      this.setState({
        camera: true,
        picker: false,
      });
    } else {
      this.setState({
        imagePicker: true,
        picker: false,
      });
    }
  }

  closePicker() : void {
    this.setState({
      media: null,
      picker: false,
      imagePicker: false,
      camera: false,
    });
  }

  move(id: string) : void {
    const { navigation } = this.props;
    navigation.navigate('Event', { id });
  }

  update(colum, val) {
    if (this.state.profile) {
      this.state.profile[colum] = val;
      this.setState({ profile: this.state.profile });
    }
  }

  changedPhoto(uri: string) : void {
    if (this.state.profile && this.state.media) {
      this.update(this.state.media, uri);
      this.closePicker();
    }
  }

  get rankingText() : string {
    if (this.props.data.league) {
      return `${this.props.data.league}リーグ ${this.props.data.ranking || '--'}位`;
    }
    return '所属リーグはありません';
  }

  render() : JSX.Element {
    return (
      <View style={Css.container}>
        <ScrollView>
          <View style={Css.head}>
            <ImageBackground
              source={{ uri: this.props.data.cover || '' }}
              style={Css.cover}
            >
              <View style={Css.edit}>
                <Button
                  title="プロフィール編集"
                  onPress={() => this.setState({
                    profile: new Data(this.props.data),
                  })}
                  width={120}
                  height={24}
                  color={Color.primary}
                  textStyle={{
                    ...FontSize.xxs,
                  }}
                />
              </View>
            </ImageBackground>
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
            {this.state.loaded ? (
              <View>
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
            ) : (
              <View style={Css.loading}>
                <Loading />
              </View>
            )}
          </View>
        </ScrollView>
        {this.state.profile ? (
          <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            visible
            onRequestClose={() => this.setState({ profile: null })}
          >
            <SafeAreaView style={ModalStyle.container}>
              <TouchableOpacity
                style={ModalStyle.header}
                onPress={() => this.setState({ profile: null })}
              >
                <View style={ModalStyle.headerButton}>
                  <Icon name="close" size={30} />
                </View>
                <View style={ModalStyle.headerTitle}>
                  <Text style={ModalStyle.headerTitleText}>
                    プロフィール編集
                  </Text>
                </View>
              </TouchableOpacity>
              <KeyboardAvoidingView>
                <ScrollView>
                  <ImageBackground
                    source={{ uri: this.state.profile.cover }}
                    style={{
                      width: '100%',
                      height: 120,
                    }}
                  >
                    <TouchableOpacity
                      style={Css.cover}
                      onPress={() => this.setState({
                        picker: true,
                        media: 'cover',
                      })}
                    >
                      <View style={Css.coverIcon}>
                        <Icon name="camera-plus" color={Color.white1} size={30} />
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                  <View style={Css.item}>
                    <ImageBackground
                      source={{ uri: this.state.profile.image }}
                      style={Css.thumbnail}
                    >
                      <TouchableOpacity
                        style={Css.thumbnailIcon}
                        onPress={() => this.setState({
                          picker: true,
                          media: 'image',
                        })}
                      >
                        <Icon name="camera-plus" color={Color.white1} size={35} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>

                  <TextInput
                    label="ニックネーム"
                    required
                    value={this.state.profile.name}
                    onChange={(name:string) => this.update('name', name)}
                  />

                  <TextInput
                    label="自己紹介"
                    placeholder="意識したことやミス傾向、悩みなどを詳しく記入すると、より的確なアドバイスが届きます。"
                    numberOfLines={3}
                    maxLength={200}
                    value={this.state.profile.comment || ''}
                    onChange={(comment:string) => this.update('comment', comment)}
                  />

                  <TextInput
                    type="numeric"
                    label="スコア"
                    placeholder="分からない場合は200と入力"
                    value={this.state.profile.score}
                    onChange={(score:number|null) => this.update('score', score)}
                  />

                  <TextInput
                    label="活動エリア"
                    value={this.state.profile.location}
                    onChange={(location:string) => this.update('location', location)}
                  />

                  <TextInput
                    label="ゴルフ歴"
                    type="numeric"
                    unit="年"
                    value={this.state.profile.career}
                    onChange={(career:number|null) => this.update('career', career)}
                  />

                  <View style={Css.button}>
                    <Button
                      title="保存する"
                      onPress={() => this.save()}
                      backgroundColor={Color.primary}
                      color={Color.white1}
                      loading={this.state.loading}
                    />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </SafeAreaView>
            {this.state.picker ? (
              <Picker
                onCancel={this.closePicker}
                onSelect={this.openMedia}
                options={this.options}
              />
            ) : null}
            {this.state.imagePicker ? (
            <ImagePicker
              onChange={({ uri }) => this.changedPhoto(uri)}
              onClose={this.closePicker}
              onError={(error:string) => Alert.alert(error)}
            />
          ) : null}
            {this.state.camera ? (
              <Camera
                onChange={({ uri }) => this.changedPhoto(uri)}
                onClose={this.closePicker}
              />
            ) : null}
          </Modal>
        ) : null}
      </View>
    );
  }
}
