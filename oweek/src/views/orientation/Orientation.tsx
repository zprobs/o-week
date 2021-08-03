import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '@views/orientation/dashboard';
import GroupScreen from '@views/group/GroupScreen';
import PostScreen from '@views/post/PostScreen';
import Gallery from '@views/gallery/Gallery';
import AllPosts from '@views/post/AllPosts';
import CreatePostPage from '@views/post/CreatePost';
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
      <Stack.Screen
        name="PostScreen"
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
        component={PostScreen}
      />
      <Stack.Screen
        name="Gallery"
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
        component={Gallery}
      />
      <Stack.Screen
        name="AllPosts"
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
        component={AllPosts}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostPage}
        options={{ headerBackTitle: 'Back' }}
      />
    </Stack.Navigator>
  );
};

export default Orientation;
