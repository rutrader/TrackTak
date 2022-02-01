import { isNil } from 'lodash-es'
import getValueFromString from './getValueFromString'
import replaceDoubleColonWithObject from './replaceDoubleColonWithObject'
import * as financialStatementKeys from './financialStatementKeys'
import camelCaseObjects from './camelCaseObjects'
import convertCurrencies from './convertCurrencies'

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
    currencyCode: convertCurrencies(currencySymbol),
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

  calculations.totalDebt =
    newBalanceSheet.shortLongTermDebt +
    calculations.longTermDebtAndCapitalLeases

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
  const statementKeys = financialStatementKeys[key].map(x => x.field)
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
    currencyCode: convertCurrencies(currencySymbol),
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
    currencyCode: convertCurrencies(currencySymbol),
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

const convertOutstandingSharesObject = ({
  dateFormatted,
  ...outstandingShares
}) => {
  const newOutstandingShares = {
    ...outstandingShares
  }

  delete newOutstandingShares.dateFormatted
  delete newOutstandingShares.sharesMln

  newOutstandingShares.date = dateFormatted

  return newOutstandingShares
}

export const convertOutstandingSharesObjects = outstandingShares => {
  const newOutstandingShares = { ...outstandingShares }

  if (newOutstandingShares.quarterly) {
    const quarterly = []

    Object.keys(newOutstandingShares.quarterly).forEach(key => {
      const datum = newOutstandingShares.quarterly[key]

      quarterly.push(convertOutstandingSharesObject(datum))
    })

    newOutstandingShares.quarterly = quarterly.sort(dateSortComparer)
  }

  if (newOutstandingShares.annual) {
    const yearly = []

    Object.keys(newOutstandingShares.annual).forEach(key => {
      const datum = newOutstandingShares.annual[key]

      yearly.push(convertOutstandingSharesObject(datum))
    })

    newOutstandingShares.yearly = yearly.sort(dateSortComparer)

    delete newOutstandingShares.annual
  }

  return newOutstandingShares
}

const convertFundamentalsFromAPI = (ticker, data) => {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  try {
    const fundamentalsData = replaceDoubleColonWithObject(data)

    let newFundamentalsData = {}

    newFundamentalsData = camelCaseObjects(fundamentalsData)

    if (newFundamentalsData.general) {
      newFundamentalsData.general.currencyCode = convertCurrencies(
        newFundamentalsData.general.currencyCode
      )

      newFundamentalsData.general.currencySymbol = convertCurrencies(
        newFundamentalsData.general.currencySymbol
      )

      if (newFundamentalsData.general.currencySymbol === 'ILS') {
        newFundamentalsData.general.currencySymbol = '₪'
      }

      newFundamentalsData.general.currencyName = convertCurrencies(
        newFundamentalsData.general.currencyName
      )
    }

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

    if (newFundamentalsData.outstandingShares) {
      newFundamentalsData.outstandingShares = convertOutstandingSharesObjects(
        newFundamentalsData.outstandingShares
      )
    }

    if (newFundamentalsData.financials) {
      // Fix EOD issue by removing stocks with incomplete data
      const quarterlyDatesRemoved = {}
      const yearlyDatesRemoved = {}

      const financials = newFundamentalsData.financials
      const incomeStatement = {
        ...financials.incomeStatement,
        currencyCode: convertCurrencies(
          financials.incomeStatement.currencySymbol
        )
      }

      delete incomeStatement.currencySymbol

      const balanceSheet = {
        ...financials.balanceSheet,
        currencyCode: convertCurrencies(financials.balanceSheet.currencySymbol)
      }

      delete balanceSheet.currencySymbol

      const cashFlowStatement = {
        ...financials.cashFlow,
        currencyCode: convertCurrencies(financials.cashFlow.currencySymbol)
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

    return newFundamentalsData
  } catch (error) {
    console.info(`Conversion partially failed for: ${ticker}.`)
    console.error(error)
  }
}

export default convertFundamentalsFromAPI
