import { TracktakProvider } from "../src";
import mockPreloadedStateJSON from "./mockPreloadedState.json";
import createStore from "../src/redux/createStore";

const withTracktakProvier = (story) => {
  return (
    <TracktakProvider store={createStore(mockPreloadedStateJSON)}>
      {story()}
    </TracktakProvider>
  );
};

export const decorators = [withTracktakProvier];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
