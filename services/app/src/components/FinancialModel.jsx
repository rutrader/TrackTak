import React from 'react'
import { Helmet } from 'react-helmet'
import { FinancialSpreadsheet } from '@tracktak/financial-model'
import useFetchSpreadsheet from '../hooks/useFetchSpreadsheet'
import { utils } from '@tracktak/common'
import useSaveSpreadsheetData from '../hooks/useSaveSpreadsheetData'
import { useTTFinancialPlugin } from '../hooks/useTTFinancialPlugin'
import { useParams } from 'react-router-dom'

const FinancialModel = () => {
  const params = useParams()
  const spreadsheet = useFetchSpreadsheet(params.sheetId)
  const saveSheetData = useSaveSpreadsheetData(spreadsheet)
  const financialData = useTTFinancialPlugin(spreadsheet)

  return (
    <>
      {spreadsheet?.sheetData.name && (
        <Helmet>
          <title>
            {utils.getTitle(`${spreadsheet.sheetData.name} Spreadsheet`)}
          </title>
        </Helmet>
      )}
      <FinancialSpreadsheet
        saveSheetData={saveSheetData}
        sheetData={spreadsheet?.sheetData}
        financialData={financialData}
        style={{
          flex: 1
        }}
      />
    </>
  )
}

export default FinancialModel
