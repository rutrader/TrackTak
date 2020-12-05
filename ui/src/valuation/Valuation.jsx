import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getFundamentals } from "../redux/actions/fundamentalsActions";
import { setValue } from "../redux/actions/inputActions";
import {
  Box,
  Hidden,
  TextField,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import TTTable from "../components/TTTable";
import dayjs from "dayjs";
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
import calculateCostOfCapital from "../shared/calculateCostOfCapital";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumber from "../components/FormatRawNumber";
import SubscribeMailingList from "../shared/SubscribeMailingList";

const textFieldRootStyles = {
  flex: 1,
  marginTop: 4,
  marginBottom: 4,
  minWidth: "272px",
};

const ValueDrivingTextField = withStyles({
  root: {
    ...textFieldRootStyles,
  },
})(TextField);

const CostOfCapitalTextField = withStyles({
  root: {
    ...textFieldRootStyles,
  },
})(TextField);

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
  const economicData = useSelector((state) => state.economicData);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const industryAverages = useSelector((state) => state.industryAverages);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getFundamentals(params.ticker));
  }, [dispatch, params.ticker]);

  if (!fundamentals.data || !economicData.governmentBondTenYearLastClose)
    return null;

  const {
    General,
    Financials: { Income_Statement, Balance_Sheet },
    SharesStats,
  } = fundamentals.data;

  const riskFreeRate =
    economicData.governmentBondTenYearLastClose / percentModifier -
    equityRiskPremium.currentCountry.adjDefaultSpread;
  const valuePerOption = blackScholes(
    "call",
    fundamentals.price,
    input.averageStrikePrice,
    input.averageMaturityOfOptions,
    riskFreeRate,
    industryAverages.currentIndustry.standardDeviationInStockPrices
  );
  const costOfCapital = calculateCostOfCapital(
    fundamentals,
    input,
    SharesStats,
    equityRiskPremium,
    riskFreeRate,
    industryAverages.currentIndustry
  );
  const valueOfAllOptionsOutstanding =
    valuePerOption * input.numberOfOptionsOutstanding;

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
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToMillion
          value={fundamentals.incomeStatement.totalRevenue}
        />
      ) : null,
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "totalRevenue",
      ]),
    },
    {
      dataField: "Operating Income",
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToMillion
          value={fundamentals.incomeStatement.operatingIncome}
        />
      ) : null,
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "operatingIncome",
      ]),
    },
    {
      dataField: "Interest Expense",
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToMillion
          value={fundamentals.incomeStatement.interestExpense}
        />
      ) : null,
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "interestExpense",
      ]),
    },
    {
      dataField: "Book Value of Equity",
      ttm: (
        <FormatRawNumberToMillion
          value={fundamentals.balanceSheet.bookValueOfEquity}
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
          value={fundamentals.balanceSheet.bookValueOfDebt}
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
          value={fundamentals.balanceSheet.cashAndShortTermInvestments}
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
            fundamentals.balanceSheet.noncontrollingInterestInConsolidatedEntity
          }
        />
      ),
      ...mapFromStatementsToDateObject(Balance_Sheet.yearly, [
        "noncontrollingInterestInConsolidatedEntity",
      ]),
    },
    {
      dataField: "Minority Interests",
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToMillion
          value={fundamentals.incomeStatement.minorityInterest}
        />
      ) : null,
      ...mapFromStatementsToDateObject(Income_Statement.yearly, [
        "minorityInterest",
      ]),
    },
  ];

  const displayGap = theme.spacing(2);

  return (
    <>
      <Box sx={{ display: "flex", gap: theme.spacing(10) }}>
        <Box>
          <Typography variant="h4">{General.Name}</Typography>
          <Typography
            color="textSecondary"
            style={{ textTransform: "uppercase" }}
          >
            {General.Exchange}:{General.Code}
          </Typography>
          <Typography gutterBottom>
            {industryAverages.currentIndustry.industryName}
          </Typography>
          <Box sx={{ display: "flex", gap: displayGap }}>
            <Box>
              <Typography>
                <Box
                  component="span"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  <FormatRawNumber
                    value={fundamentals.price}
                    decimalScale={2}
                  />
                </Box>
                &nbsp;{fundamentals.valuationCurrencyCode}
              </Typography>
              <Typography>
                <Box
                  component="span"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  <FormatRawNumberToMillion
                    value={SharesStats.SharesOutstanding}
                    suffix="M"
                  />
                </Box>
                &nbsp;Shares Outstanding
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Box
                  component="span"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  <FormatRawNumberToPercent
                    value={equityRiskPremium.currentCountry.corporateTaxRate}
                  />
                </Box>
                &nbsp;Marginal Tax Rate
              </Typography>
              <Typography>
                <Box
                  component="span"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  <FormatRawNumberToPercent
                    value={
                      fundamentals.incomeStatement
                        .pastThreeYearsAverageEffectiveTaxRate
                    }
                  />
                </Box>
                &nbsp;Effective Tax Rate (Avg. past 3 yr)
              </Typography>
            </Box>
          </Box>
        </Box>
        <Hidden smDown>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: theme.typography.fontWeightBold }}
              className="landing-page-sign-up-today-text"
            >
              Join today to get 50% off for life when we launch premium.
            </Typography>
            <SubscribeMailingList />
          </Box>
        </Hidden>
      </Box>
      <Section>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5">Company Fundamentals</Typography>
          <Typography
            style={{
              marginLeft: theme.spacing(1),
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            ({fundamentals.valuationCurrencySymbol}:
            {fundamentals.valuationCurrencyCode})
          </Typography>
        </Box>
        <TTTable columns={companyFundamentalsColumns} data={rowData} />
      </Section>
      <Box sx={{ display: "flex", gridColumnGap: 20, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1 }}>
          <Section>
            <Typography variant="h5" gutterBottom>
              Value Driving Inputs
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: displayGap }}>
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
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: displayGap }}>
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
            <Typography gutterBottom>
              Value Per Option&nbsp;
              <Box
                component="span"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                <FormatRawNumberToCurrency
                  value={valuePerOption}
                  decimalScale={2}
                />
              </Box>
            </Typography>
            <Typography gutterBottom>
              Value of All Options Outstanding&nbsp;
              <Box
                component="span"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                <FormatRawNumberToMillion
                  value={valuePerOption * input.numberOfOptionsOutstanding}
                  suffix="M"
                  decimalScale={2}
                />
              </Box>
            </Typography>
          </Section>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Section>
            <Typography variant="h5" gutterBottom>
              Cost of Capital Inputs
            </Typography>
            <Box sx={{ display: "flex", gap: displayGap }}>
              <Box sx={{ mb: theme.spacing(1) }}>
                <Typography>
                  <Box
                    component="span"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    <FormatRawNumberToPercent
                      value={equityRiskPremium.currentCountry.equityRiskPremium}
                    />
                  </Box>
                  &nbsp;Country Equity Risk Premium
                </Typography>
                <Typography>
                  <Box
                    component="span"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    <FormatRawNumberToPercent
                      value={equityRiskPremium.matureMarketEquityRiskPremium}
                    />
                  </Box>
                  &nbsp;Mature Market Equity Risk Premium
                </Typography>
              </Box>
              <Box>
                <Typography>
                  <Box
                    component="span"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    <FormatRawNumber
                      decimalScale={2}
                      value={industryAverages.currentIndustry.unleveredBeta}
                    />
                  </Box>
                  &nbsp;Unlevered Beta
                </Typography>
                <Typography>
                  <Box
                    component="span"
                    sx={{ fontWeight: theme.typography.fontWeightBold }}
                  >
                    <FormatRawNumberToPercent
                      decimalScale={2}
                      value={riskFreeRate}
                    />
                  </Box>
                  &nbsp;Riskfree Rate
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" gutterBottom>
              Normal Debt
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: displayGap }}>
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: displayGap }}>
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: displayGap }}>
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
        <ValuationDCFSheet
          riskFreeRate={riskFreeRate}
          costOfCapital={costOfCapital}
          valueOfAllOptionsOutstanding={valueOfAllOptionsOutstanding}
        />
      </Section>
      <Section sx={{ display: "flex", marginTop: theme.spacing(2) }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontWeight: theme.typography.fontWeightBold }}
            className="landing-page-sign-up-today-text"
          >
            Want us to implement features you need?
          </Typography>
          <SubscribeMailingList subscribeText="Sign Up" />
        </Box>
      </Section>
    </>
  );
};

export default Valuation;
