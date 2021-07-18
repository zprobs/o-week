import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

interface HeaderStyles {
  container: ViewStyle;
  welcomeTitle: TextStyle;
  welcomeSubTitle: TextStyle;
  userScrollView: ViewStyle;
  userImage: ImageStyle;
  buttonText: TextStyle;
  scheduleButton: ViewStyle;
}

const makeStyles = (): HeaderStyles => {
  const theme = getTheme();

  return StyleSheet.create<HeaderStyles>({
    container: {
      flex: 1,
      backgroundColor: theme.palette.base,
    },
    welcomeTitle: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.heading,
      color: theme.palette.text03,
      marginTop: 30,
    },
    welcomeSubTitle: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.label,
      color: theme.palette.text02,
      paddingTop: 10,
    },
    userScrollView: {
      marginBottom: 10,
      marginTop: 24,
      paddingHorizontal: 15,
    },
    userImage: {
      width: 66,
      height: 66,
      borderRadius: 33,
      marginHorizontal: 8,
      backgroundColor: theme.palette.placeholder,
    },
    buttonText: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.body,
      color: theme.palette.text01,
    },
    scheduleButton: {
      marginVertical: 25,
    },
  });
};

export default makeStyles;
