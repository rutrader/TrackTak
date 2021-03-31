import { Box, Typography } from "@material-ui/core";
import React from "react";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SubSection from "./SubSection";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashFlowStatement from "./CashFlowStatement";

const FinancialStatements = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Financial Statements
      </Typography>
      <SubSection>
        <IncomeStatement />
      </SubSection>
      <Box sx={{ mt: 2 }}>
        <Typography paragrah>
          Balance Sheet &amp; Cash Flow Statement coming this week.
        </Typography>
      </Box>
      {/* <SubSection>
        <BalanceSheet />
      </SubSection>
      <SubSection>
        <CashFlowStatement />
      </SubSection> */}
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(FinancialStatements);
