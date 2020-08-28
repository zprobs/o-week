import React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import Fonts from '../../theme/Fonts';

const { FontSizes } = Fonts;

/**
 * Binary switch for changing settings
 * @param title {string}
 * @param isEnabled {boolean}
 * @param setIsEnabled {function}
 * @returns {JSX.Element}
 * @constructor
 */
function SettingsSwitch({ title, isEnabled, setIsEnabled }) {
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  return (
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
  );
}

const styles = StyleSheet.create({
  settingItemViewStyle: {
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
