import * as React from 'react';
import {
  View, StyleSheet, Image,
  ImageBackground, ImageStyle,
} from 'react-native';
import { Color } from '@libs/style';

const Css = StyleSheet.create({
  noimage: {
    backgroundColor: Color.black3,
  },
});

interface Props {
  source: {
    uri: string;
  };
  style?: ImageStyle;
  children?: JSX.Element;
}

interface State {
  url: string;
}

export default class ImageUi extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      url: this.props.source.uri,
    };
  }

  render() : JSX.Element {
    if (this.props.children) {
      if (this.state.url) {
        return (
          <ImageBackground
            style={this.props.style}
            source={{
              uri: this.state.url,
            }}
            onError={() => this.setState({ url: '' })}
          >
            {this.props.children}
          </ImageBackground>
        );
      }
      return (
        <View style={[this.props.style, Css.noimage]}>
          {this.props.children}
        </View>
      );
    } else if (this.state.url) {
      return (
        <Image
          style={this.props.style}
          source={{
            uri: this.state.url,
          }}
          onError={() => this.setState({ url: '' })}
        />
      );
    }
    return <View style={[this.props.style, Css.noimage]} />;
  }
}
