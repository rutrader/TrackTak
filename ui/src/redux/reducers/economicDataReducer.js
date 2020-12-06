import { createReducer } from "@reduxjs/toolkit";
import {
  getTenYearGovernmentBondLastClose,
  getExchangeRatesLastCloses,
} from "../actions/economicDataActions";

const initialState = {
  governmentBondTenYearLastClose: null,
  exchangeRatePairs: null,
};

export const economicDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    getTenYearGovernmentBondLastClose.fulfilled,
    (state, action) => {
      state.governmentBondTenYearLastClose =
        action.payload.governmentBondLastClose;
    }
  );
  builder.addCase(getExchangeRatesLastCloses.fulfilled, (state, action) => {
    const {
      baseCurrency,
      exchangeRatesLastCloses,
    } = action.payload.exchangeRates;
    const exchangeRatePairs = {};
    const exchangeRatesLastClosesWithEur = {
      ...exchangeRatesLastCloses,
      [baseCurrency]: 1,
    };

    Object.keys(exchangeRatesLastClosesWithEur).forEach((baseKey) => {
      const baseExchangeRate = exchangeRatesLastClosesWithEur[baseKey];

      exchangeRatePairs[baseKey] = {};

      Object.keys(exchangeRatesLastClosesWithEur).forEach((quoteKey) => {
        if (baseKey !== quoteKey) {
          const quoteExchangeRate = exchangeRatesLastClosesWithEur[quoteKey];

          exchangeRatePairs[baseKey] = {
            ...exchangeRatePairs[baseKey],
            [quoteKey]: quoteExchangeRate / baseExchangeRate,
          };
        }
      });
    });

    state.exchangeRatePairs = exchangeRatePairs;
  });
});
