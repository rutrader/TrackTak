import theme from "./theme";
import minMax from "dayjs/plugin/minMax";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { store } from "./src/redux/createStore";
import { setFundamentals } from "./src/redux/actions/fundamentalsActions";
import getInitialFundamentalsData from "./src/shared/getInitialFundamentalsData";

export const onClientEntry = () => {
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

export const wrapPageElement = ({ element, props }) => {
  if (props.data && props.data.stockFundamentals) {
    const { General, Highlights } = props.data.stockFundamentals;

    const state = store.getState();

    if (!state.fundamentals.data) {
      store.dispatch(
        setFundamentals(getInitialFundamentalsData(General, Highlights)),
      );
    }
  }

  return element;
};

export const wrapRootElement = ({ element }) => {
  dayjs.extend(minMax);
  dayjs.extend(advancedFormat);

  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  if (prevRouterProps?.location.pathname !== routerProps.location.pathname) {
    return true;
  }
  return false;
};
