import axios from 'axios'
import { sendReqOrGetCachedData } from '../../../../cache'
import camelCaseObjects from '../../../../shared/camelCaseObjects'
import { eodAPIToken, eodEndpoint } from '../../../../shared/constants'
import alterFromToQuery from '../alterFromToQuery'
import { getFieldValue } from '../helpers'

export const getExchangeRate = async (baseCurrency, quoteCurrency, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(
        `${eodEndpoint}/${baseCurrency}${quoteCurrency}.FOREX`,
        {
          params: {
            api_token: eodAPIToken,
            fmt: 'json',
            order: 'd',
            ...alterFromToQuery(query)
          }
        }
      )

      const value = camelCaseObjects(data)

      return getFieldValue(value, true)
    },
    'exchangeRate',
    { baseCurrency, quoteCurrency, query }
  )

  return data
}
