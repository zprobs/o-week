import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import { DrawerIcon } from '../Menu/DrawerIcon';
import { MessagesIcon } from '../Menu/MessagesIcon';
import Profile from '../MyProfile/Profile';
import GroupScreen from '../Orientation/GroupScreen';
import EventScreen from '../Orientation/EventScreen';
import Calendar from './Calendar';
import ScheduleCarousel from './ScheduleCarousel';
import { PostScreen } from '../ReusableComponents/Post';
import Gallery from '../Orientation/Gallery';
import AllPosts from '../Orientation/AllPosts';
import CreatePost from '../Orientation/CreatePost';

const Stack = createStackNavigator();

/**
 * One of the four primary tab components. Contains the Schedule used to browse upcoming events
 * @returns Stack Navigator of Schedule
 * @constructor
 */
export default function Schedule() {
  return (
    <Stack.Navigator
      initialRouteName="Schedule"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="ScheduleCarousel"
        component={ScheduleCarousel}
        options={{
          // headerRight: () => <MessagesIcon white={true} />,
          // headerTitle: '',
          // headerStyle: { shadowColor: 'transparent' },
          // headerTransparent: true,
          headerShown: false
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
        name="Calendar"
        component={Calendar}
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
      <Stack.Screen name={'Create Post'} component={CreatePost} />
    </Stack.Navigator>
  );
}
