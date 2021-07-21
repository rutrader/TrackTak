import { createReducer } from "@reduxjs/toolkit";
import { setFinancials } from "../actions/stockActions";

const initialState = {
  financials: null,
  hasLoaded: null,
};

const setFinancialsReducer = (state, action) => {
  state.financials = action.payload;
};

export const stockReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFinancials, setFinancialsReducer);
});
