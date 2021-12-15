import axios from 'axios'
import { sendReqOrGetCachedData } from '../../../../cache'
import camelCaseObjects from '../../../../shared/camelCaseObjects'
import { eodAPIToken, eodEndpoint } from '../../../../shared/constants'
import alterFromToQuery from '../alterFromToQuery'

export const getGovernmentBond = async (code, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${eodEndpoint}/${code}.GBOND`, {
        params: {
          api_token: eodAPIToken,
          order: 'd',
          fmt: 'json',
          ...alterFromToQuery(query)
        }
      })

      return camelCaseObjects(data)
    },
    'governmentBond',
    { code, query }
  )

  return data
}
