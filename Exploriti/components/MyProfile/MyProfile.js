import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "../Menu/DrawerIcon";
import Profile from "./Profile";
import {MessagesIcon} from '../Menu/MessagesIcon';

const Stack = createStackNavigator();

/**
 * One of the three primary tab components. Contains the current user's profile
 * @returns Stack Navigator of My Profile
 * @constructor
 */
export default function MyProfile() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={Profile}
        options={{
            headerLeft: () => <DrawerIcon/>,
            headerRight: () => <MessagesIcon/>
        }}
      />
    </Stack.Navigator>
  );
}
