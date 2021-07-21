import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (spreadsheet) => {
  const { getAccessToken } = useAuth();

  const persistSpreadsheetData = async (newData) => {
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

  return persistSpreadsheetData;
};

export default usePersistSpreadsheet;
