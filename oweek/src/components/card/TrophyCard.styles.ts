import getTheme from '@root/theme';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface TrophyCardStyle {
  container: ViewStyle;
  image: ImageStyle;
  shadow: ViewStyle;
  name: TextStyle;
}

const makeStyles = (): TrophyCardStyle => {
  const theme = getTheme();

  return StyleSheet.create<TrophyCardStyle>({
    container: {
      alignItems: 'center',
      marginHorizontal: 10,
      overflow: 'visible',
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 44,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadow: {
      shadowColor: 'rgba(204, 204, 204, 0.5)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 8,
      shadowOpacity: 1,
    },
    name: {
      fontSize: theme.size.caption,
      fontFamily: theme.font.bold,
      color: theme.palette.text02,
    },
  });
};

export default makeStyles;
