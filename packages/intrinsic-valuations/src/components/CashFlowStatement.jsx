import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import selectRecentCashFlowStatement from "../selectors/fundamentalSelectors/selectRecentCashFlowStatement";
import selectYearlyCashFlowStatements from "../selectors/fundamentalSelectors/selectYearlyCashFlowStatements";
import useGetFinancialStatementRowData from "../hooks/useGetFinancialStatementRowData";
import useFinancialStatementColumns from "../hooks/useFinancialStatementColumns";
import getSymbolFromCurrency from "currency-symbol-map";
import FinancialsTable from "./FinancialsTable";

const cashFlowParam = [
  { valueKey: "netIncome" },
  {
    valueKey: "depreciation",
    dataField: "Depreciation, depletion and amortization",
  },
  {
    valueKey: "changeToAccountReceivables",
    dataField: "Change in receivables",
    className: "indented-cell",
  },
  {
    valueKey: "changeReceivables",
    dataField: "Change in receivables",
    className: "indented-cell",
  },
  {
    valueKey: "changeToInventory",
    dataField: "Change in inventory",
    className: "indented-cell",
  },
  {
    valueKey: "changeToLiabilities",
    dataField: "Change in liabilities",
    className: "indented-cell",
  },
  {
    valueKey: "totalCashFromOperatingActivities",
    className: "bold-cell",
  },
  { valueKey: "investments" },
  {
    valueKey: "otherCashflowsFromInvestingActivities",
  },
  {
    valueKey: "totalCashflowsFromInvestingActivities",
    className: "bold-cell",
  },
  { valueKey: "salePurchaseOfStock", dataField: "Sale (purchase) of stock" },
  { valueKey: "netBorrowings" },
  { valueKey: "dividendsPaid" },
  {
    valueKey: "otherCashflowsFromFinancingActivities",
  },
  {
    valueKey: "totalCashFromFinancingActivities",
    className: "bold-cell",
  },
  { valueKey: "beginPeriodCashFlow", className: "indented-cell" },
  { valueKey: "endPeriodCashFlow", className: "indented-cell" },
  { valueKey: "changeInCash", className: "bold-cell" },
  { valueKey: "capitalExpenditures", className: "bold-cell" },
];

const CashFlowStatement = () => {
  const currencyCode = useSelector(
    (state) => state.fundamentals.balanceSheet.currencyCode,
  );
  const currencySymbol = getSymbolFromCurrency(currencyCode);
  const yearlyCashFlowStatements = useSelector(selectYearlyCashFlowStatements);
  const cashFlowStatement = useSelector(selectRecentCashFlowStatement);
  const data = useGetFinancialStatementRowData(
    cashFlowStatement,
    yearlyCashFlowStatements,
    true,
    cashFlowParam,
  );
  const columns = useFinancialStatementColumns(yearlyCashFlowStatements, true);

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6">Cash Flow Statement</Typography>
        <Typography>
          In mln ({currencyCode}:{currencySymbol})
        </Typography>
      </Box>
      <Box>
        <FinancialsTable columns={columns} data={data} />
      </Box>
    </React.Fragment>
  );
};

export default CashFlowStatement;
