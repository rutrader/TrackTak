import axios from 'axios'
import { sendReqOrGetCachedData } from '../../../../cache'
import { eodAPIToken, eodEndpoint } from '../../../../shared/constants'

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
            ...query
          }
        }
      )

      return data
    },
    'exchangeRate',
    { baseCurrency, quoteCurrency, query }
  )

  return data
}
