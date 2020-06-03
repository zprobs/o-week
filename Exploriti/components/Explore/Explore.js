import GroupExplore from "./GroupExplore";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { DrawerIcon } from "../Menu/DrawerIcon";
import { NotificationIcon } from '../Menu/NotificationIcon';

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
        component={GroupExplore}
        options={{
          headerLeft: () => <DrawerIcon mainNavigation={mainNavigation} />,
            headerRight: () => <NotificationIcon mainNavigation={mainNavigation}/>
        }}
      />
    </Stack.Navigator>
  );
}
