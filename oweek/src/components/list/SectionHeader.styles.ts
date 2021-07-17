import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  number: TextStyle;
  row: ViewStyle;
  width: ViewStyle;
}

const makeStyles = (): Styles => {
  const theme = getTheme();

  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: theme.palette.white,
      paddingHorizontal: 25,
    },
    title: {
      fontSize: theme.size.label,
      fontFamily: theme.font.bold,
      color: theme.palette.text03,
      marginRight: 15,
    },
    number: {
      fontSize: theme.size.label,
      fontFamily: theme.font.bold,
      color: theme.palette.delete,
    },
    row: {
      flexDirection: 'row',
    },
    width: {
      width: 10,
    },
  });
};

export default makeStyles;
