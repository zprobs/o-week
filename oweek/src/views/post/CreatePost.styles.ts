import getTheme from '@root/theme';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface CreatePostStyles {
  container: ViewStyle;
  textStyle: TextStyle;
  imageScroll: ViewStyle;
  image: ImageStyle;
  addImage: ViewStyle;
  addPhotosText: TextStyle;
  removeButton: ViewStyle;
  filePlus: TextStyle & { color: string };
  x: TextStyle & { color: string };
  postButton: TextStyle & { color: string };
}

const makeStyles = (): CreatePostStyles => {
  const theme = getTheme();

  return StyleSheet.create<CreatePostStyles>({
    container: {
      flex: 1,
      backgroundColor: theme.palette.base,
    },
    textStyle: {
      fontFamily: theme.font.light,
      color: theme.palette.text01,
      fontSize: theme.size.body,
      borderWidth: 1,
      borderRadius: 10,
      height: 190,
      padding: 12,
      textAlignVertical: 'top',
    },
    imageScroll: {
      height: 160,
      paddingHorizontal: 10,
      marginTop: 20,
    },
    image: {
      height: 140,
      width: 140,
      borderRadius: 16,
    },
    addImage: {
      borderWidth: 0.5,
      borderColor: theme.palette.text03,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addPhotosText: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.caption,
    },
    removeButton: {
      height: 26,
      width: 26,
      borderRadius: 13,
      backgroundColor: 'rgba(0,0,0,0.60)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 4,
    },
    filePlus: {
      color: theme.palette.text03,
    },
    x: {
      color: theme.palette.white,
    },
    postButton: {
      color: theme.palette.accent,
    },
  });
};

export default makeStyles;
