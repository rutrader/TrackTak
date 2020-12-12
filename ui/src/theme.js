import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    primary: {
      light: "#2fdbab",
      main: "#43cea2",
      dark: "#38ab87",
      contrastText: "#fff",
    },
    secondary: {
      light: "#7849BF",
      main: "#51509C",
      dark: "#41407d",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAccordion: {
      styleOverrides: {
        rounded: {
          borderRadius: "4px",
        },
      },
    },
  },
});

export default theme;
