const getFinancialSheetPastValues = (
  financialSheetValues,
  valueKey,
  periodsToGet,
) => {
  const sumOfFirstFourValues = financialSheetValues
    .slice(0, periodsToGet)
    .reduce((acc, curr) => {
      return (acc += curr[valueKey]);
    }, 0);

  return sumOfFirstFourValues;
};

export default getFinancialSheetPastValues;
