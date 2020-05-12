/**
 * The frontend application of 'Exploriti'. Built on React-Native, GraphQL, and Django for iOS and Android
 * https://github.com/exploriti
 * @author Zachary Probst, Shayan Shakeri, Salman Shahid, Paul Giugeu, and Antoine Finot
 * @copyright Arravon Technologies Inc.
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Explore from "./components/Explore";
import MyProfile from "./components/MyProfile";
import Orientation from "./components/Orientation";
import Settings from "./components/Settings";


const client = new ApolloClient({
  uri: "https://exploriti-backend.herokuapp.com/v1/graphql",
});

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" edgeWidth={0}>
          <Drawer.Screen name="Home" component={HomeScreen} />
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
