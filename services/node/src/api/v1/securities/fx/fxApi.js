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
            ...query,
            order: 'd',
            fmt: 'json'
          }
        }
      )

      if (Array.isArray(data)) {
        const newData = {}

        data.forEach(exchangeObject => {
          const dateKeyWithoutDay = exchangeObject.date.slice(0, -3)

          newData[dateKeyWithoutDay] = {
            ...exchangeObject
          }
        })

        return newData
      }
      return data
    },
    'exchangeRate',
    { baseCurrency, quoteCurrency, query }
  )

  return data
}

export const getEURBaseExchangeRate = async (code, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${eodEndpoint}/${code}.MONEY`, {
        params: {
          api_token: eodAPIToken,
          ...query,
          order: 'd',
          fmt: 'json'
        }
      })

      return data
    },
    'eurBaseExchangeRate',
    { code, query }
  )

  return data
}
