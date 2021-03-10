import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { dcfReducer } from "./reducers/dcfReducer";

const createStore = (preloadedState) => {
  return configureStore({
    reducer: combineReducers({
      fundamentals: fundamentalsReducer,
      page: pageReducer,
      dcf: dcfReducer,
    }),
    preloadedState,
  });
};

export default createStore;
