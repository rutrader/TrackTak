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
import { useEffect } from "react";
import convertFundamentals from "../src/shared/convertFundamentals";
import theme from "../../../ui/src/theme";

const source = createMemorySource("/");
const history = createHistory(source);
const store = createStore(mockPreloadedStateJSON);

store.dispatch(setFundamentals(convertFundamentals(mockStockDataJSON)));

const withTracktakProvier = (story) => {
  useEffect(() => {
    history.location.hash = "";
    history.location.search =
      "?cagrYearOneToFive=0.18&ebitTargetMarginInYearTen=0.1&yearOfConvergence=3&salesToCapitalRatio=2.5";
  }, []);

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
