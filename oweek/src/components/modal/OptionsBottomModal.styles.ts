import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface OptionsBottomModalStyles {
  container: ViewStyle;
  content: ViewStyle;
  optionContainer: ViewStyle;
  label: TextStyle;
  iconColor: TextStyle & { color: string };
  unBlockColor: TextStyle & { color: string };
  blockColor: TextStyle & { color: string };
}

const makeStyles = (): OptionsBottomModalStyles => {
  const theme = getTheme();

  return StyleSheet.create<OptionsBottomModalStyles>({
    container: {
      padding: 20,
      backgroundColor: theme.palette.base,
    },
    content: {
      paddingTop: 20,
      paddingBottom: 16,
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    label: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.body,
      marginLeft: 10,
    },
    iconColor: {
      color: theme.palette.text01,
    },
    unBlockColor: {
      color: theme.palette.black,
    },
    blockColor: {
      color: theme.palette.delete,
    },
  });
};

export default makeStyles;
