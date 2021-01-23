import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import getValueFromString from "../shared/getValueFromString";
import { monthDateFormat } from "../shared/utils";

const convertCurrency = (exchangeRates) => (
  datePeriodsToConvertAt,
  valueToConvert
) => {
  const valueAsANumber = getValueFromString(valueToConvert);

  if (isNaN(parseFloat(valueAsANumber)) || !exchangeRates)
    return valueAsANumber;

  // TODO: Make this exact day later
  const sumOfExchangeRateCloses = datePeriodsToConvertAt.reduce(
    (prev, date) => {
      // Get exchange rate for that month
      const datePeriodAsMonthDate = dayjs(date).format(monthDateFormat);

      return prev + exchangeRates[datePeriodAsMonthDate].close;
    },
    0
  );

  const averageOfExchangeRateCloses =
    sumOfExchangeRateCloses / datePeriodsToConvertAt.length;

  return valueAsANumber * averageOfExchangeRateCloses;
};

const selectConvertCurrency = createSelector(
  (state) => state.fundamentals.exchangeRates,
  convertCurrency
);

export default selectConvertCurrency;
