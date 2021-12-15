import axios from 'axios'
import { sendReqOrGetCachedData } from '../../../../cache'
import camelCaseObjects from '../../../../shared/camelCaseObjects'
import { eodAPIToken, eodEndpoint } from '../../../../shared/constants'
import alterFromToQuery from '../alterFromToQuery'
import { getFieldValue } from '../helpers'
import getEODQuery from '../stocks/getEODQuery'

export const getGovernmentBond = async (code, query) => {
  const newQuery = getEODQuery(query)

  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${eodEndpoint}/${code}.GBOND`, {
        params: {
          api_token: eodAPIToken,
          order: 'd',
          fmt: 'json',
          ...alterFromToQuery(newQuery)
        }
      })

      const value = camelCaseObjects(data)

      return getFieldValue(value, true)
    },
    'governmentBond',
    { code, query: newQuery }
  )

  return data
}
