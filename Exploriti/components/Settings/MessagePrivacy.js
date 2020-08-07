import React, { useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';
import SettingsCheckbox from '../ReusableComponents/SettingsCheckbox'
import { Theme } from '../../theme/Colours';
import SegmentedControl from '@react-native-community/segmented-control';

const {FontWeights, FontSizes} = Fonts
const { colours } = Theme.light;

const messagesDescription = ["You will be able to recieve messages from anyone on The app, except for people you've blocked", "Only people who you're friends with will be able to send you messages" ]
const inviteDescription = ["Anyone on the app will be able to invite you to an event, except for people you've blocked", "Only your friends and leaders of groups you are in can invite you to events"]

function MessagePrivacy() {

  const [messagesIndex, setMessagesIndex] = useState(0)
  const [inviteIndex, setInviteIndex] = useState(0)

  return(
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.headerText}>Who Can Send You Messages?</Text>

        <SegmentedControl
          values={['Anyone', 'Friends']}
          selectedIndex={messagesIndex}
          onChange={(event) => {
            setMessagesIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={styles.selector}
        />

        <Text style={styles.descriptionText}>{messagesDescription[messagesIndex]}</Text>


      </View>

      <View style={styles.section}>
        <Text style={styles.headerText}>Who Can Invite You To Events?</Text>

        <SegmentedControl
          values={['Anyone', 'Friends']}
          selectedIndex={inviteIndex}
          onChange={(event) => {
            setInviteIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={styles.selector}
        />

        <Text style={styles.descriptionText}>{inviteDescription[inviteIndex]}</Text>


      </View>

    </View>
  );
};

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colours.base
    },
    section: {
      paddingHorizontal: 20,
      flexDirection: 'column',
      marginVertical:15
    },
    headerText: {
      ...FontSizes.Label,
      ...FontWeights.Bold,
      paddingLeft:20,
      marginVertical: 12
    },
    titleText: {
      ...FontSizes.Caption,
      ...FontWeights.Regular,
      paddingLeft:20,
    },
    descriptionText: {
      ...FontSizes.Body,
      ...FontWeights.Regular,
      marginVertical: 10
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
