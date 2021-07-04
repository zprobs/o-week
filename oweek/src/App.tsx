import React from 'react';
import getTheme from '@root/theme';
import { ThemeProvider } from '@material-ui/styles';
import TabNavigator from '@components/navigation/TabNavigator';

const App = () => {
  const theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <TabNavigator />
    </ThemeProvider>
  );
};

export default App;
