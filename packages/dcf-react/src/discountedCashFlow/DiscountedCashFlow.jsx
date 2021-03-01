import React from "react";
import { Box, useTheme } from "@material-ui/core";
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import CompanyOverviewStats from "../components/CompanyOverviewStats";
import ValueDrivingInputs from "../components/ValueDrivingInputs";
import OptionalInputs from "../components/OptionalInputs";
import CostOfCapitalResults from "../components/CostOfCapitalResults";
import BlackScholesResults from "../components/BlackScholesResults";
import DiscountedCashFlowSheet from "./DiscountedCashFlowSheet";
import IndustryAveragesResults from "../components/IndustryAveragesResults";
import PastFundamentals from "../components/PastFundamentals";

const DiscountedCashFlow = () => {
  const theme = useTheme();

  return (
    <>
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
            <CostOfCapitalResults />
          </SubSection>
          <SubSection>
            <BlackScholesResults />
          </SubSection>
        </Box>
      </Section>
      <Section>
        <DiscountedCashFlowSheet />
      </Section>
    </>
  );
};

export default DiscountedCashFlow;
