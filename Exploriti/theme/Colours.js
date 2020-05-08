/**
 * App Colours:
 * This contains all the colour config for the application
 */


export const ThemeVariant = {
    light: 'light',
    dark: 'dark'
};


export const DynamicStatusBar = {
    light: {
        barStyle: 'dark-content',
        backgroundColor: '#FFFFFF'
    },
    dark: {
        barStyle: 'light-content',
        backgroundColor: '#121212'
    }
};

export const ThemeStatic = {
    accent: '#846BE2',
    white: '#FFFFFF',
    black: '#000000',
    text01: '#000000',
    text02: '#BBBBBB',
    placeholder: '#F4F4F4',
    like: '#E24359',
    unlike: '#DDD',
    translucent: 'rgba(0, 0, 0, 0.1)',
    delete: '#F44336',
    badge: '#F24'
};

type ThemeType = {
    type: string,
    colors: ThemeColors
};

type ThemeColors = {
    accent: string,
    base: string,
    text01: string,
    text02: string,
    placeholder: string,
    white: string
};

export const Theme: {
    [key: string]: ThemeType
} = {
    light: {
        type: 'light',
        colors: {
            accent: '#846BE2',
            base: '#FFFFFF',
            text01: '#000000',
            text02: '#BBBBBB',
            placeholder: '#F4F4F4',
            white: '#FFFFFF'
        }
    },
    dark: {
        type: 'dark',
        colors: {
            accent: '#846BE2',
            base: '#121212',
            text01: '#FFFFFF',
            text02: '#BBBBBB',
            placeholder: '#222',
            white: '#FFFFFF'
        }
    }
};

export const HandleAvailableColor = {
    true: '#05b714',
    false: '#EF5350'
};

export const OnlineDotColor  = {
    true: '#4caf50',
    false: '#BBBBBB'
};
