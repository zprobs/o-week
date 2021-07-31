import getTheme from '@root/theme';
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 0.75 * WIDTH;

interface EventCardStyle {
  event: ViewStyle;
  eventShadow: ViewStyle;
  eventImage: ImageStyle;
  eventTitle: TextStyle;
  eventDate: TextStyle;
  eventDescription: ViewStyle;
  detailsView: ViewStyle;
  detailsButton: ViewStyle;
  detailsText: TextStyle;
  row: ViewStyle;
  icon: ViewStyle;
  labels: ViewStyle;
}

const makeStyles = (): EventCardStyle => {
  const theme = getTheme();

  return StyleSheet.create<EventCardStyle>({
    event: {
      backgroundColor: theme.palette.base,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 12,
      maxWidth: ITEM_WIDTH,
      paddingVertical: 5,
      overflow: 'hidden',
      elevation: 4,
      width: '100%',
    },
    eventShadow: {
      shadowRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
    },
    eventImage: {
      height: 54,
      width: 54,
      borderRadius: 27,
      marginVertical: 15,
      marginHorizontal: 12,
      backgroundColor: theme.palette.placeholder,
      justifyContent: 'center',
    },
    eventTitle: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.label,
      maxWidth: WIDTH * 0.4,
      marginVertical: 8,
    },
    eventDate: {
      fontSize: theme.size.caption,
      fontFamily: theme.font.bold,
      color: theme.palette.text03,
    },
    eventDescription: {
      maxWidth: ITEM_WIDTH * 0.7,
      padding: 15,
      fontFamily: theme.font.bold,
      fontSize: theme.size.caption,
      color: theme.palette.text03,
    },
    detailsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 12,
      paddingHorizontal: 20,
    },
    detailsButton: {
      height: 30,
      borderRadius: 15,
      shadowRadius: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 1.5,
        height: 1.5,
      },
      shadowOpacity: 0.6,
      paddingHorizontal: 10,
      backgroundColor: theme.palette.base,
      justifyContent: 'center',
      elevation: 3,
    },
    detailsText: {
      fontSize: theme.size.subText,
      fontFamily: theme.font.bold,
      color: theme.palette.text03,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icon: {
      alignSelf: 'center',
    },
    labels: {
      justifyContent: 'center',
      paddingBottom: 5,
    },
  });
};

export default makeStyles;
