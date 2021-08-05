import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import isBetween from "dayjs/plugin/isBetween";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

dayjs.extend(minMax);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const Provider = ({ children, store, theme = {} }) => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
    </ThemeProvider>
  );
};

export default Provider;
