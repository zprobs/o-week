import GroupExplore from './GroupExplore';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export default function Explore() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Explore" component={GroupExplore} />
    </Stack.Navigator>
  );
}
