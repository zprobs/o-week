import React, { useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';
import { CheckBox } from 'react-native-elements'


const {FontWeights, FontSizes} = Fonts

function SettingsCheckbox({title, description}) {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheck = () => setIsChecked(previousState => !previousState);
  return(
      <View style={styles().SettingCardView}>
        <View style={styles().checkboxView}>
          <Text style={styles().titleText}>{title}</Text>
          <CheckBox
            checked={isChecked}
            onPress={toggleCheck}
          />
        </View>
        <Text style={styles().descriptionText}>{description}</Text>
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

export default SettingsCheckbox;
