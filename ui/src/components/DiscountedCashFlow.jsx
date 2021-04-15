import React, { useEffect } from "react";
import {
  Box,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  BlackScholesResults,
  CompanyOverviewStats,
  CostOfCapitalResults,
  DiscountedCashFlowSheet,
  IndustryAveragesResults,
  OptionalInputs,
  FinancialsSummary,
  Section,
  SubSection,
  withFundamentalsLoaded,
  ValueDrivingInputs,
  useTicker,
} from "@tracktak/dcf-react";
import { Link as RouterLink } from "gatsby";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import { useLocation } from "@reach/router";
import SubscribeCover from "./SubscribeCover";
import useLocalStorageState from "use-local-storage-state";
import subscribePopupShownHook from "../hooks/subscribePopupShownHook";

const DiscountedCashFlow = () => {
  const [subscribePopupShown] = subscribePopupShownHook();
  const [rotateSnackbarShown, setRotateSnackbarShown] = useLocalStorageState(
    "rotateSnackbarShown",
  );
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const ticker = useTicker();
  const location = useLocation();

  useEffect(() => {
    if (!rotateSnackbarShown && isOnMobile) {
      setRotateSnackbarShown(true);

      dispatch(
        setMessage({
          message: "Rotate your device for best viewing",
        }),
      );
    }
  }, [dispatch, isOnMobile, rotateSnackbarShown, setRotateSnackbarShown]);

  return (
    <React.Fragment>
      <CompanyOverviewStats useDescriptionShowMore />
      <Section>
        <FinancialsSummary />
        <Box sx={{ mt: 1 }}>
          <Typography>
            See the&nbsp;
            <Link
              component={RouterLink}
              to={`/stock/${ticker}/financial-statements${location.search}`}
            >
              Financial Statements
            </Link>
            &nbsp;tab for the full financials.
          </Typography>
        </Box>
      </Section>
      <Section sx={{ display: "flex", gridColumnGap: 20, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <ValueDrivingInputs />
          </SubSection>
          <SubSection>
            <OptionalInputs />
          </SubSection>
        </Box>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <IndustryAveragesResults />
          </SubSection>
          <SubSection>
            <CostOfCapitalResults />
          </SubSection>
          <SubSection>
            <BlackScholesResults />
          </SubSection>
        </Box>
      </Section>
      <Section>
        <DiscountedCashFlowSheet
          SubscribeCover={SubscribeCover}
          loadingCells={!subscribePopupShown}
        />
      </Section>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(DiscountedCashFlow);
