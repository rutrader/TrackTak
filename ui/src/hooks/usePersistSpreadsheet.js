import { useState, useEffect } from "react";
import { saveValuation } from "../api/api";
import { useAuth } from "./useAuth";

const usePersistSpreadsheet = (ticker, spreadsheetDataToSave, sheetId) => {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function persistSpreadsheetData() {
      const token = await getAccessToken();
      await saveValuation(
        { name: ticker, data: spreadsheetDataToSave, sheetId },
        token?.jwtToken,
      );
      setIsSaving(false);
    }
    if (isAuthenticated && ticker && spreadsheetDataToSave) {
      setIsSaving(true);
      persistSpreadsheetData();
    }
  }, [getAccessToken, spreadsheetDataToSave, ticker]);

  return [ isSaving ];
};

export default usePersistSpreadsheet;
