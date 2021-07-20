import React from "react";
import { TracktakProvider } from "@tracktak/intrinsic-valuations";
import { LocationProvider, globalHistory } from "@reach/router";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import theme from "./src/theme";
import { snackbarReducer } from "./src/redux/reducers/snackbarReducer";
import { ProvideAuth } from "./src/hooks/useAuth";
import TTCookieBanner from "./src/components/TTCookieBanner";
import { CssBaseline } from "@material-ui/core";
import { setUseWhatChange } from "@simbathesailor/use-what-changed";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

setUseWhatChange(process.env.NODE_ENV === "development");

const store = configureStore({
  reducer: combineReducers({
    snackbar: snackbarReducer,
  }),
});

export const wrapRootElement = ({ element }) => {
  // Do not put components in this function, instead put them in layout/index.js
  // due to a gatsby/mui bug
  return (
    <TracktakProvider store={store} theme={theme}>
      <CssBaseline />
      <ProvideAuth>
        {/* <FundamentalsSpinner /> */}
        {element}
        <TTCookieBanner />
      </ProvideAuth>
    </TracktakProvider>
  );
};

export const wrapPageElement = ({ element, props: { data } }) => {
  if (data && data.contentfulDcfTemplate) {
    // const {
    //   fundamentalsData,
    //   exchangeRates,
    //   price,
    //   tenYearGovernmentBondYield,
    // } = data.contentfulDcfTemplate;
    // const { dispatch } = store;

    // const parsedFinancialData = JSON.parse(fundamentalsData.internal.content);
    // const parsedExchangeRates = exchangeRates?.length
    //   ? JSON.parse(exchangeRates.internal.content)
    //   : undefined;

    // dispatch(setFundamentals(convertFundamentals(parsedFinancialData)));
    // dispatch(setExchangeRates(parsedExchangeRates));
    // dispatch(setLastPriceClose(price));
    // dispatch(setTenYearGovernmentBondLastClose(tenYearGovernmentBondYield));

    return (
      <LocationProvider history={globalHistory}>{element}</LocationProvider>
    );
  }

  return element;
};
