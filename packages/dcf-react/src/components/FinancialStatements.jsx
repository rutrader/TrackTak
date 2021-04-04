import { Typography } from "@material-ui/core";
import React from "react";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SubSection from "./SubSection";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashFlowStatement from "./CashFlowStatement";
import CompanyHeading from "./CompanyHeading";

const FinancialStatements = () => {
  return (
    <React.Fragment>
      <CompanyHeading />
      <Typography variant="h5" gutterBottom>
        Financial Statements
      </Typography>
      <SubSection>
        <IncomeStatement />
      </SubSection>
      <SubSection>
        <BalanceSheet />
      </SubSection>
      <SubSection>
        <CashFlowStatement />
      </SubSection>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(FinancialStatements);
