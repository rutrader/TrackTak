import axios from 'axios'
import {
  eodAPIToken,
  eodSearchEndpoint,
  MEDIUM_PLUS_CAP_PRICE_THRESHOLD
} from '../../../shared/constants'
import { sendReqOrGetCachedData } from '../../../cache'

export const getSecuritiesAutocomplete = async (queryString, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${eodSearchEndpoint}/${queryString}`, {
        params: {
          api_token: eodAPIToken,
          ...query
        }
      })

      if (process.env.PREMIUM_ENABLED === 'true') {
        return data
          .filter(datum => {
            return datum.Exchange !== 'TSE'
          })
          .map(datum => ({
            ...datum,
            isMediumCapUSPlus:
              datum.previousClose > MEDIUM_PLUS_CAP_PRICE_THRESHOLD &&
              datum.Exchange === 'US'
          }))
      } else {
        return data.filter(datum => {
          return datum.Exchange !== 'TSE'
        })
      }
    },
    'securitiesAutocomplete',
    { queryString, query }
  )
  return data
}
