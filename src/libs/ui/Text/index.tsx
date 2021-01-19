import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextStyle } from 'react-native';
import * as Linking from 'expo-linking';
import { FontSize, Color, Font } from '@libs/style';
import * as _ from 'lodash';

const Css = StyleSheet.create({
  container: {
    ...Font.default,
    color: Color.black1,
    ...FontSize.md,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  linkText: {
    color: Color.blue1,
  },
  emoji: {
    fontFamily: 'System',
  },
});

interface Props {
  style?: any;
  children: any;
  length?: number;
  omission?: string;
  disableCopy?: boolean;
}

const Regex = {
  url: /(https?:\/\/[a-zA-Z0-9-.!'()*;/?:@&=+$,%#]+)/g,
};

export default class TextUi extends React.Component<Props> {
  static defaultProps = {
    omission: '...',
  };

  shouldComponentUpdate(nextProps) : boolean {
    if (nextProps.children !== this.props.children) {
      return true;
    } else if (nextProps.style !== this.props.style) {
      return true;
    }
    return false;
  }

  style(css?:TextStyle) : TextStyle[] {
    const styles: TextStyle[] = [Css.container];
    if (this.props.style) {
      styles.push(this.props.style);
    }
    if (css) {
      styles.push(css);
    }
    return styles;
  }

  openUrl(url:string) : void {
    Linking.openURL(url);
  }

  text(message:any) : JSX.Element | null {
    if (!message) {
      return null;
    }

    if (this.props.length) {
      return (
        <Text
          style={this.style()}
          allowFontScaling={false}
          selectable={!this.props.disableCopy}
        >
           {_.truncate(_.replace(message, /\n|\r/gi, ''), { length: this.props.length, omission: this.props.omission })}
        </Text>
      );
    }
    return (
      <Text
        style={this.style()}
        allowFontScaling={false}
        selectable={!this.props.disableCopy}
      >
        {message}
      </Text>
    );
  }

  messages(content:string) : JSX.Element | null {
    if (!_.trim(content)) {
      return null;
    }
    if (Regex.url.test(content)) {
      const contents: string[] = content.split(Regex.url);
      return (
        <View>
          {contents.map((row:string, index:number) => {
            if (Regex.url.test(row)) {
              return (
                <TouchableOpacity
                  key={`text-ui-${index}`}
                  onPress={() => this.openUrl(row)}
                >
                  <Text
                    style={this.style(Css.linkText)}
                    allowFontScaling={false}
                    selectable={!this.props.disableCopy}
                  >
                    {row}
                  </Text>
                </TouchableOpacity>
              );
            }
            return (
              <View key={`text-ui-${index}`}>
                {this.text(_.trim(row))}
              </View>
            );
          })}
        </View>
      );
    }
    return this.text(content);
  }

  render() : JSX.Element | null {
    if (Array.isArray(this.props.children)) {
      return (
        <View style={Css.wrapper}>
          {this.props.children.map((row, index:number) => {
            if (_.trim(row)) {
              return (
                <View key={`text-ui-array-${index}`}>
                  {this.messages(row)}
                </View>
              );
            }
            return null;
          })}
        </View>
      );
    }
    return this.messages(this.props.children);
  }
}
