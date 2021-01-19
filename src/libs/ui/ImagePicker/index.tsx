import * as React from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as _ from 'lodash';

interface Props {
  onChange: Function;
  onClose: Function;
  onError: Function;
}

export default  class CameraUi extends React.Component<Props> {
  async componentDidMount() : Promise<void> {
    try {
      const cameraRoll = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (cameraRoll.status !== 'granted') {
        throw new Error('写真へのアクセスが拒否されました。端末のアプリ設定から許可してください。');
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: Platform.OS === 'ios',
        aspect: [1, 1],
        base64: true,
      });
      if (res.cancelled) {
        this.props.onClose();
        return;
      }
      this.props.onChange({
        uri: res.uri,
      });
    } catch (e) {
      this.props.onError(e.message);
    }
  }

  render() : null {
    return null;
  }
}
