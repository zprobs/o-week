import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '@views/orientation/dashboard';
import GroupScreen from '@views/group/GroupScreen';
import type { OrientationStackParamList } from './OrientationStackParamList';

const Stack = createStackNavigator<OrientationStackParamList>();

/**
 * Orientation is a one of the four primary tab components. It contains the dashboard and all things Orientation.
 */
const Orientation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orientation"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Orientation;
