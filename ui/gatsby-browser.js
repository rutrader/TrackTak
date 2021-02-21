import theme from "./theme";
import minMax from "dayjs/plugin/minMax";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { ThemeProvider } from "@material-ui/core";

export const onClientEntry = () => {
  dayjs.extend(minMax);
  dayjs.extend(advancedFormat);
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  if (prevRouterProps?.location.pathname !== routerProps.location.pathname) {
    return true;
  }
  return false;
};
