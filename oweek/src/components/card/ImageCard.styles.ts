import getTheme from '@root/theme';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ImageCardStyles {
  imageRow: ViewStyle;
  groupImage: ImageStyle;
  imageLabelContainer: ViewStyle;
  imageLabelText: TextStyle;
}

const makeStyles = (): ImageCardStyles => {
  const theme = getTheme();

  return StyleSheet.create<ImageCardStyles>({
    imageRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginHorizontal: 25,
    },
    groupImage: {
      height: 180,
      width: '100%',
      borderRadius: 30,
      marginHorizontal: 5,
    },
    imageLabelContainer: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      justifyContent: 'center',
      paddingLeft: 25,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      paddingBottom: 8,
    },
    imageLabelText: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.label,
      marginTop: 5,
      color: theme.palette.white,
    },
  });
};

export default makeStyles;
