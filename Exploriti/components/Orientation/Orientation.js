import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import { DrawerIcon } from '../Menu/DrawerIcon';
import { MessagesIcon } from '../Menu/MessagesIcon';
import Schedule from './Schedule';
import GroupScreen from './GroupScreen';
import EventScreen from './EventScreen';
import Profile from '../MyProfile/Profile';
import LinearGradient from 'react-native-linear-gradient';
import LeaderBoard from './Leaderboard';
import Conversation from '../Messages/Conversation';
import Calendar from './Calendar';

const Stack = createStackNavigator();

/**
 * Orientation is a one of the three primary tab components. It contains all things Orientation.
 * @returns Stack Navigator of Orientation
 * @constructor
 */
export default function Orientation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orientation"
        component={Dashboard}
        options={{
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <MessagesIcon />,
          // headerBackground: () =>  (<LinearGradient
          //     colors={['rgba(69,117, 191, 1)', 'rgba(0, 61, 122, 1)']}
          //     style={{ flex: 1 }}
          //
          // />),
          headerTitle: '',
          headerStyle: { shadowColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name={'Schedule'}
        component={Schedule}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'GroupScreen'}
        component={GroupScreen}
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
      <Stack.Screen
        name={'Profile'}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Leaderboard'}
        component={LeaderBoard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
