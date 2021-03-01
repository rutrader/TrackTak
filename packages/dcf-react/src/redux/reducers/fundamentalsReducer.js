import { createReducer } from "@reduxjs/toolkit";
import {
  getLastPriceCloseThunk,
  setFundamentals,
  setExchangeRates,
  setTenYearGovernmentBondLastClose,
} from "../actions/fundamentalsActions";

const initialState = {
  governmentBondTenYearYield: null,
  priceLastClose: null,
  data: null,
  exchangeRates: null,
};

const setFundamentalsReducer = (state, action) => {
  state.data = action.payload;
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
  const values = Object.values(payload);

  if (values.length) {
    state.exchangeRates = payload;
  } else {
    state.exchangeRates = null;
  }
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getLastPriceCloseThunk.fulfilled, setLastPriceCloseReducer);
  builder.addCase(setFundamentals, setFundamentalsReducer);
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer,
  );
  builder.addCase(setExchangeRates, setExchangeRateReducer);
});
