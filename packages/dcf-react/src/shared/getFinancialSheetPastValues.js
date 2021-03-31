const getFinancialSheetPastValues = (financialSheetValues, valueKey) => {
  const sumOfFirstFourValues = financialSheetValues.reduce((acc, curr) => {
    return (acc += curr[valueKey]);
  }, 0);

  return sumOfFirstFourValues;
};

export default getFinancialSheetPastValues;
