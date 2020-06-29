import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DrawerIcon } from '../Menu/DrawerIcon';
import { MessagesIcon } from '../Menu/MessagesIcon';
import NotificationsList from './NotificationsList';

const Stack = createStackNavigator();

/**
 * Notifications is where all app updates except for messages will be shown
 * @returns {*}
 * @constructor
 */
export default function Notifications() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsList}
        options={{
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <MessagesIcon />,
          headerTitle: '',
          headerStyle: { shadowColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
}
