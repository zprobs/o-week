import getTheme from '@root/theme';
import { Dimensions, ImageStyle, StyleSheet, ViewStyle } from 'react-native';

const { width } = Dimensions.get('window');

interface GalleryStyles {
  container: ViewStyle;
  image: ImageStyle;
}

const makeStyles = (): GalleryStyles => {
  const theme = getTheme();

  return StyleSheet.create<GalleryStyles>({
    image: {
      width: width - 50,
      height: width - 50,
      borderRadius: 12,
      marginVertical: 10,
      backgroundColor: theme.palette.placeholder,
    },
    container: {
      flex: 1,
      backgroundColor: theme.palette.base,
      alignItems: 'center',
    },
  });
};

export default makeStyles;
