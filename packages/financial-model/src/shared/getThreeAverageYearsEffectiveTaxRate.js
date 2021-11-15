import getFinancialSheetPastValues from './getFinancialSheetPastValues'
import getIsStockInUS from './getIsStockInUS'
import getSortedStatements from './getSortedStatements'

const pastPeriodsToGet = 3
const quarters = 4
const pastThreeYearQuarterPeriod = pastPeriodsToGet * quarters

const getThreeAverageYearsEffectiveTaxRate = fundamentals => {
  const quarterlyIncomeStatements = getSortedStatements(
    fundamentals.incomeStatement.quarterly
  )
  const yearlyIncomeStatements = getSortedStatements(
    fundamentals.incomeStatement.yearly
  )
  let pastThreeYearIncomeBeforeTax
  let pastThreeYearIncomeTaxExpense

  if (getIsStockInUS(fundamentals)) {
    const pastThreeYearsQuarterlyIncomeStatements =
      quarterlyIncomeStatements.slice(0, pastThreeYearQuarterPeriod)

    pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
      pastThreeYearsQuarterlyIncomeStatements,
      'incomeBeforeTax'
    )
    pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
      pastThreeYearsQuarterlyIncomeStatements,
      'incomeTaxExpense'
    )
  } else {
    const pastThreeYearsYearlyIncomeStatements = yearlyIncomeStatements.slice(
      0,
      pastPeriodsToGet
    )

    pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
      pastThreeYearsYearlyIncomeStatements,
      'incomeBeforeTax'
    )
    pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
      pastThreeYearsYearlyIncomeStatements,
      'incomeTaxExpense'
    )
  }
  return pastThreeYearIncomeTaxExpense / pastThreeYearIncomeBeforeTax
}

export default getThreeAverageYearsEffectiveTaxRate
