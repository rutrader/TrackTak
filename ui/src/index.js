import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import store from "./redux/store";
import minMax from "dayjs/plugin/minMax";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";

dayjs.extend(minMax);
dayjs.extend(advancedFormat);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
