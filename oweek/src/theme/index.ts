import { DefaultTheme } from '@material-ui/styles';
import { Appearance } from 'react-native';
import ColorTheme from './colorTheme.d';
import dark from './dark';
import light from './light';

interface Palette extends ColorTheme {
  accent: string;
  black: string;
}

interface Font {
  bold: string;
  regular: string;
  light: string;
}

interface Size {
  superHeading: number;
  heading: number;
  subHeading: number;
  label: number;
  Body: number;
  caption: number;
  subText: number;
}

declare module '@material-ui/styles' {
  interface DefaultTheme {
    palette: Palette;
    font: Font;
    size: Size;
  }
}

const getTheme = (): DefaultTheme => {
  const prefersDarkMode = Appearance.getColorScheme() === 'dark';
  return {
    palette: {
      ...(prefersDarkMode ? dark : light),
      accent: '#0088cc',
      black: 'rgba(0,0,0,1)',
    },
    font: {
      bold: 'SFProDisplay-Bold',
      regular: 'SFProDisplay-Regular',
      light: 'SFProDisplay-Light',
    },
    size: {
      superHeading: 48,
      heading: 32,
      subHeading: 24,
      label: 20,
      Body: 16,
      caption: 14,
      subText: 12,
    },
  };
};

export default getTheme;
