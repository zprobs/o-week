import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "../Menu/DrawerIcon";
import Profile from "./Profile";

export default function MyProfile(props) {
  const Stack = createStackNavigator();
  const { toggleDrawer } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={Profile}
        options={{
          headerLeft: () => <DrawerIcon toggleDrawer={toggleDrawer} />,
        }}
      />
    </Stack.Navigator>
  );
}
