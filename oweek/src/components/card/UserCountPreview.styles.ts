import getTheme from '@root/theme';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface UserCountPreviewStyles {
  container: ViewStyle;
  numberView: ViewStyle;
  numberText: TextStyle;
  imageContainer: ViewStyle;
  image: ImageStyle;
}

const makeStyles = (): UserCountPreviewStyles => {
  const theme = getTheme();

  return StyleSheet.create<UserCountPreviewStyles>({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    numberView: {
      backgroundColor: theme.palette.white,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 4,
      shadowRadius: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 1.5,
        height: 1.5,
      },
      shadowOpacity: 0.6,
      elevation: 3,
    },
    numberText: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.subText,
      paddingHorizontal: 5,
    },
    imageContainer: {
      width: 53,
      height: 24,
    },
    image: {
      height: 24,
      width: 24,
      borderRadius: 12,
      position: 'absolute',
      borderColor: 'white',
      borderWidth: 0.5,
    },
  });
};

export default makeStyles;
