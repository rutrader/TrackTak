import { useMemo } from "react";
import useQueryParams from "./useQueryParams";
import {
  cagrYearOneToFiveQueryName,
  ebitTargetMarginInYearTenQueryName,
  yearOfConvergenceQueryName,
  salesToCapitalRatioQueryName,
} from "../shared/inputQueryNames";

export const requiredInputQueries = [
  { name: cagrYearOneToFiveQueryName, type: "percent" },
  { name: ebitTargetMarginInYearTenQueryName, type: "percent" },
  { name: yearOfConvergenceQueryName, type: "year" },
  { name: salesToCapitalRatioQueryName, type: "number" },
];

export const optionalInputQueries = [
  { name: "numberOfEmployeeOptionsOutstanding", type: "million" },
  { name: "averageStrikePrice", type: "currency" },
  { name: "averageMaturityOfOptions", type: "year" },
  { name: "averageMaturityOfDebt", type: "year" },
  { name: "pretaxCostOfDebt", type: "percent" },
  { name: "bookValueOfConvertibleDebt", type: "million-currency" },
  { name: "interestExpenseOnConvertibleDebt", type: "million-currency" },
  { name: "maturityOfConvertibleDebt", type: "year" },
  { name: "numberOfPreferredShares", type: "million" },
  { name: "marketPricePerShare", type: "currency" },
  { name: "annualDividendPerShare", type: "currency" },
  { name: "netOperatingLoss", type: "million-currency" },
  { name: "probabilityOfFailure", type: "percent" },
  { name: "proceedsAsAPercentageOfBookValue", type: "percent" },
];

export const inputQueries = [...requiredInputQueries, ...optionalInputQueries];

const getInputQueryParams = (query) => {
  const inputQueryParams = {};

  inputQueries.forEach(({ name }) => {
    // Set it to null and not undefined so that they still get sent through the axios requests
    inputQueryParams[name] = query[name] ? parseFloat(query[name]) : null;
  });

  return inputQueryParams;
};

const useInputQueryParams = () => {
  const queryParams = useQueryParams();
  const inputQueryParams = useMemo(() => getInputQueryParams(queryParams), [
    queryParams,
  ]);

  return inputQueryParams;
};

export default useInputQueryParams;
