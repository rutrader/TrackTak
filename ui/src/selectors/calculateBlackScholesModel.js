// https://gist.github.com/santacruz123/3623310

import { createSelector } from "@reduxjs/toolkit";
import { selectRiskFreeRate } from "./calculateRiskFreeRate";
import { selectQueryParams } from "./getInputQueryParams";

/*
  PutCallFlag: Either "put" or "call"
  S: Stock Price
  X: Strike Price
  T: Time to expiration (in years)
  r: Risk-free rate
  v: Volatility
  This is the same one found in http://www.espenhaug.com/black_scholes.html
  but written with proper indentation and a === instead of == because it's
  faster, and it doesn't declare 5 useless variables (although if you really
  want to do it to have more elegant code I left a commented CND function in
  the end)
*/

const calculateBlackScholesModel = (PutCallFlag, S, X, T, r, v) => {
  var d1 = (Math.log(S / X) + (r + (v * v) / 2) * T) / (v * Math.sqrt(T));
  var d2 = d1 - v * Math.sqrt(T);
  if (PutCallFlag === "call") {
    return S * CND(d1) - X * Math.exp(-r * T) * CND(d2);
  } else {
    return X * Math.exp(-r * T) * CND(-d2) - S * CND(-d1);
  }
};

/* The cummulative Normal distribution function: */
const CND = (x) => {
  if (x < 0) {
    return 1 - CND(-x);
  } else {
    const k = 1 / (1 + 0.2316419 * x);
    return (
      1 -
      (Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI)) *
        k *
        (0.31938153 +
          k *
            (-0.356563782 +
              k * (1.781477937 + k * (-1.821255978 + k * 1.330274429))))
    );
  }
};

export const selectValueOption = createSelector(
  (state) => state.fundamentals.price,
  selectQueryParams,
  selectRiskFreeRate,
  (state) => state.fundamentals.currentIndustry?.standardDeviationInStockPrices,
  (price, queryParams, riskFreeRate, standardDeviationInStockPrices) => {
    if (queryParams.averageStrikePrice === undefined) return null;
    if (queryParams.averageMaturityOfOptions === undefined) return null;

    return calculateBlackScholesModel(
      "call",
      price,
      queryParams.averageStrikePrice,
      queryParams.averageMaturityOfOptions,
      riskFreeRate,
      standardDeviationInStockPrices
    );
  }
);

export const selectValueOfAllOptionsOutstanding = createSelector(
  selectValueOption,
  selectQueryParams,
  (valuePerOption, queryParams) => {
    if (valuePerOption === null) return null;
    if (queryParams.numberOfOptionsOutstanding === undefined) return null;

    return valuePerOption * queryParams.numberOfOptionsOutstanding;
  }
);

export default calculateBlackScholesModel;
