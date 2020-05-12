import React, { useState } from "react";
import { Text, View, Button, Switch, StyleSheet } from "react-native";
import { SettingToggle } from "../ReusableComponents/SettingToggle.js";

/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */

function SettingsList() {
  return (
    <View style={styles.viewStyle}>
      <Text> Settings Page </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "column",
    alignItems: "stretch",
  },
  viewOneStyle: {
    height: 50,
    width: 50,
    backgroundColor: "red",
  },
  viewTwoStyle: {
    height: 50,
    width: 50,
    backgroundColor: "green",
    alignSelf: "flex-end",
  },
  viewThreeStyle: {
    height: 50,
    width: 50,
    backgroundColor: "purple",
  },
});

export default SettingsList;
