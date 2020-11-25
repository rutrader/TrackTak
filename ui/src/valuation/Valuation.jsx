import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getFundamentals } from "../redux/actions/fundamentalsActions";
import { setValue } from "../redux/actions/inputActions";
import { Box, TextField, Typography, withStyles } from "@material-ui/core";
import TTTable from "../components/TTTable";
import dayjs from "dayjs";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import Section from "../components/Section";
import ValuationDCFSheet from "./ValuationDCFSheet";
import blackScholes from "../shared/blackScholesModel";
import SubSection from "../components/SubSection";
import FormatInputToPercent from "../components/FormatInputToPercent";
import FormatInputToMillion from "../components/FormatInputToMillion";
import FormatInputToNumber from "../components/FormatInputToNumber";
import FormatInputToCurrency from "../components/FormatInputToCurrency";
import FormatInputToYear from "../components/FormatInputToYear";
import FormatRawNumberToPercent, {
  percentModifier,
} from "../components/FormatRawNumberToPercent";

const ValueDrivingTextField = withStyles({
  root: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
    minWidth: "300px",
  },
})(TextField);

const CostOfCapitalTextField = withStyles({
  root: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
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

const mockAdjustedDefaultSpread = 0;
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
  const fundamentals = useSelector((state) => state.fundamentals);
  const input = useSelector((state) => state.input);
  const governmentBonds = useSelector((state) => state.governmentBonds);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);

  useEffect(() => {
    dispatch(getFundamentals(params.ticker));
  }, [dispatch, params.ticker]);

  if (
    !fundamentals.data ||
    !governmentBonds.data ||
    !equityRiskPremium.countryData
  )
    return null;

  const {
    General,
    Financials: { Income_Statement, Balance_Sheet },
    SharesStats,
    Highlights: { MostRecentQuarter },
  } = fundamentals.data;

  const riskFreeRate =
    governmentBonds.data[0].Close / percentModifier - mockAdjustedDefaultSpread;

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

  const rowData = [
    {
      dataField: "Revenue",
      ttm: <FormatRawNumberToMillion value={fundamentals.ttm.totalRevenue} />,
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "totalRevenue",
      ]),
    },
    {
      dataField: "Operating Income",
      ttm: (
        <FormatRawNumberToMillion value={fundamentals.ttm.operatingIncome} />
      ),
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "operatingIncome",
      ]),
    },
    {
      dataField: "Interest Expense",
      ttm: (
        <FormatRawNumberToMillion value={fundamentals.ttm.interestExpense} />
      ),
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
        <FormatRawNumberToMillion value={fundamentals.currentBookValueOfDebt} />
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
      ttm: (
        <FormatRawNumberToMillion value={fundamentals.ttm.minorityInterest} />
      ),
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "minorityInterest",
      ]),
    },
  ];
  const valuePerOption = blackScholes(
    "call",
    fundamentals.currentPrice,
    input.averageStrikePrice,
    input.averageMaturity,
    riskFreeRate,
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
        <Box component="span" sx={{ fontWeight: "bold" }}>
          <FormatRawNumber value={fundamentals.currentPrice} />
        </Box>
        &nbsp;{General.CurrencyCode}
      </Typography>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          <FormatRawNumberToMillion
            value={SharesStats.SharesOutstanding}
            suffix="M"
          />
        </Box>
        &nbsp;Shares Outstanding
      </Typography>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          <FormatRawNumberToPercent
            value={equityRiskPremium.currentCountry.equityRiskPremium}
          />
        </Box>
        &nbsp;Country Equity Risk Premium
      </Typography>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          <FormatRawNumberToPercent
            value={equityRiskPremium.matureMarketEquityRiskPremium}
          />
        </Box>
        &nbsp;Mature Market Equity Risk Premium
      </Typography>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          <FormatRawNumberToPercent
            value={equityRiskPremium.currentCountry.corporateTaxRate}
          />
        </Box>
        &nbsp;Corporate Tax Rate
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
              <ValueDrivingTextField
                label="CAGR in Years 1-5"
                defaultValue={input.cagrYearOneToFive}
                onBlur={(value) => {
                  dispatch(setValue("cagrYearOneToFive", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToPercent,
                }}
              />
              <ValueDrivingTextField
                label="EBIT Target Margin in Year 10"
                defaultValue={input.ebitTargetMarginInYearTen}
                onBlur={(value) => {
                  dispatch(setValue("ebitTargetMarginInYearTen", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToPercent,
                }}
              />
              <ValueDrivingTextField
                label="Year of Convergence"
                defaultValue={input.yearOfConvergence}
                onBlur={(value) => {
                  dispatch(setValue("yearOfConvergence", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToYear,
                }}
              />
              <ValueDrivingTextField
                label="Sales to Capital Ratio"
                defaultValue={input.salesToCapitalRatio}
                onBlur={(value) => {
                  dispatch(setValue("salesToCapitalRatio", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToNumber,
                }}
              />
            </Box>
          </Section>
          <Section>
            <Typography variant="h5" gutterBottom>
              Employee Options Inputs
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ValueDrivingTextField
                label="Employee Options Oustanding"
                defaultValue={input.numberOfOptionsOutstanding}
                onBlur={(value) => {
                  dispatch(setValue("numberOfOptionsOutstanding", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToMillion,
                }}
              />
              <ValueDrivingTextField
                label="Average Strike Price"
                defaultValue={input.averageStrikePrice}
                onBlur={(value) => {
                  dispatch(setValue("averageStrikePrice", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToCurrency,
                }}
              />
              <ValueDrivingTextField
                label="Average Maturity"
                defaultValue={input.averageMaturityOfOptions}
                onBlur={(value) => {
                  dispatch(setValue("averageMaturityOfOptions", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToYear,
                }}
              />
            </Box>
          </Section>
          <Section>
            <Typography variant="h5" gutterBottom>
              Black Scholes Employee Options Valuation
            </Typography>
            <TypographyLabel>
              <Box component="span" sx={{ mr: 2, minWidth: "263px" }}>
                Value Per Option
              </Box>
              <FormatRawNumber
                prefix={General.CurrencySymbol}
                value={valuePerOption}
                decimalScale={2}
              />
            </TypographyLabel>
            <TypographyLabel>
              <Box component="span" sx={{ mr: 2, minWidth: "263px" }}>
                Value of All Options Outstanding
              </Box>
              <FormatRawNumberToMillion
                prefix={General.CurrencySymbol}
                value={valuePerOption * input.numberOfOptionsOutstanding}
                suffix="M"
                decimalScale={2}
              />
            </TypographyLabel>
          </Section>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Section>
            <Typography variant="h5" gutterBottom>
              Cost of Capital Inputs
            </Typography>
            <Typography variant="h6" gutterBottom>
              Normal Debt
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <CostOfCapitalTextField
                label="Average Maturity of Debt"
                defaultValue={input.averageMaturityOfDebt}
                onBlur={(value) => {
                  dispatch(setValue("averageMaturityOfDebt", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToYear,
                }}
              />
              <CostOfCapitalTextField
                label="Pre-tax Cost of Debt"
                defaultValue={input.pretaxCostOfDebt}
                onBlur={(value) => {
                  dispatch(setValue("pretaxCostOfDebt", value));
                }}
                InputProps={{
                  inputComponent: FormatInputToPercent,
                }}
              />
            </Box>
            <SubSection>
              <Typography variant="h6" gutterBottom>
                Convertible Debt
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <CostOfCapitalTextField
                  label="Book Value of Convertible Debt"
                  defaultValue={input.bookValueOfConvertibleDebt}
                  onBlur={(value) => {
                    dispatch(setValue("bookValueOfConvertibleDebt", value));
                  }}
                  InputProps={{
                    inputComponent: FormatInputToCurrency,
                  }}
                />
                <CostOfCapitalTextField
                  label="Interest Expense on Convertible Debt"
                  defaultValue={input.interestExpenseOnConvertibleDebt}
                  onBlur={(value) => {
                    dispatch(
                      setValue("interestExpenseOnConvertibleDebt", value)
                    );
                  }}
                  InputProps={{
                    inputComponent: FormatInputToCurrency,
                  }}
                />
                <CostOfCapitalTextField
                  label="Maturity of Convertible Debt"
                  defaultValue={input.maturityOfConvertibleDebt}
                  onBlur={(value) => {
                    dispatch(setValue("maturityOfConvertibleDebt", value));
                  }}
                  InputProps={{
                    inputComponent: FormatInputToYear,
                  }}
                />
              </Box>
            </SubSection>
            <SubSection>
              <Typography variant="h6" gutterBottom>
                Preferred Stock
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <CostOfCapitalTextField
                  label="Number of Preferred Shares"
                  defaultValue={input.numberOfPreferredShares}
                  onBlur={(value) => {
                    dispatch(setValue("numberOfPreferredShares", value));
                  }}
                  InputProps={{
                    inputComponent: FormatInputToMillion,
                  }}
                />
                <CostOfCapitalTextField
                  label="Market Price Per Share"
                  defaultValue={input.marketPricePerShare}
                  onBlur={(value) => {
                    dispatch(setValue("marketPricePerShare", value));
                  }}
                  InputProps={{
                    inputComponent: FormatInputToCurrency,
                  }}
                />
                <CostOfCapitalTextField
                  label="Annual Dividend Per Share"
                  defaultValue={input.annualDividendPerShare}
                  onBlur={(value) => {
                    dispatch(setValue("annualDividendPerShare", value));
                  }}
                  InputProps={{
                    inputComponent: FormatInputToCurrency,
                  }}
                />
              </Box>
            </SubSection>
          </Section>
        </Box>
      </Box>
      <Section>
        <Typography variant="h5" gutterBottom>
          Valuation
        </Typography>
        <ValuationDCFSheet riskFreeRate={riskFreeRate} />
      </Section>
    </>
  );
};

export default Valuation;
