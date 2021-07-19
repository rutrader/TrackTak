import { combineReducers } from "redux";
import { stockReducer } from "./reducers/stockReducer";
import { configureStore } from "@reduxjs/toolkit";

const createStore = (preloadedState, reducers) => {
  return configureStore({
    reducer: combineReducers({
      stock: stockReducer,
      ...reducers,
    }),
    preloadedState,
  });
};

export default createStore;
