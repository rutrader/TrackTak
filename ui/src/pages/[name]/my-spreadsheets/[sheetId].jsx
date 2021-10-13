import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/Spreadsheet";
import useFetchSpreadsheet from "../../../hooks/useFetchSpreadsheet";
import withAuthentication from "../../../hocs/withAuthentication";
import useSaveSpreadsheetData from "../../../hooks/useSaveSpreadsheetData";
import { useTTFinancialPlugin } from "../../../hooks/useTTFinancialPlugin";

const SpreadsheetPage = ({ sheetId }) => {
  const spreadsheetData = useFetchSpreadsheet(sheetId);
  const saveSheetData = useSaveSpreadsheetData(spreadsheetData);
  const financialData = useTTFinancialPlugin(spreadsheetData);

  return (
    <>
      {spreadsheetData?.sheetData.name && (
        <Helmet>
          <title>
            {getTitle(`${spreadsheetData.sheetData.name} Spreadsheet`)}
          </title>
        </Helmet>
      )}
      <Spreadsheet
        saveSheetData={saveSheetData}
        spreadsheetData={spreadsheetData}
        financialData={financialData}
      />
    </>
  );
};

export default withAuthentication(SpreadsheetPage);
