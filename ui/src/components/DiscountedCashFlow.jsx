import React from "react";
import { Box, useTheme } from "@material-ui/core";
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

const DiscountedCashFlow = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: theme.spacing(10) }}>
        <CompanyOverviewStats />
      </Box>
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
