import React, { useState } from 'react';
import { View, Switch } from 'react-native';

export default function SettingToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View
      style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
      <Switch
        title="Dark Mode"
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}
