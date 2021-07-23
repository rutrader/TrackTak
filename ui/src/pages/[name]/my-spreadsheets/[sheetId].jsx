import React, { useState } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/Spreadsheet";
import useFetchSpreadsheet from "../../../hooks/useFetchSpreadsheet";
import withAuthentication from "../../../hocs/withAuthentication";
import useSaveSpreadsheetData from "../../../hooks/useSaveSpreadsheetData";
import { useFinancialPlugin } from "../../../../../packages/intrinsic-valuations/src/hooks/useFinancialPlugin";

const SpreadsheetPage = ({ sheetId }) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const spreadsheetData = useFetchSpreadsheet(sheetId);
  const saveSheetData = useSaveSpreadsheetData(spreadsheetData);
  const financialData = useFinancialPlugin(spreadsheet, spreadsheetData);

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
        spreadsheet={spreadsheet}
        setSpreadsheet={setSpreadsheet}
        saveSheetData={saveSheetData}
        spreadsheetData={spreadsheetData}
        financialData={financialData}
      />
    </>
  );
};

export default withAuthentication(SpreadsheetPage);
