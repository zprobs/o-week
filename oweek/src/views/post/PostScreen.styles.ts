import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface PostScreenStyles {
  line: ViewStyle;
  postButton: ViewStyle;
  postText: TextStyle;
  commentEmptyView: ViewStyle;
  commentErrorText: TextStyle;
  safeAreaView: ViewStyle;
  likeButton: ViewStyle;
}

const makeStyles = (): PostScreenStyles => {
  const theme = getTheme();

  return StyleSheet.create<PostScreenStyles>({
    line: {
      borderBottomColor: theme.palette.text02,
      borderBottomWidth: 0.5,
      marginVertical: 15,
    },
    postButton: {
      backgroundColor: theme.palette.gold,
      width: 200,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      flexDirection: 'row',
      marginVertical: 20,
    },
    postText: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.body,
      color: theme.palette.white,
      marginLeft: 5,
    },
    commentEmptyView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 35,
    },
    commentErrorText: {
      fontSize: theme.size.caption,
      fontFamily: theme.font.bold,
      color: theme.palette.text02,
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: theme.palette.placeholder,
      paddingHorizontal: 10,
    },
    likeButton: {
      marginRight: 10,
      alignItems: 'center',
    },
  });
};

export default makeStyles;
