import getTheme from '@root/theme';
import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const WIDTH = Dimensions.get('window').width;

interface TabsStyles {
  container: ViewStyle;
  indicatorStyle: ViewStyle;
  tabBar: ViewStyle;
  tabText: TextStyle;
}

const makeStyles = (isMember: boolean): TabsStyles => {
  const theme = getTheme();

  return StyleSheet.create<TabsStyles>({
    container: {
      flex: 1,
      backgroundColor: theme.palette.white,
    },
    indicatorStyle: {
      backgroundColor: theme.palette.gold,
      width: isMember ? '16.66%' : '25%',
      marginLeft: isMember ? WIDTH * 0.083 : WIDTH * 0.125,
    },
    tabBar: {
      backgroundColor: theme.palette.base,
      marginTop: 10,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      shadowOffset: { height: 0, width: 0 },
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
    tabText: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.body,
    },
  });
};

export default makeStyles;
