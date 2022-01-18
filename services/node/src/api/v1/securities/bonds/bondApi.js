import convertEODFromAPI, {
  divideEODYieldsByHundred
} from '../../../../shared/convertEODFromAPI'
import alterFromToQuery from '../alterFromToQuery'
import { getEOD } from '../eodHistoricalData/eodAPI'
import { getFieldValue } from '../helpers'
import getEODQuery from '../stocks/getEODQuery'
import iso3311a2 from 'iso-3166-1-alpha-2'
import tenYearGovernmentBondYields from './tenYearGovernmentBondYields.json'

export const getGovernmentBond = async (countryISO, query) => {
  const newQuery = alterFromToQuery(getEODQuery(query))
  try {
    const value = await getEOD(`${countryISO}.GBOND`, newQuery)

    return getFieldValue(
      divideEODYieldsByHundred(convertEODFromAPI(value, query), query),
      true
    )
  } catch (error) {
    if (error.response.status === 404) {
      const splits = countryISO.split('10Y')

      if (splits[0]) {
        const country = iso3311a2
          .getCountry(splits[0].toUpperCase())
          .toUpperCase()
        const tenYearGovernmentBondYield = tenYearGovernmentBondYields.find(
          x => x.country.toUpperCase() === country
        ).yield

        return tenYearGovernmentBondYield
      }
    }
    throw error
  }
}
