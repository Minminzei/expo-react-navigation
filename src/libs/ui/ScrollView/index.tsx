import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

const Css = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  page: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    maxWidth: 800,
  },
});

interface Props {
  hasFlatlist?: boolean;
  onScroll?: Function;
  onMomentumScrollBegin?: Function;
}

interface State {
  scrollEventThrottle: number;
}

class Scroll extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      scrollEventThrottle: Date.now(),
    };
  }

  $scroll: ScrollView | null = null;

  scrollTop() : void {
    if (this.$scroll) {
      this.$scroll.scrollTo({ x: 0, y: 0, animated: false });
    }
  }

  onScroll({ nativeEvent }) : void {
    if (this.props.onScroll) {
      this.props.onScroll(nativeEvent.contentOffset);
    }
  }

  render() {
    return (
      <ScrollView
        style={Css.scroll}
        scrollEventThrottle={400}
        onScroll={this.onScroll}
        ref={ref => this.$scroll = ref}
      >
        <View style={Css.page}>
          <View style={Css.content}>
            {this.props.children}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Scroll;
