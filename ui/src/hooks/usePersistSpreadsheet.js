import { useState, useEffect } from "react";
import { saveSpreadsheet } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (ticker, spreadsheetDataToSave, sheetId) => {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function persistSpreadsheetData() {
      const token = await getAccessToken();
      await saveSpreadsheet(
        { name: ticker, data: spreadsheetDataToSave, sheetId },
        token?.jwtToken,
      );
      setIsSaving(false);
    }
    if (isAuthenticated && ticker && spreadsheetDataToSave) {
      setIsSaving(true);
      persistSpreadsheetData();
    }
  }, [getAccessToken, isAuthenticated, sheetId, spreadsheetDataToSave, ticker]);

  return [isSaving];
};

export default usePersistSpreadsheet;
