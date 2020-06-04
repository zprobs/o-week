import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "../Menu/DrawerIcon";
import Profile from "./Profile";
import {MessagesIcon} from '../Menu/MessagesIcon';

/**
 * One of the three primary tab components. Contains the current user's profile
 * @param props The toggleDrawer is a reference to the navigation.toggleDrawer() method of the Drawer Navigator
 * @returns Stack Navigator of My Profile
 * @constructor
 */
export default function MyProfile({mainNavigation}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={Profile}
        options={{
            headerLeft: () => <DrawerIcon mainNavigation={mainNavigation} />,
            headerRight: () => <MessagesIcon mainNavigation={mainNavigation} />
        }}
      />
    </Stack.Navigator>
  );
}
