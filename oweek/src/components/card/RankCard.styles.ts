import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface RankCardStyle {
  container: ViewStyle;
  ring: ViewStyle;
  row: ViewStyle;
  place: ViewStyle;
  label: TextStyle;
  text: TextStyle;
  moreInfo: ViewStyle;
  moreInfoText: TextStyle;
  rank: ViewStyle;
}

const makeStyles = (gold: boolean): RankCardStyle => {
  const theme = getTheme();

  return StyleSheet.create<RankCardStyle>({
    container: {
      borderRadius: 15,
      overflow: 'hidden',
      height: 150,
      elevation: 4,
    },
    ring: {
      position: 'absolute',
      top: -25,
      left: -100,
      height: 200,
      width: 240,
      borderRadius: 100,
      borderWidth: 18,
      borderColor: gold ? theme.palette.white : theme.palette.black,
      borderStyle: 'solid',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      height: '100%',
    },
    place: {
      fontSize: theme.size.largeHeading,
      fontFamily: theme.font.bold,
      color: gold ? theme.palette.white : theme.palette.black,
      alignSelf: 'center',
    },
    label: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.body,
      color: gold ? theme.palette.white : theme.palette.black,
      opacity: 0.7,
    },
    text: {
      fontSize: theme.size.label,
      fontFamily: theme.font.bold,
      color: gold ? theme.palette.white : theme.palette.black,
    },
    moreInfo: {
      flexDirection: 'row',
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    moreInfoText: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.caption,
      color: gold ? theme.palette.white : theme.palette.black,
      marginHorizontal: 12,
    },
    rank: {
      position: 'absolute',
      left: 160,
      right: 20,
      top: 20,
      bottom: 20,
    },
  });
};

export default makeStyles;
