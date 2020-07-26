import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DrawerIcon } from '../Menu/DrawerIcon';
import { MessagesIcon } from '../Menu/MessagesIcon';
import NotificationsList from './NotificationsList';
import Profile from '../MyProfile/Profile';
import EventScreen from '../Orientation/EventScreen';

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
          headerStyle: { shadowColor: 'transparent', elevation: 0 },
        }}
      />
      <Stack.Screen
        name={'Profile'}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'EventScreen'}
        component={EventScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
