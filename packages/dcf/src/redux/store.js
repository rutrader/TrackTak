import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { dcfReducer } from "./reducers/dcfReducer";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

const createRootReducer = (history) => {
  const router = connectRouter(history);

  return combineReducers({
    router,
    fundamentals: fundamentalsReducer,
    page: pageReducer,
    dcf: dcfReducer,
  });
};

export const history = createBrowserHistory();

export const createStore = (preloadedState) => {
  return configureStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(routerMiddleware(history)),
    preloadedState,
  });
};

const store = createStore();

export default store;
