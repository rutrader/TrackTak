import { convertOutstandingSharesObjects } from '../../../../shared/convertFundamentalsFromAPI'
import alterFromToQuery from '../alterFromToQuery'
import { isNil } from 'lodash-es'
import {
  getFieldValue,
  getFiscalDateRangeFilterPredicate,
  mapArrayObjectsToValues,
  mapObjToValues
} from '../helpers'
import getEODQuery from './getEODQuery'
import { getEOD, getFundamentals } from '../eodHistoricalData/eodAPI'

const fundamentalsFilter =
  'General::CountryISO,Financials::Balance_Sheet,Financials::Income_Statement,Financials::Cash_Flow'

const getTypeOfStatementToUse = (financials, field) => {
  if (
    !isNil(financials.incomeStatement.yearly[0][field]) ||
    field === 'incomeStatement'
  ) {
    return 'incomeStatement'
  }

  if (
    !isNil(financials.balanceSheet.yearly[0][field]) ||
    field === 'balanceSheet'
  ) {
    return 'balanceSheet'
  }

  if (
    !isNil(financials.cashFlowStatement.yearly[0][field]) ||
    field === 'cashFlowStatement'
  ) {
    return 'cashFlowStatement'
  }
}

const getFundamentalsFormattedGranularity = granularity => {
  let formattedGranularity = granularity

  if (granularity === 'quarter') {
    formattedGranularity = 'quarterly'
  }

  if (granularity === 'year') {
    formattedGranularity = 'yearly'
  }

  return formattedGranularity
}

const getTTMValuesFromQuarters = statements => {
  const ttm = {}
  // Reverse the array because we want the latest data that isn't numbers
  const firstFourStatements = statements.slice(0, 4).reverse()

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

const getObjWithTTMDate = statement => {
  return {
    ...statement,
    date: 'TTM'
  }
}

const getObjWithLatestDate = obj => {
  return {
    ...obj,
    date: 'Latest'
  }
}

const sumFinancialStatementValues = (financialStatements, valueKey) => {
  const sumOfFirstFourValues = financialStatements.reduce((acc, curr) => {
    return (acc += curr[valueKey])
  }, 0)

  return sumOfFirstFourValues
}

const getInterestCoverage = statement => {
  const { operatingIncome, interestExpense } = statement

  if (isNil(operatingIncome) || isNil(interestExpense)) return null
  if (interestExpense === 0) return Infinity
  if (operatingIncome < 0) return -Infinity

  // Cap it to 0 otherwise the coverage will be wrong.
  const cappedInterestExpense = Math.max(interestExpense, 0)

  return operatingIncome / cappedInterestExpense
}

const getIncomeStatementRatios = statement => {
  return {
    date: statement.date,
    interestCoverage: getInterestCoverage(statement)
  }
}

export const getFinancials = async (ticker, params) => {
  const { granularity, field, fiscalDateRange } = params
  const { general, financials } = await getFundamentals(ticker, {
    filter: fundamentalsFilter
  })

  const isInUS = general.countryISO === 'US'

  const formattedGranularity = getFundamentalsFormattedGranularity(granularity)

  const statementKey = getTypeOfStatementToUse(financials, field)
  const isStatement =
    field === 'incomeStatement' ||
    field === 'balanceSheet' ||
    field === 'cashFlowStatement'
  const statements =
    formattedGranularity === 'ttm'
      ? []
      : financials[statementKey][formattedGranularity]

  if (fiscalDateRange) {
    const fiscalDateRangeFilterPredicate =
      getFiscalDateRangeFilterPredicate(fiscalDateRange)
    const filteredStatements = statements.filter(fiscalDateRangeFilterPredicate)

    if (formattedGranularity !== 'quarterly') {
      if (isInUS) {
        const filteredQuarters = financials[statementKey].quarterly.filter(
          fiscalDateRangeFilterPredicate
        )
        const ttmStatement = getTTMValuesFromQuarters(filteredQuarters)

        filteredStatements.unshift(getObjWithTTMDate(ttmStatement))
      } else {
        filteredStatements.unshift(
          getObjWithTTMDate(financials[statementKey].yearly[0])
        )
      }
    }

    if (isStatement) {
      return mapArrayObjectsToValues(filteredStatements)
    }

    const values = filteredStatements.map(statement => statement[field])

    return values
  }

  if (formattedGranularity !== 'quarterly') {
    if (isInUS) {
      const ttmStatement = getTTMValuesFromQuarters(
        financials[statementKey].quarterly
      )

      statements.unshift(getObjWithTTMDate(ttmStatement))
    } else {
      statements.unshift(getObjWithTTMDate(financials[statementKey].yearly[0]))
    }
  }

  if (formattedGranularity !== 'ttm') {
    if (isStatement) {
      return mapArrayObjectsToValues(statements)
    }

    const values = statements.map(statement => statement[field])

    return values
  }

  if (isStatement) {
    return mapObjToValues(statements[0])
  }

  return statements[0][field]
}

export const getRatios = async (ticker, params) => {
  const { granularity, field, fiscalDateRange } = params
  const { general, financials } = await getFundamentals(ticker, {
    filter: fundamentalsFilter
  })

  const ratios = {
    quarterly: [],
    yearly: []
  }

  financials.incomeStatement.quarterly.forEach((statement, i) => {
    ratios.quarterly.push({
      ...(ratios.quarterly[i] ? ratios.quarterly[i] : {}),
      ...getIncomeStatementRatios(statement)
    })
  })

  financials.incomeStatement.yearly.forEach((statement, i) => {
    ratios.yearly.push({
      ...(ratios.yearly[i] ? ratios.yearly[i] : {}),
      ...getIncomeStatementRatios(statement)
    })
  })

  const isInUS = general.countryISO === 'US'

  const formattedGranularity = getFundamentalsFormattedGranularity(granularity)

  const ratioValues =
    formattedGranularity === 'latest' ? [] : ratios[formattedGranularity]

  if (fiscalDateRange) {
    const fiscalDateRangeFilterPredicate =
      getFiscalDateRangeFilterPredicate(fiscalDateRange)
    const filteredRatios = ratioValues.filter(fiscalDateRangeFilterPredicate)

    if (formattedGranularity !== 'quarterly') {
      if (isInUS) {
        filteredRatios.unshift(getObjWithLatestDate(ratios.quarterly[0]))
      } else {
        filteredRatios.unshift(getObjWithLatestDate(ratios.yearly[0]))
      }
    }

    if (!field) {
      return mapArrayObjectsToValues(filteredRatios)
    }

    const values = filteredRatios.map(ratios => ratios[field])

    return values
  }

  if (formattedGranularity !== 'quarterly') {
    if (isInUS) {
      ratioValues.unshift(getObjWithLatestDate(ratios.quarterly[0]))
    } else {
      ratioValues.unshift(getObjWithLatestDate(ratios.yearly[0]))
    }
  }

  if (formattedGranularity !== 'latest') {
    if (!field) {
      return mapArrayObjectsToValues(ratioValues)
    }

    const values = ratioValues.map(ratios => ratios[field])

    return values
  }

  if (!field) {
    return mapObjToValues(ratioValues[0])
  }

  return ratioValues[0][field]
}

export const getOutstandingShares = async (ticker, params) => {
  const { granularity, field, fiscalDateRange } = params
  const outstandingShares = convertOutstandingSharesObjects(
    await getFundamentals(ticker, {
      filter: 'outstandingShares'
    })
  )

  const formattedGranularity = getFundamentalsFormattedGranularity(granularity)

  const shareValues =
    formattedGranularity === 'latest'
      ? []
      : outstandingShares[formattedGranularity]

  if (fiscalDateRange) {
    const fiscalDateRangeFilterPredicate =
      getFiscalDateRangeFilterPredicate(fiscalDateRange)
    const filteredShareValues = shareValues.filter(
      fiscalDateRangeFilterPredicate
    )

    if (formattedGranularity !== 'quarterly') {
      filteredShareValues.unshift(
        getObjWithLatestDate(outstandingShares.quarterly[0])
      )
    }

    if (!field) {
      return mapArrayObjectsToValues(filteredShareValues)
    }

    const values = filteredShareValues.map(ratios => ratios[field])

    return values
  }

  if (formattedGranularity !== 'quarterly') {
    shareValues.unshift(getObjWithLatestDate(outstandingShares.quarterly[0]))
  }

  if (formattedGranularity !== 'latest') {
    if (!field) {
      return mapArrayObjectsToValues(shareValues)
    }

    const values = shareValues.map(ratios => ratios[field])

    return values
  }

  if (!field) {
    return mapObjToValues(shareValues[0])
  }

  return shareValues[0][field]
}

export const getPrices = async (ticker, query) => {
  const newQuery = alterFromToQuery(getEODQuery(query), { changeSunday: true })
  const value = await getEOD(ticker, newQuery)

  return getFieldValue(value, true)
}
