import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import SettingsList from './SettingsList.js';
import { CloseIcon } from '../Menu/CloseIcon';
import ReportBug from './ReportBug';
import Notifications from './Notifications';
import BlockedUsers from './BlockedUsers';
import MessagePrivacy from './MessagePrivacy';
import AdminConsole from './AdminConsole';

export default function Settings({ navigation }) {
  const Stack = createStackNavigator();

  const options = {
    headerRight: () => <CloseIcon mainNavigation={navigation} />,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsList}
        options={options}
      />
      <Stack.Screen name="Report Bug" component={ReportBug} options={options} />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={options}
      />
      <Stack.Screen
        name="Blocked Users"
        component={BlockedUsers}
        options={options}
      />
      <Stack.Screen
        name="Messages & Invitations"
        component={MessagePrivacy}
        options={options}
      />
      <Stack.Screen
        name="Admin Console"
        component={AdminConsole}
        options={options}
      />
    </Stack.Navigator>
  );
}
