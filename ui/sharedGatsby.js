import React from "react";
import {
  TracktakProvider,
  createStore,
  setFundamentals,
  fundamentalsReducer,
  convertFundamentals,
} from "@tracktak/dcf-react";
import { extendedFundamentalsReducer } from "./src/redux/reducers/extendedFundamentalsReducer";
import "./sass/blueprintTheme.scss";
import "@tracktak/dcf-react/dist/index.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import theme from "./src/theme";
import PageSpinner from "./src/components/PageSpinner";

const store = createStore(undefined, {
  fundamentals: (state, action) =>
    extendedFundamentalsReducer(fundamentalsReducer(state, action), action),
});

export const wrapRootElement = ({ element }) => {
  return (
    <TracktakProvider store={store} theme={theme}>
      <PageSpinner />
      {element}
    </TracktakProvider>
  );
};

let prevPath;

export const wrapPageElement = ({ element, props: { data, path } }) => {
  if (data && data.contentfulDcfTemplate) {
    const parsedFinancialData = JSON.parse(
      data.contentfulDcfTemplate.data.internal.content,
    );

    if (prevPath !== path) {
      store.dispatch(setFundamentals(convertFundamentals(parsedFinancialData)));
    }
  }

  prevPath = path;

  return element;
};
