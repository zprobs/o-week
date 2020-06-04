import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { DrawerIcon } from "../Menu/DrawerIcon";
import { MessagesIcon } from '../Menu/MessagesIcon';
import Search from './Search';

/**
 * One of the three primary tab components. Contains the Explore screen used to browse data
 * @param props The toggleDrawer is a reference to the navigation.toggleDrawer() method of the Drawer Navigator
 * @returns Stack Navigator of Explore
 * @constructor
 */
export default function Explore({mainNavigation}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={Search}
        options={{
          headerLeft: () => <DrawerIcon mainNavigation={mainNavigation} />,
            headerRight: () => <MessagesIcon mainNavigation={mainNavigation}/>
        }}
      />
    </Stack.Navigator>
  );
}
