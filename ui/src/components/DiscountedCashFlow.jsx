import React, { useEffect } from "react";
import {
  Box,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  CompanyOverviewStats,
  CostOfCapitalResults,
  DiscountedCashFlowSheet,
  IndustryAveragesResults,
  FinancialsSummary,
  Section,
  SubSection,
  withFundamentalsLoaded,
  useTicker,
} from "@tracktak/intrinsic-valuations";
import { Link as RouterLink } from "gatsby";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import { useLocation } from "@reach/router";
import SubscribeCover from "./SubscribeCover";
import useLocalStorageState from "use-local-storage-state";

const DiscountedCashFlow = () => {
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
        <SubSection>
          <IndustryAveragesResults />
        </SubSection>
        <SubSection>
          <CostOfCapitalResults />
        </SubSection>
      </Section>
      <Section>
        <DiscountedCashFlowSheet SubscribeCover={SubscribeCover} />
      </Section>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(DiscountedCashFlow);
