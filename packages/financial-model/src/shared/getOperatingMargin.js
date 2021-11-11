const getOperatingMargin = incomeStatement => {
  return incomeStatement.operatingIncome / incomeStatement.revenue
}

export default getOperatingMargin
