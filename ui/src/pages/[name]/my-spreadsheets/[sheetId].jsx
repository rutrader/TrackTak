import React, { useState } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/Spreadsheet";
import useFetchSpreadsheet from "../../../hooks/useFetchSpreadsheet";
import withAuthentication from "../../../hocs/withAuthentication";
import useSaveSpreadsheetData from "../../../hooks/useSaveSpreadsheetData";
import { useTTFinancialPlugin } from "../../../hooks/useTTFinancialPlugin";

const SpreadsheetPage = ({ sheetId }) => {
  const spreadsheet = useFetchSpreadsheet(sheetId);
  const saveSheetData = useSaveSpreadsheetData(spreadsheet);
  const financialData = useTTFinancialPlugin(spreadsheet);

  return (
    <>
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
          flex: 1,
        }}
      />
    </>
  );
};

export default withAuthentication(SpreadsheetPage);
