import axios from 'axios'
import iso3311a2 from 'iso-3166-1-alpha-2'
import { sendReqOrGetCachedData } from '../../../../cache'
import { eodAPIToken, eodEndpoint } from '../../../../shared/constants'
import tenYearGovernmentBondYields from '../../../../data/tenYearGovernmentBondYields.json'

export const getCountryBond = async (code, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      try {
        const { data } = await axios.get(`${eodEndpoint}/${code}.GBOND`, {
          params: {
            api_token: eodAPIToken,
            ...query,
            fmt: 'json'
          }
        })

        return data
      } catch (error) {
        // API doesn't yet provide a lot of country government bonds
        if (error.response.status === 404) {
          const splits = code.split('10Y')

          console.log(code)

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
    },
    'countryBond',
    { code, query }
  )

  return data
}
