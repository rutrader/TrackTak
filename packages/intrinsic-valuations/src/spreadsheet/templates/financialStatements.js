import { sentenceCase } from "change-case";
import dayjs from "dayjs";

export const incomeStatement = [
  "revenue",
  "costOfRevenue",
  "grossProfit",
  "grossMargin",
  "",
  "sellingGeneralAdministrative",
  "sellingAndMarketingExpenses",
  "researchDevelopment",
  "effectOfAccountingCharges",
  "operatingExpenses",
  "operatingIncome",
  "operatingMargin",
  "",
  "interestIncome",
  "interestExpense",
  "netInterestIncome",
  "otherIncomeExpense",
  "incomeBeforeTax",
  "",
  "incomeTaxExpense",
  "effectiveTaxRate",
  "discontinuedOperations",
  "minorityInterest",
  "netIncomeFromContinuingOps",
  "netIncome",
  "preferredStockAndOtherAdjustments",
  "netIncomeApplicableToCommonShares",
  "netMargin",
  "",
  "ebit",
  "depreciationAndAmortization",
  "nonRecurring",
  "otherItems",
  "ebitda",
];

export const balanceSheet = [
  "cash",
  "shortTermInvestments",
  "cashAndShortTermInvestments",
  "netReceivables",
  "inventory",
  "otherCurrentAssets",
  "totalCurrentAssets",
  "longTermInvestments",
  "propertyPlantEquipment",
  "intangibleAssets",
  "goodWill",
  "otherAssets",
  "nonCurrentAssetsTotal",
  "totalAssets",
  "accountsPayable",
  "shortLongTermDebt",
  "otherCurrentLiab",
  "totalCurrentLiabilities",
  "longTermDebt",
  "capitalLeaseObligations",
  "longTermDebtAndCapitalLeases",
  "deferredLongTermLiab",
  "nonCurrentLiabilitiesOther",
  "nonCurrentLiabilitiesTotal",
  "totalLiab",
  "commonStock",
  "preferredStockTotalEquity",
  "retainedEarnings",
  "accumulatedOtherComprehensiveIncome",
  "additionalPaidInCapital",
  "treasuryStock",
  "capitalSurpluse",
  "otherStockholderEquity",
  "totalStockholderEquity",
  "minorityInterest",
  "totalEquity",
];

export const cashFlowStatement = [
  "netIncome",
  "depreciation",
  "changeToAccountReceivables",
  "changeReceivables",
  "changeToInventory",
  "changeToLiabilities",
  "totalCashFromOperatingActivities",
  "investments",
  "otherCashflowsFromInvestingActivities",
  "totalCashflowsFromInvestingActivities",
  "salePurchaseOfStock",
  "netBorrowings",
  "dividendsPaid",
  "otherCashflowsFromFinancingActivities",
  "totalCashFromFinancingActivities",
  "beginPeriodCashFlow",
  "endPeriodCashFlow",
  "changeInCash",
  "capitalExpenditures",
];

export const getStatements = (statements, statementKeys) => {
  const { date, filingDate, currencyCode, ...statement } = {
    ...statements.ttm,
  };

  const values = statementKeys.map((key) => {
    if (!key) return [];

    const formattedKey = sentenceCase(key);
    const values = [];

    values.push(statement[key]);

    Object.keys(statements.yearly).forEach((yearlyDate) => {
      const statement = statements.yearly[yearlyDate];

      values.push(statement[key]);
    });

    return [formattedKey, ...values];
  });

  return values;
};

export const getDatesFromStatement = (statement) => {
  const dates = Object.keys(statement.yearly).map((date) =>
    dayjs(date).format("MMM YY"),
  );

  dates.unshift("TTM");
  dates.unshift(null);

  return dates;
};
