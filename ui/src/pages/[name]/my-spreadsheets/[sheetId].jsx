import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/Spreadsheet";
import useFetchSpreadsheet from "../../../hooks/useFetchSpreadsheet";
import usePersistSpreadsheet from "../../../hooks/usePersistSpreadsheet";
import withAuthentication from "../../../hocs/withAuthentication";

const SpreadsheetPage = ({ sheetId }) => {
  const [spreadsheet] = useFetchSpreadsheet(sheetId);
  const saveSheetData = usePersistSpreadsheet(spreadsheet);

  return (
    <>
      {spreadsheet?.sheetData.name && (
        <Helmet>
          <title>{getTitle(`${spreadsheet.sheetData.name} Spreadsheet`)}</title>
        </Helmet>
      )}
      <Spreadsheet saveSheetData={saveSheetData} spreadsheet={spreadsheet} />
    </>
  );
};

export default withAuthentication(SpreadsheetPage);
