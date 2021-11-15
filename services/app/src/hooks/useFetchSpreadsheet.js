import { useState, useEffect } from 'react'
import { api, useAuth } from '@tracktak/common'

const useFetchSpreadsheet = sheetId => {
  const [spreadsheet, setSpreadsheet] = useState()
  const { getAccessToken } = useAuth()

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken()
      const response = await api.getSpreadsheet(sheetId, token?.jwtToken)

      setSpreadsheet(response.data.spreadsheet)
    }

    fetchData()
  }, [getAccessToken, sheetId])

  return spreadsheet
}

export default useFetchSpreadsheet
