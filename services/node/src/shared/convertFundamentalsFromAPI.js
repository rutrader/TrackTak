import camelCase from 'camelcase'
import { isNil } from 'lodash-es'
import getValueFromString from './getValueFromString'
import replaceDoubleColonWithObject from './replaceDoubleColonWithObject'
import * as financialStatementKeys from './financialStatementKeys'

const dateSortComparer = (a, b) => b.date.localeCompare(a.date)

const convertCalculationToZeroIfNaN = calculations => {
  const newCalculations = {
    ...calculations
  }

  Object.keys(newCalculations).forEach(property => {
    const value = newCalculations[property]

    if (value === Infinity || value === -Infinity || isNaN(value)) {
      newCalculations[property] = 0
    }
  })

  return newCalculations
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

  const calculations = {}

  // API returns wrong value for this property for non-us stocks
  // so we overwrite it
  calculations.cashAndShortTermInvestments =
    newBalanceSheet.cash + newBalanceSheet.shortTermInvestments

  calculations.longTermDebtAndCapitalLeases =
    newBalanceSheet.longTermDebt + newBalanceSheet.capitalLeaseObligations

  calculations.totalEquity =
    newBalanceSheet.totalStockholderEquity +
    newBalanceSheet.noncontrollingInterestInConsolidatedEntity

  // Take it out here because we show capital leases as a separate line
  // on the balance statement
  calculations.nonCurrentLiabilitiesOther =
    newBalanceSheet.nonCurrentLiabilitiesOther -
    newBalanceSheet.capitalLeaseObligations

  const convertedCalculations = convertCalculationToZeroIfNaN(calculations)

  return {
    ...newBalanceSheet,
    ...convertedCalculations
  }
}

const getFinancialMapCallback = key => statement => {
  const statementKeys = financialStatementKeys[key]
  const newStatement = {}

  statementKeys.forEach(key => {
    newStatement[key] = statement[key]
  })

  return newStatement
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

  const calculations = {}

  calculations.grossMargin =
    newIncomeStatement.grossProfit / newIncomeStatement.revenue

  calculations.operatingMargin =
    newIncomeStatement.operatingIncome / newIncomeStatement.revenue

  calculations.effectiveTaxRate =
    newIncomeStatement.incomeTaxExpense / newIncomeStatement.incomeBeforeTax

  calculations.netMargin =
    newIncomeStatement.netIncomeFromContinuingOps / newIncomeStatement.revenue

  const convertedCalculations = convertCalculationToZeroIfNaN(calculations)

  return {
    ...newIncomeStatement,
    ...convertedCalculations
  }
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

const camelCaseObject = (obj, topLevelKey) => {
  const returnedObj = {}
  const returnedArr = []

  try {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      const camelCaseKey = camelCase(key, {
        preserveConsecutiveUppercase: true
      })

      if (typeof value === 'object' && value !== null) {
        const camelCaseObj = camelCaseObject(value, camelCaseKey)

        if (isNaN(parseInt(key))) {
          returnedObj[camelCaseKey] = camelCaseObj
        } else {
          returnedArr.push(camelCaseObj)
        }
      } else {
        returnedObj[camelCaseKey] = value
      }
    })
  } catch (error) {
    console.error(
      `camelCase error thrown for key: ${topLevelKey}. Ignoring key.`
    )
    console.error(error)
  }

  return returnedArr.length ? returnedArr : returnedObj
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
      const incomeStatement = {
        ...financials.incomeStatement,
        currencyCode: financials.incomeStatement.currencySymbol
      }

      delete incomeStatement.currencySymbol

      const balanceSheet = {
        ...financials.balanceSheet,
        currencyCode: financials.balanceSheet.currencySymbol
      }

      delete balanceSheet.currencySymbol

      const cashFlowStatement = {
        ...financials.cashFlow,
        currencyCode: financials.cashFlow.currencySymbol
      }

      delete cashFlowStatement.currencySymbol

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
        }

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
        }

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
        }

        delete financials.cashFlow

        financials.cashFlowStatement = cashFlowStatement
      }

      Object.keys(financials).forEach(key => {
        const { quarterly, yearly } = financials[key]

        const newQuarterlyValues = quarterly.map(getFinancialMapCallback(key))
        const newYearlyValues = yearly.map(getFinancialMapCallback(key))

        newFundamentalsData.financials[key] = {
          ...financials[key],
          quarterly: newQuarterlyValues,
          yearly: newYearlyValues
        }
      })
    }
  } catch (error) {
    console.info(`Conversion partially failed for: ${ticker}.`)
    console.error(error)
  }

  return newFundamentalsData
}

export default convertFundamentalsFromAPI
