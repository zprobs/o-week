import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface DashboardPlaceholderStyles {
  titlePlaceholder: ViewStyle;
  friendsPlaceholder: ViewStyle;
  listPlaceholder: ViewStyle;
  eventCardPlaceholder: ViewStyle;
  placeholder: TextStyle;
}

const makeStyles = () => {
  const theme = getTheme();

  return StyleSheet.create<DashboardPlaceholderStyles>({
    titlePlaceholder: {
      marginTop: 35,
    },
    friendsPlaceholder: {
      flexDirection: 'row',
    },
    listPlaceholder: {
      paddingBottom: 187,
    },
    eventCardPlaceholder: {
      borderRadius: 30,
      marginTop: 35,
      marginHorizontal: 48,
    },
    placeholder: {
      color: theme.palette.placeholder,
    },
  });
};

export default makeStyles;
