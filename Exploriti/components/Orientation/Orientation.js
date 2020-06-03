import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./Dashboard";
import { DrawerIcon } from "../Menu/DrawerIcon";
import {NotificationIcon} from '../Menu/NotificationIcon';

/**
 * Orientation is a one of the three primary tab components. It contains all things Orientation.
 * @param props The toggleDrawer is a reference to the navigation.toggleDrawer() method of the Drawer Navigator
 * @returns Stack Navigator of Orientation
 * @constructor
 */
export default function Orientation({mainNavigation}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orientation"
        component={Dashboard}
        options={{
            headerLeft: () => <DrawerIcon mainNavigation={mainNavigation} />,
            headerRight: () => <NotificationIcon mainNavigation={mainNavigation} />
        }}
      />
    </Stack.Navigator>
  );
}
