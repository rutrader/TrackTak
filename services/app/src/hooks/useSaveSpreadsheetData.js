import { useCallback } from 'react'
import { api, useAuth } from '@tracktak/common'

const saveSpreadsheetData = async (spreadsheet, token, data, financialData) => {
  await api.saveSpreadsheet(
    {
      ...spreadsheet,
      sheetData: {
        ...spreadsheet.sheetData,
        data: {
          ...spreadsheet.sheetData.data,
          ...data
        }
      },
      financialData: {
        ...spreadsheet.financialData,
        ...financialData
      }
    },
    token?.jwtToken
  )
}

const useSaveSpreadsheetData = spreadsheet => {
  const { getAccessToken } = useAuth()

  const saveSheetData = useCallback(
    async ({ data, financialData }) => {
      const token = await getAccessToken()

      return saveSpreadsheetData(spreadsheet, token, data, financialData)
    },
    [getAccessToken, spreadsheet]
  )

  return saveSheetData
}

export default useSaveSpreadsheetData
