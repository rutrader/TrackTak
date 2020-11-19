import { combineReducers } from "redux";
import { financialsReducer } from "./reducers/financialsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";

export const rootReducer = combineReducers({
  financials: financialsReducer,
  page: pageReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
