import React from "react";
import {
  TracktakProvider,
  createStore,
  setFundamentals,
  fundamentalsReducer,
} from "@tracktak/dcf-react";
import { extendedFundamentalsReducer } from "./src/redux/reducers/extendedFundamentalsReducer";
import "./sass/blueprintTheme.scss";
import "@tracktak/dcf-react/dist/index.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
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

export const wrapPageElement = ({ element, props }) => {
  if (props.data) {
    if (props.data.contentfulDcfTemplate) {
      const parsedFinancialData = JSON.parse(
        props.data.contentfulDcfTemplate.data.internal.content,
      );

      store.dispatch(setFundamentals(parsedFinancialData));
    }
  }

  return element;
};
