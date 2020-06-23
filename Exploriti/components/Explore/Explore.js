import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from "@react-navigation/stack";
import React from 'react';
import { DrawerIcon } from "../Menu/DrawerIcon";
import { MessagesIcon } from '../Menu/MessagesIcon';
import Search from './Search';
import Profile from '../MyProfile/Profile';

const Stack = createStackNavigator();

/**
 * One of the four primary tab components. Contains the Explore screen used to browse data
 * @returns Stack Navigator of Explore
 * @constructor
 */
export default function Explore() {

  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      ...TransitionPresets.SlideFromRightIOS
    }}>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <MessagesIcon />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
