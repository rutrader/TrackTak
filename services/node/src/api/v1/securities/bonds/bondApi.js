import convertEODFromAPI from '../../../../shared/convertEODFromAPI'
import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import { getFieldValue } from '../helpers'
import getEODQuery from '../stocks/getEODQuery'

export const getGovernmentBond = async (countryISO, query) => {
  const newQuery = alterFromToQuery(getEODQuery(query))
  const value = await getEOD(`${countryISO}.GBOND`, newQuery)

  return getFieldValue(convertEODFromAPI(value, query.field), true)
}
