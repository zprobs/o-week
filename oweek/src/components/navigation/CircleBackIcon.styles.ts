import getTheme from '@root/theme';
import { StyleSheet, ViewStyle } from 'react-native';

interface CircleBackIconStyles {
  container: ViewStyle;
  icon: ViewStyle;
}

const makeStyles = (): CircleBackIconStyles => {
  const theme = getTheme();

  return StyleSheet.create<CircleBackIconStyles>({
    container: {
      backgroundColor: theme.palette.white,
      height: 44,
      width: 44,
      borderRadius: 22,
      elevation: 3,
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.7,
    },
    icon: {
      marginTop: 3,
    },
  });
};

export default makeStyles;
