import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface LikeButtonStyles {
  container: ViewStyle;
  countText: TextStyle;
}

const makeStyles = (): LikeButtonStyles => {
  const theme = getTheme();

  return StyleSheet.create<LikeButtonStyles>({
    container: {
      padding: 4,
    },
    countText: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.subText,
      color: theme.palette.accent,
    },
  });
};

export default makeStyles;
