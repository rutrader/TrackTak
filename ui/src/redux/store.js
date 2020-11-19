import { combineReducers } from "redux";
import { financialsReducer } from "./reducers/financialsReducer";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  financials: financialsReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
