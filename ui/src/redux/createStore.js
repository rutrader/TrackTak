import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { contentfulReducer } from "./reducers/contentfulReducer";
import { dcfReducer } from "./reducers/dcfReducer";
import { createReduxHistoryContext, reachify } from "redux-first-history";
import { createBrowserHistory, createMemoryHistory } from "history";
import isSSR from "../shared/isSSR";

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer,
} = createReduxHistoryContext({
  history: isSSR ? createMemoryHistory() : createBrowserHistory(),
});

const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    fundamentals: fundamentalsReducer,
    page: pageReducer,
    contentful: contentfulReducer,
    dcf: dcfReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
export const reachHistory = reachify(history);

export default () => {
  return store;
};
