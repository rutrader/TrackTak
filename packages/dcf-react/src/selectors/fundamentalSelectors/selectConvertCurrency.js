import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import selectExchangeRates from "./selectExchangeRates";
import isFinite from "lodash/isFinite";

const convertCurrency = (exchangeRates) => (
  datePeriodsToConvertAt,
  valueToConvert,
) => {
  if (!isFinite(valueToConvert) || !exchangeRates) return valueToConvert;

  // TODO: Make this exact day later
  const sumOfExchangeRateCloses = datePeriodsToConvertAt.reduce(
    (prev, date) => {
      // Get exchange rate for that month
      const datePeriodAsMonthDate = dayjs(date).format("YYYY-MM");
      const close = exchangeRates[datePeriodAsMonthDate]?.close ?? 0;

      return prev + close;
    },
    0,
  );

  const averageOfExchangeRateCloses =
    sumOfExchangeRateCloses / datePeriodsToConvertAt.length;

  return valueToConvert * averageOfExchangeRateCloses;
};

const selectConvertCurrency = createSelector(
  selectExchangeRates,
  convertCurrency,
);

export default selectConvertCurrency;
