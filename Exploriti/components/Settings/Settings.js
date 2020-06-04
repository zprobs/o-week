import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsList from "./SettingsList.js";
import {CloseIcon} from '../Menu/CloseIcon';
import { BackIcon } from "../Menu/BackIcon";

/**
 * Orientation is a one of the three primary tab components. It contains all things Orientation.
 * @param props The toggleDrawer is a reference to the navigation.toggleDrawer() method of the Drawer Navigator
 * @returns Stack Navigator of Orientation
 * @constructor
 */
export default function Settings({navigation}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsList}
        options={{
          headerLeft: () => <BackIcon mainNavigation={navigation} />,
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}
