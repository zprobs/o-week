import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsList from "./SettingsList.js";
import { DrawerIcon } from "../Menu/DrawerIcon";

/**
 * Orientation is a one of the three primary tab components. It contains all things Orientation.
 * @param props The toggleDrawer is a reference to the navigation.toggleDrawer() method of the Drawer Navigator
 * @returns Stack Navigator of Orientation
 * @constructor
 */
export default function Settings(props) {
  const Stack = createStackNavigator();
  const { toggleDrawer } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsList}
        options={{
          headerLeft: () => <DrawerIcon toggleDrawer={toggleDrawer} />,
        }}
      />
    </Stack.Navigator>
  );
}
