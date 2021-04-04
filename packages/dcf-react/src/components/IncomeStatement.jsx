import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import FinancialsTable from "./FinancialsTable";
import selectYearlyIncomeStatements from "../selectors/fundamentalSelectors/selectYearlyIncomeStatements";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import useMapFinancialStatementRowData from "../hooks/useMapFinancialStatementRowData";
import useFinancialStatementColumns from "../hooks/useFinancialStatementColumns";
import getSymbolFromCurrency from "currency-symbol-map";

const IncomeStatement = () => {
  const yearlyIncomeStatements = useSelector(selectYearlyIncomeStatements);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const currencyCode = useSelector(
    (state) => state.fundamentals.incomeStatement.currencyCode,
  );
  const currencySymbol = getSymbolFromCurrency(currencyCode);
  const mapIncomeStatementRowData = useMapFinancialStatementRowData(
    incomeStatement,
    yearlyIncomeStatements,
    true,
  );
  const columns = useFinancialStatementColumns(yearlyIncomeStatements, true);
  const data = mapIncomeStatementRowData([
    {
      valueKey: "totalRevenue",
      dataField: "Revenue",
      className: "bold-cell",
    },
    {
      valueKey: "costOfRevenue",
      className: "indented-cell",
    },
    { valueKey: "grossProfit", className: "bold-cell" },
    {
      valueKey: "grossMargin",
      ValueFormatter: FormatRawNumberToPercent,
    },
    { valueKey: "" },
    {
      valueKey: "sellingGeneralAdministrative",
      dataField: "General and administrative",
      className: "indented-cell",
    },
    {
      valueKey: "sellingAndMarketingExpenses",
      className: "indented-cell",
    },
    {
      valueKey: "researchDevelopment",
      className: "indented-cell",
    },
    {
      valueKey: "effectOfAccountingCharges",
      className: "indented-cell",
    },
    {
      valueKey: "totalOperatingExpenses",
      className: "bold-cell",
    },
    { valueKey: "operatingIncome", className: "bold-cell" },
    {
      valueKey: "operatingMargin",
      ValueFormatter: FormatRawNumberToPercent,
    },
    { valueKey: "" },
    {
      valueKey: "interestIncome",
      className: "indented-cell",
    },
    {
      valueKey: "interestExpense",
      className: "indented-cell",
    },
    { valueKey: "netInterestIncome" },
    {
      valueKey: "totalOtherIncomeExpenseNet",
      className: "indented-cell",
      dataField: "Total other income (expense)",
    },
    { valueKey: "incomeBeforeTax", className: "bold-cell" },
    { valueKey: "" },
    {
      valueKey: "incomeTaxExpense",
      className: "indented-cell",
    },
    {
      valueKey: "effectiveTaxRate",
      ValueFormatter: FormatRawNumberToPercent,
      className: "indented-cell",
    },
    {
      valueKey: "discontinuedOperations",
      className: "indented-cell",
    },
    {
      valueKey: "minorityInterest",
      className: "indented-cell",
    },
    {
      valueKey: "netIncomeFromContinuingOps",
      className: "indented-cell",
      dataField: "Net income (continuing ops.)",
    },
    {
      valueKey: "netIncome",
      className: "bold-cell",
    },
    {
      valueKey: "preferredStockAndOtherAdjustments",
      className: "indented-cell",
    },
    {
      valueKey: "netIncomeApplicableToCommonShares",
      dataField: "Net income (common shares)",
    },
    {
      valueKey: "netMargin",
      ValueFormatter: FormatRawNumberToPercent,
    },
    { valueKey: "" },
    { valueKey: "ebit", dataField: "EBIT", className: "bold-cell" },
    {
      valueKey: "depreciationAndAmortization",
      className: "indented-cell",
    },
    {
      valueKey: "nonRecurring",
      className: "indented-cell",
    },
    {
      valueKey: "otherItems",
      className: "indented-cell",
    },
    { valueKey: "ebitda", dataField: "EBITDA", className: "bold-cell" },
  ]);

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6">Income Statement</Typography>
        <Typography>
          In mln ({currencyCode}:{currencySymbol})
        </Typography>
      </Box>
      <FinancialsTable columns={columns} data={data} />
    </React.Fragment>
  );
};

export default IncomeStatement;
