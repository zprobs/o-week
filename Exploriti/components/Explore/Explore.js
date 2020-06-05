import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { DrawerIcon } from "../Menu/DrawerIcon";
import { MessagesIcon } from '../Menu/MessagesIcon';
import Search from './Search';
import Profile from '../MyProfile/Profile';

const Stack = createStackNavigator();

/**
 * One of the three primary tab components. Contains the Explore screen used to browse data
 * @returns Stack Navigator of Explore
 * @constructor
 */
export default function Explore() {

  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerLeft: () => <DrawerIcon/>,
            headerRight: () => <MessagesIcon/>
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}

