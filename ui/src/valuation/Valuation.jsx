import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getFundamentals } from "../redux/actions/fundamentalsActions";
import { setEmployeeOptionsValue } from "../redux/actions/employeeOptionsActions";
import { Box, TextField, Typography, withStyles } from "@material-ui/core";
import TTTable from "../components/TTTable";
import dayjs from "dayjs";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToMillion, {
  millionModifier,
} from "../components/FormatRawNumberToMillion";
import Section from "../components/Section";
import ValuationDCFSheet from "./ValuationDCFSheet";
import blackScholes from "../shared/blackScholesModel";

const ValueDrivingTextField = withStyles({
  root: {
    flex: 1,
    margin: 2,
    minWidth: "300px",
  },
})(TextField);

const TypographyLabel = withStyles({
  root: {
    display: "flex",
  },
})(({ ...props }) => (
  <Typography color="textSecondary" gutterBottom {...props} />
));

const mockRiskFreeRate = 0.02;
const mockStdDeviation = 0.4;

const mapFromStatementsToDateObject = (statementToLoop, valueKeys) => {
  return Object.values(statementToLoop).reduce((acc, curr) => {
    const sumOfValues = valueKeys.reduce(
      (acc, key) => (acc += parseFloat(curr[key], 10)),
      0
    );

    return {
      ...acc,
      [curr.date]: <FormatRawNumberToMillion value={sumOfValues} />,
    };
  }, {});
};

const Valuation = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { data, currentPrice } = useSelector((state) => state.fundamentals);
  const employeeOptions = useSelector((state) => state.employeeOptions);

  useEffect(() => {
    dispatch(getFundamentals(params.ticker));
  }, [dispatch, params.ticker]);

  if (!data) return null;

  const {
    General,
    Financials: { Income_Statement, Balance_Sheet },
    SharesStats,
    Highlights: { MostRecentQuarter },
  } = data;

  const companyFundamentalsColumns = [
    {
      Header: "",
      accessor: "dataField",
    },
    {
      Header: "TTM",
      accessor: "ttm",
    },
  ].concat(
    Object.values(Income_Statement.yearly).map((statement) => ({
      Header: dayjs(statement.date).format("MMM YY"),
      accessor: statement.date,
    }))
  );

  const getIncomeSheetTTMValue = (valueKey) => {
    const arrayValue = Object.values(Income_Statement.quarterly);
    const sumOfFirstFourValues = arrayValue.slice(0, 4).reduce((acc, curr) => {
      return (acc += parseFloat(curr[valueKey], 10));
    }, 0);

    return <FormatRawNumberToMillion value={sumOfFirstFourValues} />;
  };

  const rowData = [
    {
      dataField: "Revenue",
      ttm: getIncomeSheetTTMValue("totalRevenue"),
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "totalRevenue",
      ]),
    },
    {
      dataField: "Operating Income",
      ttm: getIncomeSheetTTMValue("operatingIncome"),
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "operatingIncome",
      ]),
    },
    {
      dataField: "Interest Expense",
      ttm: getIncomeSheetTTMValue("interestExpense"),
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "interestExpense",
      ]),
    },
    {
      dataField: "Book Value of Equity",
      ttm: (
        <FormatRawNumberToMillion
          value={
            Balance_Sheet.quarterly[MostRecentQuarter].totalStockholderEquity
          }
        />
      ),
      ...mapFromStatementsToDateObject(Balance_Sheet.yearly, [
        "totalStockholderEquity",
      ]),
    },
    {
      dataField: "Book Value of Debt",
      ttm: (
        <FormatRawNumberToMillion
          value={
            Balance_Sheet.quarterly[MostRecentQuarter].shortLongTermDebt +
            Balance_Sheet.quarterly[MostRecentQuarter].longTermDebt +
            Balance_Sheet.quarterly[MostRecentQuarter].capitalLeaseObligations
          }
        />
      ),
      ...mapFromStatementsToDateObject(Balance_Sheet.yearly, [
        "shortLongTermDebt",
        "longTermDebt",
        "capitalLeaseObligations",
      ]),
    },
    {
      dataField: "Cash & Marketable Securities",
      ttm: (
        <FormatRawNumberToMillion
          value={
            Balance_Sheet.quarterly[MostRecentQuarter]
              .cashAndShortTermInvestments
          }
        />
      ),
      ...mapFromStatementsToDateObject(Balance_Sheet.yearly, [
        "cashAndShortTermInvestments",
      ]),
    },
    {
      dataField: "Cross Holdings & Other Non-Operating Assets",
      ttm: (
        <FormatRawNumberToMillion
          value={
            Balance_Sheet.quarterly[MostRecentQuarter]
              .noncontrollingInterestInConsolidatedEntity
          }
        />
      ),
      ...mapFromStatementsToDateObject(Balance_Sheet.yearly, [
        "noncontrollingInterestInConsolidatedEntity",
      ]),
    },
    {
      dataField: "Minority Interests",
      ttm: getIncomeSheetTTMValue("minorityInterest"),
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "minorityInterest",
      ]),
    },
  ];
  const valuePerOption = blackScholes(
    "call",
    currentPrice,
    employeeOptions.averageStrikePrice,
    employeeOptions.averageMaturity,
    mockRiskFreeRate,
    mockStdDeviation
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {General.Name}
      </Typography>
      <Typography style={{ textTransform: "uppercase" }}>
        {General.Exchange}:{General.Code}
      </Typography>
      <Typography>
        <Box component="span" fontWeight="bold">
          <FormatRawNumber value={currentPrice} />
        </Box>
        &nbsp;{General.CurrencyCode}
      </Typography>
      <Typography>
        <Box component="span" fontWeight="bold">
          <FormatRawNumberToMillion
            value={SharesStats.SharesOutstanding}
            suffix="M"
          />
        </Box>
        &nbsp;Shares Outstanding
      </Typography>
      <Section>
        <Typography variant="h5">Company Fundamentals</Typography>
        <TTTable columns={companyFundamentalsColumns} data={rowData} />
      </Section>
      <Box sx={{ display: "flex", gap: 20 }}>
        <Box sx={{ flex: 1 }}>
          <Section>
            <Typography variant="h5" gutterBottom>
              Value Driving Inputs
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ValueDrivingTextField label="CAGR in Years 1-5" />
              <ValueDrivingTextField label="EBIT Target Margin in Year 10 (%)" />
              <ValueDrivingTextField label="Year of Convergence" />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ValueDrivingTextField label="Sales to Capital Ratio Before Year 5" />
              <ValueDrivingTextField label="Sales to Capital Ratio After Year 5" />
            </Box>
          </Section>
          <Section>
            <Typography variant="h5" gutterBottom>
              Employee Options Inputs
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ValueDrivingTextField
                label="Employee Options Oustanding (in M)"
                type="number"
                defaultValue={employeeOptions.numberOfOptionsOutstanding}
                onBlur={(e) => {
                  dispatch(
                    setEmployeeOptionsValue(
                      "numberOfOptionsOutstanding",
                      parseFloat(e.currentTarget.value, 10) * millionModifier
                    )
                  );
                }}
              />
              <ValueDrivingTextField
                label="Average Strike Price"
                type="number"
                defaultValue={employeeOptions.averageStrikePrice}
                onBlur={(e) => {
                  dispatch(
                    setEmployeeOptionsValue(
                      "averageStrikePrice",
                      parseFloat(e.currentTarget.value, 10)
                    )
                  );
                }}
              />
              <ValueDrivingTextField
                label="Average Maturity (in Years)"
                type="number"
                defaultValue={employeeOptions.averageMaturity}
                onBlur={(e) => {
                  dispatch(
                    setEmployeeOptionsValue(
                      "averageMaturity",
                      parseFloat(e.currentTarget.value, 10)
                    )
                  );
                }}
              />
            </Box>
          </Section>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Section>
            <Typography variant="h5" gutterBottom>
              Cost of Capital
            </Typography>
          </Section>
          <Section>
            <Typography variant="h5" gutterBottom>
              Black Scholes Employee Options Valuation
            </Typography>
            <TypographyLabel>
              <Box sx={{ mr: 2, minWidth: "263px" }}>Value Per Option</Box>
              <FormatRawNumber
                prefix={General.CurrencySymbol}
                value={valuePerOption}
                decimalScale={2}
              />
            </TypographyLabel>
            <TypographyLabel>
              <Box sx={{ mr: 2, minWidth: "263px" }}>
                Value of All Options Outstanding
              </Box>
              <FormatRawNumberToMillion
                prefix={General.CurrencySymbol}
                value={
                  valuePerOption * employeeOptions.numberOfOptionsOutstanding
                }
                suffix="M"
                decimalScale={2}
              />
            </TypographyLabel>
          </Section>
        </Box>
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
