import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import Fonts from '../../theme/Fonts';


const {FontSizes} = Fonts


function SettingsSwitch( {title} ) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return(
    <View style={styles().viewStyle}>
    <View>
      <View style={styles().settingItemViewStyle}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles().settingItemTextStyle}> {title} </Text>
          </View>

        <View style={{ justifyContent: "flex-start" }}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#000000" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
          </View>
      </View>
    </View>

    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    viewStyle:{
    },
    settingItemViewStyle: {
      //borderWidth: 1,
      //borderColor: 'black',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: 15,
    },
    settingItemTextStyle: {
      ...FontSizes.Body
    },
  });

export default SettingsSwitch
