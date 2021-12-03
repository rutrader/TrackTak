import axios from 'axios'
import replaceDoubleColonWithObject from './shared/replaceDoubleColonWithObject'
import convertFundamentalsFromAPI from './shared/convertFundamentalsFromAPI'
import { sendReqOrGetCachedData } from '../../../../cache'
import {
  eodAPIToken,
  eodEndpoint,
  fundamentalsEndpoint
} from '../../../../shared/constants'

export const getFundamentals = async (ticker, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${fundamentalsEndpoint}/${ticker}`, {
        params: {
          api_token: eodAPIToken,
          ...query
        }
      })

      const newObject = replaceDoubleColonWithObject(data)

      return convertFundamentalsFromAPI(newObject)
    },
    'fundamentals',
    { ticker, query }
  )

  return data
}

export const getEOD = async (ticker, query) => {
  // TODO: Cache this and remove the cache every time it updates
  const { data } = await axios.get(`${eodEndpoint}/${ticker}`, {
    params: {
      api_token: eodAPIToken,
      ...query,
      fmt: 'json'
    }
  })

  return data
}
