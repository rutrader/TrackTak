import { createReducer } from "@reduxjs/toolkit";
import {
  setLastPriceClose,
  setFundamentals,
  setExchangeRates,
  setTenYearGovernmentBondLastClose,
} from "../actions/stockActions";

const initialState = {
  governmentBondTenYearYield: null,
  priceLastClose: null,
  fundamentals: null,
  exchangeRates: null,
  isLoaded: null,
};

const setFundamentalsReducer = (state, action) => {
  const {
    general,
    highlights,
    sharesStats,
    incomeStatement,
    balanceSheet,
    cashFlowStatement,
  } = action.payload;

  state.fundamentals = {
    general,
    highlights,
    sharesStats,
    incomeStatement,
    balanceSheet,
    cashFlowStatement,
  };
};

const setLastPriceCloseReducer = (state, action) => {
  const priceLastClose = action.payload;

  state.priceLastClose = priceLastClose;
};

const setGovernmentBondTenYearLastCloseReducer = (
  state,
  { payload = null },
) => {
  state.governmentBondTenYearYield = payload / 100;
};

const setExchangeRateReducer = (state, { payload = {} }) => {
  state.exchangeRates = Object.values(payload);
};

export const stockReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentals, setFundamentalsReducer);
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer,
  );
  builder.addCase(setExchangeRates, setExchangeRateReducer);
  builder.addMatcher(
    () => true,
    (state) => {
      if (
        state.fundamentals !== null &&
        state.governmentBondTenYearYield !== null &&
        state.exchangeRates !== null &&
        state.priceLastClose !== null
      ) {
        state.isLoaded = true;
      }
    },
  );
});
