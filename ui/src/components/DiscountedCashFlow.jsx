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
import SubscribePopup from "./SubscribePopup";
import { setItem, getItem } from "../shared/guardedLocalStorage";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import { useLocation } from "@reach/router";

const DiscountedCashFlow = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const snackbarShown = getItem("rotateSnackbarShown");
  const dispatch = useDispatch();
  const ticker = useTicker();
  const location = useLocation();

  useEffect(() => {
    if (!snackbarShown && isOnMobile) {
      setItem("rotateSnackbarShown", true);

      dispatch(
        setMessage({
          message: "Rotate your device for best viewing",
        }),
      );
    }
  }, [dispatch, isOnMobile, snackbarShown]);

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
            <CostOfCapitalResults
              SyntheticCreditRatingLink={({
                ticker,
                searchParams,
                ...props
              }) => {
                return (
                  <Link
                    component={RouterLink}
                    to={`/stock/${ticker}/synthetic-credit-rating${searchParams}`}
                    {...props}
                  />
                );
              }}
            />
          </SubSection>
          <SubSection>
            <BlackScholesResults />
          </SubSection>
        </Box>
      </Section>
      <Section>
        <DiscountedCashFlowSheet SubscribePopup={<SubscribePopup />} />
      </Section>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(DiscountedCashFlow);
