import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsList from "./SettingsList.js";
import {CloseIcon} from '../Menu/CloseIcon';
import { BackIcon } from "../Menu/BackIcon";
import GoBackHeader from '../Menu/GoBackHeader';
import OtherSettings from "./OtherSettings"
import Help from "./Help"
import About from "./About"

/**
 * Orientation is a one of the three primary tab components. It contains all things Orientation.
 * @param props The toggleDrawer is a reference to the navigation.toggleDrawer() method of the Drawer Navigator
 * @returns Stack Navigator of Orientation
 * @constructor
 */
export default function Settings({navigation}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Settings"
        component={SettingsList}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}
