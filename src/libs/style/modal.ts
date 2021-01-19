import { StyleSheet } from 'react-native';
import Color from '../style/color';
import Font from '../style/font';

const Modaltyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white1,
  },
  header: {
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: Color.black3,
    borderStyle: 'solid',
    height: 50,
  },
  headerTitle: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  headerTitleText: {
    ...Font.strong,
    lineHeight: 50,
  },
  headerButton: {
    height: 50,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerButtonText: {
    lineHeight: 50,
  },
  body: {
    padding: 8,
    flex: 1,
  },
});

export default Modaltyle;
