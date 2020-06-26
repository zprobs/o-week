import React, { useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';
import SettingsSwitch from '../ReusableComponents/SettingsSwitch'

const {FontWeights, FontSizes} = Fonts


function Notifications() {
  return(
    <View>
      <SettingsSwitch title='Mute Messages'/>
      <SettingsSwitch title='Mute Events'/>
      <SettingsSwitch title='Mute Group Notifications'/>
      <SettingsSwitch title='Mute All'/>
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
