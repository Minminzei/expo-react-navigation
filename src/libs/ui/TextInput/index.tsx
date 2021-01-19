import * as React from 'react';
import * as _ from 'lodash';
import {
  View, TextInput, Keyboard,
  Platform, StyleSheet, TextStyle,
} from 'react-native';
import Text from '../Text';
import { Color, FontSize } from '@libs/style';

const baseHeight = 15;
const paddingVeritcal = 8;

const Css = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: 26,
    paddingLeft: 8,
    paddingRight: 8,
  },
  labelColumn: {
    flex: 1,
  },
  labelText: {
    ...FontSize.md,
  },
  required: {
    width: 32,
    height: 16,
    marginTop: 4,
    marginLeft: 4,
    backgroundColor: Color.red1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requiredText: {
    color: Color.white1,
    ...FontSize.xxs,
  },
  field: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black3,
    borderRadius: 4,
    height: 32,
    backgroundColor: Color.white1,
    fontSize: 14,
    lineHeight: 20,
  },
  textarea: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black3,
    backgroundColor: Color.white1,
  },
  disabled: {
    backgroundColor: Color.black4,
  },
  unit: {
    position: 'absolute',
    zIndex: 2,
    right: 8,
    bottom: 4,
    height: 32,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black3,
    backgroundColor: Color.black4,
  },
  unitText: {
    ...FontSize.xs,
  },
});

interface Props {
  label?: string | null;
  required?: boolean;
  type?: 'text' | 'password' | 'numeric' | 'phone' | 'url' | 'email';
  disabled?: boolean;
  value?: string | number | Date | null;
  placeholder?: string;
  onChange: Function;
  maxLength?: number;
  style?: TextStyle;
  numberOfLines?: number;
  unit?: string;
}

interface State {
  value: string | number | Date | null;
  focused: boolean;
  options: any;
  height: number;
  minHeight: number;
}

const KeyboardTypeMap = {
  text: {
    default: 'default',
    ios: 'default',
    android: 'default',
  },
  email: {
    default: 'default',
    ios: 'email-address',
    android: 'email-address',
  },
  password: {
    default: 'default',
    ios: 'ascii-capable',
    android: 'ascii-capable',
  },
  numeric: {
    default: 'default',
    ios: 'number-pad',
    android: 'numeric',
  },
  phone: {
    default: 'default',
    ios: 'phone-pad',
    android: 'phone-pad',
  },
  url: {
    default: 'default',
    ios: 'url',
    android: 'ascii-capable',
  },
};

export default class InputField extends React.Component<Props, State> {
  static defaultProps = {
    label: '',
    required: false,
    type: 'text',
    disabled: false,
    value: '',
    placeholder: '',
    onChange: () => {},
    maxLength: 100,
    numberOfLines: 1,
  };

  constructor(props) {
    super(props);
    const commonOptions = {
      maxLength: 100,
      placeholder: this.props.placeholder || null,
      placeholderTextColor: Color.black2,
    };
    const numberOfLines = this.props.numberOfLines || 1;
    const firstHeight = numberOfLines * baseHeight;
    this.state = {
      value: this.value,
      focused: false,
      options: {
        ...commonOptions,
        ...this.customOptions,
      },
      height: firstHeight,
      minHeight: firstHeight,
    };
    this.change = this.change.bind(this);
  }

  get style() : TextStyle[] {
    const styles: TextStyle[] = [Css.field];
    if (this.props.disabled) {
      styles.push(Css.disabled);
    }
    if (this.props.style) {
      styles.push(this.props.style);
    }
    if (this.props.numberOfLines && this.props.numberOfLines > 1) {
      styles.push({
        height: this.state.height + paddingVeritcal,
        lineHeight: 14,
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
      });
    }
    return styles;
  }

  $field: TextInput | null = null;

  static getDerivedStateFromProps(nextProps:Props, prevState:State) : {
    value: string | number | Date | null;
  } | null {
    if (nextProps.value !== prevState.value) {
      return {
        value: nextProps.value === undefined ? null : nextProps.value,
      };
    }
    return null;
  }

  get value() : string {
    if (this.props.value || this.props.value === 0) {
      return String(this.props.value) || '';
    }
    return '';
  }

  get customOptions() : {[index:string]: any; } {
    const type = this.props.type || 'text';
    if (type === 'password') {
      return {
        secureTextEntry: true,
        keyboardType: KeyboardTypeMap.password[Platform.OS] || KeyboardTypeMap.password.default,
      };
    }
    return {
      keyboardType: KeyboardTypeMap[type][Platform.OS] || KeyboardTypeMap[type].default,
    };
  }

  convert(value) {
    switch (this.props.type) {
      case 'numeric':
        if (value === 0 || value === '0' || value) {
          const numberData =  Number(_.trim(value.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))));
          if (!isNaN(numberData)) {
            return numberData;
          }
        }
        return null;
      case 'url':
      case 'email':
        const trimed = _.trim(value);
        return trimed;
      case 'phone':
        const phone = Number(_.trim(value).toLowerCase().replace(/\-/gi, ''));
        if (!isNaN(phone)) {
          return phone;
        }
        return null;
      case 'text':
        return value.replace(/\t|\"|\\|\b|\r|\f/gi, '');
      case 'password':
      default:
        return _.trim(value);
    }
  }

  change(value) : void {
    const converted = this.convert(value);
    this.props.onChange(converted);
  }

  get label() : JSX.Element {
    return (
      <View style={Css.label}>
        <View style={Css.labelColumn}>
          <Text style={Css.labelText}>{this.props.label}</Text>
        </View>
        {(this.props.required) ? (
          <View style={Css.required}>
            <Text style={Css.requiredText}>必須</Text>
          </View>
        ) : null}
      </View>
    );
  }

  render() : JSX.Element {
    return (
      <View style={Css.item}>
        {this.props.label ? this.label : null}
        <TextInput
          ref={(ref:TextInput) => this.$field = ref}
          {...this.state.options}
          editable={!this.props.disabled}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this.change}
          value={this.value}
          underlineColorAndroid="transparent"
          blurOnSubmit={false}
          style={this.style}
          onBlur={() => Keyboard.dismiss()}
          maxLength={this.props.maxLength}
          allowFontScaling={false}
          numberOfLines={this.props.numberOfLines}
          onContentSizeChange={(event) => {
            if (Platform.OS === 'web') {
              return;
            }
            const { nativeEvent } = event;
            if (nativeEvent && nativeEvent.contentSize) {
              const { height } = nativeEvent.contentSize;
              if (height !== this.state.height) {
                if (height > this.state.minHeight) {
                  this.setState({ height });
                } else if (this.state.height > this.state.minHeight) {
                  this.setState({ height: this.state.minHeight });
                }
              }
            }
          }}
        />
        {this.props.unit ? (
          <View style={Css.unit}>
            <Text style={Css.unitText}>{this.props.unit}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
