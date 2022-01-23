import React from 'react'
import { Helmet } from 'react-helmet'
import { FinancialSpreadsheet } from '@tracktak/financial-model'
import useFetchSpreadsheet from '../hooks/useFetchSpreadsheet'
import { utils } from '@tracktak/common'
import useSaveSpreadsheetData from '../hooks/useSaveSpreadsheetData'
import { useParams } from 'react-router-dom'

const FinancialModel = () => {
  const params = useParams()
  const spreadsheetData = useFetchSpreadsheet(params.sheetId)
  const saveSheetData = useSaveSpreadsheetData(spreadsheetData)

  return (
    <>
      {spreadsheetData?.sheetData.name && (
        <Helmet>
          <title>
            {utils.getTitle(`${spreadsheetData?.sheetData.name} Spreadsheet`)}
          </title>
        </Helmet>
      )}
      {spreadsheetData?.sheetData.data.sheets && (
        <FinancialSpreadsheet
          saveSheetData={saveSheetData}
          spreadsheetData={spreadsheetData}
          sx={{
            flex: 1
          }}
        />
      )}
    </>
  )
}

export default FinancialModel
