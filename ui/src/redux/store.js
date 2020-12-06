import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { economicDataReducer } from "./reducers/economicDataReducer";
import { equityRiskPremiumCountriesReducer } from "./reducers/equityRiskPremiumReducer";
import { industryAveragesReducer } from "./reducers/industryAveragesReducer";

export const rootReducer = combineReducers({
  fundamentals: fundamentalsReducer,
  equityRiskPremium: equityRiskPremiumCountriesReducer,
  page: pageReducer,
  economicData: economicDataReducer,
  industryAverages: industryAveragesReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
