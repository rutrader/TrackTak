import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { employeeOptionsReducer } from "./reducers/employeeOptionsReducer";

export const rootReducer = combineReducers({
  fundamentals: fundamentalsReducer,
  employeeOptions: employeeOptionsReducer,
  page: pageReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
