import { useEffect, useState } from 'react'
import { api, useAuth } from '@tracktak/common'

export const useTTFinancialPlugin = spreadsheet => {
  const [financialData, setFinancialData] = useState()
  const { getAccessToken } = useAuth()

  useEffect(() => {
    const { id, ticker } = spreadsheet?.financialData ?? {}

    const fetchData = async callback => {
      const { data } = await callback()

      setFinancialData(data.financialData)
    }

    if (id) {
      const fetchFinancialData = async () => {
        const token = await getAccessToken()

        return await api.getFinancialData(id, token?.jwtToken)
      }

      fetchData(fetchFinancialData)
    } else if (ticker) {
      const fetchCreateNewFinancials = async () => {
        const values = await Promise.all([
          api.getFundamentals(ticker),
          getAccessToken()
        ])
        const fundamentals = values[0].data.value
        const token = values[1]

        return await api.createFinancialData(
          fundamentals,
          token?.jwtToken,
          spreadsheet._id
        )
      }

      fetchData(fetchCreateNewFinancials)
    }
  }, [getAccessToken, spreadsheet])

  return financialData
}
