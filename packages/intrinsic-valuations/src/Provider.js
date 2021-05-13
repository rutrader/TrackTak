import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);
dayjs.extend(advancedFormat);

const Provider = ({ children, store, theme = {} }) => {
  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
    </ThemeProvider>
  );
};

export default Provider;
