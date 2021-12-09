import axios from 'axios'
import { sendReqOrGetCachedData } from '../../../../cache'
import { eodAPIToken, eodEndpoint } from '../../../../shared/constants'

export const getGovernmentBond = async (code, query) => {
  const data = await sendReqOrGetCachedData(
    async () => {
      const { data } = await axios.get(`${eodEndpoint}/${code}.GBOND`, {
        params: {
          api_token: eodAPIToken,
          ...query,
          fmt: 'json'
        }
      })

      return data
    },
    'governmentBond',
    { code, query }
  )

  return data
}
