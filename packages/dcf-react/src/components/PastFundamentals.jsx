import { Box, Typography, useTheme } from "@material-ui/core";
import dayjs from "dayjs";
import React, { cloneElement } from "react";
import { useSelector } from "react-redux";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectValuationCurrencyCode from "../selectors/fundamentalSelectors/selectValuationCurrencyCode";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectYearlyBalanceSheets from "../selectors/fundamentalSelectors/selectYearlyBalanceSheets";
import selectYearlyIncomeStatements from "../selectors/fundamentalSelectors/selectYearlyIncomeStatements";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import Section from "./Section";
import TTTable from "./TTTable";
import TableMillionFormatter from "../components/TableMillionFormatter";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";
import FormatRawNumber from "./FormatRawNumber";

const mapFromStatementsToDateObject = (
  objectToLoop,
  valueKey,
  valueFormatter = <TableMillionFormatter />,
) => {
  const dateObject = {};

  Object.keys(objectToLoop).forEach((key) => {
    const value = objectToLoop[key];

    dateObject[key] = cloneElement(valueFormatter, {
      value: value[valueKey],
    });
  });

  return dateObject;
};

const PastFundamentals = () => {
  const theme = useTheme();
  const isInUS = useSelector(selectIsInUS);
  const yearlyIncomeStatements = useSelector(selectYearlyIncomeStatements);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const yearlyBalanceSheets = useSelector(selectYearlyBalanceSheets);
  const valuationCurrencyCode = useSelector(selectValuationCurrencyCode);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const balanceSheet = useSelector(selectRecentBalanceSheet);

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
  ];

  if (isInUS) {
    columns.push({
      Header: "TTM",
      accessor: "ttm",
    });
  }

  columns.push(
    ...Object.values(yearlyIncomeStatements).map((statement) => {
      return {
        Header: dayjs(statement.date).format("MMM YY"),
        accessor: statement.date,
      };
    }),
  );

  const data = [
    {
      dataField: (
        <InfoOutlinedIconWrapper
          hash="revenue"
          text="The total amount of income generated by the sale of goods/services related to the company's primary operations."
        >
          Revenue
        </InfoOutlinedIconWrapper>
      ),
      ttm: <TableMillionFormatter value={incomeStatement.totalRevenue} />,
      ...mapFromStatementsToDateObject(yearlyIncomeStatements, "totalRevenue"),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Income earned by the company from it's day to day operations. Operating income includes Depreciation and Amortization, whereas EBITDA excludes it.">
          Operating Income
        </InfoOutlinedIconWrapper>
      ),
      ttm: <TableMillionFormatter value={incomeStatement.operatingIncome} />,
      ...mapFromStatementsToDateObject(
        yearlyIncomeStatements,
        "operatingIncome",
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Measures how much profit a company makes after paying for variable costs of production, such as wages and raw materials, but before paying interest or tax. Formula: Operating Income / Revenue.">
          Operating Margin
        </InfoOutlinedIconWrapper>
      ),
      ttm: <FormatRawNumberToPercent value={incomeStatement.operatingMargin} />,
      ...mapFromStatementsToDateObject(
        yearlyIncomeStatements,
        "operatingMargin",
        <FormatRawNumberToPercent />,
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The costs of borrowing money. Usually paid at a recurring rate every set date and time. For example: bonds, loans, convertible debt or lines of credit.">
          Interest Expense
        </InfoOutlinedIconWrapper>
      ),
      ttm: <TableMillionFormatter value={incomeStatement.interestExpense} />,
      ...mapFromStatementsToDateObject(
        yearlyIncomeStatements,
        "interestExpense",
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Non-operating assets are assets that are not considered to be part of a company's core operations for eg. unused land, spare equipment.">
          Cross Holdings &amp; Other Non-Operating Assets
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <TableMillionFormatter
          value={balanceSheet.noncontrollingInterestInConsolidatedEntity}
        />
      ),
      ...mapFromStatementsToDateObject(
        yearlyBalanceSheets,
        "noncontrollingInterestInConsolidatedEntity",
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper
          text="Reflects the requirement that if you own more than 50% of another company or have effective control of it, you have to consolidate that company's statements with yours.
    Thus, you count 100% of that subsidiaries assets, revenues and operating income with your company, even if you own only 60%.
    Minority interest reflects the book value of the 40% of the equity in the subsidiary that does not belong to you."
        >
          Minority Interests
        </InfoOutlinedIconWrapper>
      ),
      ttm: <TableMillionFormatter value={incomeStatement.minorityInterest} />,
      ...mapFromStatementsToDateObject(
        yearlyIncomeStatements,
        "minorityInterest",
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Marketable securities are assets that can be readily bought and sold in a public market and can be liquidated to cash quickly.">
          Cash &amp; Marketable Securities
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <TableMillionFormatter
          value={balanceSheet.cashAndShortTermInvestments}
        />
      ),
      ...mapFromStatementsToDateObject(
        yearlyBalanceSheets,
        "cashAndShortTermInvestments",
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="Also known as Total Stockholders Equity is the amount of assets remaining after all of it's liabilities have been paid. This is because Assets = Liabilities + Equity.">
          Book Value of Equity
        </InfoOutlinedIconWrapper>
      ),
      ttm: <TableMillionFormatter value={balanceSheet.bookValueOfEquity} />,
      ...mapFromStatementsToDateObject(
        yearlyBalanceSheets,
        "bookValueOfEquity",
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The total amount of debt of which the company owes, which is recorded in the books of the company. We include capital lease obligations in this number as lease obligations are a form of debt.">
          Book Value of Debt
        </InfoOutlinedIconWrapper>
      ),
      ttm: <TableMillionFormatter value={balanceSheet.bookValueOfDebt} />,
      ...mapFromStatementsToDateObject(yearlyBalanceSheets, "bookValueOfDebt"),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The efficiency of how much the company has to reinvest into the business to grow. The formula is: Total Revenue / Invested Capital. The higher the number the more efficient the company is.">
          Sales to Capital Ratio
        </InfoOutlinedIconWrapper>
      ),
      ttm: (
        <FormatRawNumber
          value={balanceSheet.salesToCapitalRatio}
          decimalScale={2}
        />
      ),
      ...mapFromStatementsToDateObject(
        yearlyBalanceSheets,
        "salesToCapitalRatio",
        <FormatRawNumber decimalScale={2} />,
      ),
    },
    {
      dataField: (
        <InfoOutlinedIconWrapper text="The amount of capital that has been invested into the business. The formula is: (Equity + Debt) - Cash &amp; Marketable Securities. We minus the cash out because cash is not an investment as it returns nothing.">
          Invested Capital
        </InfoOutlinedIconWrapper>
      ),
      ttm: <TableMillionFormatter value={balanceSheet.investedCapital} />,
      ...mapFromStatementsToDateObject(yearlyBalanceSheets, "investedCapital"),
    },
  ].map((datum) => {
    const newDatum = { ...datum };

    if (!isInUS) {
      delete newDatum.ttm;
    }

    return newDatum;
  });

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5">Past Fundamentals</Typography>
        <Typography
          style={{
            marginLeft: theme.spacing(1),
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          ({valuationCurrencySymbol}:{valuationCurrencyCode})
        </Typography>
      </Box>
      <Box style={{ overflowX: "auto" }}>
        <TTTable columns={columns} data={data} />
      </Box>
    </>
  );
};

export default PastFundamentals;
