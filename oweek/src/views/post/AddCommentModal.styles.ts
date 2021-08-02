import getTheme from '@root/theme';
import {
  ColorValue,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface AddCommentModalStyles {
  container: ViewStyle;
  content: ViewStyle;
  image: ImageStyle;
  avatarImage: ImageStyle;
  imageOverlay: ViewStyle;
  button: ViewStyle;
  textStyle: TextStyle;
  buttonColor: TextStyle & { color: ColorValue };
}

const makeStyles = (): AddCommentModalStyles => {
  const theme = getTheme();

  return StyleSheet.create<AddCommentModalStyles>({
    container: {
      padding: 20,
      backgroundColor: theme.palette.base,
    },
    content: {
      paddingTop: 20,
      paddingBottom: 16,
    },
    image: {
      alignSelf: 'center',
      height: 100,
      width: 100,
      marginTop: 20,
      marginBottom: 10,
    },
    avatarImage: {
      backgroundColor: theme.palette.placeholder,
      borderRadius: 100,
    },
    imageOverlay: {
      position: 'absolute',
      height: 100,
      width: 100,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: theme.palette.accent,
      opacity: 0.5,
    },
    button: {
      marginTop: 20,
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
    buttonColor: {
      color: theme.palette.accent,
    },
  });
};

export default makeStyles;
