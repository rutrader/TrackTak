import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { getFundamentals } from "../redux/actions/fundamentalsActions";
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
import SubscribeMailingList from "../components/SubscribeMailingList";
import parseInputQueryParams from "../shared/parseInputQueryParams";
import setInputQueryParams from "../shared/setInputQueryParams";

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
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const fundamentals = useSelector((state) => state.fundamentals);
  const economicData = useSelector((state) => state.economicData);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const industryAverages = useSelector((state) => state.industryAverages);
  const theme = useTheme();
  const inputQueryParams = parseInputQueryParams(location);
  const queryParams = new URLSearchParams(location.search);

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
    inputQueryParams.averageStrikePrice,
    inputQueryParams.averageMaturityOfOptions,
    riskFreeRate,
    industryAverages.currentIndustry.standardDeviationInStockPrices
  );
  const costOfCapital = calculateCostOfCapital(
    fundamentals,
    inputQueryParams,
    SharesStats,
    equityRiskPremium,
    riskFreeRate,
    industryAverages.currentIndustry
  );
  const valueOfAllOptionsOutstanding =
    valuePerOption * inputQueryParams.numberOfOptionsOutstanding;

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
          <Box sx={{ mt: "auto" }}>
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
                defaultValue={inputQueryParams.cagrYearOneToFive}
                onBlur={(value) => {
                  setInputQueryParams(queryParams, "cagrYearOneToFive", value);
                  history.push({
                    search: queryParams.toString(),
                  });
                }}
                InputProps={{
                  inputComponent: FormatInputToPercent,
                }}
              />
              <ValueDrivingTextField
                label="EBIT Target Margin in Year 10"
                defaultValue={inputQueryParams.ebitTargetMarginInYearTen}
                onBlur={(value) => {
                  setInputQueryParams(
                    queryParams,
                    "ebitTargetMarginInYearTen",
                    value
                  );
                  history.push({
                    search: queryParams.toString(),
                  });
                }}
                InputProps={{
                  inputComponent: FormatInputToPercent,
                }}
              />
              <ValueDrivingTextField
                label="Year of Convergence"
                defaultValue={inputQueryParams.yearOfConvergence}
                onBlur={(value) => {
                  setInputQueryParams(queryParams, "yearOfConvergence", value);
                  history.push({
                    search: queryParams.toString(),
                  });
                }}
                InputProps={{
                  inputComponent: FormatInputToYear,
                }}
              />
              <ValueDrivingTextField
                label="Sales to Capital Ratio"
                defaultValue={inputQueryParams.salesToCapitalRatio}
                onBlur={(value) => {
                  setInputQueryParams(
                    queryParams,
                    "salesToCapitalRatio",
                    value
                  );
                  history.push({
                    search: queryParams.toString(),
                  });
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
                defaultValue={inputQueryParams.numberOfOptionsOutstanding}
                onBlur={(value) => {
                  setInputQueryParams(
                    queryParams,
                    "numberOfOptionsOutstanding",
                    value
                  );
                  history.push({
                    search: queryParams.toString(),
                  });
                }}
                InputProps={{
                  inputComponent: FormatInputToMillion,
                }}
              />
              <ValueDrivingTextField
                label="Average Strike Price"
                defaultValue={inputQueryParams.averageStrikePrice}
                onBlur={(value) => {
                  setInputQueryParams(queryParams, "averageStrikePrice", value);
                  history.push({
                    search: queryParams.toString(),
                  });
                }}
                InputProps={{
                  inputComponent: FormatInputToCurrency,
                }}
              />
              <ValueDrivingTextField
                label="Average Maturity"
                defaultValue={inputQueryParams.averageMaturityOfOptions}
                onBlur={(value) => {
                  setInputQueryParams(
                    queryParams,
                    "averageMaturityOfOptions",
                    value
                  );
                  history.push({
                    search: queryParams.toString(),
                  });
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
                  value={
                    valuePerOption * inputQueryParams.numberOfOptionsOutstanding
                  }
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
                defaultValue={inputQueryParams.averageMaturityOfDebt}
                onBlur={(value) => {
                  setInputQueryParams(
                    queryParams,
                    "averageMaturityOfDebt",
                    value
                  );
                  history.push({
                    search: queryParams.toString(),
                  });
                }}
                InputProps={{
                  inputComponent: FormatInputToYear,
                }}
              />
              <CostOfCapitalTextField
                label="Pre-tax Cost of Debt"
                defaultValue={inputQueryParams.pretaxCostOfDebt}
                onBlur={(value) => {
                  setInputQueryParams(queryParams, "pretaxCostOfDebt", value);
                  history.push({
                    search: queryParams.toString(),
                  });
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
                  defaultValue={inputQueryParams.bookValueOfConvertibleDebt}
                  onBlur={(value) => {
                    setInputQueryParams(
                      queryParams,
                      "bookValueOfConvertibleDebt",
                      value
                    );
                    history.push({
                      search: queryParams.toString(),
                    });
                  }}
                  InputProps={{
                    inputComponent: FormatInputToCurrency,
                  }}
                />
                <CostOfCapitalTextField
                  label="Interest Expense on Convertible Debt"
                  defaultValue={
                    inputQueryParams.interestExpenseOnConvertibleDebt
                  }
                  onBlur={(value) => {
                    setInputQueryParams(
                      queryParams,
                      "interestExpenseOnConvertibleDebt",
                      value
                    );
                    history.push({
                      search: queryParams.toString(),
                    });
                  }}
                  InputProps={{
                    inputComponent: FormatInputToCurrency,
                  }}
                />
                <CostOfCapitalTextField
                  label="Maturity of Convertible Debt"
                  defaultValue={inputQueryParams.maturityOfConvertibleDebt}
                  onBlur={(value) => {
                    setInputQueryParams(
                      queryParams,
                      "maturityOfConvertibleDebt",
                      value
                    );
                    history.push({
                      search: queryParams.toString(),
                    });
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
                  defaultValue={inputQueryParams.numberOfPreferredShares}
                  onBlur={(value) => {
                    setInputQueryParams(
                      queryParams,
                      "numberOfPreferredShares",
                      value
                    );
                    history.push({
                      search: queryParams.toString(),
                    });
                  }}
                  InputProps={{
                    inputComponent: FormatInputToMillion,
                  }}
                />
                <CostOfCapitalTextField
                  label="Market Price Per Share"
                  defaultValue={inputQueryParams.marketPricePerShare}
                  onBlur={(value) => {
                    setInputQueryParams(
                      queryParams,
                      "marketPricePerShare",
                      value
                    );
                    history.push({
                      search: queryParams.toString(),
                    });
                  }}
                  InputProps={{
                    inputComponent: FormatInputToCurrency,
                  }}
                />
                <CostOfCapitalTextField
                  label="Annual Dividend Per Share"
                  defaultValue={inputQueryParams.annualDividendPerShare}
                  onBlur={(value) => {
                    setInputQueryParams(
                      queryParams,
                      "annualDividendPerShare",
                      value
                    );
                    history.push({
                      search: queryParams.toString(),
                    });
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
