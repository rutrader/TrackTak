import { TracktakProvider } from "../src";
import mockPreloadedStateJSON from "./mockPreloadedState.json";
import createStore from "../src/redux/createStore";
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from "@reach/router";

const source = createMemorySource("/");
const history = createHistory(source);

const withTracktakProvier = (story) => {
  return (
    <TracktakProvider store={createStore(mockPreloadedStateJSON)}>
      <LocationProvider history={history}>{story()}</LocationProvider>
    </TracktakProvider>
  );
};

export const decorators = [withTracktakProvier];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
