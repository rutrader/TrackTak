import { alpha, responsiveFontSizes, createTheme } from '@mui/material'

let theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
    button: {
      fontSize: '16px'
    },
    fontSize2: '18px',
    fontSize3: '25px',
    fontSize4: '14px',
    table: {
      header: '13px'
    }
  },
  palette: {
    tableBackground: alpha('#51509c', 0.04),
    spreadsheetBackground: '#eeeef5',
    folderNameText: '#1A1A1A',
    warning: {
      main: '#ED6C02'
    },
    primary: {
      light: '#2fdbab',
      main: '#43cea2',
      dark: '#38ab87',
      purple: '#6240C8',
      contrastText: '#fff',
      mainTextColor: '#313450'
    },
    secondary: {
      light: '#7849BF',
      main: '#51509C',
      dark: '#41407d',
      contrastText: '#fff',
      grey: '#7B8A98'
    },
    alert: '#ff5151',
    icons: {
      facebook: '#3B5998',
      google: '#ea4435'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    },
    MuiAccordion: {
      styleOverrides: {
        rounded: {
          borderRadius: '50px'
        }
      }
    }
  },
  zIndex: {
    scrollTopButton: 900,
    cookieBanner: 99999
  }
})

theme = responsiveFontSizes(theme)

export default theme
