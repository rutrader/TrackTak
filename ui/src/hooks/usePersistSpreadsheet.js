import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (sheetId, financialDataId) => {
  const { getAccessToken } = useAuth();

  const persistSpreadsheetData = async (name, data) => {
    const token = await getAccessToken();
    const sheetData = { name, data, sheetId };

    saveSpreadsheet({ sheetData, financialDataId }, token?.jwtToken);
  };

  return persistSpreadsheetData;
};

export default usePersistSpreadsheet;
