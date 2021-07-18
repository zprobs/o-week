import getTheme from '@root/theme';
import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}

const makeStyles = (): Styles => {
  const theme = getTheme();

  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
      backgroundColor: theme.palette.base,
    },
  });
};

export default makeStyles;
