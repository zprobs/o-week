import getTheme from '@root/theme';
import { StyleSheet, ViewStyle } from 'react-native';

const makeStyles = () => {
  const theme = getTheme();

  interface Styles {
    container: ViewStyle;
  }

  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
      backgroundColor: theme.palette.base,
    },
  });
};

export default makeStyles;
