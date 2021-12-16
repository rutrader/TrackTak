import axios from 'axios'
import convertFundamentalsFromAPI from '../../../../shared/convertFundamentalsFromAPI'
import { sendReqOrGetCachedData } from '../../../../cache'
import {
  eodAPIToken,
  eodEndpoint,
  fundamentalsEndpoint
} from '../../../../shared/constants'
import camelCaseObjects from '../../../../shared/camelCaseObjects'

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

      const value = camelCaseObjects(data)

      return value
    },
    'governmentBond',
    { param, query }
  )

  return data
}
