import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import getTitle from '../../../../tracktak-gatsby/src/shared/getTitle'
import Spreadsheet from '../../../financial-model/src/spreadsheet/Spreadsheet'
import useFetchSpreadsheet from '../../../../tracktak-gatsby/src/hooks/useFetchSpreadsheet'
import withAuthentication from '../../../../tracktak-gatsby/src/hocs/withAuthentication'
import useSaveSpreadsheetData from '../../../../tracktak-gatsby/src/hooks/useSaveSpreadsheetData'
import { useTTFinancialPlugin } from '../../../../tracktak-gatsby/src/hooks/useTTFinancialPlugin'

const FinancialModel = ({ sheetId }) => {
  const spreadsheet = useFetchSpreadsheet(sheetId)
  const saveSheetData = useSaveSpreadsheetData(spreadsheet)
  const financialData = useTTFinancialPlugin(spreadsheet)

  return (
    <LayoutFullScreen ticker={params.ticker}>
      {spreadsheet?.sheetData.name && (
        <Helmet>
          <title>{getTitle(`${spreadsheet.sheetData.name} Spreadsheet`)}</title>
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
    </LayoutFullScreen>
  )
}

export default withAuthentication(FinancialModel)
