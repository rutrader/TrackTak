const getOperatingMargin = (incomeStatement) => {
  return incomeStatement.operatingIncome / incomeStatement.totalRevenue;
};

export default getOperatingMargin;
