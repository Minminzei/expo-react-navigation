import { Dimensions, Platform } from 'react-native';

const Mobile = 480;
const Tablet = 800;

interface FontStyle {
  fontSize: number;
  lineHeight: number;
}

class FontSize {
  constructor() {
    Dimensions.addEventListener('change', this.setup.bind(this));
    this.setup();
  }

  public fontStyle : { [index:string]: FontStyle; } = {};

  private mobileStyle() : { [index:string]: FontStyle; } {
    switch (Platform.OS) {
      case 'android':
        return {
          xxs: {
            fontSize: 12,
            lineHeight: 12,
          },
          xs: {
            fontSize: 14,
            lineHeight: 20,
          },
          sm: {
            fontSize: 15,
            lineHeight: 25,
          },
          md: {
            fontSize: 17,
            lineHeight: 25,
          },
          lg: {
            fontSize: 20,
            lineHeight: 26,
          },
          xl: {
            fontSize: 22,
            lineHeight: 28,
          },
          xxl: {
            fontSize: 24,
            lineHeight: 30,
          },
          xxxl: {
            fontSize: 30,
            lineHeight: 36,
          },
        };
      case 'ios':
      default:
        return {
          xxs: {
            fontSize: 12,
            lineHeight: 12,
          },
          xs: {
            fontSize: 14,
            lineHeight: 20,
          },
          sm: {
            fontSize: 15,
            lineHeight: 25,
          },
          md: {
            fontSize: 17,
            lineHeight: 25,
          },
          lg: {
            fontSize: 20,
            lineHeight: 26,
          },
          xl: {
            fontSize: 22,
            lineHeight: 28,
          },
          xxl: {
            fontSize: 24,
            lineHeight: 30,
          },
          xxxl: {
            fontSize: 30,
            lineHeight: 36,
          },
        };
    }
  }

  private pcStyle() : { [index:string]: FontStyle; } {
    return {
      xxs: {
        fontSize: 12,
        lineHeight: 12,
      },
      xs: {
        fontSize: 14,
        lineHeight: 14,
      },
      sm: {
        fontSize: 15,
        lineHeight: 25,
      },
      md: {
        fontSize: 17,
        lineHeight: 25,
      },
      lg: {
        fontSize: 20,
        lineHeight: 26,
      },
      xl: {
        fontSize: 22,
        lineHeight: 28,
      },
      xxl: {
        fontSize: 26,
        lineHeight: 34,
      },
      xxxl: {
        fontSize: 34,
        lineHeight: 58,
      },
    };
  }

  private tabletStyle() : { [index:string]: FontStyle; } {
    return {
      xxs: {
        fontSize: 12,
        lineHeight: 13,
      },
      xs: {
        fontSize: 14,
        lineHeight: 20,
      },
      sm: {
        fontSize: 15,
        lineHeight: 25,
      },
      md: {
        fontSize: 17,
        lineHeight: 25,
      },
      lg: {
        fontSize: 20,
        lineHeight: 26,
      },
      xl: {
        fontSize: 24,
        lineHeight: 30,
      },
      xxl: {
        fontSize: 26,
        lineHeight: 34,
      },
      xxxl: {
        fontSize: 34,
        lineHeight: 58,
      },
    };
  }

  //
  // 画面サイズ × OSでフォントサイズを規定する
  //
  private setup() {
    const { width } = Dimensions.get('window');
    if (width < Mobile) {
      // mobile
      this.fontStyle = this.mobileStyle();
    } else if (width < Tablet) {
      // tablet
      this.fontStyle = this.tabletStyle();
    } else {
      // pc
      this.fontStyle = this.pcStyle();
    }
  }
}

const font = new FontSize();
export default font.fontStyle;
