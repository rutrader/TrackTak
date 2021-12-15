import axios from 'axios'
import convertFundamentalsFromAPI from '../../../../shared/convertFundamentalsFromAPI'
import { sendReqOrGetCachedData } from '../../../../cache'
import {
  eodAPIToken,
  eodEndpoint,
  fundamentalsEndpoint
} from '../../../../shared/constants'
import alterFromToQuery from '../alterFromToQuery'
import camelCaseObjects from '../../../../shared/camelCaseObjects'
import { isNil } from 'lodash-es'

export const getFundamentals = async (ticker, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${fundamentalsEndpoint}/${ticker}`, {
        params: {
          api_token: eodAPIToken,
          ...query
        }
      })

      const convertedFundamentals = convertFundamentalsFromAPI(ticker, data)

      return convertedFundamentals
    },
    'fundamentals',
    { ticker, query }
  )

  return data
}

export const getEOD = async (ticker, query) => {
  const { data } = await axios.get(`${eodEndpoint}/${ticker}`, {
    params: {
      api_token: eodAPIToken,
      order: 'd',
      fmt: 'json',
      ...alterFromToQuery(query, { changeSunday: true })
    }
  })

  return camelCaseObjects(data)
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

export const getRatios = async (ticker, query) => {
  const { general, financials } = await getFundamentals(ticker, query)

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

  return {
    general,
    ratios
  }
}
