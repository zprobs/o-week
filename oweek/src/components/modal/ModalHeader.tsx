import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import getTheme from '@root/theme';

interface Props {
  heading: string; // The main Text
  subHeading: string; // A brief description
}

/**
 * Header for every modal
 */
const ModalHeader: React.FC<Props> = ({ heading, subHeading }) => {
  const theme = getTheme();

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
    },
    heading: {
      fontFamily: theme.font.bold,
      fontSize: theme.size.label,
      color: theme.palette.text01,
    },
    subHeading: {
      fontFamily: theme.font.regular,
      fontSize: theme.size.body,
      marginTop: 2,
      color: theme.palette.text02,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
  );
};

export default ModalHeader;
