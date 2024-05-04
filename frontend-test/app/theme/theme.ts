'use client'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    smm: true
    md: true
    lg: true
    xl: true
  }
}
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      smm: 767,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    body1: {
      fontFamily: 'Ostrich_Sans',
    },
    body2: {
      fontFamily: 'Lato',
      fontSize: '18px',
      fontWeight: '500',
      fontStyle: 'normal',
      lineHeight: '24px',
    },
    h4: {
      fontFamily: 'Ostrich_Sans_Black',
      fontSize: '18px',
      fontWeight: '900',
      fontStyle: 'normal',
    },
  },
})
