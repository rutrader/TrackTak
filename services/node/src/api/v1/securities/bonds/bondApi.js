import convertEODFromAPI, {
  divideEODNumbersByHundred
} from '../../../../shared/convertEODFromAPI'
import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import getEODQuery from '../stocks/getEODQuery'

export const getGovernmentBond = async (countryISOMaturity, query) => {
  const eodQuery = getEODQuery(query)
  const newQuery = alterFromToQuery(eodQuery)
  const value = await getEOD(`${countryISOMaturity}.GBOND`, newQuery)

  return divideEODNumbersByHundred(convertEODFromAPI(value, eodQuery), query)
}
