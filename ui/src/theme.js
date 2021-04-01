import {
  alpha,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  typography: {
    fontFamily: "Nunito",
  },
  palette: {
    tableBackground: alpha("#51509c", 0.1),
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
          borderRadius: "50px",
        },
      },
    },
  },
  zIndex: {
    scrollTopButton: 900,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
