import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import { getFieldValue } from '../helpers'
import getEODQuery from '../stocks/getEODQuery'

export const getGovernmentBond = async (code, query) => {
  const newQuery = alterFromToQuery(getEODQuery(query))
  const value = getEOD(`${code}.GBOND`, newQuery)

  return getFieldValue(value, true)
}
