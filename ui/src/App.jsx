import { createGlobalStyle } from "styled-components";
import LandingPage from "./landingPage/LandingPage";
import { Provider as RebassProvider } from "rebass";
import rebassTheme from "./rebassTheme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import { useSelector } from "react-redux";
import { Box, CircularProgress, useTheme } from "@material-ui/core";
import LayoutFullScreen from "./layout/LayoutFullScreen";
import Layout from "./layout/Layout";
import DiscountedCashFlow from "./discountedCashFlow/DiscountedCashFlow";
import Valuation from "./valuation/Valuation";
import Valuations from "./valuation/Valuations";
import LayoutHome from "./layout/LayoutHome";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100%; height: 100%; }
  #root { height: inherit; > div { height: 100%; } }
  html { height: 100%; }
  a { color: inherit; text-decoration: none; }
  ul { list-style: none; margin: 0; padding: 0; }
  li { list-style: none }
  button { border: 0; padding: 0; font: inherit; outline: none; cursor: pointer; }
  svg { fill: #4A4A4A; }
  @media only screen and (max-width: 600px) {
    .landing-page-title {
      font-size: 25px;
    }
  }
  @media only screen and (max-width: 900px) {
    .landing-page-background-purple {
      display: none;
    }
    .landing-page-sign-up-today-text {
      color: #292929;
    }
    .landing-page-email-input {
      padding-left: 10px;
      padding-right: 10px;
    }
    .landing-page-email-icon {
      display: none;
    }
  }
`;

const Spinner = () => {
  const isLoading = useSelector((state) => state.page.isLoading);
  const theme = useTheme();

  return (
    isLoading && (
      <Box
        sx={{
          position: "fixed",
          backgroundColor: theme.palette.common.white,
          zIndex: theme.zIndex.modal,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          top: 0,
          opacity: 0.6,
        }}
      >
        <CircularProgress />
      </Box>
    )
  );
};

const layoutFullScreenPaths = ["/discounted-cash-flow/:ticker"];
const layoutPaths = ["/valuations/:id", "/valuations"];

export const allLayoutPaths = [...layoutFullScreenPaths, layoutPaths];

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Switch>
          <Route path={["/landingPage"]}>
            <RebassProvider theme={rebassTheme}>
              <GlobalStyle />
              <LandingPage />
            </RebassProvider>
          </Route>
          <Route path={layoutFullScreenPaths}>
            <LayoutFullScreen>
              <Switch>
                <Route path={layoutFullScreenPaths[0]}>
                  <DiscountedCashFlow />
                </Route>
              </Switch>
            </LayoutFullScreen>
          </Route>
          <Route path={layoutPaths}>
            <Layout>
              <Switch>
                <Route path={layoutPaths[0]}>
                  <Valuation />
                </Route>
                <Route path={layoutPaths[1]}>
                  <Valuations />
                </Route>
              </Switch>
            </Layout>
          </Route>
          <Route path={["/"]}>
            <LayoutHome>
              <Switch>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </LayoutHome>
          </Route>
        </Switch>
        {/* <Route path={allLayoutPaths}>
          <TTTabs />
        </Route> */}
      </BrowserRouter>
    </>
  );
}

export default App;
