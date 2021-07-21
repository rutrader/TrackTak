import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (spreadsheet) => {
  const { getAccessToken } = useAuth();

  const persistSpreadsheetData = async (newData) => {
    const token = await getAccessToken();
    debugger;
    saveSpreadsheet(
      {
        ...spreadsheet,
        sheetData: newData,
      },
      token?.jwtToken,
    );
  };

  return persistSpreadsheetData;
};

export default usePersistSpreadsheet;
