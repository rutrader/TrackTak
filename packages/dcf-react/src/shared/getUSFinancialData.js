import getFinancialSheetPastValues from "./getFinancialSheetPastValues";
import isFinite from "lodash/isFinite";

// TODO: Fix when the API fixes the TTM for non-US stocks
const getUSFinancialData = (
  getStatementFunc,
  quarterlyStatements,
  convertCurrency,
) => {
  const pastFourQuarters = quarterlyStatements.slice(0, 4);
  const statementDates = pastFourQuarters.map(({ date }) => date);
  const statement = {};

  pastFourQuarters.forEach((quarter) => {
    Object.keys(quarter).forEach((key) => {
      const value = quarter[key];

      if (isFinite(value)) {
        statement[key] = getFinancialSheetPastValues(pastFourQuarters, key);
      } else {
        statement[key] = value;
      }
    });
  });

  return getStatementFunc(statement, convertCurrency, statementDates);
};

export default getUSFinancialData;
