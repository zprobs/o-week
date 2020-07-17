import React from "react";
import { Easing } from "react-native";
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from "@react-navigation/stack";
import SettingsList from "./SettingsList.js";
import {CloseIcon} from '../Menu/CloseIcon';
import { BackIcon } from "../Menu/BackIcon";
import GoBackHeader from '../Menu/GoBackHeader';
import OtherSettings from "./OtherSettings"
import Help from "./Help"
import About from "./About"
import ReportBug from "./ReportBug"
import TermsOfService from "./TermsOfService"
import Notifications from "./Notifications"
import Privacy from "./Privacy"
import BlockedUsers from "./BlockedUsers"
import MessagePrivacy from "./MessagePrivacy"
import AdminConsole from './AdminConsole';
/**
 * Orientation is a one of the three primary tab components. It contains all things Orientation.
 * @param props The toggleDrawer is a reference to the navigation.toggleDrawer() method of the Drawer Navigator
 * @returns Stack Navigator of Orientation
 * @constructor
 */


 const config = {
   animation: 'spring',
   config: {
     stiffness: 1000,
     damping: 50,
     mass: 3,
     overshootClamping: false,
     restDisplacementThreshold: 0.01,
     restSpeedThreshold: 0.01,
   },
 };

 const closeConfig = {
   animation: 'timing',
   config:{
     duration: 500,
     easing: Easing.linear
   }
 }


export default function Settings({navigation}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      //headerShown: true,
      gestureEnabled: true,
      gestureDirection: "horizontal",
      ...TransitionPresets.SlideFromRightIOS

    }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsList}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="ReportBug"
        component={ReportBug}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="BlockedUsers"
        component={BlockedUsers}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="MessagePrivacy"
        component={MessagePrivacy}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }}
        />
      <Stack.Screen
        name="Admin Console"
        component={AdminConsole}
        options={{
          headerRight: () => <CloseIcon mainNavigation={navigation} />,
        }} />
    </Stack.Navigator>
  );
}
