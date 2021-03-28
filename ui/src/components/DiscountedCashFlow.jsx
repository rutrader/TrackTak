import React, { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import {
  BlackScholesResults,
  CompanyOverviewStats,
  CostOfCapitalResults,
  DiscountedCashFlowSheet,
  IndustryAveragesResults,
  OptionalInputs,
  PastFundamentals,
  Section,
  SubSection,
  withFundamentalsLoaded,
  ValueDrivingInputs,
} from "@tracktak/dcf-react";
import { Link } from "gatsby";
import SubscribePopup from "./SubscribePopup";
import { setItem, getItem } from "../shared/guardedLocalStorage";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";

const DiscountedCashFlow = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const snackbarShown = getItem("rotateSnackbarShown");
  const dispatch = useDispatch();

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
        <PastFundamentals />
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
