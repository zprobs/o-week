import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface FeedProps {
  container: ViewStyle;
  postButton: ViewStyle;
  postText: TextStyle;
  seeAll: ViewStyle;
}

const makeStyles = (): FeedProps => {
  const theme = getTheme();

  return StyleSheet.create<FeedProps>({
    container: { flex: 1, alignItems: 'center', paddingTop: 16 },
    postButton: {
      backgroundColor: theme.palette.gold,
      width: 200,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      flexDirection: 'row',
      marginTop: 20,
    },
    postText: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.body,
      color: theme.palette.white,
      marginLeft: 5,
    },
    seeAll: {
      marginVertical: 20,
    },
  });
};

export default makeStyles;
