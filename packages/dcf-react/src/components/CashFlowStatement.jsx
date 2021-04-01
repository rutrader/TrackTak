import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import selectValuationCurrencyCode from "../selectors/fundamentalSelectors/selectValuationCurrencyCode";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import TTTable from "./TTTable";
import dayjs from "dayjs";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";
import selectRecentCashFlowStatement from "../selectors/fundamentalSelectors/selectRecentCashFlowStatement";
import selectYearlyCashFlowStatements from "../selectors/fundamentalSelectors/selectYearlyCashFlowStatements";
import useMapFinancialStatementRowData from "../hooks/useMapFinancialStatementRowData";

const CashFlowStatement = () => {
  const theme = useTheme();
  const valuationCurrencyCode = useSelector(selectValuationCurrencyCode);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const isInUS = useSelector(selectIsInUS);
  const yearlyCashFlowStatements = useSelector(selectYearlyCashFlowStatements);
  const cashFlowStatement = useSelector(selectRecentCashFlowStatement);
  const mapCashFlowStatementRowData = useMapFinancialStatementRowData(
    cashFlowStatement,
    yearlyCashFlowStatements,
    true,
  );

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
    isInUS
      ? {
          Header: "TTM",
          accessor: "ttm",
        }
      : {},
    ...Object.values(yearlyCashFlowStatements).map((statement) => {
      return {
        Header: dayjs(statement.date).format("MMM YY"),
        accessor: statement.date,
      };
    }),
  ];

  const data = mapCashFlowStatementRowData([
    { valueKey: "netIncome" },
    {
      valueKey: "depreciation",
      dataField: "Depreciation, depletion and amortization",
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
      valueKey: "changeToOperatingActivities",
      dataField: "Change in operating activities",
      className: "indented-cell",
    },
    {
      valueKey: "cashFlowsOtherOperating",
      dataField: "Cash flows from other operations",
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
    { valueKey: "salePurchaseOfStock" },
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
  ]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5">Cash Flow Statement</Typography>
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

export default CashFlowStatement;
