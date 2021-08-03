import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface FormInputStyles {
  labelTextStyle: ViewStyle;
  textStyle: TextStyle;
  placeholderTextColor: TextStyle;
}

const makeStyles = (): FormInputStyles => {
  const theme = getTheme();

  return StyleSheet.create<FormInputStyles>({
    labelTextStyle: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.label,
      color: theme.palette.accent,
      marginVertical: 10,
    },
    textStyle: {
      fontFamily: theme.font.light,
      fontSize: theme.size.body,
      color: theme.palette.text01,
      marginBottom: 15,
    },
    placeholderTextColor: {
      color: theme.palette.text02,
    },
  });
};

export default makeStyles;
