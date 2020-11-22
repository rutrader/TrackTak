import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";

export const rootReducer = combineReducers({
  fundamentals: fundamentalsReducer,
  page: pageReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
