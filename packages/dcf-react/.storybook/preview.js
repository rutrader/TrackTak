import { setFundamentals, TracktakProvider } from "../src";
import mockPreloadedStateJSON from "./mockPreloadedState.json";
import mockIRobotDataJSON from "./mockIRobotData.json";
import createStore from "../src/redux/createStore";
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from "@reach/router";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";

const source = createMemorySource("/");
const history = createHistory(source);
const store = createStore(mockPreloadedStateJSON);

store.dispatch(setFundamentals(mockIRobotDataJSON));

const withTracktakProvier = (story) => {
  return (
    <TracktakProvider store={store}>
      <LocationProvider history={history}>{story()}</LocationProvider>
    </TracktakProvider>
  );
};

export const decorators = [withTracktakProvier];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
