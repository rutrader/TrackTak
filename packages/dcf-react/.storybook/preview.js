import { setFundamentals, TracktakProvider } from "../src";
import mockPreloadedStateJSON from "../mocks/mockPreloadedState.json";
import mockIRobotDataJSON from "../mocks/mockIRobotData.json";
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

const source = createMemorySource("/");
const history = createHistory(source);
const store = createStore(mockPreloadedStateJSON);

store.dispatch(setFundamentals(mockIRobotDataJSON));

const withTracktakProvier = (story) => {
  useEffect(() => {
    history.location.hash = "";
    history.location.search =
      "?cagrYearOneToFive=0.18&ebitTargetMarginInYearTen=0.1&yearOfConvergence=3&salesToCapitalRatio=2.5";
  }, []);

  return (
    <TracktakProvider store={store}>
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
