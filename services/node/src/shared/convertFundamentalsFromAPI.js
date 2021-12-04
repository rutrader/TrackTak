import camelCase from 'camelcase'
import isNil from 'lodash/isNil'
import getValueFromString from './getValueFromString'

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
  }

  return returnedObj
}

const convertFundamentalsFromAPI = fundamentalsData => {
  if (typeof fundamentalsData !== 'object') {
    return fundamentalsData
  }

  let newFundamentalsData = {}

  try {
    newFundamentalsData = camelCaseObject(fundamentalsData)

    const {
      financials: {
        incomeStatement,
        balanceSheet,
        cashFlow: cashFlowStatement
      },
      earnings: { trend, ...earnings }
    } = newFundamentalsData

    Object.keys(trend).forEach(key => {
      const datum = trend[key]

      trend[key] = convertEarningsTrend(datum)
    })

    // Fix EOD issue by removing stocks with incomplete data
    const quarterlyDatesRemoved = {}

    Object.keys(incomeStatement.quarterly).forEach(key => {
      const datum = incomeStatement.quarterly[key]

      if (isNil(datum.totalRevenue)) {
        quarterlyDatesRemoved[key] = datum.date
      } else {
        incomeStatement.quarterly[key] = convertIncomeStatement(datum)
      }
    })

    Object.keys(balanceSheet.quarterly).forEach(key => {
      const datum = balanceSheet.quarterly[key]

      if (isNil(datum.totalStockholderEquity) || quarterlyDatesRemoved[key]) {
        quarterlyDatesRemoved[key] = datum.date
      } else {
        balanceSheet.quarterly[key] = convertBalanceSheet(datum)
      }
    })

    Object.keys(cashFlowStatement.quarterly).forEach(key => {
      const datum = cashFlowStatement.quarterly[key]

      if (!quarterlyDatesRemoved[key]) {
        cashFlowStatement.quarterly[key] = convertCashFlowStatement(datum)
      }
    })

    const yearlyDatesRemoved = {}

    Object.keys(incomeStatement.yearly).forEach(key => {
      const datum = incomeStatement.yearly[key]

      if (isNil(datum.totalRevenue)) {
        yearlyDatesRemoved[key] = datum.date
      } else {
        incomeStatement.yearly[key] = convertIncomeStatement(datum)
      }
    })

    Object.keys(balanceSheet.yearly).forEach(key => {
      const datum = balanceSheet.yearly[key]

      if (isNil(datum.totalStockholderEquity) || yearlyDatesRemoved[key]) {
        yearlyDatesRemoved[key] = datum.date
      } else {
        balanceSheet.yearly[key] = convertBalanceSheet(datum)
      }
    })

    Object.keys(cashFlowStatement.yearly).forEach(key => {
      const datum = cashFlowStatement.yearly[key]

      if (!yearlyDatesRemoved[key]) {
        cashFlowStatement.yearly[key] = convertCashFlowStatement(datum)
      }
    })

    newFundamentalsData.incomeStatement = incomeStatement
    newFundamentalsData.balanceSheet = balanceSheet
    newFundamentalsData.cashFlowStatement = cashFlowStatement
    newFundamentalsData.earnings = {
      ...earnings,
      trend
    }
  } catch (error) {
    console.info(
      `Conversion partially failed for: ${fundamentalsData.General.Code}.`
    )
  }

  return newFundamentalsData
}

export default convertFundamentalsFromAPI
