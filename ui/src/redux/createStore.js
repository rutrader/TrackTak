import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { contentfulReducer } from "./reducers/contentfulReducer";
import { dcfReducer } from "./reducers/dcfReducer";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory, createMemoryHistory } from "history";
import isSSR from "../shared/isSSR";

const { routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: isSSR ? createMemoryHistory() : createBrowserHistory(),
});

export default (preloadedState) => {
  return configureStore({
    reducer: combineReducers({
      router: routerReducer,
      fundamentals: fundamentalsReducer,
      page: pageReducer,
      contentful: contentfulReducer,
      dcf: dcfReducer,
    }),
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(routerMiddleware),
  });
};
