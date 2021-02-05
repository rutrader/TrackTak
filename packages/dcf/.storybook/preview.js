import { Provider } from "react-redux";
import { createStore } from "../src/redux/store";
import mockStateJSON from "./mockState.json";

const preloadedState = mockStateJSON;

const withProvider = (story) => {
  return <Provider store={createStore(preloadedState)}>{story()}</Provider>;
};

export const decorators = [withProvider];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
