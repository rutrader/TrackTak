import { createReducer } from "@reduxjs/toolkit";
import {
  setExchangeRate,
  setFundamentalsDataThunk,
  setLastPriceClose,
  setTenYearGovernmentBondLastClose,
} from "../actions/fundamentalsActions";

const initialState = {
  governmentBondTenYearYield: null,
  priceLastClose: null,
  data: null,
  isLoaded: false,
  exchangeRates: null,
};

const setFundamentalsReducer = (state, action) => {
  state.data = action.payload.data;
  state.isLoaded = true;
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
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentalsDataThunk.pending, (state) => {
    state.isLoaded = false;
  });
  builder.addCase(setFundamentalsDataThunk.fulfilled, setFundamentalsReducer);
  builder.addCase(setFundamentalsDataThunk.rejected, (state) => {
    state.isLoaded = false;
  });
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer,
  );
  builder.addCase(setExchangeRate, setExchangeRateReducer);
});
