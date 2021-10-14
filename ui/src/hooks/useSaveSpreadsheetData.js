import { useCallback } from "react";
import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const saveSpreadsheetData = async (spreadsheet, newData, token) => {
  await saveSpreadsheet(
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
  const { getAccessToken } = useAuth();

  const saveSheetData = useCallback(
    async (newData) => {
      const token = await getAccessToken();

      return saveSpreadsheetData(spreadsheet, newData, token);
    },
    [getAccessToken, spreadsheet],
  );

  return saveSheetData;
};

export default useSaveSpreadsheetData;
