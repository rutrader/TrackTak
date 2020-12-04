import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import LayoutHome from "./layout/LayoutHome";
import Valuation from "./valuation/Valuation";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, useTheme } from "@material-ui/core";
import LayoutFullScreen from "./layout/LayoutFullScreen";
import { useEffect } from "react";
import { getEquityRiskPremiumCountries } from "./redux/actions/equityRiskPremiumActions";
import { getIndustryAverages } from "./redux/actions/industryAveragesActions";

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

const layoutFullScreenPaths = ["/valuation/:ticker"];

export const allLayoutPaths = layoutFullScreenPaths;

function App() {
  const dispatch = useDispatch();
  const equityRiskPremiumData = useSelector(
    (state) => state.equityRiskPremium.countryData
  );
  const industryAveragesData = useSelector(
    (state) => state.industryAverages.data
  );

  useEffect(() => {
    dispatch(getEquityRiskPremiumCountries());
    dispatch(getIndustryAverages());
  }, [dispatch]);

  if (!equityRiskPremiumData || !industryAveragesData) return null;

  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Switch>
          <Route path={layoutFullScreenPaths}>
            <LayoutFullScreen>
              <Switch>
                <Route path={layoutFullScreenPaths[0]}>
                  <Valuation />
                </Route>
              </Switch>
            </LayoutFullScreen>
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
