import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getFinancials } from "../redux/actions/financialsActions";
import { Box, TextField, Typography, withStyles } from "@material-ui/core";
import TTTable from "../components/TTTable";
import dayjs from "dayjs";
import FormatRawNumber from "../components/FormatRawNumber";
import ValuationDCFSheet from "./ValuationDCFSheet";

const Section = ({ ...props }) => <Box sx={{ mt: 3, mb: 1 }} {...props} />;
const ValueDrivingTextField = withStyles({
  root: {
    flex: 1,
    margin: 2,
    minWidth: "300px",
  },
})(TextField);

const mapFromArrayToDateObject = (arrayToLoop) => {
  return arrayToLoop.reduce((acc, curr, i) => {
    return {
      ...acc,
      [`date_${i}`]: <FormatRawNumber value={curr} />,
    };
  }, {});
};

const Valuation = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    data,
    currentTotalInterestBearingDebt,
    totalInterestBearingDebts,
    currentCashAndMarketableSecurities,
    cashAndMarketableSecurities,
  } = useSelector((state) => state.financials);

  useEffect(() => {
    dispatch(getFinancials(params.symbol));
  }, [dispatch, params.symbol]);

  if (!data) return null;

  const {
    price,
    timeSeries: { annualDilutedAverageShares },
    incomeStatementHistory: { incomeStatementHistory },
    balanceSheetHistory: { balanceSheetStatements },
    balanceSheetHistoryQuarterly: {
      balanceSheetStatements: balanceSheetStatementsQuarterly,
    },
    incomeStatementHistoryQuarterly: {
      incomeStatementHistory: incomeStatementHistoryQuarterly,
    },
  } = data;

  const companyFinancialsColumns = [
    {
      Header: "",
      accessor: "dataField",
    },
    {
      Header: "TTM",
      accessor: "ttm",
    },
  ].concat(
    incomeStatementHistory.map((statement, i) => ({
      Header: dayjs(statement.endDate.fmt).format("MMM YY"),
      accessor: `date_${i}`,
    }))
  );

  const getTTMValue = (valueKey) => {
    const { timeSeries } = data;
    const arrayValue = timeSeries[valueKey];
    const value = arrayValue[arrayValue.length - 1].reportedValue.raw;

    return <FormatRawNumber value={value} />;
  };

  const rowData = [
    {
      dataField: "Revenue",
      ttm: getTTMValue("trailingTotalRevenue"),
      ...mapFromArrayToDateObject(
        incomeStatementHistory.map((x) => x.totalRevenue.raw)
      ),
    },
    {
      dataField: "Operating Income",
      ttm: getTTMValue("trailingOperatingIncome"),
      ...mapFromArrayToDateObject(
        incomeStatementHistory.map((x) => x.operatingIncome.raw)
      ),
    },
    {
      dataField: "Interest Expense",
      ttm: getTTMValue("trailingInterestExpense"),
      ...mapFromArrayToDateObject(
        incomeStatementHistory.map((x) => x.operatingIncome.raw)
      ),
    },
    {
      dataField: "Book Value of Equity",
      ttm: (
        <FormatRawNumber
          value={balanceSheetStatementsQuarterly[0].totalStockholderEquity.raw}
        />
      ),
      ...mapFromArrayToDateObject(
        balanceSheetStatements.map((x) => x.totalStockholderEquity.raw)
      ),
    },
    {
      dataField: "Book Value of Debt",
      ttm: <FormatRawNumber value={currentTotalInterestBearingDebt} />,
      ...mapFromArrayToDateObject(totalInterestBearingDebts),
    },
    {
      dataField: "Cash & Marketable Securities",
      ttm: <FormatRawNumber value={currentCashAndMarketableSecurities} />,
      ...mapFromArrayToDateObject(cashAndMarketableSecurities),
    },
    {
      // TODO: Double check this value
      dataField: "Cross Holdings & Other Non-Operating Assets",
      ttm: (
        <FormatRawNumber
          value={balanceSheetStatementsQuarterly[0].otherAssets.raw}
        />
      ),
      ...mapFromArrayToDateObject(
        balanceSheetStatements.map((x) => x.otherAssets.raw)
      ),
    },
    {
      dataField: "Minority Interests",
      ttm: (
        <FormatRawNumber
          value={incomeStatementHistoryQuarterly[0].minorityInterests?.raw}
        />
      ),
      ...mapFromArrayToDateObject(
        incomeStatementHistory.map((x) => x.minorityInterests?.raw)
      ),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {price.longName}
          </Typography>
          <Typography style={{ textTransform: "uppercase" }}>
            {price.exchangeName}:{price.symbol}
          </Typography>
          <Typography>
            <Box component="span" fontWeight="bold">
              {price.regularMarketPrice.fmt}
            </Box>
            &nbsp;{price.currency}
          </Typography>
          <Typography>
            <Box component="span" fontWeight="bold">
              <FormatRawNumber
                value={
                  annualDilutedAverageShares[
                    annualDilutedAverageShares.length - 1
                  ].reportedValue.raw
                }
                decimalScale={0}
                suffix="M"
              />
            </Box>
            &nbsp;Shares Outstanding
          </Typography>
          <Section>
            <Typography variant="h5">Company Financials</Typography>
            <TTTable columns={companyFinancialsColumns} data={rowData} />
          </Section>
          <Section>
            <Typography variant="h5" gutterBottom>
              Value Driving Inputs
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ValueDrivingTextField label="CAGR in years 1-5" />
              <ValueDrivingTextField label="EBIT Target margin in year 10 (%)" />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ValueDrivingTextField label="Sales to capital ratio before year 5" />
              <ValueDrivingTextField label="Sales to capital ratio after year 5" />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ValueDrivingTextField label="Year of convergence" />
            </Box>
          </Section>
        </Box>
        <Box sx={{ flex: 1 }}>Cost Of Capital Sheet</Box>
      </Box>
      <Section>
        <Typography variant="h5" gutterBottom>
          Valuation
        </Typography>
        <ValuationDCFSheet />
      </Section>
    </>
  );
};

export default Valuation;
