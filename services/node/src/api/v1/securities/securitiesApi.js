import axios from 'axios'
import {
  eodAPIToken,
  eodSearchEndpoint,
  MEDIUM_PLUS_CAP_PRICE_THRESHOLD
} from '../../../shared/constants'
import { sendReqOrGetCachedData } from '../../../cache'
import camelCaseObjects from '../../../shared/camelCaseObjects'

export const getSecuritiesAutocomplete = async (queryString, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${eodSearchEndpoint}/${queryString}`, {
        params: {
          api_token: eodAPIToken,
          ...query
        }
      })

      const arrayValues = camelCaseObjects(data)

      if (process.env.PREMIUM_ENABLED === 'true') {
        return arrayValues
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
        return arrayValues.filter(datum => {
          return datum.Exchange !== 'TSE'
        })
      }
    },
    'securitiesAutocomplete',
    { queryString, query }
  )
  return data
}
