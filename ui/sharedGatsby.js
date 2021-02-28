import theme from "./theme";
import React from "react";
import { ThemeProvider } from "@material-ui/core";
import minMax from "dayjs/plugin/minMax";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import { store } from "./src/redux/createStore";
import { setFundamentals } from "./src/redux/actions/fundamentalsActions";
import getInitialFundamentalsData from "./src/shared/getInitialFundamentalsData";

export const wrapRootElement = ({ element }) => {
  dayjs.extend(minMax);
  dayjs.extend(advancedFormat);

  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  if (props.data) {
    if (props.data.stockFundamentals) {
      const { General, Highlights } = props.data.stockFundamentals;

      store.dispatch(
        setFundamentals(getInitialFundamentalsData(General, Highlights)),
      );
    }

    if (props.data.contentfulDcfTemplate) {
      const parsedFinancialData = JSON.parse(
        props.data.contentfulDcfTemplate.data.internal.content,
      );

      store.dispatch(setFundamentals(parsedFinancialData));
    }
  }

  return element;
};
