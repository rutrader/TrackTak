import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { dcfReducer } from "./reducers/dcfReducer";

const createStore = (preloadedState, reducers) => {
  return configureStore({
    reducer: combineReducers({
      fundamentals: fundamentalsReducer,
      dcf: dcfReducer,
      ...reducers,
    }),
    preloadedState,
  });
};

export default createStore;
