import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { getFundamentals } from "../redux/actions/fundamentalsActions";
import { Box, Typography, useTheme } from "@material-ui/core";
import TTTable from "../components/TTTable";
import dayjs from "dayjs";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import Section from "../components/Section";
import DiscountedCashFlowSheet from "./DiscountedCashFlowSheet";
import blackScholes from "../shared/blackScholesModel";
import SubSection from "../components/SubSection";
import calculateCostOfCapital from "../shared/calculateCostOfCapital";
import SubscribeMailingList from "../components/SubscribeMailingList";
import parseInputQueryParams from "../shared/parseInputQueryParams";
import CompanyOverviewStats from "../components/CompanyOverviewStats";
import ValueDrivingInputs from "../components/ValueDrivingInputs";
import OptionalInputs from "../components/OptionalInputs";
import CostOfCapitalResults from "../components/CostOfCapitalResults";

const mapFromStatementsToDateObject = (objectToLoop, valueKey) => {
  const dateObject = {};

  Object.keys(objectToLoop).forEach((key) => {
    const value = objectToLoop[key];

    dateObject[key] = <FormatRawNumberToMillion value={value[valueKey]} />;
  });

  return dateObject;
};

const DiscountedCashFlow = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const fundamentals = useSelector((state) => state.fundamentals);
  const economicData = useSelector((state) => state.economicData);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const industryAverages = useSelector((state) => state.industryAverages);
  const theme = useTheme();
  const inputQueryParams = parseInputQueryParams(location);

  useEffect(() => {
    dispatch(getFundamentals(params.ticker));
  }, [dispatch, params.ticker]);

  if (!fundamentals.data || !economicData.governmentBondTenYearLastClose)
    return null;

  const { SharesStats } = fundamentals.data;

  const riskFreeRate =
    economicData.governmentBondTenYearLastClose / 100 -
    equityRiskPremium.currentCountry.adjDefaultSpread;
  const valuePerOption = blackScholes(
    "call",
    fundamentals.price,
    inputQueryParams.averageStrikePrice,
    inputQueryParams.averageMaturityOfOptions,
    riskFreeRate,
    industryAverages.currentIndustry.standardDeviationInStockPrices
  );
  const { costOfCapital } = calculateCostOfCapital(
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
    Object.values(fundamentals.yearlyIncomeStatements).map((statement) => ({
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
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "totalRevenue"
      ),
    },
    {
      dataField: "Operating Income",
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToMillion
          value={fundamentals.incomeStatement.operatingIncome}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "operatingIncome"
      ),
    },
    {
      dataField: "Interest Expense",
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToMillion
          value={fundamentals.incomeStatement.interestExpense}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "interestExpense"
      ),
    },
    {
      dataField: "Book Value of Equity",
      ttm: (
        <FormatRawNumberToMillion
          value={fundamentals.balanceSheet.bookValueOfEquity}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "bookValueOfEquity"
      ),
    },
    {
      dataField: "Book Value of Debt",
      ttm: (
        <FormatRawNumberToMillion
          value={fundamentals.balanceSheet.bookValueOfDebt}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "bookValueOfDebt"
      ),
    },
    {
      dataField: "Cash & Marketable Securities",
      ttm: (
        <FormatRawNumberToMillion
          value={fundamentals.balanceSheet.cashAndShortTermInvestments}
        />
      ),
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "cashAndShortTermInvestments"
      ),
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
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyBalanceSheets,
        "noncontrollingInterestInConsolidatedEntity"
      ),
    },
    {
      dataField: "Minority Interests",
      ttm: fundamentals.hasIncomeTTM ? (
        <FormatRawNumberToMillion
          value={fundamentals.incomeStatement.minorityInterest}
        />
      ) : null,
      ...mapFromStatementsToDateObject(
        fundamentals.yearlyIncomeStatements,
        "minorityInterest"
      ),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", gap: theme.spacing(10) }}>
        <CompanyOverviewStats />
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
        <Box style={{ overflowX: "auto" }}>
          <TTTable columns={companyFundamentalsColumns} data={rowData} />
        </Box>
      </Section>
      <Section sx={{ display: "flex", gridColumnGap: 20, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <Typography variant="h5" gutterBottom>
              Value Driving Inputs
            </Typography>
            <ValueDrivingInputs />
          </SubSection>
          <SubSection>
            <Typography variant="h5" gutterBottom>
              Cost of Capital Results
            </Typography>
            <CostOfCapitalResults />
          </SubSection>
        </Box>
        <Box sx={{ flex: 1 }}>
          <SubSection>
            <Typography variant="h5" gutterBottom>
              Optional Inputs
            </Typography>
            <OptionalInputs />
          </SubSection>
        </Box>
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          Valuation
        </Typography>
        <DiscountedCashFlowSheet
          riskFreeRate={riskFreeRate}
          costOfCapital={costOfCapital}
          valueOfAllOptionsOutstanding={valueOfAllOptionsOutstanding}
        />
      </Section>
      <Section sx={{ display: "flex", mt: 2 }}>
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
          >
            Want us to implement features you need?
          </Typography>
          <SubscribeMailingList subscribeText="Sign Up" />
        </Box>
      </Section>
    </>
  );
};

export default DiscountedCashFlow;
