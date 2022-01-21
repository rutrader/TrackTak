import convertEODFromAPI from '../../../../shared/convertEODFromAPI'
import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import getEODQuery from '../stocks/getEODQuery'

export const getExchangeRate = async (baseCurrency, quoteCurrency, query) => {
  const eodQuery = getEODQuery(query)
  const newQuery = alterFromToQuery(eodQuery)
  const value = await getEOD(`${baseCurrency}${quoteCurrency}.FOREX`, newQuery)

  return convertEODFromAPI(value, eodQuery)
}
