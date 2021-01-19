import { StyleSheet, Platform } from 'react-native';
import Color from '../style/color';
import FontSize from '../style/fontSize';

const CardStyle = StyleSheet.create({
  card: {
    padding: 8,
  },
  container: {
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.black3,
    backgroundColor: Color.white1,
    shadowColor: Color.black3,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  image: {
    position: 'relative',
  },
  imageRadius: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  body: {
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 20,
  },
  bodyPlane: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    ...FontSize.sm,
    color: Color.black1,
  },
  label: {
    ...FontSize.sm,
    color: Color.link,
  },
  subline: {
    ...FontSize.sm,
    color: Color.black2,
  },
  text: {
    ...FontSize.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  separater: {
    marginTop: 8,
  },
  user: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 4,
  },
  userName: {
    ...FontSize.xs,
  },
});

export default CardStyle;
