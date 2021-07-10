import { DefaultTheme } from '@material-ui/styles';
import { Appearance } from 'react-native';
import ColorTheme from './colorTheme.d';
import dark from './dark';
import light from './light';

interface Palette extends ColorTheme {
  accent: string;
  black: string;
}

declare module '@material-ui/styles' {
  interface DefaultTheme {
    palette: Palette;
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
