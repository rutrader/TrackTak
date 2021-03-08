import React from "react";
import getInitialFundamentalsData from "./src/shared/getInitialFundamentalsData";
import {
  TracktakProvider,
  createStore,
  setFundamentals,
} from "@tracktak/dcf-react";
import "./sass/blueprintTheme.scss";
import theme from "./src/theme";

const store = createStore();

export const wrapRootElement = ({ element }) => {
  return (
    <TracktakProvider store={store} theme={theme}>
      {element}
    </TracktakProvider>
  );
};

export const wrapPageElement = ({ element, props }) => {
  if (props.data) {
    if (props.data.stockFundamentals) {
      const { General, Highlights } = props.data.stockFundamentals;
      const state = store.getState();

      if (
        General.Code !==
        (state.fundamentals.general && state.fundamentals.general.code)
      ) {
        store.dispatch(
          setFundamentals(getInitialFundamentalsData(General, Highlights)),
        );
      }
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
