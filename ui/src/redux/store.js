import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { employeeOptionsReducer } from "./reducers/employeeOptionsReducer";
import { governmentBondsReducer } from "./reducers/governmentBondsReducer";
import { equityRiskPremiumCountriesReducer } from "./reducers/equityRiskPremiumReducer";

export const rootReducer = combineReducers({
  fundamentals: fundamentalsReducer,
  employeeOptions: employeeOptionsReducer,
  equityRiskPremium: equityRiskPremiumCountriesReducer,
  page: pageReducer,
  governmentBonds: governmentBondsReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
