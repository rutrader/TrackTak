import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectYearlyBalanceSheets from "../selectors/fundamentalSelectors/selectYearlyBalanceSheets";
import useMapFinancialStatementRowData from "../hooks/useMapFinancialStatementRowData";
import useFinancialStatementColumns from "../hooks/useFinancialStatementColumns";
import FinancialsTable from "./FinancialsTable";
import getSymbolFromCurrency from "currency-symbol-map";

const BalanceSheet = () => {
  const currencyCode = useSelector(
    (state) => state.fundamentals.balanceSheet.currencyCode,
  );
  const currencySymbol = getSymbolFromCurrency(currencyCode);
  const yearlyBalanceSheets = useSelector(selectYearlyBalanceSheets);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const mapBalanceSheetRowData = useMapFinancialStatementRowData(
    balanceSheet,
    yearlyBalanceSheets,
  );
  const columns = useFinancialStatementColumns(yearlyBalanceSheets);
  const data = mapBalanceSheetRowData([
    { valueKey: "cash", className: "indented-cell" },
    { valueKey: "shortTermInvestments", className: "indented-cell" },
    { valueKey: "cashAndShortTermInvestments" },
    { valueKey: "netReceivables", dataField: "Net receivables" },
    { valueKey: "inventory" },
    { valueKey: "otherCurrentAssets" },
    { valueKey: "totalCurrentAssets", className: "bold-cell" },
    { valueKey: "longTermInvestments" },
    {
      valueKey: "propertyPlantEquipment",
      dataField: "Property, plant and equipment",
    },
    { valueKey: "intangibleAssets" },
    { valueKey: "goodWill" },
    { valueKey: "otherAssets" },
    {
      valueKey: "nonCurrentAssetsTotal",
      dataField: "Total long term assets",
      className: "bold-cell",
    },
    { valueKey: "totalAssets", className: "bold-cell" },
    { valueKey: "accountsPayable" },
    { valueKey: "shortLongTermDebt" },
    { valueKey: "otherCurrentLiab", dataField: "Other current liabilities" },
    { valueKey: "totalCurrentLiabilities", className: "bold-cell" },
    { valueKey: "longTermDebt", className: "indented-cell" },
    { valueKey: "capitalLeaseObligations", className: "indented-cell" },
    { valueKey: "longTermDebtAndCapitalLeases" },
    { valueKey: "deferredLongTermLiab" },
    {
      valueKey: "nonCurrentLiabilitiesOther",
      dataField: "Other long term liabilities",
    },
    {
      valueKey: "nonCurrentLiabilitiesTotal",
      dataField: "Total long term liabilities",
      className: "bold-cell",
    },
    {
      valueKey: "totalLiab",
      dataField: "Total liabilities",
      className: "bold-cell",
    },
    { valueKey: "commonStock" },
    {
      valueKey: "preferredStockTotalEquity",
    },
    {
      valueKey: "retainedEarnings",
      dataField: "Retained earnings",
    },
    {
      valueKey: "accumulatedOtherComprehensiveIncome",
    },
    {
      valueKey: "additionalPaidInCapital",
    },
    {
      valueKey: "treasuryStock",
    },
    {
      valueKey: "capitalSurpluse",
    },
    {
      valueKey: "otherStockholderEquity",
    },
    { valueKey: "totalStockholderEquity", className: "bold-cell" },
    {
      valueKey: "minorityInterest",
      className: "indented-cell",
    },
    { valueKey: "totalEquity", className: "bold-cell" },
  ]);

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6">Balance Sheet</Typography>
        <Typography>
          In mln ({currencyCode}:{currencySymbol})
        </Typography>
      </Box>
      <FinancialsTable columns={columns} data={data} />
    </React.Fragment>
  );
};

export default BalanceSheet;
