import getTheme from '@root/theme';
import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const HEIGHT = Dimensions.get('window').height;

interface GroupScreenStyles {
  container: ViewStyle;
  backgroundImage: ViewStyle;
  header: ViewStyle;
  icons: ViewStyle;
  circleBackIcon: ViewStyle;
  circleEditIcon: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
}

const makeStyles = (): GroupScreenStyles => {
  const theme = getTheme();

  return StyleSheet.create<GroupScreenStyles>({
    container: {
      flex: 1,
      backgroundColor: theme.palette.base,
    },
    backgroundImage: {
      width: '100%',
      height: HEIGHT * 0.44,
    },
    header: {
      justifyContent: 'flex-end',
      height: HEIGHT * 0.44,
      alignItems: 'flex-start',
    },
    icons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
    },
    circleBackIcon: {
      marginTop: 45,
      marginLeft: 20,
    },
    circleEditIcon: {
      marginTop: 45,
      marginRight: 20,
    },
    titleContainer: {
      paddingBottom: 48,
      paddingHorizontal: 20,
      paddingTop: 20,
      width: '100%',
      flexDirection: 'row',
    },
    title: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.heading,
      color: theme.palette.white,
    },
  });
};

export default makeStyles;
