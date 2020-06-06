import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import Fonts from "../../theme/Fonts";

const { FontWeights } = Fonts;

/**
 * A simple Icon to display more options. Uses an ASCII character instead of a third party library
 * @param onPress
 */
const OptionsIcon = React.forwardRef(({ onPress }, ref) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.icon}>⋮</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  icon: {
    fontSize: 25,
    ...FontWeights.Bold,
    paddingRight: 15,
    paddingTop: 5,
  },
});

export default OptionsIcon;
