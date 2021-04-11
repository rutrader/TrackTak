import React from "react";
import { setFundamentals, TracktakProvider } from "../src";
import mockPreloadedStateJSON from "../mocks/mockPreloadedState.json";
import mockStockDataJSON from "../mocks/mockStockData.json";
import createStore from "../src/redux/createStore";
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from "@reach/router";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";
import "../src/reset.css";
import convertFundamentals from "../src/shared/convertFundamentals";
import theme from "../../../ui/src/theme";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";

const source = createMemorySource("/");
const history = createHistory(source);
const store = createStore(mockPreloadedStateJSON);

store.dispatch(setFundamentals(convertFundamentals(mockStockDataJSON)));

const withTracktakProvier = (story) => {
  history.location.search =
    "?cagrYearOneToFive=0.182&ebitTargetMarginInYearTen=0.70&yearOfConvergence=3&salesToCapitalRatio=2.5&probabilityOfFailure=0.3&proceedsAsAPercentageOfBookValue=0.2";

  return (
    <TracktakProvider store={store} theme={theme}>
      <LocationProvider history={history}>
        {story({ store, history })}
      </LocationProvider>
    </TracktakProvider>
  );
};

export const decorators = [withTracktakProvier];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
