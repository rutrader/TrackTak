import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (sheetId, financialDataQuery) => {
  const { getAccessToken } = useAuth();

  const persistSpreadsheetData = async (name, data) => {
    const token = await getAccessToken();
    const sheetData = { name, data, sheetId };

    saveSpreadsheet({ sheetData, financialDataQuery }, token?.jwtToken);
  };

  return persistSpreadsheetData;
};

export default usePersistSpreadsheet;
