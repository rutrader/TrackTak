import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { dcfReducer } from "./reducers/dcfReducer";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory, createMemoryHistory } from "history";
import isSSR from "../shared/isSSR";

const { routerMiddleware } = createReduxHistoryContext({
  history: isSSR ? createMemoryHistory() : createBrowserHistory(),
});

export const store = configureStore({
  reducer: combineReducers({
    fundamentals: fundamentalsReducer,
    page: pageReducer,
    dcf: dcfReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware),
});

export default () => {
  return store;
};
