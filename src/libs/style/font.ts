import { Platform } from 'react-native';

const strongFont = () : string => {
  switch (Platform.OS) {
    case 'ios':
      return 'Hiragino Sans';
    case 'android':
      return 'sans-serif';
    case 'web':
    default:
      return 'Hiragino Kaku Gothic ProN';
  }
};

const defaultFont = () : string => {
  switch (Platform.OS) {
    case 'ios':
      return 'Hiragino Sans';
    case 'android':
      return 'sans-serif';
    case 'web':
    default:
      return 'Hiragino Kaku Gothic ProN';
  }
};

const numericFont = () : string => {
  switch (Platform.OS) {
    case 'ios':
      return 'Helvetica Neue';
    case 'android':
      return 'sans-serif';
    case 'web':
    default:
      return 'Helvetica Neue';
  }
};

export default {
  strong: {
    fontFamily: strongFont(),
    fontWeight: Platform.OS !== 'android' ? '600' as '600' : 'bold' as 'bold',
  },
  numeric: {
    fontFamily: numericFont(),
  },
  default: {
    fontFamily: defaultFont(),
  },
};
