import React from "react";
import {
  TracktakProvider,
  createStore,
  setFundamentals,
  convertFundamentals,
} from "@tracktak/intrinsic-valuations";
import { LocationProvider, globalHistory } from "@reach/router";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import theme from "./src/theme";
import { snackbarReducer } from "./src/redux/reducers/snackbarReducer";
import PageSpinner from "./src/components/PageSpinner";
import setURLSearchQuery from "./src/shared/setURLSearchQuery";
import { ProvideAuth } from "./src/hooks/useAuth";
import TTCookieBanner from "./src/components/TTCookieBanner";
import {
  setExchangeRates,
  setLastPriceClose,
  setTenYearGovernmentBondLastClose,
} from "../packages/intrinsic-valuations/src/redux/actions/fundamentalsActions";

const store = createStore(undefined, {
  snackbar: snackbarReducer,
});

export const wrapRootElement = ({ element }) => {
  // Do not put components in this function, instead put them in layout/index.js
  // due to a gatsby/mui bug
  return (
    <TracktakProvider store={store} theme={theme}>
      <ProvideAuth>
        <PageSpinner />
        {element}
        <TTCookieBanner />
      </ProvideAuth>
    </TracktakProvider>
  );
};

export const wrapPageElement = ({ element, props: { data, location } }) => {
  if (data && data.contentfulDcfTemplate) {
    const {
      fundamentalsData,
      exchangeRates,
      price,
      tenYearGovernmentBondYield,
    } = data.contentfulDcfTemplate;
    const { dispatch } = store;

    const parsedFinancialData = JSON.parse(fundamentalsData.internal.content);
    const parsedExchangeRates = exchangeRates
      ? JSON.parse(exchangeRates.internal.content)
      : null;

    const searchParams = setURLSearchQuery(data.contentfulDcfTemplate);
    const search = `?${searchParams.toString()}`;

    dispatch(setFundamentals(convertFundamentals(parsedFinancialData)));
    if (parsedExchangeRates) {
      dispatch(setExchangeRates(parsedExchangeRates));
    }
    dispatch(setLastPriceClose(price));
    dispatch(setTenYearGovernmentBondLastClose(tenYearGovernmentBondYield));

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
