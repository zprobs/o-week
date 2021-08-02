import getTheme from '@root/theme';
import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ButtonColorStyles {
  container: ViewStyle;
  label: TextStyle;
  icon: ViewStyle;
}

const makeStyles = (
  isIcon: boolean,
  isLight: boolean,
  colour: string | ColorValue,
): ButtonColorStyles => {
  const theme = getTheme();

  return StyleSheet.create<ButtonColorStyles>({
    container: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isIcon ? 'space-between' : 'center',
      paddingVertical: 5,
      borderRadius: 40,
      backgroundColor: colour,
    },
    label: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.body,
      marginLeft: 5,
      color: isLight ? theme.palette.white : theme.palette.accent,
      justifyContent: 'center',
    },
    icon: {
      marginRight: 20,
    },
  });
};

export default makeStyles;
