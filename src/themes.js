// themes.js

import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Adjusted shade of blue
    },
    secondary: {
      main: '#f48fb1', // Adjusted shade of pink
    },
    background: {
      default: '#303030', // Adjusted background color
      paper: '#424242', // Adjusted surface color
    },
    text: {
      primary: '#ffffff', // Adjusted text color
      secondary: '#bdbdbd', // Adjusted secondary text color
    },
  },
});
