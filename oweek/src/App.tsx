import React from 'react';
import getTheme from '@root/theme';
import { ThemeProvider } from '@material-ui/styles';
import TabNavigator from '@components/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  const theme = getTheme();

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <TabNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
