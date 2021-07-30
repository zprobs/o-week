import { Appearance } from 'react-native';
import ColorTheme from './colorTheme.d';
import dark from './dark';
import light from './light';

interface Palette extends ColorTheme {
  accent: string;
  black: string;
  white: string;
  delete: string;
  lightgray: string;
  gold: string;
  lightBlue: string;
}

interface Font {
  bold: string;
  regular: string;
  light: string;
}

interface Size {
  superHeading: number;
  largeHeading: number;
  heading: number;
  subHeading: number;
  label: number;
  bodyLarge: number;
  body: number;
  caption: number;
  subText: number;
}

export interface DefaultTheme {
  palette: Palette;
  font: Font;
  size: Size;
}

const getTheme = (): DefaultTheme => {
  const prefersDarkMode = Appearance.getColorScheme() === 'dark';
  return {
    palette: {
      ...(prefersDarkMode ? dark : light),
      accent: '#0088cc',
      black: 'rgba(0,0,0,1)',
      white: '#FFFFFF',
      delete: '#F44336',
      lightgray: '#F1F1F1',
      gold: 'rgba(244,192,4,1)',
      lightBlue: '#3D9CE3',
    },
    font: {
      bold: 'SFProDisplay-Bold',
      regular: 'SFProDisplay-Regular',
      light: 'SFProDisplay-Light',
    },
    size: {
      superHeading: 48,
      largeHeading: 38,
      heading: 32,
      subHeading: 24,
      label: 20,
      bodyLarge: 18,
      body: 16,
      caption: 14,
      subText: 12,
    },
  };
};

export default getTheme;
