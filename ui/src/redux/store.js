import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { governmentBondsReducer } from "./reducers/governmentBondsReducer";
import { equityRiskPremiumCountriesReducer } from "./reducers/equityRiskPremiumReducer";
import { industryAveragesReducer } from "./reducers/industryAveragesReducer";
import { inputReducer } from "./reducers/inputReducer";

export const rootReducer = combineReducers({
  fundamentals: fundamentalsReducer,
  input: inputReducer,
  equityRiskPremium: equityRiskPremiumCountriesReducer,
  page: pageReducer,
  governmentBonds: governmentBondsReducer,
  industryAverages: industryAveragesReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
