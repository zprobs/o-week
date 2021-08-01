import getTheme from '@root/theme';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';

const window = Dimensions.get('window').height;
const window05 = window * 0.05;

interface UsersBottomModalStyles {
  container: ViewStyle;
  content: ViewStyle;
  listItemContainer: ViewStyle;
  listContentContainer: ViewStyle;
  userCard: ViewStyle;
}

const makeStyles = (): UsersBottomModalStyles => {
  const theme = getTheme();

  return StyleSheet.create<UsersBottomModalStyles>({
    container: {
      marginTop: 60,
      padding: 20,
      backgroundColor: theme.palette.base,
    },
    content: {
      flex: 1,
      paddingBottom: window05,
    },
    listItemContainer: {
      width: '106%',
    },
    listContentContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    userCard: {
      marginVertical: 7,
    },
  });
};

export default makeStyles;
