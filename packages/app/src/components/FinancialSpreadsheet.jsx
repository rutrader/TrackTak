import React from 'react'
import { Helmet } from 'react-helmet'
import { Spreadsheet } from '@tracktak/financial-model'
import useFetchSpreadsheet from '../hooks/useFetchSpreadsheet'
import { utils } from '@tracktak/common'
import useSaveSpreadsheetData from '../hooks/useSaveSpreadsheetData'
import { useTTFinancialPlugin } from '../hooks/useTTFinancialPlugin'
import withAuthentication from '../hocs/withAuthentication'

const FinancialSpreadsheet = ({ sheetId }) => {
  const spreadsheet = useFetchSpreadsheet(sheetId)
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
      <Spreadsheet
        saveSheetData={saveSheetData}
        sheetData={spreadsheet?.sheetData}
        financialData={financialData}
        sx={{
          flex: 1
        }}
      />
    </>
  )
}

export default withAuthentication(FinancialSpreadsheet)
