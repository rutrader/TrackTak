import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Nunito",
  },
  palette: {
    primary: {
      light: "#2fdbab",
      main: "#fff",
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
          borderRadius: "50px",
        },
      },
    },
  },
});

export default theme;
