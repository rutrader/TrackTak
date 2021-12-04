import React from 'react'
import { Helmet } from 'react-helmet'
import { FinancialSpreadsheet } from '@tracktak/financial-model'
import useFetchSpreadsheet from '../hooks/useFetchSpreadsheet'
import { utils } from '@tracktak/common'
import useSaveSpreadsheetData from '../hooks/useSaveSpreadsheetData'
import useStockFinancialData from '../hooks/useStockFinancialData'
import { useParams } from 'react-router-dom'

const FinancialModel = () => {
  const params = useParams()
  const spreadsheet = useFetchSpreadsheet(params.sheetId)
  const saveSpreadsheetData = useSaveSpreadsheetData(spreadsheet)
  const financialData = useStockFinancialData(spreadsheet)

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
        saveSpreadsheetData={saveSpreadsheetData}
        sheetData={spreadsheet?.sheetData}
        financialData={financialData}
        sx={{
          flex: 1
        }}
      />
    </>
  )
}

export default FinancialModel
