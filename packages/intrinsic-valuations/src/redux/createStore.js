import { combineReducers } from "redux";
import { stockReducer } from "./reducers/stockReducer";
import { configureStore } from "@reduxjs/toolkit";
import { dcfReducer } from "./reducers/dcfReducer";

const createStore = (preloadedState, reducers) => {
  return configureStore({
    reducer: combineReducers({
      stock: stockReducer,
      dcf: dcfReducer,
      ...reducers,
    }),
    preloadedState,
  });
};

export default createStore;
