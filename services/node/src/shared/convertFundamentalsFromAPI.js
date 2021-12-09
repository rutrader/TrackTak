import camelCase from 'camelcase'
import isNil from 'lodash/isNil'
import getValueFromString from './getValueFromString'
import replaceDoubleColonWithObject from './replaceDoubleColonWithObject'

const sumFinancialStatementValues = (financialStatements, valueKey) => {
  const sumOfFirstFourValues = financialStatements.reduce((acc, curr) => {
    return (acc += curr[valueKey])
  }, 0)

  return sumOfFirstFourValues
}

const dateSortComparer = (a, b) => b.date.localeCompare(a.date)

const getTTMValuesFromQuarters = statement => {
  const ttm = {}
  const firstFourStatements = statement.quarterly.slice(0, 4)

  firstFourStatements.forEach(statement => {
    Object.keys(statement).forEach(key => {
      const value = statement[key]

      if (Number.isFinite(value)) {
        ttm[key] = sumFinancialStatementValues(firstFourStatements, key)
      } else {
        ttm[key] = value
      }
    })
  })

  return ttm
}

const convertBalanceSheet = ({
  date,
  filingDate,
  currencySymbol,
  ...balanceSheet
}) => {
  const newBalanceSheet = {
    date,
    filingDate,
    currencyCode: currencySymbol,
    ...balanceSheet
  }

  Object.keys(balanceSheet).forEach(key => {
    newBalanceSheet[key] = getValueFromString(balanceSheet[key])
  })

  // EOD fix for some stocks who have different longTermDebt versus longTermDebtTotal
  newBalanceSheet.longTermDebt = newBalanceSheet.longTermDebtTotal
    ? newBalanceSheet.longTermDebtTotal
    : newBalanceSheet.longTermDebt

  return newBalanceSheet
}

const convertIncomeStatement = ({
  date,
  filingDate,
  currencySymbol,
  totalRevenue,
  totalOtherIncomeExpenseNet,
  totalOperatingExpenses,
  ...incomeStatement
}) => {
  const newIncomeStatement = {
    date,
    filingDate,
    currencyCode: currencySymbol,
    revenue: getValueFromString(totalRevenue),
    otherIncomeExpense: getValueFromString(totalOtherIncomeExpenseNet),
    operatingExpenses: getValueFromString(totalOperatingExpenses),
    ...incomeStatement
  }

  Object.keys(incomeStatement).forEach(key => {
    newIncomeStatement[key] = getValueFromString(incomeStatement[key])
  })

  return newIncomeStatement
}

const convertCashFlowStatement = ({
  date,
  filingDate,
  currencySymbol,
  ...cashFlowStatement
}) => {
  const newCashFlowStatement = {
    date,
    filingDate,
    currencyCode: currencySymbol,
    ...cashFlowStatement
  }

  Object.keys(cashFlowStatement).forEach(key => {
    newCashFlowStatement[key] = getValueFromString(cashFlowStatement[key])
  })

  return newCashFlowStatement
}

const convertEarningsTrend = ({ date, period, ...trend }) => {
  const newTrend = {
    date,
    period,
    ...trend
  }

  Object.keys(trend).forEach(key => {
    newTrend[key] = getValueFromString(trend[key])
  })

  return newTrend
}

const camelCaseObject = (obj, key) => {
  const returnedObj = {}

  try {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      const camelCaseKey = camelCase(key, {
        preserveConsecutiveUppercase: true
      })

      if (typeof value === 'object' && value !== null) {
        returnedObj[camelCaseKey] = camelCaseObject(value, camelCaseKey)
      } else {
        returnedObj[camelCaseKey] = value
      }
    })
  } catch (error) {
    console.error(`camelCase error thrown for key: ${key}. Ignoring key.`)
    console.error(error)
  }

  return returnedObj
}

const convertFundamentalsFromAPI = (ticker, data) => {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  const fundamentalsData = replaceDoubleColonWithObject(data)

  let newFundamentalsData = {}

  try {
    newFundamentalsData = camelCaseObject(fundamentalsData)

    if (newFundamentalsData.earnings?.trend) {
      const trend = newFundamentalsData.earnings?.trend

      Object.keys(trend).forEach(key => {
        const datum = trend[key]

        trend[key] = convertEarningsTrend(datum)
      })

      newFundamentalsData.earnings = {
        ...newFundamentalsData.earnings,
        trend
      }
    }

    if (newFundamentalsData.financials) {
      // Fix EOD issue by removing stocks with incomplete data
      const quarterlyDatesRemoved = {}
      const yearlyDatesRemoved = {}

      const financials = newFundamentalsData.financials
      const incomeStatement = financials.incomeStatement
      const balanceSheet = financials.balanceSheet
      const cashFlowStatement = financials.cashFlow

      const isInUS = newFundamentalsData.general.countryISO === 'US'

      if (incomeStatement) {
        if (incomeStatement.quarterly) {
          const quarterly = []

          Object.keys(incomeStatement.quarterly).forEach(key => {
            const datum = incomeStatement.quarterly[key]

            if (isNil(datum.totalRevenue)) {
              quarterlyDatesRemoved[key] = datum.date
            } else {
              quarterly.push(convertIncomeStatement(datum))
            }
          })

          incomeStatement.quarterly = quarterly.sort(dateSortComparer)

          if (isInUS) {
            incomeStatement.ttm = getTTMValuesFromQuarters(incomeStatement)
          }
        }

        if (incomeStatement.yearly) {
          const yearly = []

          Object.keys(incomeStatement.yearly).forEach(key => {
            const datum = incomeStatement.yearly[key]

            if (isNil(datum.totalRevenue)) {
              yearlyDatesRemoved[key] = datum.date
            } else {
              yearly.push(convertIncomeStatement(datum))
            }
          })

          incomeStatement.yearly = yearly.sort(dateSortComparer)

          if (!isInUS) {
            incomeStatement.ttm = incomeStatement.yearly[0]
          }
        }

        incomeStatement.ttm.date = 'TTM'

        financials.incomeStatement = incomeStatement
      }

      if (balanceSheet) {
        if (balanceSheet.quarterly) {
          const quarterly = []

          Object.keys(balanceSheet.quarterly).forEach(key => {
            const datum = balanceSheet.quarterly[key]

            if (
              isNil(datum.totalStockholderEquity) ||
              quarterlyDatesRemoved[key]
            ) {
              quarterlyDatesRemoved[key] = datum.date
            } else {
              quarterly.push(convertBalanceSheet(datum))
            }
          })

          balanceSheet.quarterly = quarterly.sort(dateSortComparer)

          if (isInUS) {
            balanceSheet.ttm = getTTMValuesFromQuarters(balanceSheet)
          }
        }

        if (balanceSheet.yearly) {
          const yearly = []

          Object.keys(balanceSheet.yearly).forEach(key => {
            const datum = balanceSheet.yearly[key]

            if (
              isNil(datum.totalStockholderEquity) ||
              yearlyDatesRemoved[key]
            ) {
              yearlyDatesRemoved[key] = datum.date
            } else {
              yearly.push(convertBalanceSheet(datum))
            }
          })

          balanceSheet.yearly = yearly.sort(dateSortComparer)

          if (!isInUS) {
            balanceSheet.ttm = balanceSheet.yearly[0]
          }
        }

        balanceSheet.ttm.date = 'TTM'

        financials.balanceSheet = balanceSheet
      }

      if (cashFlowStatement) {
        if (cashFlowStatement.quarterly) {
          const quarterly = []

          Object.keys(cashFlowStatement.quarterly).forEach(key => {
            const datum = cashFlowStatement.quarterly[key]

            if (!quarterlyDatesRemoved[key]) {
              quarterly.push(convertCashFlowStatement(datum))
            }
          })

          cashFlowStatement.quarterly = quarterly.sort(dateSortComparer)

          if (isInUS) {
            cashFlowStatement.ttm = getTTMValuesFromQuarters(cashFlowStatement)
          }
        }

        if (cashFlowStatement.yearly) {
          const yearly = []

          Object.keys(cashFlowStatement.yearly).forEach(key => {
            const datum = cashFlowStatement.yearly[key]

            if (!yearlyDatesRemoved[key]) {
              yearly.push(convertCashFlowStatement(datum))
            }
          })

          cashFlowStatement.yearly = yearly.sort(dateSortComparer)

          if (!isInUS) {
            cashFlowStatement.ttm = cashFlowStatement.yearly[0]
          }
        }

        delete financials.cashFlow

        cashFlowStatement.ttm.date = 'TTM'
        financials.cashFlowStatement = cashFlowStatement
      }

      newFundamentalsData.financials = financials
    }
  } catch (error) {
    console.info(`Conversion partially failed for: ${ticker}.`)
    console.error(error)
  }

  return newFundamentalsData
}

export default convertFundamentalsFromAPI
