import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ImgBannerStyles {
  container: ViewStyle;
  placeholderText: TextStyle;
}

const makeStyles = (): ImgBannerStyles => {
  const theme = getTheme();

  return StyleSheet.create<ImgBannerStyles>({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    placeholderText: {
      fontFamily: theme.font.light,
      fontSize: theme.size.label,
      color: theme.palette.text02,
      marginTop: 40,
    },
  });
};

export default makeStyles;
