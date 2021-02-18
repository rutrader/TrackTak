import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import theme from "./theme";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";

const Provider = ({ children, store }) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ReactReduxProvider store={store}>
          <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </ReactReduxProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default Provider;
