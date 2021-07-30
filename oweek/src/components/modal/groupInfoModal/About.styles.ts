import getTheme from '@root/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface AboutStyles {
  sectionView: ViewStyle;
  sectionText: TextStyle;
  seeAllText: TextStyle;
  seeAllButton: TextStyle;
  contactContainer: ViewStyle;
  contactView: ViewStyle;
  contactText: TextStyle;
  contactIcon: ViewStyle;
  descriptionText: TextStyle;
}

const makeStyles = (): AboutStyles => {
  const theme = getTheme();

  return StyleSheet.create<AboutStyles>({
    sectionView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    sectionText: {
      fontSize: theme.size.label,
      fontFamily: theme.font.bold,
      color: theme.palette.text03,
      marginHorizontal: 25,
      marginBottom: 5,
    },
    seeAllText: {
      fontSize: theme.size.body,
      fontFamily: theme.font.regular,
      color: theme.palette.lightBlue,
    },
    seeAllButton: {
      marginHorizontal: 25,
      marginLeft: 'auto',
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 25,
      marginTop: 20,
    },
    contactView: {
      backgroundColor: theme.palette.placeholder,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginHorizontal: 15,
      flex: 1,
    },
    contactText: {
      fontSize: theme.size.body,
      fontFamily: theme.font.regular,
      color: theme.palette.text03,
      marginRight: 20,
    },
    contactIcon: {
      paddingHorizontal: 15,
    },
    descriptionText: {
      fontSize: theme.size.body,
      fontFamily: theme.font.regular,
      color: theme.palette.text03,
      lineHeight: 22,
      marginTop: 15,
      marginHorizontal: 25,
      letterSpacing: 0.87,
    },
  });
};

export default makeStyles;
