import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/Spreadsheet";
import useFetchSpreadsheet from "../../../hooks/useFetchSpreadsheet";
import withAuthentication from "../../../hocs/withAuthentication";
import useSaveSpreadsheetData from "../../../hooks/useSaveSpreadsheetData";
import { useSpreadsheet } from "../../../hooks/useSpreadsheet";
import { useTTFinancialPlugin } from "../../../hooks/useTTFinancialPlugin";

const SpreadsheetPage = ({ sheetId }) => {
  const { spreadsheet, setSpreadsheet } = useSpreadsheet();
  const spreadsheetData = useFetchSpreadsheet(sheetId);
  const saveSheetData = useSaveSpreadsheetData(spreadsheetData);
  const financialData = useTTFinancialPlugin(spreadsheet, spreadsheetData);

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
