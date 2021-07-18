import getTheme from '@root/theme';
import { StyleSheet, ViewStyle } from 'react-native';

interface CircleEditIconStyles {
  container: ViewStyle;
}

const makeStyles = (): CircleEditIconStyles => {
  const theme = getTheme();

  return StyleSheet.create<CircleEditIconStyles>({
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
  });
};

export default makeStyles;
