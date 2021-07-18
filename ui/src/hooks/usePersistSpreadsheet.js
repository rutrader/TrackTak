import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (sheetId) => {
  const { getAccessToken } = useAuth();

  const persistSpreadsheetData = async (name, data) => {
    const token = await getAccessToken();

    saveSpreadsheet({ name, data, sheetId }, token?.jwtToken);
  };

  return persistSpreadsheetData;
};

export default usePersistSpreadsheet;
