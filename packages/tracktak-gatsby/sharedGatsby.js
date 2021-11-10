import React from "react";
import { TracktakProvider, createStore } from "@tracktak/intrinsic-valuations";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import theme from "./src/theme";
import { snackbarReducer } from "./src/redux/reducers/snackbarReducer";
import { ProvideAuth } from "./src/hooks/useAuth";
import TTCookieBanner from "./src/components/TTCookieBanner";
import { CssBaseline } from "@material-ui/core";

const store = createStore(undefined, {
  snackbar: snackbarReducer,
});

export const wrapRootElement = ({ element }) => {
  // Do not put components in this function, instead put them in layout/index.js
  // due to a gatsby/mui bug
  return (
    <TracktakProvider store={store} theme={theme}>
      <CssBaseline />
      <ProvideAuth>
        {element}
        <TTCookieBanner />
      </ProvideAuth>
    </TracktakProvider>
  );
};
