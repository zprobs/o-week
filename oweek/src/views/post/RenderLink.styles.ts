import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface RenderLinkProps {
  container: ViewStyle;
  linkContainer: ViewStyle;
  linkText: TextStyle;
}

const makeStyles = (): RenderLinkProps => {
  const theme = getTheme();

  return StyleSheet.create<RenderLinkProps>({
    container: {
      flex: 1,
      backgroundColor: theme.palette.white,
    },
    linkContainer: {
      height: 30,
      borderRadius: 8,
      backgroundColor: '#eeeeee',
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: 12,
      paddingHorizontal: 12,
      alignSelf: 'flex-start',
      marginTop: 10,
    },
    linkText: {
      fontSize: theme.size.caption,
      fontFamily: theme.font.bold,
      color: theme.palette.gold,
      marginRight: 12,
    },
  });
};

export default makeStyles;
