import React from "react";
import { Text, TextInput, View, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * A custom Text Input with two possible states; 'email' and 'password'
 * @param style Any custom styles for the container
 * @param label The label which will appear above the icon to the left of the text input
 * @param icon An icon which will appear to the left of the text input
 * @param placeholder
 * @param color The color of the text within the text input
 * @param type State of the TextInput either 'email', 'password'
 * @returns {*}
 * @constructor
 */
export default function TextLine({
  style,
  label,
  icon,
  placeholder,
  color,
  type,
}) {
  const keyboardType =
    type == "email"
      ? "email-address"
      : Platform.OS == "ios"
      ? "ascii-capable"
      : "visible-password";
  const secureTextEntry = type == "email" ? false : true;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      ...style,
    },
    input: {
      flexDirection: "row",
      zIndex: 1,
    },
    label: {
      ...FontWeights.Bold,
      ...FontSizes.Caption,
      color: colours.white,
    },
    textBox: {
      ...FontWeights.Light,
      color: color,
      flex: 1,
    },
    icon: {
      padding: 5,
      paddingLeft: 0,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label} numberOfLines={1} flexWrap={"nowrap"}>
        {label}
      </Text>
      <View style={styles.input}>
        <Icon size={28} name={icon} color={color} style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#f1f1f1"}
          style={styles.textBox}
          selectionColor={color}
          textContentType={type}
          autoCompleteType={type}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          adjustFontSizeToFit
          returnKeyType={"done"}
        />
      </View>
    </View>
  );
}
