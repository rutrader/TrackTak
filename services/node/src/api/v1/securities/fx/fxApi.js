import axios from 'axios'
import { sendReqOrGetCachedData } from '../../../../cache'
import camelCaseObjects from '../../../../shared/camelCaseObjects'
import { eodAPIToken, eodEndpoint } from '../../../../shared/constants'
import alterFromToQuery from '../alterFromToQuery'

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

      return camelCaseObjects(data)
    },
    'exchangeRate',
    { baseCurrency, quoteCurrency, query }
  )

  return data
}
