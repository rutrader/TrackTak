import axios from 'axios'
import convertFundamentalsFromAPI from '../../../../shared/convertFundamentalsFromAPI'
import { sendReqOrGetCachedData } from '../../../../cache'
import {
  eodAPIToken,
  eodEndpoint,
  fundamentalsEndpoint
} from '../../../../shared/constants'
import alterFromToQuery from '../alterFromToQuery'

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
      ...alterFromToQuery(query, { changeSunday: true, changeToday: true })
    }
  })

  return data
}
