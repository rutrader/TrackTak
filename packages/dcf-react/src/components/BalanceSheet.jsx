import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import selectValuationCurrencyCode from "../selectors/fundamentalSelectors/selectValuationCurrencyCode";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import TTTable from "./TTTable";
import dayjs from "dayjs";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectYearlyBalanceSheets from "../selectors/fundamentalSelectors/selectYearlyBalanceSheets";
import useMapFinancialStatementRowData from "../hooks/useMapFinancialStatementRowData";

const BalanceSheet = () => {
  const theme = useTheme();
  const valuationCurrencyCode = useSelector(selectValuationCurrencyCode);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const isInUS = useSelector(selectIsInUS);
  const yearlyBalanceSheets = useSelector(selectYearlyBalanceSheets);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const mapBalanceSheetRowData = useMapFinancialStatementRowData(
    balanceSheet,
    yearlyBalanceSheets,
  );

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
    isInUS
      ? {
          Header: "Latest",
          accessor: "latest",
        }
      : {},
    ...Object.values(yearlyBalanceSheets).map((statement) => {
      return {
        Header: dayjs(statement.date).format("MMM YY"),
        accessor: statement.date,
      };
    }),
  ];

  const data = mapBalanceSheetRowData([
    { valueKey: "cash", className: "indented-cell" },
    { valueKey: "shortTermInvestments", className: "indented-cell" },
    { valueKey: "cashAndShortTermInvestments" },
    { valueKey: "netReceivables", dataField: "Receivables" },
    { valueKey: "inventory" },
    { valueKey: "otherCurrentAssets" },
    { valueKey: "totalCurrentAssets", className: "bold-cell" },
    { valueKey: "longTermInvestments" },
    { valueKey: "propertyPlantAndEquipmentGross" },
    { valueKey: "accumulatedDepreciation" },
    { valueKey: "propertyPlantEquipment" },
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
    { valueKey: "shortTermDebt" },
    { valueKey: "otherCurrentLiab", dataField: "Other current liabilities" },
    { valueKey: "totalCurrentLiabilities", className: "bold-cell" },
    { valueKey: "longTermDebtTotal", className: "indented-cell" },
    { valueKey: "capitalLeaseObligations", className: "indented-cell" },
    { valueKey: "longTermDebtAndCapitalLeases" },
    { valueKey: "deferredLongTermLiab", className: "indented-cell" },
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
    { valueKey: "commonStock", className: "indented-cell" },
    { valueKey: "retainedEarningsTotalEquity", className: "indented-cell" },
    {
      valueKey: "accumulatedOtherComprehensiveIncome",
      className: "indented-cell",
    },
    { valueKey: "totalStockholderEquity", className: "bold-cell" },
  ]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5">Balance Sheet</Typography>
        <Typography
          style={{
            marginLeft: theme.spacing(1),
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          ({valuationCurrencySymbol}:{valuationCurrencyCode})
        </Typography>
      </Box>
      <Box>
        <TTTable columns={columns} data={data} />
      </Box>
    </>
  );
};

export default BalanceSheet;
