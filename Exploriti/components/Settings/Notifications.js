import React, { useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';
import SettingsSwitch from '../ReusableComponents/SettingsSwitch'
import { Theme } from '../../theme/Colours';

const {FontWeights, FontSizes} = Fonts
const {colours} = Theme.light;

function Notifications() {
  return(
    <View style={styles.container}>
      <SettingsSwitch title='Mute Messages'/>
      <SettingsSwitch title='Mute Events'/>
      <SettingsSwitch title='Mute Group Notifications'/>
      <SettingsSwitch title='Mute All'/>
    </View>
  );
};

const styles =
  StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: colours.base
    },

  });

export default Notifications
