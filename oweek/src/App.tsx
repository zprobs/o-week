import React from 'react';
import getTheme from '@root/theme';
import { ThemeProvider } from '@material-ui/styles';
import TabNavigator from '@components/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import Client from '@resources/apollo/Client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

const App: React.FC = () => {
  const theme = getTheme();

  return (
    <ApolloProvider client={Client}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <TabNavigator />
            <FlashMessage position="top" />
          </SafeAreaProvider>
        </ThemeProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
