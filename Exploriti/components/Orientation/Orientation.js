import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./Dashboard";
import { DrawerIcon } from "../Menu/DrawerIcon";
import {MessagesIcon} from '../Menu/MessagesIcon';
import Schedule from './Schedule';

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
        }}
      />
      <Stack.Screen
        name={"Schedule"}
        component={Schedule}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
