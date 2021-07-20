import { combineReducers } from "redux";
import { stockReducer } from "./reducers/stockReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: combineReducers({
    stock: stockReducer,
  }),
});

export default store;
