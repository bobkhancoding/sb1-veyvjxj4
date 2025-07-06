import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6C63FF',
    secondary: '#FFAA00',
    tertiary: '#03DAC6',
    surface: '#FFFFFF',
    background: '#F5F5F5',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onSurface: '#000000',
    onBackground: '#000000',
    outline: '#E0E0E0',
    surfaceVariant: '#F8F9FA',
  },
  roundness: 12,
};