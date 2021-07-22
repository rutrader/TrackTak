import { useCallback } from "react";
import { saveSpreadsheet } from "../api/api";
import { getAccessToken } from "./useAuth";

const saveSpreadsheetData = async (spreadsheet, newData) => {
  const token = await getAccessToken();

  saveSpreadsheet(
    {
      ...spreadsheet,
      sheetData: {
        ...spreadsheet.sheetData,
        data: newData,
      },
    },
    token?.jwtToken,
  );
};

const useSaveSpreadsheetData = (spreadsheet) => {
  const saveSheetData = useCallback(
    (newData) => {
      saveSpreadsheetData(spreadsheet, newData);
    },
    [spreadsheet],
  );

  return saveSheetData;
};

export default useSaveSpreadsheetData;
