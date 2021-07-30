import getTheme from '@root/theme';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface HorizontalUserCardStyles {
  container: ViewStyle;
  image: ImageStyle;
  name: TextStyle;
}

const makeStyles = (): HorizontalUserCardStyles => {
  const theme = getTheme();

  return StyleSheet.create<HorizontalUserCardStyles>({
    container: {
      backgroundColor: theme.palette.base,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    image: {
      backgroundColor: theme.palette.placeholder,
      width: 80,
      height: 80,
      borderRadius: 40,
      marginVertical: 10,
    },
    name: {
      fontSize: theme.size.caption,
      fontFamily: theme.font.bold,
      color: theme.palette.text02,
    },
  });
};

export default makeStyles;
