import { isNil } from "lodash-es";

const getInterestCoverage = (incomeStatements) => {
  const { operatingIncome, interestExpense } = incomeStatements.ttm;

  if (isNil(operatingIncome) || isNil(interestExpense)) return null;
  if (interestExpense === 0) return Infinity;
  if (operatingIncome < 0) return -Infinity;

  // Cap it to 0 otherwise the coverage will be wrong.
  const cappedInterestExpense = interestExpense < 0 ? 0 : interestExpense;

  return operatingIncome / cappedInterestExpense;
};

export default getInterestCoverage;
