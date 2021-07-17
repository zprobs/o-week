import React from 'react';
import TabNavigator from '@components/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import Client from '@resources/apollo/Client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

const App: React.FC = () => {
  return (
    <ApolloProvider client={Client}>
      <NavigationContainer>
        <SafeAreaProvider>
          <TabNavigator />
          <FlashMessage position="top" />
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
