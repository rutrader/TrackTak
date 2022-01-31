import axios from 'axios'
import convertFundamentalsFromAPI from '../../../../shared/convertFundamentalsFromAPI'
import { sendReqOrGetCachedData } from '../../../../cache'
import {
  eodAPIToken,
  eodEndpoint,
  fundamentalsEndpoint
} from '../../../../shared/constants'
import convertEODResponseToArray from '../../../../shared/convertEODResponseToArray'
import camelCaseObjects from '../../../../shared/camelCaseObjects'
import convertCurrencies from '../../../../shared/convertCurrencies'

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

      return convertCurrencies(convertedFundamentals)
    },
    'fundamentals',
    { ticker, query }
  )

  return data
}

export const getEOD = async (param, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${eodEndpoint}/${param}`, {
        params: {
          api_token: eodAPIToken,
          order: 'd',
          fmt: 'json',
          ...query
        }
      })

      const arrayValues = camelCaseObjects(
        convertEODResponseToArray(data, query.filter)
      )

      return arrayValues
    },
    'eod',
    { param, query }
  )

  return data
}
