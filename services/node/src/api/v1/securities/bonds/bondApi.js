import convertEODFromAPI, {
  divideEODNumbersByHundred
} from '../../../../shared/convertEODFromAPI'
import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import getEODQuery from '../stocks/getEODQuery'
import iso3311a2 from 'iso-3166-1-alpha-2'
import tenYearGovernmentBondYields from './tenYearGovernmentBondYields.json'

export const getGovernmentBond = async (countryISOMaturity, query) => {
  const eodQuery = getEODQuery(query)
  const newQuery = alterFromToQuery(eodQuery)
  try {
    let value = await getEOD(`${countryISOMaturity}.GBOND`, newQuery)

    return divideEODNumbersByHundred(convertEODFromAPI(value, eodQuery), query)
  } catch (error) {
    if (error.response.status === 404) {
      const splits = countryISOMaturity.split('10Y')

      if (splits[0]) {
        const country = iso3311a2
          .getCountry(splits[0].toUpperCase())
          .toUpperCase()
        const tenYearGovernmentBondYield = tenYearGovernmentBondYields.find(
          x => x.country.toUpperCase() === country
        ).yield

        return divideEODNumbersByHundred([
          { adjustedClose: tenYearGovernmentBondYield }
        ])
      }
    }
    throw error
  }
}
