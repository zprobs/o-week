import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import GroupScreen from './GroupScreen';
import EventScreen from './EventScreen';
import Profile from '../MyProfile/Profile';
import LeaderBoard from './Leaderboard';
import Conversation from '../Messages/Conversation';
import Search from './Search';
import { PostScreen } from '../ReusableComponents/Post';
import Gallery from './Gallery';
import AllPosts from './AllPosts';
import CreatePost from './CreatePost';

const Stack = createStackNavigator();

/**
 * Orientation is a one of the four primary tab components. It contains all things Orientation.
 * @returns Stack Navigator of Orientation
 * @constructor
 */
export default function Orientation() {
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
        name={'Search'}
        component={Search}
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
        name={'Profile'}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Leaderboard'}
        component={LeaderBoard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Conversation'}
        component={Conversation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'PostScreen'}
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
        component={PostScreen}
      />
      <Stack.Screen
        name={'Gallery'}
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
        component={Gallery}
      />
      <Stack.Screen
        name={'AllPosts'}
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
        component={AllPosts}
      />
      <Stack.Screen
        name={'Create Post'}
        component={CreatePost}
        options={{ headerBackTitle: 'Back' }}
      />
    </Stack.Navigator>
  );
}
