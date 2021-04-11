import React from "react";
import {
  TracktakProvider,
  createStore,
  setFundamentals,
  fundamentalsReducer,
  convertFundamentals,
} from "@tracktak/dcf-react";
import { extendedFundamentalsReducer } from "./src/redux/reducers/extendedFundamentalsReducer";
import "./sass/blueprintTheme.scss";
import "@tracktak/dcf-react/dist/index.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import theme from "./src/theme";
import { snackbarReducer } from "./src/redux/reducers/snackbarReducer";
import PageSpinner from "./src/components/PageSpinner";
import thunk from "redux-thunk";

const store = createStore(
  undefined,
  {
    snackbar: snackbarReducer,
    fundamentals: (state, action) =>
      extendedFundamentalsReducer(fundamentalsReducer(state, action), action),
  },
  [thunk],
);

export const wrapRootElement = ({ element }) => {
  // Do not put components in this function, instead put them in layout/index.js
  // due to a gatsby/mui bug
  return (
    <TracktakProvider store={store} theme={theme}>
      <PageSpinner />
      {element}
    </TracktakProvider>
  );
};

export const wrapPageElement = ({ element, props: { data } }) => {
  if (data && data.contentfulDcfTemplate) {
    const parsedFinancialData = JSON.parse(
      data.contentfulDcfTemplate.data.internal.content,
    );

    store.dispatch(setFundamentals(convertFundamentals(parsedFinancialData)));
  }

  return element;
};
