import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';

const { FontSizes } = Fonts;
const { colours } = Theme.light;

function SettingsSwitch({ title, isEnabled, setIsEnabled }) {
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  return (
    <View style={styles.viewStyle}>
      <View style={styles.settingItemViewStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={styles.settingItemTextStyle}> {title} </Text>
        </View>

        <View style={{ justifyContent: 'flex-start' }}>
          <Switch
            trackColor={{ false: '#767577', true: '#39FF14' }}
            thumbColor={'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {},
  settingItemViewStyle: {
    //borderWidth: 1,
    //borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  settingItemTextStyle: {
    ...FontSizes.Body,
  },
});

export default SettingsSwitch;
