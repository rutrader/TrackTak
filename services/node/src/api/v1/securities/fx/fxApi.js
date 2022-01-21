import dayjs from 'dayjs'
import convertEODFromAPI from '../../../../shared/convertEODFromAPI'
import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import getEODQuery from '../stocks/getEODQuery'

export const getExchangeRate = async (baseCurrency, quoteCurrency, query) => {
  const eodQuery = getEODQuery(query)
  const newQuery = alterFromToQuery(eodQuery)

  if (baseCurrency === quoteCurrency) {
    return convertEODFromAPI(
      [
        {
          date: dayjs().format('YYYY-MM-DD'),
          open: 1,
          high: 1,
          low: 1,
          close: 1,
          adjustedClose: 1,
          volume: 0
        }
      ],
      eodQuery
    )
  }

  const value = await getEOD(`${baseCurrency}${quoteCurrency}.FOREX`, newQuery)

  return convertEODFromAPI(value, eodQuery)
}
