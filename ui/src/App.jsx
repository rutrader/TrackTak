import { createGlobalStyle } from "styled-components";
import { Provider as RebassProvider } from "rebass";
import rebassTheme from "./rebassTheme";
import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import { useSelector } from "react-redux";
import { Box, CircularProgress, useTheme } from "@material-ui/core";
import LayoutFullScreen from "./layout/LayoutFullScreen";
import Layout from "./layout/Layout";
import LayoutHome from "./layout/LayoutHome";
import SyntheticRating from "./syntheticRating/SyntheticRating";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import { lazy, Suspense } from "react";
import Valuations from "./valuation/Valuations";
import IndustryAverages from "./industryAverages/IndustryAverages";
import Docs from "./documentation/Docs";

const LandingPage = lazy(() => import("./landingPage/LandingPage"));
const DiscountedCashFlow = lazy(() =>
  import("./discountedCashFlow/DiscountedCashFlow")
);
const Valuation = lazy(() => import("./valuation/Valuation"));

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

  return isLoading ? (
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
  ) : null;
};

export const layoutFullScreenPaths = [
  "/discounted-cash-flow/:ticker",
  "/synthetic-rating/:ticker",
  "/industry-averages/:ticker",
];
const layoutPaths = ["/valuations/:ticker", "/valuations", "/documentation"];

export const allLayoutPaths = [...layoutFullScreenPaths, layoutPaths];
export const allPaths = ["/", "/landingPage", ...allLayoutPaths];

function App() {
  return (
    <>
      <Spinner />
      <ConnectedRouter history={history}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path={[allPaths[1]]}>
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
                  <Route path={layoutFullScreenPaths[1]}>
                    <SyntheticRating />
                  </Route>
                  <Route path={layoutFullScreenPaths[2]}>
                    <IndustryAverages />
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
                  <Route path={layoutPaths[2]}>
                    <Docs />
                  </Route>
                </Switch>
              </Layout>
            </Route>
            <Route path={[allPaths[0]]}>
              <LayoutHome>
                <Switch>
                  <Route path={allPaths[0]}>
                    <Home />
                  </Route>
                </Switch>
              </LayoutHome>
            </Route>
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </>
  );
}

export default App;
