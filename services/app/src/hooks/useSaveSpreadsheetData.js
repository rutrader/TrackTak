import { useCallback } from 'react'
import { api, useAuth } from '@tracktak/common'

const saveSpreadsheetData = async (token, spreadsheetData, data) => {
  await api.saveSpreadsheet(
    {
      ...spreadsheetData,
      sheetData: {
        ...spreadsheetData.sheetData,
        data
      }
    },
    token?.jwtToken
  )
}

const useSaveSpreadsheetData = spreadsheetData => {
  const { getAccessToken } = useAuth()

  const saveSheetData = useCallback(
    async data => {
      const token = await getAccessToken()

      return saveSpreadsheetData(token, spreadsheetData, data)
    },
    [getAccessToken, spreadsheetData]
  )

  return saveSheetData
}

export default useSaveSpreadsheetData
