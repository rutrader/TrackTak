import React from "react";
import {
  TracktakProvider,
  createStore,
  setFundamentals,
  fundamentalsReducer,
  convertFundamentals,
} from "@tracktak/dcf-react";
import { LocationProvider, globalHistory } from "@reach/router";
import { extendedFundamentalsReducer } from "./src/redux/reducers/extendedFundamentalsReducer";
import "./sass/blueprintTheme.scss";
import "@tracktak/dcf-react/reset.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "./global.css";
import theme from "./src/theme";
import { snackbarReducer } from "./src/redux/reducers/snackbarReducer";
import PageSpinner from "./src/components/PageSpinner";
import setURLSearchQuery from "./src/shared/setURLSearchQuery";

const store = createStore(undefined, {
  snackbar: snackbarReducer,
  fundamentals: (state, action) =>
    extendedFundamentalsReducer(fundamentalsReducer(state, action), action),
});

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

export const wrapPageElement = ({ element, props: { data, location } }) => {
  if (data && data.contentfulDcfTemplate) {
    const parsedFinancialData = JSON.parse(
      data.contentfulDcfTemplate.data.internal.content,
    );

    const searchParams = setURLSearchQuery(data.contentfulDcfTemplate);
    const search = `?${searchParams.toString()}`;

    store.dispatch(setFundamentals(convertFundamentals(parsedFinancialData)));

    // Provide our own LocationProvider to preserve the query string params
    // because gatsby removes them
    if (!location.search) {
      globalHistory.location.search = search;
    }

    return (
      <LocationProvider history={globalHistory}>{element}</LocationProvider>
    );
  }

  return element;
};
