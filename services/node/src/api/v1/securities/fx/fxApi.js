import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import { getFieldValue } from '../helpers'
import getEODQuery from '../stocks/getEODQuery'

export const getExchangeRate = async (baseCurrency, quoteCurrency, query) => {
  const newQuery = alterFromToQuery(getEODQuery(query))
  const value = await getEOD(`${baseCurrency}${quoteCurrency}.FOREX`, newQuery)

  return getFieldValue(value, true)
}
