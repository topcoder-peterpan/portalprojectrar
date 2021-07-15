import { createTheme } from '@material-ui/core/styles'
import {
  ERROR,
  PRIMARY,
  SECONDARY,
  SUCCESS,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '../constants/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
      contrastText: '#fff',
    },
    secondary: {
      main: SECONDARY,
      contrastText: '#fff',
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    success: {
      main: SUCCESS,
    },
    error: {
      main: ERROR,
    },
  },
  typography: {
    fontFamily: 'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 850,
      md: 990,
      lg: 1223,
      xl: 1606,
    },
  },
})

theme.overrides = {
  MuiButton: {
    root: {
      fontSize: 16,
      textTransform: 'unset',
    },
    contained: {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
  },
  MuiDivider: {
    root: {
      marginTop: 24,
      marginBottom: 24,
    },
  },
}

export default theme
