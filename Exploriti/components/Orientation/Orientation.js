import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./Dashboard";
import { DrawerIcon } from "../Menu/DrawerIcon";

export default function Orientation(props) {
  const Stack = createStackNavigator();
  const { toggleDrawer } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orientation"
        component={Dashboard}
        options={{
          headerLeft: () => <DrawerIcon toggleDrawer={toggleDrawer} />,
        }}
      />
    </Stack.Navigator>
  );
}
