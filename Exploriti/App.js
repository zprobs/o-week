/**
 * The frontend application of 'Exploriti'. Built on React-Native, GraphQL, and Django for iOS and Android
 * https://github.com/exploriti
 * @author Zachary Probst, Shayan Shakeri, Salman Shahid, Paul Giugeu, and Antoine Finot
 * @copyright Arravon Technologies Inc.
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, Text, StatusBar, View } from 'react-native';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient();

const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <Text>Orientation / Dashboard</Text>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
