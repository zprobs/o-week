/**
 * The frontend application of 'Exploriti'. Built on React-Native, GraphQL, and Django for iOS and Android
 * https://github.com/exploriti
 * @author Zachary Probst, Shayan Shakeri, Salman Shahid, Paul Giugeu, and Antoine Finot
 * @copyright Arravon Technologies Inc.
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, Text, StatusBar, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import GroupExplore from './components/GroupExplore';
import Profile from './components/Profile';

const client = new ApolloClient();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Orientation" component={Orientation} />
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="MyProfile" component={MyProfile} />
        </Tab.Navigator>
    );
}

function Orientation() {
    return(
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Button
                onPress={() => navigation.navigate("Admin")}
                title="Go to Admin"
            />
        </View>
    )
}

function Explore() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Explore" component={GroupExplore} />
        </Stack.Navigator>
    )
}

function MyProfile() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="My Profile" component={Profile} />
        </Stack.Navigator>
    )
}

const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen}  />
            <Drawer.Screen name="Admin" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={HomeScreen} />
            <Drawer.Screen name="About" component={HomeScreen} />
            <Drawer.Screen name="Logout" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
