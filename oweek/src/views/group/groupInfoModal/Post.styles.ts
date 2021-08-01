import getTheme from '@root/theme';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface PostStyles {
  container: ViewStyle;
  header: ViewStyle;
  user: ViewStyle;
  image: ImageStyle;
  name: TextStyle;
  time: TextStyle;
  body: TextStyle;
}

const makeStyles = (): PostStyles => {
  const theme = getTheme();

  return StyleSheet.create<PostStyles>({
    container: {
      width: '100%',
      height: 205,
      backgroundColor: theme.palette.placeholder,
      marginTop: 25,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginTop: 15,
    },
    user: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 15,
    },
    name: {
      fontSize: theme.size.bodyLarge,
      fontFamily: theme.font.bold,
      color: theme.palette.text03,
    },
    time: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.subText,
      color: theme.palette.gold,
    },
    body: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.body,
      color: theme.palette.text02,
      lineHeight: 21,
      marginBottom: 8,
      marginTop: 12,
      marginHorizontal: 15,
    },
  });
};

export default makeStyles;
