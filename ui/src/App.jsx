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
import selectPageIsLoading from "./selectors/pageSelectors/selectPageIsLoading";
import ContactUs from "./contactUs/ContactUs";
import AboutUs from "./aboutUs/AboutUs";

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
  const isLoading = useSelector(selectPageIsLoading);
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
  { url: "/discounted-cash-flow/:ticker", component: <DiscountedCashFlow /> },
  { url: "/synthetic-rating/:ticker", component: <SyntheticRating /> },
  { url: "/industry-averages/:ticker", component: <IndustryAverages /> },
];
const layoutPaths = [
  { url: "/valuations/:ticker", component: <Valuation /> },
  { url: "/valuations", component: <Valuations /> },
  { url: "/documentation", component: <Docs /> },
  { url: "/contact-us", component: <ContactUs /> },
  { url: "/about-us", component: <AboutUs /> },
];

export const allLayoutPaths = [...layoutFullScreenPaths, layoutPaths];
export const allPaths = [
  { url: "/", component: <Home /> },
  {
    url: "/landingPage",
    component: <LandingPage />,
  },
  ...allLayoutPaths,
];

function App() {
  return (
    <>
      <Spinner />
      <ConnectedRouter history={history}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path={[allPaths[1].url]}>
              <RebassProvider theme={rebassTheme}>
                <GlobalStyle />
                {allPaths[1].component}
              </RebassProvider>
            </Route>
            <Route path={layoutFullScreenPaths.map((x) => x.url)}>
              <LayoutFullScreen>
                <Switch>
                  {layoutFullScreenPaths.map(({ url, component }) => (
                    <Route path={url}>{component}</Route>
                  ))}
                </Switch>
              </LayoutFullScreen>
            </Route>
            <Route path={layoutPaths.map((x) => x.url)}>
              <Layout>
                <Switch>
                  {layoutPaths.map(({ url, component }) => (
                    <Route path={url}>{component}</Route>
                  ))}
                </Switch>
              </Layout>
            </Route>
            <Route path={[allPaths[0].url]}>
              <LayoutHome>
                <Switch>
                  <Route path={allPaths[0].url}>{allPaths[0].component}</Route>
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
