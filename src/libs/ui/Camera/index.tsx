import * as React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Modal, SafeAreaView, Platform, ViewStyle,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '@libs/style';
import Text from '../Text';
import Loading from '../Loading';

const Css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // header
  header: {
    height: 80,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
  },
  light: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  // camera
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraScreen: {
    width: 300,
    height: 400,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  // menu
  menu: {
    height: 150,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    height: '100%',
    width: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mode: {
    height: '100%',
    width: 100,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cancelText: {
    color: Color.yellow1,
    fontSize: 18,
  },
  circle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Color.white1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleL: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Color.white1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // error
  error: {
    position: 'absolute',
    top: 80,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  errorWrapper: {
    padding: 8,
  },
  errorArea: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Color.red2,
    borderRadius: 8,
  },
  errorMessage: {
    flex: 1,
  },
  errorText: {
    color: Color.white1,
  },
  reset: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.red2,
  },
});

interface Props {
  onChange: Function;
  onClose: Function;
}

interface State {
  faceMode: 'front' | 'back';
  flashMode: 'off' | 'auto';
  size: number | null;
  processing: boolean;
  error: string | null;
  loaded: boolean;
}

export default  class CameraUi extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
    this.snap = this.snap.bind(this);
    this.state = {
      faceMode: 'back',
      flashMode: 'auto',
      size: null,
      processing: false,
      error: null,
      loaded: false,
    };
  }

  $camera: any;

  async componentDidMount() : Promise<void> {
    try {
      const camera = await Permissions.askAsync(Permissions.CAMERA);
      if (camera.status !== 'granted') {
        throw new Error('カメラへのアクセスが拒否されました。');
      }
      if (Platform.OS  === 'web' && !await Camera.isAvailableAsync()) {
        throw new Error('カメラへのアクセスが拒否されました。');
      }
    } catch (e) {
      this.setState({
        error: e.message,
      });
    }
  }

  async initializeCamera(e) {
    try {
      await this.$camera.resumePreview();
      this.setState({ loaded: true });
    } catch (e) {
      this.setState({ error: 'カメラの初期化に失敗しました' });
    }
  }

  async snap() : Promise<void> {
    try {
      if (this.state.processing) {
        return;
      }
      this.setState({ processing: true });
      const photo = await this.$camera.takePictureAsync();
      this.props.onChange(photo);
    } catch (e) {
      this.setState({
        error: '撮影できませんでした',
        processing: false,
      });
    }
  }

  get cameraStyle() : ViewStyle {
    return {
      width: this.state.size || '100%',
      height: this.state.size || '100%',
    };
  }

  onLayout(events) : void {
    if (events.nativeEvent) {
      const size = _.min([events.nativeEvent.layout.width, events.nativeEvent.layout.height]);
      this.setState({
        size,
      });
    }
  }

  render() : JSX.Element {
    return (
      <Modal
        animationType="none"
        visible
        onRequestClose={() => this.props.onClose()}
      >
        <View style={Css.container}>
          <SafeAreaView style={Css.container}>
            <View style={Css.header}>
              <TouchableOpacity
                style={Css.light}
                onPress={() => {
                  this.setState({
                    flashMode: this.state.flashMode === 'auto' ? 'off' : 'auto',
                  });
                }}
              >
                <Icon
                  name={this.state.flashMode === 'auto' ? 'flash' : 'flash-off'}
                  color={Color.white1}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View
              style={Css.camera}
              onLayout={this.onLayout}
            >
              <Camera
                style={this.cameraStyle}
                type={Camera.Constants.Type[this.state.faceMode]}
                flashMode={Camera.Constants.FlashMode[this.state.flashMode]}
                ref={ref => this.$camera = ref}
                onCameraReady={this.initializeCamera}
              />
              {!this.state.loaded ? (
                <View style={Css.loading}>
                  <Loading />
                </View>
              ) : null}
            </View>
            <View style={Css.menu}>
              <TouchableOpacity
                style={Css.cancel}
                onPress={() => this.props.onClose()}
              >
                <Text style={Css.cancelText}>キャンセル</Text>
              </TouchableOpacity>
              <View style={Css.button}>
                <TouchableOpacity
                  style={Css.circleL}
                  onPress={this.snap}
                >
                  <Icon name="radiobox-blank" size={30} color={Color.black1} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={Css.mode}
                onPress={() => {
                  this.setState({
                    faceMode: this.state.faceMode === 'back' ? 'front' : 'back',
                  });
                }}
              >
                <View style={Css.circle}>
                  <Icon name="camera-party-mode" size={30} color={Color.black1} />
                </View>
              </TouchableOpacity>
            </View>
            {this.state.error ? (
              <View style={Css.error}>
                <View style={Css.errorWrapper}>
                  <View style={Css.errorArea}>
                    <View style={Css.errorMessage}>
                      <Text style={Css.errorText}>{this.state.error}</Text>
                    </View>
                    <TouchableOpacity
                      style={Css.reset}
                      onPress={() => this.setState({ error: null })}
                    >
                      <Icon name="close" size={30} color={Color.white1} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null}
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
}
