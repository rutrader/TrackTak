import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import isBetween from "dayjs/plugin/isBetween";
import store from "./redux/createStore";

dayjs.extend(minMax);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const Provider = ({ children, theme = {} }) => {
  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
    </ThemeProvider>
  );
};

export default Provider;
