import { createMuiTheme } from "@material-ui/core";
import { merge } from "lodash";

const theme = merge(createMuiTheme(), {
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    primary: {
      light: "#2fdbab",
      main: "#43cea2",
      dark: "#38ab87",
    },
    secondary: {
      light: "#7849BF",
      main: "#51509C",
      dark: "#41407d",
    },
    text: {
      secondary: "rgba(0,0,0,.6)",
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
});

export default theme;
