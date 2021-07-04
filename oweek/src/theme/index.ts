import { DefaultTheme } from '@material-ui/styles';
import { Appearance } from 'react-native';
import dark from './dark';
import light from './light';

declare module '@material-ui/styles' {
  interface DefaultTheme {
    palette: {
      accent: string;
      black: string;
      background: string;
      tabLabel: string;
      tabActiveBackground: string;
      tabInactiveBackground: string;
    };
  }
}

const getTheme = (): DefaultTheme => {
  const prefersDarkMode: boolean = Appearance.getColorScheme() === 'dark';
  return {
    palette: {
      ...(prefersDarkMode ? dark : light),
      accent: '#0088cc',
      black: 'rgba(0,0,0,1)',
    },
  };
};

export default getTheme;
