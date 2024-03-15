"use client";
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#018BB2",
        },
        secondary: {
            main: "#FFE715",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#018BB2',
                }
            }
        }
    }
});

export default function MUIThemeProvider({children}) {
  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  );
}