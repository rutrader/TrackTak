import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import theme from "./theme";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);
dayjs.extend(advancedFormat);

const Provider = ({ children, store }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
    </ThemeProvider>
  );
};

export default Provider;
