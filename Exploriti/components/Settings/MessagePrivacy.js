import React, { useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';
import { CheckBox } from 'react-native-elements'
import SettingsCheckbox from '../ReusableComponents/SettingsCheckbox'

const {FontWeights, FontSizes} = Fonts

function MessagePrivacy() {
  return(
    <View>
      <View style={{flexDirection: 'column', paddingVertical:15}}>
        <Text style={styles().headerText}>Who Can Send You Messages?</Text>

        <SettingsCheckbox
        title='Anyone'
        description="You will be able to recieve messages from anyone on The Hub, except for people you've blocked" />

        <SettingsCheckbox
        title='Friends'
        description="Only people who you're friends with will be able to send you messages" />

      </View>

      <View style={{flexDirection: 'column', paddingVertical:15}}>

        <Text style={styles().headerText}>Who Can Invite You To Events?</Text>

        <SettingsCheckbox
        title='Anyone'
        description="Anyone on The Hub can invite you to an event, except for people you've blocked" />

        <SettingsCheckbox
        title='Friends'
        description="Only your friends can invite you to events" />

        <SettingsCheckbox
        title='Group Leaders'
        description="The only people that can invite you to events are registered orientation leaders" />

      </View>

    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    headerText: {
      ...FontSizes.Body,
      ...FontWeights.Bold,
      paddingLeft:20,
    },
    titleText: {
      ...FontSizes.Caption,
      ...FontWeights.Regular,
      paddingLeft:20,
    },
    descriptionText: {
      fontSize: 12,
      ...FontWeights.Light,
      paddingLeft:20,
    },
    SettingCardView: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    checkboxView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default MessagePrivacy
