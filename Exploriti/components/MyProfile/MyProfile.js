import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerIcon } from '../Menu/DrawerIcon';
import Profile from './Profile';
import Conversation from '../Messages/Conversation';
import GroupScreen from '../Orientation/GroupScreen';
import { NotificationsIcon } from '../Menu/NotificationsIcon';
import Notifications from '../Notifications';
import EventScreen from '../Orientation/EventScreen';
import SeeAllNotifications from '../Menu/SeeAllNotifications';
import { useRoute } from '@react-navigation/native';
import { PostScreen } from '../ReusableComponents/Post';
import Gallery from '../Orientation/Gallery';
import AllPosts from '../Orientation/AllPosts';
import CreatePost from '../Orientation/CreatePost';
const Stack = createStackNavigator();

/**
 * One of the three primary tab components. Contains the current user's profile
 * @returns Stack Navigator of My Profile
 * @constructor
 */
export default function MyProfile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={Profile}
        options={{
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <NotificationsIcon />,
          headerStyle: { shadowColor: 'transparent', elevation: 0 },
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'GroupScreen'}
        component={GroupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'EventScreen'}
        component={EventScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Notifications'}
        component={Notifications}
        options={{
          headerRight: () => <SeeAllNotifications />
        }}
      />
      <Stack.Screen
        name={'PostScreen'}
        options={{ headerTitle: '' }}
        component={PostScreen}
      />
      <Stack.Screen
        name={'Gallery'}
        options={{ headerTitle: '' }}
        component={Gallery}
      />
      <Stack.Screen
        name={'AllPosts'}
        options={{ headerTitle: '' }}
        component={AllPosts}
      />
      <Stack.Screen name={'Create Post'} component={CreatePost} />
    </Stack.Navigator>
  );
}
