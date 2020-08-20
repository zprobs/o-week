import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MessagesList from './MessagesList';
import Conversation from './Conversation';
import Profile from '../MyProfile/Profile';
import GroupScreen from '../Orientation/GroupScreen';
import EventScreen from '../Orientation/EventScreen';
import { PostScreen } from '../ReusableComponents/Post';
import Gallery from '../Orientation/Gallery';
import AllPosts from '../Orientation/AllPosts';

const Stack = createStackNavigator();

/**
 * Messages is the component to handle all user messages.
 * @returns Stack Navigator of Messages
 * @constructor
 */
export default function Messages() {
  return (
    <Stack.Navigator initialRouteName="MessagesList">
      <Stack.Screen
        name="MessagesList"
        component={MessagesList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={{
          headerShown: false,
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
        name="GroupScreen"
        component={GroupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerShown: false,
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
    </Stack.Navigator>
  );
}
