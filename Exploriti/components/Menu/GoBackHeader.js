import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Theme } from "../../theme/Colours";
import Fonts from "../../theme/Fonts";
import BackIcon from "./BackIcon";

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * Go Back Header is a Custom Navigation Bar for a page which has been pushed onto the stack
 * @param title Text to be displayed in the middle
 * @param onTitlePress Function
 * @param ContentLeft A Component which will be displayed to the lefy after back arrow
 * @param IconRight A Component which will be displayed on far right
 * @param IconRightOnPress
 * @param titleStyle
 * @returns {*}
 * @constructor
 */
const GoBackHeader = ({
  title,
  onTitlePress,
  ContentLeft,
  IconRight,
  IconRightOnPress,
  titleStyle,
}) => {
  return (
    <View style={styles.container}>
      <BackIcon />
      {ContentLeft && <ContentLeft />}
      {title && (
        <Text onPress={onTitlePress} style={[styles.title, titleStyle]}>
          {title}
        </Text>
      )}
      {IconRight && <IconRight onPress={IconRightOnPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    color: colours.text01,
    marginLeft: 20,
  },
});

export default GoBackHeader;
