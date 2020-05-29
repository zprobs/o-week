import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../../theme/Colours";
import Fonts from "../../theme/Fonts";

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * Header for every modal
 * @param heading The main Text
 * @param subHeading A brief description
 * @returns {*}
 * @constructor
 */
const ModalHeader = ({ heading, subHeading }) => {
  return (
    <View style={styles().container}>
      <Text style={styles().heading}>{heading}</Text>
      <Text style={styles().subHeading}>{subHeading}</Text>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
        paddingTop: 10
    },
    heading: {
      ...FontWeights.Bold,
      ...FontSizes.Label,
      color: colours.text01,
    },
    subHeading: {
      ...FontWeights.Regular,
      ...FontSizes.Body,
      marginTop: 2,
      color: colours.text02,
    },
  });

export default ModalHeader;
