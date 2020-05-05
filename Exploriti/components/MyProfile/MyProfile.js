import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";

export default function MyProfile() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Profile" component={Profile} />
    </Stack.Navigator>
  );
}
