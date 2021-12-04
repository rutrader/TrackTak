import camelCase from 'camelcase'
import isNil from 'lodash/isNil'
import getValueFromString from './getValueFromString'
import replaceDoubleColonWithObject from './replaceDoubleColonWithObject'

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

    // Fix EOD issue by removing stocks with incomplete data
    const quarterlyDatesRemoved = {}

    if (newFundamentalsData.financials?.incomeStatement?.quarterly) {
      const quarterly = newFundamentalsData.financials.incomeStatement.quarterly

      Object.keys(quarterly).forEach(key => {
        const datum = quarterly[key]

        if (isNil(datum.totalRevenue)) {
          quarterlyDatesRemoved[key] = datum.date
        } else {
          quarterly[key] = convertIncomeStatement(datum)
        }
      })

      newFundamentalsData.financials.incomeStatement.quarterly = quarterly
    }

    if (newFundamentalsData.financials?.balanceSheet?.quarterly) {
      const quarterly = newFundamentalsData.financials.balanceSheet.quarterly

      Object.keys(quarterly).forEach(key => {
        const datum = quarterly[key]

        if (isNil(datum.totalStockholderEquity) || quarterlyDatesRemoved[key]) {
          quarterlyDatesRemoved[key] = datum.date
        } else {
          quarterly[key] = convertBalanceSheet(datum)
        }
      })

      newFundamentalsData.financials.balanceSheet.quarterly = quarterly
    }

    if (newFundamentalsData.financials?.cashFlow.quarterly) {
      const quarterly = newFundamentalsData.financials.cashFlow.quarterly

      Object.keys(quarterly).forEach(key => {
        const datum = quarterly[key]

        if (!quarterlyDatesRemoved[key]) {
          quarterly[key] = convertCashFlowStatement(datum)
        }
      })

      newFundamentalsData.financials.cashFlowStatement = {
        ...newFundamentalsData.financials.cashFlowStatement,
        quarterly
      }
    }

    const yearlyDatesRemoved = {}

    if (newFundamentalsData.financials?.incomeStatement.yearly) {
      const yearly = newFundamentalsData.financials.incomeStatement.yearly

      Object.keys(yearly).forEach(key => {
        const datum = yearly[key]

        if (isNil(datum.totalRevenue)) {
          yearlyDatesRemoved[key] = datum.date
        } else {
          yearly[key] = convertIncomeStatement(datum)
        }
      })

      newFundamentalsData.financials.incomeStatement.yearly = yearly
    }

    if (newFundamentalsData.financials?.balanceSheet.yearly) {
      const yearly = newFundamentalsData.financials.balanceSheet.yearly

      Object.keys(yearly).forEach(key => {
        const datum = yearly[key]

        if (isNil(datum.totalStockholderEquity) || yearlyDatesRemoved[key]) {
          yearlyDatesRemoved[key] = datum.date
        } else {
          yearly[key] = convertBalanceSheet(datum)
        }
      })

      newFundamentalsData.financials.balanceSheet.yearly = yearly
    }

    if (newFundamentalsData.financials?.cashFlow.yearly) {
      const yearly = newFundamentalsData.financials.cashFlow.yearly

      Object.keys(yearly).forEach(key => {
        const datum = yearly[key]

        if (!yearlyDatesRemoved[key]) {
          yearly[key] = convertCashFlowStatement(datum)
        }
      })

      newFundamentalsData.financials.cashFlowStatement = {
        ...newFundamentalsData.financials.cashFlowStatement,
        yearly
      }
    }

    if (newFundamentalsData.financials.cashFlow) {
      delete newFundamentalsData.financials.cashFlow
    }
  } catch (error) {
    console.info(`Conversion partially failed for: ${ticker}.`)
    console.error(error)
  }

  return newFundamentalsData
}

export default convertFundamentalsFromAPI
