import React from "react";
import getInitialFundamentalsData from "./src/shared/getInitialFundamentalsData";
import {
  TracktakProvider,
  createStore,
  setFundamentals,
} from "@tracktak/dcf-react";
import "./sass/blueprintTheme.scss";
import "@tracktak/dcf-react/dist/index.css";
import theme from "./src/theme";
import convertFundamentals from "./src/shared/convertFundamentals";

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
          setFundamentals(
            convertFundamentals(
              getInitialFundamentalsData(General, Highlights),
            ),
          ),
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
