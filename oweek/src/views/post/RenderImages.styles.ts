import getTheme from '@root/theme';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface RenderImagesProps {
  galleryImage: ImageStyle;
  moreImages: ViewStyle;
  moreImagesText: TextStyle;
  gallery: ViewStyle;
}

const makeStyles = (): RenderImagesProps => {
  const theme = getTheme();

  return StyleSheet.create<RenderImagesProps>({
    galleryImage: {
      height: 52,
      width: 52,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: theme.palette.white,
    },
    moreImages: {
      height: 52,
      width: 52,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: theme.palette.text02,
      justifyContent: 'center',
    },
    moreImagesText: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.label,
      color: theme.palette.white,
      alignSelf: 'center',
    },
    gallery: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginVertical: 7,
      marginHorizontal: 15,
    },
  });
};

export default makeStyles;
