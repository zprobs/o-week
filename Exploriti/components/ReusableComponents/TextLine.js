import React from "react";
import { Text, TextInput, View, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * A custom Text Input with three possible states: 'emailAddress', 'name', and 'password'
 * @param style Any custom styles for the container
 * @param label {string} The label which will appear above the icon to the left of the text input
 * @param icon An icon which will appear to the left of the text input
 * @param placeholder {string}
 * @param color {string} The color of the text within the text input
 * @param type {string} State of the TextInput either 'emailAddress', 'password' or 'name'
 * @returns {*}
 * @constructor
 */
const TextLine = React.forwardRef(({
  style,
  label,
  icon,
  placeholder,
  color,
  type, value, onChangeText, next, onSubmit
}, ref) => {
  const keyboardType = () => {
    switch (type) {
      case 'emailAddress':
        return "email-address";
      case 'password':
        return Platform.OS == "ios" ? "ascii-capable" : "visible-password";
      default:
        return "default";
    }
  };

  const autoCompleteType = type == "emailAddress" ? 'email' : type;

  const secureTextEntry = type == "password" ? true : false;

  const capitalize = type == "name" ? "words" : "none";

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
      ...FontWeights.Bold,
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
          autoCompleteType={autoCompleteType}
          keyboardType={keyboardType()}
          secureTextEntry={secureTextEntry}
          adjustFontSizeToFit
          returnKeyType={next ? "next" : "done"}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={capitalize}
          onSubmitEditing={onSubmit}
          ref={ref}
        />
      </View>
    </View>
  );
});

export default TextLine;
