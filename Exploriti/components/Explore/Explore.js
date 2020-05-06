import GroupExplore from './GroupExplore';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DrawerIcon} from '../Menu/DrawerIcon';

export default function Explore(props) {
  const Stack = createStackNavigator();
  const { toggleDrawer } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={GroupExplore}
        options={{
          headerLeft: () => <DrawerIcon toggleDrawer={toggleDrawer} />,
        }}
      />
    </Stack.Navigator>
  );
}
