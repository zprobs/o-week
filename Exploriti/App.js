/**
 * The frontend application of 'Exploriti'. Built on React-Native, GraphQL, and Django for iOS and Android
 * https://github.com/exploriti
 * @author Zachary Probst, Shayan Shakeri, Salman Shahid, Paul Giugeu, and Antoine Finot
 * @copyright Arravon Technologies Inc.
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import Explore from "./components/Explore";
import MyProfile from "./components/MyProfile";
import Orientation from "./components/Orientation";
import Settings from "./components/Settings";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Landing from './components/Authentication';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  // Create const on a separate line to pass in Drawer Navigation and avoid warning
  const SettingsComponent = () => (
    <Settings toggleDrawer={navigation.toggleDrawer} />
  );

  const ExploreComponent = () => (
    <Explore toggleDrawer={navigation.toggleDrawer} />
  );

  const OrientationComponent = () => (
    <Orientation toggleDrawer={navigation.toggleDrawer} />
  );

  const MyProfileComponent = () => (
    <MyProfile toggleDrawer={navigation.toggleDrawer} />
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Orientation" component={OrientationComponent} />
      <Tab.Screen name="Explore" component={ExploreComponent} />
      <Tab.Screen name="MyProfile" component={MyProfileComponent} />
      <Tab.Screen name="Settings" component={SettingsComponent} />
    </Tab.Navigator>
  );
}

function AuthStack() {

    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={"Landing"} component={Landing}/>
          <Stack.Screen name={"Signup"} component={Signup}/>
          <Stack.Screen name={"Login"} component={Login}/>
          <Stack.Screen name={"MainApp"} component={MainApp}/>
      </Stack.Navigator>
    );

}

function MainApp() {

    return (
        <Drawer.Navigator initialRouteName="Home" edgeWidth={0}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Admin" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={HomeScreen} />
            <Drawer.Screen name="About" component={HomeScreen} />
            <Drawer.Screen name="Logout" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

const App: () => React$Node = ({ authState }) => {
    //const isIn = authState.status === "in";
    const isIn = false;

    const headers = isIn ? { Authorization: `Bearer ${authState.token}` } : {};

    const httpLink = new HttpLink({
        uri: "https://exploriti-backend.herokuapp.com/v1/graphql",
        headers
    });

    const wsLink = new WebSocketLink({
        uri: "wss://exploriti-backend.herokuapp.com/v1alpha1/graphql",
        options: {
            reconnect: true,
            connectionParams: {
                headers
            }
        }
    });

    const link = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLink
    );

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <AuthStack/>
            </NavigationContainer>
        </ApolloProvider>
    );

};

export default App;
