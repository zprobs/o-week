import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import CheckBox from '@react-native-community/checkbox';

const { FontWeights, FontSizes } = Fonts;

function SettingsCheckbox({ title, description }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.SettingCardView}>
      <View style={styles.checkboxView}>
        <Text style={styles.titleText}>{title}</Text>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={() =>
            toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)
          }
        />
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
    paddingLeft: 20,
  },
  titleText: {
    ...FontSizes.Caption,
    ...FontWeights.Regular,
    paddingLeft: 20,
  },
  descriptionText: {
    fontSize: 12,
    ...FontWeights.Light,
    paddingLeft: 20,
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
