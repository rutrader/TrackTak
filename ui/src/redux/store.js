import { combineReducers } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageReducer";
import { contentfulReducer } from "./reducers/contentfulReducer";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

const createRootReducer = (history) => {
  const router = connectRouter(history);

  return combineReducers({
    router,
    fundamentals: fundamentalsReducer,
    page: pageReducer,
    contentful: contentfulReducer,
  });
};

export const history = createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
});

export default store;
