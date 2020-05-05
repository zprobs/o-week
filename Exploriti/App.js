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
import { SafeAreaView, Text, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Orientation from './components/Orientation';

const client = new ApolloClient();

const Stack = createStackNavigator();


const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component=Orientation />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
