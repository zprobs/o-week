import React, { useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';


const {FontWeights, FontSizes} = Fonts


function Notifications() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return(
    <View style={styles().viewStyle}>
    <View>
      <View style={styles().settingItemViewStyle}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles().settingItemTextStyle}> {"Mute Notifications"} </Text>
          </View>

        <View style={{ justifyContent: "flex-start" }}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
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

export default Notifications
