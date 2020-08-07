import React from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsSwitch from '../ReusableComponents/SettingsSwitch';
import { Theme } from '../../theme/Colours';

const { colours } = Theme.light;

function Notifications() {
  return (
    <View style={styles.container}>
      <SettingsSwitch title="Mute Messages" />
      <SettingsSwitch title="Mute Events" />
      <SettingsSwitch title="Mute Group Notifications" />
      <SettingsSwitch title="Mute All" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
});

export default Notifications;
